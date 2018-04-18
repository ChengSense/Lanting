import { width, height, map, context, canvas, data } from "./WorkInit";
import { gridCanvas } from "./WorkGrid";
import { textCanvas, textEdit } from "./WorkText";
import { getCel, position } from "./WorkLang";
import { shape } from "./WorkShape";
import { scrollX, scrollY } from "./WorkScroll";

let canva = $("canvas");
let textarea = $("textarea");

export var cel = {};

export function action() {
  canva.mousedown(mousedown).mouseup(mouseup).dblclick(edit);
  scrollX();
  scrollY();
}

function mousedown(ev) {
  console.log(context.measureText("foo"));
  var p = position(ev), col;
  textarea.hide();
  cel = col = getCel(p.x, p.y);
  if (cel) {
    shape.render(cel);
    canva.mousemove(mousemove);
    function mousemove(ev) {
      var p = position(ev);
      if ((col.x + col.width) < p.x || (col.y + col.height) < p.y) {
        col = getCel(p.x, p.y);
        if (col) {
          shape.area(cel, col);
        }
      }
    }
  }
}

function mouseup(ev) {
  canva.off("mousemove");
  textarea.off("change");
}

function edit(ev) {
  var p = position(ev);
  var cel = getCel(p.x, p.y);
  if (cel) {
    setTextArea(cel);
    textChange(cel);
  }
}

function setTextArea(cel) {
  var top = cel.y + canva.position().top;
  var left = cel.x + canva.position().left;
  textarea.show().focus();
  textarea.css({ left: left, top: top, width: "116px", height: "26px" });
  textarea.val(cel.text);
}

function textChange(cel) {
  textarea.change(function () {
    cel.text = this.value;
    textEdit(cel);
    shape.render();
  });
}

