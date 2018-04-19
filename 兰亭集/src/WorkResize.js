
import { cell, index } from "./WorkLang";
import { data, render } from "./WorkInit";
import { api } from "./WorkApi";

export var scel = { x: 0.5, y: 0.5 };

export function resizex() {
  let canva = $("canvas");
  var doc = $(document);
  var startx, starty, start;

  function mousedown(ev) {
    start = cell(ev.pageX, ev.pageY);
    startx = start.x;
  }

  function mousemove(ev) {
    var cel = cell(ev.pageX, ev.pageY);
    if (cel && Math.abs(cel.x - ev.pageX) < 8 && index(cel).y == 0) {
      canva.css({ cursor: "col-resize" });
      if (start) return;
      canva.mousedown(mousedown);
      doc.mouseup(mouseup);
      start = cel;
    } else {
      canva.css({ cursor: "default" });
      canva.off("mousedown", mousedown);
      doc.off("mouseup", mouseup);
    }
    function mouseup(ev) {
      var offset = parseInt(ev.pageX - startx);
      api.redatax(data, start, offset);
      api.redata(data);
      render();
      start = null;
      canva.off("mousedown", mousedown);
      doc.off("mouseup", mouseup);
    }
  }

  canva.mousemove(mousemove);
}
