import fs from 'node:fs';
import path from 'node:path';

const contentDir = 'content';
let filesUpdated = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.md')) {
      let content = fs.readFileSync(full, 'utf8');
      const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (fmMatch) {
        const fm = fmMatch[1];
        const titleMatch = fm.match(/^title:\s*["']?([^"'\r\n]+)["']?/m);
        if (titleMatch) {
          const raw = titleMatch[1];
          if (raw.includes('｜')) {
            const clean = raw.split('｜')[0].trim();
            if (clean && clean !== raw) {
              content = content.replace(`title: "${raw}"`, `title: "${clean}"`)
                               .replace(`title: '${raw}'`, `title: '${clean}'`)
                               .replace(`title: ${raw}`, `title: "${clean}"`);
              fs.writeFileSync(full, content, 'utf8');
              filesUpdated++;
            }
          }
        }
      }
    }
  }
}

walk(contentDir);
console.log(`[clean-all-fm-titles] Cleaned frontmatter titles in ${filesUpdated} markdown files.`);
