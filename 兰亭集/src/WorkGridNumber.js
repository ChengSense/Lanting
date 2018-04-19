import { width, height, canvas } from "./WorkInit";
import { setting } from "./WorkLang";

export var numberCanvas = document.createElement("canvas");
export var numberContext = numberCanvas.getContext("2d");

export var number = {
  width: 120,
  height: 30
};

export function gridNumber(rows, cels) {
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
