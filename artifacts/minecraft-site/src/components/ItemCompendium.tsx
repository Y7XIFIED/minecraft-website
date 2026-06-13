import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };
const GH = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures";
const W  = "https://minecraft.wiki/images";

const ITEMS = [
  { name:"Diamond",           img:`${GH}/item/diamond.png`,            cat:"Resource",  rare:"Rare",       desc:"Mined at Y-58. Used to craft the strongest pre-Netherite equipment.",       stack:64 },
  { name:"Netherite Ingot",   img:`${GH}/item/netherite_ingot.png`,    cat:"Resource",  rare:"Very Rare",  desc:"Crafted from 4 Ancient Debris + 4 Gold Ingots. The strongest material.",   stack:64 },
  { name:"Emerald",           img:`${GH}/item/emerald.png`,            cat:"Resource",  rare:"Uncommon",   desc:"The currency of Villager trade. Found only in mountain biomes.",           stack:64 },
  { name:"Ender Pearl",       img:`${GH}/item/ender_pearl.png`,        cat:"Utility",   rare:"Uncommon",   desc:"Thrown to teleport to the landing point. Deals 5 HP fall damage.",         stack:16 },
  { name:"Totem of Undying",  img:`${GH}/item/totem_of_undying.png`,   cat:"Combat",    rare:"Rare",       desc:"Prevents death when held. Drops from Evokers in Woodland Mansions.",       stack:1 },
  { name:"Blaze Rod",         img:`${GH}/item/blaze_rod.png`,          cat:"Resource",  rare:"Uncommon",   desc:"Dropped by Blazes. Used to brew potions and craft Eyes of Ender.",         stack:64 },
  { name:"Nether Star",       img:`${GH}/item/nether_star.png`,        cat:"Special",   rare:"Legendary",  desc:"Dropped only by the Wither. Used to craft a Beacon.",                     stack:64 },
  { name:"Enchanted Book",    img:`${GH}/item/enchanted_book.png`,     cat:"Utility",   rare:"Common",     desc:"Stores an enchantment. Apply to items using an Anvil.",                    stack:1 },
  { name:"Eye of Ender",      img:`${GH}/item/ender_eye.png`,          cat:"Utility",   rare:"Uncommon",   desc:"Leads to Strongholds. 12 are needed to activate the End Portal.",         stack:64 },
  { name:"Golden Apple",      img:`${GH}/item/golden_apple.png`,       cat:"Food",      rare:"Rare",       desc:"Grants Absorption and Regeneration. Crafted from 8 Gold Ingots.",          stack:64 },
  { name:"Elytra",            img:`${GH}/item/elytra.png`,             cat:"Armor",     rare:"Very Rare",  desc:"Found in End City ships. Enables gliding. Pair with Firework Rockets.",    stack:1 },
  { name:"Trident",           img:`${GH}/item/trident.png`,            cat:"Combat",    rare:"Rare",       desc:"Dropped by Drowned (8% chance). Can be thrown or enchanted with Riptide.", stack:1 },
  { name:"Shulker Shell",     img:`${GH}/item/shulker_shell.png`,      cat:"Resource",  rare:"Rare",       desc:"Dropped by Shulkers in End Cities. Used to craft Shulker Boxes.",          stack:64 },
  { name:"Mace",              img:`${GH}/item/mace.png`,               cat:"Combat",    rare:"Rare",       desc:"New in 1.21. Deals bonus damage based on fall height. Needs Heavy Core.",  stack:1 },
  { name:"Diamond Sword",     img:`${GH}/item/diamond_sword.png`,      cat:"Combat",    rare:"Crafted",    desc:"6 attack damage. The pre-Netherite go-to combat weapon.",                  stack:1 },
  { name:"Diamond Pickaxe",   img:`${GH}/item/diamond_pickaxe.png`,    cat:"Tool",      rare:"Crafted",    desc:"Required to mine Obsidian and Ancient Debris. 5 attack damage.",           stack:1 },
  { name:"Compass",           img:`${GH}/item/compass.png`,            cat:"Utility",   rare:"Common",     desc:"Points to world spawn. Combine with a Lodestone for custom pointing.",      stack:64 },
  { name:"Clock",             img:`${GH}/item/clock.png`,              cat:"Utility",   rare:"Common",     desc:"Shows current in-game time. Useful in the Nether where time is obscured.", stack:64 },
  { name:"Phantom Membrane",  img:`${GH}/item/phantom_membrane.png`,   cat:"Resource",  rare:"Uncommon",   desc:"Dropped by Phantoms. Used to repair Elytra and brew Slow Falling potions.", stack:64 },
  { name:"Obsidian",          img:`${W}/Obsidian_JE2.png`,             cat:"Block",     rare:"Common",     desc:"Formed when water meets lava. Required to build Nether Portals. 50 blast resist.", stack:64 },
];

