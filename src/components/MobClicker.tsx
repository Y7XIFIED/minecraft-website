import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const W = "https://minecraft.wiki/images";
const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

const MOBS = [
  { id: "creeper",  name: "Creeper",  img: `${W}/Creeper_JE2.png`,      points: 1, size: 52 },
  { id: "zombie",   name: "Zombie",   img: `${W}/Zombie_JE5_BE2.png`,    points: 1, size: 56 },
  { id: "skeleton", name: "Skeleton", img: `${W}/Skeleton_JE2.png`,      points: 2, size: 56 },
  { id: "warden",   name: "Warden",   img: `${W}/Warden_JE1_BE1.png`,    points: 5, size: 70 },
  { id: "ghast",    name: "Ghast",    img: `${W}/Ghast_JE1_BE1.png`,     points: 3, size: 62 },
];

type Mob = { uid: string; typeIdx: number; x: number; y: number };
type Hit  = { id: string; x: number; y: number; pts: number };

const GAME_TIME = 30;

export function MobClicker() {
  const [phase,    setPhase]    = useState<"idle" | "playing" | "done">("idle");
  const [score,    setScore]    = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [mobs,     setMobs]     = useState<Mob[]>([]);
  const [hits,     setHits]     = useState<Hit[]>([]);
  const uidRef = useRef(0);

  useEffect(() => {
    if (phase !== "playing") return;
    const t = setInterval(() => {
      setTimeLeft(s => {
        if (s <= 1) { setPhase("done"); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "playing") return;
    const spawn = () => {
      const typeIdx = Math.floor(Math.random() * MOBS.length);
      const uid = `m${uidRef.current++}`;
      const x = 5 + Math.random() * 82;
      const y = 5 + Math.random() * 75;
      setMobs(prev => [...prev.slice(-10), { uid, typeIdx, x, y }]);
      setTimeout(() => setMobs(prev => prev.filter(m => m.uid !== uid)), 2800);
    };
    spawn();
    const t = setInterval(spawn, 1100);
    return () => clearInterval(t);
  }, [phase]);

  function start() {
    setScore(0);
    setTimeLeft(GAME_TIME);
    setMobs([]);
    setHits([]);
    setPhase("playing");
  }

  function clickMob(mob: Mob, e: React.MouseEvent) {
    e.stopPropagation();
    const pts = MOBS[mob.typeIdx].points;
    setScore(s => s + pts);
    setMobs(prev => prev.filter(m => m.uid !== mob.uid));
    const hid = `h${Date.now()}${Math.random()}`;
    setHits(prev => [...prev, { id: hid, x: mob.x, y: mob.y, pts }]);
    setTimeout(() => setHits(prev => prev.filter(h => h.id !== hid)), 750);
  }

  const pct = (timeLeft / GAME_TIME) * 100;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-white/20 text-[6px] uppercase tracking-widest mb-1" style={px}>Score</div>
          <motion.div key={score} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="text-base" style={{ ...px, color: "#5caf00" }}>
            {score}
          </motion.div>
        </div>
        <div className="text-right">
          <div className="text-white/20 text-[6px] uppercase tracking-widest mb-1" style={px}>Time</div>
          <div className={`text-base transition-colors ${timeLeft <= 5 && phase === "playing" ? "text-red-400" : "text-white"}`} style={px}>
            {timeLeft}s
          </div>
        </div>
      </div>

      <div
        className="relative border border-white/5 bg-[#060806] overflow-hidden select-none"
        style={{ width: "100%", height: 280 }}
      >
        {phase === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <p className="text-white/25 text-[7px] text-center leading-6" style={px}>Click mobs before they vanish.<br />Rarer mobs score more points.</p>
            <button onClick={start} className="px-7 py-3 bg-[#5caf00] text-black text-[8px] hover:bg-[#6cc400] transition-colors" style={px}>
              Begin
            </button>
          </div>
        )}

        {phase === "done" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="text-white/30 text-[8px] mb-1" style={px}>Round complete</div>
            <div className="text-3xl" style={{ ...px, color: "#5caf00" }}>{score}</div>
            <div className="text-white/20 text-[7px]" style={px}>points</div>
            <button onClick={start} className="mt-2 px-6 py-2.5 border border-white/15 text-white/40 text-[7px] hover:border-white/35 hover:text-white/60 transition-colors" style={px}>
              Play Again
            </button>
          </div>
        )}

        <AnimatePresence>
          {mobs.map(mob => {
            const m = MOBS[mob.typeIdx];
            return (
              <motion.button
                key={mob.uid}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, rotate: 20 }}
                transition={{ duration: 0.18, type: "spring", stiffness: 400, damping: 20 }}
                className="absolute cursor-crosshair hover:brightness-125 active:scale-90 transition-[filter]"
                style={{ left: `${mob.x}%`, top: `${mob.y}%`, transform: "translate(-50%,-50%)" }}
                onClick={e => clickMob(mob, e)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.85 }}
              >
                <img
                  src={m.img}
                  alt={m.name}
                  draggable={false}
                  style={{ imageRendering: "pixelated", width: m.size, height: m.size, display: "block" }}
                />
              </motion.button>
            );
          })}
        </AnimatePresence>

        <AnimatePresence>
          {hits.map(h => (
            <motion.div
              key={h.id}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -36, scale: 1.2 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="absolute pointer-events-none text-[9px]"
              style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%,-50%)", ...px, color: "#5caf00" }}
            >
              +{h.pts}
            </motion.div>
          ))}
        </AnimatePresence>

        {phase === "playing" && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
            <motion.div
              className="h-full bg-[#5caf00]"
              style={{ width: `${pct}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>
        )}
      </div>

      <div className="flex gap-4 flex-wrap">
        {MOBS.map(m => (
          <div key={m.id} className="flex items-center gap-1.5">
            <img src={m.img} alt={m.name} style={{ imageRendering: "pixelated", width: 18, height: 18 }} />
            <span className="text-white/20 text-[6px]" style={px}>+{m.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
