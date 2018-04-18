
import { getCel } from "./WorkLang";
import { shape } from "./WorkShape";

export var scel = { x: 0.5, y: 0.5 };

export function resizex() {
  let canva = $("canvas");
  var startx, starty, col;

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
  }
  function mouseup() {

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