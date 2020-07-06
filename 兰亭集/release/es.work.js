function cell(x, y) {
  for (; 0 <= y; y--) {
    var row = map[y];
    if (row) {
      for (; 0 <= x; x--) {
        var cel = row[x];
        if (cel)
          return cel;
      }
    }
  }
}

function setMap(x, y, cel) {
  x = parseInt(x), y = parseInt(y);
  let rows = map[y] || {};
  map[y] = rows;
  rows[x] = cel;
}

function index(cel) {
  var index = cel.id.split(":");
  return {
    x: index[1],
    y: index[0],
  }
}

function beforex(cel) {
  var col = index(cel);
  return data[col.y][col.x - 1];
}

function beforey(cel) {
  var col = index(cel);
  return data[col.y - 1][col.x];
}

function getWidth() {
  var cels = data[0];
  var cel = cels[cels.length - 1];
  return cel.x + cel.width;
}

function getHeight() {
  var cel = data[data.length - 1][0];
  return cel.y + cel.height;
}

function position(ev) {
  var x, y;
  if (ev.layerX || ev.layerX == 0) {
    x = ev.layerX;
    y = ev.layerY;
  } else if (ev.offsetX || ev.offsetX == 0) {
    x = ev.offsetX;
    y = ev.offsetY;
  }
  return { x: x + parseInt(scel.x), y: y + parseInt(scel.y) };
}

var map = {};

let api = {
  data: function (row, cel) {
    row = row || 500, cel = cel || 50;
    var i = -1, y = 0.5, rows = [];
    while (++i < row) {
      var l = -1, x = 0.5, cels = [];
      while (++l < cel) {
        cels.push(setCel(i, l, x, y, number.width, number.height));
        x = x + number.width;
      }
      rows.push(cels);
      y = y + number.height;
    }
    return rows;
  },
  resetData: function (rows) {
    map = {};
    var y = 0.5;
    rows.forEach(cels => {
      var x = 0.5, col;
      cels.forEach(cel => {
        col = cel, cel.x = x, cel.y = y;
        setMap(x, y, col);
        x = x + cel.width;
      });
      y = y + col.height;
    });
    return rows;
  },
  resetWidth: function (rows, col, offset) {
    var l = index(col).x;
    rows.forEach(cels => {
      var cel = cels[l];
      cel.width = cel.width + offset;
    });
  },
  resetHeight: function (rows, col, offset) {
    var l = index(col).y;
    rows[l].forEach(cel => {
      cel.height = cel.height + offset;
    });
  },
  title: function () {
    var list = [""].concat(alphabet);
    return list;
  }
};
function setCel(i, l, x, y, width, height) {
  var titles = api.title();
  var col;
  if (0 < i && l == 0) {
    col = {
      id: `${i}:${l}`,
      x: x, y: y,
      width: width,
      height: height,
      text: i
    };
  } else if (0 < l && i == 0) {
    col = {
      id: `${i}:${l}`,
      x: x, y: y,
      width: width,
      height: height,
      text: titles[l]
    };
  } else if (0 == i && 0 == l) {
    col = {
      id: `${i}:${l}`,
      x: x, y: y,
      width: width,
      height: height,
      text: ""
    };
  } else {
    col = {
      id: `${i}:${l}`,
      x: x, y: y,
      width: width,
      height: height,
      text: `${i}:${l}`
    };
  }
  setMap(x, y, col);
  return col;
}

function scrollX() {
  var controller = $(".sm-sheet-scrollbar-horizontal");
  var doc = $(document);
  var startx, starty, col, scale;

  controller.mousedown(mousedown);

  function mousedown(ev) {
    col = cell(ev.pageX, ev.pageY);
    if (!col) return;
    doc.mousemove(mousemove).mouseup(mouseup);
    scale = (getWidth() - width) / (width - controller.width());
    startx = ev.offsetX;
    starty = ev.pageY;
  }

  function mousemove(ev) {
    var offset = parseInt(ev.pageX - startx);
    if (offset < 0) offset = 0;
    controller.offset({ left: offset });
    display(offset);
  }

  function display(offset) {
    offset = parseInt(scale * offset);
    var cel = cell(offset, starty);
    if (col == cel) return;
    scel.x = cel.x;
    sheet.layer();
    col = cel;
  }

  function mouseup() {
    doc.off("mousemove", mousemove).off("mouseup", mouseup);
  }
}

