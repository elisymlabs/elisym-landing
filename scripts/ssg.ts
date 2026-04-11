/**
 * Static Site Generation script.
 *
 * 1. Imports the server entry (entry-server.tsx)
 * 2. For each route, renders React to HTML string
 * 3. Injects into the built index.html template
 * 4. Writes individual HTML files (e.g. dist/about/index.html)
 *
 * Invoked as part of `npm run build` via `vite-node scripts/ssg.ts`
 * (runs after `vite build`). Not intended to be executed standalone.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { render, pages } from '../src/entry-server.js';
import { config } from '../src/config.js';

const distDir = join(import.meta.dirname, '../dist');
const template = readFileSync(join(distDir, 'index.html'), 'utf-8');
const routes = Object.keys(pages);

for (const route of routes) {
  const appHtml = render(route);

  const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const filePath =
    route === '/' ? join(distDir, 'index.html') : join(distDir, route.slice(1), 'index.html');

  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
  console.log(`SSG: ${route} -> ${filePath}`);
}

console.log(`SSG: Generated ${routes.length} page(s)`);

// Generate sitemap.xml
const today = new Date().toISOString().split('T')[0];
const sitemapEntries = routes
  .map(
    (route) =>
      `  <url>\n    <loc>${config.siteUrl}${route === '/' ? '/' : route}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n  </url>`,
  )
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
writeFileSync(join(distDir, 'sitemap.xml'), sitemap);
console.log(`SSG: Generated sitemap.xml with ${routes.length} URL(s)`);
