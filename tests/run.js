import assert from "node:assert";
import { biggerOf } from "../pick.js";
import { totalBigger } from "../total.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("biggerOf returns a number", () => {
  assert.strictEqual(typeof biggerOf(3, 5), "number");
});

check("totalBigger returns maxes", () => {
  assert.ok(Array.isArray(totalBigger([1], [2]).maxes));
});

check("totalBigger returns a total", () => {
  assert.strictEqual(typeof totalBigger([1], [2]).total, "number");
});

check("render counts maxes", () => {
  assert.strictEqual(typeof render({ left: [1], right: [2] }).count, "number");
});

check("render exposes biggest position", () => {
  assert.strictEqual(typeof render({ left: [1], right: [2] }).biggest_at, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
