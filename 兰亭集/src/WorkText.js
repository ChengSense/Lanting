import { width, height, canvas } from "./WorkInit";
import { setting } from "./WorkLang";

export var textCanvas = document.createElement("canvas");
export var textContext = textCanvas.getContext("2d");

export function text(data) {
  if (window.devicePixelRatio) {
    textCanvas.style.width = width + "px";
    textCanvas.style.height = height + "px";
    textCanvas.width = canvas.width;
    textCanvas.height = canvas.height;
    textContext.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  textLayer(data);
}

function textLayer(data) {
  setting(textContext, {
    font: "14px Arial"
  });
  drawText(data);
}

function drawText(rows) {
  rows.forEach(cels => {
    cels.forEach(cel => {
      textContext.fillText(cel.text, cel.x + 3, cel.y + 15);
    });
  });
}

export function textEdit(cel) {
  textContext.clearRect(cel.x, cel.y, cel.width, cel.height);
  textContext.fillText(cel.text, cel.x + 3, cel.y + 15);
}