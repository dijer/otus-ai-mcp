import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { resetSettingsCacheForTests } from "../../src/config/settings.ts";
import { handleIndexStatus } from "../../src/tools/indexStatus.ts";
import { handleIndexFolder } from "../../src/tools/indexFolder.ts";
import { handleFindRelevantDocs } from "../../src/tools/findRelevantDocs.ts";
import { handleAskQuestion } from "../../src/tools/askQuestion.ts";

const setupWorkspace = (): { docsDir: string; dbPath: string } => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), "poe2-integration-"));
  const docsDir = path.join(base, "sample_docs");
  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(
    path.join(docsDir, "countGeonor.md"),
    "Граф Геонор. Фаза 2: дуговой удар, волки. Безопасный вход после рывка: 1.4 секунды.",
    "utf-8",
  );
  return { docsDir, dbPath: path.join(base, "data", "history.db") };
};

test("integration: index_status -> index_folder -> index_status", async () => {
  const ws = setupWorkspace();
  process.env.MCP_HISTORY_DB_PATH = ws.dbPath;
  process.env.MCP_LLM_BASE_URL = "http://127.0.0.1:1";
  process.env.MCP_GRAPH_TIMEOUT_MS = "200";
  resetSettingsCacheForTests();

  const before = handleIndexStatus();
  assert.equal(before.ok, true);

  const indexed = await handleIndexFolder(ws.docsDir, "**/*", true);
  assert.equal(indexed.ok, true);
  assert.equal(indexed.data?.indexedFiles, 1);

  const after = handleIndexStatus();
  assert.equal(after.ok, true);
  assert.equal((after.data?.filesCount as number) >= 1, true);
});

test("integration: find_relevant_docs and ask_question return an answer", async () => {
  const ws = setupWorkspace();
  process.env.MCP_HISTORY_DB_PATH = ws.dbPath;
  process.env.MCP_LLM_BASE_URL = "http://127.0.0.1:1";
  process.env.MCP_GRAPH_TIMEOUT_MS = "200";
  resetSettingsCacheForTests();

  const indexed = await handleIndexFolder(ws.docsDir, "**/*", true);
  assert.equal(indexed.ok, true);

  const found = await handleFindRelevantDocs("дуговой удар геонора", 5);
  assert.equal(found.ok, true);
  assert.ok(((found.data?.results as unknown[]) ?? []).length > 0);

  const answered = await handleAskQuestion("Что делать после дугового удара Геонора во второй фазе?", 5);
  assert.equal(answered.ok, true);
  assert.equal(typeof answered.data?.answer, "string");
  assert.equal(typeof answered.data?.status, "string");
});
