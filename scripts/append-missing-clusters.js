import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve('.');
const registryFile = path.join(rootDir, 'data', 'CONTENT_REGISTRY.json');
const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));

const topics = Object.values(registry).filter(i => i.type === 'topic' || i.level === 2);
console.log(`[append-missing-clusters] Checking ${topics.length} topics...`);

let modifiedTopics = 0;

for (const top of topics) {
  const filePath = path.join(rootDir, 'content', top.sectionId, top.topicId, 'index.md');
  if (!fs.existsSync(filePath)) continue;

  let text = fs.readFileSync(filePath, 'utf8');
  const clusters = Object.values(registry).filter(i => i.parentId === top.id);

  let missingSectionContent = '';

  for (const clus of clusters) {
    const cleanClusTitle = clus.title.split(' - ')[0].split('｜')[0].trim();
    const clusUrl = clus.url;
    const isClusLinked = text.includes(`](${clusUrl})`);

    const arts = Object.values(registry).filter(i => i.parentId === clus.id);
    const missingArts = arts.filter(a => !text.includes(`](${a.url})`));

    if (!isClusLinked || missingArts.length > 0) {
      missingSectionContent += `\n### 集群：[${cleanClusTitle}](${clusUrl})\n\n`;
      missingSectionContent += `${clus.description || `${cleanClusTitle}三级集群知识库，包含针对性配置规范与实操指引。`}\n\n`;
      missingSectionContent += `**核心研究与解决问题清单**：\n`;
      for (const art of arts) {
        missingSectionContent += `- [**${art.title}**](${art.url})：${art.description || art.title}\n`;
      }
      missingSectionContent += `\n`;
    }
  }

  if (missingSectionContent.trim().length > 0) {
    console.log(`Adding missing clusters to ${filePath}`);
    const insertion = `\n\n---\n\n## 专题技术集群与下属实操文档\n${missingSectionContent}`;
    
    // Insert before <RelatedTasks if exists, or append at the end
    if (text.includes('<RelatedTasks')) {
      text = text.replace('<RelatedTasks', `${insertion}\n<RelatedTasks`);
    } else {
      text += insertion;
    }

    fs.writeFileSync(filePath, text, 'utf8');
    modifiedTopics++;
  }
}

console.log(`[append-missing-clusters] Completed! Modified ${modifiedTopics} topic pages.`);
