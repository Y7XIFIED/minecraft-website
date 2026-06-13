import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

const BIOMES = [
  { name: "Plains",              color: "#8eb971", cat: "Overworld", temp: "Temperate", rain: true,  mob: "Horse, Donkey",    desc: "Flat grasslands. Ideal for first-night shelters and farming." },
  { name: "Forest",              color: "#3b7a34", cat: "Overworld", temp: "Temperate", rain: true,  mob: "Wolf, Fox",        desc: "Dense oak and birch. Rich in wood resources." },
  { name: "Dark Forest",         color: "#1a3a1a", cat: "Overworld", temp: "Temperate", rain: true,  mob: "Witch",            desc: "Thick canopy blocks daylight. Woodland Mansions spawn here." },
  { name: "Birch Forest",        color: "#6fa85b", cat: "Overworld", temp: "Temperate", rain: true,  mob: "Fox",              desc: "White-barked birches stretch tall in rolling hills." },
  { name: "Taiga",               color: "#2d5e45", cat: "Overworld", temp: "Cold",      rain: true,  mob: "Wolf, Rabbit",     desc: "Spruce forests with cold ground. Villages spawn occasionally." },
  { name: "Snowy Plains",        color: "#ffffff", cat: "Overworld", temp: "Frozen",    rain: false, mob: "Polar Bear, Rabbit", desc: "Blanketed in snow. Villages generate with spruce architecture." },
  { name: "Desert",              color: "#d9c47c", cat: "Overworld", temp: "Hot",       rain: false, mob: "Rabbit, Husk",     desc: "Vast sand dunes. Temples and wells spawn here." },
  { name: "Savanna",             color: "#bda55d", cat: "Overworld", temp: "Hot",       rain: false, mob: "Llama, Horse",     desc: "Acacia trees dot open terrain. Armadillos roam here." },
  { name: "Jungle",              color: "#237a17", cat: "Overworld", temp: "Hot",       rain: true,  mob: "Parrot, Ocelot",   desc: "Dense tropical canopy. Temples hide loot. Melons grow naturally." },
  { name: "Swamp",               color: "#4c6741", cat: "Overworld", temp: "Temperate", rain: true,  mob: "Witch, Frog",      desc: "Murky water and vines. Witch Huts and Slimes spawn." },
  { name: "Mangrove Swamp",      color: "#3a6636", cat: "Overworld", temp: "Hot",       rain: true,  mob: "Frog",             desc: "Tangled mangrove roots over warm, shallow water." },
  { name: "Mushroom Fields",     color: "#882244", cat: "Overworld", temp: "Temperate", rain: false, mob: "Mooshroom",        desc: "Giant mushrooms. No hostile mobs spawn here at all." },
  { name: "Beach",               color: "#ede49f", cat: "Overworld", temp: "Temperate", rain: true,  mob: "Turtle",           desc: "Sandy shores where land meets ocean. Turtle eggs spawn." },
  { name: "Ocean",               color: "#2255aa", cat: "Overworld", temp: "Temperate", rain: true,  mob: "Dolphin, Cod",     desc: "Open water. Ocean Monuments and shipwrecks lurk below." },
  { name: "Deep Ocean",          color: "#112277", cat: "Overworld", temp: "Temperate", rain: true,  mob: "Elder Guardian",   desc: "Dark abyss. Ocean Monuments spawn here." },
  { name: "Frozen Ocean",        color: "#7ab5c4", cat: "Overworld", temp: "Frozen",    rain: false, mob: "Polar Bear",       desc: "Ice sheets drift across arctic seas." },
  { name: "Stony Peaks",         color: "#888",    cat: "Overworld", temp: "Cold",      rain: false, mob: "Ibex (future)",    desc: "Jagged calcite peaks above the snowline." },
  { name: "Meadow",              color: "#7abf5e", cat: "Overworld", temp: "Temperate", rain: true,  mob: "Donkey, Bee",      desc: "Flower-filled alpine meadows. Bees are plentiful here." },
  { name: "Cherry Grove",        color: "#f4a7c3", cat: "Overworld", temp: "Temperate", rain: true,  mob: "Pig, Bee",         desc: "Pink blossom trees in mountainous terrain. Added in 1.20." },
  { name: "Pale Garden",         color: "#ccc",    cat: "Overworld", temp: "Temperate", rain: true,  mob: "Creaking",         desc: "Ghostly white Pale Oak forest. The Creaking emerges at night." },
  { name: "Nether Wastes",       color: "#8b1a00", cat: "Nether",    temp: "Hot",       rain: false, mob: "Zombified Piglin", desc: "Barren netherrack expanses. The default Nether terrain." },
  { name: "Soul Sand Valley",    color: "#2a2233", cat: "Nether",    temp: "Hot",       rain: false, mob: "Ghast, Skeleton",  desc: "Blue fire burns on soul sand. Ancient bones litter the ground." },
  { name: "Crimson Forest",      color: "#9b2020", cat: "Nether",    temp: "Hot",       rain: false, mob: "Hoglin, Piglin",   desc: "Red fungi trees. Hoglin herds and Piglin patrols roam here." },
  { name: "Warped Forest",       color: "#1a7a6e", cat: "Nether",    temp: "Hot",       rain: false, mob: "Enderman",         desc: "Teal warped fungi. No hostile Nether mobs spawn besides Endermen." },
  { name: "Basalt Deltas",       color: "#555",    cat: "Nether",    temp: "Hot",       rain: false, mob: "Magma Cube",       desc: "Black basalt spikes over lava. Only Magma Cubes spawn." },
  { name: "The End",             color: "#33225a", cat: "The End",   temp: "None",      rain: false, mob: "Enderman, Dragon", desc: "Desolate void islands of end stone. The Ender Dragon rules here." },
  { name: "End Highlands",       color: "#4a3377", cat: "The End",   temp: "None",      rain: false, mob: "Enderman, Shulker", desc: "End Cities and Elytra wings await beyond the outer islands." },
  { name: "End Midlands",        color: "#3d2a66", cat: "The End",   temp: "None",      rain: false, mob: "Enderman",         desc: "Sparse outer island terrain between the highlands and barrens." },
];

