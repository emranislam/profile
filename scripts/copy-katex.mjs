// Copies the KaTeX style sheet and fonts (math in quiz questions) into assets/katex/.
// Only the woff2 fonts are kept: every browser that can run the site reads them.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const from = path.join(root, 'node_modules', 'katex', 'dist');
const to = path.join(root, 'assets', 'katex');
fs.rmSync(to, { recursive: true, force: true });
fs.mkdirSync(path.join(to, 'fonts'), { recursive: true });

const css = fs
  .readFileSync(path.join(from, 'katex.min.css'), 'utf8')
  .replace(/src:url\(fonts\/([^)]+)\.woff2\) format\("woff2"\),url\([^)]*\) format\("woff"\),url\([^)]*\) format\("truetype"\)/g, 'src:url(fonts/$1.woff2) format("woff2")');
fs.writeFileSync(path.join(to, 'katex.min.css'), css);
fs.readdirSync(path.join(from, 'fonts'))
  .filter((f) => f.endsWith('.woff2'))
  .forEach((f) => fs.copyFileSync(path.join(from, 'fonts', f), path.join(to, 'fonts', f)));
