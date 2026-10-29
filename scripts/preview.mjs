import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const allowed = new Set(['index.html', 'couple', 'zoo', 'montage', 'azerbaycan', 'niti']);
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg', '.mp4': 'video/mp4' };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    if (!allowed.has(relative.split('/')[0]) || relative.split('/').some(p => p.startsWith('.'))) {
      res.writeHead(404).end(); return;
    }
    let path = resolve(root, relative);
    if (!path.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html');
    const body = await readFile(path);
    res.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(body);
  } catch { res.writeHead(404).end('Not found'); }
});
server.listen(48137, '127.0.0.1', () => console.log('Portfolio preview: http://127.0.0.1:48137'));