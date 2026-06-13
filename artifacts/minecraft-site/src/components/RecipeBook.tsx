import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };
const GH = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures";
const W  = "https://minecraft.wiki/images";

type Slot = string | null;

const RECIPES: Array<{
  name: string; output: string; outputCount?: number; category: string;
  grid: [Slot,Slot,Slot,Slot,Slot,Slot,Slot,Slot,Slot];
}> = [
  { name:"Crafting Table",    output:`${W}/Crafting_Table_JE4_BE3.png`,     category:"Basics",
    grid:[`${W}/Oak_Planks_JE6.png`,`${W}/Oak_Planks_JE6.png`,null,`${W}/Oak_Planks_JE6.png`,`${W}/Oak_Planks_JE6.png`,null,null,null,null] },
  { name:"Stick",             output:`${GH}/item/stick.png`,                outputCount:4, category:"Basics",
    grid:[null,`${W}/Oak_Planks_JE6.png`,null,null,`${W}/Oak_Planks_JE6.png`,null,null,null,null] },
  { name:"Wooden Pickaxe",    output:`${GH}/item/wooden_pickaxe.png`,       category:"Tools",
    grid:[`${W}/Oak_Planks_JE6.png`,`${W}/Oak_Planks_JE6.png`,`${W}/Oak_Planks_JE6.png`,null,`${GH}/item/stick.png`,null,null,`${GH}/item/stick.png`,null] },
  { name:"Diamond Sword",     output:`${GH}/item/diamond_sword.png`,        category:"Combat",
    grid:[null,`${GH}/item/diamond.png`,null,null,`${GH}/item/diamond.png`,null,null,`${GH}/item/stick.png`,null] },
  { name:"Diamond Pickaxe",   output:`${GH}/item/diamond_pickaxe.png`,      category:"Tools",
    grid:[`${GH}/item/diamond.png`,`${GH}/item/diamond.png`,`${GH}/item/diamond.png`,null,`${GH}/item/stick.png`,null,null,`${GH}/item/stick.png`,null] },
  { name:"Diamond Chestplate",output:`${GH}/item/diamond_chestplate.png`,   category:"Armor",
    grid:[`${GH}/item/diamond.png`,null,`${GH}/item/diamond.png`,`${GH}/item/diamond.png`,`${GH}/item/diamond.png`,`${GH}/item/diamond.png`,`${GH}/item/diamond.png`,`${GH}/item/diamond.png`,`${GH}/item/diamond.png`] },
  { name:"Bow",               output:`${GH}/item/bow.png`,                  category:"Combat",
    grid:[null,`${GH}/item/stick.png`,`${GH}/item/string.png`,`${GH}/item/stick.png`,null,`${GH}/item/string.png`,null,`${GH}/item/stick.png`,`${GH}/item/string.png`] },
  { name:"Chest",             output:`${W}/Oak_Log_JE6_BE2.png`,            category:"Storage",
    grid:[`${W}/Oak_Planks_JE6.png`,`${W}/Oak_Planks_JE6.png`,`${W}/Oak_Planks_JE6.png`,`${W}/Oak_Planks_JE6.png`,null,`${W}/Oak_Planks_JE6.png`,`${W}/Oak_Planks_JE6.png`,`${W}/Oak_Planks_JE6.png`,`${W}/Oak_Planks_JE6.png`] },
  { name:"Furnace",           output:`${W}/Furnace_JE4_BE3.png`,            category:"Basics",
    grid:[`${W}/Cobblestone_JE2_BE2.png`,`${W}/Cobblestone_JE2_BE2.png`,`${W}/Cobblestone_JE2_BE2.png`,`${W}/Cobblestone_JE2_BE2.png`,null,`${W}/Cobblestone_JE2_BE2.png`,`${W}/Cobblestone_JE2_BE2.png`,`${W}/Cobblestone_JE2_BE2.png`,`${W}/Cobblestone_JE2_BE2.png`] },
  { name:"Netherite Ingot",   output:`${GH}/item/netherite_ingot.png`,      category:"Nether",
    grid:[`${GH}/item/netherite_scrap.png`,`${GH}/item/netherite_scrap.png`,`${GH}/item/netherite_scrap.png`,`${GH}/item/netherite_scrap.png`,`${GH}/item/gold_ingot.png`,`${GH}/item/gold_ingot.png`,`${GH}/item/gold_ingot.png`,`${GH}/item/gold_ingot.png`,null] },
  { name:"Ender Chest",       output:`${W}/Ender_Chest_JE4_BE3.png`,        category:"Storage",
    grid:[`${W}/Obsidian_JE2.png`,`${W}/Obsidian_JE2.png`,`${W}/Obsidian_JE2.png`,`${W}/Obsidian_JE2.png`,`${GH}/item/ender_eye.png`,`${W}/Obsidian_JE2.png`,`${W}/Obsidian_JE2.png`,`${W}/Obsidian_JE2.png`,`${W}/Obsidian_JE2.png`] },
  { name:"TNT",               output:`${W}/TNT_JE3_BE3.png`,                category:"Misc",
    grid:[`${GH}/item/gunpowder.png`,`${W}/Sand_JE4_BE2.png`,`${GH}/item/gunpowder.png`,`${W}/Sand_JE4_BE2.png`,`${GH}/item/gunpowder.png`,`${W}/Sand_JE4_BE2.png`,`${GH}/item/gunpowder.png`,`${W}/Sand_JE4_BE2.png`,`${GH}/item/gunpowder.png`] },
];

