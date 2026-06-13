import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };
const GH = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures";

const DISCS = [
  { id: "13",          name: "13",          artist: "C418",        color: "#444",    mood: "Eerie",      desc: "The iconic cave sound. Ambient static, buried tones, and silence." },
  { id: "cat",         name: "cat",         artist: "C418",        color: "#e8a030", mood: "Upbeat",     desc: "Bright and jazzy. An unexpected burst of cheerful melody." },
  { id: "blocks",      name: "blocks",      artist: "C418",        color: "#4488cc", mood: "Nostalgic",  desc: "Mellow and drifting — conjures the feeling of a quiet afternoon build." },
  { id: "chirp",       name: "chirp",       artist: "C418",        color: "#cc4422", mood: "Retro",      desc: "Chiptune energy with a lively 8-bit bounce." },
  { id: "far",         name: "far",         artist: "C418",        color: "#226644", mood: "Melancholic", desc: "Lonely and distant. Perfect for exploring at night." },
  { id: "mall",        name: "mall",        artist: "C418",        color: "#8855cc", mood: "Ambient",    desc: "Slow and smooth — evokes the feeling of an empty indoor space." },
  { id: "mellohi",     name: "mellohi",     artist: "C418",        color: "#aa2244", mood: "Haunting",   desc: "Warped waltz time. Delicately unsettling." },
  { id: "stal",        name: "stal",        artist: "C418",        color: "#998866", mood: "Jazzy",      desc: "Swinging jazz piano that feels completely out of place — and perfect." },
  { id: "strad",       name: "strad",       artist: "C418",        color: "#ddaa44", mood: "Tropical",   desc: "A warm marimba melody under a Minecraft sunset." },
  { id: "ward",        name: "ward",        artist: "C418",        color: "#334455", mood: "Mysterious", desc: "Orchestral, layered, and deeply strange." },
  { id: "11",          name: "11",          artist: "C418",        color: "#111",    mood: "Terrifying", desc: "Cracking, running footsteps, and a scream. The most unsettling disc." },
  { id: "wait",        name: "wait",        artist: "C418",        color: "#2244aa", mood: "Peaceful",   desc: "Gentle, hopeful, and cinematic. A quiet send-off." },
  { id: "otherside",   name: "otherside",   artist: "Lena Raine",  color: "#660088", mood: "Energetic",  desc: "Propulsive harpsichord and synth. Discovered deep in structures." },
  { id: "5",           name: "5",           artist: "Samuel Åberg", color: "#225544", mood: "Ambient",   desc: "Dense and meditative — only obtainable from Ancient Cities." },
  { id: "pigstep",     name: "pigstep",     artist: "Lena Raine",  color: "#882200", mood: "Intense",    desc: "Syncopated bass and arpeggios. A Nether Fortress exclusive." },
];

export function MusicDiscPlayer() {
  const [active, setActive] = useState<number | null>(null);

  const disc = active !== null ? DISCS[active] : null;

  const MOOD_COLORS: Record<string, string> = {
    Eerie: "#555", Upbeat: "#fcbe04", Nostalgic: "#88aaff", Retro: "#ff6644",
    Melancholic: "#44cc88", Ambient: "#8866aa", Haunting: "#cc4466", Jazzy: "#ddaa44",
    Tropical: "#ff8800", Mysterious: "#4477bb", Terrifying: "#cc2222", Peaceful: "#55ccff",
    Energetic: "#aa44ff", Intense: "#ff4422",
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Now playing */}
      <AnimatePresence mode="wait">
        {disc ? (
          <motion.div
            key={disc.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border p-4 flex gap-4 items-center"
            style={{ borderColor: disc.color + "66", background: disc.color + "0a" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0"
              style={{ borderColor: disc.color }}
            >
              <div className="w-3 h-3 rounded-full bg-black border border-white/20" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white text-[9px]" style={px}>{disc.name}</span>
                <span className="text-[6px] px-1.5 py-0.5" style={{ ...px, color: MOOD_COLORS[disc.mood] ?? "#888", border: `1px solid ${MOOD_COLORS[disc.mood] ?? "#888"}55` }}>
                  {disc.mood}
                </span>
              </div>
              <p className="text-white/30 text-[6px] mb-1" style={px}>{disc.artist}</p>
              <p className="text-white/40 text-xs leading-5">{disc.desc}</p>
            </div>
            <button onClick={() => setActive(null)} className="text-white/20 hover:text-white/60 text-sm">✕</button>
          </motion.div>
        ) : (
          <motion.div key="empty" className="border border-white/5 p-4 text-center">
            <p className="text-white/20 text-[7px]" style={px}>Select a disc to learn more</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Disc grid */}
      <div className="grid grid-cols-5 gap-2">
        {DISCS.map((d, i) => (
          <motion.button
            key={d.id}
            onClick={() => setActive(active === i ? null : i)}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center gap-1.5 p-2 border transition-all ${active === i ? "border-white/30" : "border-white/5 hover:border-white/15"}`}
          >
            {/* Disc visual */}
            <motion.div
              animate={active === i ? { rotate: 360 } : { rotate: 0 }}
              transition={active === i ? { duration: 3, repeat: Infinity, ease: "linear" } : {}}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: `radial-gradient(circle, ${d.color}cc, ${d.color}44)`, border: `2px solid ${d.color}88` }}
            >
              <img
                src={`${GH}/item/music_disc_${d.id}.png`}
                alt={d.name}
                style={{ imageRendering: "pixelated", width: 24, height: 24 }}
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </motion.div>
            <span className="text-[5px] text-white/40" style={px}>{d.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
