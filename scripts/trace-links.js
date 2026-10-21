import fs from 'node:fs';
import path from 'node:path';

const distDir = 'site/.vitepress/dist';
const topHtml = fs.readFileSync(path.join(distDir, 'recommend/universal/index.html'), 'utf8');
const topLinks = [...topHtml.matchAll(/href="(\/[^"#?]*)"/g)].map(m => m[1]);
console.log('Universal Topic internal links:');
console.log(topLinks.filter(l => l.startsWith('/recommend/')));
