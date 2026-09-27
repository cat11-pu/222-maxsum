// total.js：合计
import { biggerOf } from "./pick.js";

export function totalBigger(left, right) {
  if (left.length !== right.length) {
    const error = new Error("两列长度不一致：左列 " + left.length + " 项，右列 " + right.length + " 项");
    error.code = "E_BAD_COLUMN";
    throw error;
  }
  const maxes = [];
  let total = 0;
  let biggest = 0;
  let biggest_at = 0;
  for (let spot = 0; spot < left.length; spot += 1) {
    const value = biggerOf(left[spot], right[spot]);
    maxes.push(value);
    total += value;
    if (spot === 0 || value > biggest) {
      biggest = value;
      biggest_at = spot + 1;
    }
  }
  return { maxes: maxes, total: total, biggest: biggest, biggest_at: biggest_at };
}
