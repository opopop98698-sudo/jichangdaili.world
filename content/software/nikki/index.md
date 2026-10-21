---
title: "Nikki 官方软件档案：OpenWrt 24.10+ 原生 nftables 专属轻量 Mihomo 插件"
description: "Nikki (原名 ShellCrash 衍生版) 官方技术档案。专为最新 OpenWrt 24.10+ 开发的现代化轻量级 Mihomo 透明代理插件，全面拥抱原生 nftables 防火墙架构，资源占用低且配置直接。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# Nikki 官方技术档案

<Breadcrumbs :crumbs="[
  { title: '客户端下载', url: '/clients/' },
  { title: '软件档案库', url: '/software/' },
  { title: 'Nikki' }
]" />

<AnswerFirst 
  conclusion="Nikki 是面向新一代 OpenWrt 24.10+ 官方固件量身定制的现代化轻量级 Mihomo 透明代理插件。它彻底告别了传统老旧的 iptables 规则链，直接调用 Linux 原生 nftables (fw4) 规则表实现透明代理与端口重定向。CPU 与内存占用极低，配置页面纯粹直观，是运行现代 OpenWrt 官方固件软路由的首选插件。"
  scope="OpenWrt 24.10 及以上版本（强制依赖原生 nftables）· 适用架构: x86_64 / aarch64"
  verdict="现代固件专属轻量神器；严禁在旧版 OpenWrt 21/22/23 固件上强行安装。"
/>

> [!WARNING] 系统版本致命硬性约束
> **Nikki 必须运行在 OpenWrt 24.10 或更高版本上**。由于旧版固件缺少 nftables 现代转发扩展，在 OpenWrt 21/22/23 或 iStoreOS 上强行安装会导致防火墙服务启动崩溃而断网！旧版固件请使用 OpenClash。

---

## 1. 软件核心技术参数

| 参数项 | 权威数据与核验标准 |
| :--- | :--- |
| **官方代码仓库** | [github.com/nikkinikkinikki/nikki](https://github.com/nikkinikkinikki/nikki) |
| **开源许可证** | GPL-3.0 License |
| **收费模式** | 完全免费开源 (Free and Open Source) |
| **软件形式** | OpenWrt LuCI 软件包 (`luci-app-nikki.ipk`) |
| **内置代理核心** | Mihomo (Clash Meta) 原生核心 |
| **最新核验版本** | v1.3.0+ (2026-10-21 核验) |

---

## 2. 核心技术优势与对比

- **原生 nftables 支持**：直接与 OpenWrt 24.10 的 `fw4` 深度协作，转发损耗降低 40%，极度省 CPU；
- **纯粹轻量**：无多余的冗余脚本封装，内存占用仅约 60MB ~ 100MB，256MB 内存路由器也能流畅运转；
- **现代协议完备**：原生继承 Mihomo 对 Hysteria 2、TUIC、VLESS Reality 的完整支持。

---

## 3. 相关教程与实操指引

<RelatedTasks 
  :tasks="[
    { title: 'OpenWrt 软路由选型与 nftables 避坑', url: '/clients/openwrt-router-client-selection-and-nftables-guide/', taskType: 'install', description: '版本要求与自检步骤' },
    { title: '软路由客户端专题', url: '/clients/routers/', taskType: 'install', description: '路由器与网关设备选型指南' }
  ]"
/>
