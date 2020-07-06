import { api } from "./WorkApi";
import { action } from "./WorkAction";

export let data;
export let text;
export let grid;
export let gridHeader;
export let gridNumber;
export let width;
export let height;
export var scel = { x: 0.5, y: 0.5 };
export let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let devicePixelRatio = window.devicePixelRatio;

export let header = {
  width: 60.5,
  height: 30.5
};

export var number = {
  width: 120,
  height: 30
};

export let sheet;

export function init() {
  data = api.data();
  sheet = new Sheet();
}

export class Sheet {
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
    this.draw()
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
    this.cxt.fillRect(start.x - parseInt(scel.x), start.y - parseInt(scel.y), col.x - start.x + col.width, col.y - start.y + col.height)
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

export class Grid extends Shape {
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

export class GridHeader extends Shape {
  constructor(rows, cels) {
    super()
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

export class GridNumber  extends Shape{
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

export class Text extends Shape{
  constructor(data) {
    super()
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


