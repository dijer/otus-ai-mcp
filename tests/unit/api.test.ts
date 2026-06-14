import test from "node:test";
import assert from "node:assert/strict";

import { failure, success } from "../../src/types/api.ts";

test("success returns ok=true and data", () => {
  const payload = success({ message: "ok", stub: false });
  assert.equal(payload.ok, true);
  assert.deepEqual(payload.data, { message: "ok", stub: false });
});

test("failure returns code and message", () => {
  const payload = failure("ERR_CODE", "boom");
  assert.equal(payload.ok, false);
  assert.equal(payload.error?.code, "ERR_CODE");
  assert.equal(payload.error?.message, "boom");
});
