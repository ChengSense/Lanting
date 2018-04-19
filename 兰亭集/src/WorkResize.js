
import { getCel } from "./WorkLang";
import { shape } from "./WorkShape";
import { data } from "./WorkInit";
import { api } from "./WorkApi";
import { grid } from "./WorkGrid";
import { text } from "./WorkText";

export var scel = { x: 0.5, y: 0.5 };

export function resizex() {
  let canva = $("canvas");
  var startx, starty, col, start;

  canva.mousemove(resizeing);

  function resizeing(ev) {
    var cel = getCel(ev.pageX, ev.pageY);
    if (cel) {
      if (col) {
        if (Math.abs(col.x - ev.pageX) < 8) {
          canva.css({ cursor: "col-resize" });
          canva.mousedown(mousedown).mouseup(mouseup);
        } else {
          canva.css({ cursor: "default" });
        }
      }
      col = cel;
    }
  }
  function mousedown() {
    startx = col.x;
    start = col;
  }
  function mouseup(ev) {
    var offset = ev.pageX - startx;
    api.redatax(data, start, offset);
    api.redata(data);
    text(data);
    grid(data, data[0]);
    shape.render()
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