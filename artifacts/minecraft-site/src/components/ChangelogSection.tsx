import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

const VERSIONS = [
  {
    version: "1.21.5",
    name: "The Spring to Life Drop",
    date: "2025-03-25",
    splash: "Now with 3D bunnies!",
    entries: [
      { type: "new",  text: "Added new mob: the Happy Ghast — a passive, rideable Ghast found in The End." },
      { type: "new",  text: "Added Dried Ghast block, crafted from Ghast Tears." },
      { type: "new",  text: "Pale Oak Log now spawns naturally in the Pale Garden biome." },
      { type: "new",  text: "New bundle variants: pink, cyan, light blue, yellow bundles." },
      { type: "new",  text: "Added pig variant textures based on biome of spawn." },
      { type: "fix",  text: "Fixed Ender Dragon not resetting perch state properly after respawn." },
      { type: "fix",  text: "Fixed bundle interaction inconsistency with crafting table." },
      { type: "fix",  text: "Fixed Pale Hanging Moss not rendering correctly in Fast Graphics." },
      { type: "change", text: "Updated bundle UI slot display for clarity." },
      { type: "change", text: "Creaking Heart now emits particles when activated." },
      { type: "change", text: "Pale Oak Sapling now placeable on any dirt-type block." },
    ],
  },
  {
    version: "1.21.4",
    name: "The Garden Awakens Drop",
    date: "2024-12-03",
    splash: "It's watching you!",
    entries: [
      { type: "new",  text: "Added the Pale Garden biome — a ghostly white forest." },
      { type: "new",  text: "Added the Creaking mob — a hostile creature linked to the Creaking Heart block." },
      { type: "new",  text: "Added Creaking Heart block, Pale Hanging Moss, Pale Moss Block." },
      { type: "new",  text: "Added Pale Oak Wood type with full block set." },
      { type: "fix",  text: "Fixed several Z-fighting issues with leaf blocks." },
      { type: "fix",  text: "Fixed eye-contact detection inconsistency with Endermen." },
      { type: "change", text: "Wolf Armor now displays damage visually." },
    ],
  },
  {
    version: "1.21.1",
    name: "The Breezy News Drop",
    date: "2024-08-08",
    splash: "Ominous!",
    entries: [
      { type: "fix",  text: "Fixed critical crash related to Mace weapon interaction." },
      { type: "fix",  text: "Fixed Wind Charge not triggering Bell rings correctly." },
      { type: "fix",  text: "Fixed Trial Spawner spawning mobs inside blocks." },
    ],
  },
  {
    version: "1.21",
    name: "Tricky Trials",
    date: "2024-06-13",
    splash: "Trial by combat!",
    entries: [
      { type: "new",  text: "Added Trial Chambers — procedural underground structures." },
      { type: "new",  text: "Added Breeze mob — ranged attacker using Wind Charges." },
      { type: "new",  text: "Added Bogged mob — a swamp variant of the Skeleton." },
      { type: "new",  text: "Added Mace weapon — heavy smash weapon, deals bonus damage after fall." },
      { type: "new",  text: "Added Wind Charge item (thrown)." },
      { type: "new",  text: "Added Trial Spawner block and Vault block." },
      { type: "new",  text: "Added Ominous Trial Key and Ominous Bottle." },
      { type: "change", text: "Armadillo added to savannas. Scute usable for Wolf Armor." },
    ],
  },
];

const TYPE_COLOR: Record<string, string> = {
  new: "#5caf00", fix: "#fcbe04", change: "#4488ff",
};
const TYPE_LABEL: Record<string, string> = {
  new: "NEW", fix: "FIX", change: "CHG",
};

export function ChangelogSection() {
  const [expanded, setExpanded] = useState<string | null>("1.21.5");

  return (
    <div className="flex flex-col gap-2">
      {VERSIONS.map(v => (
        <div key={v.version} className="border border-white/5 overflow-hidden">
          <button
            onClick={() => setExpanded(expanded === v.version ? null : v.version)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-[#5caf00] text-[9px]" style={px}>{v.version}</span>
              <span className="text-white/40 text-[7px]" style={px}>{v.name}</span>
              <span className="text-[#fcbe04] text-[6px] italic" style={px}>"{v.splash}"</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/20 text-[6px]" style={px}>{v.date}</span>
              <motion.span
                animate={{ rotate: expanded === v.version ? 180 : 0 }}
                className="text-white/30 text-xs"
              >
                ▼
              </motion.span>
            </div>
          </button>

          <AnimatePresence>
            {expanded === v.version && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 border-t border-white/5 flex flex-col gap-1.5 pt-3">
                  {v.entries.map((e, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-3"
                    >
                      <span
                        className="text-[5px] px-1.5 py-0.5 shrink-0 mt-0.5"
                        style={{ ...px, color: TYPE_COLOR[e.type], border: `1px solid ${TYPE_COLOR[e.type]}55` }}
                      >
                        {TYPE_LABEL[e.type]}
                      </span>
                      <p className="text-white/50 text-xs leading-5">{e.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
