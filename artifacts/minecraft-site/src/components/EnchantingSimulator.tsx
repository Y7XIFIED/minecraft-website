import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };
const GH = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures";

const ITEMS = [
  { name: "Diamond Sword",   img: `${GH}/item/diamond_sword.png`,    enchs: ["Sharpness","Looting","Fire Aspect","Knockback","Smite","Bane of Arthropods","Sweeping Edge","Unbreaking","Mending","Curse of Vanishing"] },
  { name: "Diamond Pickaxe", img: `${GH}/item/diamond_pickaxe.png`,  enchs: ["Efficiency","Fortune","Silk Touch","Unbreaking","Mending","Curse of Vanishing"] },
  { name: "Diamond Bow",     img: `${GH}/item/bow.png`,              enchs: ["Power","Punch","Flame","Infinity","Unbreaking","Mending","Curse of Vanishing"] },
  { name: "Diamond Chestplate", img: `${GH}/item/diamond_chestplate.png`, enchs: ["Protection","Fire Protection","Blast Protection","Projectile Protection","Thorns","Unbreaking","Mending","Curse of Vanishing","Curse of Binding"] },
  { name: "Diamond Helmet",  img: `${GH}/item/diamond_helmet.png`,   enchs: ["Protection","Fire Protection","Blast Protection","Projectile Protection","Respiration","Aqua Affinity","Unbreaking","Mending","Curse of Vanishing","Curse of Binding"] },
  { name: "Diamond Boots",   img: `${GH}/item/diamond_boots.png`,    enchs: ["Protection","Fire Protection","Blast Protection","Projectile Protection","Feather Falling","Depth Strider","Frost Walker","Soul Speed","Unbreaking","Mending","Curse of Vanishing","Curse of Binding"] },
];

const ENCHANT_LEVELS: Record<string, number> = {
  Sharpness: 5, Protection: 4, Efficiency: 5, Power: 5, Fortune: 3,
  Unbreaking: 3, Looting: 3, "Fire Aspect": 2, Knockback: 2, Punch: 2,
  Smite: 5, "Bane of Arthropods": 5, "Sweeping Edge": 3, "Silk Touch": 1,
  "Feather Falling": 4, Respiration: 3, Mending: 1, Infinity: 1, Flame: 1,
  Aqua_Affinity: 1, Thorns: 3, "Depth Strider": 3, "Frost Walker": 2,
  "Projectile Protection": 4, "Blast Protection": 4, "Fire Protection": 4,
  "Soul Speed": 3, "Curse of Vanishing": 1, "Curse of Binding": 1,
};

const ROMAN = ["", "I","II","III","IV","V"];

function randomEnchs(enchs: string[], lapis: number): Array<{ name: string; level: number }> {
  const count = Math.min(enchs.length, 1 + Math.floor(lapis / 3));
  const shuffled = [...enchs].sort(() => Math.random() - 0.5).slice(0, count);
  return shuffled.map(e => ({ name: e, level: Math.ceil(Math.random() * (ENCHANT_LEVELS[e] || 1)) }));
}

export function EnchantingSimulator() {
  const [itemIdx, setItemIdx] = useState(0);
  const [lapis, setLapis]     = useState(3);
  const [result, setResult]   = useState<Array<{ name: string; level: number }> | null>(null);
  const [cost]  = useState(() => Math.floor(1 + Math.random() * 30));

  function enchant() {
    setResult(randomEnchs(ITEMS[itemIdx].enchs, lapis));
  }

  const item = ITEMS[itemIdx];

  return (
    <div className="flex flex-col gap-5">
      {/* Item select */}
      <div className="flex gap-2 flex-wrap">
        {ITEMS.map((it, i) => (
          <button
            key={it.name}
            onClick={() => { setItemIdx(i); setResult(null); }}
            title={it.name}
            className={`p-2 border transition-colors ${itemIdx === i ? "border-[#5caf00] bg-[#5caf00]/10" : "border-white/5 hover:border-white/20"}`}
          >
            <img src={it.img} alt={it.name} style={{ imageRendering: "pixelated", width: 24, height: 24 }} />
          </button>
        ))}
      </div>

      {/* Lapis slider */}
      <div className="flex items-center gap-3">
        <span className="text-white/30 text-[7px] shrink-0" style={px}>Lapis:</span>
        <input type="range" min={1} max={3} value={lapis}
          onChange={e => { setLapis(Number(e.target.value)); setResult(null); }}
          className="flex-1 accent-[#1155cc]" />
        <span className="text-[8px] text-white/60 w-4" style={px}>{lapis}</span>
      </div>

      {/* Enchant button */}
      <div className="flex items-center gap-4">
        <img src={item.img} alt={item.name} style={{ imageRendering: "pixelated", width: 40, height: 40 }} />
        <div className="flex-1">
          <p className="text-white/50 text-[7px] mb-2" style={px}>{item.name}</p>
          <motion.button
            onClick={enchant}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2 text-[8px] bg-[#1a0066] border border-[#4422aa] text-[#aa88ff] hover:bg-[#220088] transition-colors"
            style={px}
          >
            Enchant — {cost} XP
          </motion.button>
        </div>
      </div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-[#4422aa]/40 bg-[#1a0066]/20 p-4 flex flex-col gap-2"
          >
            {result.map((e, i) => (
              <motion.div
                key={e.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between"
              >
                <span className="text-[#aa88ff] text-[7px]" style={px}>
                  {e.name} {ROMAN[e.level]}
                </span>
                <span className="text-[#4422aa] text-[6px]">✦</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
