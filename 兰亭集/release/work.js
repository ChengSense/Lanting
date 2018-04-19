(function () {
  'use strict';

  function getCel(x, y) {
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
    redata: function redata(rows) {
      var y = 0.5;
      rows.forEach(function (cels) {
        var x = 0.5,
            col;
        cels.forEach(function (cel) {
          col = cel;
          cel.x = x, cel.y = y, x = x + cel.width;
        });
        y = y + col.height;
      });
      return rows;
    },
    redatax: function redatax(rows, col, offset) {
      var l = col.id.match(/\d+/)[0];
      rows.forEach(function (cels) {
        var cel = cels[l];
        cel.width = cel.width + offset;
      });
      return rows;
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
        id: "" + i + titles[l],
        x: x, y: y,
        width: width$$1,
        height: height$$1,
        text: i
      };
    } else if (0 < l && i == 0) {
      col = {
        id: "" + i + titles[l],
        x: x, y: y,
        width: width$$1,
        height: height$$1,
        text: titles[l]
      };
    } else if (0 == i && 0 == l) {
      col = {
        id: "" + i + titles[l],
        x: x, y: y,
        width: width$$1,
        height: height$$1,
        text: ""
      };
    } else {
      col = {
        id: "" + i + titles[l],
        x: x, y: y,
        width: width$$1,
        height: height$$1,
        text: "" + i + titles[l]
      };
    }
    map[parseInt(col.x) + "&" + parseInt(col.y)] = col;
    return col;
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
    render: function render(cel) {
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

    controller.mousedown(scrollStar);

    function scrollStar(ev) {
      startx = ev.offsetX;
      starty = ev.pageY;
      col = getCel(ev.pageX, ev.pageY);
      if (col) doc.mousemove(scrolling).mouseup(scrollStop);
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

  function scrollY() {
    var controller = $(".sm-sheet-scrollbar-vertical");
    var doc = $(document);
    var startx, starty, col;

    controller.mousedown(scrollStar);

    function scrollStar(ev) {
      startx = ev.pageX;
      starty = ev.offsetY;
      col = getCel(ev.pageX, ev.pageY);
      if (col) doc.mousemove(scrolling).mouseup(scrollStop);
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

  function resizex() {
    var canva = $("canvas");
    var startx, col, start;

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
      shape.render();
    }
  }

  var canva = $("canvas");
  var textarea = $("textarea");

  var cel = {};

  function action() {
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
      cel = col = getCel(p.x, p.y);
      if (cel) {
        shape.render(cel);
        canva.mousemove(mousemove);
      }
    }

    function mousemove(ev) {
      var p = position(ev);
      if (col.x + col.width < p.x || col.y + col.height < p.y) {
        col = getCel(p.x, p.y);
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

  var width;
  var height;
  var map = {};
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
      text(data);
      grid(data, data[0]);
      shape.render();
      action();
    }
  }

  init();

}());
