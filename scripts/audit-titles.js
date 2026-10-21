import fs from 'node:fs';
import path from 'node:path';

const distDir = 'site/.vitepress/dist';
const titles = [];

function check(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) check(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) {
      const html = fs.readFileSync(full, 'utf8');
      const m = html.match(/<title>([^<]+)<\/title>/);
      if (m) {
        titles.push({ file: path.relative(distDir, full).replace(/\\/g, '/'), title: m[1] });
      }
    }
  }
}
check(distDir);

let repeatedSuffixCount = 0;
let overLongTitles = 0;

for (const t of titles) {
  if (t.title.includes('｜机场推荐｜机场代理｜机场推荐') || t.title.includes('｜机场代理｜机场代理')) {
    repeatedSuffixCount++;
  }
  if (t.title.length > 60) {
    overLongTitles++;
  }
}

console.log('Total HTML pages audited for titles:', titles.length);
console.log('Titles with duplicate/stacked brand suffixes:', repeatedSuffixCount);
console.log('Titles with length > 60 chars:', overLongTitles);
console.log('Sample stacked title:', titles.find(t => t.title.includes('｜机场代理｜机场代理'))?.title);
