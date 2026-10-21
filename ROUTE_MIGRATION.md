# 路由迁移与规范映射策略 (ROUTE_MIGRATION.md)

> **当前状态**: 全新工程初始化 (Greenfield Setup)  
> **更新时间**: 2026-10-21

---

## 1. 现状审计说明
经过对工作区 `c:\Users\Pro User\Desktop\jichangdaili.world` 的文件系统与 Git 审计：
- 本项目为全新启动的 VitePress 静态工程，无遗留历史框架（无历史 WordPress、Hexo、Hugo、Astro 等遗留旧路径）。
- 未发现任何需保留的旧动态 URL，无历史损坏链接需要在此刻建立兼容重定向映射。

---

## 2. 规范 URL 与重定向规则设计

为了保障长期稳定与 SEO 权重聚合，全站统一遵循以下 URL 规范：

### 2.1 尾斜杠强制规则 (Trailing Slash Canonical)
1. **统一目录结构**: 所有文档使用 `index.md`，构建产物为 `index.html`。
2. **规范表现**:
   - 首页: `https://jichangdaili.world/`
   - 一级栏目: `https://jichangdaili.world/<section>/`
   - 二级专题: `https://jichangdaili.world/<section>/<topic>/`
   - 三级集群: `https://jichangdaili.world/<section>/<topic>/<cluster>/`
   - 文章详情: `https://jichangdaili.world/<section>/<slug>/`
   - 软件档案: `https://jichangdaili.world/software/<id>/`
   - 品牌档案: `https://jichangdaili.world/brands/<id>/`
3. **禁止形式**:
   - 严禁出现同名 `.html` 后缀（如 `/install/v2rayn.html`），若客户端请求带有 `.html`，由 Apache 规则 301 重定向至对应的尾斜杠目录形式。
   - 若客户端请求缺少尾斜杠（如 `/install/v2rayn`），由 Apache 目录索引机制或 Rewrite 规则 301 重定向至带斜杠形式 `/install/v2rayn/`。

### 2.2 404 与非软性回退
- 凡不存在的静态资源与路径，必须返回真实 **HTTP 404 Not Found** 状态码及专门设计的 404.html 页面。
- 严禁将所有 404 错误统一 Rewrite 至首页并返回 HTTP 200，杜绝 Soft 404 惩罚。

### 2.3 历史变更映射表 (动态维护)
若后续内容优化发生 URL 变更或文章合并，必须在此表登记源 URL 与目标 URL，并由发布脚本输出 Apache `RewriteRule` 或 `Redirect 301` 指令。

| 历史/源 URL | 目标 URL | 状态码 | 变更原因 | 生效日期 |
| :--- | :--- | :--- | :--- | :--- |
| *(目前无废弃路由)* | - | 301 | 初始创建阶段 | 2026-10-21 |
