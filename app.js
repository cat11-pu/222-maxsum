// app.js：渲染结果
import { biggerOf } from "./pick.js";
import { totalBigger } from "./total.js";

export function render(spec) {
  const left = spec.left || [];
  const right = spec.right || [];
  const view = totalBigger(left, right);
  const maxes = view.maxes || [];
  return { maxes: maxes, total: view.total || 0, biggest: view.biggest || 0,
           biggest_at: view.biggest_at || 0, count: maxes.length,
           left_count: left.length, right_count: right.length,
           tail: biggerOf(left[0], right[0]) };
}
