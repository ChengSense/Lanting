import { scrollX, scrollY } from "./WorkScroll";
import { resizex, resizey } from "./WorkResize";
import { cell, position, index } from "./WorkLang";
import { sheet, text, scel } from "./WorkUI";

let canva = $("canvas");
let textarea = $("textarea");

export function action() {
  selectArea();
  scrollX();
  scrollY();
  resizex();
  resizey();
}

function selectArea() {
  var start, col;
  canva.mousedown(mousedown).mouseup(mouseup).dblclick(edit);
  function mousedown(ev) {
    textarea.hide();
    var p = position(ev);
    start = col = cell(p.x, p.y);
    if (start && (0 < index(col).x && 0 < index(col).y)) {
      sheet.border(start);
      canva.mousemove(mousemove);
    }
  }

  function mousemove(ev) {
    var p = position(ev);
    var cel = cell(p.x, p.y);
    if (col == cel) return;
    sheet.area(start, cel);
    col = cel;
  }

  function mouseup(ev) {
    canva.off("mousemove", mousemove);
    textarea.off("change");
  }
}

function edit(ev) {
  var p = position(ev);
  var cel = cell(p.x, p.y);
  setTextArea(cel);
  textChange(cel);
}

function setTextArea(cel) {
  var top = cel.y + canva.position().top;
  var left = cel.x + canva.position().left;
  textarea.show().focus();

  textarea.css({ left: left - scel.x + 2, top: top - scel.y + 2, width: cel.width - 6, height: cel.height - 6 });
  textarea.val(cel.text);
}

function textChange(cel) {
  textarea.change(function () {
    cel.text = this.value;
    text.retext(cel);
    sheet.layer();
  });
}