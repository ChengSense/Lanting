
import { cell, index } from "./WorkLang";
import { data, render } from "./WorkInit";
import { api } from "./WorkApi";

export var scel = { x: 0.5, y: 0.5 };

export function resizex() {
  let canva = $("canvas");
  var doc = $(document);
  var startx, starty, col, start;

  function mousedown(ev) {
    start = cell(ev.pageX, ev.pageY);
    startx = start.x;
    doc.mouseup(mouseup);
  }

  function mousemove(ev) {
    var cel = cell(ev.pageX, ev.pageY);
    if (cel) {
      if (Math.abs(cel.x - ev.pageX) < 8 && index(cel).y == 0) {
        canva.css({ cursor: "col-resize" });
        if (col) return;
        canva.mousedown(mousedown);
        col = cel;
      } else {
        canva.css({ cursor: "default" });
        canva.off("mousedown", mousedown);
        if (!start)  col = null;;
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
    canva.off("mousedown", mousedown);
    doc.off("mouseup", mouseup);
  }

  canva.mousemove(mousemove);
}
