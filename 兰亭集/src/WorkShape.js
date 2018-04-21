import { width, height, context } from "./WorkInit";
import { gridCanvas } from "./WorkGrid";
import { headerCanvas } from "./WorkGridHeader";
import { numberCanvas } from "./WorkGridNumber";
import { textCanvas } from "./WorkText";
import { scel } from "./WorkScroll";

export let shape = {
  line: function (cxt, begin, end) {
    cxt.moveTo(begin.x, begin.y);
    cxt.lineTo(end.x, end.y);
  },
  area: function (start, col) {
    shape.render();
    context.fillStyle = "#e3edf9";
    context.fillRect(start.x - parseInt(scel.x), start.y - parseInt(scel.y), col.x - start.x + col.width, col.y - start.y + col.height)
    context.strokeStyle = "#006dff";
    context.lineWidth = 1.5;
    context.rect(start.x - parseInt(scel.x), start.y - parseInt(scel.y), col.x - start.x + col.width, col.y - start.y + col.height);
    context.globalCompositeOperation = "source-over";
    context.stroke();
  },
  render: function () {
    context.beginPath();
    context.clearRect(0, 0, width, height);
    context.drawImage(gridCanvas, -parseInt(scel.x), -parseInt(scel.y), width, height);
    context.drawImage(textCanvas, -parseInt(scel.x), -parseInt(scel.y), width, height);
    context.globalCompositeOperation = "source-over";
    context.drawImage(headerCanvas, -parseInt(scel.x), 0, width, height);
    context.drawImage(numberCanvas, 0, -parseInt(scel.y), width, height);
    context.globalCompositeOperation = "destination-over";
    context.stroke();
  },
  border: function (cel) {
    shape.render();
    context.beginPath();
    context.strokeStyle = "#006dff";
    context.lineWidth = 1.5;
    context.rect(cel.x - parseInt(scel.x), cel.y - parseInt(scel.y), cel.width, cel.height);
    context.globalCompositeOperation = "source-over";
    context.stroke();
  }
}