import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };
const GH = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures";
const W  = "https://minecraft.wiki/images";

const ITEM_POOL = [
  { name: "Diamond Sword",   img: `${GH}/item/diamond_sword.png` },
  { name: "Diamond Pickaxe", img: `${GH}/item/diamond_pickaxe.png` },
  { name: "Diamond",         img: `${GH}/item/diamond.png` },
  { name: "Emerald",         img: `${GH}/item/emerald.png` },
  { name: "Ender Pearl",     img: `${GH}/item/ender_pearl.png` },
  { name: "Totem",           img: `${GH}/item/totem_of_undying.png` },
  { name: "Nether Star",     img: `${GH}/item/nether_star.png` },
  { name: "Enchanted Book",  img: `${GH}/item/enchanted_book.png` },
  { name: "Blaze Rod",       img: `${GH}/item/blaze_rod.png` },
  { name: "Golden Apple",    img: `${GH}/item/golden_apple.png` },
  { name: "Netherite Ingot", img: `${GH}/item/netherite_ingot.png` },
  { name: "Bread",           img: `${GH}/item/bread.png` },
  { name: "Cooked Steak",    img: `${GH}/item/cooked_beef.png` },
  { name: "Obsidian",        img: `${W}/Obsidian_JE2.png` },
  { name: "Grass Block",     img: `${W}/Grass_Block_JE7_BE6.png` },
  { name: "TNT",             img: `${W}/TNT_JE3_BE3.png` },
];

const SLOTS = 9;

export function InventoryHotbar() {
  const [hotbar, setHotbar] = useState<(typeof ITEM_POOL[0] | null)[]>(Array(SLOTS).fill(null));
  const [selected, setSelected] = useState<number | null>(null);
  const [dragging, setDragging] = useState<{ from: "pool"|"bar"; idx: number } | null>(null);
  const [hoverSlot, setHoverSlot] = useState<number | null>(null);

  function dropOnSlot(slotIdx: number) {
    if (!dragging) return;
    if (dragging.from === "pool") {
      const item = ITEM_POOL[dragging.idx];
      setHotbar(prev => { const n = [...prev]; n[slotIdx] = item; return n; });
    } else if (dragging.from === "bar") {
      const fromIdx = dragging.idx;
      setHotbar(prev => {
        const n = [...prev];
        const temp = n[fromIdx];
        n[fromIdx] = n[slotIdx];
        n[slotIdx] = temp;
        return n;
      });
    }
    setDragging(null);
    setHoverSlot(null);
  }

  function clearSlot(i: number) {
    setHotbar(prev => { const n = [...prev]; n[i] = null; return n; });
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Item pool */}
      <div>
        <p className="text-white/20 text-[7px] mb-3" style={px}>Inventory — drag items to hotbar:</p>
        <div className="grid grid-cols-8 gap-1">
          {ITEM_POOL.map((item, i) => (
            <motion.div
              key={item.name}
              draggable
              onDragStart={() => setDragging({ from: "pool", idx: i })}
              onDragEnd={() => setDragging(null)}
              whileHover={{ scale: 1.12, y: -3 }}
              className="p-1.5 border border-white/5 bg-white/[0.02] hover:border-white/20 cursor-grab active:cursor-grabbing aspect-square flex items-center justify-center"
              title={item.name}
            >
              <img src={item.img} alt={item.name}
                style={{ imageRendering: "pixelated", width: 24, height: 24, pointerEvents: "none" }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hotbar */}
      <div>
        <p className="text-white/20 text-[7px] mb-3" style={px}>Hotbar (9 slots):</p>
        <div className="flex gap-1.5 justify-center">
          {hotbar.map((item, i) => (
            <motion.div
              key={i}
              className={`w-12 h-12 border-2 flex items-center justify-center relative cursor-pointer transition-colors ${
                hoverSlot === i ? "border-white/40 bg-white/10" :
                selected === i ? "border-[#5caf00]/60" :
                "border-white/20 bg-white/[0.02]"
              }`}
              onClick={() => item && setSelected(selected === i ? null : i)}
              onDragOver={e => { e.preventDefault(); setHoverSlot(i); }}
              onDragLeave={() => setHoverSlot(null)}
              onDrop={() => dropOnSlot(i)}
              draggable={!!item}
              onDragStart={() => { if (item) setDragging({ from: "bar", idx: i }); }}
              onDragEnd={() => setDragging(null)}
              whileHover={{ scale: 1.05 }}
            >
              <AnimatePresence>
                {item && (
                  <motion.img
                    key={item.name}
                    src={item.img}
                    alt={item.name}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    style={{ imageRendering: "pixelated", width: 32, height: 32, pointerEvents: "none" }}
                  />
                )}
              </AnimatePresence>
              {/* Slot number */}
              <span className="absolute bottom-0.5 right-0.5 text-[5px] text-white/20" style={px}>{i + 1}</span>
            </motion.div>
          ))}
        </div>

        {/* Selected item info */}
        <AnimatePresence>
          {selected !== null && hotbar[selected] && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 flex items-center justify-between px-4 py-2 border border-white/10 bg-white/[0.02]"
            >
              <span className="text-white/60 text-[7px]" style={px}>{hotbar[selected]!.name}</span>
              <button onClick={() => clearSlot(selected)} className="text-[6px] text-red-400/60 hover:text-red-400" style={px}>Remove</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-white/15 text-[6px] text-center" style={px}>Drag items · Click to select · Click item + Remove to clear</p>
    </div>
  );
}
