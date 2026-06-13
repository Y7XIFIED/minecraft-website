import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/Navbar";

const MC_WIKI = "https://minecraft.wiki/images";
// Reliable flat item/block sprites from the Minecraft assets repo
const GH = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures";

// Reliable 3D character renders from mc-heads.net
const STEVE_RENDER = "https://mc-heads.net/player/MHF_Steve/500";

const MOBS = [
  {
    name: "Creeper",
    tag: "HOSTILE",
    tagColor: "#ff4444",
    desc: "Silent. Explosive. Devastating. The most iconic mob in all of gaming.",
    img: `${MC_WIKI}/Creeper_JE4.png`,
    hp: 20,
    dmg: "Instant Kill",
    biome: "Overworld",
    glow: "#00af00",
  },
  {
    name: "Enderman",
    tag: "NEUTRAL",
    tagColor: "#aa44ff",
    desc: "Teleporting shadow creatures from The End. Never look them in the eye.",
    img: `${MC_WIKI}/Enderman_JE5.png`,
    hp: 40,
    dmg: "7 Hearts",
    biome: "End / Overworld",
    glow: "#7700ff",
  },
  {
    name: "Zombie",
    tag: "HOSTILE",
    tagColor: "#ff4444",
    desc: "Undead and relentless. They burn in daylight but rule the night.",
    img: `${MC_WIKI}/Zombie_JE3_BE2.png`,
    hp: 20,
    dmg: "2.5 Hearts",
    biome: "Overworld",
    glow: "#005500",
  },
  {
    name: "Skeleton",
    tag: "HOSTILE",
    tagColor: "#ff4444",
    desc: "Expert archers that pick you off from range. Beware in dark caves.",
    img: `${MC_WIKI}/Skeleton_JE5.png`,
    hp: 20,
    dmg: "2 Hearts",
    biome: "Overworld",
    glow: "#aaaaaa",
  },
  {
    name: "Warden",
    tag: "BOSS",
    tagColor: "#fcbe04",
    desc: "Blind but lethal. It hunts by sound in the Ancient City's darkness.",
    img: `${MC_WIKI}/Warden_JE2.png`,
    hp: 500,
    dmg: "15+ Hearts",
    biome: "Deep Dark",
    glow: "#00cccc",
  },
  {
    name: "Ghast",
    tag: "HOSTILE",
    tagColor: "#ff4444",
    desc: "Giant floating jellyfish that cry and launch fireballs in the Nether.",
    img: `${MC_WIKI}/Ghast_JE4.png`,
    hp: 10,
    dmg: "Fireball",
    biome: "Nether",
    glow: "#ff6600",
  },
];

const ITEMS = [
  { name: "Diamond", img: `${GH}/item/diamond.png`, rarity: "Rare" },
  { name: "Netherite Ingot", img: `${GH}/item/netherite_ingot.png`, rarity: "Epic" },
  { name: "Emerald", img: `${GH}/item/emerald.png`, rarity: "Uncommon" },
  { name: "Ender Pearl", img: `${GH}/item/ender_pearl.png`, rarity: "Uncommon" },
  { name: "Totem of Undying", img: `${GH}/item/totem_of_undying.png`, rarity: "Rare" },
  { name: "Enchanted Book", img: `${GH}/item/enchanted_book.png`, rarity: "Common" },
  { name: "Blaze Rod", img: `${GH}/item/blaze_rod.png`, rarity: "Uncommon" },
  { name: "Nether Star", img: `${GH}/item/nether_star.png`, rarity: "Legendary" },
];

// onError fallback: show a coloured block when an image fails
function imgFallback(e: React.SyntheticEvent<HTMLImageElement>, color = "#333") {
  const el = e.currentTarget;
  el.style.backgroundColor = color;
  el.style.border = `2px solid ${color}`;
  el.removeAttribute("src");
}

