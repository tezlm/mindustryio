const { Position, capitalize } = require("../util");

class Tile {
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

module.exports = Tile;

