import { map } from "./WorkApi";
import { data } from "./WorkInit";

export function cell(x, y) {
  var cel, l = y;
  while (l--) {
    var i = x;
    while (i--) {
      cel = map[`${i}&${l}`];
      if (cel) {
        return cel;
      }
    }
  }
}

export function index(cel) {
  var index = cel.id.split(":");
  return {
    x: index[1],
    y: index[0],
  }
}

export function beforex(cel) {
  var col = index(cel);
  return data[col.y][col.x - 1];
}

export function beforey(cel) {
  var col = index(cel);
  return data[col.y - 1][col.x];
}

export function position(ev) {
  var x, y;
  if (ev.layerX || ev.layerX == 0) {
    x = ev.layerX;
    y = ev.layerY;
  } else if (ev.offsetX || ev.offsetX == 0) {
    x = ev.offsetX;
    y = ev.offsetY;
  }
  return { x: x, y: y };
}

export function setting(object, src) {
  for (var key in src) object[key] = src[key];
  return object;
}