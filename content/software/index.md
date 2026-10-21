---
title: "代理客户端官方软件档案库：源码鉴真、内核对照与协议支持矩阵"
description: "机场代理官方软件档案库。收录 Clash Verge Rev、v2rayN、Shadowrocket、Hiddify、Karing、OpenClash、Nikki 等 2026 全平台主流代理工具的官方发布源、开源许可证、底层核心、协议支持与安全警示。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# 代理客户端官方软件档案库

<Breadcrumbs :crumbs="[{ title: '客户端下载', url: '/clients/' }, { title: '软件档案库', url: '/software/' }]" />

<AnswerFirst 
  conclusion="本档案库是机场代理 (jichangdaili.world) 建立的客观软件事实注册中心。所有入库客户端均经过官方代码仓库鉴真、开源许可证核实与底层协议支持复测。我们对存在停更、安全劫持风险（如 NekoBox 假包）或严格系统依赖（如 Nikki 必须依赖 OpenWrt 24.10+）的软件进行客观标注，严禁任何形式的恶意加壳与二次捆绑。"
  scope="全平台代理客户端 · 开源与合规商用软件技术档案"
  verdict="认准官方发布源，下载前必查架构与数字签名。"
/>

---

## 1. 核心客户端技术档案索引

### 桌面主力客户端 (Windows / macOS / Linux)
- [Clash Verge Rev 官方档案](/software/clash-verge-rev/)：Tauri 架构、Mihomo 核心、原版 CFW 首选替代品。
- [v2rayN 官方档案](/software/v2rayn/)：.NET 8 开发、Xray/sing-box 多核心切换、批量节点管理标杆。
- [FlClash 官方档案](/software/flclash/)：Flutter 跨平台轻量界面、多端配置统一、资源占用极低。
- [Clash Nyanpasu 官方档案](/software/clash-nyanpasu/)：Tauri 框架、多核心支持、强大自定义扩展插件生态。
- [Hiddify 官方档案](/software/hiddify/)：基于 sing-box 核心、原生支持 20+ 种代理协议、全平台自动优选。
- [Karing 官方档案](/software/karing/)：全平台 sing-box 客户端、自动解析多种复杂订阅格式。
- [Clash Mi 官方档案](/software/clash-mi/)：Mihomo 内核轻量跨平台客户端、原生 Clash YAML 规则解析。

### 移动端主力客户端 (Android / iOS)
- [Shadowrocket (小火箭) 官方档案](/software/shadowrocket/)：iOS 最经典高性价比规则代理工具、自研高效引擎。
- [v2rayNG 官方档案](/software/v2rayng/)：Android 平台开源标杆、Xray 核心、分应用代理与省电优化。
- [Stash 官方档案](/software/stash/)：苹果生态（iOS / Mac）首选 Clash 兼容客户端、策略组与覆写支持完备。
- [Quantumult X 官方档案](/software/quantumult-x/)：iOS 进阶极客工具、JavaScript 重写与极致网络吞吐。
- [Surge 官方档案](/software/surge/)：苹果平台工业级网络调试与规则分流天花板。

### 路由器与网关客户端 (OpenWrt / Linux 网关)
- [OpenClash 官方档案](/software/openclash/)：OpenWrt 社区功能最强大的 Mihomo 路由插件、Fake-IP 规则分流统治者。
- [Nikki 官方档案](/software/nikki/)：专为 OpenWrt 24.10+ 原生 nftables 打造的现代化轻量代理插件。
- [PassWall2 官方档案](/software/passwall2/)：多核心灵活切换、精细访问控制黑白名单。
- [v2rayA 官方档案](/software/v2raya/)：基于 Web UI 控制台的 Linux/服务器全局透明代理工具。
- [sing-box 官方档案](/software/sing-box/)：新一代通用代理核心与全平台原生客户端参考实现。

---

## 2. 软件档案收录底线与安全准则

1. **唯一官方源原则**：所有开源软件必须能溯源至开发者本人维护的 GitHub / GitLab 官方 Releases；
2. **拒绝加壳分发**：本站绝不提供任何经过第三方二次编译、去除原作者信息、注入推广链接或加壳免杀处理的安装文件；
3. **安全风险公开**：对于已被第三方恶意注册或劫持的应用商店条目（如 NekoBox Google Play 版本），进行无死角的高警示拦截标注。
