const overflow = 65536;
class Position {
	constructor(pos = 0) {
		if (typeof pos === "object" && pos) {
			this.x = pos.x;
			this.y = pos.y;
		} else {
			this.x = Math.floor(pos / overflow);
			this.y = pos % overflow;
		}
	}

	pack() {
		return this.x * overflow + this.y;
	}
}

function capitalize(str) {
	return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

module.exports = { Position, overflow, capitalize };

