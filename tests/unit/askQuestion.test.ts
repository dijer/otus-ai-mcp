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
  fs.mkdirSync(path.join(root, "bosses"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "bosses", "brutus.md"),
    "# Boss: Brutus\n\nBrutus бьет с размаха и наказывает за жадность.",
    "utf-8",
  );
  indexDocuments({ rootPath: root, globPattern: "**/*", reindex: true, dataDir: data });
  return data;
};

const prepareIndexForWorstBossFallback = (): string => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "poe2-ask-worst-root-"));
  const data = fs.mkdtempSync(path.join(os.tmpdir(), "poe2-ask-worst-data-"));
  fs.mkdirSync(path.join(root, "bosses", "act3"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "bosses", "boss-phase-window-mastery.md"),
    "# Path of Exile 2: Boss Phase Window Mastery\n\nWorst and hardest boss fight examples and general difficulty tips.",
    "utf-8",
  );
  fs.writeFileSync(
    path.join(root, "bosses", "act3", "choir-of-madness.md"),
    "# Boss: Choir of Madness\n\nThis boss fight is often described as one of the hardest and most difficult due to overlap mechanics.",
    "utf-8",
  );
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
  const out = await handleAskQuestion("best tactics to fight Brutus boss in PoE2", 5);

  assert.equal(out.ok, true);
  assert.equal(out.data?.status, "answered");
  assert.equal(out.data?.answer, "LLM ответ");

  globalThis.fetch = originalFetch;
});

test("ask_question returns a boss name for a generic request when fetch fails", async () => {
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
  const out = await handleAskQuestion("use provided tool to give me any PoE2 boss name", 5);

  assert.equal(out.ok, true);
  assert.equal(out.data?.status, "answered");
  assert.match(String(out.data?.answer), /Brutus/);

  globalThis.fetch = originalFetch;
});

test("ask_question reports no_data on an empty index", async () => {
  const data = fs.mkdtempSync(path.join(os.tmpdir(), "poe2-ask-empty-"));
  process.env.MCP_HISTORY_DB_PATH = path.join(data, "history.db");
  process.env.MCP_GRAPH_TIMEOUT_MS = "200";
  process.env.MCP_LLM_BASE_URL = "http://127.0.0.1:1";
  resetSettingsCacheForTests();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("network");
  };

  const { handleAskQuestion } = await import("../../src/tools/askQuestion.ts");
  const out = await handleAskQuestion("что угодно", 5);

  assert.equal(out.ok, true);
  assert.equal(out.data?.status, "no_data");
  assert.match(String(out.data?.answer), /Недостаточно данных/);

  globalThis.fetch = originalFetch;
});

test("ask_question reports no_data in English for English question", async () => {
  const data = fs.mkdtempSync(path.join(os.tmpdir(), "poe2-ask-empty-en-"));
  process.env.MCP_HISTORY_DB_PATH = path.join(data, "history.db");
  process.env.MCP_GRAPH_TIMEOUT_MS = "200";
  process.env.MCP_LLM_BASE_URL = "http://127.0.0.1:1";
  resetSettingsCacheForTests();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("network");
  };

  const { handleAskQuestion } = await import("../../src/tools/askQuestion.ts");
  const out = await handleAskQuestion("What is the hardest boss?", 5);

  assert.equal(out.ok, true);
  assert.equal(out.data?.status, "no_data");
  assert.match(String(out.data?.answer), /Not enough data/);

  globalThis.fetch = originalFetch;
});

test("ask_question fallback avoids generic guide title for hardest boss query", async () => {
  const data = prepareIndexForWorstBossFallback();
  process.env.MCP_HISTORY_DB_PATH = path.join(data, "history.db");
  process.env.MCP_GRAPH_TIMEOUT_MS = "200";
  process.env.MCP_LLM_BASE_URL = "http://127.0.0.1:1";
  resetSettingsCacheForTests();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("network");
  };

  const { handleAskQuestion } = await import("../../src/tools/askQuestion.ts");
  const out = await handleAskQuestion(
    "Which boss fight in Path of Exile 2 is described as the worst and what makes it so difficult?",
    8,
  );

  assert.equal(out.ok, true);
  assert.equal(out.data?.status, "answered");
  assert.match(String(out.data?.answer), /Choir of Madness/);

  globalThis.fetch = originalFetch;
});
