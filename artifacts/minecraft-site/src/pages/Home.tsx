import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { CraftingGame } from "@/components/CraftingGame";
import { MobClicker } from "@/components/MobClicker";

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

const SPLASHES = [
  "Also try Terraria!",
  "Now with more blocks!",
  "Creepers are friendly!",
  "Made in 4 days!",
  "Endermen teleport!",
  "The cake is not a lie!",
  "It's not a bug, it's a feature!",
  "Diamonds are a player's best friend!",
  "Mine during the day, survive at night!",
  "The seed is 2151901553968352745!",
  "100% more blocks than before!",
  "Build to the sky limit!",
  "Notch approved!",
  "Ghasts are just misunderstood!",
];

function randomSeed() {
  return Math.floor(1_000_000_000 + Math.random() * 8_999_999_999);
}

function useCountUp(to: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return { count, ref };
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value, 1800);
  return (
    <div ref={ref}>
      <motion.div
        className="text-white text-lg mb-1"
        style={px}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {count}{suffix}
      </motion.div>
      <div className="text-white/30 text-[8px] tracking-widest uppercase">{label}</div>
    </div>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const chars = title.split("");
  return (
    <div ref={ref} className="mb-12">
      <motion.p
        className="text-white/20 text-[9px] tracking-[0.3em] uppercase mb-3"
        style={px}
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        {label}
      </motion.p>
      <h2 className="text-2xl text-white flex flex-wrap" style={px}>
        {chars.map((c, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 + i * 0.03, duration: 0.3, ease: "easeOut" }}
          >
            {c === " " ? "\u00a0" : c}
          </motion.span>
        ))}
      </h2>
    </div>
  );
}

