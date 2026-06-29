import { useState } from "react";
import { motion } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

const GH = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures";

const ORES = [
  { name: "Bedrock",        color: "#333",    minY: -64, maxY: -60, img: null },
  { name: "Ancient Debris", color: "#6b3a2a", minY: -32, maxY: 119, img: `${GH}/block/ancient_debris_top.png` },
  { name: "Diamond",        color: "#55e8ff", minY: -64, maxY: 16,  img: `${GH}/block/diamond_ore.png`,        best: -58 },
  { name: "Deepslate Diam", color: "#44bbcc", minY: -64, maxY: -8,  img: null },
  { name: "Emerald",        color: "#17dd62", minY: -16, maxY: 320, img: `${GH}/block/emerald_ore.png` },
  { name: "Redstone",       color: "#e02020", minY: -64, maxY: 16,  img: `${GH}/block/redstone_ore.png`,       best: -58 },
  { name: "Gold",           color: "#fcbe04", minY: -64, maxY: 32,  img: `${GH}/block/gold_ore.png`,           best: -16 },
  { name: "Lapis",          color: "#1155cc", minY: -64, maxY: 64,  img: `${GH}/block/lapis_ore.png`,          best: 0 },
  { name: "Iron",           color: "#d0a070", minY: -64, maxY: 320, img: `${GH}/block/iron_ore.png`,           best: 16 },
  { name: "Copper",         color: "#c87941", minY: -16, maxY: 112, img: `${GH}/block/copper_ore.png`,         best: 48 },
  { name: "Coal",           color: "#888",    minY: 0,   maxY: 320, img: `${GH}/block/coal_ore.png`,           best: 96 },
  { name: "Nether Quartz",  color: "#ffe8cc", minY: 10,  maxY: 117, img: null },
  { name: "Nether Gold",    color: "#ffa500", minY: 10,  maxY: 117, img: null },
];

const Y_MIN = -64;
const Y_MAX = 320;
const Y_RANGE = Y_MAX - Y_MIN;

function yToPercent(y: number) {
  return ((y - Y_MIN) / Y_RANGE) * 100;
}

export function OreDepthChart() {
  const [yLevel, setYLevel] = useState(16);
  const present = ORES.filter(o => yLevel >= o.minY && yLevel <= o.maxY);

  return (
    <div className="flex flex-col gap-6">
      {/* Y slider */}
      <div className="flex items-center gap-4">
        <span className="text-white/40 text-[7px] w-12 shrink-0" style={px}>Y Level</span>
        <input
          type="range"
          min={-64} max={320}
          value={yLevel}
          onChange={e => setYLevel(Number(e.target.value))}
          className="flex-1 accent-[#5caf00]"
        />
        <motion.span
          key={yLevel}
          initial={{ scale: 1.3, color: "#5caf00" }}
          animate={{ scale: 1, color: "#ffffff" }}
          transition={{ duration: 0.2 }}
          className="text-[9px] w-12 text-right tabular-nums"
          style={px}
        >
          {yLevel}
        </motion.span>
      </div>

      {/* Visual strip */}
      <div className="relative h-16 bg-black/40 border border-white/5 overflow-hidden">
        {ORES.map(ore => (
          <div
            key={ore.name}
            className="absolute top-0 bottom-0 opacity-30"
            style={{
              left: `${yToPercent(ore.minY)}%`,
              width: `${yToPercent(ore.maxY) - yToPercent(ore.minY)}%`,
              backgroundColor: ore.color,
            }}
          />
        ))}
        {/* Current Y indicator */}
        <motion.div
          className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
          animate={{ left: `${yToPercent(yLevel)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        {/* Labels */}
        <span className="absolute left-1 bottom-1 text-[6px] text-white/20" style={px}>Y-64</span>
        <span className="absolute right-1 bottom-1 text-[6px] text-white/20" style={px}>Y320</span>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-1 text-[6px] text-white/20" style={px}>Y0</span>
      </div>

      {/* Present ores */}
      <div>
        <p className="text-white/30 text-[7px] mb-3" style={px}>Found at Y {yLevel}:</p>
        <div className="flex flex-wrap gap-2">
          {present.length === 0 && <span className="text-white/20 text-[7px]" style={px}>No ores here.</span>}
          {present.map(ore => (
            <motion.div
              key={ore.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-2 py-1 border"
              style={{ borderColor: ore.color + "66" }}
            >
              {ore.img && (
                <img src={ore.img} alt={ore.name} style={{ imageRendering: "pixelated", width: 12, height: 12 }} />
              )}
              <span className="text-[6px]" style={{ ...px, color: ore.color }}>{ore.name}</span>
              {ore.best !== undefined && ore.best === yLevel && (
                <span className="text-[6px] text-[#fcbe04]" style={px}>★ Best</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
