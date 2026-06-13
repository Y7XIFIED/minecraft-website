import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };
const W  = "https://minecraft.wiki/images";
const GH = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures";

const BLOCK_POOL = [
  { name: "Grass",         img: `${W}/Grass_Block_JE7_BE6.png` },
  { name: "Diamond Ore",   img: `${W}/Deepslate_Diamond_Ore_JE2_BE1.png` },
  { name: "Obsidian",      img: `${W}/Obsidian_JE2.png` },
  { name: "Ancient Debris",img: `${W}/Ancient_Debris_JE1_BE1.png` },
  { name: "Sculk",         img: `${W}/Sculk_JE1_BE1.png` },
  { name: "Netherrack",    img: `${W}/Netherrack_JE2_BE1.png` },
  { name: "End Stone",     img: `${W}/End_Stone_JE2.png` },
  { name: "Crying Obs.",   img: `${GH}/block/crying_obsidian.png` },
];

type Card = { id: number; name: string; img: string; matched: boolean; flipped: boolean };

function buildDeck(): Card[] {
  return [...BLOCK_POOL, ...BLOCK_POOL]
    .map((b, i) => ({ ...b, id: i, matched: false, flipped: false }))
    .sort(() => Math.random() - 0.5);
}

export function BlockMemoryMatch() {
  const [cards, setCards]     = useState<Card[]>(buildDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves]     = useState(0);
  const [locked, setLocked]   = useState(false);
  const [time, setTime]       = useState(0);
  const [running, setRunning] = useState(false);

  const matched = cards.filter(c => c.matched).length;
  const won = matched === cards.length;

  useEffect(() => {
    if (!running || won) return;
    const t = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(t);
  }, [running, won]);

  function flip(id: number) {
    if (locked || cards[id].matched || cards[id].flipped || flipped.length === 2) return;
    if (!running) setRunning(true);

    const next = cards.map((c, i) => i === id ? { ...c, flipped: true } : c);
    const newFlipped = [...flipped, id];
    setCards(next);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setLocked(true);
      const [a, b] = newFlipped;
      if (next[a].name === next[b].name) {
        setCards(c => c.map((card, i) => [a, b].includes(i) ? { ...card, matched: true } : card));
        setFlipped([]);
        setLocked(false);
      } else {
        setTimeout(() => {
          setCards(c => c.map((card, i) => [a, b].includes(i) ? { ...card, flipped: false } : card));
          setFlipped([]);
          setLocked(false);
        }, 900);
      }
    }
  }

  function restart() {
    setCards(buildDeck());
    setFlipped([]);
    setMoves(0);
    setLocked(false);
    setTime(0);
    setRunning(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="text-white/30 text-[7px]" style={px}>Moves: {moves}</span>
        <span className="text-[#5caf00] text-[7px]" style={px}>
          {String(Math.floor(time/60)).padStart(2,"0")}:{String(time%60).padStart(2,"0")}
        </span>
        <button onClick={restart} className="text-[7px] text-white/30 hover:text-white/60 border border-white/10 px-2 py-1" style={px}>
          Reset
        </button>
      </div>

      {won && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center py-4 border border-[#5caf00]/40 bg-[#5caf00]/5">
          <p className="text-[#5caf00] text-[9px] mb-1" style={px}>You win!</p>
          <p className="text-white/40 text-[7px]" style={px}>{moves} moves · {time}s</p>
        </motion.div>
      )}

      <div className="grid grid-cols-8 gap-1.5">
        {cards.map((card, i) => (
          <motion.button
            key={card.id}
            onClick={() => flip(i)}
            whileHover={!card.flipped && !card.matched ? { scale: 1.06 } : {}}
            whileTap={!card.flipped && !card.matched ? { scale: 0.94 } : {}}
            className="aspect-square"
          >
            <motion.div
              animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", height: "100%" }}
            >
              {/* Back */}
              <div
                className="absolute inset-0 border border-white/10 bg-white/5 flex items-center justify-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="text-white/20 text-[8px]">?</span>
              </div>
              {/* Front */}
              <div
                className={`absolute inset-0 border flex items-center justify-center p-0.5 ${card.matched ? "border-[#5caf00]/40 bg-[#5caf00]/5" : "border-white/20 bg-white/5"}`}
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <img src={card.img} alt={card.name}
                  style={{ imageRendering: "pixelated", width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
            </motion.div>
          </motion.button>
        ))}
      </div>

      <p className="text-white/20 text-[6px] text-center" style={px}>
        {matched/2} / {BLOCK_POOL.length} pairs found
      </p>
    </div>
  );
}
