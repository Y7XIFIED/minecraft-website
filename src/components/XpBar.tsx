import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

export function XpBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-2.5 px-4 py-2 bg-[#0a0d0a]/95 border-t border-white/5 backdrop-blur-sm">
      <span className="text-white/20 text-[6px] shrink-0 tracking-widest" style={px}>XP</span>
      <div className="flex-1 h-[5px] bg-white/5 relative overflow-hidden">
        <motion.div
          className="h-full absolute left-0 top-0"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #5caf00, #80ff00)",
          }}
          transition={{ duration: 0.08, ease: "linear" }}
        />
      </div>
      <span className="text-white/15 text-[6px] shrink-0 w-6 text-right" style={px}>
        {Math.round(pct)}
      </span>
    </div>
  );
}
