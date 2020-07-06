
import { cell, index, beforex, beforey } from "./WorkLang";
import { data, sheet } from "./WorkUI";
import { api } from "./WorkApi";

export function resizex() {
  let split = $(".split-vertical");
  let canvas = $("canvas");
  var doc = $(document);
  var startx, starty, col, start;

  function mousedown(ev) {
    doc.mouseup(mouseup);
    canvas.off("mousedown", mousedown);
    split.show();

    var cel = cell(ev.pageX, ev.pageY);
    if (Math.abs(cel.x + cel.width - ev.pageX) < 8) {
      start = cel;
      startx = start.x + start.width;
    } else if (Math.abs(cel.x - ev.pageX) < 8) {
      start = beforex(cel);
      startx = start.x + start.width;
    }
  }

  function mousemove(ev) {
    if (start) return split.css({ left: ev.pageX, top: 0 });
    var cel = cell(ev.pageX, ev.pageY);
    if (cel) {
      if (Math.abs(cel.x + cel.width - ev.pageX) < 8 && index(cel).y == 0) {
        canvas.css({ cursor: "col-resize" });
        if (col) return;
        canvas.mousedown(mousedown);
        col = cel;
      } else if (Math.abs(cel.x - ev.pageX) < 8 && index(cel).y == 0) {
        canvas.css({ cursor: "col-resize" });
        if (col) return;
        canvas.mousedown(mousedown);
        col = cel;
      } else if (0 < index(cel).x) {
        canvas.css({ cursor: "default" });
        canvas.off("mousedown", mousedown);
        col = null;
      }
    }
  }

  function mouseup(ev) {
    if (!start) return;
    doc.off("mouseup", mouseup);
    var offset = parseInt(ev.pageX - startx);
    api.resetWidth(data, start, offset);
    api.resetData(data);
    split.hide();
    sheet.layer();
    start = null;
  }

  canvas.mousemove(mousemove);
}

export function resizey() {
  let split = $(".split-horizontal");
  let canvas = $("canvas");
  var doc = $(document);
  var startx, starty, col, start;

  function mousedown(ev) {
    canvas.off("mousedown", mousedown);
    doc.mouseup(mouseup);
    split.show();

    var cel = cell(ev.pageX, ev.pageY);
    if (Math.abs(cel.y + cel.height - ev.pageY) < 8) {
      start = cel;
      starty = start.y + start.height;
    } else if (Math.abs(cel.y - ev.pageY) < 8) {
      start = beforey(cel);
      starty = start.y + start.height;
    }
  }

  function mousemove(ev) {
    if (start) return split.css({ left: 0, top: ev.pageY });
    var cel = cell(ev.pageX, ev.pageY);
    if (cel) {
      if (Math.abs(cel.y + cel.height - ev.pageY) < 8 && index(cel).x == 0) {
        canvas.css({ cursor: "row-resize" });
        if (col) return;
        canvas.mousedown(mousedown);
        col = cel;
      } else if (Math.abs(cel.y - ev.pageY) < 8 && index(cel).x == 0) {
        canvas.css({ cursor: "row-resize" });
        if (col) return;
        canvas.mousedown(mousedown);
        col = cel;
      } else if (0 < index(cel).y) {
        canvas.css({ cursor: "default" });
        canvas.off("mousedown", mousedown);
        col = null;
      }
    }
  }

  function mouseup(ev) {
    if (!start) return;
    doc.off("mouseup", mouseup);
    var offset = parseInt(ev.pageY - starty);
    api.resetHeight(data, start, offset);
    api.resetData(data);
    split.hide();
    sheet.layer();
    start = null;
  }

  canvas.mousemove(mousemove);
}

