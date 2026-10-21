import fs from 'node:fs';
import path from 'node:path';

const registry = JSON.parse(fs.readFileSync('data/CONTENT_REGISTRY.json', 'utf8'));
const articles = Object.values(registry).filter(i => i.type === 'article' || i.level === 3);

const sample10 = [
  articles[0],
  articles[50],
  articles[100],
  articles[150],
  articles[200],
  articles[250],
  articles[300],
  articles[350],
  articles[400],
  articles[450]
];

const samples = [];
for (const a of sample10) {
  const filePath = path.join('content', a.sectionId, a.slug, 'index.md');
  if (fs.existsSync(filePath)) {
    const text = fs.readFileSync(filePath, 'utf8');
    const paras = text.split('\n\n')
      .map(p => p.trim())
      .filter(p => p.length > 60 && !p.startsWith('#') && !p.startsWith('---') && !p.startsWith('<') && !p.startsWith('|') && !p.startsWith('`'));
    samples.push({
      id: a.id,
      title: a.title,
      url: a.url,
      filePath,
      paragraphs: paras.slice(0, 3)
    });
  }
}

console.log('Extracted 10 sample articles with paragraphs:');
samples.forEach((s, i) => {
  console.log(`\n[${i+1}] ${s.title} (${s.url})`);
  s.paragraphs.forEach((p, pi) => {
    console.log(`  P${pi+1}: ${p.substring(0, 80)}...`);
  });
});
