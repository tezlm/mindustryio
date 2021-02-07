class Reader {
  constructor(buffer) {
    this.buffer = buffer;
    this.offset = 0;
  }

  raw(bytes) {
    this.offset += bytes;
    return this.buffer.slice(this.offset - bytes, this.offset);
  }

  byte() {
    return this.raw(1).readInt8();
  }

  short() {
    return this.raw(2).readInt16BE();
  }

  int() {
    return this.raw(4).readInt32BE();
  }

  long() {
    return this.raw(8).readBigInt64BE();
  }

  float() {
    return this.raw(4).readFloatBE();
  }

  string() {
    const len = this.short();
    return this.raw(len).toString();
  }
}

class Writer {
  constructor(buffer) {
    this.parts = [];
  }

  write(size, kind, value) {
    const buf = Buffer.alloc(size);
    buf[kind](value);
    this.parts.push(buf);
  }

  raw(bytes) {
    this.parts.push(Buffer.from(bytes));
  }

  byte(val) {
    this.write(1, "writeInt8", val);
  }

  short(val) {
    this.write(2, "writeInt16BE", val);
  }

  int(val) {
    this.write(4, "writeInt32BE", val);
  }

  long(val) {
    this.write(8, "writeBigInt64BE", val);
  }

  float(val) {
    this.write(4, "writeFloatBE", val);
  }

  string(str) {
    this.short(str.len);
    this.raw(str);
  }

  toBuffer() {
    return Buffer.concat(this.parts);
  }
}

module.exports = { Reader, Writer };
