import { width, height, canvas } from "./WorkInit";
import { setting } from "./WorkLang";
import { gridHeader } from "./WorkGridHeader";
import { gridNumber } from "./WorkGridNumber";

export var gridCanvas = document.createElement("canvas");
export var gridContext = gridCanvas.getContext("2d");

export function grid(rows, cels) {
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
