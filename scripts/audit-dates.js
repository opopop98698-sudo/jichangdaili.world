import fs from 'node:fs';
import path from 'node:path';

const contentDir = 'content';
const dates = [];

function check(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) check(full);
    else if (entry.isFile() && entry.name.endsWith('.md')) {
      const text = fs.readFileSync(full, 'utf8');
      const m1 = text.match(/publishedAt:\s*["']?([^"'\r\n]+)["']?/);
      const m2 = text.match(/modifiedAt:\s*["']?([^"'\r\n]+)["']?/);
      if (m1 || m2) {
        dates.push({ file: full, publishedAt: m1 ? m1[1] : null, modifiedAt: m2 ? m2[1] : null });
      }
    }
  }
}
check(contentDir);

console.log('Total Markdown files with dates:', dates.length);
const olderThan6Mo = dates.filter(d => {
  const dt = new Date(d.modifiedAt || d.publishedAt);
  const now = new Date('2026-10-21');
  return (now - dt) > (180 * 24 * 3600 * 1000);
});

console.log('Pages modified > 6 months ago:', olderThan6Mo.length);
if (dates.length > 0) {
  console.log('Sample dates:', dates.slice(0, 3).map(d => ({ file: path.basename(path.dirname(d.file)), pub: d.publishedAt, mod: d.modifiedAt })));
}
