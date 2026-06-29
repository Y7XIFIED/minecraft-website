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
      if (content.includes('Zombie_JE3_BE2.png')) {
        content = content.replace(/Zombie_JE3_BE2\.png/g, 'Zombie_JE5_BE2.png');
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
