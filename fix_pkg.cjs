const fs = require('fs');
const pkgPath = './package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const catalog = {
  '@tailwindcss/vite': '^4.1.14',
  '@tanstack/react-query': '^5.90.21',
  '@types/node': '^25.3.3',
  '@types/react': '^19.2.0',
  '@types/react-dom': '^19.2.0',
  '@vitejs/plugin-react': '^5.0.4',
  'class-variance-authority': '^0.7.1',
  'clsx': '^2.1.1',
  'drizzle-orm': '^0.45.2',
  'framer-motion': '^12.23.24',
  'lucide-react': '^0.545.0',
  'react': '19.1.0',
  'react-dom': '19.1.0',
  'tailwind-merge': '^3.3.1',
  'tailwindcss': '^4.1.14',
  'tsx': '^4.21.0',
  'vite': '^7.3.2',
  'wouter': '^3.3.5',
  'zod': '^3.25.76'
};

if (pkg.devDependencies) {
  for (const [dep, version] of Object.entries(pkg.devDependencies)) {
    if (version === 'catalog:') {
      pkg.devDependencies[dep] = catalog[dep] || 'latest';
    }
  }
  delete pkg.devDependencies['@workspace/api-client-react'];
}

if (pkg.dependencies) {
  for (const [dep, version] of Object.entries(pkg.dependencies)) {
    if (version === 'catalog:') {
      pkg.dependencies[dep] = catalog[dep] || 'latest';
    }
  }
}

// Rename package
pkg.name = "minecraft-website";

// Fix port in scripts
pkg.scripts.dev = "vite --config vite.config.ts --host 0.0.0.0 --port 32549";
pkg.scripts.serve = "vite preview --config vite.config.ts --host 0.0.0.0 --port 43901";

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log('package.json updated');
