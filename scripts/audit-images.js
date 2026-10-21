import fs from 'node:fs';
import path from 'node:path';

const distDir = 'site/.vitepress/dist';
const images = [];

function check(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) check(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) {
      const html = fs.readFileSync(full, 'utf8');
      const imgTags = html.matchAll(/<img\s+[^>]*>/gi);
      for (const t of imgTags) {
        images.push({
          page: path.relative(distDir, full).replace(/\\/g, '/'),
          tag: t[0],
          hasWidth: /width=/i.test(t[0]),
          hasHeight: /height=/i.test(t[0]),
          hasLazy: /loading="lazy"/i.test(t[0]),
          hasAlt: /alt=/i.test(t[0])
        });
      }
    }
  }
}
check(distDir);

console.log('Total img tags rendered across all HTML pages:', images.length);
const missingAlt = images.filter(i => !i.hasAlt);
const missingLazy = images.filter(i => !i.hasLazy);
const missingDimensions = images.filter(i => !i.hasWidth || !i.hasHeight);

console.log('Images missing alt attribute:', missingAlt.length);
console.log('Images missing loading="lazy":', missingLazy.length);
console.log('Images missing width or height (CLS risk):', missingDimensions.length);
if (images.length > 0) {
  console.log('Sample image tag:', images[0].tag);
}
