import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };
const GH = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures";

const BASES = [
  { name: "Awkward Potion",     img: `${GH}/item/potion.png`,         color: "#55aaff" },
  { name: "Water Bottle",       img: `${GH}/item/potion.png`,         color: "#3355ff" },
  { name: "Mundane Potion",     img: `${GH}/item/potion.png`,         color: "#888" },
];

const INGREDIENTS = [
  { name: "Nether Wart",       img: `${GH}/item/nether_wart.png`,       effect: null },
  { name: "Blaze Powder",      img: `${GH}/item/blaze_powder.png`,      effect: "Strength" },
  { name: "Magma Cream",       img: `${GH}/item/magma_cream.png`,       effect: "Fire Resistance" },
  { name: "Sugar",             img: `${GH}/item/sugar.png`,             effect: "Speed" },
  { name: "Rabbit's Foot",     img: `${GH}/item/rabbit_foot.png`,       effect: "Jump Boost" },
  { name: "Golden Carrot",     img: `${GH}/item/golden_carrot.png`,     effect: "Night Vision" },
  { name: "Ghast Tear",        img: `${GH}/item/ghast_tear.png`,        effect: "Regeneration" },
  { name: "Spider Eye",        img: `${GH}/item/spider_eye.png`,        effect: "Poison" },
  { name: "Fermented Spider Eye", img: `${GH}/item/fermented_spider_eye.png`, effect: "Weakness" },
  { name: "Pufferfish",        img: `${GH}/item/pufferfish.png`,        effect: "Water Breathing" },
  { name: "Turtle Shell",      img: `${GH}/item/turtle_helmet.png`,     effect: "Turtle Master" },
  { name: "Phantom Membrane",  img: `${GH}/item/phantom_membrane.png`,  effect: "Slow Falling" },
];

const EFFECT_COLORS: Record<string, string> = {
  "Strength": "#c83232", "Fire Resistance": "#ff6600", "Speed": "#7cafc2",
  "Jump Boost": "#22cc88", "Night Vision": "#1f1fa1", "Regeneration": "#cd5cab",
  "Poison": "#4e9331", "Weakness": "#484d48", "Water Breathing": "#2e5299",
  "Turtle Master": "#55ab2f", "Slow Falling": "#f7f8e0",
};

export function PotionBrewer() {
  const [base, setBase]         = useState(0);
  const [ingredient, setIng]    = useState<number | null>(null);
  const [modifier, setModifier] = useState<"none"|"redstone"|"glowstone"|"gunpowder">("none");
  const [brewed, setBrewed]     = useState(false);

  const ing = ingredient !== null ? INGREDIENTS[ingredient] : null;
  const effect = ing?.effect ?? null;
  const effectColor = effect ? (EFFECT_COLORS[effect] ?? "#ffffff") : null;

  const modLabel: Record<string,string> = {
    none: "—", redstone: "Redstone (Extend)", glowstone: "Glowstone (Amplify)", gunpowder: "Gunpowder (Splash)"
  };

  function brew() { if (ingredient === null) return; setBrewed(true); }
  function reset() { setIng(null); setModifier("none"); setBrewed(false); }

  return (
    <div className="flex flex-col gap-5">
      {/* Base */}
      <div>
        <p className="text-white/20 text-[7px] mb-2" style={px}>Base liquid:</p>
        <div className="flex gap-2">
          {BASES.map((b, i) => (
            <button key={b.name} onClick={() => { setBase(i); setBrewed(false); }}
              className={`flex items-center gap-2 px-2 py-1.5 border text-[6px] transition-colors ${base === i ? "border-blue-500/50 text-blue-300" : "border-white/10 text-white/40"}`}
              style={px}
            >
              <img src={b.img} alt={b.name} style={{ imageRendering: "pixelated", width: 14, height: 14, filter: `hue-rotate(${i*60}deg)` }} />
              {b.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Ingredient picker */}
      <div>
        <p className="text-white/20 text-[7px] mb-2" style={px}>Ingredient:</p>
        <div className="grid grid-cols-6 gap-1">
          {INGREDIENTS.map((ing, i) => (
            <button key={ing.name} onClick={() => { setIng(i); setBrewed(false); }} title={ing.name}
              className={`p-1.5 border transition-colors ${ingredient === i ? "border-[#5caf00]/60 bg-[#5caf00]/10" : "border-white/5 hover:border-white/20"}`}
            >
              <img src={ing.img} alt={ing.name} style={{ imageRendering: "pixelated", width: 20, height: 20 }} />
            </button>
          ))}
        </div>
        {ing && <p className="text-white/40 text-[6px] mt-1" style={px}>{ing.name}</p>}
      </div>

      {/* Modifier */}
      <div>
        <p className="text-white/20 text-[7px] mb-2" style={px}>Modifier:</p>
        <div className="flex gap-2 flex-wrap">
          {(["none","redstone","glowstone","gunpowder"] as const).map(m => (
            <button key={m} onClick={() => setModifier(m)}
              className={`px-2 py-1 text-[6px] border transition-colors ${modifier === m ? "border-[#fcbe04]/50 text-[#fcbe04]" : "border-white/10 text-white/30"}`}
              style={px}
            >
              {modLabel[m]}
            </button>
          ))}
        </div>
      </div>

      {/* Brew button */}
      <motion.button
        onClick={brew}
        disabled={ingredient === null}
        whileHover={ingredient !== null ? { scale: 1.02 } : {}}
        whileTap={ingredient !== null ? { scale: 0.97 } : {}}
        className="py-3 text-[8px] bg-[#110033] border border-[#6622aa] text-[#aa66ff] disabled:opacity-30 hover:bg-[#1a0044] transition-colors"
        style={px}
      >
        Brew Potion
      </motion.button>

      {/* Result */}
      <AnimatePresence>
        {brewed && effect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border p-4 text-center"
            style={{ borderColor: (effectColor ?? "#888") + "55", background: (effectColor ?? "#888") + "0a" }}
          >
            <p className="text-[7px] text-white/30 mb-2" style={px}>Result:</p>
            <p className="text-[11px] mb-1" style={{ ...px, color: effectColor ?? "#fff" }}>
              Potion of {effect}
            </p>
            <p className="text-[6px] text-white/30" style={px}>
              {modifier === "none" && "3:00 duration"}
              {modifier === "redstone" && "8:00 duration"}
              {modifier === "glowstone" && effect + " II — 1:30 duration"}
              {modifier === "gunpowder" && "Splash — area effect"}
            </p>
          </motion.div>
        )}
        {brewed && !effect && ingredient !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="border border-white/10 p-4 text-center">
            <p className="text-white/30 text-[7px]" style={px}>Mundane Potion produced.</p>
            <p className="text-white/15 text-[6px] mt-1" style={px}>Try Nether Wart first.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
