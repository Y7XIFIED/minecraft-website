import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";

const W = "https://minecraft.wiki/images";
const GH = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures";

const MOBS = [
  { name: "Creeper",  tag: "Hostile",  img: `${W}/Creeper_JE2.png`,      desc: "Approaches silently before detonating with lethal force.",              hp: 20,  dmg: "Fatal",      glow: "#3a5c3a" },
  { name: "Enderman", tag: "Neutral",  img: `${W}/Enderman_JE3.png`,     desc: "Teleports at will. Direct eye contact triggers immediate aggression.",   hp: 40,  dmg: "3.5 hearts", glow: "#2d1f4a" },
  { name: "Zombie",   tag: "Hostile",  img: `${W}/Zombie_JE3_BE2.png`,   desc: "Pursues survivors relentlessly. Susceptible to sunlight exposure.",     hp: 20,  dmg: "2.5 hearts", glow: "#1a3320" },
  { name: "Skeleton", tag: "Hostile",  img: `${W}/Skeleton_JE2.png`,     desc: "A skilled archer. Exceptionally dangerous in low-light conditions.",    hp: 20,  dmg: "2 hearts",   glow: "#333" },
  { name: "Warden",   tag: "Boss",     img: `${W}/Warden_JE1_BE1.png`,   desc: "Sightless yet acutely sensitive to vibration. Exhibits extreme lethality.", hp: 500, dmg: "15+ hearts", glow: "#0d3535" },
  { name: "Ghast",    tag: "Hostile",  img: `${W}/Ghast_JE1_BE1.png`,    desc: "Launches explosive fireballs from considerable aerial range.",           hp: 10,  dmg: "Fireball",   glow: "#3a2a1a" },
];

const ITEMS = [
  { name: "Diamond",         img: `${GH}/item/diamond.png` },
  { name: "Netherite Ingot", img: `${GH}/item/netherite_ingot.png` },
  { name: "Emerald",         img: `${GH}/item/emerald.png` },
  { name: "Ender Pearl",     img: `${GH}/item/ender_pearl.png` },
  { name: "Totem",           img: `${GH}/item/totem_of_undying.png` },
  { name: "Blaze Rod",       img: `${GH}/item/blaze_rod.png` },
  { name: "Nether Star",     img: `${GH}/item/nether_star.png` },
  { name: "Enchanted Book",  img: `${GH}/item/enchanted_book.png` },
];

const BLOCKS = [
  { name: "Grass",         img: `${W}/Grass_Block_JE7_BE6.png` },
  { name: "Diamond Ore",   img: `${W}/Deepslate_Diamond_Ore_JE2_BE1.png` },
  { name: "Obsidian",      img: `${W}/Obsidian_JE2.png` },
  { name: "Ancient Debris",img: `${W}/Ancient_Debris_JE1_BE1.png` },
  { name: "Sculk",         img: `${W}/Sculk_JE1_BE1.png` },
  { name: "Netherrack",    img: `${W}/Netherrack_JE2_BE1.png` },
  { name: "End Stone",     img: `${W}/End_Stone_JE2.png` },
  { name: "Crying Obs.",   img: `${GH}/block/crying_obsidian.png` },
];

const TAG_COLOR: Record<string, string> = {
  Hostile: "#ff4444",
  Neutral: "#aa88ff",
  Boss:    "#fcbe04",
};

