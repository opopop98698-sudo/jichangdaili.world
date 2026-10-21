import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve('.');
const registryFile = path.join(rootDir, 'data', 'CONTENT_REGISTRY.json');
const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));

const topics = Object.values(registry).filter(i => i.type === 'topic' || i.level === 2);
console.log(`[fix-topic-links] Processing ${topics.length} Level-2 Topic pages...`);

let updatedCount = 0;

for (const top of topics) {
  const filePath = path.join(rootDir, 'content', top.sectionId, top.topicId, 'index.md');
  if (!fs.existsSync(filePath)) continue;

  let text = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const clusters = Object.values(registry).filter(i => i.parentId === top.id);
  const tasks = [];

  for (const clus of clusters) {
    const cleanClusTitle = clus.title.split(' - ')[0].split('｜')[0].trim();
    tasks.push({ title: `进入技术集群：${cleanClusTitle}`, url: clus.url });

    // Link cluster headings
    // Match ### 集群：...
    const clusHeadingRegex = new RegExp(`###\\s+集群[：:]\\s*(?:\\[[^\\]]+\\]\\([^)]+\\)|${escapeRegex(clus.title)}|${escapeRegex(cleanClusTitle)})`, 'g');
    if (clusHeadingRegex.test(text)) {
      text = text.replace(clusHeadingRegex, `### 集群：[${cleanClusTitle}](${clus.url})`);
      changed = true;
    }

    // Link child articles
    const arts = Object.values(registry).filter(i => i.parentId === clus.id);
    for (const art of arts) {
      tasks.push({ title: art.title, url: art.url });

      // Match - **Title**： or - **Title**:
      const artBulletRegex = new RegExp(`-\\s+\\*\\*${escapeRegex(art.title)}\\*\\*[：:]`, 'g');
      if (artBulletRegex.test(text)) {
        text = text.replace(artBulletRegex, `- [**${art.title}**](${art.url})：`);
        changed = true;
      }
    }
  }

  // If RelatedTasks not already present for cluster nav, add it before the end or in a dedicated section
  if (!text.includes('<RelatedTasks') && tasks.length > 0) {
    const tasksJson = JSON.stringify(tasks.slice(0, 8), null, 2).replace(/'/g, "&#39;");
    text += `\n\n---\n\n### 专题子技术集群与长文索引\n\n<RelatedTasks :tasks='${tasksJson}' />\n`;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, text, 'utf8');
    updatedCount++;
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

console.log(`[fix-topic-links] Successfully updated ${updatedCount} / ${topics.length} Topic pages with valid hyperlinked clusters & articles!`);
