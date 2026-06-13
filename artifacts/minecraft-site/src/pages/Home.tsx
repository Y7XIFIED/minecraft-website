import { motion } from "framer-motion";
import { McButton } from "@/components/McButton";
import { McPanel } from "@/components/McPanel";
import { Pickaxe, Sword, Shield, Box, Sparkles, Map, Skull, Flame } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-32 overflow-hidden">
        {/* Night Sky Background with stars */}
        <div className="absolute inset-0 z-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white animate-blink"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Particles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-accent animate-float opacity-60"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-sans text-white pixel-text-shadow tracking-tighter mb-4">
              MINECRAFT
            </h1>
            <p className="text-xl md:text-3xl text-gray-300 pixel-text-shadow mt-4">
              Explore. Build. Survive. <span className="animate-blink">_</span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 mt-12"
          >
            <McButton className="text-xl px-8 py-5">Play Now</McButton>
            <McButton variant="wood" className="text-xl px-8 py-5">View Docs</McButton>
          </motion.div>
        </div>

        {/* Terrain Silhouette */}
        <div className="absolute bottom-0 w-full h-32 flex items-end">
          <div className="w-full h-16 bg-[#0a0a1a] shadow-[0_-16px_0_0_#111122,0_-32px_0_0_#1a1a2e]" />
        </div>
      </section>

      {/* OVERWORLD / FEATURES */}
      <section className="py-24 relative texture-grass border-y-8 border-[#3A5000]">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl text-white pixel-text-shadow mb-6">The Overworld</h2>
            <p className="text-lg text-green-100 max-w-2xl mx-auto pixel-text-shadow leading-relaxed">
              An infinite canvas of blocks. From towering mountains to deep ravines, every world is procedurally generated and uniquely yours.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <McPanel className="flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-card flex items-center justify-center mc-border mb-6">
                <Box className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl mb-4 text-white pixel-text-shadow">Gather</h3>
              <p className="text-sm text-gray-300 leading-loose">
                Punch trees, mine stone, collect ores. Every block in the world can be broken and collected.
              </p>
            </McPanel>
            
            <McPanel className="flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-card flex items-center justify-center mc-border mb-6">
                <Pickaxe className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl mb-4 text-white pixel-text-shadow">Craft</h3>
              <p className="text-sm text-gray-300 leading-loose">
                Combine resources in the 3x3 crafting grid to create tools, weapons, and complex machinery.
              </p>
            </McPanel>

            <McPanel className="flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-card flex items-center justify-center mc-border mb-6">
                <Sword className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-xl mb-4 text-white pixel-text-shadow">Survive</h3>
              <p className="text-sm text-gray-300 leading-loose">
                When the sun goes down, the monsters come out. Build a shelter and craft weapons to defend yourself.
              </p>
            </McPanel>
          </motion.div>
        </div>
      </section>

      {/* CRAFTING SECTION */}
      <section className="py-24 bg-card relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl text-white pixel-text-shadow mb-6">Master the Forge</h2>
              <p className="text-gray-400 mb-8 leading-loose text-sm md:text-base">
                From a simple wooden pickaxe to enchanting diamond armor, crafting is the core of survival. Discover recipes, brew potions, and forge alliances with villagers.
              </p>
              <ul className="space-y-4">
                {['Diamond Pickaxe', 'Enchanting Table', 'Brewing Stand', 'Redstone Comparator'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-300">
                    <span className="w-3 h-3 bg-primary block mc-border" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 w-full"
            >
              <McPanel variant="stone" className="p-8">
                <div className="mb-4 text-white pixel-text-shadow text-center">Crafting</div>
                <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
                  <div className="grid grid-cols-3 gap-2 p-2 bg-[#555] mc-border">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-12 h-12 bg-[#8B8B8B] mc-border hover:bg-[#9B9B9B] transition-colors cursor-pointer" />
                    ))}
                  </div>
                  <div className="text-4xl text-[#333] hidden sm:block">➔</div>
                  <div className="w-16 h-16 bg-[#8B8B8B] mc-border flex items-center justify-center animate-float">
                    <Sparkles className="w-8 h-8 text-accent" />
                  </div>
                </div>
              </McPanel>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MOBS / ENEMIES */}
      <section className="py-24 relative texture-dirt border-y-8 border-[#5C3A21]">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl text-white pixel-text-shadow mb-6">Beware the Dark</h2>
            <p className="text-lg text-orange-200 max-w-2xl mx-auto pixel-text-shadow leading-relaxed">
              The world is not empty. Friendly creatures roam the plains, while terrifying monsters lurk in caves and shadows.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Creeper", desc: "Silent and explosive.", color: "bg-primary" },
              { name: "Enderman", desc: "Do not look them in the eye.", color: "bg-purple-900" },
              { name: "Zombie", desc: "Slow but persistent.", color: "bg-[#005500]" },
              { name: "Skeleton", desc: "Armed with a bow.", color: "bg-gray-300" }
            ].map((mob, i) => (
              <motion.div
                key={mob.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <McPanel variant="dark" className="h-full flex flex-col items-center text-center group cursor-crosshair">
                  <div className={`w-20 h-20 ${mob.color} mc-border mb-6 group-hover:scale-110 transition-transform`} />
                  <h3 className="text-lg mb-2 text-white">{mob.name}</h3>
                  <p className="text-xs text-gray-400 leading-loose">{mob.desc}</p>
                </McPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE NETHER */}
      <section className="py-32 relative bg-[#2A0000] border-t-8 border-[#4A0000] overflow-hidden">
        {/* Nether particles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-destructive animate-float opacity-40 mix-blend-screen"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Flame className="w-16 h-16 text-destructive mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-6xl text-destructive pixel-text-shadow mb-8">The Nether</h2>
            <p className="text-lg text-red-200 max-w-2xl mx-auto pixel-text-shadow leading-relaxed mb-12">
              A hellish dimension filled with fire, lava, and dangerous mobs. Mine ancient debris for Netherite and conquer the Nether Fortresses.
            </p>
            <McButton className="!bg-[#330000] !border-destructive hover:!bg-[#4A0000] text-destructive-foreground">
              Enter Portal
            </McButton>
          </motion.div>
        </div>
      </section>

      {/* THE END */}
      <section className="py-32 relative bg-[#05001A] border-t-8 border-[#1A0033] overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Skull className="w-16 h-16 text-purple-500 mx-auto mb-6 animate-float" />
            <h2 className="text-4xl md:text-6xl text-purple-300 pixel-text-shadow mb-8">The End</h2>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto pixel-text-shadow leading-relaxed mb-12">
              The final frontier. A barren void of floating islands, Chorus plants, and the mighty Ender Dragon. Are you prepared?
            </p>
            <div className="flex justify-center gap-4">
               {[...Array(3)].map((_, i) => (
                 <div key={i} className="w-12 h-12 bg-purple-900 mc-border border-purple-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s`}} />
               ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 texture-stone text-center border-t-8 border-[#555]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl text-white pixel-text-shadow mb-8">MINECRAFT TRIBUTE</h2>
          <div className="flex justify-center gap-6 mb-8">
            <McButton variant="dark" className="px-4 py-2 text-xs">Privacy</McButton>
            <McButton variant="dark" className="px-4 py-2 text-xs">Terms</McButton>
            <McButton variant="dark" className="px-4 py-2 text-xs">Contact</McButton>
          </div>
          <p className="text-xs text-gray-400">
            NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
          </p>
        </div>
      </footer>

    </div>
  );
}
