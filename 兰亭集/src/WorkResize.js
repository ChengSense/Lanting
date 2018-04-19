
import { cell, index, beforex } from "./WorkLang";
import { data, render } from "./WorkInit";
import { api } from "./WorkApi";

export var scel = { x: 0.5, y: 0.5 };

export function resizex() {
  let canva = $("canvas");
  var doc = $(document);
  var startx, starty, col, start;

  function mousedown(ev) {
    doc.mouseup(mouseup);
    canva.off("mousedown", mousedown);

    var cel = cell(ev.pageX, ev.pageY);
    if (Math.abs(cel.x + cel.width - ev.pageX) < 8) {
      start = cel;
      startx = start.x + start.width;
    } else if (Math.abs(cel.x - ev.pageX) < 8) {
      start = beforex(cel);
      startx = start.x + start.width;
    }
  }

  function mousemove(ev) {
    if (start) return;
    var cel = cell(ev.pageX, ev.pageY);
    if (cel) {
      if (Math.abs(cel.x + cel.width - ev.pageX) < 8 && index(cel).y == 0) {
        canva.css({ cursor: "col-resize" });
        if (col) return;
        canva.mousedown(mousedown);
        col = cel;
      } else if (Math.abs(cel.x - ev.pageX) < 8 && index(cel).y == 0) {
        canva.css({ cursor: "col-resize" });
        if (col) return;
        canva.mousedown(mousedown);
        col = cel;
      } else {
        if (start) return;
        canva.css({ cursor: "default" });
        canva.off("mousedown", mousedown);
        col = null;
      }
    }
  }

  function mouseup(ev) {
    if (!start) return;
    var offset = parseInt(ev.pageX - startx);
    api.redatax(data, start, offset);
    api.redata(data);
    render();
    start = null;
    doc.off("mouseup", mouseup);
  }

  canva.mousemove(mousemove);
}