const RARITY_COLOR: Record<string, string> = {
  Common: "#aaaaaa",
  Uncommon: "#55ff55",
  Rare: "#5555ff",
  Epic: "#aa00aa",
  Legendary: "#fcbe04",
};

const BLOCKS = [
  { name: "Grass Block", img: `${MC_WIKI}/Grass_Block_JE7_BE6.png` },
  { name: "Diamond Ore", img: `${MC_WIKI}/Deepslate_Diamond_Ore_JE2_BE1.png` },
  { name: "Obsidian", img: `${MC_WIKI}/Obsidian_JE2_BE2.png` },
  { name: "Ancient Debris", img: `${MC_WIKI}/Ancient_Debris_JE1_BE1.png` },
  { name: "Sculk", img: `${MC_WIKI}/Sculk_JE1_BE1.png` },
  { name: "Netherrack", img: `${MC_WIKI}/Netherrack_JE3_BE1.png` },
  { name: "End Stone", img: `${MC_WIKI}/End_Stone_JE2_BE1.png` },
  { name: "Crying Obsidian", img: `${MC_WIKI}/Crying_Obsidian_JE3_BE2.png` },
];

// Floating item badges in hero — use pixel item sprites
const HERO_BADGES = [
  { img: `${GH}/item/diamond_sword.png`, label: "Diamond Sword", top: "15%", right: "-5%" },
  { img: `${GH}/item/diamond_pickaxe.png`, label: "Diamond Pickaxe", top: "45%", right: "-8%" },
  { img: `${MC_WIKI}/Grass_Block_JE7_BE6.png`, label: "Grass Block", top: "20%", left: "-5%" },
];

