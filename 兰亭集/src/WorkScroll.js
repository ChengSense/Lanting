
import { getCel } from "./WorkLang";
import { shape } from "./WorkShape";

export var scel = { x: 0.5, y: 0.5 };

export function scrollX() {
  var controller = $(".sm-sheet-scrollbar-horizontal");
  var doc = $(document);
  var startx, starty, col;

  controller.mousedown(scrollStar);

  function scrollStar(ev) {
    startx = ev.offsetX;
    starty = ev.pageY;
    col = getCel(ev.pageX, ev.pageY);
    if (col)
      doc.mousemove(scrolling).mouseup(scrollStop);
  }

  function scrolling(ev) {
    var offset = ev.pageX - startx;
    if (offset < 0) offset = 0;
    controller.offset({ left: offset });
    display(offset);
  }

  function display(offset) {
    var cel = getCel(offset, starty);
    if (cel) {
      col = cel;
      scel.x = cel.x;
      shape.scrollX(col, scel);
    }
  }

  function scrollStop() {
    doc.off("mousemove", scrolling).off("mouseup", scrollStop);
  }
}

export function scrollY() {
  var controller = $(".sm-sheet-scrollbar-vertical");
  var doc = $(document);
  var startx, starty, col;

  controller.mousedown(scrollStar);

  function scrollStar(ev) {
    startx = ev.pageX;
    starty = ev.offsetY;
    col = getCel(ev.pageX, ev.pageY);
    if (col)
      doc.mousemove(scrolling).mouseup(scrollStop);
  }

  function scrolling(ev) {
    var offset = ev.pageY - starty;
    if (offset < 0) offset = 0;
    controller.offset({ top: offset });
    display(offset);
  }

  function display(offset) {
    var cel = getCel(startx, offset);
    if (cel) {
      col = cel;
      scel.y = cel.y;
      shape.scrollY(col, scel);
    }
  }

  function scrollStop() {
    doc.off("mousemove", scrolling).off("mouseup", scrollStop);
  }
}



