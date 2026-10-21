# 机场代理 (jichangdaili.world)

> **官方域名**: `jichangdaili.world`  
> **项目定位**: 工具型代理流量先行（客户端下载、系统安装、订阅配置、按症状排障），再服务确有兼容机场需求的用户。  
> **技术栈**: VitePress + TypeScript + Vue 3 自定义组件 + Markdown + 本地/Algolia 搜索 + 自动 Sitemap + Apache 静态部署。

---

## 1. 核心项目约束与价值观

本项目严格遵循 [PROJECT_CONTRACT.md](./PROJECT_CONTRACT.md) 确立的开发契约：
1. **工具使用与服务购买分离**：阅读所有客户端下载、系统安装与排障教程无需先购买任何机场。绝不将推广链接伪装成软件下载。
2. **客观实测与商业透明**：未核验的商业服务保持数据缺失状态，严禁凭空捏造虚假推荐与虚假促销。所有推广属性链接显式注明 `rel="sponsored nofollow"`。
3. **固定顶级导航顺序**：
   - 首页 (`/`)
   - 机场推荐 (`/recommend/`)
   - 免费机场 (`/free/`)
   - 客户端下载 (`/clients/`)
   - 安装教程 (`/install/`)
   - 订阅配置 (`/subscription/`)
   - 故障排查 (`/troubleshooting/`)
   - 客户端评测 (`/reviews/`)
   - 新手课堂 (`/learn/`)

---

## 2. 工程目录结构

```text
jichangdaili.world/
├── PROJECT_CONTRACT.md         # 项目核心契约 (单真实数据源，锁定导航与定位)
├── ROUTE_MIGRATION.md          # 路由规范与 URL 映射规则
├── MISSING_DATA.md             # 外部依赖与待办凭据缺失跟踪清单
├── SEARCH_STATUS.md            # 站内搜索状态与 Algolia 对接报告
├── SEO_AUDIT.md                # 搜索引擎与 AI 问答 (AEO/GEO) 审计报告
├── QA_REPORT.md                # 自动化测试与质量验收记录
├── PROGRESS.json               # 节点状态动态统计 (已规划/已发布等)
├── RESUME.md                   # 断点续跑与上下文状态跟踪
├── EXECUTION_LOG.md            # 全阶段执行日志记录
├── ARTICLE_TITLES_480.csv      # 480 篇长文选题规划清单
├── URL_MAP.csv                 # 729 节点物理与逻辑路由映射
├── KEYWORD_OWNERSHIP.md        # 核心关键词所有权与唯一承接页
├── package.json                # 工程依赖与核心脚本
├── tsconfig.json               # TypeScript 配置文件
├── content/                    # Markdown 正文源文件 (支持 draft / published 状态)
├── editorial/                  # 729 个节点的编辑任务档案 (非公开构建内容)
├── data/                       # 结构化数据 (注册表、图谱、软件、服务、证据模型)
│   ├── CONTENT_REGISTRY.json   # 729 节点完整注册表
│   ├── CONTENT_GRAPH.json      # 节点拓扑关系图谱
│   ├── software.json           # 软件官方技术档案
│   ├── compatibility.json      # 客户端兼容性矩阵
│   ├── evidence.json           # 基准实测证据留痕
│   ├── brands.json             # 服务商审核档案
│   └── plans.json              # 服务套餐模型
├── scripts/                    # 自动化流水线脚本
│   ├── plan-content.js         # 规划 729 节点与任务生成
│   ├── prepare-content.js      # 发布白名单同步 (幂等清理并构建 generated)
│   ├── check-content.js        # 元数据与标题唯一性检查
│   ├── check-links.js          # 超链接与死链审计
│   ├── check-secrets.js        # 凭据与敏感泄露扫描
│   ├── run-tests.js            # 单元与拓扑测试
│   ├── generate-sitemap.js     # 生产 XML Sitemap 生成器
│   └── check-all.js            # 全项质量检查统一调度
├── site/                       # VitePress 站点核心
│   ├── .vitepress/
│   │   ├── config.mts          # 站点配置、9项导航、侧边栏、SEO、JSON-LD
│   │   └── theme/              # 扩展默认主题，全局注册 14 个专用 Vue 组件
│   ├── env.d.ts                # TypeScript 模块声明
│   └── generated/              # 发布脚本生成的编译源码 (VitePress srcDir)
├── deploy/                     # 部署配置文件
│   └── apache/
│       ├── .htaccess           # 规范尾斜杠、真实 404、HTML 协商缓存
│       ├── jichangdaili.world.conf # Apache VirtualHost 生产示例
│       └── README.md           # 生产部署实操说明
└── public-assets/              # 静态资源 (robots.txt, favicon 等)
```

---

## 3. 快速启动与核心命令

本项目已封装全套自动化构建流水线，严禁使用空脚本或假测试：

```bash
# 1. 安装项目依赖
npm install

# 2. 启动本地开发热重载服务器
npm run dev

# 3. 运行完整自动化测试套件 (包含 729 节点拓扑与数据完整性)
npm test

# 4. 运行全项质量与安全流水线 (准备白名单、元数据审计、死链检查、敏感扫描)
npm run check:all

# 5. TypeScript 类型严格检查
npm run typecheck

# 6. 执行真实生产构建 (输出静态产物并生成 sitemap.xml)
npm run build

# 7. 本地预览生产构建产物
npm run preview
```

---

## 4. 专属 Vue 组件库说明

本站实现并实际应用了 14 个专业文档组件（位于 `site/.vitepress/theme/components/`）：
- `<AnswerFirst />`: 直接结论前置卡片，提供明确答案、适用范围与核心判断。
- `<ClientIdentityCard />`: 客户端软件官方档案卡，展示核心、许可证、系统架构与官方直链。
- `<VerifiedDownloadLink />`: 官方核验安全下载条，附带 SHA256 校验提示。
- `<VersionScope />`: 版本范围声明卡，注明基准测试系统版本与已知不兼容项。
- `<CompatibilityTable />`: 响应式客户端兼容性全览表格（原生支持移动端横向滑动）。
- `<SetupSteps />`: 逐步安装教程卡片，附带成功标志与可逆回退方案。
- `<ErrorDecisionTree />`: 结构化故障排查分支决策树（YES/NO 路径引导）。
- `<SourceList />`: 官方来源与参考文档溯源列表。
- `<FAQSection />`: 聚焦问答手风琴组件。
- `<RelatedTasks />`: 蜂巢任务互联卡片（下载 -> 安装 -> 配置 -> 排障）。
- `<ServicePlanCard />`: 规范服务套餐卡片（严谨标注币种、倍率与审核关系）。
- `<Disclosure />`: 商业中立与利益冲突透明声明。
- `<Breadcrumbs />`: 真实语义面包屑导航。
- `<PublishedContentIndex />`: 已发布长文索引展示卡片。

---

## 5. Apache 生产静态部署规范

构建完成后，将 `site/generated/.vitepress/dist` 目录内的所有文件复制至生产服务器的 Web 根目录即可。配合 `deploy/apache/.htaccess`，可实现：
- 任意深层 URL（如 `/install/verge-rev/`）直接刷新与打开正常访问。
- 不存在的路由严格返回 HTTP 404 状态码，绝不回退至首页 200。
- 强制主域名规范化与 HTTPS 301 重定向。
- HTML 文件采用协商缓存 (`no-cache, must-revalidate`)，静态资源采用 1 年不可变缓存。
