import { width, height, context } from "./WorkInit";
import { gridCanvas } from "./WorkGrid";
import { headerCanvas } from "./WorkGridHeader";
import { numberCanvas } from "./WorkGridNumber";
import { textCanvas } from "./WorkText";

export let shape = {
  line: function (cxt, begin, end) {
    cxt.moveTo(begin.x, begin.y);
    cxt.lineTo(end.x, end.y);
  },
  area: function (cel, col) {
    context.beginPath();
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#e3edf9";
    context.fillRect(cel.x, cel.y, col.x - cel.x + col.width, col.y - cel.y + col.height)
    context.rect(cel.x, cel.y, col.x - cel.x + col.width, col.y - cel.y + col.height);
    context.drawImage(gridCanvas, 0, 0, width, height);
    context.drawImage(textCanvas, 0, 0, width, height);
    context.strokeStyle = "#006dff";
    context.lineWidth = 2;
    context.stroke();
  },
  render: function (cel) {
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
  scrollX: function (col, scel) {
    context.beginPath();
    context.clearRect(0, 0, width, height);
    context.drawImage(textCanvas, - parseInt(col.x), -parseInt(scel.y), width, height);
    context.drawImage(gridCanvas, - parseInt(col.x), - parseInt(scel.y), width, height);
    context.globalCompositeOperation = "source-over";
    context.drawImage(headerCanvas, -parseInt(col.x), 0, width, height);
    context.drawImage(numberCanvas, 0, -parseInt(scel.y), width, height);
    context.globalCompositeOperation = "destination-over";
    context.stroke();
  },
  scrollY: function (col, scel) {
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
}