import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

function randCoord(base: number) { return (base + (Math.random() - 0.5) * 200).toFixed(3); }
function randFacing() { return ["North","South","East","West","North (Towards negative Z)"][Math.floor(Math.random()*4)]; }

export function F3Overlay() {
  const [open, setOpen]   = useState(false);
  const [fps,  setFps]    = useState(60);
  const [coords] = useState({ x: randCoord(0), y: randCoord(64), z: randCoord(0) });
  const [facing] = useState(randFacing());

  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => setFps(50 + Math.floor(Math.random() * 20)), 800);
    return () => clearInterval(t);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "F3") { e.preventDefault(); setOpen(o => !o); } };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <motion.button
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className={`px-4 py-2 text-[8px] border transition-colors ${open ? "border-[#5caf00] text-[#5caf00] bg-[#5caf00]/10" : "border-white/20 text-white/60 hover:border-white/40"}`}
          style={px}
        >
          {open ? "Hide F3" : "Show F3"}
        </motion.button>
        <span className="text-white/20 text-[6px]" style={px}>or press F3</span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-black/80 border border-white/10 p-4 font-mono text-left"
            style={{ fontFamily: "monospace" }}
          >
            {/* Left column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <div className="space-y-0.5">
                <p className="text-white text-[10px]">Minecraft 1.21.5 (Java)</p>
                <p className="text-white/60 text-[9px]">{fps} fps T: 20.00 mspt</p>
                <p className="text-white/30 text-[9px]">Integrated server @ 127.0.0.1</p>
                <p className="text-white/30 text-[9px]">Allocated: 2048MB / Used: 1024MB</p>
                <div className="h-2" />
                <p className="text-white text-[9px]">XYZ: {coords.x} / {coords.y} / {coords.z}</p>
                <p className="text-white/60 text-[9px]">Block: {Math.floor(Number(coords.x))} {Math.floor(Number(coords.y))} {Math.floor(Number(coords.z))}</p>
                <p className="text-white/60 text-[9px]">Chunk: {(Math.floor(Number(coords.x)) & 15)} ~ {(Math.floor(Number(coords.z)) & 15)} in {Math.floor(Number(coords.x)/16)} ~ {Math.floor(Number(coords.z)/16)}</p>
                <p className="text-white/60 text-[9px]">Facing: {facing}</p>
                <div className="h-2" />
                <p className="text-white/60 text-[9px]">Biome: minecraft:old_growth_pine_taiga</p>
                <p className="text-white/60 text-[9px]">Local Difficulty: 2.97</p>
                <p className="text-white/60 text-[9px]">Light: 15 (sky: 15, block: 0)</p>
                <p className="text-white/60 text-[9px]">Sounds: 0/247 (Streams: 0)</p>
              </div>
              <div className="space-y-0.5 mt-4 md:mt-0">
                <p className="text-white/60 text-[9px]">Java: 21.0.3 64bit</p>
                <p className="text-white/60 text-[9px]">CPU: 16× Intel Core i9</p>
                <p className="text-white/60 text-[9px]">Display: 1920×1080 (Windowed)</p>
                <p className="text-white/60 text-[9px]">Render Distance: 12 chunks</p>
                <p className="text-white/60 text-[9px]">Simulation Distance: 10 chunks</p>
                <div className="h-2" />
                <p className="text-white/60 text-[9px]">E: 219/750</p>
                <p className="text-white/60 text-[9px]">C: 53/83</p>
                <p className="text-white/60 text-[9px]">P: 0</p>
                <div className="h-2" />
                <p className="text-[#5caf00] text-[9px]">Targeted Block: minecraft:grass_block</p>
                <p className="text-white/60 text-[9px]">  State: snowy=false, waterlogged=false</p>
                <p className="text-white/60 text-[9px]">  BlockPos{"{"}x=0, y=63, z=0{"}"}</p>
              </div>
            </div>

            {/* FPS graph mockup */}
            <div className="mt-3 border-t border-white/10 pt-3 flex items-end gap-px h-10">
              {Array.from({ length: 60 }).map((_, i) => (
                <div key={i} className="w-px bg-[#5caf00]/60"
                  style={{ height: `${30 + Math.sin(i * 0.3) * 10 + Math.random() * 8}%` }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
