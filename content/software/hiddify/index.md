---
title: "Hiddify 官方软件档案：基于 sing-box 核心的全协议多平台客户端"
description: "Hiddify 官方技术档案。基于 sing-box 核心的多协议跨平台通用客户端，注重开箱即用与自动节点优选，原生支持 20+ 种代理协议，覆盖全平台操作系统。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# Hiddify 官方技术档案

<Breadcrumbs :crumbs="[
  { title: '客户端下载', url: '/clients/' },
  { title: '软件档案库', url: '/software/' },
  { title: 'Hiddify' }
]" />

<AnswerFirst 
  conclusion="Hiddify 是一款基于先进 sing-box 核心打造的全平台全协议客户端。原生支持 20 种以上的代理协议（包括小众的 ShadowTLS、SSH、TUIC、Hysteria 2、WireGuard 等），对各类复杂订阅格式具备极强的自动嗅探与智能解析能力。无论是 Windows、Android、macOS、Linux 还是 iOS，均提供统一体验的官方客户端，适合不想折腾复杂分流规则、追求开箱即用极速连接的用户。"
  scope="全平台覆盖 (Windows / macOS / Android / iOS / Linux) · 免费开源"
  verdict="支持协议最多、多平台覆盖最广的免费开源开箱即用客户端。"
/>

---

## 1. 软件核心技术参数

| 参数项 | 权威数据与核验标准 |
| :--- | :--- |
| **官方代码仓库** | [github.com/hiddify/hiddify-app](https://github.com/hiddify/hiddify-app) |
| **官方网站** | [hiddify.com](https://hiddify.com) |
| **开源许可证** | GPL-3.0 License |
| **收费模式** | 完全免费开源 (Free and Open Source) |
| **内置代理核心** | sing-box 原生嵌入 |
| **最新核验版本** | v2.5.7+ (2026-10-21 核验) |

---

## 2. 跨平台支持与官方发布源

- **Windows**：GitHub Releases 提供安装版、便携版及微软官方商店版本；
- **Android**：GitHub Releases 提供纯净 APK，并已上架官方 Google Play 商店；
- **iOS / iPadOS**：海外 App Store 提供官方版本免费下载；
- **macOS**：提供 Apple Silicon 与 Intel 芯片的双架构 `.dmg` 与 `.pkg`；
- **Linux**：提供 `.AppImage`、`.deb` 与 `.rpm`。

---

## 3. 核心能力与协议覆盖

- **全协议支持矩阵**：Shadowsocks, VMess, VLESS (Reality), Trojan, Hysteria, Hysteria 2, TUIC, SSH, WireGuard, ShadowTLS, Socks5, HTTP；
- **自动分流与节点优选**：内置地区分流规则与动态 Ping 优选，自动将流媒体与 AI 工具流量导向对应解锁节点。

---

## 4. 相关教程与实操指引

<RelatedTasks 
  :tasks="[
    { title: 'Hiddify 首次安装与配置实操', url: '/install/hiddify/', taskType: 'install', description: '全平台客户端安装与自动优选节点配置' },
    { title: 'sing-box 与 Hiddify 兼容机场选型', url: '/recommend/singbox/', taskType: 'recommend', description: '核验机场多协议与核心兼容条件' }
  ]"
/>
