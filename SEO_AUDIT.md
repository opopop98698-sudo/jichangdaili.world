# SEO、GEO 与 AEO 架构审计报告 (SEO_AUDIT.md)

> **规范主域名**: `https://jichangdaili.world`  
> **更新时间**: 2026-10-21  
> **执行状态**: 自动化构建注入已全量通过

---

## 1. 基础 SEO 规范审计项

| 审计项目 | 执行策略 | 自动化检查结果 |
| :--- | :--- | :--- |
| **Self-Canonical 规范** | 每页动态注入自身规范 URL，一律强制带尾斜杠 `/`，杜绝 `.html` 与无斜杠双重版本 | **PASS**: 由 `transformPageData` 动态计算注入 |
| **Title 与 H1 语义** | 首页与各二级专题独立设置，前缀突出核心任务，后缀统一附加 `｜机场代理 jichangdaili.world` | **PASS**: 标题精确无重复 |
| **Description 元数据** | 每页具备 80~150 字符的独立技术摘要，明确问题与预期答案 | **PASS**: `check:content` 脚本强校验 |
| **自动 Sitemap 生成** | VitePress 原生集成 `sitemap: { hostname: 'https://jichangdaili.world' }` | **PASS**: 仅收录发布白名单 HTML，自动剔除 404 与草稿 |
| **Robots.txt 规范** | 正式生产环境允许全量索引，明确指向 sitemap.xml | **PASS**: 已就绪 |

---

## 2. 结构化数据 (JSON-LD) 注入规范

在 `site/.vitepress/config.mts` 的 `transformPageData` 构建生命周期中，全站已实现 JSON-LD 的自动化注入：

### 2.1 首页 WebSite 架构
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "机场代理",
  "url": "https://jichangdaili.world/",
  "description": "专业且客观的代理客户端下载、安装教程、订阅配置、故障排查、客户端评测及兼容机场选型指南。",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://jichangdaili.world/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### 2.2 技术文档 TechArticle 架构
所有栏目主页与详情文章均注入 Schema.org `TechArticle`：
- `headline`: 页面标题
- `description`: 针对具体故障或配置的直接摘要
- `inLanguage`: `zh-CN`
- `publisher`: `机场代理 (jichangdaili.world)`

---

## 3. GEO 与 AEO（AI 搜索引擎）优化落地
针对 ChatGPT Search、Perplexity、Google AI Overviews 的问答优化：
1. **直接结论前置 (Answer First)**：每个正式页面首屏均使用 `<AnswerFirst />` 组件，在 200 字内给出直接判断、适用版本、排除条件与核心结论。
2. **决策树与可逆验证**：排障与配置页面使用 `<ErrorDecisionTree />` 与 `<SetupSteps />`，提供明确的输入、执行动作与预期成功指标，便于 AI 解析结构化逻辑。
3. **实体与参数统一口径**：准确使用软件官方名称（如 `Clash Verge Rev` 而非泛称“新版小猫咪”），所有指标均注明单位（如 `128 MB`、`2.4 ms`、`1.0x`），杜绝模糊歧义。
