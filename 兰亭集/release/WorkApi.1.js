import { header, number as num } from "./WorkGrid";
import { map, alphabet as alph } from "./WorkInit";

export let api = {
  data: function (row, cel) {
    var i = 0, y = 0.5, rows = [];
    while (i++ < row) {
      var l = 0, x = 0.5, cels = [];
      while (l++ < cel) {
        var col = setCel(i, l, x, y, width, height);
        cels.push(col);
        map[`${parseInt(col.x)}&${parseInt(col.y)}`] = col;
        x = x + number.width;
      }
      rows.push(cels);
      y = y + number.height;
    }
    console.log(rows);
    return rows;
  },
  title: function () {
    var list = [].concat(alph);
    alph.forEach(A => {
      alph.forEach(B => {
        list.push(`${A}${B}`);
      });
    });
    return list;
  }
}
function setCel(i, l, x, y, width, height) {
  var titles = this.title();
  return {
    id: `${i}${titles[l - 1]}`,
    x: x,
    y: y,
    width: width,
    height: height,
    text: `${i}${titles[l - 1}`
  }
}
