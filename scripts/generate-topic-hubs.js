import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'content');

// Load registry
const registryFile = path.join(rootDir, 'data', 'CONTENT_REGISTRY.json');
const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));

const topicNodes = registry.filter(n => n.type === 'topic');
const clusterNodes = registry.filter(n => n.type === 'cluster');
const articleNodes = registry.filter(n => n.type === 'article');

const sectionTitles = {
  recommend: '机场推荐',
  free: '免费机场',
  clients: '客户端下载',
  install: '安装教程',
  subscription: '订阅配置',
  troubleshooting: '故障排查',
  reviews: '客户端评测',
  learn: '新手课堂'
};

console.log(`Generating/ensuring 80 Level-2 topic hubs in content/ ...`);

let createdCount = 0;
let preservedCount = 0;

topicNodes.forEach(topic => {
  const topicDir = path.join(contentDir, topic.sectionId, topic.topicId);
  const topicFile = path.join(topicDir, 'index.md');

  // If already exists with custom content, preserve it
  if (fs.existsSync(topicFile)) {
    preservedCount++;
    return;
  }

  fs.mkdirSync(topicDir, { recursive: true });

  // Find its 2 clusters
  const clusters = clusterNodes.filter(c => c.parentId === topic.id);
  
  let clusterSectionMd = '';
  clusters.forEach(c => {
    const articles = articleNodes.filter(a => a.parentId === c.id);
    clusterSectionMd += `\n### 集群：${c.title}\n\n`;
    clusterSectionMd += `${c.description}\n\n`;
    clusterSectionMd += `**核心研究与解决问题清单**：\n`;
    articles.forEach(art => {
      clusterSectionMd += `- **${art.title}**：${art.description}\n`;
    });
  });

  const secTitle = sectionTitles[topic.sectionId];

  const content = `---
title: "${topic.title}｜${secTitle}｜机场代理"
description: "${topic.title}二级专题全景指南：涵盖子集群架构、深度技术规范与选型评测。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# ${topic.title}

<Breadcrumbs :crumbs="[
  { title: '${secTitle}', url: '/${topic.sectionId}/' },
  { title: '${topic.title}', url: '/${topic.sectionId}/${topic.topicId}/' }
]" />

<AnswerFirst 
  conclusion="「${topic.title}」是${secTitle}栏目下的核心二级技术专题。本专题系统性收录该技术领域下的核心标准、操作流程、参数对照及常见误区，为工具使用者提供精准的实操参考。"
  scope="${secTitle} · ${topic.title}"
  verdict="遵循客观技术规范，按需选择对应的具体解决方案。"
/>

---

## 1. 专题架构与核心子集群

本专题下设两大核心技术集群，覆盖从基础核验到进阶运维的完整生命周期：
${clusterSectionMd}

---

## 2. 核心技术指标与选型规范

在处理「${topic.title}」相关任务时，必须严格遵守以下三项技术底线：
1. **真实可复查原则**：所有参数、协议支持与版本信息均需与官方代码仓库或正式文档对照。
2. **安全隔离原则**：私密凭据、个人订阅 Token 严禁明文暴露。
3. **可逆配置原则**：任何涉及系统网络、注册表或路由表的修改，必须预留明确的回退手段。

---

## 3. 关联栏目与下一步任务

<RelatedTasks 
  :tasks="[
    { title: '${secTitle}栏目总览', url: '/${topic.sectionId}/', taskType: 'learn', description: '返回当前一级栏目导航索引' },
    { title: '全平台客户端下载', url: '/clients/', taskType: 'download', description: '获取官方正规客户端安装包' },
    { title: '故障排查与修复决策树', url: '/troubleshooting/', taskType: 'troubleshooting', description: '遇到连接异常时查看可逆排查指南' }
  ]"
/>
`;

  fs.writeFileSync(topicFile, content, 'utf8');
  createdCount++;
});

console.log(`Generated ${createdCount} topic hubs, preserved ${preservedCount} existing topic hubs.`);
