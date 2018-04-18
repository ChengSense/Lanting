import { width, height, canvas } from "./WorkInit";
import { textCanvas } from "./WorkText";
import { setting } from "./WorkLang";
import { api } from "./WorkApi";

export var gridCanvas = document.createElement("canvas");
export var gridContext = gridCanvas.getContext("2d");

export var headerCanvas = document.createElement("canvas");
export var headerContext = headerCanvas.getContext("2d");

export var numberCanvas = document.createElement("canvas");
export var numberContext = numberCanvas.getContext("2d");

export var header = {
  width: 60.5,
  height: 30.5
};

export var number = {
  width: 120,
  height: 30
};

export function grid(rows, cels) {
  if (window.devicePixelRatio) {
    gridCanvas.style.width = width + "px";
    gridCanvas.style.height = height + "px";
    gridCanvas.width = canvas.width;
    gridCanvas.height = canvas.height;
    var textWidth = parseInt(gridContext.measureText(rows)) + 0.5;
    if (number.width < textWidth) number.width = textWidth;
    gridContext.scale(window.devicePixelRatio, window.devicePixelRatio);

    numberCanvas.style.width = width + "px";
    numberCanvas.style.height = height + "px";
    numberCanvas.width = canvas.width;
    numberCanvas.height = canvas.height;
    numberContext.scale(window.devicePixelRatio, window.devicePixelRatio);

    headerCanvas.style.width = width + "px";
    headerCanvas.style.height = height + "px";
    headerCanvas.width = canvas.width;
    headerCanvas.height = canvas.height;
    headerContext.scale(window.devicePixelRatio, window.devicePixelRatio);
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
  gridNumber(rows, cels)
}

function drawGrid(rows, cels) {
  var i = -1, l = -1;
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

function gridNumber(rows, cels) {
  var i = -1;
  numberContext.beginPath();
  while (++i < rows.length) {
    var col = rows[i][0];
    numberContext.strokeStyle = "#d0d3d7";
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

function gridHeader(rows, cels) {
  var l = -1;
  headerContext.beginPath();
  while (++l < cels.length) {
    var col = cels[l];
    headerContext.strokeStyle = "#d0d3d7";
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