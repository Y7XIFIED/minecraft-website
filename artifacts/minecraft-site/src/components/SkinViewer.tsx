import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

const PRESET_PLAYERS = [
  "Notch", "jeb_", "Dinnerbone", "Herobrine", "Dream", "Technoblade",
  "MHF_Steve", "MHF_Alex", "MHF_Creeper", "MHF_Enderman",
];

export function SkinViewer() {
  const [input,    setInput]    = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [error,    setError]    = useState(false);
  const [view,     setView]     = useState<"front"|"back">("front");

  function load(name?: string) {
    const u = (name ?? input).trim();
    if (!u) return;
    setError(false);
    setUsername(u);
  }

  const bodyUrl  = username ? `https://mc-heads.net/player/${username}/400` : null;
  const headUrl  = username ? `https://mc-heads.net/head/${username}/100`   : null;
  const skinUrl  = username ? `https://mc-heads.net/skin/${username}`        : null;
  const backUrl  = username ? `https://visage.surgeplay.com/full/200/${username}?overlay` : null;

  return (
    <div className="flex flex-col gap-4">
      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && load()}
          placeholder="Enter username..."
          className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-[9px] text-white placeholder-white/20 focus:border-[#5caf00]/40 outline-none transition-colors"
          style={px}
        />
        <motion.button
          onClick={() => load()}
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="px-4 py-2 text-[8px] bg-[#5caf00] text-black"
          style={px}
        >
          Load
        </motion.button>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-1.5">
        {PRESET_PLAYERS.map(p => (
          <button
            key={p}
            onClick={() => { setInput(p); load(p); }}
            className="px-2 py-1 text-[6px] border border-white/8 text-white/30 hover:border-white/20 hover:text-white/60 transition-colors"
            style={px}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Viewer */}
      <AnimatePresence mode="wait">
        {username && (
          <motion.div
            key={username}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col md:flex-row gap-6 items-center"
          >
            {/* 3D body */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-2 mb-2">
                {(["front","back"] as const).map(v => (
                  <button key={v} onClick={() => setView(v)}
                    className={`px-3 py-1 text-[6px] border transition-colors ${view === v ? "border-[#5caf00] text-[#5caf00]" : "border-white/10 text-white/30"}`}
                    style={px}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <motion.img
                key={username + view}
                src={view === "front" ? bodyUrl! : (backUrl ?? bodyUrl!)}
                alt={username}
                style={{ imageRendering: "pixelated", height: 200, width: "auto" }}
                initial={{ opacity: 0, rotateY: view === "back" ? 30 : -30 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.4 }}
                onError={() => setError(true)}
                whileHover={{ scale: 1.05 }}
                className="select-none"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-3">
              <div className="border border-white/5 p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img src={headUrl!} alt={username}
                    style={{ imageRendering: "pixelated", width: 48, height: 48 }}
                    className="border border-white/10"
                  />
                  <div>
                    <p className="text-white text-[9px] mb-1" style={px}>{username}</p>
                    <p className="text-white/30 text-[6px]" style={px}>Minecraft Java</p>
                  </div>
                </div>

                <a
                  href={skinUrl!}
                  download={`${username}.png`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 text-[6px] border border-white/10 text-white/40 hover:border-white/30 hover:text-white/70 transition-colors text-center"
                  style={px}
                >
                  Download Skin (.png)
                </a>
              </div>

              {error && (
                <p className="text-red-400/60 text-[6px]" style={px}>
                  Could not load skin. Check the username.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
