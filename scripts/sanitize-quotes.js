import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.resolve(__dirname, '..', 'content');

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (full.endsWith('.md')) {
      let text = fs.readFileSync(full, 'utf8');
      if (text.includes('\\"')) {
        console.log('Found escaped quote in:', full);
        text = text.replace(/\\"/g, "'");
        fs.writeFileSync(full, text, 'utf8');
        console.log('Cleaned:', full);
      }
    }
  }
}

walk(contentDir);
console.log('Quote sanitization finished.');
