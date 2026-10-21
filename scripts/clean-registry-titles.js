import fs from 'node:fs';
import path from 'node:path';

const registryFile = 'data/CONTENT_REGISTRY.json';
const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));

let regCleaned = 0;

for (const [id, item] of Object.entries(registry)) {
  if (item.title && item.title.includes('｜')) {
    // Strip trailing |... from title
    const clean = item.title.split('｜')[0].trim();
    if (clean !== item.title) {
      item.title = clean;
      regCleaned++;
    }
  }
}

fs.writeFileSync(registryFile, JSON.stringify(registry, null, 2), 'utf8');
console.log(`[clean-titles] Cleaned ${regCleaned} titles in CONTENT_REGISTRY.json`);

// Now clean frontmatter titles in content/
const contentDir = 'content';
let filesCleaned = 0;

function cleanDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) cleanDir(full);
    else if (entry.isFile() && entry.name.endsWith('.md')) {
      let content = fs.readFileSync(full, 'utf8');
      const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (fmMatch) {
        const fm = fmMatch[1];
        const titleMatch = fm.match(/^title:\s*["']?([^"'\r\n]+)["']?/m);
        if (titleMatch) {
          const rawTitle = titleMatch[1];
          if (rawTitle.includes('｜机场代理｜机场代理') || rawTitle.includes('｜机场推荐｜机场代理｜机场推荐')) {
            // Clean repeated suffix
            let newTitle = rawTitle.replace(/(｜[^｜\n\r]+)+$/g, '').trim();
            // If it became too bare, keep just title
            if (!newTitle) newTitle = rawTitle.split('｜')[0].trim();
            content = content.replace(`title: "${rawTitle}"`, `title: "${newTitle}"`);
            fs.writeFileSync(full, content, 'utf8');
            filesCleaned++;
          }
        }
      }
    }
  }
}
cleanDir(contentDir);
console.log(`[clean-titles] Cleaned frontmatter titles in ${filesCleaned} markdown files.`);