export default function Home() {
  const [seed, setSeed] = useState(randomSeed);
  const [splashIdx, setSplashIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSplashIdx(i => (i + 1) % SPLASHES.length), 3500);
    return () => clearInterval(t);
  }, []);

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
                className="text-5xl lg:text-7xl leading-none mb-8"
                style={px}
              >
                <span className="text-white">Mine</span><span className="text-[#5caf00]">craft</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                className="text-white/40 text-sm leading-8 mb-6 max-w-sm"
              >
                An infinite world composed entirely of blocks. Construct monumental structures, traverse vast terrain, and endure the perils of darkness.
              </motion.p>

              {/* Rotating splash text */}
              <div className="h-6 mb-6 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={splashIdx}
                    initial={{ opacity: 0, y: 10, rotate: -1 }}
                    animate={{ opacity: 1, y: 0, rotate: -1 }}
                    exit={{ opacity: 0, y: -10, rotate: -1 }}
                    transition={{ duration: 0.35 }}
                    className="text-[7px] italic"
                    style={{ ...px, color: "#fcbe04" }}
                  >
                    {SPLASHES[splashIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="flex gap-4"
              >
                <motion.a
                  href="#explore"
                  className="px-6 py-3 text-[10px] tracking-wider bg-[#5caf00] text-black"
                  style={px}
                  data-testid="button-play"
                  whileHover={{ scale: 1.04, backgroundColor: "#6cc400" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Play Now
                </motion.a>
                <motion.a
                  href="#mobs"
                  className="px-6 py-3 text-[10px] tracking-wider border border-white/10 text-white/50"
                  style={px}
                  data-testid="button-explore"
                  whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.8)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore
                </motion.a>
              </motion.div>

              {/* Stat row — count-up */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
                className="flex gap-8 mt-14 pt-8 border-t border-white/5"
              >
                <StatItem value={140} suffix="M+" label="Players" />
                <StatItem value={60}  suffix="+"  label="Biomes" />
                <StatItem value={70}  suffix="+"  label="Mobs" />
                <StatItem value={400} suffix="+"  label="Items" />
              </motion.div>

              {/* World seed */}
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                onClick={() => setSeed(randomSeed())}
                className="mt-5 flex items-center gap-2 group"
                title="Click to generate a new seed"
              >
                <span className="text-white/15 text-[7px] tracking-wider" style={px}>SEED</span>
                <span className="text-white/20 text-[7px] group-hover:text-[#5caf00] transition-colors" style={px}>{seed}</span>
                <motion.span
                  key={seed}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.4 }}
                  className="text-white/15 text-[8px] group-hover:text-[#5caf00] transition-colors"
                >
                  ↻
                </motion.span>
              </motion.button>
            </div>

            {/* Steve */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2 flex justify-center"
            >
              <motion.img
                src="https://mc-heads.net/player/MHF_Steve/500"
                alt="Steve"
                className="select-none"
                style={{ height: 380, width: "auto" }}
                animate={{ y: [0, -14, 0], rotate: [0, 1, 0, -1, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 24px rgba(92,175,0,0.3))" }}
                data-testid="img-steve"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
      <div className="border-b border-white/5 py-3 overflow-hidden bg-white/[0.015]">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...SPLASHES, ...SPLASHES].map((s, i) => (
            <span key={i} className="text-[7px] text-white/15 italic shrink-0" style={px}>
              ✦ {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── BLOCKS ───────────────────────────────────────────────────────── */}
      <section id="explore" className="py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading label="The World" title="Each block serves a purpose." />

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            transition={{ staggerChildren: 0.06 }}
            variants={{ hidden: {}, visible: {} }}
            className="grid grid-cols-8 gap-2"
          >
            {BLOCKS.map((b) => (
              <motion.div
                key={b.name}
                variants={{ hidden: { opacity: 0, y: -20, scale: 0.8 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                whileHover={{ y: -8, scale: 1.12, zIndex: 10 }}
                className="group flex flex-col items-center gap-2 cursor-pointer"
                data-testid={`block-${b.name}`}
              >
                <div className="w-full aspect-square bg-white/3 border border-white/5 group-hover:border-[#5caf00]/40 transition-colors flex items-center justify-center p-2">
                  <img src={b.img} alt={b.name} style={{ imageRendering: "pixelated", width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <span className="text-[6px] text-white/20 group-hover:text-[#5caf00] transition-colors text-center" style={px}>{b.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Three pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px mt-16 border border-white/5">
            {[
              { img: `${GH}/item/diamond_pickaxe.png`, title: "Gather", body: "Every block within the world may be extracted and collected. Mine mineral deposits, harvest timber, and excavate cave systems." },
              { img: `${W}/Crafting_Table_JE4_BE3.png`, title: "Craft",  body: "Arrange raw materials within the 3×3 crafting grid to produce tools, weapons, mechanical devices, and essential equipment." },
              { img: `${GH}/item/diamond_sword.png`,    title: "Survive", body: "The onset of night heralds hostile creatures. Construct shelter, maintain illumination, and forge effective weapons to ensure survival." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                data-testid={`feature-${f.title.toLowerCase()}`}
              >
                <motion.img
                  src={f.img} alt={f.title}
                  style={{ imageRendering: "pixelated", width: 36, height: 36 }}
                  className="mb-6 opacity-70 group-hover:opacity-100 transition-opacity"
                  whileHover={{ y: [-0, -6, 0], transition: { duration: 0.4, repeat: Infinity } }}
                />
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
          <SectionHeading label="Bestiary" title="The dangers of darkness." />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px border border-white/5">
            {MOBS.map((mob, i) => (
              <motion.div
                key={mob.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                whileHover={{ scale: 1.02, zIndex: 5 }}
                className="group flex flex-col bg-white/[0.02] hover:bg-white/[0.06] transition-colors overflow-hidden cursor-pointer"
                data-testid={`mob-${mob.name.toLowerCase()}`}
              >
                {/* image area */}
                <div className="relative h-40 flex items-end justify-center px-4 pt-4"
                  style={{ background: `radial-gradient(ellipse at 50% 120%, ${mob.glow} 0%, transparent 70%)` }}>
                  <motion.img
                    src={mob.img}
                    alt={mob.name}
                    className="h-32 w-auto object-contain select-none"
                    style={{ imageRendering: "pixelated" }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    whileHover={{ scale: 1.12, filter: `drop-shadow(0 8px 20px ${mob.glow}aa)` }}
                  />
                </div>

                {/* info */}
                <div className="p-4 border-t border-white/5 flex-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-white" style={px}>{mob.name}</span>
                    <motion.span
                      className="text-[7px]"
                      style={{ color: TAG_COLOR[mob.tag] }}
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    >
                      {mob.tag}
                    </motion.span>
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
          <SectionHeading label="Dimensions" title="Three distinct dimensions." />

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
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -4, borderColor: `${d.color}44` }}
                className="group border border-white/5 overflow-hidden cursor-pointer"
                style={{ transition: "border-color 0.3s" }}
                data-testid={`dim-${d.name.toLowerCase().replace(/\s/g, "-")}`}
              >
                <div
                  className="h-48 flex items-end justify-center relative"
                  style={{ background: `linear-gradient(to top, #0a0d0a, ${d.color}18)` }}
                >
                  <motion.img
                    src={d.img}
                    alt={d.name}
                    className="h-36 w-auto object-contain select-none"
                    style={{ imageRendering: "pixelated", filter: `drop-shadow(0 8px 24px ${d.color}44)` }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.1, filter: `drop-shadow(0 12px 30px ${d.color}88)` }}
                  />
                </div>
                <div className="p-6 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: d.color }}
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    />
                    <h3 className="text-[11px] text-white" style={px}>{d.name}</h3>
                  </div>
                  <p className="text-white/35 text-xs leading-6 mb-4">{d.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {d.tags.map((t, ti) => (
                      <motion.span
                        key={t}
                        className="text-[7px] px-2 py-1 border border-white/8 text-white/30"
                        style={px}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12 + ti * 0.07 }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ITEMS ─────────────────────────────────────────────────────────── */}
      <section id="items" className="py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading label="Inventory" title="Items of significance." />

          <div className="grid grid-cols-8 gap-2">
            {ITEMS.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, type: "spring", stiffness: 280, damping: 20 }}
                whileHover={{ y: -6, scale: 1.1 }}
                className="group flex flex-col items-center gap-2 cursor-pointer"
                data-testid={`item-${item.name.toLowerCase().replace(/\s/g, "-")}`}
              >
                <motion.div
                  className="w-full aspect-square border border-white/5 group-hover:border-[#fcbe04]/30 transition-colors flex items-center justify-center p-3 bg-white/[0.02]"
                  whileHover={{ backgroundColor: "rgba(252,190,4,0.04)" }}
                >
                  <motion.img
                    src={item.img}
                    alt={item.name}
                    style={{ imageRendering: "pixelated", width: "100%", height: "100%", objectFit: "contain" }}
                    whileHover={{ rotate: [0, -8, 8, -4, 0], transition: { duration: 0.5 } }}
                  />
                </motion.div>
                <span className="text-[6px] text-white/20 group-hover:text-[#fcbe04] text-center transition-colors" style={px}>{item.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GAMES ────────────────────────────────────────────────────────── */}
      <section id="games" className="py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading label="Interactive" title="Play within the page." />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px border border-white/5">
            <motion.div
              variants={up} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="p-8 bg-white/[0.02]"
            >
              <p className="text-white/20 text-[8px] uppercase tracking-widest mb-6" style={px}>Crafting Bench</p>
              <CraftingGame />
            </motion.div>
            <motion.div
              variants={up} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="p-8 bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/5"
            >
              <p className="text-white/20 text-[8px] uppercase tracking-widest mb-6" style={px}>Mob Eliminator</p>
              <MobClicker />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        {/* Subtle animated background dots */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px bg-white/10"
              style={{ left: `${8 + i * 8}%`, top: `${20 + (i % 3) * 20}%` }}
              animate={{ opacity: [0, 0.6, 0], scale: [0, 2, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src={`${W}/Grass_Block_JE7_BE6.png`}
              alt="grass block"
              className="mx-auto mb-10 opacity-60"
              style={{ imageRendering: "pixelated", width: 56, height: 56 }}
              animate={{ rotate: [0, 3, 0, -3, 0], y: [0, -4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.2, opacity: 1, rotate: 12 }}
            />
            <motion.h2
              className="text-2xl md:text-3xl text-white mb-5"
              style={px}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              Your world awaits.
            </motion.h2>
            <motion.p
              className="text-white/30 text-sm max-w-sm mx-auto leading-7 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              140 million registered players. An infinite number of worlds. An adventure of boundless scope and enduring significance.
            </motion.p>
            <motion.a
              href="#"
              className="inline-block px-8 py-4 text-[10px] tracking-wider bg-[#5caf00] text-black"
              style={px}
              data-testid="button-cta"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, type: "spring", stiffness: 260, damping: 20 }}
              whileHover={{ scale: 1.06, backgroundColor: "#6cc400" }}
              whileTap={{ scale: 0.97 }}
            >
              Play for Free
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[8px] text-white/20" style={px}>Developed by <span className="text-white/40">Y7XIFIED</span></span>
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
