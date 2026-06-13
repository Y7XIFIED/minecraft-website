import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

const QUESTIONS = [
  { q: "What material is required to create a Nether portal?", a: "Obsidian", w: ["Bedrock", "Blackstone", "Netherrack"] },
  { q: "How many HP does the Ender Dragon have?", a: "200 HP", w: ["100 HP", "300 HP", "500 HP"] },
  { q: "What item is needed to tame a wolf?", a: "Bone", w: ["Raw Meat", "Fish", "Wheat"] },
  { q: "At which Y level do Diamonds spawn most abundantly?", a: "Y -58", w: ["Y 16", "Y 0", "Y -64"] },
  { q: "Which mob drops a Music Disc when killed by a Skeleton?", a: "Creeper", w: ["Zombie", "Spider", "Enderman"] },
  { q: "What is the maximum level for Protection enchantment?", a: "IV", w: ["V", "III", "X"] },
  { q: "How many Wither Skeleton Skulls are needed to summon the Wither?", a: "3", w: ["2", "4", "5"] },
  { q: "What food restores the most saturation in vanilla Minecraft?", a: "Golden Carrot", w: ["Steak", "Cooked Salmon", "Bread"] },
  { q: "Which block cannot be destroyed by the Ender Dragon?", a: "Obsidian", w: ["End Stone", "Stone", "Dirt"] },
  { q: "What does the Warden use to detect players?", a: "Vibration & Smell", w: ["Sight only", "Echolocation", "Heat sensors"] },
  { q: "How many biomes are in the current version of Minecraft?", a: "64+", w: ["30", "50", "100"] },
  { q: "What is the maximum enchantment level at an Enchanting Table?", a: "30", w: ["50", "25", "64"] },
  { q: "Which item is used to locate a Stronghold?", a: "Eye of Ender", w: ["Compass", "Map", "Lodestone Compass"] },
  { q: "What mob spawns exclusively in The End dimension?", a: "Endermite", w: ["Shulker", "Blaze", "Ghast"] },
  { q: "What ore is found only in the Nether?", a: "Ancient Debris", w: ["Diamond Ore", "Redstone Ore", "Iron Ore"] },
  { q: "How many slots does a standard chest have?", a: "27", w: ["18", "36", "54"] },
  { q: "What is the drop from an Elder Guardian?", a: "Sponge", w: ["Trident", "Prismarine", "Sea Lantern"] },
  { q: "Which biome is the only natural source of Melon blocks?", a: "Jungle", w: ["Savanna", "Desert", "Plains"] },
  { q: "How many hearts does the Warden have?", a: "250 hearts", w: ["100 hearts", "200 hearts", "500 hearts"] },
  { q: "What Nether mob can be traded with for valuable items?", a: "Piglin", w: ["Piglin Brute", "Zombified Piglin", "Hoglin"] },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function TriviaQuiz() {
  const [questions]  = useState(() => shuffle(QUESTIONS));
  const [idx, setIdx]       = useState(0);
  const [score, setScore]   = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = questions[idx];
  const options = useState(() => shuffle([current.a, ...current.w]))[0];
  const allOptions = questions.map(q => shuffle([q.a, ...q.w]));

  const clearTimer = () => { if (timerRef.current) clearInterval(timerRef.current); };

  useEffect(() => {
    setTimeLeft(25);
    clearTimer();
    if (finished) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearTimer();
          advance(null);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return clearTimer;
  }, [idx, finished]);

  function advance(picked: string | null) {
    setSelected(picked);
    clearTimer();
    setTimeout(() => {
      if (idx + 1 >= questions.length) { setFinished(true); return; }
      setIdx(i => i + 1);
      setSelected(null);
    }, 900);
  }

  function pick(opt: string) {
    if (selected !== null) return;
    if (opt === current.a) setScore(s => s + 1);
    advance(opt);
  }

  function restart() {
    setIdx(0); setScore(0); setSelected(null); setFinished(false);
  }

  if (finished) return (
    <div className="flex flex-col items-center gap-6 py-8">
      <p className="text-[#5caf00] text-sm" style={px}>Quiz Complete</p>
      <div className="text-white text-2xl" style={px}>{score} / {questions.length}</div>
      <p className="text-white/40 text-[8px]" style={px}>
        {score >= 16 ? "Minecraft Master" : score >= 10 ? "Veteran Explorer" : "Keep Practising"}
      </p>
      <button onClick={restart} className="mt-4 px-6 py-3 text-[9px] border border-[#5caf00] text-[#5caf00] hover:bg-[#5caf00]/10 transition-colors" style={px}>
        Play Again
      </button>
    </div>
  );

  const opts = allOptions[idx];

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-white/30 text-[7px]" style={px}>Q {idx + 1} / {questions.length}</span>
        <div className="flex items-center gap-3">
          <span className="text-[#5caf00] text-[7px]" style={px}>Score: {score}</span>
          <motion.span
            className="text-[8px] tabular-nums"
            style={{ ...px, color: timeLeft <= 5 ? "#ff4444" : "#fcbe04" }}
            animate={timeLeft <= 5 ? { scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            {String(timeLeft).padStart(2, "0")}s
          </motion.span>
        </div>
      </div>

      {/* Timer bar */}
      <div className="h-0.5 bg-white/5 w-full">
        <motion.div
          className="h-full bg-[#5caf00]"
          style={{ width: `${(timeLeft / 25) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="text-white text-[9px] leading-6"
          style={px}
        >
          {current.q}
        </motion.p>
      </AnimatePresence>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2">
        {opts.map((opt) => {
          const isCorrect = opt === current.a;
          const isPicked  = opt === selected;
          let color = "border-white/10 text-white/60 hover:border-white/30";
          if (selected !== null) {
            if (isCorrect) color = "border-[#5caf00] text-[#5caf00] bg-[#5caf00]/10";
            else if (isPicked) color = "border-red-500 text-red-400 bg-red-500/10";
            else color = "border-white/5 text-white/20";
          }
          return (
            <motion.button
              key={opt}
              onClick={() => pick(opt)}
              whileHover={selected === null ? { scale: 1.02 } : {}}
              whileTap={selected === null ? { scale: 0.98 } : {}}
              className={`p-3 border text-left text-[7px] leading-5 transition-all ${color}`}
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
