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

  raw(bytes) {
    this.parts.push(Buffer.from(bytes));
  }

  byte(val) {
    this.parts.push(Buffer.alloc(1).writeInt8(val));
  }

  short(val) {
    this.parts.push(Buffer.alloc(2).writeInt16BE(val));
  }

  int(val) {
    this.parts.push(Buffer.alloc(4).writeInt32BE(val));
  }

  long(val) {
    this.parts.push(Buffer.alloc(8).writeBigInt64BE(val));
  }

  float(val) {
    this.parts.push(Buffer.alloc(4).writeFloatBE(val));
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
