import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { CallToolResultSchema, ListToolsResultSchema } from "@modelcontextprotocol/sdk/types.js";

const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const waitForHealth = async (url: string, retries = 30): Promise<void> => {
  for (let i = 0; i < retries; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // server is still starting
    }
    await wait(300);
  }
  throw new Error(`Server did not become healthy: ${url}`);
};

const startHttpServer = (port: number, docsDir: string, dbPath: string) => {
  const tsxCli = path.resolve(process.cwd(), "node_modules", "tsx", "dist", "cli.mjs");
  const child = spawn(process.execPath, [tsxCli, "src/server/http.ts"], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      MCP_HTTP_PORT: String(port),
      MCP_HISTORY_DB_PATH: dbPath,
      MCP_INDEX_ROOT: docsDir,
      MCP_LLM_BASE_URL: "http://127.0.0.1:1",
      MCP_GRAPH_TIMEOUT_MS: "200",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let stderr = "";
  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  return {
    child,
    getStderr: () => stderr,
  };
};

const stopHttpServer = async (child: ReturnType<typeof spawn>): Promise<void> => {
  child.kill("SIGTERM");
  await wait(250);
  if (!child.killed) {
    child.kill("SIGKILL");
  }
};

const parseToolTextPayload = (result: { content?: Array<{ type: string; text?: string }> }): Record<string, unknown> => {
  const textBlock = (result.content ?? []).find((item) => item.type === "text" && typeof item.text === "string");
  assert.ok(textBlock?.text, "Tool response must include text payload");
  return JSON.parse(textBlock.text) as Record<string, unknown>;
};

test("e2e: http server boots and responds on /health", async () => {
  const port = 3105;
  const baseDir = fs.mkdtempSync(path.join(os.tmpdir(), "poe2-e2e-http-"));
  const dbPath = path.join(baseDir, "data", "history.db");
  const docsDir = path.join(baseDir, "docs");
  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(path.join(docsDir, "boss.md"), "Граф Геонор", "utf-8");

  const server = startHttpServer(port, docsDir, dbPath);

  try {
    await waitForHealth(`http://127.0.0.1:${port}/health`);
    const response = await fetch(`http://127.0.0.1:${port}/health`);
    assert.equal(response.status, 200);
    const payload = (await response.json()) as { ok?: boolean; name?: string };
    assert.equal(payload.ok, true);
    assert.equal(typeof payload.name, "string");
  } finally {
    await stopHttpServer(server.child);
    assert.equal(server.getStderr().includes("failed"), false, server.getStderr());
  }
});

test("e2e: MCP flow tools/list and tools/call over /mcp", { timeout: 30000 }, async () => {
  const port = 3106;
  const baseDir = fs.mkdtempSync(path.join(os.tmpdir(), "poe2-e2e-mcp-"));
  const dbPath = path.join(baseDir, "data", "history.db");
  const docsDir = path.join(baseDir, "docs");
  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(
    path.join(docsDir, "countGeonor.md"),
    "Граф Геонор. Фаза 2: дуговой удар, волки. Безопасный вход после рывка: 1.4 секунды.",
    "utf-8",
  );

  const server = startHttpServer(port, docsDir, dbPath);

  const client = new Client(
    { name: "e2e-http-client", version: "1.0.0" },
    { capabilities: {} },
  );
  const transport = new StreamableHTTPClientTransport(new URL(`http://127.0.0.1:${port}/mcp`));

  try {
    await waitForHealth(`http://127.0.0.1:${port}/health`);
    await client.connect(transport);

    const toolsList = await client.request({ method: "tools/list", params: {} }, ListToolsResultSchema);
    const toolNames = toolsList.tools.map((tool) => tool.name);
    assert.ok(toolNames.includes("index_status"));
    assert.ok(toolNames.includes("index_folder"));
    assert.ok(toolNames.includes("find_relevant_docs"));
    assert.ok(toolNames.includes("ask_question"));

    const statusBefore = await client.request(
      { method: "tools/call", params: { name: "index_status", arguments: {} } },
      CallToolResultSchema,
    );
    const beforePayload = parseToolTextPayload(statusBefore);
    assert.equal(beforePayload.ok, true);

    const indexed = await client.request(
      {
        method: "tools/call",
        params: { name: "index_folder", arguments: { path: docsDir, glob_pattern: "**/*", reindex: true } },
      },
      CallToolResultSchema,
    );
    const indexedPayload = parseToolTextPayload(indexed);
    assert.equal(indexedPayload.ok, true);

    const found = await client.request(
      {
        method: "tools/call",
        params: { name: "find_relevant_docs", arguments: { query: "дуговой удар геонора", top_k: 5 } },
      },
      CallToolResultSchema,
    );
    const foundPayload = parseToolTextPayload(found);
    assert.equal(foundPayload.ok, true);

    const answered = await client.request(
      {
        method: "tools/call",
        params: { name: "ask_question", arguments: { question: "Что делать после дугового удара Геонора?", top_k: 5 } },
      },
      CallToolResultSchema,
    );
    const answeredPayload = parseToolTextPayload(answered);
    assert.equal(answeredPayload.ok, true);
    const data = (answeredPayload.data ?? {}) as { sources?: unknown[] };
    assert.ok((data.sources ?? []).length > 0);
  } finally {
    await transport.close();
    await stopHttpServer(server.child);
    assert.equal(server.getStderr().includes("failed"), false, server.getStderr());
  }
});
