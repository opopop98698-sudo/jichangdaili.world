import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve('.');
const registryFile = path.join(rootDir, 'data', 'CONTENT_REGISTRY.json');
const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));

let topicPages = [];
for (const [id, item] of Object.entries(registry)) {
  if (item.type === 'topic' || item.level === 2) {
    topicPages.push(item);
  }
}

console.log('Total Topic nodes:', topicPages.length);

let topicsMissingLinks = 0;
for (const t of topicPages) {
  const filePath = path.join(rootDir, 'content', t.sectionId, t.topicId, 'index.md');
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Check if it links to cluster or articles
    const links = [...content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map(m => m[2]);
    const internalLinks = links.filter(l => l.startsWith('/'));
    // Usually only breadcrumb links exist in frontmatter/component
    if (internalLinks.length <= 2) {
      topicsMissingLinks++;
    }
  }
}

console.log(`Topics missing body links to child clusters/articles: ${topicsMissingLinks} / ${topicPages.length}`);
