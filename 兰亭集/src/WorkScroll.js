
import { cell } from "./WorkLang";
import { shape } from "./WorkShape";

export var scel = { x: 0.5, y: 0.5 };

export function scrollX() {
  var controller = $(".sm-sheet-scrollbar-horizontal");
  var doc = $(document);
  var startx, starty, col;

  controller.mousedown(mousedown);

  function mousedown(ev) {
    col = cell(ev.pageX, ev.pageY);
    if (!col) return;
    startx = ev.offsetX;
    starty = ev.pageY;
    doc.mousemove(mousemove).mouseup(mouseup);
  }

  function mousemove(ev) {
    var offset = parseInt(ev.pageX - startx);
    if (offset < 0) offset = 0;
    controller.offset({ left: offset });
    display(offset);
  }

  function display(offset) {
    var cel = cell(offset, starty);
    if (col == cel) return;
    console.log(`cel=${JSON.stringify(col.x + col.width - offset)}`)
    scel.x = cel.x;
    shape.scrollX(cel, scel);
    col = cel;
  }

  function mouseup() {
    doc.off("mousemove", mousemove).off("mouseup", mouseup);
  }
}

export function scrollY() {
  var controller = $(".sm-sheet-scrollbar-vertical");
  var doc = $(document);
  var startx, starty, col;

  controller.mousedown(mousedown);

  function mousedown(ev) {
    col = cell(ev.pageX, ev.pageY);
    if (!col) return;
    startx = ev.pageX;
    starty = ev.offsetY;
    doc.mousemove(mousemove).mouseup(mouseup);
  }

  function mousemove(ev) {
    var offset = ev.pageY - starty;
    if (offset < 0) offset = 0;
    controller.offset({ top: offset });
    display(offset);
  }

  function display(offset) {
    var cel = cell(startx, offset);
    if (col == cel) return;
    scel.y = cel.y;
    shape.scrollY(cel, scel);
    col = cel;
  }

  function mouseup() {
    doc.off("mousemove", mousemove).off("mouseup", mouseup);
  }
}



