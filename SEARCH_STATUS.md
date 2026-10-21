# 站内搜索系统状态与接入报告 (SEARCH_STATUS.md)

> **当前搜索 Provider**: `local` (VitePress MiniSearch 内置多语言分词搜索)  
> **生产目标 Provider**: `algolia` (Algolia DocSearch 生产级分布式索引)  
> **状态核验日期**: 2026-10-21

---

## 1. 搜索架构与当前实施状态

| 属性 | 当前状态 | 说明 |
| :--- | :--- | :--- |
| **激活 Provider** | **`local` (已完整激活且可用)** | 本地客户端即时分词索引，随构建自动打包，零外部凭据依赖，即刻可用 |
| **DocSearch 申请状态** | **待部署上线后正式提交** | Algolia DocSearch 资格要求网站必须公网可访问且包含技术文档，待正式上线后提交审核 |
| **本地多语言分词支持** | **支持简体中文、英文软件名与技术缩写** | 支持检索“Clash Verge Rev”、“v2rayN”、“7890 端口占用”、“Fake-IP”、“TUN 模式”等高频词 |
| **搜索范围过滤机制** | **仅收录已发布白名单内容** | 严格过滤 `draft` 草稿、`editorial/` 任务、私密日志及测试凭据，仅索引 `site/generated` 下的正式发布内容 |

---

## 2. Algolia DocSearch 凭据热切换机制

在 `site/.vitepress/config.mts` 中，已设计有自动化检测逻辑：
```typescript
const hasAlgolia = Boolean(
  process.env.VITE_ALGOLIA_APP_ID &&
  process.env.VITE_ALGOLIA_SEARCH_KEY &&
  process.env.VITE_ALGOLIA_INDEX_NAME
);
```
- 当环境变量中未检测到 Algolia 凭据时，系统**无缝降级**为 VitePress 原生本地搜索，确保前端搜索按钮始终具备真实的弹窗与检索功能，杜绝死按钮。
- 当 Algolia DocSearch 审核通过并在生产环境变量注入 `VITE_ALGOLIA_APP_ID`、`VITE_ALGOLIA_SEARCH_KEY` (Search-Only) 及 `VITE_ALGOLIA_INDEX_NAME` 后，构建脚本将自动切换为 Algolia 远程索引。

---

## 3. 本地索引测试用例与验证结论
经实际测试，以下中文搜索词与技术缩写在本地搜索中表现良好：
1. `订阅更新失败` -> 精确命中故障排查指南与状态码解析。
2. `Clash Verge Rev` -> 精确命中客户端下载、Windows 安装实操与软件档案。
3. `v2rayN` -> 命中 With-Core 选型与双核心切换。
4. `TUN` -> 命中虚拟网卡原理、路由表冲突与服务模式安装。
5. `7890` -> 命中端口占用诊断树与 PowerShell 强制结束 PID。
