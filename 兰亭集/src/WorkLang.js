import { map } from "./WorkApi";
import { data } from "./WorkInit";

export function cell(x, y) {
  for (; 0 <= y; y--) {
    var row = map[y];
    if (row) {
      for (; 0 <= x; x--) {
        var cel = row[x];
        if (cel)
          return cel;
      }
    }
  }
}

export function setMap(x, y, cel) {
  x = parseInt(x), y = parseInt(y);
  let rows = map[y] || {};
  map[y] = rows;
  rows[x] = cel;
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

export function setting(object, src) {
  for (var key in src) object[key] = src[key];
  return object;
}

export function getWidth() {
  var cels = data[0];
  var cel = cels[cels.length - 1];
  return cel.x + cel.width;
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