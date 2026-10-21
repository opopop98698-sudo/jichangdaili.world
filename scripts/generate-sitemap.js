import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const sourceDist = fs.existsSync(path.join(rootDir, 'site', '.vitepress', 'dist'))
  ? path.join(rootDir, 'site', '.vitepress', 'dist')
  : path.join(rootDir, 'site', 'generated', '.vitepress', 'dist');
const targetDist = path.join(rootDir, 'dist');

console.log('[generate-sitemap] Generating XML sitemap from build artifacts ...');

if (!fs.existsSync(sourceDist)) {
  console.error('Error: build directory does not exist at ' + sourceDist + '. Run build first.');
  process.exit(1);
}

const urls = [];
const today = new Date().toISOString().split('T')[0];

function scanHtml(current) {
  const entries = fs.readdirSync(current, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(current, entry.name);
    if (entry.isDirectory()) {
      scanHtml(full);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const rel = path.relative(sourceDist, full).replace(/\\/g, '/');

      // Exclude 404.html
      if (rel === '404.html') continue;

      let canonicalPath = '';
      if (rel === 'index.html') {
        canonicalPath = '/';
      } else if (rel.endsWith('/index.html')) {
        canonicalPath = `/${rel.replace(/\/index\.html$/, '/')}`;
      } else {
        canonicalPath = `/${rel.replace(/\.html$/, '/')}`;
      }

      // Priority calculation
      let priority = '0.7';
      if (canonicalPath === '/') priority = '1.0';
      else if (canonicalPath.split('/').filter(Boolean).length === 1) priority = '0.9';
      else if (canonicalPath.split('/').filter(Boolean).length === 2) priority = '0.8';

      urls.push({
        loc: `https://jichangdaili.world${canonicalPath}`,
        lastmod: today,
        priority
      });
    }
  }
}

scanHtml(sourceDist);

urls.sort((a, b) => b.priority.localeCompare(a.priority) || a.loc.localeCompare(b.loc));

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const u of urls) {
  xml += `  <url>\n`;
  xml += `    <loc>${u.loc}</loc>\n`;
  xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>${u.priority}</priority>\n`;
  xml += `  </url>\n`;
}

xml += `</urlset>\n`;

const sitemapPath = path.join(sourceDist, 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log(`[generate-sitemap] Successfully generated sitemap.xml with ${urls.length} URLs at ${sitemapPath}`);

// Also synchronize the complete build to root dist/ for Apache deployment
console.log(`[generate-sitemap] Mirroring build output to ${targetDist} for Apache deployment ...`);
if (fs.existsSync(targetDist)) {
  fs.rmSync(targetDist, { recursive: true, force: true });
}
fs.cpSync(sourceDist, targetDist, { recursive: true });
console.log(`[generate-sitemap] Root dist/ mirrored successfully.`);
