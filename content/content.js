const { err, capitalize } = require("../util/misc.js");

const ContentType = [
	"item",
	"block",
	"mech_UNUSED",
	"bullet",
	"liquid",
	"status",
	"unit",
	"weather",
	"effect_UNUSED",
	"sector",
	"loadout_UNUSED",
	"typeid_UNUSED",
	"error",
	"planet",
	"ammo",
];

const content = {
	Block: [
		"air",
		"spawn",
		"cliff",
		"deepwater",
		"water",
		"taintedWater",
		"tar",
		"slag",
		"stone",
		"craters",
		"charr",
		"sand",
		"darksand",
		"dirt",
		"mud",
		"ice",
		"snow",
		"darksandTaintedWater",
		"space",
		"dacite",
		"stoneWall",
		"dirtWall",
		"sporeWall",
		"iceWall",
		"daciteWall",
		"sporePine",
		"snowPine",
		"pine",
		"shrubs",
		"whiteTree",
		"whiteTreeDead",
		"sporeCluster",
		"iceSnow",
		"sandWater",
		"darksandWater",
		"duneWall",
		"sandWall",
		"moss",
		"sporeMoss",
		"shale",
		"shaleWall",
		"shaleBoulder",
		"sandBoulder",
		"daciteBoulder",
		"boulder",
		"snowBoulder",
		"basaltBoulder",
		"grass",
		"salt",
		"metalFloor",
		"metalFloorDamaged",
		"metalFloor2",
		"metalFloor3",
		"metalFloor5",
		"basalt",
		"magmarock",
		"hotrock",
		"snowWall",
		"saltWall",
		"darkPanel1",
		"darkPanel2",
		"darkPanel3",
		"darkPanel4",
		"darkPanel5",
		"darkPanel6",
		"darkMetal",
		"pebbles",
		"tendrils",
		"oreCopper",
		"oreLead",
		"oreScrap",
		"oreCoal",
		"oreTitanium",
		"oreThorium",
		"siliconSmelter",
		"siliconCrucible",
		"kiln",
		"graphitePress",
		"plastaniumCompressor",
		"multiPress",
		"phaseWeaver",
		"surgeSmelter",
		"pyratiteMixer",
		"blastMixer",
		"cryofluidMixer",
		"melter",
		"separator",
		"disassembler",
		"sporePress",
		"pulverizer",
		"incinerator",
		"coalCentrifuge",
		"powerSource",
		"powerVoid",
		"itemSource",
		"itemVoid",
		"liquidSource",
		"liquidVoid",
		"illuminator",
		"copperWall",
		"copperWallLarge",
		"titaniumWall",
		"titaniumWallLarge",
		"plastaniumWall",
		"plastaniumWallLarge",
		"thoriumWall",
		"thoriumWallLarge",
		"door",
		"doorLarge",
		"phaseWall",
		"phaseWallLarge",
		"surgeWall",
		"surgeWallLarge",
		"mender",
		"mendProjector",
		"overdriveProjector",
		"overdriveDome",
		"forceProjector",
		"shockMine",
		"scrapWall",
		"scrapWallLarge",
		"scrapWallHuge",
		"scrapWallGigantic",
		"thruster",
		"conveyor",
		"titaniumConveyor",
		"plastaniumConveyor",
		"armoredConveyor",
		"distributor",
		"junction",
		"itemBridge",
		"phaseConveyor",
		"sorter",
		"invertedSorter",
		"router",
		"overflowGate",
		"underflowGate",
		"massDriver",
		"payloadConveyor",
		"payloadRouter",
		"mechanicalPump",
		"rotaryPump",
		"thermalPump",
		"conduit",
		"pulseConduit",
		"platedConduit",
		"liquidRouter",
		"liquidTank",
		"liquidJunction",
		"bridgeConduit",
		"phaseConduit",
		"combustionGenerator",
		"thermalGenerator",
		"steamGenerator",
		"differentialGenerator",
		"rtgGenerator",
		"solarPanel",
		"largeSolarPanel",
		"thoriumReactor",
		"impactReactor",
		"battery",
		"batteryLarge",
		"powerNode",
		"powerNodeLarge",
		"surgeTower",
		"diode",
		"mechanicalDrill",
		"pneumaticDrill",
		"laserDrill",
		"blastDrill",
		"waterExtractor",
		"oilExtractor",
		"cultivator",
		"coreShard",
		"coreFoundation",
		"coreNucleus",
		"vault",
		"container",
		"unloader",
		"duo",
		"scatter",
		"scorch",
		"hail",
		"arc",
		"wave",
		"lancer",
		"swarmer",
		"salvo",
		"fuse",
		"ripple",
		"cyclone",
		"foreshadow",
		"spectre",
		"meltdown",
		"segment",
		"parallax",
		"tsunami",
		"commandCenter",
		"groundFactory",
		"airFactory",
		"navalFactory",
		"additiveReconstructor",
		"multiplicativeReconstructor",
		"exponentialReconstructor",
		"tetrativeReconstructor",
		"repairPoint",
		"resupplyPoint",
		"message",
		"switchBlock",
		"microProcessor",
		"logicProcessor",
		"hyperProcessor",
		"largeLogicDisplay",
		"logicDisplay",
		"memoryCell",
		"memoryBank",
		"launchPad",
		"launchPadLarge",
		"interplanetaryAccelerator",
		"blockForge",
		"blockLoader",
		"blockUnloader",
	],

	Item: [
		"scrap",
		"copper",
		"lead",
		"graphite",
		"coal",
		"titanium",
		"thorium",
		"silicon",
		"plastanium",
		"phaseFabric",
		"surgeAlloy",
		"sporePod",
		"sand",
		"blastCompound",
		"pyratite",
		"metaglass",
	],

	Liquid: ["water", "slag", "oil", "cryofluid"],

	Unit: [
		"mace",
		"dagger",
		"crawler",
		"fortress",
		"scepter",
		"reign",
		"nova",
		"pulsar",
		"quasar",
		"vela",
		"corvus",
		"atrax",
		"spiroct",
		"arkyid",
		"toxopid",
		"flare",
		"eclipse",
		"horizon",
		"zenith",
		"antumbra",
		"mono",
		"poly",
		"mega",
		"quad",
		"oct",
		"alpha",
		"beta",
		"gamma",
		"risso",
		"minke",
		"bryde",
		"sei",
		"omura",
		"block",
	],

	Bullet: [
		"artilleryDense",
		"artilleryPlastic",
		"artilleryPlasticFrag",
		"artilleryHoming",
		"artilleryIncendiary",
		"artilleryExplosive",
		"flakScrap",
		"flakLead",
		"flakGlass",
		"flakGlassFrag",
		"fragGlass",
		"fragExplosive",
		"fragPlastic",
		"fragSurge",
		"fragGlassFrag",
		"fragPlasticFrag",
		"missileExplosive",
		"missileIncendiary",
		"missileSurge",
		"standardCopper",
		"standardDense",
		"standardThorium",
		"standardHoming",
		"standardIncendiary",
		"standardDenseBig",
		"standardThoriumBig",
		"standardIncendiaryBig",
		"waterShot",
		"cryoShot",
		"slagShot",
		"oilShot",
		"heavyWaterShot",
		"heavyCryoShot",
		"heavySlagShot",
		"heavyOilShot",
		"damageLightning",
		"damageLightningGround",
		"fireball",
		"basicFlame",
		"pyraFlame",
		"driverBolt",
	],
};

class Content {
	constructor(type, name) {
		this.type = type;
		this.name = name;
	}

	get typeId() {
		return ContentType.indexOf(this.type.toLowerCase());
	}

	get id() {
		return content[this.type].indexOf(this.name);
	}
}

function getByName(kind, id) {
	if (typeof kind === "number" && !isNaN(kind)) kind = ContentType[kind];
	const selected = content[capitalize(kind)];
	if (!selected) throw "content doesnt exist";
	return selected[id] ? new Content(capitalize(kind), selected[id]) : null;
}

module.exports = {
	ContentType,
	Content,
	content,
	getByName,
};

