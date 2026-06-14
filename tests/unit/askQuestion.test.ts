import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { indexDocuments } from "../../src/indexing/indexer.ts";
import { resetSettingsCacheForTests } from "../../src/config/settings.ts";

const prepareIndex = (): string => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "poe2-ask-root-"));
  const data = fs.mkdtempSync(path.join(os.tmpdir(), "poe2-ask-data-"));
  fs.writeFileSync(path.join(root, "boss.md"), "Граф Геонор во второй фазе вызывает волков и бьет дугой.", "utf-8");
  indexDocuments({ rootPath: root, globPattern: "**/*", reindex: true, dataDir: data });
  return data;
};

test("ask_question uses generated LLM answer when fetch succeeds", async () => {
  const data = prepareIndex();
  process.env.MCP_HISTORY_DB_PATH = path.join(data, "history.db");
  process.env.MCP_GRAPH_TIMEOUT_MS = "200";
  process.env.MCP_LLM_BASE_URL = "http://127.0.0.1:1";
  resetSettingsCacheForTests();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ message: { content: "LLM ответ" } }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }) as Response;

  const { handleAskQuestion } = await import("../../src/tools/askQuestion.ts");
  const out = await handleAskQuestion("что делать во второй фазе геонора?", 5);

  assert.equal(out.ok, true);
  assert.equal(out.data?.answer, "LLM ответ");

  globalThis.fetch = originalFetch;
});

test("ask_question falls back when fetch fails", async () => {
  const data = prepareIndex();
  process.env.MCP_HISTORY_DB_PATH = path.join(data, "history.db");
  process.env.MCP_GRAPH_TIMEOUT_MS = "200";
  process.env.MCP_LLM_BASE_URL = "http://127.0.0.1:1";
  resetSettingsCacheForTests();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("network");
  };

  const { handleAskQuestion } = await import("../../src/tools/askQuestion.ts");
  const out = await handleAskQuestion("что делать во второй фазе геонора?", 5);

  assert.equal(out.ok, true);
  assert.match(String(out.data?.answer), /По найденным источникам:/);

  globalThis.fetch = originalFetch;
});
