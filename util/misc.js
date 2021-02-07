const overflow = 65536;
class Position {
  constructor(pos = 0) {
    if (typeof pos === "object" && pos) {
      this.x = pos.x;
      this.y = pos.y;
    } else {
      this.y = pos % overflow;
      this.x = Math.floor(pos / overflow);
    }
  }

  pack() {
    return this.x * overflow + this.y;
  }
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function err(why) {
  throw new Error(why);
}

module.exports = { Position, overflow, err, capitalize };