function scrollY() {
  var controller = $(".sm-sheet-scrollbar-vertical");
  var doc = $(document);
  var startx, starty, col, scale;

  controller.mousedown(mousedown);

  function mousedown(ev) {
    col = cell(ev.pageX, ev.pageY);
    if (!col) return;
    doc.mousemove(mousemove).mouseup(mouseup);
    scale = (getHeight() - height) / (height - controller.height());
    startx = ev.pageX;
    starty = ev.offsetY;
  }

  function mousemove(ev) {
    var offset = ev.pageY - starty;
    if (offset < 0) offset = 0;
    controller.offset({ top: offset });
    display(offset);
  }

  function display(offset) {
    offset = parseInt(scale * offset);
    var cel = cell(startx, offset);
    if (col == cel) return;
    scel.y = cel.y;
    sheet.layer();
    col = cel;
  }

  function mouseup() {
    doc.off("mousemove", mousemove).off("mouseup", mouseup);
  }
}

function resizex() {
  let split = $(".split-vertical");
  let canvas = $("canvas");
  var doc = $(document);
  var startx, col, start;

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

function resizey() {
  let split = $(".split-horizontal");
  let canvas = $("canvas");
  var doc = $(document);
  var starty, col, start;

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

let canva = $("canvas");
let textarea = $("textarea");

function action() {
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

let data;
let text;
let grid;
let gridHeader;
let gridNumber;
let width;
let height;
var scel = { x: 0.5, y: 0.5 };
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let devicePixelRatio = window.devicePixelRatio;

var number = {
  width: 120,
  height: 30
};

let sheet;

function init() {
  data = api.data();
  sheet = new Sheet();
}

class Sheet {
  constructor() {
    this.canvas = document.querySelector('#canvas');
    this.cxt = this.canvas.getContext('2d');
    width = $(this.canvas).parent().width(), height = $(this.canvas).parent().height();
    width = $(this.canvas).parent().width(), height = $(this.canvas).parent().height();
    if (devicePixelRatio) {
      this.canvas.style.width = width + "px";
      this.canvas.style.height = height + "px";
      this.canvas.width = width * devicePixelRatio;
      this.canvas.height = height * devicePixelRatio;
      this.cxt.scale(devicePixelRatio, devicePixelRatio);
    }
    this.layer();
    action();
  }

  layer() {
    text = new Text(data);
    grid = new Grid(data, data[0]);
    this.draw();
  }

  draw() {
    this.cxt.beginPath();
    this.cxt.clearRect(0, 0, width, height);
    this.cxt.drawImage(grid.canvas, -parseInt(scel.x), -parseInt(scel.y), width, height);
    this.cxt.drawImage(text.canvas, -parseInt(scel.x), -parseInt(scel.y), width, height);
    this.cxt.globalCompositeOperation = "source-over";
    this.cxt.drawImage(gridHeader.canvas, -parseInt(scel.x), 0, width, height);
    this.cxt.drawImage(gridNumber.canvas, 0, -parseInt(scel.y), width, height);
    this.cxt.globalCompositeOperation = "destination-over";
    this.cxt.stroke();
  }

  area(start, col) {
    this.draw();
    this.cxt.fillStyle = "#e3edf9";
    this.cxt.fillRect(start.x - parseInt(scel.x), start.y - parseInt(scel.y), col.x - start.x + col.width, col.y - start.y + col.height);
    this.cxt.strokeStyle = "#006dff";
    this.cxt.lineWidth = 1.5;
    this.cxt.rect(start.x - parseInt(scel.x), start.y - parseInt(scel.y), col.x - start.x + col.width, col.y - start.y + col.height);
    this.cxt.globalCompositeOperation = "source-over";
    this.cxt.stroke();
  }

  border(cel) {
    this.draw();
    this.cxt.beginPath();
    this.cxt.strokeStyle = "#006dff";
    this.cxt.lineWidth = 1.5;
    this.cxt.rect(cel.x - parseInt(scel.x), cel.y - parseInt(scel.y), cel.width, cel.height);
    this.cxt.globalCompositeOperation = "source-over";
    this.cxt.stroke();
  }
}

class Shape {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.cxt = this.canvas.getContext("2d");
    if (devicePixelRatio) {
      this.canvas.style.width = width + "px";
      this.canvas.style.height = height + "px";
      this.canvas.width = width * devicePixelRatio;
      this.canvas.height = height * devicePixelRatio;
      this.cxt.scale(devicePixelRatio, devicePixelRatio);
    }
  }

  layer() {
    Object.assign(this.cxt,{
      strokeStyle: "#d0d3d7",
      lineCap: "butt",
      font: "14px Arial"
    });
  }
}

class Grid extends Shape {
  constructor(rows, cels) {
    super();
    this.layer(rows, cels);
  }

  layer(rows, cels) {
    super.layer();
    this.draw(rows, cels);
    gridHeader = new GridHeader(rows, cels);
    gridNumber = new GridNumber(rows, cels);
  }

  draw(rows, cels) {
    var i = -1, l = -1;
    this.cxt.beginPath();
    while (++i < rows.length) {
      var col = rows[i][0];
      this.cxt.moveTo(col.x, col.y);
      this.cxt.lineTo(width + 0.5, col.y);
      if (0 < i) {
        this.cxt.fillStyle = "#f7f7f7";
        this.cxt.fillRect(0, col.y, col.width, col.height);
      }
    }

    while (++l < cels.length) {
      var col = cels[l];
      this.cxt.moveTo(col.x, 0.5);
      this.cxt.lineTo(col.x, height + 0.5);
      if (0 < l) {
        this.cxt.fillStyle = "#f7f7f7";
        this.cxt.fillRect(col.x, 0, col.width, col.height);
      }
    }
    this.cxt.stroke();
  }
}

class GridHeader extends Shape {
  constructor(rows, cels) {
    super();
    this.layer(rows, cels);
  }

  layer(rows, cels) {
    super.layer();
    this.draw(rows, cels);
  }

  draw(rows, cels) {
    var l = -1;
    this.cxt.beginPath();
    while (++l < cels.length) {
      var col = cels[l];
      this.cxt.moveTo(col.x, col.y);
      this.cxt.lineTo(col.x, col.height + 0.5);
      if (0 < l) {
        this.cxt.fillStyle = "#f7f7f7";
        this.cxt.fillRect(col.x, 0, col.width, col.height);
        this.cxt.fillStyle = "black";
        this.cxt.fillText(col.text, col.x + 3, col.y + 15);
      }
    }
    this.cxt.stroke();
  }
}

class GridNumber  extends Shape{
  constructor(rows, cels) {
    super();
    this.layer(rows, cels);
  }

  layer(rows, cels) {
    super.layer();
    this.draw(rows, cels);
  }

  draw(rows, cels) {
    var i = -1;
    this.cxt.beginPath();
    while (++i < rows.length) {
      var col = rows[i][0];
      this.cxt.moveTo(col.x, col.y);
      this.cxt.lineTo(col.width + 0.5, col.y);
      if (0 < i) {
        this.cxt.fillStyle = "#f7f7f7";
        this.cxt.fillRect(0, col.y, col.width, col.height);
        this.cxt.fillStyle = "black";
        this.cxt.fillText(col.text, col.x + 3, col.y + 15);
      }
    }
    this.cxt.stroke();
  }
}

class Text extends Shape{
  constructor(data) {
    super();
    this.layer(data);
  }

  layer(data) {
    super.layer();
    this.draw(data);
  }

  draw(rows) {
    rows.forEach(cels => cels.forEach(cel => this.text(cel)));
  }

  text(cel) {
    this.cxt.fillText(cel.text, cel.x + 3, cel.y + 15);
  }

  clear(cel) {
    this.cxt.clearRect(cel.x, cel.y, cel.width, cel.height);
  }

  retext(cel) {
    this.clear(cel);
    this.text(cel);
  }
}

init();