const DIMENSIONS = [
  {
    name: "The Overworld",
    subtitle: "Where it all begins",
    bg: "from-[#0a1a0a] to-[#0d2a0d]",
    border: "#3A5000",
    accent: "#7DB51A",
    // mc-heads.net provides reliable full-body player renders
    img: "https://mc-heads.net/player/MHF_Steve/500",
    imgAlt: "Steve in the Overworld",
    desc: "An infinite procedurally generated world of mountains, oceans, caves, and forests. Gather resources, build shelters, and explore biomes that stretch to the horizon.",
    features: ["60+ Biomes", "Infinite terrain", "Day/night cycle", "Weather system"],
  },
  {
    name: "The Nether",
    subtitle: "A hellish underworld",
    bg: "from-[#1a0000] to-[#2a0000]",
    border: "#5C0000",
    accent: "#ff4400",
    img: `${MC_WIKI}/Ghast_JE4.png`,
    imgAlt: "Ghast in The Nether",
    desc: "Enter the Nether portal and descend into a dimension of fire, lava, and ancient fortresses. Mine Netherite — the rarest material in existence.",
    features: ["Netherite ore", "Bastion Remnants", "Nether Fortresses", "Piglin society"],
  },
  {
    name: "The End",
    subtitle: "The final frontier",
    bg: "from-[#05001a] to-[#0a0028]",
    border: "#2a0055",
    accent: "#aa44ff",
    img: `${MC_WIKI}/Ender_Dragon_JE3.png`,
    imgAlt: "Ender Dragon",
    desc: "Reach the end of the journey. Battle the Ender Dragon, explore End Cities, and claim the ultimate prize — the Elytra wings.",
    features: ["Ender Dragon", "End Cities", "Shulker Boxes", "Elytra wings"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const pixelFont: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

function StatBadge({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-1 bg-[#111] border border-[#333] px-3 py-2">
      <span className="text-[8px] text-gray-500 uppercase tracking-widest" style={pixelFont}>{label}</span>
      <span className="text-[10px] text-white" style={pixelFont}>{value}</span>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white overflow-x-hidden">
      <Navbar />

      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(180deg, #050d08 0%, #0d1a0d 50%, #0a1208 100%)" }}
      >
        {/* Animated particle field */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: i % 3 === 0 ? 4 : 2,
                height: i % 3 === 0 ? 4 : 2,
                backgroundColor: i % 5 === 0 ? "#fcbe04" : i % 4 === 0 ? "#00ff00" : "#ffffff",
                left: `${(i * 7.3) % 100}%`,
                top: `${(i * 11.7) % 100}%`,
                opacity: 0.4 + (i % 4) * 0.15,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                delay: (i * 0.15) % 4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Minecraft grid overlay */}
        <div
          className="absolute inset-0 z-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(0,255,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.3) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left text */}
            <div className="lg:w-1/2 text-left">
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 border border-[#00af00] bg-[#00af0015] px-3 py-2 mb-8"
              >
                <span className="w-2 h-2 bg-[#00ff00] animate-pulse" />
                <span className="text-[#00ff00] text-[9px]" style={pixelFont}>JAVA EDITION 1.21.5</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-none mb-6"
                style={{ ...pixelFont, textShadow: "4px 4px 0 #000, 6px 6px 0 #003300" }}
              >
                MINE<br />
                <span style={{ color: "#00ff00", textShadow: "4px 4px 0 #000, 0 0 40px #00ff0066" }}>CRAFT</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-gray-300 text-sm leading-8 mb-10 max-w-lg"
                style={{ fontFamily: "monospace", letterSpacing: "0.05em" }}
              >
                Build anything. Explore everywhere. Survive the night.<br />
                The world is made of blocks — every single one is yours.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <a
                  href="#explore"
                  className="px-6 py-4 text-[11px] bg-[#00af00] text-black border-b-4 border-[#005500] hover:bg-[#00cc00] hover:translate-y-[-2px] active:translate-y-[2px] active:border-b-0 transition-all"
                  style={pixelFont}
                  data-testid="button-play-now"
                >
                  PLAY NOW
                </a>
                <a
                  href="#mobs"
                  className="px-6 py-4 text-[11px] bg-transparent text-white border-2 border-[#555] hover:border-[#00af00] hover:text-[#00af00] transition-all"
                  style={pixelFont}
                  data-testid="button-explore"
                >
                  EXPLORE WORLD
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-3"
              >
                {[
                  { label: "Players", value: "140M+" },
                  { label: "Versions", value: "Java + Bedrock" },
                  { label: "Biomes", value: "60+" },
                  { label: "Mobs", value: "70+" },
                ].map((s) => (
                  <StatBadge key={s.label} label={s.label} value={s.value} />
                ))}
              </motion.div>
            </div>

            {/* Right — Steve character render */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, type: "spring", bounce: 0.3 }}
              className="lg:w-1/2 flex justify-center items-end relative"
            >
              {/* Glow behind character */}
              <div
                className="absolute inset-0 m-auto w-64 h-64 opacity-30 blur-3xl"
                style={{ background: "radial-gradient(circle, #00ff00 0%, transparent 70%)" }}
              />
              <motion.img
                src={STEVE_RENDER}
                alt="Steve"
                className="relative z-10 drop-shadow-2xl select-none"
                style={{
                  height: "420px",
                  width: "auto",
                  filter: "drop-shadow(0 0 40px rgba(0,255,0,0.3))",
                }}
                onError={(e) => imgFallback(e, "#1a3a1a")}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                data-testid="img-steve"
              />
              {/* Floating item badges around Steve */}
              {HERO_BADGES.map((item) => (
                <motion.div
                  key={item.label}
                  className="absolute bg-[#111] border-2 border-[#333] p-2 flex flex-col items-center gap-1 cursor-default hidden lg:flex"
                  style={{ top: item.top, right: item.right, left: item.left }}
                  animate={{ y: [0, -6, 0], rotate: [0, 2, 0, -2, 0] }}
                  transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    style={{ imageRendering: "pixelated", width: 36, height: 36 }}
                  />
                  <span className="text-[7px] text-gray-400" style={pixelFont}>{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Terrain silhouette at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end pointer-events-none overflow-hidden h-24">
          <div className="w-full flex items-end gap-0">
            {[...Array(40)].map((_, i) => {
              const heights = [32, 48, 32, 64, 48, 32, 48, 64, 48, 32];
              const h = heights[i % heights.length];
              return (
                <div
                  key={i}
                  className="flex-1 bg-[#0d1117]"
                  style={{ height: h }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── EXPLORE / BLOCKS ─────────────────────────────────────────────── */}
      <section id="explore" className="py-24 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-[#00af00] text-[9px] tracking-widest" style={pixelFont}>-- THE WORLD --</span>
            <h2 className="text-2xl md:text-4xl mt-3 mb-4" style={{ ...pixelFont, textShadow: "3px 3px 0 #000" }}>
              EVERY BLOCK TELLS A STORY
            </h2>
            <p className="text-gray-400 max-w-xl text-sm leading-7" style={{ fontFamily: "monospace" }}>
              From the humble Grass Block to the rarest Ancient Debris, the world is built from hundreds of unique blocks — each with its own properties and uses.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-4 sm:grid-cols-8 gap-3"
          >
            {BLOCKS.map((block) => (
              <motion.div
                key={block.name}
                variants={fadeUp}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                className="group flex flex-col items-center gap-2 cursor-default"
                data-testid={`card-block-${block.name.toLowerCase().replace(/\s/g, "-")}`}
              >
                <div className="w-full aspect-square bg-[#111] border-2 border-[#222] hover:border-[#00af00] transition-colors flex items-center justify-center p-2">
                  <img
                    src={block.img}
                    alt={block.name}
                    style={{ imageRendering: "pixelated", width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
                <span className="text-[6px] text-gray-500 group-hover:text-gray-200 transition-colors text-center leading-4" style={pixelFont}>
                  {block.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature columns */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
          >
            {[
              {
                icon: `${GH}/item/diamond_pickaxe.png`,
                title: "GATHER",
                desc: "Every block in the world can be mined and collected. Punch trees, drill through stone, and mine precious ores deep underground.",
              },
              {
                icon: `${MC_WIKI}/Crafting_Table_JE4_BE3.png`,
                title: "CRAFT",
                desc: "Combine materials in the crafting grid to create tools, weapons, armor, and machines. Over 400 craftable items await.",
              },
              {
                icon: `${GH}/item/diamond_sword.png`,
                title: "SURVIVE",
                desc: "Monsters spawn when darkness falls. Build shelter, light torches, and defend yourself from Creepers, Zombies, and Skeletons.",
              },
            ].map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="bg-[#111] border border-[#1e2e1e] p-6 hover:border-[#00af00] transition-colors group"
                data-testid={`card-feature-${f.title.toLowerCase()}`}
              >
                <img
                  src={f.icon}
                  alt={f.title}
                  className="mb-5 group-hover:scale-110 transition-transform"
                  style={{ imageRendering: "pixelated", width: 48, height: 48 }}
                />
                <h3 className="text-sm text-white mb-3" style={pixelFont}>{f.title}</h3>
                <p className="text-gray-400 text-xs leading-6" style={{ fontFamily: "monospace" }}>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── MOBS ─────────────────────────────────────────────────────────── */}
      <section id="mobs" className="py-24 bg-[#090d09]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-[#ff4444] text-[9px] tracking-widest" style={pixelFont}>-- HOSTILE MOB ENCYCLOPEDIA --</span>
            <h2 className="text-2xl md:text-4xl mt-3 mb-4" style={{ ...pixelFont, textShadow: "3px 3px 0 #000" }}>
              BEWARE THE DARK
            </h2>
            <p className="text-gray-400 max-w-xl text-sm leading-7" style={{ fontFamily: "monospace" }}>
              Over 70 unique mobs inhabit the world. Some are friendly. Most are not. Know your enemy — your survival depends on it.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {MOBS.map((mob) => (
              <motion.div
                key={mob.name}
                variants={fadeUp}
                className="group bg-[#0d120d] border border-[#1a221a] hover:border-[#333] transition-all overflow-hidden"
                whileHover={{ y: -4 }}
                data-testid={`card-mob-${mob.name.toLowerCase()}`}
              >
                {/* Mob image */}
                <div
                  className="relative h-52 flex items-end justify-center overflow-hidden"
                  style={{
                    background: `radial-gradient(ellipse at 50% 100%, ${mob.glow}22 0%, #0d120d 70%)`,
                  }}
                >
                  <img
                    src={mob.img}
                    alt={mob.name}
                    className="h-44 w-auto object-contain group-hover:scale-105 transition-transform duration-500 select-none"
                    style={{
                      imageRendering: "pixelated",
                      filter: `drop-shadow(0 0 20px ${mob.glow}66)`,
                    }}
                  />
                </div>

                {/* Info */}
                <div className="p-5 border-t border-[#1a221a]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm text-white" style={pixelFont}>{mob.name}</h3>
                    <span
                      className="text-[8px] px-2 py-1 border"
                      style={{ ...pixelFont, color: mob.tagColor, borderColor: mob.tagColor + "55", backgroundColor: mob.tagColor + "11" }}
                    >
                      {mob.tag}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-6 mb-4" style={{ fontFamily: "monospace" }}>{mob.desc}</p>
                  <div className="flex gap-2 flex-wrap">
                    <StatBadge label="HP" value={mob.hp} />
                    <StatBadge label="DAMAGE" value={mob.dmg} />
                    <StatBadge label="BIOME" value={mob.biome} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── DIMENSIONS ───────────────────────────────────────────────────── */}
      <section id="dimensions" className="py-24 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-[#aa44ff] text-[9px] tracking-widest" style={pixelFont}>-- DIMENSIONS --</span>
            <h2 className="text-2xl md:text-4xl mt-3" style={{ ...pixelFont, textShadow: "3px 3px 0 #000" }}>
              THREE WORLDS. ONE ADVENTURE.
            </h2>
          </motion.div>

          <div className="flex flex-col gap-6">
            {DIMENSIONS.map((dim, i) => (
              <motion.div
                key={dim.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-0 overflow-hidden border border-[#1a1a2e]`}
              >
                {/* Image side */}
                <div
                  className={`lg:w-2/5 min-h-72 flex items-end justify-center relative overflow-hidden bg-gradient-to-br ${dim.bg}`}
                  style={{ borderRight: i % 2 === 0 ? `4px solid ${dim.border}` : undefined, borderLeft: i % 2 !== 0 ? `4px solid ${dim.border}` : undefined }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: `radial-gradient(ellipse at 50% 100%, ${dim.accent}22 0%, transparent 70%)` }}
                  />
                  <img
                    src={dim.img}
                    alt={dim.imgAlt}
                    className="relative z-10 h-64 w-auto object-contain select-none"
                    style={{
                      imageRendering: "pixelated",
                      filter: `drop-shadow(0 0 30px ${dim.accent}55)`,
                    }}
                  />
                </div>

                {/* Text side */}
                <div className="lg:w-3/5 p-8 lg:p-12 bg-[#0d1117] flex flex-col justify-center">
                  <span className="text-[9px] tracking-widest mb-3" style={{ ...pixelFont, color: dim.accent }}>
                    {dim.subtitle.toUpperCase()}
                  </span>
                  <h3 className="text-xl md:text-2xl text-white mb-5" style={{ ...pixelFont, textShadow: "2px 2px 0 #000" }}>
                    {dim.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-7 mb-8" style={{ fontFamily: "monospace" }}>{dim.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {dim.features.map((f) => (
                      <span
                        key={f}
                        className="text-[8px] px-3 py-2 border"
                        style={{ ...pixelFont, borderColor: dim.accent + "44", color: dim.accent, backgroundColor: dim.accent + "11" }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ITEMS ────────────────────────────────────────────────────────── */}
      <section id="items" className="py-24 bg-[#090d09]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-[#fcbe04] text-[9px] tracking-widest" style={pixelFont}>-- INVENTORY --</span>
            <h2 className="text-2xl md:text-4xl mt-3" style={{ ...pixelFont, textShadow: "3px 3px 0 #000" }}>
              LEGENDARY ITEMS
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"
          >
            {ITEMS.map((item) => (
              <motion.div
                key={item.name}
                variants={fadeUp}
                whileHover={{ scale: 1.1, y: -4 }}
                className="group flex flex-col items-center gap-2 cursor-default"
                data-testid={`card-item-${item.name.toLowerCase().replace(/\s/g, "-")}`}
              >
                <div
                  className="w-full aspect-square flex items-center justify-center p-3 border-2 transition-all"
                  style={{
                    backgroundColor: "#111",
                    borderColor: RARITY_COLOR[item.rarity] + "44",
                    boxShadow: `inset 0 0 20px ${RARITY_COLOR[item.rarity]}11`,
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ imageRendering: "pixelated", width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
                <span className="text-[6px] text-center leading-4" style={{ ...pixelFont, color: RARITY_COLOR[item.rarity] }}>
                  {item.rarity}
                </span>
                <span className="text-[6px] text-gray-400 text-center leading-4 group-hover:text-white transition-colors" style={pixelFont}>
                  {item.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1a0a 0%, #050d05 100%)" }}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "linear-gradient(rgba(0,255,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.3) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src={`${MC_WIKI}/Grass_Block_JE7_BE6.png`}
              alt="grass block"
              className="mx-auto mb-8"
              style={{ imageRendering: "pixelated", width: 80, height: 80 }}
            />
            <h2 className="text-2xl md:text-4xl mb-6" style={{ ...pixelFont, textShadow: "3px 3px 0 #000" }}>
              YOUR WORLD AWAITS
            </h2>
            <p className="text-gray-300 text-sm leading-8 mb-10 max-w-lg mx-auto" style={{ fontFamily: "monospace" }}>
              140 million players. Infinite worlds. One blocky adventure that never ends. Start your journey today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#"
                className="px-8 py-4 text-[11px] bg-[#00af00] text-black border-b-4 border-[#005500] hover:bg-[#00cc00] hover:translate-y-[-2px] active:translate-y-[2px] active:border-b-0 transition-all"
                style={pixelFont}
                data-testid="button-cta-play"
              >
                PLAY FOR FREE
              </a>
              <a
                href="#"
                className="px-8 py-4 text-[11px] bg-transparent text-white border-2 border-[#444] hover:border-[#00af00] hover:text-[#00ff00] transition-all"
                style={pixelFont}
                data-testid="button-cta-learn"
              >
                LEARN MORE
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-12 bg-[#080c08] border-t-4 border-[#1a221a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <img
                src={`${MC_WIKI}/Grass_Block_JE7_BE6.png`}
                alt="block"
                style={{ imageRendering: "pixelated", width: 28, height: 28 }}
              />
              <span className="text-xs text-gray-400" style={pixelFont}>MINECRAFT TRIBUTE</span>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              {["Wiki", "Forums", "Merch", "Feedback"].map((l) => (
                <a key={l} href="#" className="text-[9px] text-gray-500 hover:text-[#00af00] transition-colors" style={pixelFont}>{l}</a>
              ))}
            </div>
            <p className="text-[7px] text-gray-600 text-center" style={pixelFont}>
              NOT AN OFFICIAL MINECRAFT PRODUCT.<br />NOT AFFILIATED WITH MOJANG OR MICROSOFT.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
