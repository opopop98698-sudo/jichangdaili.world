import fs from 'node:fs';
import path from 'node:path';

const distDir = 'site/.vitepress/dist';
const mixedContent = [];

function check(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) check(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) {
      const html = fs.readFileSync(full, 'utf8');
      // match src="http://..." or href="http://...css"
      const matches = html.matchAll(/(src|href)="http:\/\/[^"]+"/gi);
      for (const m of matches) {
        // filter out external text links
        if (m[0].includes('.js') || m[0].includes('.css') || m[0].includes('.png') || m[0].includes('.jpg') || m[0].includes('.woff')) {
          mixedContent.push({ file: path.relative(distDir, full).replace(/\\/g, '/'), match: m[0] });
        }
      }
    }
  }
}
check(distDir);

console.log('Mixed content resource references (HTTP images/js/css):', mixedContent.length);
if (mixedContent.length > 0) console.log('Sample:', mixedContent.slice(0, 3));
