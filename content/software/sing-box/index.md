---
title: "sing-box 官方软件档案：通用代理核心、SRS 规则集与全平台原生客户端"
description: "sing-box 官方技术档案。新一代跨平台通用网络代理核心，使用 Go 编写，性能极致，具备独创的 JSON 结构与规则集 (SRS) 二进制格式，覆盖 SFA、SFI、SFM 原生生态。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# sing-box 官方技术档案

<Breadcrumbs :crumbs="[
  { title: '客户端下载', url: '/clients/' },
  { title: '软件档案库', url: '/software/' },
  { title: 'sing-box' }
]" />

<AnswerFirst 
  conclusion="sing-box 是由 SagerNet 团队主导开发的革命性通用代理核心与全平台网络工具集。采用 Go 语言构建，性能与内存控制达到同类核心巅峰。它提出了极简现代的 JSON 配置模型与编译态的 SRS 二进制规则集，不仅作为底层核心驱动着 Hiddify、Karing 等客户端，官方亦推出了涵盖 Android (SFA)、iOS (SFI) 与 macOS (SFM) 的原生纯净客户端。"
  scope="全平台覆盖 (Linux / Windows / macOS / Android / iOS / FreeBSD) · 免费开源"
  verdict="现代协议演进先锋，资深开发者与极客玩家必修核心。"
/>

---

## 1. 软件核心技术参数

| 参数项 | 权威数据与核验标准 |
| :--- | :--- |
| **官方代码仓库** | [github.com/SagerNet/sing-box](https://github.com/SagerNet/sing-box) |
| **官方文档站** | [sing-box.sagernet.org](https://sing-box.sagernet.org) |
| **开源许可证** | GPL-3.0-or-later |
| **收费模式** | 完全免费开源 (Free and Open Source) |
| **核心特点** | 极致吞吐性能、SRS 二进制高效规则集、全平台通用 |
| **最新核验版本** | v1.10.1+ (2026-10-21 核验) |

---

## 2. 官方原生客户端矩阵

- **sing-box for Android (SFA)**：Google Play 与 GitHub 发布的原生安卓客户端；
- **sing-box for Apple Platforms (SFI / SFM)**：iOS / iPadOS (SFI) 与 macOS (SFM) 官方原生客户端；
- **CLI 命令行服务端**：支持 Windows、Linux、FreeBSD 的系统守护进程。

---

## 3. 全面协议原生支持

原生支持 20+ 种主流与前沿协议：Shadowsocks, VMess, VLESS (Reality), Trojan, Hysteria, Hysteria 2, TUIC v5, WireGuard, ShadowTLS, Tor, Direct, Block, DNS 专属出站等。

---

## 4. 相关教程与实操指引

<RelatedTasks 
  :tasks="[
    { title: 'sing-box 与 Hiddify 兼容机场选型', url: '/recommend/singbox/', taskType: 'recommend', description: '配置与核心条件适配' },
    { title: '全平台客户端下载总览', url: '/clients/', taskType: 'install', description: '主流代理软件架构与官方发布源' }
  ]"
/>
