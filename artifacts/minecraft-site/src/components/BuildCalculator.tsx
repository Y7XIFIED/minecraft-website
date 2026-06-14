import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

const GH = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures";

const BLOCK_OPTIONS = [
  { name: "Cobblestone",  img: `${GH}/block/cobblestone.png` },
  { name: "Planks",       img: `${GH}/block/oak_planks.png` },
  { name: "Stone",        img: `${GH}/block/stone.png` },
  { name: "Bricks",       img: `${GH}/block/bricks.png` },
  { name: "Obsidian",     img: `${GH}/block/obsidian.png` },
  { name: "Grass Block",  img: `${GH}/block/grass_block_side.png` },
];

type Mode = "filled" | "hollow" | "walls" | "floor";

export function BuildCalculator() {
  const [l, setL] = useState(10);
  const [w, setW] = useState(10);
  const [h, setH] = useState(5);
  const [mode, setMode] = useState<Mode>("filled");
  const [block, setBlock] = useState(0);

  function calc(): number {
    if (mode === "filled")  return l * w * h;
    if (mode === "floor")   return l * w;
    if (mode === "walls") {
      return 2 * (l + w - 2) * h;
    }
    // hollow: outer - inner
    return (l * w * h) - Math.max(0, (l - 2) * (w - 2) * (h - 2));
  }

  const total = calc();
  const stacks = Math.floor(total / 64);
  const remainder = total % 64;
  const chests = Math.ceil(total / (27 * 64));

  const MODES: { key: Mode; label: string }[] = [
    { key: "filled",  label: "Solid" },
    { key: "hollow",  label: "Hollow" },
    { key: "walls",   label: "Walls Only" },
    { key: "floor",   label: "Floor Only" },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Dims */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Length", val: l, set: setL },
          { label: "Width",  val: w, set: setW },
          { label: "Height", val: h, set: setH },
        ].map(({ label, val, set }) => (
          <div key={label} className="flex flex-col gap-1.5">
            <label className="text-[6px] text-white/30 uppercase tracking-wider" style={px}>{label}</label>
            <div className="flex items-center border border-white/10">
              <button onClick={() => set(v => Math.max(1, v - 1))}
                className="px-2 py-2 text-white/40 hover:text-white text-[10px]">−</button>
              <span className="flex-1 text-center text-[9px] text-white" style={px}>{val}</span>
              <button onClick={() => set(v => Math.min(512, v + 1))}
                className="px-2 py-2 text-white/40 hover:text-white text-[10px]">+</button>
            </div>
          </div>
        ))}
      </div>

      {/* Mode */}
      <div className="flex gap-2 flex-wrap">
        {MODES.map(m => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-3 py-1.5 text-[6px] border transition-colors ${
              mode === m.key ? "border-[#5caf00] text-[#5caf00]" : "border-white/10 text-white/40 hover:text-white/60"
            }`}
            style={px}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Block picker */}
      <div className="flex gap-2">
        {BLOCK_OPTIONS.map((b, i) => (
          <button
            key={b.name}
            onClick={() => setBlock(i)}
            title={b.name}
            className={`p-1 border transition-colors ${block === i ? "border-[#5caf00]" : "border-white/5"}`}
          >
            <img src={b.img} alt={b.name} style={{ imageRendering: "pixelated", width: 20, height: 20 }} />
          </button>
        ))}
      </div>

      {/* Result */}
      <AnimatePresence mode="wait">
        <motion.div
          key={total}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-white/5 p-5 bg-white/[0.02]"
        >
          <div className="flex items-center gap-4 mb-4">
            <img src={BLOCK_OPTIONS[block].img} alt="block"
              style={{ imageRendering: "pixelated", width: 32, height: 32 }} />
            <div>
              <div className="text-[#5caf00] text-xl mb-1" style={px}>{total.toLocaleString()}</div>
              <div className="text-white/30 text-[7px]" style={px}>{BLOCK_OPTIONS[block].name} blocks</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-4">
            <div>
              <div className="text-[6px] text-white/20 mb-1" style={px}>Stacks</div>
              <div className="text-[9px] text-white" style={px}>{stacks}</div>
            </div>
            <div>
              <div className="text-[6px] text-white/20 mb-1" style={px}>Remainder</div>
              <div className="text-[9px] text-white" style={px}>{remainder}</div>
            </div>
            <div>
              <div className="text-[6px] text-white/20 mb-1" style={px}>Chests</div>
              <div className="text-[9px] text-white" style={px}>{chests}</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
