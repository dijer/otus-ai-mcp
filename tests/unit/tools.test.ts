import test from "node:test";
import assert from "node:assert/strict";

import { handleFindRelevantDocs } from "../../src/tools/findRelevantDocs.ts";
import { handleIndexFolder } from "../../src/tools/indexFolder.ts";
import { handleAskQuestion } from "../../src/tools/askQuestion.ts";

test("index_folder validates empty path", async () => {
  const out = await handleIndexFolder("", "**/*", false);
  assert.equal(out.ok, false);
  assert.equal(out.error?.code, "INDEX_PATH_INVALID");
});

test("index_folder validates missing path", async () => {
  const out = await handleIndexFolder("./definitely-missing-dir", "**/*", false);
  assert.equal(out.ok, false);
  assert.equal(out.error?.code, "INDEX_PATH_NOT_FOUND");
});

test("find_relevant_docs validates short query", async () => {
  const out = await handleFindRelevantDocs("x", 5);
  assert.equal(out.ok, false);
  assert.equal(out.error?.code, "FIND_QUERY_INVALID");
});

test("ask_question validates invalid args", async () => {
  const short = await handleAskQuestion("hi", 5);
  assert.equal(short.ok, false);
  assert.equal(short.error?.code, "ASK_QUESTION_INVALID");

  const badTopK = await handleAskQuestion("нормальный вопрос", 0);
  assert.equal(badTopK.ok, false);
  assert.equal(badTopK.error?.code, "ASK_TOPK_INVALID");
});
