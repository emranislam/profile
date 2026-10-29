// Writes one static HTML page per site address (so search engines can index each page),
// plus sitemap.xml, robots.txt and 404.html. Run by `npm run build`; the output is committed.
//
//   /index.html, /hsc-bangla/index.html, /hsc-bangla/paper1/p1-ch1/index.html, ...
//
// Every page is the same app (assets/app.js) with its own title, description, links and text
// in the HTML. The app takes over when it loads.
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const cache = path.join(root, 'node_modules', '.cache');
fs.mkdirSync(cache, { recursive: true });
const bundled = path.join(cache, 'site-routes.mjs');

await build({
  stdin: { contents: "export { listRoutes, SITE_ORIGIN } from './src/App.jsx';", resolveDir: root, loader: 'js' },
  bundle: true,
  platform: 'node',
  format: 'esm',
  jsx: 'automatic',
  loader: { '.css': 'empty' },
  define: { 'process.env.NODE_ENV': '"production"' },
  outfile: bundled,
  logLevel: 'error'
});
const { listRoutes, SITE_ORIGIN } = await import(pathToFileURL(bundled).href + `?t=${Date.now()}`);

const template = fs.readFileSync(path.join(root, 'src', 'page-template.html'), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const link = (l) => `<a style="color:#5eead4" href="${esc(l.path)}">${esc(l.label)}</a>`;

const routes = listRoutes();
const byPath = new Map(routes.map((r) => [r.path, r]));
const mainLinks = [
  { path: '/hsc-bangla/', label: 'HSC উচ্চতর গণিত (বাংলা ভার্সন)' },
  { path: '/hsc-english/', label: 'HSC Higher Math (English Version)' },
  { path: '/o-a-level/', label: 'O / A-Level Mathematics' },
  { path: '/admission/', label: 'BUET, DU ও ভার্সিটি ভর্তি প্রস্তুতি' },
  { path: '/honours/', label: 'B.Sc. Honours Mathematics' },
  { path: '/private/', label: 'প্রাইভেট ব্যাচ ও ১-টু-১ সেশন' },
  { path: '/routine/', label: 'ক্লাস রুটিন' },
  { path: '/exams/', label: 'লাইভ এক্সাম' }
];

function fallback(r) {
  const crumbs = r.crumbs.length
    ? `<nav aria-label="breadcrumb" style="font-size:.85rem;margin-bottom:1rem">${[...r.crumbs, { path: r.path, label: r.heading }]
        .map((c, i, a) => (i === a.length - 1 ? esc(c.label) : link(c)))
        .join(' › ')}</nav>`
    : '';
  const kids = r.children.length ? `<ul>${r.children.map((c) => `<li>${link(c)}</li>`).join('')}</ul>` : '';
  return `
        <main style="max-width:48rem;margin:0 auto;padding:2rem 1rem;color:#e2e8f0;font-family:system-ui,sans-serif;line-height:1.6">
            ${crumbs}
            <h1 style="font-size:1.75rem;font-weight:800">${esc(r.heading)}</h1>
            <p>${esc(r.summary || r.description)}</p>
            ${kids}
            <nav aria-label="main"><ul>${mainLinks.map((l) => `<li>${link(l)}</li>`).join('')}</ul></nav>
            <noscript><p>এই সাইট দেখতে JavaScript চালু করুন।</p></noscript>
        </main>
    `;
}

function breadcrumbs(r) {
  if (!r.crumbs.length) return '';
  const items = [...r.crumbs, { path: r.path, label: r.heading }].map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.label,
    item: SITE_ORIGIN + c.path
  }));
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items })}</script>`;
}

function render(r, extra = {}) {
  return template
    .replace(/{{TITLE}}/g, () => esc(r.title))
    .replace(/{{DESCRIPTION}}/g, () => esc(r.description))
    .replace(/{{URL}}/g, () => SITE_ORIGIN + r.path)
    .replace('{{ROBOTS}}', r.index ? 'index, follow, max-image-preview:large' : 'noindex, nofollow')
    .replace('{{BREADCRUMBS}}', () => breadcrumbs(r))
    .replace('{{FALLBACK}}', () => fallback(r));
}

// Remove the folders written by an earlier run, then write everything again.
const folders = new Set(routes.map((r) => r.path.split('/')[1]).filter(Boolean));
folders.forEach((f) => fs.rmSync(path.join(root, f), { recursive: true, force: true }));

routes.forEach((r) => {
  const file = path.join(root, r.path === '/' ? '' : r.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, render(r));
});

// GitHub Pages serves this for an address that has no page of its own; the app still opens it.
fs.writeFileSync(
  path.join(root, '404.html'),
  render({
    path: '/',
    title: 'পেজটি পাওয়া যায়নি | Emran Islam',
    description: 'এই ঠিকানায় কোনো পেজ পাওয়া যায়নি।',
    heading: 'পেজটি পাওয়া যায়নি',
    summary: 'এই ঠিকানায় কোনো পেজ নেই। নিচের লিংক থেকে পছন্দের পেজে যান।',
    crumbs: [],
    children: [{ path: '/', label: 'হোমপেজ' }],
    index: false
  })
);

const today = new Date().toISOString().slice(0, 10);
const urls = routes.filter((r) => r.index);
fs.writeFileSync(
  path.join(root, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((r) => `  <url>\n    <loc>${SITE_ORIGIN}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${r.path === '/' ? '1.0' : r.path.split('/').filter(Boolean).length === 1 ? '0.8' : '0.6'}</priority>\n  </url>`)
      .join('\n') +
    `\n</urlset>\n`
);
fs.writeFileSync(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /docs/\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`);

console.log(`pages: ${routes.length} written, ${urls.length} in the sitemap`);
