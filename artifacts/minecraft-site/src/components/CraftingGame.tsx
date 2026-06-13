import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GH = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures";
const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

type ItemId = string | null;
type Grid = ItemId[][];

const ITEMS = [
  { id: "diamond",    name: "Diamond",     img: `${GH}/item/diamond.png` },
  { id: "stick",      name: "Stick",       img: `${GH}/item/stick.png` },
  { id: "iron_ingot", name: "Iron Ingot",  img: `${GH}/item/iron_ingot.png` },
  { id: "gold_ingot", name: "Gold Ingot",  img: `${GH}/item/gold_ingot.png` },
  { id: "feather",    name: "Feather",     img: `${GH}/item/feather.png` },
  { id: "flint",      name: "Flint",       img: `${GH}/item/flint.png` },
  { id: "string",     name: "String",      img: `${GH}/item/string.png` },
  { id: "coal",       name: "Coal",        img: `${GH}/item/coal.png` },
];

const RECIPES = [
  {
    name: "Diamond Sword",
    resultImg: `${GH}/item/diamond_sword.png`,
    hint: "D on col2, S below",
    pattern: [
      [null, "diamond",    null],
      [null, "diamond",    null],
      [null, "stick",      null],
    ],
  },
  {
    name: "Diamond Pickaxe",
    resultImg: `${GH}/item/diamond_pickaxe.png`,
    hint: "3 diamonds top, 2 sticks below",
    pattern: [
      ["diamond", "diamond", "diamond"],
      [null,      "stick",   null     ],
      [null,      "stick",   null     ],
    ],
  },
  {
    name: "Iron Sword",
    resultImg: `${GH}/item/iron_sword.png`,
    hint: "Iron on col2, stick below",
    pattern: [
      [null, "iron_ingot", null],
      [null, "iron_ingot", null],
      [null, "stick",      null],
    ],
  },
  {
    name: "Golden Sword",
    resultImg: `${GH}/item/golden_sword.png`,
    hint: "Gold on col2, stick below",
    pattern: [
      [null, "gold_ingot", null],
      [null, "gold_ingot", null],
      [null, "stick",      null],
    ],
  },
  {
    name: "Arrow",
    resultImg: `${GH}/item/arrow.png`,
    hint: "Flint, stick, feather vertical",
    pattern: [
      [null, "flint",   null],
      [null, "stick",   null],
      [null, "feather", null],
    ],
  },
];

const empty = (): Grid => Array(3).fill(null).map(() => Array(3).fill(null));

function checkRecipe(grid: Grid) {
  for (const r of RECIPES) {
    let match = true;
    for (let row = 0; row < 3 && match; row++)
      for (let col = 0; col < 3 && match; col++)
        if (grid[row][col] !== r.pattern[row][col]) match = false;
    if (match) return r;
  }
  return null;
}

export function CraftingGame() {
  const [grid, setGrid] = useState<Grid>(empty());
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<(typeof RECIPES)[number] | null>(null);
  const [score, setScore] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (matched) return;
    const recipe = checkRecipe(grid);
    if (!recipe) return;
    setMatched(recipe);
    setFlash(true);
    setTimeout(() => {
      setGrid(empty());
      setMatched(null);
      setFlash(false);
      setScore(s => s + 1);
    }, 1300);
  }, [grid, matched]);

  function handleCell(row: number, col: number) {
    if (matched) return;
    const next = grid.map(r => [...r]);
    next[row][col] = selected && next[row][col] !== selected ? selected : null;
    setGrid(next);
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center gap-6">
        <span className="text-white/25 text-[7px] uppercase tracking-widest" style={px}>Crafted</span>
        <motion.span
          key={score}
          initial={{ scale: 1.4, color: "#5caf00" }}
          animate={{ scale: 1 }}
          className="text-sm"
          style={{ ...px, color: "#5caf00" }}
        >
          {score}
        </motion.span>
      </div>

      <div className="flex gap-5 items-start flex-wrap justify-center">
        <div>
          <span className="text-white/20 text-[6px] uppercase tracking-wider block mb-2" style={px}>Items</span>
          <div className="grid grid-cols-2 gap-1">
            {ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setSelected(s => s === item.id ? null : item.id)}
                title={item.name}
                className={`w-10 h-10 border flex items-center justify-center p-1.5 transition-all duration-150 ${
                  selected === item.id
                    ? "border-[#5caf00] bg-[#5caf00]/10 scale-105"
                    : "border-white/10 bg-white/[0.02] hover:border-white/30"
                }`}
              >
                <img src={item.img} alt={item.name} style={{ imageRendering: "pixelated", width: "100%", height: "100%" }} />
              </button>
            ))}
          </div>
          <button
            onClick={() => { setGrid(empty()); setMatched(null); setFlash(false); }}
            className="mt-3 w-full text-[6px] text-white/20 hover:text-white/50 border border-white/5 hover:border-white/15 px-2 py-1.5 transition-colors"
            style={px}
          >
            Clear
          </button>
        </div>

        <div>
          <span className="text-white/20 text-[6px] uppercase tracking-wider block mb-2" style={px}>Crafting Table</span>
          <motion.div
            animate={flash ? { scale: [1, 1.04, 1] } : {}}
            transition={{ duration: 0.4 }}
            className={`p-2 border transition-colors duration-300 ${flash ? "border-[#5caf00]/60 bg-[#5caf00]/5" : "border-white/5 bg-white/[0.02]"}`}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 2.5rem)", gap: 4 }}
          >
            {grid.map((row, r) =>
              row.map((cell, c) => {
                const item = ITEMS.find(i => i.id === cell);
                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCell(r, c)}
                    className="w-10 h-10 border border-white/10 bg-[#0a0d0a] hover:border-white/30 flex items-center justify-center p-1.5 transition-colors"
                  >
                    {item && <img src={item.img} alt={item.name} style={{ imageRendering: "pixelated", width: "100%", height: "100%" }} />}
                  </button>
                );
              })
            )}
          </motion.div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 pt-7">
          <span className="text-white/15 text-lg">→</span>
          <div className={`w-14 h-14 border flex items-center justify-center p-2 transition-colors duration-300 ${matched ? "border-[#5caf00] bg-[#5caf00]/10" : "border-white/10 bg-white/[0.02]"}`}>
            <AnimatePresence mode="wait">
              {matched && (
                <motion.img
                  key={matched.name}
                  initial={{ scale: 0, rotate: -10, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  src={matched.resultImg}
                  alt={matched.name}
                  style={{ imageRendering: "pixelated", width: "100%", height: "100%" }}
                />
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {matched && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[6px] text-center"
                style={{ ...px, color: "#5caf00" }}
              >
                {matched.name}!
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t border-white/5 pt-4 w-full">
        <span className="text-white/15 text-[6px] uppercase tracking-wider block mb-2" style={px}>Known Recipes</span>
        <div className="flex gap-4 flex-wrap">
          {RECIPES.map(r => (
            <div key={r.name} className="flex items-center gap-1.5">
              <img src={r.resultImg} alt={r.name} style={{ imageRendering: "pixelated", width: 14, height: 14 }} />
              <span className="text-white/20 text-[6px]" style={px}>{r.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
