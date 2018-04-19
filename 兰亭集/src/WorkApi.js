import { number as num } from "./WorkGridNumber";
import { alphabet as alph } from "./WorkInit";
import { index } from "./WorkLang";

export var map = {};
export let api = {
  data: function (row, cel) {
    row = row || 50, cel = cel || 50
    var i = -1, y = 0.5, rows = [];
    while (++i < row) {
      var l = -1, x = 0.5, cels = [];
      while (++l < cel) {
        cels.push(setCel(i, l, x, y, num.width, num.height));
        x = x + num.width;
      }
      rows.push(cels);
      y = y + num.height;
    }
    return rows;
  },
  redata: function (rows) {
    map = {};
    var y = 0.5;
    rows.forEach(cels => {
      var x = 0.5, col;
      cels.forEach(cel => {
        col = cel, cel.x = x, cel.y = y;
        map[`${parseInt(cel.x)}&${parseInt(cel.y)}`] = cel;
        x = x + cel.width;
      });
      y = y + col.height;
    });
    return rows;
  },
  redatax: function (rows, col, offset) {
    var i = -1, l = index(col).x;
    rows.forEach(cels => {
      var cel = cels[l];
      cel.width = cel.width + offset;
    });
    return rows;
  },
  title: function () {
    var list = [""].concat(alph);
    alph.forEach(A => {
      alph.forEach(B => {
        list.push(`${A}${B}`);
      });
    });
    return list;
  }
}
function setCel(i, l, x, y, width, height) {
  var titles = api.title();
  var col;
  if (0 < i && l == 0) {
    col = {
      id: `${i}:${l}`,
      x: x, y: y,
      width: width,
      height: height,
      text: i
    }
  } else if (0 < l && i == 0) {
    col = {
      id: `${i}:${l}`,
      x: x, y: y,
      width: width,
      height: height,
      text: titles[l]
    }
  } else if (0 == i && 0 == l) {
    col = {
      id: `${i}:${l}`,
      x: x, y: y,
      width: width,
      height: height,
      text: ""
    }
  } else {
    col = {
      id: `${i}:${l}`,
      x: x, y: y,
      width: width,
      height: height,
      text: `${i}:${l}`
    }
  }
  map[`${parseInt(col.x)}&${parseInt(col.y)}`] = col;
  return col;
}
