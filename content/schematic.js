const zlib = require("zlib");
const { Reader, Writer, TypeIO, Position, capitalize } = require("../util");
const header = Buffer.from("msch");

class Stile {
	constructor(data = {}) {
		this.block = "air";
		this.position = new Position(0);
		this.config = null;
		this.rotation = 0;

		Object.assign(this, data);
		const me = this;
		for(let i of ["block", "position", "config", "rotation"]) {
			const fmt = capitalize(i);
			this["get" + fmt] = () => me[i];
			this["set" + fmt] = (val) => me[i] = val;
		}
	}
}

class Schematic {
	// load or make a new Schematic
	constructor(buffer) {
		// create a blank slate
		this.reset();
		if (!buffer) return this;

		// make sure the header exists
		const rawReader = new Reader(buffer);
		if (!rawReader.raw(4).equals(header)) throw "Incorrect header";
		if (rawReader.byte() !== 1) throw "Unsupported schematic version";

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
			dictionary.push(reader.string());
		}

		// actually read the blocks
		const totalBlocks = reader.int();
		for (let i = 0; i < totalBlocks; i++) {
			const block = dictionary[reader.byte()];
			const position = new Position(reader.int());
			const config = TypeIO.read(reader);
			const rotation = reader.byte();
			if (block === "air") continue;
			const tile = new Stile({ block, position, config, rotation });
			this.tiles.push(new Stile(tile));
		}
	}

	// resize the schematic
	resize(height, width) {
		this.height = height;
		this.width = width;
	}

	// get a block at a x and y position
	// creates it if it doesn't exist
	tile(x, y) {
		if (x < 0 || y < 0 || x >= this.width || y >= this.height)
			throw "out of bounds, resize schematic first!";
		for (let i of this.tiles) {
			if (i.position.x === x && i.position.y === y) return i;
		}

		const block = new Stile({ 
			position: new Position({ x, y }),
		});

		this.tiles.push(block);
		return block;
	}

	// delete a block at the x and y position
	delete(x, y) {
		let index = -1;
		for (let i = 0; i < this.tiles.length; i++) {
			const pos = this.tiles[i].position;
			if (pos.x === x && pos.y === y) index = i;
		}
		if (index >= 0) this.tiles.splice(index, 1);
	}

	// loop through the blocks
	each(callback) {
		this.tiles.forEach(callback);
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

		const dictionary = this.tiles.reduce((acc, i) => {
			if (!acc.includes(i.block)) acc.push(i.block);
			return acc;
		}, []);

		writer.byte(dictionary.length);
		dictionary.forEach((i) => writer.string(i));

		writer.int(this.tiles.length);
		for (let i of this.tiles) {
			writer.byte(dictionary.indexOf(i.block));
			writer.int(i.position.pack());
			TypeIO.write(writer, i.config);
			writer.byte(i.rotation);
		}

		return Buffer.concat([
			header,
			Buffer.from("\u0001"),
			zlib.deflateSync(writer.toBuffer()),
		]);
	}

	toString() {
		let str = `Schematic "${this.tags.name}" {\n`;
	}

	// reset the schematic
	reset() {
		this.width = 0;
		this.height = 0;
		this.tags = {};
		this.tiles= [];
	}
}

module.exports = Schematic;

