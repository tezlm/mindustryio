const zlib = require("zlib");
const { Reader, Writer, TypeIO, Position } = require("../util");

class Schematic {
  // load or make a new Schematic
  constructor(buffer) {
    // create a blank slate
    this.reset();
    if (!buffer) return this;

    // make sure the header exists
    const rawReader = new Reader(buffer);
    if (!rawReader.raw(4).equals(Buffer.from("msch"))) err("Incorrect header");
    if (rawReader.byte() !== 1) err("Unsupported schematic version");

    // create a reader and grab width/height
    const reader = new Reader(zlib.inflateSync(buffer.slice(5)));
    this.width = reader.short();
    this.height = reader.short();

    // get tags (eg. name)
    const tagLen = reader.byte();
    for (let i = 0; i < tagLen; i++) {
      this.tags[reader.string()] = reader.string();
    }

    // block dictionary, each id is mapped to a block
    const dictionary = [],
      dictLen = reader.byte();
    for (let i = 0; i < dictLen; i++) {
      dictionary[i] = reader.string();
    }

    // actually read the blocks
    const totalBlocks = reader.int();
    for (let i = 0; i < totalBlocks; i++) {
      const block = dictionary[reader.byte()];
      const position = new Position(reader.int());
      const config = TypeIO.read(reader);
      const rotation = reader.byte();
      if (block === "air") continue;
      this.blocks.push({
        block,
        position,
        config,
        rotation,
      });
    }
  }

  // resize the schematic
  resize(height, width) {
    this.height = height;
    this.width = width;
  }

  // get a block at a x and y position
  block(x, y) {
    for (let i of this.blocks) {
      if (i.position.x === x && i.position.y === y) return i;
    }
    return null;
  }

  toBuffer() {
    // the constructor, but it's opposite day

    const writer = new Writer();
    writer.short(this.width);
    writer.short(this.height);

    writer.byte(Object.keys(this.tags).length);
    for (let i in this.tags) {
      writer.string(i);
      writer.string(this.tags[i]);
    }

    const dictionary = this.blocks.reduce((acc, i) => {
      if (!acc.includes(i.block)) acc.push(i.block);
      return acc;
    }, []);

    writer.byte(dictionary.length);
    dictionary.forEach((i) => writer.string(i));

    writer.byte(this.blocks.length);
    for (let i of this.blocks) {
      writer.byte(dictionary.indexOf(i.block));
      writer.int(i.position.pack());
      TypeIO.write(writer, i.config);
      writer.byte(i.rotation);
    }

    return Buffer.concat([
      Buffer.from("msch\u0001"),
      zlib.deflateSync(writer.toBuffer()),
    ]);
  }

  // reset the schematic
  reset() {
    this.width = 0;
    this.height = 0;
    this.tags = {};
    this.blocks = [];
  }
}

module.exports = Schematic;
