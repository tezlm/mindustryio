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
// if it crashes, something's wrong
new Schematic(schem.toBuffer());
