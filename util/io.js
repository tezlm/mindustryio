class Reader {
	constructor(buffer) {
		this.buffer = buffer;
		this.offset = 0;
	}

	raw(bytes) {
		const old = this.offset;
		this.offset += bytes;
		return this.buffer.slice(old, this.offset);
	}

	byte()   { return this.raw(1).readInt8() }
	short()  { return this.raw(2).readInt16BE() }
	int()    { return this.raw(4).readInt32BE() }
	long()   { return this.raw(8).readBigInt64BE() }
	float()  { return this.raw(4).readFloatBE() }
	double() { return this.raw(4).readDoubleBE() }

	string() {
		const len = this.short();
		return this.raw(len).toString("utf8");
	}
}

class Writer {
	constructor() {
		this.parts = [];
	}

	write(size, kind, value) {
		const buf = Buffer.alloc(size);
		buf[kind](value);
		this.parts.push(buf);
	}

	raw(bytes) {
		const buf = Buffer.from(bytes);
		this.parts.push(buf);
	}

	byte(val)   { this.write(1, "writeInt8", val) }
	short(val)  { this.write(2, "writeInt16BE", val) }
	int(val)    { this.write(4, "writeInt32BE", val) }
	long(val)   { this.write(8, "writeBigInt64BE", val) }
	float(val)  { this.write(4, "writeFloatBE", val) }
	double(val) { this.write(8, "writeDoubleBE", val) }
	
	string(str) {
		this.short(str.length);
		this.raw(str);
	}

	toBuffer() {
		return Buffer.concat(this.parts);
	}
}

module.exports = { Reader, Writer };

