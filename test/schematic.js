const assert = require("assert").strict.deepStrictEqual;
const fs = require("fs");
const { Schematic } = require("../index.js");
const buffer = fs.readFileSync(__dirname + "/sample.msch");
const schem = new Schematic(buffer);

assert(schem.width, 4);
assert(schem.height, 8);
assert(schem.tags.name, "Silicon/Blast/Phase/Kiln");
assert(schem.block(2, 2).block, "phase-weaver");
assert(schem.block(3, 4).block, "inverted-sorter");
schem.delete(3, 4);
assert(schem.block(3, 4).block, "air");
schem.block(3, 4).setBlock("copper-wall");
assert(schem.block(3, 4).block, "copper-wall");
// if it crashes, something's wrong
new Schematic(schem.toBuffer());

const schem2 = new Schematic();
schem2.resize(5, 5);
for (let x = 0; x < 5; x++) {
  for (let y = 0; y < 5; y++) {
    schem2.block(x, y).block = "copper-wall";
  }
}
assert(schem2.block(3, 3).block, "copper-wall");
