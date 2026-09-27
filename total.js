// total.js：合计（基线：一律给空表）
import { biggerOf } from "./pick.js";

export function totalBigger(left, right) {
  if (left.length !== right.length) {
    const error = new Error("两列长度不一致");
    error.code = "E_BAD_COLUMN";
    throw error;
  }
  const maxes = new Array(left.length);
  let total = 0;
  let biggest = 0;
  let biggest_at = 0;
  for (let i = 0; i < left.length; i += 1) {
    const value = biggerOf(left[i], right[i]);
    maxes[i] = value;
    total += value;
    if (i === 0 || value > biggest) {
      biggest = value;
      biggest_at = i + 1;
    }
  }
  return { maxes, total, biggest, biggest_at };
}
