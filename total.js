// total.js：合计（基线：一律给空表）
import { biggerOf } from "./pick.js";

export function totalBigger(left, right) {
  return { maxes: [], total: 0, biggest: 0, biggest_at: 0 };
}
