<div align="center">

<img src="site/public/logo.png" alt="机场代理 Logo" width="96" height="96" />

# 机场代理 · jichangdaili.world

> **专为网络协议审计、客户端官方生态分发、晚高峰真实基准压测与客观选型打造的技术百科与知识图谱**

[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-646CFF?style=for-the-badge&logo=vitepress&logoColor=white)](https://vitepress.dev/)
[![Vue 3](https://img.shields.io/badge/Vue-3.5.13-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SEO Health Score](https://img.shields.io/badge/SEO%20Health-98.5%20%2F%20A%2B-brightgreen?style=for-the-badge&logo=google)](https://jichangdaili.world/)
[![Tests](https://img.shields.io/badge/Automated%20Tests-15%20%2F%2015%20Passing-success?style=for-the-badge&logo=github-actions)](https://jichangdaili.world/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](./LICENSE)

[🌐 访问官方站点](https://jichangdaili.world/) · [📖 评测方法论](https://jichangdaili.world/reviews/methodology/) · [📋 品牌档案库](https://jichangdaili.world/brands/) · [🛡️ 推广披露声明](https://jichangdaili.world/disclosure/)

</div>

---

## 🌟 项目核心理念

本项目严格恪守工程中立与证据溯源原则，彻底告别传统导航站的刷榜与带壳推广模式：

1. **🛠️ 工具先行，分流解耦**：阅读所有官方客户端下载、多平台安装与故障排障指南**无需购买任何商业服务**。绝不将返利推广链接伪装为客户端下载源。
2. **📊 客观实测，晚高峰证据留痕**：基于晚高峰多运营商宽带（电信/联通/移动）实机抓包与多倍率带宽压测；未核验服务商保持数据缺失，杜绝凭空捏造虚假推荐。
3. **🛡️ 商业透明与合规风控**：全站所有商业返利链接 100% 显式标注 `rel="sponsored nofollow noopener"`，严格执行 FTC 与 Google Webmaster 推广披露规范。
4. **🕸️ 729 节点深层拓扑网**：拥有 8 大顶级栏目、80 个技术专题、160 个核心集群与 480 篇深度长文，形成零孤岛的高转化内链网络。

---

## 🧭 固定顶级栏目架构

站点主导航固定为 9 大核心业务板块，层级逻辑严密递进：

```
[首页] (/)
  ├── [1. 机场推荐] (/recommend/)       ── 测速长图横评、42家价格大百科、不同场景选型
  ├── [2. 免费机场] (/free/)            ── 公益节点寿命、试用防坑、配额限制与安全红线
  ├── [3. 客户端下载] (/clients/)        ── Clash Verge Rev / sing-box / v2rayN 等官方直链
  ├── [4. 安装教程] (/install/)          ── 全平台安装步骤、依赖库配置、系统权限与卸载回退
  ├── [5. 订阅配置] (/subscription/)     ── 订阅链接导入、YAML语法定制、分流规则集与TUN模式
  ├── [6. 故障排查] (/troubleshooting/)  ── 启动崩溃、节点超时-1、DNS污染、分流冲突决策树
  ├── [7. 客户端评测] (/reviews/)        ── 内存开销、连接延迟、DNS泄漏同条件横向基准实测
  └── [8. 新手课堂] (/learn/)            ── 核心/客户端/机场边界、协议演进史、网络常识
```

---

## ⚡ 技术栈与架构亮点

| 领域 | 选型与方案 | 技术收益 |
| :--- | :--- | :--- |
| **静态生成引擎** | **VitePress 1.6.4 (SSG)** | 纯静态预渲染 HTML，首屏毫秒级加载，完全免疫 SPA 爬虫抓取损耗 |
| **类型系统** | **TypeScript 5.7+** | 严谨约束 729 节点注册表、客户端档案、兼容性矩阵与实测证据数据模型 |
| **文档组件库** | **Vue 3 SFC (15 个定制组件)** | 封装结论前置卡、决策树、兼容性表格、作者签名卡、安全下载条等富交互组件 |
| **搜索引擎优化** | **全栈原生 SEO / GEO / AEO** | 自动生成 759 URL 的标准 XML Sitemap、多爬虫 Robots.txt、BreadcrumbList 与 JSON-LD Schema |
| **链接合规引擎** | **Markdown AST Renderer Hook** | 自动拦截全站外链，对返利合作目标全局强制注入 `rel="sponsored nofollow noopener"` |
| **质量安全巡检** | **全自动化 Node.js 检查流水线** | 包含 15 项集成测试、内容元数据校验、死链拓扑遍历与零凭证泄露扫描 |

---

## 🧩 专属 Vue 文档组件生态

本站内置一套专为技术文档与选型评测打造的 Vue 3 组件库（位于 `site/.vitepress/theme/components/`）：

- `<AnswerFirst />`：直接结论前置卡片，提供明确答案、适用范围与核心判断。
- `<ClientIdentityCard />`：客户端软件官方档案卡，展示核心、许可证、系统架构与官方直链。
- `<VerifiedDownloadLink />`：官方核验安全下载条，附带 SHA256 校验提示。
- `<VersionScope />`：版本范围声明卡，注明基准测试系统版本与已知不兼容项。
- `<CompatibilityTable />`：响应式客户端兼容性全览表格（原生支持移动端横向滑动）。
- `<SetupSteps />`：逐步安装教程卡片，附带成功标志与可逆回退方案。
- `<ErrorDecisionTree />`：结构化故障排查分支决策树（YES/NO 路径引导）。
- `<AuthorByline />`：E-E-A-T 专家审核凭据卡，展示审核组背景、复查日期与方法论入口。
- `<SourceList />`：官方来源与参考文档溯源列表。
- `<FAQSection />`：聚焦高频问题手风琴组件。
- `<RelatedTasks />`：蜂巢任务互联卡片（下载 $\rightarrow$ 安装 $\rightarrow$ 配置 $\rightarrow$ 排障闭环）。
- `<ServicePlanCard />`：规范服务套餐卡片（严谨标注币种、倍率与审核关系）。
- `<Disclosure />`：商业中立与利益冲突透明声明。
- `<Breadcrumbs />`：真实语义面包屑导航。
- `<CouponBadge />`：折扣与优惠码标识徽章。

---

## 📂 完整工程目录结构

```text
jichangdaili.world/
├── PROJECT_CONTRACT.md         # 项目核心契约 (单真实数据源，锁定导航与定位)
├── content/                    # Markdown 正文源文件 (760 篇专业技术文档)
│   ├── recommend/              # 机场推荐与深度横评指南
│   ├── free/                   # 免费与试用资源核验
│   ├── clients/                # 全平台客户端官方发布渠道
│   ├── install/                # 全平台客户端安装教程
│   ├── subscription/           # 订阅配置与高级规则分流
│   ├── troubleshooting/        # 故障排查修复决策树
│   ├── reviews/                # 客户端客观基准横评
│   ├── learn/                  # 新手课堂与原理解析
│   ├── brands/                 # 服务商品牌档案库与核验名录
│   ├── about/                  # 关于技术团队与使命
│   ├── disclosure/             # 商业推广透明披露声明
│   ├── privacy/                # 隐私政策与数据准则
│   └── terms/                  # 服务条款与法律合规边界
├── data/                       # 核心数据驱动模型
│   ├── CONTENT_REGISTRY.json   # 729 节点完整注册表与元数据
│   ├── CONTENT_GRAPH.json      # 节点拓扑关系图谱
│   ├── software.json           # 客户端软件技术档案
│   ├── compatibility.json      # 客户端跨平台兼容性矩阵
│   ├── evidence.json           # 基准实测证据留痕
│   ├── brands.json             # 服务商审核与 dataStatus 归档
│   ├── plans.json              # 服务套餐模型
│   └── verification.json       # 搜索引擎站长平台验证预留配置
├── scripts/                    # 自动化流水线工具库
│   ├── prepare-content.js      # 内容发布白名单同步 (content -> site/generated)
│   ├── check-content.js        # 元数据与标题唯一性检查
│   ├── check-links.js          # 超链接与死链审计
│   ├── check-secrets.js        # 凭据与敏感泄露扫描
│   ├── run-tests.js            # 自动化单元测试套件 (15/15)
│   ├── generate-sitemap.js     # 生产 XML Sitemap 生成器
│   ├── audit-seo.js            # 全站 SEO 预防性健康检查审计
│   └── verify-seo-infrastructure.js # 上线前基础设施验收脚本
├── site/                       # VitePress 站点核心源码
│   ├── .vitepress/
│   │   ├── config.mts          # 站点全局配置、导航、SEO Head、JSON-LD
│   │   └── theme/              # 扩展默认主题，全局注册 Vue 组件与插槽
│   └── public/                 # 站点公共静态资产 (logo, robots.txt 等)
├── public-assets/              # 生产静态资源同步源
│   └── robots.txt              # 搜索引擎爬虫抓取规则
└── deploy/                     # 生产部署配置
    └── apache/                 # Apache VirtualHost & .htaccess 生产示例
```

---

## 🚀 本地开发与构建运维

### 1. 环境准备
确保本地安装了 Node.js（推荐 `v20+` 或 `v22+`）：
```bash
node -v
npm -v
```

### 2. 安装项目依赖
```bash
npm install
```

### 3. 启动本地开发服务器
```bash
npm run dev
# 本地热重载预览地址: http://localhost:5173/
```

### 4. 运行全项质量与测试流水线
```bash
# 运行单元与拓扑完整性自动化测试 (15/15)
npm test

# 运行全链路代码与安全审计 (白名单校验、元数据检查、死链排查、敏感词扫描)
npm run check:all

# TypeScript 语法与类型校验
npm run typecheck
```

### 5. 执行真实生产构建
```bash
npm run build
```
> 构建流程将自动执行：内容同步 $\rightarrow$ 质量审计 $\rightarrow$ 死链检查 $\rightarrow$ 安全扫描 $\rightarrow$ VitePress 静态编译 $\rightarrow$ 生成 `sitemap.xml`，最终静态产物输出至 `site/.vitepress/dist` 并镜像同步至 `dist/`。

### 6. 本地预览生产构建产物
```bash
npm run preview
# 生产环境预览服务: http://localhost:4173/
```

---

## 🔍 SEO & 搜索引擎支持概况

- **正式主域名**：`https://jichangdaili.world/`
- **Sitemap 地址**：`https://jichangdaili.world/sitemap.xml`（共收录 759 个精选规范 URL）
- **搜索引擎爬虫支持**：
  - `Googlebot`：`Allow: /`
  - `Bingbot` / `bingbot`：`Allow: /`
  - `Baiduspider`：`Allow: /`
  - `yisouspider` / `YisouSpider`（神马/UC/夸克）：`Allow: /`
- **结构化数据 Schema**：
  - 首页：`WebSite` (含 SearchAction) + `Organization`
  - 核心栏目：`CollectionPage` + `BreadcrumbList`
  - 核心文章：`TechArticle` + `BreadcrumbList`
  - 关于与信誉：`AboutPage` + `BreadcrumbList`

---

## 📄 开源许可证

本项目源码基于 [MIT License](./LICENSE) 协议开源。文档及原创评测数据版权归 [机场代理 (jichangdaili.world)](https://jichangdaili.world/) 编辑团队所有。
