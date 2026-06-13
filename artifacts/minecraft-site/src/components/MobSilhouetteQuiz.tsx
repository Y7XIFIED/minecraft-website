import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };
const W  = "https://minecraft.wiki/images";

const MOBS = [
  { name: "Creeper",    img: `${W}/Creeper_JE2.png`,      decoys: ["Zombie","Skeleton","Spider"] },
  { name: "Enderman",   img: `${W}/Enderman_JE3.png`,     decoys: ["Zombie","Wither Skeleton","Blaze"] },
  { name: "Zombie",     img: `${W}/Zombie_JE3_BE2.png`,   decoys: ["Husk","Drowned","Skeleton"] },
  { name: "Skeleton",   img: `${W}/Skeleton_JE2.png`,     decoys: ["Zombie","Stray","Wither Skeleton"] },
  { name: "Warden",     img: `${W}/Warden_JE1_BE1.png`,   decoys: ["Creeper","Iron Golem","Ghast"] },
  { name: "Ghast",      img: `${W}/Ghast_JE1_BE1.png`,    decoys: ["Blaze","Phantom","Bat"] },
  { name: "Spider",     img: `${W}/Spider_JE2_BE2.png`,   decoys: ["Cave Spider","Silverfish","Endermite"] },
  { name: "Blaze",      img: `${W}/Blaze_JE2_BE2.png`,    decoys: ["Magma Cube","Ghast","Wither Skeleton"] },
  { name: "Witch",      img: `${W}/Witch_JE2_BE2.png`,    decoys: ["Villager","Evoker","Illusioner"] },
  { name: "Phantom",    img: `${W}/Phantom_JE3.png`,       decoys: ["Bat","Vex","Parrot"] },
];

function shuffleArr<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function buildRound(mobs: typeof MOBS, idx: number) {
  const mob = mobs[idx];
  const opts = shuffleArr([mob.name, ...mob.decoys]);
  return { mob, opts };
}

export function MobSilhouetteQuiz() {
  const [order] = useState(() => shuffleArr(MOBS));
  const [idx, setIdx]           = useState(0);
  const [score, setScore]       = useState(0);
  const [picked, setPicked]     = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const { mob, opts } = buildRound(order, idx);

  function pick(opt: string) {
    if (picked !== null) return;
    setPicked(opt);
    setRevealed(true);
    if (opt === mob.name) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= order.length) { setFinished(true); return; }
      setIdx(i => i + 1);
      setPicked(null);
      setRevealed(false);
    }, 1200);
  }

  function restart() { setIdx(0); setScore(0); setPicked(null); setFinished(false); setRevealed(false); }

  if (finished) return (
    <div className="flex flex-col items-center gap-6 py-8">
      <p className="text-[#5caf00] text-sm" style={px}>Quiz Done!</p>
      <div className="text-white text-2xl" style={px}>{score} / {order.length}</div>
      <p className="text-white/40 text-[8px]" style={px}>{score >= 8 ? "Mob Expert" : score >= 5 ? "Seasoned Adventurer" : "Keep Exploring"}</p>
      <button onClick={restart} className="px-6 py-3 text-[9px] border border-[#5caf00] text-[#5caf00]" style={px}>Play Again</button>
    </div>
  );

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="flex justify-between w-full">
        <span className="text-white/30 text-[7px]" style={px}>{idx + 1} / {order.length}</span>
        <span className="text-[#5caf00] text-[7px]" style={px}>Score: {score}</span>
      </div>

      <p className="text-white/30 text-[7px]" style={px}>Which mob is this?</p>

      {/* Silhouette */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="relative w-36 h-36 flex items-center justify-center"
        >
          <img
            src={mob.img}
            alt="???"
            className="h-32 w-auto object-contain"
            style={{
              imageRendering: "pixelated",
              filter: revealed ? "none" : "brightness(0) contrast(1)",
              transition: "filter 0.4s ease",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2 w-full">
        {opts.map(opt => {
          let cls = "border-white/10 text-white/60 hover:border-white/30";
          if (picked !== null) {
            if (opt === mob.name) cls = "border-[#5caf00] text-[#5caf00] bg-[#5caf00]/10";
            else if (opt === picked) cls = "border-red-500 text-red-400 bg-red-500/10";
            else cls = "border-white/5 text-white/20";
          }
          return (
            <motion.button
              key={opt}
              onClick={() => pick(opt)}
              whileHover={picked === null ? { scale: 1.02 } : {}}
              className={`p-3 border text-[7px] transition-all ${cls}`}
              style={px}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
