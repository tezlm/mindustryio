const { overflow, Position } = require("./misc.js");
const { getByID, Content } = require("../content/content.js");

class BoxedContent {
	constructor(type, id) {
		this.type = type;
		this.id = id;
	}
}

function read(reader) {
	const type = reader.byte();
	switch (type) {
		case 0: return null;
		case 1: return reader.int();
		case 2: return reader.long();
		case 3: return reader.float();
		case 4:
			const exists = reader.byte();
			if(exists === 0) return null;
			return reader.string();
		case 5:
			return getByID(reader.byte(), reader.short());
		case 6:
			const len = reader.short();
			const arr = [];
			for (let i = 0; i < len; i++) arr.push(reader.int());
			return arr;
		case 7:
			return new Position({ x: reader.int(), y: reader.int() });
		case 8:
			const plen = reader.byte();
			const points = [];
			for (let i = 0; i < plen; i++)
				points.push(new Position(reader.int()));
			return points;
		case 10: return !!reader.byte();
		case 11: return reader.double();
		case 12: return new BoxedContent("building", reader.short());
		case 13: return getByIDLAccess[reader.short()];
		case 14:
			const blen = reader.int();
			const slice = reader.raw(blen);
			return slice;
		case 15:
			return ["attack", "rally", "idle"][reader.byte()];
		default:
			throw `Unknown object type: ${type}`;
	}
}

function write(stream, thing) {
	if (thing === null) {
		stream.byte(0);
	} else if (typeof thing === "number" && !isNaN(thing)) {
		if (!Number.isInteger(thing)) {
			stream.byte(11);
			stream.double(thing);
		} else if (thing > overflow) {
			stream.byte(2);
			stream.long(thing);
		} else {
			stream.byte(1);
			stream.int(thing);
		}
	} else if (typeof thing === "string") {
		stream.byte(4);
		if(!thing.length) return stream.byte(0);
		stream.byte(1);
		stream.string(thing);
	} else if (typeof thing === "boolean") {
		stream.byte(10);
		stream.byte(+thing);
	} else if (thing instanceof Content) {
		stream.byte(5);
		stream.byte(thing.typeId);
		stream.short(thing.id);
	} else if (thing instanceof Array) {
		if (thing[0] instanceof Position) {
			stream.byte(8);
			stream.byte(thing.length);
			for (let i of thing) stream.int(i.pack());
		} else {
			stream.byte(6);
			stream.short(thing.length);
			for (let i of thing) stream.int(i);
		}
	} else if (thing instanceof Position) {
		stream.byte(7);
		stream.int(thing.x);
		stream.int(thing.y);
	} else if (thing instanceof Buffer) {
		stream.byte(14);
		stream.int(thing.length);
		stream.raw(thing);
	} else if (thing instanceof BoxedContent) {
		if(thing.type === "building") {
			stream.byte(12);
			stream.short(thing.position);
		} else if(thing.type === "building") {
			stream.byte(13);
			stream.short(thing.id);
		}
	} else {
		throw "can't pack";
	}
}

module.exports = { read, write };

