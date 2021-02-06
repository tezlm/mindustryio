const fs = require("fs");
const { Schematic } = require("../index.js");
const buffer = fs.readFileSync(__dirname + "/sample.msch");
const schem = new Schematic(buffer);

console.log("height/width:", schem.height, schem.width);
console.log("name:", schem.tags.name);
console.log("block at (2, 2):", schem.block(2, 2));
