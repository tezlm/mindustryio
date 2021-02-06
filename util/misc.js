const overflow = 65536;
class Position {
  constructor(pos = 0) {
    if (typeof pos === "object" && pos) {
      this.x = pos.x;
      this.y = pos.y;
    } else {
      this.x = pos % overflow;
      this.y = Math.floor(pos / overflow);
    }
  }

  pack() {
    return this.y * overflow + this.x;
  }
}

function err(why) {
  throw new Error(why);
}

module.exports = { Position, err };
