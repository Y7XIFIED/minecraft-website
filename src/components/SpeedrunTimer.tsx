import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

const SPLITS = [
  { name: "Collect Wood",       target: 30 },
  { name: "Build Shelter",      target: 120 },
  { name: "Mine Diamonds",      target: 300 },
  { name: "Build Nether Portal",target: 480 },
  { name: "Find Fortress",      target: 600 },
  { name: "Kill Blazes",        target: 720 },
  { name: "Find Stronghold",    target: 900 },
  { name: "Activate Portal",    target: 1020 },
  { name: "Kill Ender Dragon",  target: 1200 },
];

function fmt(ms: number) {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const cs = Math.floor((ms % 1000) / 10);
  if (h > 0) return `${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}.${String(cs).padStart(2,"0")}`;
}

export function SpeedrunTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [splits, setSplits]   = useState<number[]>([]);
  const [category, setCategory] = useState<"any%"|"all-adv">("any%");
  const startRef = useRef<number>(0);
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      setElapsed(Date.now() - startRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  function start() {
    if (running) return;
    startRef.current = Date.now() - elapsed;
    setRunning(true);
  }

  function stop() { setRunning(false); }

  function split() {
    if (!running) return;
    setSplits(s => [...s, elapsed]);
  }

  function reset() {
    setRunning(false); setElapsed(0); setSplits([]);
    cancelAnimationFrame(rafRef.current);
  }

  const currentSplitIdx = splits.length;
  const currentTarget = SPLITS[currentSplitIdx]?.target ?? null;
  const isAhead = currentTarget !== null && elapsed / 1000 < currentTarget;

  return (
    <div className="flex flex-col gap-4">
      {/* Category */}
      <div className="flex gap-2">
        {(["any%","all-adv"] as const).map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-3 py-1.5 text-[6px] border transition-colors ${category === c ? "border-[#5caf00] text-[#5caf00]" : "border-white/10 text-white/30"}`}
            style={px}
          >
            {c}
          </button>
        ))}
        <span className="text-white/15 text-[6px] self-center ml-2" style={px}>Java 1.21</span>
      </div>

      {/* F3-style display */}
      <div className="bg-black/60 border border-white/10 p-4 font-mono">
        <div className="text-white/30 text-[6px] mb-1" style={px}>Minecraft Java Edition 1.21.5</div>
        <div className="text-white/30 text-[6px] mb-3" style={px}>Category: {category} | RTA</div>

        <motion.div
          animate={{ color: running ? (isAhead ? "#5caf00" : "#fc4444") : "#ffffff" }}
          className="text-3xl tabular-nums mb-2"
          style={px}
        >
          {fmt(elapsed)}
        </motion.div>

        {currentSplitIdx < SPLITS.length && (
          <div className="text-[6px] text-white/40 mt-1" style={px}>
            Next split: {SPLITS[currentSplitIdx].name}
            {" "}({fmt(SPLITS[currentSplitIdx].target * 1000)} target)
          </div>
        )}
        {currentSplitIdx >= SPLITS.length && elapsed > 0 && !running && (
          <div className="text-[6px] text-[#5caf00] mt-1" style={px}>Run complete! All splits done.</div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2 flex-wrap">
        <motion.button onClick={start} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className={`px-4 py-2 text-[8px] border transition-colors ${running ? "border-white/5 text-white/20" : "border-[#5caf00] text-[#5caf00] hover:bg-[#5caf00]/10"}`}
          style={px} disabled={running}
        >
          ▶ Start
        </motion.button>
        <motion.button onClick={split} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className={`px-4 py-2 text-[8px] border transition-colors ${!running ? "border-white/5 text-white/20" : "border-[#fcbe04] text-[#fcbe04] hover:bg-[#fcbe04]/10"}`}
          style={px} disabled={!running}
        >
          ✦ Split
        </motion.button>
        <motion.button onClick={stop} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className={`px-4 py-2 text-[8px] border transition-colors ${!running ? "border-white/5 text-white/20" : "border-orange-500 text-orange-400 hover:bg-orange-500/10"}`}
          style={px} disabled={!running}
        >
          ■ Stop
        </motion.button>
        <motion.button onClick={reset} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="px-4 py-2 text-[8px] border border-white/10 text-white/30 hover:border-red-400/40 hover:text-red-400"
          style={px}
        >
          ↺ Reset
        </motion.button>
      </div>

      {/* Splits */}
      {splits.length > 0 && (
        <div className="border border-white/5 divide-y divide-white/5">
          {splits.map((t, i) => {
            const target = SPLITS[i]?.target ?? null;
            const diff   = target !== null ? t / 1000 - target : null;
            return (
              <div key={i} className="flex justify-between items-center px-3 py-1.5">
                <span className="text-white/40 text-[6px]" style={px}>{SPLITS[i]?.name ?? `Split ${i+1}`}</span>
                <div className="flex items-center gap-3">
                  {diff !== null && (
                    <span className="text-[6px]" style={{ ...px, color: diff <= 0 ? "#5caf00" : "#fc4444" }}>
                      {diff <= 0 ? "-" : "+"}{fmt(Math.abs(diff)*1000)}
                    </span>
                  )}
                  <span className="text-white/50 text-[7px]" style={px}>{fmt(t)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
