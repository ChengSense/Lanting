(function () {
  'use strict';

  function cell(x, y) {
    var cel,
        l = y;
    while (l--) {
      var i = x;
      while (i--) {
        cel = map[i + "&" + l];
        if (cel) {
          return cel;
        }
      }
    }
  }

  function index(cel) {
    var index = cel.id.split(":");
    return {
      x: index[1],
      y: index[0]
    };
  }

  function beforex(cel) {
    var col = index(cel);
    return data[col.y][col.x - 1];
  }

  function beforey(cel) {
    var col = index(cel);
    return data[col.y - 1][col.x];
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
    return { x: x, y: y };
  }

  function setting(object, src) {
    for (var key in src) {
      object[key] = src[key];
    }return object;
  }

  var numberCanvas = document.createElement("canvas");
  var numberContext = numberCanvas.getContext("2d");

  var number = {
    width: 120,
    height: 30
  };

  function gridNumber(rows, cels) {
    if (window.devicePixelRatio) {
      numberCanvas.style.width = width + "px";
      numberCanvas.style.height = height + "px";
      numberCanvas.width = canvas.width;
      numberCanvas.height = canvas.height;
      numberContext.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    numberLayer(rows, cels);
  }

  function numberLayer(rows, cels) {
    setting(numberContext, {
      strokeStyle: "#d0d3d7",
      lineCap: "butt"
    });
    drawNumber(rows, cels);
  }

  function drawNumber(rows, cels) {
    var i = -1;
    numberContext.beginPath();
    while (++i < rows.length) {
      var col = rows[i][0];
      numberContext.moveTo(col.x, col.y);
      numberContext.lineTo(col.width + 0.5, col.y);
      if (0 < i) {
        numberContext.fillStyle = "#f7f7f7";
        numberContext.fillRect(0, col.y, col.width, col.height);
        numberContext.fillStyle = "black";
        numberContext.fillText(col.text, col.x + 3, col.y + 15);
      }
    }
    numberContext.stroke();
  }

  var map = {};
  var api = {
    data: function data$$1(row, cel) {
      row = row || 50, cel = cel || 50;
      var i = -1,
          y = 0.5,
          rows = [];
      while (++i < row) {
        var l = -1,
            x = 0.5,
            cels = [];
        while (++l < cel) {
          cels.push(setCel(i, l, x, y, number.width, number.height));
          x = x + number.width;
        }
        rows.push(cels);
        y = y + number.height;
      }
      return rows;
    },
    resetData: function resetData(rows) {
      map = {};
      var y = 0.5;
      rows.forEach(function (cels) {
        var x = 0.5,
            col;
        cels.forEach(function (cel) {
          col = cel, cel.x = x, cel.y = y;
          map[parseInt(cel.x) + "&" + parseInt(cel.y)] = cel;
          x = x + cel.width;
        });
        y = y + col.height;
      });
      return rows;
    },
    resetWidth: function resetWidth(rows, col, offset) {
      var l = index(col).x;
      rows.forEach(function (cels) {
        var cel = cels[l];
        cel.width = cel.width + offset;
      });
    },
    resetHeight: function resetHeight(rows, col, offset) {
      var l = index(col).y;
      rows[l].forEach(function (cel) {
        cel.height = cel.height + offset;
      });
    },
    title: function title() {
      var list = [""].concat(alphabet);
      alphabet.forEach(function (A) {
        alphabet.forEach(function (B) {
          list.push("" + A + B);
        });
      });
      return list;
    }
  };
  function setCel(i, l, x, y, width$$1, height$$1) {
    var titles = api.title();
    var col;
    if (0 < i && l == 0) {
      col = {
        id: i + ":" + l,
        x: x, y: y,
        width: width$$1,
        height: height$$1,
        text: i
      };
    } else if (0 < l && i == 0) {
      col = {
        id: i + ":" + l,
        x: x, y: y,
        width: width$$1,
        height: height$$1,
        text: titles[l]
      };
    } else if (0 == i && 0 == l) {
      col = {
        id: i + ":" + l,
        x: x, y: y,
        width: width$$1,
        height: height$$1,
        text: ""
      };
    } else {
      col = {
        id: i + ":" + l,
        x: x, y: y,
        width: width$$1,
        height: height$$1,
        text: i + ":" + l
      };
    }
    map[parseInt(col.x) + "&" + parseInt(col.y)] = col;
    return col;
  }

  var textCanvas = document.createElement("canvas");
  var textContext = textCanvas.getContext("2d");

  function text(data$$1) {
    if (window.devicePixelRatio) {
      textCanvas.style.width = width + "px";
      textCanvas.style.height = height + "px";
      textCanvas.width = canvas.width;
      textCanvas.height = canvas.height;
      textContext.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    textLayer(data$$1);
  }

  function textLayer(data$$1) {
    setting(textContext, {
      font: "14px Arial"
    });
    drawText(data$$1);
  }

  function drawText(rows) {
    rows.forEach(function (cels) {
      cels.forEach(function (cel) {
        textContext.fillText(cel.text, cel.x + 3, cel.y + 15);
      });
    });
  }

  function textEdit(cel) {
    textContext.clearRect(cel.x, cel.y, cel.width, cel.height);
    textContext.fillText(cel.text, cel.x + 3, cel.y + 15);
  }

  var headerCanvas = document.createElement("canvas");
  var headerContext = headerCanvas.getContext("2d");

  function gridHeader(rows, cels) {
    if (window.devicePixelRatio) {
      headerCanvas.style.width = width + "px";
      headerCanvas.style.height = height + "px";
      headerCanvas.width = canvas.width;
      headerCanvas.height = canvas.height;
      headerContext.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    headerLayer(rows, cels);
  }

  function headerLayer(rows, cels) {
    setting(headerContext, {
      strokeStyle: "#d0d3d7",
      lineCap: "butt"
    });
    drawHeader(rows, cels);
  }

  function drawHeader(rows, cels) {
    var l = -1;
    headerContext.beginPath();
    while (++l < cels.length) {
      var col = cels[l];
      headerContext.moveTo(col.x, col.y);
      headerContext.lineTo(col.x, col.height + 0.5);
      if (0 < l) {
        headerContext.fillStyle = "#f7f7f7";
        headerContext.fillRect(col.x, 0, col.width, col.height);
        headerContext.fillStyle = "black";
        headerContext.fillText(col.text, col.x + 3, col.y + 15);
      }
    }
    headerContext.stroke();
  }

  var gridCanvas = document.createElement("canvas");
  var gridContext = gridCanvas.getContext("2d");

  function grid(rows, cels) {
    if (window.devicePixelRatio) {
      gridCanvas.style.width = width + "px";
      gridCanvas.style.height = height + "px";
      gridCanvas.width = canvas.width;
      gridCanvas.height = canvas.height;
      gridContext.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    gridLayer(rows, cels);
  }

  function gridLayer(rows, cels) {
    setting(gridContext, {
      strokeStyle: "#d0d3d7",
      lineCap: "butt"
    });
    drawGrid(rows, cels);
    gridHeader(rows, cels);
    gridNumber(rows, cels);
  }

  function drawGrid(rows, cels) {
    var i = -1,
        l = -1;
    gridContext.beginPath();
    while (++i < rows.length) {
      var col = rows[i][0];
      gridContext.moveTo(col.x, col.y);
      gridContext.lineTo(width + 0.5, col.y);
      if (0 < i) {
        gridContext.fillStyle = "#f7f7f7";
        gridContext.fillRect(0, col.y, col.width, col.height);
      }
    }

    while (++l < cels.length) {
      var col = cels[l];
      gridContext.moveTo(col.x, 0.5);
      gridContext.lineTo(col.x, height + 0.5);
      if (0 < l) {
        gridContext.fillStyle = "#f7f7f7";
        gridContext.fillRect(col.x, 0, col.width, col.height);
      }
    }
    gridContext.stroke();
  }

  var shape = {
    line: function line(cxt, begin, end) {
      cxt.moveTo(begin.x, begin.y);
      cxt.lineTo(end.x, end.y);
    },
    area: function area(cel, col) {
      context.beginPath();
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#e3edf9";
      context.fillRect(cel.x, cel.y, col.x - cel.x + col.width, col.y - cel.y + col.height);
      context.rect(cel.x, cel.y, col.x - cel.x + col.width, col.y - cel.y + col.height);
      context.drawImage(gridCanvas, 0, 0, width, height);
      context.drawImage(textCanvas, 0, 0, width, height);
      context.strokeStyle = "#006dff";
      context.lineWidth = 2;
      context.stroke();
    },
    render: function render$$1(cel) {
      context.beginPath();
      context.clearRect(0, 0, width, height);
      context.drawImage(gridCanvas, 0, 0, width, height);
      context.drawImage(textCanvas, 0, 0, width, height);
      if (cel) {
        context.strokeStyle = "#006dff";
        context.lineWidth = 1.5;
        context.rect(cel.x, cel.y, cel.width, cel.height);
      }
      context.stroke();
    },
    scrollX: function scrollX(col, scel) {
      context.beginPath();
      context.clearRect(0, 0, width, height);
      context.drawImage(textCanvas, -parseInt(col.x), -parseInt(scel.y), width, height);
      context.drawImage(gridCanvas, -parseInt(col.x), -parseInt(scel.y), width, height);
      context.globalCompositeOperation = "source-over";
      context.drawImage(headerCanvas, -parseInt(col.x), 0, width, height);
      context.drawImage(numberCanvas, 0, -parseInt(scel.y), width, height);
      context.globalCompositeOperation = "destination-over";
      context.stroke();
    },
    scrollY: function scrollY(col, scel) {
      context.beginPath();
      context.clearRect(0, 0, width, height);
      context.drawImage(textCanvas, -parseInt(scel.x), -parseInt(col.y), width, height);
      context.drawImage(gridCanvas, -parseInt(scel.x), -parseInt(col.y), width, height);
      context.globalCompositeOperation = "source-over";
      context.drawImage(headerCanvas, -parseInt(scel.x), 0, width, height);
      context.drawImage(numberCanvas, 0, -parseInt(col.y), width, height);
      context.globalCompositeOperation = "destination-over";
      context.stroke();
    }
  };

  var scel = { x: 0.5, y: 0.5 };

  function scrollX() {
    var controller = $(".sm-sheet-scrollbar-horizontal");
    var doc = $(document);
    var startx, starty, col;

    controller.mousedown(mousedown);

    function mousedown(ev) {
      startx = ev.offsetX;
      starty = ev.pageY;
      col = cell(ev.pageX, ev.pageY);
      if (col) doc.mousemove(mousemove).mouseup(mouseup);
    }

    function mousemove(ev) {
      var offset = parseInt(ev.pageX - startx);
      if (offset < 0) offset = 0;
      controller.offset({ left: offset });
      display(offset);
    }

    function display(offset) {
      var cel = cell(offset, starty);
      if (cel) {
        col = cel;
        scel.x = cel.x;
        shape.scrollX(col, scel);
      }
    }

    function mouseup() {
      doc.off("mousemove", mousemove).off("mouseup", mouseup);
    }
  }

  function scrollY() {
    var controller = $(".sm-sheet-scrollbar-vertical");
    var doc = $(document);
    var startx, starty, col;

    controller.mousedown(mousedown);

    function mousedown(ev) {
      startx = ev.pageX;
      starty = ev.offsetY;
      col = cell(ev.pageX, ev.pageY);
      if (col) doc.mousemove(mousemove).mouseup(mouseup);
    }

    function mousemove(ev) {
      var offset = ev.pageY - starty;
      if (offset < 0) offset = 0;
      controller.offset({ top: offset });
      display(offset);
    }

    function display(offset) {
      var cel = cell(startx, offset);
      if (cel) {
        col = cel;
        scel.y = cel.y;
        shape.scrollY(col, scel);
      }
    }

    function mouseup() {
      doc.off("mousemove", mousemove).off("mouseup", mouseup);
    }
  }

  function resizex() {
    var split = $(".split-vertical");
    var canva = $("canvas");
    var doc = $(document);
    var startx, col, start;

    function mousedown(ev) {
      doc.mouseup(mouseup);
      canva.off("mousedown", mousedown);
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
          canva.css({ cursor: "col-resize" });
          if (col) return;
          canva.mousedown(mousedown);
          col = cel;
        } else if (Math.abs(cel.x - ev.pageX) < 8 && index(cel).y == 0) {
          canva.css({ cursor: "col-resize" });
          if (col) return;
          canva.mousedown(mousedown);
          col = cel;
        } else if (0 < index(cel).x) {
          canva.css({ cursor: "default" });
          canva.off("mousedown", mousedown);
          col = null;
        }
      }
    }

    function mouseup(ev) {
      if (!start) return;
      var offset = parseInt(ev.pageX - startx);
      api.resetWidth(data, start, offset);
      api.resetData(data);
      render();
      start = null;
      split.hide();
      doc.off("mouseup", mouseup);
    }

    canva.mousemove(mousemove);
  }

  function resizey() {
    var split = $(".split-horizontal");
    var canva = $("canvas");
    var doc = $(document);
    var starty, col, start;

    function mousedown(ev) {
      canva.off("mousedown", mousedown);
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
          canva.css({ cursor: "row-resize" });
          if (col) return;
          canva.mousedown(mousedown);
          col = cel;
        } else if (Math.abs(cel.y - ev.pageY) < 8 && index(cel).x == 0) {
          canva.css({ cursor: "row-resize" });
          if (col) return;
          canva.mousedown(mousedown);
          col = cel;
        } else if (0 < index(cel).y) {
          canva.css({ cursor: "default" });
          canva.off("mousedown", mousedown);
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
      render();
      start = null;
    }

    canva.mousemove(mousemove);
  }

  var canva = $("canvas");
  var textarea = $("textarea");

  var cel = {};

  function action() {
    selectArea();
    scrollX();
    scrollY();
    resizex();
    resizey();
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
      if (col.x + col.width < p.x || col.y + col.height < p.y) {
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
    textarea.css({ left: left + 2, top: top + 2, width: cel.width - 6, height: cel.height - 6 });
    textarea.val(cel.text);
  }

  function textChange(cel) {
    textarea.change(function () {
      cel.text = this.value;
      textEdit(cel);
      shape.render();
    });
  }

  var width;
  var height;

  var data;
  var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  var canvas = document.querySelector('#canvas');
  var context = canvas.getContext('2d');

  function init() {
    width = $(canvas).parent().width(), height = $(canvas).parent().height();
    if (window.devicePixelRatio) {
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      context.scale(window.devicePixelRatio, window.devicePixelRatio);

      data = api.data();
      render(data);
      action();
    }
  }

  function render() {
    text(data);
    grid(data, data[0]);
    shape.render();
  }

  init();

}());
