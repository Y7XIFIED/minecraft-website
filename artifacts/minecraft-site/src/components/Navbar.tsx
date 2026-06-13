import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "EXPLORE", href: "#explore" },
  { label: "MOBS", href: "#mobs" },
  { label: "DIMENSIONS", href: "#dimensions" },
  { label: "ITEMS", href: "#items" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117cc] backdrop-blur-md border-b-4 border-[#1a2a1a]">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img
            src="https://minecraft.wiki/images/Grass_Block_JE7_BE6.png"
            alt="block"
            className="w-9 h-9 pixelated group-hover:scale-110 transition-transform"
            style={{ imageRendering: "pixelated" }}
          />
          <span className="text-white text-sm tracking-widest hidden sm:block" style={{ fontFamily: "'Press Start 2P', monospace", textShadow: "2px 2px 0 #000, 3px 3px 0 #00af00" }}>
            MINECRAFT
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-gray-300 hover:text-[#00ff00] transition-colors text-xs tracking-widest"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="px-4 py-2 text-xs text-white border-2 border-[#00af00] bg-[#00af0022] hover:bg-[#00af0044] transition-colors"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            PLAY FREE
          </a>
        </div>

        {/* Mobile menu btn */}
        <button className="md:hidden text-gray-300" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#0d1117] border-t-2 border-[#1a2a1a] overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-[#00ff00] text-xs py-2 border-b border-[#1a2a1a]"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#"
                className="px-4 py-2 text-xs text-white border-2 border-[#00af00] bg-[#00af0022] text-center mt-2"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                PLAY FREE
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