const CATS  = ["All","Resource","Combat","Tool","Armor","Utility","Food","Special","Block"];
const RARES = ["All Rarities","Common","Uncommon","Rare","Very Rare","Legendary","Crafted"];
const RARE_COLOR: Record<string,string> = {
  Common:"#aaa", Uncommon:"#5caf00", Rare:"#4488ff", "Very Rare":"#aa44ff", Legendary:"#fcbe04", Crafted:"#ccc"
};

export function ItemCompendium() {
  const [search, setSearch]   = useState("");
  const [cat, setCat]         = useState("All");
  const [rare, setRare]       = useState("All Rarities");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = ITEMS.filter(it => {
    if (cat !== "All" && it.cat !== cat) return false;
    if (rare !== "All Rarities" && it.rare !== rare) return false;
    if (search && !it.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const item = selected !== null ? ITEMS[selected] : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search items..."
          className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-[8px] text-white placeholder-white/20 outline-none"
          style={px}
        />
      </div>
      <div className="flex gap-1 flex-wrap">
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-2 py-1 text-[6px] border transition-colors ${cat === c ? "border-[#5caf00] text-[#5caf00]" : "border-white/10 text-white/30"}`}
            style={px}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="flex gap-1 flex-wrap">
        {RARES.map(r => (
          <button key={r} onClick={() => setRare(r)}
            className={`px-2 py-1 text-[6px] border transition-colors ${rare === r ? "text-white border-white/30" : "border-white/8 text-white/25 hover:text-white/40"}`}
            style={{ ...px, borderColor: rare === r ? (RARE_COLOR[r] ?? "#fff") + "88" : undefined, color: rare === r ? (RARE_COLOR[r] ?? "#fff") : undefined }}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* List */}
        <div className="md:col-span-2 grid grid-cols-4 sm:grid-cols-5 gap-1.5 content-start max-h-72 overflow-y-auto">
          {filtered.map((it, i) => {
            const idx = ITEMS.indexOf(it);
            return (
              <motion.button
                key={it.name}
                onClick={() => setSelected(selected === idx ? null : idx)}
                whileHover={{ scale: 1.08, y: -3 }}
                title={it.name}
                className={`p-2 border flex flex-col items-center gap-1 transition-all ${selected === idx ? "border-[#5caf00]/40 bg-[#5caf00]/5" : "border-white/5 hover:border-white/15"}`}
              >
                <img src={it.img} alt={it.name}
                  style={{ imageRendering:"pixelated", width:28, height:28 }} />
                <span className="text-[4px] text-white/30 text-center leading-3" style={px}>{it.name}</span>
              </motion.button>
            );
          })}
          {filtered.length === 0 && <p className="text-white/20 text-[7px] p-2 col-span-5" style={px}>No items match.</p>}
        </div>

        {/* Detail */}
        <AnimatePresence>
          {item ? (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              className="border border-white/5 p-4 flex flex-col gap-3"
            >
              <img src={item.img} alt={item.name}
                style={{ imageRendering:"pixelated", width:48, height:48 }} />
              <div>
                <p className="text-white text-[8px] mb-1" style={px}>{item.name}</p>
                <p className="text-[6px]" style={{ ...px, color: RARE_COLOR[item.rare] ?? "#aaa" }}>{item.rare}</p>
              </div>
              <p className="text-white/40 text-xs leading-5">{item.desc}</p>
              <div className="flex gap-4 border-t border-white/5 pt-2">
                <div>
                  <p className="text-[5px] text-white/20 mb-0.5" style={px}>Category</p>
                  <p className="text-[6px] text-white/50" style={px}>{item.cat}</p>
                </div>
                <div>
                  <p className="text-[5px] text-white/20 mb-0.5" style={px}>Stack</p>
                  <p className="text-[6px] text-white/50" style={px}>{item.stack}</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="empty" className="border border-white/5 p-4 flex items-center justify-center">
              <p className="text-white/15 text-[6px]" style={px}>Select an item</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-white/15 text-[6px]" style={px}>{filtered.length} items shown</p>
    </div>
  );
}
