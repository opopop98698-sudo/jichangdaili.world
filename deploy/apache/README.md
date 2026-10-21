# Apache 生产静态部署与运维说明

> **当前部署状态**: 本地构建与配置文件已就绪，生产服务器行为待授权部署验证。

---

## 1. 部署架构说明
本项目为纯静态构建产物（Static Site Generation）。
1. 在本地或 CI/CD 流水线中执行 `npm run build`。
2. 构建生成的最终静态目录位于 `site/.vitepress/dist`。
3. 仅需将 `dist` 目录内的所有文件（HTML, CSS, JS, Sitemap, Assets 等）上传至 Apache 服务器的 `DocumentRoot`。
4. 严禁将源码工程（`node_modules`, `scripts`, `editorial`, `data` 等）上传至公共根目录。

---

## 2. Apache 必要模块核验
确保生产 Apache 服务器已启用以下模块：
```bash
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod dir
sudo a2enmod expires
sudo a2enmod deflate
sudo a2enmod ssl
sudo systemctl restart apache2
```

---

## 3. 验收关键指标
- **深层 URL 直接刷新**：例如直接访问 `https://jichangdaili.world/clients/windows/`，Apache 必须通过 `mod_dir` 与 `DirectoryIndex` 正确读取该目录下的 `index.html`，绝不报 404。
- **真实 404 响应**：请求不存在的路由（如 `https://jichangdaili.world/non-existent-page/`）必须返回真实的 `HTTP/1.1 404 Not Found` 状态码及 `404.html`，绝不回退至首页 200。
- **缓存策略**：HTML 页面采用 `no-cache, must-revalidate`；带 hash 静态资源采用 1 年长缓存。
