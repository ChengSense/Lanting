import { width, height } from "./WorkInit";
import { cell, position, index } from "./WorkLang";
import { textEdit } from "./WorkText";
import { scrollX, scrollY } from "./WorkScroll";
import { resizex } from "./WorkResize";
import { shape } from "./WorkShape";

let canva = $("canvas");
let textarea = $("textarea");

export var cel = {};

export function action() {
  selectArea();
  scrollX();
  scrollY();
  resizex();
}

function selectArea() {
  var col;
  canva.mousedown(mousedown).mouseup(mouseup).dblclick(edit);
  function mousedown(ev) {
    var p = position(ev);
    textarea.hide();
    cel = col = cell(p.x, p.y);
    if (cel && (index(col).x < 0 || index(col).y < 0)) {
      shape.render(cel);
    }
    canva.mousemove(mousemove);
  }

  function mousemove(ev) {
    var p = position(ev);
    if ((col.x + col.width) < p.x || (col.y + col.height) < p.y) {
      col = cell(p.x, p.y);
      if (col) {
        shape.area(cel, col);
      }
    }
  }

  function mouseup(ev) {
    canva.off("mousemove", mousemove);
    textarea.off("change");
  }
}


function edit(ev) {
  var p = position(ev);
  var cel = cell(p.x, p.y);
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