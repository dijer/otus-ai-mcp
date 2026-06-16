import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { indexDocuments } from "../../src/indexing/indexer.ts";
import { resetSettingsCacheForTests } from "../../src/config/settings.ts";

const setupData = (): string => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "poe2-retr-root-"));
  const data = fs.mkdtempSync(path.join(os.tmpdir(), "poe2-retr-data-"));
  fs.writeFileSync(path.join(root, "boss.md"), "Граф Геонор: рывок, дуговой удар, волки.", "utf-8");
  fs.writeFileSync(path.join(root, "fact.json"), JSON.stringify({ rareFact: "тайминг 1.4 секунды" }), "utf-8");
  indexDocuments({ rootPath: root, globPattern: "**/*", reindex: true, dataDir: data });
  return data;
};

test("findRelevant returns ranked results and trace", async () => {
  const data = setupData();
  process.env.MCP_HISTORY_DB_PATH = path.join(data, "history.db");
  resetSettingsCacheForTests();

  const { findRelevant } = await import("../../src/retrieval/hybrid.ts");
  const out = await findRelevant("рывок геонора", 3);

  assert.ok(out.results.length > 0);
  assert.ok(Array.isArray((out.rankingTrace as { bm25Hits: unknown[] }).bm25Hits));
});

test("findRelevant on empty index returns empty arrays", async () => {
  const data = fs.mkdtempSync(path.join(os.tmpdir(), "poe2-retr-empty-"));
  process.env.MCP_HISTORY_DB_PATH = path.join(data, "history.db");
  resetSettingsCacheForTests();

  const { findRelevant } = await import("../../src/retrieval/hybrid.ts");
  const out = await findRelevant("что угодно", 5);

  assert.equal(out.results.length, 0);
  assert.deepEqual(out.rankingTrace, {
    bm25Hits: [],
    vectorHits: [],
    rrfCandidates: [],
    finalOrder: [],
  });
});