const CATS = ["All", "Overworld", "Nether", "The End"];
const TEMPS = ["All Temps", "Frozen", "Cold", "Temperate", "Hot", "None"];

export function BiomeEncyclopedia() {
  const [search, setSearch]  = useState("");
  const [cat, setCat]        = useState("All");
  const [temp, setTemp]      = useState("All Temps");
  const [expanded, setExp]   = useState<string | null>(null);

  const filtered = BIOMES.filter(b => {
    if (cat !== "All" && b.cat !== cat) return false;
    if (temp !== "All Temps" && b.temp !== temp) return false;
    if (search && !b.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <input
        type="text" value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search biomes..."
        className="w-full bg-white/5 border border-white/10 px-3 py-2 text-[8px] text-white placeholder-white/20 outline-none focus:border-white/20"
        style={px}
      />
      <div className="flex gap-2 flex-wrap">
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-2 py-1 text-[6px] border transition-colors ${cat === c ? "border-[#5caf00] text-[#5caf00]" : "border-white/10 text-white/30"}`}
            style={px}
          >
            {c}
          </button>
        ))}
        <span className="border-l border-white/10 mx-1" />
        {TEMPS.map(t => (
          <button key={t} onClick={() => setTemp(t)}
            className={`px-2 py-1 text-[6px] border transition-colors ${temp === t ? "border-blue-500/60 text-blue-400" : "border-white/10 text-white/30"}`}
            style={px}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
        {filtered.map(b => (
          <motion.button
            key={b.name}
            onClick={() => setExp(expanded === b.name ? null : b.name)}
            whileHover={{ x: 2 }}
            className="border border-white/5 hover:border-white/10 p-3 text-left transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: b.color }} />
              <span className="text-white/70 text-[7px]" style={px}>{b.name}</span>
              <span className="ml-auto text-[5px] text-white/20" style={px}>{b.cat}</span>
            </div>
            <AnimatePresence>
              {expanded === b.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-white/40 text-xs leading-5 mt-2 mb-1">{b.desc}</p>
                  <div className="flex gap-3 mt-2">
                    <span className="text-[5px] text-white/20" style={px}>Temp: {b.temp}</span>
                    <span className="text-[5px] text-white/20" style={px}>Rain: {b.rain ? "Yes" : "No"}</span>
                    <span className="text-[5px] text-white/20" style={px}>Mob: {b.mob}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
        {filtered.length === 0 && (
          <p className="text-white/20 text-[7px] p-4 col-span-2" style={px}>No biomes match.</p>
        )}
      </div>
      <p className="text-white/15 text-[6px]" style={px}>{filtered.length} biomes · Click to expand</p>
    </div>
  );
}
