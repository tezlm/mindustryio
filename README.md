# mindustryio

tools for interacting with mindustry files

**this is a work in progress, do not expect everything to work**

# example

```js
const fs = require("fs");
const { Schematic } = require("mindustryio");
const schem = new Schematic();

schem.resize(5, 5);
schem.tags.name = "example";
for (let x = 0; x < 5; x++) {
  for (let y = 0; y < 5; y++) {
    schem.block(x, y).setBlock("copper-wall");
  }
}
fs.writeFileSync("test.msch", schem.toBuffer());
```

# documentation

### creating schematics

`new Schematic(buffer?) => Schematic`

returns a `Schematic` object.
if you use a buffer, it will load it automatically

### schematic instances

`Schematic.resize(height, width) => void`

resize a schematic to the given height and width.
**Note:** the parameter order is `height, width`,
not `width, height`.

`Schematic.block(x, y) => Block`

returns the block at the given x and y, creating
it if it doesn't exist

`Schematic.delete(x, y) => void`

deletes the block at the given x and y

`Schematic.each(callback(block)) => void`

loops through the blocks in the schematic and calls
`callback` once for each block. `callback` will
be called with the `block` that it found. **Note:**
 don't use this to fill a blank schematic, there
won't be any blocks in it and won't do anything

`Schematic.toBuffer() => Buffer`

converts the schematic into a buffer

### blocks

`Block.position => Position`

what's the block's position?

`Block.block => string`

what's the block? (eg. `router`)

`Block.rotation => integer`

what's the block's rotation?

`Block.config => Config`

what's the block's config?

all properties have a corresponding `getQwerty`
and `setQwerty` function (`getBlock()`, 
`setBlock("copper-wall")`, etc..)

### position

`Position.x => integer` and `Position.y => integer`

if i have to explain this i will hhhhhhhh.

### config

config can be multiple things - blocks without
config will have `null` as its config value. 
common values are numbers, `Position`s, or 
Content

### content

`Content.type => string`

the content type

`Content.name => string`

the content's name

