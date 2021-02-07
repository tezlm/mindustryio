const { err, overflow, Position } = require("./misc.js");
module.exports = {
  read(stream) {
    const type = stream.byte();
    switch (type) {
      case 0:
        return null;
      case 1:
        return stream.int();
      case 2:
        return stream.long();
      case 3:
        return stream.float();
      case 4:
        return stream.string();
      case 5:
        // need to actually return the correct content
        return [stream.byte(), stream.short()];
      case 6:
        const length = stream.short();
        const arr = [];
        for (let i = 0; i < length; i++) arr.push(stream.int());
        return arr;
      case 7:
        return new Position({ x: stream.int(), y: stream.int() });
      // case 8: byte len = read.b(); Point2[] out = new Point2[len]; for(int i = 0; i < len; i ++) out[i] = Point2.unpack(read.i()); return out;
      // case 9: return TechTree.getNotNull(content.getByID(ContentType.all[read.b()], read.s()));
      // case 10: return read.bool();
      // case 11: return read.d();
      // case 12: return world.build(read.i());
      // case 13: return LAccess.all[read.s()];
      // case 14: int blen = read.i(); byte[] bytes = new byte[blen]; read.b(bytes); return bytes;
      // case 15: return UnitCommand.all[read.b()];
      default:
        err(
          `Unknown object type: ${type} (WIP, don't expect everything to work!)`
        );
    }
  },
  write(stream, thing) {
    if (thing === null) {
      stream.byte(0);
    } else if (typeof thing === "number" && !isNaN(thing)) {
      if (!Number.isInteger(thing)) {
        stream.byte(3);
        stream.float(thing);
      } else if (thing > overflow) {
        stream.byte(2);
        stream.long(thing);
      } else {
        stream.byte(1);
        stream.int(thing);
      }
    } else if (typeof thing === "string") {
      stream.byte(4);
      stream.string(thing);
    } else if (thing instanceof Array) {
      stream.byte(6);
      stream.short(thing.length);
      for (let i of thing) stream.int(i);
    } else if (thing instanceof Position) {
      stream.byte(7);
      stream.int(thing.pack());
    } else {
      err("can't pack");
    }
  },
};