const CATEGORIES = ["All", "Basics", "Tools", "Combat", "Armor", "Storage", "Nether", "Misc"];

export function RecipeBook() {
  const [search, setSearch]   = useState("");
  const [cat, setCat]         = useState("All");
  const [selected, setSelected] = useState<number>(0);

  const filtered = RECIPES.filter(r => {
    if (cat !== "All" && r.category !== cat) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const recipe = filtered[selected] ?? filtered[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <input type="text" value={search} onChange={e => { setSearch(e.target.value); setSelected(0); }}
          placeholder="Search recipes..."
          className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-[8px] text-white placeholder-white/20 outline-none"
          style={px}
        />
      </div>
      <div className="flex gap-1 flex-wrap">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => { setCat(c); setSelected(0); }}
            className={`px-2 py-1 text-[6px] border transition-colors ${cat === c ? "border-[#5caf00] text-[#5caf00]" : "border-white/10 text-white/30"}`}
            style={px}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recipe list */}
        <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
          {filtered.map((r, i) => (
            <button key={r.name} onClick={() => setSelected(i)}
              className={`flex items-center gap-3 px-3 py-2 border transition-colors text-left ${selected === i ? "border-[#5caf00]/40 bg-[#5caf00]/5" : "border-white/5 hover:border-white/10"}`}
            >
              <img src={r.output} alt={r.name} style={{ imageRendering: "pixelated", width: 20, height: 20 }} />
              <span className="text-[7px] text-white/60" style={px}>{r.name}</span>
            </button>
          ))}
        </div>

        {/* Crafting grid */}
        <AnimatePresence mode="wait">
          {recipe && (
            <motion.div
              key={recipe.name}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <p className="text-white/40 text-[7px]" style={px}>{recipe.name}</p>
              {/* 3×3 grid */}
              <div className="grid grid-cols-3 gap-1">
                {recipe.grid.map((slot, i) => (
                  <div key={i}
                    className="w-10 h-10 border border-white/10 bg-white/[0.03] flex items-center justify-center">
                    {slot && <img src={slot} alt="" style={{ imageRendering: "pixelated", width: 28, height: 28 }} />}
                  </div>
                ))}
              </div>
              <span className="text-white/30 text-[7px]">→</span>
              <div className="w-12 h-12 border border-[#5caf00]/30 bg-[#5caf00]/5 flex items-center justify-center relative">
                <img src={recipe.output} alt={recipe.name}
                  style={{ imageRendering: "pixelated", width: 36, height: 36 }} />
                {recipe.outputCount && (
                  <span className="absolute bottom-0.5 right-0.5 text-[7px] text-white" style={px}>{recipe.outputCount}</span>
                )}
              </div>
              <span className="text-white/20 text-[6px]" style={px}>{recipe.category}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
