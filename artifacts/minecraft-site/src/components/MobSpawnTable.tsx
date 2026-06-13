import { useState } from "react";
import { motion } from "framer-motion";

const px: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };
const W = "https://minecraft.wiki/images";

const MOBS_DATA = [
  { name:"Creeper",          img:`${W}/Creeper_JE2.png`,          type:"Hostile", biome:"Any",           light:"≤7",  drops:"Gunpowder, Music Disc*", notes:"Explodes on contact. Silent approach." },
  { name:"Zombie",           img:`${W}/Zombie_JE3_BE2.png`,       type:"Hostile", biome:"Any",           light:"≤7",  drops:"Rotten Flesh, Iron Ingot", notes:"Burns in daylight. Can pick up items." },
  { name:"Skeleton",         img:`${W}/Skeleton_JE2.png`,         type:"Hostile", biome:"Any",           light:"≤7",  drops:"Bones, Arrows",           notes:"Ranged attacker. Burns in sunlight." },
  { name:"Spider",           img:`${W}/Spider_JE2_BE2.png`,       type:"Neutral", biome:"Any",           light:"≤7",  drops:"String, Spider Eye",      notes:"Neutral in daylight. Climbs walls." },
  { name:"Enderman",         img:`${W}/Enderman_JE3.png`,         type:"Neutral", biome:"Any/End",       light:"≤7",  drops:"Ender Pearl",             notes:"Teleports. Attacks if looked at directly." },
  { name:"Warden",           img:`${W}/Warden_JE1_BE1.png`,       type:"Hostile", biome:"Deep Dark",     light:"Any", drops:"Sculk Catalyst",          notes:"Summoned by noise. 500 HP, 1-shots most armor." },
  { name:"Ghast",            img:`${W}/Ghast_JE1_BE1.png`,        type:"Hostile", biome:"Nether",        light:"Any", drops:"Ghast Tear, Gunpowder",   notes:"Ranged fireball attack. Deflectable." },
  { name:"Blaze",            img:`${W}/Blaze_JE2_BE2.png`,        type:"Hostile", biome:"Nether Fortress",light:"Any",drops:"Blaze Rod",               notes:"Throws fire charges. Vulnerable to snowballs." },
  { name:"Elder Guardian",   img:`${W}/Elder_Guardian_JE2_BE2.png`,type:"Hostile",biome:"Ocean Monument", light:"Any", drops:"Sponge, Prismarine",     notes:"Inflicts Mining Fatigue. 80 HP." },
  { name:"Witch",            img:`${W}/Witch_JE2_BE2.png`,        type:"Hostile", biome:"Swamp",         light:"≤7",  drops:"Potions, Redstone, Glass Bottles", notes:"Throws splash potions. Drinks healing." },
  { name:"Shulker",          img:`${W}/Shulker_JE2.png`,          type:"Hostile", biome:"End City",      light:"Any", drops:"Shulker Shell",           notes:"Launches tracking projectiles. Levitation effect." },
  { name:"Piglin",           img:`${W}/Piglin_JE2_BE2.png`,       type:"Neutral", biome:"Nether",        light:"Any", drops:"Gold, Crossbow",          notes:"Hostile without gold armor. Tradeable." },
  { name:"Hoglin",           img:`${W}/Hoglin_JE2_BE2.png`,       type:"Hostile", biome:"Crimson Forest", light:"Any",drops:"Pork, Leather",           notes:"Avoid Warped Fungi and Portals." },
  { name:"Phantom",          img:`${W}/Phantom_JE3.png`,           type:"Hostile", biome:"Any (no sleep)",light:"≤7", drops:"Phantom Membrane",        notes:"Spawns when player hasn't slept 3+ days." },
  { name:"Breeze",           img:`${W}/Breeze_JE1.png`,           type:"Hostile", biome:"Trial Chamber", light:"Any", drops:"Breeze Rod",              notes:"Wind-based ranged attacks. Added in 1.21." },
  { name:"Iron Golem",       img:`${W}/Iron_Golem_JE4_BE3.png`,   type:"Neutral", biome:"Villages",      light:"Any", drops:"Iron Ingot, Poppy",       notes:"Protects villagers. Spawns in villages." },
];

const TYPES  = ["All", "Hostile", "Neutral", "Passive"];
const BIOMES_F = ["All Biomes","Nether","End","Swamp","Ocean","Any"];

const TYPE_COLOR: Record<string,string> = { Hostile: "#ff4444", Neutral: "#aa88ff", Passive: "#5caf00" };

export function MobSpawnTable() {
  const [search, setSearch] = useState("");
  const [type, setType]     = useState("All");
  const [sortBy, setSortBy] = useState<"name"|"type"|"biome">("name");

  let filtered = MOBS_DATA.filter(m => {
    if (type !== "All" && m.type !== type) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.biome.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  filtered = [...filtered].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 flex-wrap">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search mobs or biomes..."
          className="flex-1 min-w-0 bg-white/5 border border-white/10 px-3 py-2 text-[7px] text-white placeholder-white/20 outline-none"
          style={px}
        />
        {TYPES.map(t => (
          <button key={t} onClick={() => setType(t)}
            className={`px-2 py-1.5 text-[6px] border transition-colors shrink-0 ${type === t ? "border-[#5caf00] text-[#5caf00]" : "border-white/10 text-white/30"}`}
            style={px}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5">
              {[["name","Mob"],["type","Type"],["biome","Biome"],["drops","Drops"],["notes","Notes"]].map(([k,l]) => (
                <th key={k} className="pb-2 pr-4">
                  <button
                    onClick={() => setSortBy(k as any)}
                    className={`text-[6px] uppercase tracking-wider transition-colors ${sortBy === k ? "text-[#5caf00]" : "text-white/20 hover:text-white/40"}`}
                    style={px}
                  >
                    {l} {sortBy === k ? "▲" : ""}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((mob, i) => (
              <motion.tr
                key={mob.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-2 pr-4">
                  <div className="flex items-center gap-2">
                    <img src={mob.img} alt={mob.name} style={{ imageRendering:"pixelated", width:24, height:24 }} />
                    <span className="text-[7px] text-white/70 whitespace-nowrap" style={px}>{mob.name}</span>
                  </div>
                </td>
                <td className="py-2 pr-4">
                  <span className="text-[6px]" style={{ ...px, color: TYPE_COLOR[mob.type] ?? "#888" }}>{mob.type}</span>
                </td>
                <td className="py-2 pr-4">
                  <span className="text-[6px] text-white/30" style={px}>{mob.biome}</span>
                </td>
                <td className="py-2 pr-4">
                  <span className="text-[6px] text-white/30">{mob.drops}</span>
                </td>
                <td className="py-2">
                  <span className="text-[6px] text-white/20">{mob.notes}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-white/20 text-[7px] p-4" style={px}>No mobs match.</p>}
      </div>
      <p className="text-white/15 text-[6px]" style={px}>{filtered.length} mobs · Click column headers to sort</p>
    </div>
  );
}
