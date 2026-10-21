---
title: "v2rayN 官方软件档案：Xray 与 sing-box 双核心、协议支持与发布源"
description: "v2rayN 官方技术档案。基于 .NET 8 开发的 Windows 经典多协议代理客户端，内置 Xray 与 sing-box 双核心，提供强大的路由编辑与批量节点管理功能。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# v2rayN 官方技术档案

<Breadcrumbs :crumbs="[
  { title: '客户端下载', url: '/clients/' },
  { title: '软件档案库', url: '/software/' },
  { title: 'v2rayN' }
]" />

<AnswerFirst 
  conclusion="v2rayN 是 Windows 平台上资历最深、多协议适应性最广的经典代理客户端。基于微软 .NET 8 桌面运行时构建，原生支持 Xray-core 与 sing-box 核心无缝切换。它对 VLESS Reality、gRPC、Hysteria 2 等现代协议具有第一梯队的原生支持能力，是追求节点精细调试与多协议批量管理用户的必备工具。"
  scope="Windows 10 / Windows 11 · 适用架构: x64 / ARM64"
  verdict="需要管理大量单节点、依赖 VLESS Reality 协议用户的首选。"
/>

---

## 1. 软件核心技术参数

| 参数项 | 权威数据与核验标准 |
| :--- | :--- |
| **官方代码仓库** | [github.com/2dust/v2rayN](https://github.com/2dust/v2rayN) |
| **开源许可证** | GPL-3.0 License |
| **收费模式** | 完全免费开源 (Free and Open Source) |
| **开发框架** | C# / .NET 8 Desktop Runtime (WPF) |
| **内置代理核心** | Xray-core / sing-box 可自选切换 |
| **最新核验版本** | v6.60+ (2026-10-21 核验) |

---

## 2. 跨平台版本与构建包类型

- **Windows 主力版**：提供 `v2rayN-With-Core.zip`（包含所有官方编译好的 Xray/sing-box 二进制核心，解压即用）与 `v2rayN.zip`（仅主程序外壳，需自行放置 core）；
- **运行环境前提**：系统必须提前安装微软官方 **.NET 8.0 Desktop Runtime**（若未安装，程序双击将闪退报错）；
- **跨平台探索**：作者团队近期开发了基于 Avalonia 框架的 macOS / Linux 跨平台预览版本。

---

## 3. 协议支持与特色能力

- **全面支持现代协议**：VMess, VLESS (Reality, gRPC, WebSocket), Trojan, Shadowsocks, Socks5, HTTP, Hysteria 2, TUIC；
- **TUN 虚拟网卡支持**：内置通过 sing-box 核心或 tun2socks 驱动的系统级流量捕获；
- **批量与测速工具**：支持批量真连接测速、Ping 延迟测速、路由规则自定义、GeoIP 与 GeoSite 数据库一键更新。

---

## 4. 相关教程与实操指引

<RelatedTasks 
  :tasks="[
    { title: 'v2rayN 解压与首次配置实操', url: '/install/v2rayn/', taskType: 'install', description: '配置 .NET 8 桌面运行时与核心激活' },
    { title: 'v2rayN 闪退崩溃故障排查', url: '/troubleshooting/troubleshoot-v2rayn-crash-on-splash-screen/', taskType: 'troubleshoot', description: '解决缺少桌面运行时导致的启动崩溃' },
    { title: 'Windows 客户端下载专题', url: '/clients/windows/', taskType: 'install', description: 'Windows 代理软件横向对比' }
  ]"
/>
