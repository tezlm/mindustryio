const { err, Position } = require("./misc.js");
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
  // DO NOT USE, work in progress
  write(stream) {
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
        throw new Error("Unknown object type: " + type);
    }
  },
};