const up = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0d0a] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 w-full pt-14">
          <div className="flex flex-col lg:flex-row items-center gap-16 py-24">

            {/* Text */}
            <div className="lg:w-1/2">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <span className="text-white/30 text-[9px] tracking-[0.3em] uppercase block mb-8" style={px}>
                  Java Edition 1.21.5
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-5xl lg:text-7xl leading-none mb-8 text-white"
                style={px}
              >
                Mine<br />
                <span className="text-[#5caf00]">craft</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                className="text-white/40 text-sm leading-8 mb-10 max-w-sm"
              >
                An infinite world composed entirely of blocks. Construct monumental structures, traverse vast terrain, and endure the perils of darkness.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="flex gap-4"
              >
                <a
                  href="#explore"
                  className="px-6 py-3 text-[10px] tracking-wider bg-[#5caf00] text-black hover:bg-[#6cc400] transition-colors"
                  style={px}
                  data-testid="button-play"
                >
                  Play Now
                </a>
                <a
                  href="#mobs"
                  className="px-6 py-3 text-[10px] tracking-wider border border-white/10 text-white/50 hover:border-white/30 hover:text-white/80 transition-colors"
                  style={px}
                  data-testid="button-explore"
                >
                  Explore
                </a>
              </motion.div>

              {/* Stat row */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
                className="flex gap-8 mt-14 pt-8 border-t border-white/5"
              >
                {[["140M+", "Players"], ["60+", "Biomes"], ["70+", "Mobs"], ["400+", "Items"]].map(([v, l]) => (
                  <div key={l}>
                    <div className="text-white text-lg mb-1" style={px}>{v}</div>
                    <div className="text-white/30 text-[8px] tracking-widest uppercase">{l}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Steve */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
              className="lg:w-1/2 flex justify-center"
            >
              <motion.img
                src="https://mc-heads.net/player/MHF_Steve/500"
                alt="Steve"
                className="select-none"
                style={{ height: 380, width: "auto" }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                data-testid="img-steve"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── BLOCKS ───────────────────────────────────────────────────────── */}
      <section id="explore" className="py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={up} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase mb-3" style={px}>The World</p>
            <h2 className="text-2xl text-white" style={px}>Each block serves a purpose.</h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            transition={{ staggerChildren: 0.05 }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="grid grid-cols-8 gap-2"
          >
            {BLOCKS.map((b) => (
              <motion.div key={b.name} variants={up} className="group flex flex-col items-center gap-2" data-testid={`block-${b.name}`}>
                <div className="w-full aspect-square bg-white/3 border border-white/5 group-hover:border-white/20 transition-colors flex items-center justify-center p-2">
                  <img src={b.img} alt={b.name} style={{ imageRendering: "pixelated", width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <span className="text-[6px] text-white/20 group-hover:text-white/50 transition-colors text-center" style={px}>{b.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Three pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px mt-16 border border-white/5">
            {[
              { img: `${GH}/item/diamond_pickaxe.png`, title: "Gather", body: "Every block within the world may be extracted and collected. Mine mineral deposits, harvest timber, and excavate cave systems." },
              { img: `${W}/Crafting_Table_JE4_BE3.png`, title: "Craft",  body: "Arrange raw materials within the 3×3 crafting grid to produce tools, weapons, mechanical devices, and essential equipment." },
              { img: `${GH}/item/diamond_sword.png`,    title: "Survive", body: "The onset of night heralds hostile creatures. Construct shelter, maintain illumination, and forge effective weapons to ensure survival." },
            ].map((f) => (
              <motion.div
                key={f.title}
                variants={up} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="p-8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                data-testid={`feature-${f.title.toLowerCase()}`}
              >
                <img src={f.img} alt={f.title} style={{ imageRendering: "pixelated", width: 36, height: 36 }} className="mb-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-sm text-white mb-3" style={px}>{f.title}</h3>
                <p className="text-white/35 text-xs leading-6">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOBS ─────────────────────────────────────────────────────────── */}
      <section id="mobs" className="py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={up} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase mb-3" style={px}>Bestiary</p>
            <h2 className="text-2xl text-white" style={px}>The dangers of darkness.</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px border border-white/5">
            {MOBS.map((mob, i) => (
              <motion.div
                key={mob.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="group flex flex-col bg-white/[0.02] hover:bg-white/[0.05] transition-colors overflow-hidden"
                data-testid={`mob-${mob.name.toLowerCase()}`}
              >
                {/* image area */}
                <div className="relative h-40 flex items-end justify-center px-4 pt-4"
                  style={{ background: `radial-gradient(ellipse at 50% 120%, ${mob.glow} 0%, transparent 70%)` }}>
                  <img
                    src={mob.img}
                    alt={mob.name}
                    className="h-32 w-auto object-contain group-hover:scale-105 transition-transform duration-500 select-none"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>

                {/* info */}
                <div className="p-4 border-t border-white/5 flex-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-white" style={px}>{mob.name}</span>
                    <span className="text-[7px]" style={{ color: TAG_COLOR[mob.tag] }}>{mob.tag}</span>
                  </div>
                  <p className="text-[9px] text-white/30 leading-5">{mob.desc}</p>
                  <div className="flex gap-3 mt-auto pt-2 border-t border-white/5">
                    <div>
                      <div className="text-[7px] text-white/20 uppercase tracking-wider mb-0.5">HP</div>
                      <div className="text-[8px] text-white/50" style={px}>{mob.hp}</div>
                    </div>
                    <div>
                      <div className="text-[7px] text-white/20 uppercase tracking-wider mb-0.5">Dmg</div>
                      <div className="text-[8px] text-white/50" style={px}>{mob.dmg}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIMENSIONS ───────────────────────────────────────────────────── */}
      <section id="dimensions" className="py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={up} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase mb-3" style={px}>Dimensions</p>
            <h2 className="text-2xl text-white" style={px}>Three distinct dimensions.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "Overworld",
                color: "#5caf00",
                img: "https://mc-heads.net/player/MHF_Steve/300",
                desc: "Infinite and procedurally generated. Every world seed produces terrain unlike any that preceded it.",
                tags: ["60+ Biomes", "Infinite terrain", "Day/night cycle"],
              },
              {
                name: "The Nether",
                color: "#cc3300",
                img: `${W}/Ghast_JE1_BE1.png`,
                desc: "A treacherous underworld defined by fire, lava seas, and ancient fortresses constructed by Piglin civilisations.",
                tags: ["Netherite ore", "Nether Fortresses", "Piglin society"],
              },
              {
                name: "The End",
                color: "#8855cc",
                img: `${W}/Enderman_JE3.png`,
                desc: "The ultimate frontier. Desolate floating islands, Chorus plants, and the formidable Ender Dragon await those who arrive.",
                tags: ["Ender Dragon", "End Cities", "Elytra wings"],
              },
            ].map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="group border border-white/5 hover:border-white/10 transition-colors overflow-hidden"
                data-testid={`dim-${d.name.toLowerCase().replace(/\s/g, "-")}`}
              >
                <div
                  className="h-48 flex items-end justify-center relative"
                  style={{ background: `linear-gradient(to top, #0a0d0a, ${d.color}18)` }}
                >
                  <img
                    src={d.img}
                    alt={d.name}
                    className="h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-500 select-none"
                    style={{ imageRendering: "pixelated", filter: `drop-shadow(0 8px 24px ${d.color}44)` }}
                  />
                </div>
                <div className="p-6 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <h3 className="text-[11px] text-white" style={px}>{d.name}</h3>
                  </div>
                  <p className="text-white/35 text-xs leading-6 mb-4">{d.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {d.tags.map((t) => (
                      <span key={t} className="text-[7px] px-2 py-1 border border-white/8 text-white/30" style={px}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ITEMS ─────────────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={up} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase mb-3" style={px}>Inventory</p>
            <h2 className="text-2xl text-white" style={px}>Items of significance.</h2>
          </motion.div>

          <div className="grid grid-cols-8 gap-2">
            {ITEMS.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                whileHover={{ scale: 1.08 }}
                className="group flex flex-col items-center gap-2"
                data-testid={`item-${item.name.toLowerCase().replace(/\s/g, "-")}`}
              >
                <div className="w-full aspect-square border border-white/5 group-hover:border-white/20 transition-colors flex items-center justify-center p-3 bg-white/[0.02]">
                  <img src={item.img} alt={item.name} style={{ imageRendering: "pixelated", width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <span className="text-[6px] text-white/20 group-hover:text-white/50 text-center transition-colors" style={px}>{item.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div variants={up} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <img
              src={`${W}/Grass_Block_JE7_BE6.png`}
              alt="grass block"
              className="mx-auto mb-10 opacity-60"
              style={{ imageRendering: "pixelated", width: 56, height: 56 }}
            />
            <h2 className="text-2xl md:text-3xl text-white mb-5" style={px}>Your world awaits.</h2>
            <p className="text-white/30 text-sm max-w-sm mx-auto leading-7 mb-10">
              140 million registered players. An infinite number of worlds. An adventure of boundless scope and enduring significance.
            </p>
            <a
              href="#"
              className="inline-block px-8 py-4 text-[10px] tracking-wider bg-[#5caf00] text-black hover:bg-[#6cc400] transition-colors"
              style={px}
              data-testid="button-cta"
            >
              Play for Free
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[8px] text-white/20" style={px}>Minecraft Tribute</span>
          <span className="text-[7px] text-white/15 text-center">Not an official Minecraft product. Not affiliated with Mojang or Microsoft.</span>
          <div className="flex gap-6">
            {["Wiki", "Forums", "Merch"].map((l) => (
              <a key={l} href="#" className="text-[8px] text-white/20 hover:text-white/50 transition-colors" style={px}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
