(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function cell(x, y) {
    for (; 0 <= y; y--) {
      var row = map[y];

      if (row) {
        for (; 0 <= x; x--) {
          var cel = row[x];
          if (cel) return cel;
        }
      }
    }
  }
  function setMap(x, y, cel) {
    x = parseInt(x), y = parseInt(y);
    var rows = map[y] || {};
    map[y] = rows;
    rows[x] = cel;
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

    return {
      x: x + parseInt(scel.x),
      y: y + parseInt(scel.y)
    };
  }

  var map = {};
  var api = {
    data: function data(row, cel) {
      row = row || 500, cel = cel || 50;
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
          setMap(x, y, col);
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
      return list;
    }
  };

  function setCel(i, l, x, y, width, height) {
    var titles = api.title();
    var col;

    if (0 < i && l == 0) {
      col = {
        id: "".concat(i, ":").concat(l),
        x: x,
        y: y,
        width: width,
        height: height,
        text: i
      };
    } else if (0 < l && i == 0) {
      col = {
        id: "".concat(i, ":").concat(l),
        x: x,
        y: y,
        width: width,
        height: height,
        text: titles[l]
      };
    } else if (0 == i && 0 == l) {
      col = {
        id: "".concat(i, ":").concat(l),
        x: x,
        y: y,
        width: width,
        height: height,
        text: ""
      };
    } else {
      col = {
        id: "".concat(i, ":").concat(l),
        x: x,
        y: y,
        width: width,
        height: height,
        text: "".concat(i, ":").concat(l)
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
      controller.offset({
        left: offset
      });
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
      controller.offset({
        top: offset
      });
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
    var split = $(".split-vertical");
    var canvas = $("canvas");
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
      if (start) return split.css({
        left: ev.pageX,
        top: 0
      });
      var cel = cell(ev.pageX, ev.pageY);

      if (cel) {
        if (Math.abs(cel.x + cel.width - ev.pageX) < 8 && index(cel).y == 0) {
          canvas.css({
            cursor: "col-resize"
          });
          if (col) return;
          canvas.mousedown(mousedown);
          col = cel;
        } else if (Math.abs(cel.x - ev.pageX) < 8 && index(cel).y == 0) {
          canvas.css({
            cursor: "col-resize"
          });
          if (col) return;
          canvas.mousedown(mousedown);
          col = cel;
        } else if (0 < index(cel).x) {
          canvas.css({
            cursor: "default"
          });
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
    var split = $(".split-horizontal");
    var canvas = $("canvas");
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
      if (start) return split.css({
        left: 0,
        top: ev.pageY
      });
      var cel = cell(ev.pageX, ev.pageY);

      if (cel) {
        if (Math.abs(cel.y + cel.height - ev.pageY) < 8 && index(cel).x == 0) {
          canvas.css({
            cursor: "row-resize"
          });
          if (col) return;
          canvas.mousedown(mousedown);
          col = cel;
        } else if (Math.abs(cel.y - ev.pageY) < 8 && index(cel).x == 0) {
          canvas.css({
            cursor: "row-resize"
          });
          if (col) return;
          canvas.mousedown(mousedown);
          col = cel;
        } else if (0 < index(cel).y) {
          canvas.css({
            cursor: "default"
          });
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

  var canva = $("canvas");
  var textarea = $("textarea");
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

      if (start && 0 < index(col).x && 0 < index(col).y) {
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
    textarea.css({
      left: left - scel.x + 2,
      top: top - scel.y + 2,
      width: cel.width - 6,
      height: cel.height - 6
    });
    textarea.val(cel.text);
  }

  function textChange(cel) {
    textarea.change(function () {
      cel.text = this.value;
      text.retext(cel);
      sheet.layer();
    });
  }

  var data;
  var text;
  var grid;
  var gridHeader;
  var gridNumber;
  var width;
  var height;
  var scel = {
    x: 0.5,
    y: 0.5
  };
  var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  var devicePixelRatio = window.devicePixelRatio;
  var number = {
    width: 120,
    height: 30
  };
  var sheet;
  function init() {
    data = api.data();
    sheet = new Sheet();
  }
  var Sheet = /*#__PURE__*/function () {
    function Sheet() {
      _classCallCheck(this, Sheet);

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

    _createClass(Sheet, [{
      key: "layer",
      value: function layer() {
        text = new Text(data);
        grid = new Grid(data, data[0]);
        this.draw();
      }
    }, {
      key: "draw",
      value: function draw() {
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
    }, {
      key: "area",
      value: function area(start, col) {
        this.draw();
        this.cxt.fillStyle = "#e3edf9";
        this.cxt.fillRect(start.x - parseInt(scel.x), start.y - parseInt(scel.y), col.x - start.x + col.width, col.y - start.y + col.height);
        this.cxt.strokeStyle = "#006dff";
        this.cxt.lineWidth = 1.5;
        this.cxt.rect(start.x - parseInt(scel.x), start.y - parseInt(scel.y), col.x - start.x + col.width, col.y - start.y + col.height);
        this.cxt.globalCompositeOperation = "source-over";
        this.cxt.stroke();
      }
    }, {
      key: "border",
      value: function border(cel) {
        this.draw();
        this.cxt.beginPath();
        this.cxt.strokeStyle = "#006dff";
        this.cxt.lineWidth = 1.5;
        this.cxt.rect(cel.x - parseInt(scel.x), cel.y - parseInt(scel.y), cel.width, cel.height);
        this.cxt.globalCompositeOperation = "source-over";
        this.cxt.stroke();
      }
    }]);

    return Sheet;
  }();

  var Shape = /*#__PURE__*/function () {
    function Shape() {
      _classCallCheck(this, Shape);

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

    _createClass(Shape, [{
      key: "layer",
      value: function layer() {
        Object.assign(this.cxt, {
          strokeStyle: "#d0d3d7",
          lineCap: "butt",
          font: "14px Arial"
        });
      }
    }]);

    return Shape;
  }();

  var Grid = /*#__PURE__*/function (_Shape) {
    _inherits(Grid, _Shape);

    var _super = _createSuper(Grid);

    function Grid(rows, cels) {
      var _this;

      _classCallCheck(this, Grid);

      _this = _super.call(this);

      _this.layer(rows, cels);

      return _this;
    }

    _createClass(Grid, [{
      key: "layer",
      value: function layer(rows, cels) {
        _get(_getPrototypeOf(Grid.prototype), "layer", this).call(this);

        this.draw(rows, cels);
        gridHeader = new GridHeader(rows, cels);
        gridNumber = new GridNumber(rows, cels);
      }
    }, {
      key: "draw",
      value: function draw(rows, cels) {
        var i = -1,
            l = -1;
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
    }]);

    return Grid;
  }(Shape);
  var GridHeader = /*#__PURE__*/function (_Shape2) {
    _inherits(GridHeader, _Shape2);

    var _super2 = _createSuper(GridHeader);

    function GridHeader(rows, cels) {
      var _this2;

      _classCallCheck(this, GridHeader);

      _this2 = _super2.call(this);

      _this2.layer(rows, cels);

      return _this2;
    }

    _createClass(GridHeader, [{
      key: "layer",
      value: function layer(rows, cels) {
        _get(_getPrototypeOf(GridHeader.prototype), "layer", this).call(this);

        this.draw(rows, cels);
      }
    }, {
      key: "draw",
      value: function draw(rows, cels) {
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
    }]);

    return GridHeader;
  }(Shape);
  var GridNumber = /*#__PURE__*/function (_Shape3) {
    _inherits(GridNumber, _Shape3);

    var _super3 = _createSuper(GridNumber);

    function GridNumber(rows, cels) {
      var _this3;

      _classCallCheck(this, GridNumber);

      _this3 = _super3.call(this);

      _this3.layer(rows, cels);

      return _this3;
    }

    _createClass(GridNumber, [{
      key: "layer",
      value: function layer(rows, cels) {
        _get(_getPrototypeOf(GridNumber.prototype), "layer", this).call(this);

        this.draw(rows, cels);
      }
    }, {
      key: "draw",
      value: function draw(rows, cels) {
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
    }]);

    return GridNumber;
  }(Shape);
  var Text = /*#__PURE__*/function (_Shape4) {
    _inherits(Text, _Shape4);

    var _super4 = _createSuper(Text);

    function Text(data) {
      var _this4;

      _classCallCheck(this, Text);

      _this4 = _super4.call(this);

      _this4.layer(data);

      return _this4;
    }

    _createClass(Text, [{
      key: "layer",
      value: function layer(data) {
        _get(_getPrototypeOf(Text.prototype), "layer", this).call(this);

        this.draw(data);
      }
    }, {
      key: "draw",
      value: function draw(rows) {
        var _this5 = this;

        rows.forEach(function (cels) {
          return cels.forEach(function (cel) {
            return _this5.text(cel);
          });
        });
      }
    }, {
      key: "text",
      value: function text(cel) {
        this.cxt.fillText(cel.text, cel.x + 3, cel.y + 15);
      }
    }, {
      key: "clear",
      value: function clear(cel) {
        this.cxt.clearRect(cel.x, cel.y, cel.width, cel.height);
      }
    }, {
      key: "retext",
      value: function retext(cel) {
        this.clear(cel);
        this.text(cel);
      }
    }]);

    return Text;
  }(Shape);

  init();

}());
