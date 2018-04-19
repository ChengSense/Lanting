import { width, height, canvas } from "./WorkInit";
import { setting } from "./WorkLang";

export var headerCanvas = document.createElement("canvas");
export var headerContext = headerCanvas.getContext("2d");

export var header = {
  width: 60.5,
  height: 30.5
};

export function gridHeader(rows, cels) {
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