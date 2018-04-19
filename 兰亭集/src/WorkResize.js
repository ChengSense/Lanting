
import { getCel } from "./WorkLang";
import { shape } from "./WorkShape";
import { data } from "./WorkInit";
import { api } from "./WorkApi";
import { grid } from "./WorkGrid";
import { text } from "./WorkText";

export var scel = { x: 0.5, y: 0.5 };

export function resizex() {
  let canva = $("canvas");
  var doc = $(document);
  var startx, starty, start;

  canva.mousemove(resizeing);

  function resizeing(ev) {
    var cel = getCel(ev.pageX, ev.pageY);
    if (cel) {
      if (Math.abs(cel.x - ev.pageX) < 8) {
        canva.css({ cursor: "col-resize" });
        if (!start) {
          canva.mousedown(mousedown);
          doc.mouseup(mouseup);
          start = cel;
        }
      } else {
        if (start) {
          canva.css({ cursor: "default" });
          canva.off("mousedown", mousedown);
          doc.off("mouseup", mouseup);
        }
      }
    }
    function mousedown(ev) {
      start = getCel(ev.pageX, ev.pageY);
      startx = start.x;
    }
    function mouseup(ev) {
      var offset = parseInt(ev.pageX - startx);
      api.redatax(data, start, offset);
      api.redata(data);
      text(data);
      grid(data, data[0]);
      shape.render();
      start = null;
      canva.off("mousedown", mousedown);
      doc.off("mouseup", mouseup);
    }
  }
}
export function resizeY() {
  let canva = $("canvas");
  var startx, starty, col;

  canva.mousemove(resizeing);

  function resizeing(ev) {
    var cel = getCel(ev.pageX, ev.pageY);
    if (cel) {
      if (col) {
        if (Math.abs(col.y - ev.pageY) < 8) {
          canva.css({ cursor: "row-resize" });
        } else {
          canva.css({ cursor: "default" });
        }
      }
      col = cel;
    }
  }
}