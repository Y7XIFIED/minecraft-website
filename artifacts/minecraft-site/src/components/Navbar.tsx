import { motion } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

const NAV_LINKS = [
  { label: "Explore",    href: "#explore" },
  { label: "Mobs",       href: "#mobs" },
  { label: "Dimensions", href: "#dimensions" },
];

const letters = "MINECRAFT".split("");

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0d0a]/92 backdrop-blur-sm border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <motion.img
            src="https://minecraft.wiki/images/Grass_Block_JE7_BE6.png"
            alt="Minecraft"
            className="w-7 h-7"
            style={{ imageRendering: "pixelated" }}
            initial={{ rotate: -15, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 18 }}
            whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
          />
          <span className="flex" style={px}>
            {letters.map((l, i) => (
              <motion.span
                key={i}
                className="text-white text-[11px] tracking-[0.15em] uppercase"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.045, duration: 0.3, ease: "easeOut" }}
                whileHover={{ color: "#5caf00", y: -2, transition: { duration: 0.1 } }}
              >
                {l}
              </motion.span>
            ))}
          </span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-8">
          {NAV_LINKS.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              className="relative text-white/40 hover:text-white/80 transition-colors text-xs tracking-wider overflow-hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.08 }}
            >
              {l.label}
              <motion.span
                className="absolute bottom-0 left-0 h-px bg-[#5caf00]"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
                style={{ width: "100%" }}
              />
            </motion.a>
          ))}
          <motion.a
            href="#"
            className="ml-4 px-4 py-2 text-[10px] tracking-wider border border-white/20 text-white/70 hover:border-[#5caf00] hover:text-white transition-all"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            style={px}
          >
            Play Free
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
