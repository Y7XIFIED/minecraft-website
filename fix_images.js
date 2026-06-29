const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'artifacts', 'minecraft-site', 'src');

const replacements = {
  'const W = "https://minecraft.wiki/images";': 'const W = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures";\nconst GH = W;',
  'const W  = "https://minecraft.wiki/images";': 'const W = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures";\nconst GH = W;',
  '`${W}/Grass_Block_JE7_BE6.png`': '`${GH}/block/grass_block_side.png`',
  '`${W}/Deepslate_Diamond_Ore_JE2_BE1.png`': '`${GH}/block/deepslate_diamond_ore.png`',
  '`${W}/Obsidian_JE2.png`': '`${GH}/block/obsidian.png`',
  '`${W}/Ancient_Debris_JE1_BE1.png`': '`${GH}/block/ancient_debris_side.png`',
  '`${W}/Sculk_JE1_BE1.png`': '`${GH}/block/sculk.png`',
  '`${W}/Netherrack_JE2_BE1.png`': '`${GH}/block/netherrack.png`',
  '`${W}/End_Stone_JE2.png`': '`${GH}/block/end_stone.png`',
  '`${W}/TNT_JE3_BE3.png`': '`${GH}/block/tnt_side.png`',
  '`${W}/Creeper_JE2.png`': '`${GH}/entity/creeper/creeper.png`',
  '`${W}/Zombie_JE3_BE2.png`': '`${GH}/entity/zombie/zombie.png`',
  '`${W}/Skeleton_JE2.png`': '`${GH}/entity/skeleton/skeleton.png`',
  '`${W}/Warden_JE1_BE1.png`': '`${GH}/entity/warden/warden.png`',
  '`${W}/Ghast_JE1_BE1.png`': '`${GH}/entity/ghast/ghast.png`',
  '`${W}/Spider_JE2_BE2.png`': '`${GH}/entity/spider/spider.png`',
  '`${W}/Blaze_JE2_BE2.png`': '`${GH}/entity/blaze.png`',
  '`${W}/Witch_JE2_BE2.png`': '`${GH}/entity/witch.png`',
  '`${W}/Phantom_JE3.png`': '`${GH}/entity/phantom.png`',
  '`${W}/Enderman_JE3.png`': '`${GH}/entity/enderman/enderman.png`',
  '`${W}/Crafting_Table_JE4_BE3.png`': '`${GH}/block/crafting_table_top.png`',
  '`${W}/Diamond_Sword_JE2_BE2.png`': '`${GH}/item/diamond_sword.png`',
  '`${W}/Diamond_Pickaxe_JE2_BE2.png`': '`${GH}/item/diamond_pickaxe.png`',
  '`${W}/Golden_Apple_JE2_BE2.png`': '`${GH}/item/golden_apple.png`',
  '`${W}/Totem_of_Undying_JE2_BE2.png`': '`${GH}/item/totem_of_undying.png`',
  '`${W}/Ender_Pearl_JE3_BE2.png`': '`${GH}/item/ender_pearl.png`',
  '`${W}/Enchanted_Book_JE2_BE2.png`': '`${GH}/item/enchanted_book.png`',
  '`${W}/Diamond_JE3_BE3.png`': '`${GH}/item/diamond.png`',
  '`${W}/Emerald_JE3_BE3.png`': '`${GH}/item/emerald.png`',
  '`${W}/Netherite_Ingot_JE2_BE1.png`': '`${GH}/item/netherite_ingot.png`',
  '`${W}/Nether_Star_JE2_BE2.png`': '`${GH}/item/nether_star.png`',
  '`${W}/Bread_JE3_BE3.png`': '`${GH}/item/bread.png`',
  '`${W}/Cooked_Beef_JE4_BE3.png`': '`${GH}/item/cooked_beef.png`',
  '`${W}/Blaze_Rod_JE2_BE2.png`': '`${GH}/item/blaze_rod.png`'
};

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [key, value] of Object.entries(replacements)) {
        if (content.includes(key)) {
          content = content.split(key).join(value);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed', fullPath);
      }
    }
  }
}

walk(srcDir);
