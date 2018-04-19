
import { api } from "./WorkApi";
import { action } from "./WorkAction";
import { grid } from "./WorkGrid";
import { text, textCanvas } from "./WorkText";
import { shape } from "./WorkShape";


export var width;
export var height;
export var map = {};
export var data;
export var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

export var canvas = document.querySelector('#canvas');
export var context = canvas.getContext('2d');

export function init() {
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
    shape.render()
    action();
  }
}
