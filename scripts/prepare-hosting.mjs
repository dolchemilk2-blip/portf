import { cp, mkdir, readFile, readdir } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'dist');
const sites = ['couple', 'zoo', 'montage', 'azerbaycan', 'niti'];
const extensions = new Set(['.html', '.css', '.js', '.mjs', '.json', '.png', '.svg', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.ico', '.woff', '.woff2', '.mp3', '.wav', '.ogg', '.mp4', '.webm']);
await mkdir(output, { recursive: true });
await cp(join(root, 'index.html'), join(output, 'index.html'));
let count = 1;
async function copyTree(source, destination) {
  await mkdir(destination, { recursive: true });
  for (const entry of await readdir(source, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const from = join(source, entry.name);
    const to = join(destination, entry.name);
    if (entry.isDirectory()) await copyTree(from, to);
    else if (entry.isFile() && extensions.has(extname(entry.name).toLowerCase())) {
      await cp(from, to);
      count++;
    }
  }
}
for (const site of sites) {
  await readFile(join(root, site, 'index.html'));
  await copyTree(join(root, site), join(output, site));
}
console.log(`Prepared ${sites.length} demos and portfolio index, ${count} files in dist/`);