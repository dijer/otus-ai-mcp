import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { indexDocuments, readAllChunks, readIndexStatus } from "../../src/indexing/indexer.ts";

const makeTmp = (): { root: string; data: string } => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "poe2-indexer-root-"));
  const data = fs.mkdtempSync(path.join(os.tmpdir(), "poe2-indexer-data-"));
  return { root, data };
};

test("indexDocuments creates chunks and manifest", () => {
  const { root, data } = makeTmp();
  fs.writeFileSync(path.join(root, "boss.md"), "Босс Геонор. Фаза 2. Дуговой удар.", "utf-8");
  fs.writeFileSync(path.join(root, "fact.json"), JSON.stringify({ rareFact: "1.4 секунды" }), "utf-8");

  const out = indexDocuments({ rootPath: root, globPattern: "**/*", reindex: true, dataDir: data });
  assert.equal(out.indexedFiles, 2);
  assert.ok((out.chunksCount as number) >= 2);

  const status = readIndexStatus(data);
  assert.equal(status.isIndexed, true);
  assert.equal(status.filesCount, 2);
});

test("indexDocuments supports incremental unchanged flow", () => {
  const { root, data } = makeTmp();
  fs.writeFileSync(path.join(root, "boss.md"), "Геонор и волки", "utf-8");

  const first = indexDocuments({ rootPath: root, globPattern: "**/*", reindex: true, dataDir: data });
  assert.equal(first.newFiles, 1);

  const second = indexDocuments({ rootPath: root, globPattern: "**/*", reindex: false, dataDir: data });
  assert.equal(second.unchangedFiles, 1);
  assert.equal(second.updatedFiles, 0);
});

test("readAllChunks returns indexed chunk records", () => {
  const { root, data } = makeTmp();
  fs.writeFileSync(path.join(root, "boss.md"), "Геонор. Рывок. Контратака.", "utf-8");

  indexDocuments({ rootPath: root, globPattern: "**/*", reindex: true, dataDir: data });
  const chunks = readAllChunks(data);

  assert.ok(chunks.length > 0);
  assert.equal(typeof chunks[0]?.metadata.source, "string");
});
