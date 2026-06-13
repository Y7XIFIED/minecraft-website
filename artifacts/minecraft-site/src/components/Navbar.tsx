const NAV_LINKS = [
  { label: "Explore", href: "#explore" },
  { label: "Mobs", href: "#mobs" },
  { label: "Dimensions", href: "#dimensions" },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0d0a]/90 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        <a href="#" className="flex items-center gap-2.5">
          <img
            src="https://minecraft.wiki/images/Grass_Block_JE7_BE6.png"
            alt="Minecraft"
            className="w-7 h-7"
            style={{ imageRendering: "pixelated" }}
          />
          <span className="text-white text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "'Press Start 2P', monospace" }}>
            Minecraft
          </span>
        </a>

        <div className="flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-white/40 hover:text-white/80 transition-colors text-xs tracking-wider"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#"
            className="ml-4 px-4 py-2 text-[10px] tracking-wider border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-colors"
          >
            Play Free
          </a>
        </div>
      </div>
    </nav>
  );
}
