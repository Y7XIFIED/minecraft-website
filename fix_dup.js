const fs = require('fs');
const path = require('path');
const srcDir = path.join(__dirname, 'artifacts', 'minecraft-site', 'src');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let changed = false;
      const regex = /const GH = W;\r?\nconst GH =/g;
      if (regex.test(content)) {
        content = content.replace(regex, 'const GH =');
        changed = true;
      }
      
      const regex2 = /const W = "[^"]+";\r?\nconst GH = W;\r?\n/g;
      if (content.match(/const GH/g) && content.match(/const GH/g).length > 1) {
          content = content.replace(regex2, 'const W = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures";\n');
          changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed', fullPath);
      }
    }
  }
}
walk(srcDir);
