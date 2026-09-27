// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "左列 " + (spec.left || []).length + " 项，右列 " + (spec.right || []).length + " 项。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.maxes.forEach(function (value, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = (spec.left || [])[spot] + " 与 " + (spec.right || [])[spot];
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, Math.max(0, value) * 10) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = "较大值 " + value;
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "较大值合计 " + view.total + "，最大较大值 " + view.biggest
      + "（第 " + (view.biggest_at + 1) + " 项）";
    parts.log.textContent = "项数 " + view.count;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "算较大值合计";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "右列加一项";
  addButton.addEventListener("click", function () {
    spec.right = (spec.right || []).concat([6]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "右列去一项";
  dropButton.addEventListener("click", function () {
    spec.right = (spec.right || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一个右列值";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = "4";
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (!Number.isNaN(parsed)) {
      try {
        const view = render(Object.assign({}, spec, { right: (spec.right || []).map(() => parsed) }));
        parts.out.textContent = "右列全用 " + parsed + "：合计 " + view.total;
      } catch (error) {
        parts.out.textContent = String(error && error.code ? error.code : String(error));
      }
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看合计";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "较大值合计 " + view.total + "，最大较大值 " + view.biggest;
  });
  parts.controls.appendChild(readButton);

  draw();
}
