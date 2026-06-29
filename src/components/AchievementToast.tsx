import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

export type AchievementData = {
  id: string;
  title: string;
  sub: string;
  icon: string;
};

type Listener = (a: AchievementData) => void;
const listeners: Listener[] = [];
const triggered = new Set<string>();

export function triggerAchievement(title: string, sub: string, icon: string) {
  if (triggered.has(title)) return;
  triggered.add(title);
  const a: AchievementData = { id: `${Date.now()}`, title, sub, icon };
  listeners.forEach(fn => fn(a));
}

export function AchievementToast() {
  const [queue, setQueue] = useState<AchievementData[]>([]);

  useEffect(() => {
    const handler = (a: AchievementData) => {
      setQueue(prev => [...prev, a]);
      setTimeout(() => setQueue(prev => prev.filter(x => x.id !== a.id)), 3800);
    };
    listeners.push(handler);
    return () => {
      const idx = listeners.indexOf(handler);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  }, []);

  return (
    <div className="fixed top-16 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {queue.map(a => (
          <motion.div
            key={a.id}
            initial={{ x: 260, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 260, opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="flex items-center gap-3 px-4 py-3 border border-[#fcbe04]/30 bg-[#0f120f]"
            style={{ minWidth: 220 }}
          >
            <div className="shrink-0 w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10">
              <img
                src={a.icon}
                alt=""
                style={{ imageRendering: "pixelated", width: 22, height: 22 }}
              />
            </div>
            <div className="overflow-hidden">
              <div className="text-[6px] text-[#fcbe04] mb-1 tracking-wider" style={px}>
                Achievement Unlocked
              </div>
              <div className="text-[8px] text-white truncate" style={px}>{a.title}</div>
              <div className="text-[6px] text-white/30 mt-0.5 truncate" style={px}>{a.sub}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
