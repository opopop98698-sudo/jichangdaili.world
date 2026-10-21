---
title: "Clash Verge Rev 官方软件档案与全平台技术规格"
description: "Clash Verge Rev 官方技术档案。详细记录项目 GitHub 仓库、Mihomo 内核集成、全平台安装包构建形态、协议兼容性与 Wintun 驱动支持标准。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# Clash Verge Rev 官方软件档案

<Breadcrumbs :crumbs="[
  { title: '软件档案', url: '/software/' },
  { title: 'Clash Verge Rev' }
]" />

<ClientIdentityCard 
  name="Clash Verge Rev"
  category="开源桌面多平台客户端"
  repo="https://github.com/clash-verge-rev/clash-verge-rev"
  version="1.7.7"
  license="GPL-3.0"
  core="Mihomo (Clash Meta) v1.18.9+"
  :platforms="['Windows 10/11 (x64/arm64)', 'macOS 11+ (Apple Silicon/Intel)', 'Linux (deb/rpm/AppImage)']"
  :protocols="['Shadowsocks', 'ShadowsocksR', 'VMess', 'VLESS (Reality)', 'Trojan', 'Hysteria', 'Hysteria 2', 'TUIC', 'WireGuard']"
/>

---

## 1. 项目背景与技术谱系

Clash Verge Rev 是在原版 Clash Verge 项目维护停滞后，由开源社区开发者接盘并持续进行现代化重构的分支项目。它彻底解决了原版在 Windows 11 下的诸多兼容性痛点，并将底层内核全面升级至功能最为完备的 Mihomo（原 Clash.Meta）内核。

- **前端架构**：采用 Rust + Tauri 框架重构，相比于原版基于 Electron 的旧客户端，空闲状态内存开销从 300MB+ 大幅缩减至 100MB 左右。
- **系统集成**：具备原生的 Windows Service 服务模式安装器，能够直接调用 Wintun 驱动实现纳秒级的 TUN 虚拟网卡切换。
- **扩展生态**：支持通过 JavaScript 脚本扩展 (Merge / Script) 动态重写订阅中的节点与分流策略，无缝兼容各大主流机场与自建节点。

---

## 2. 官方发布包构建与系统支持矩阵

| 操作系统 | 推荐安装包文件 | 支持最低版本 | 驱动与系统权限要求 |
| :--- | :--- | :--- | :--- |
| **Windows 64位** | `Clash.Verge_1.7.7_x64_zh-CN.msi` | Windows 10 (Build 1809+) / Windows 11 | 需要管理员权限安装 Service Mode 驱动 |
| **Windows ARM** | `Clash.Verge_1.7.7_arm64.msi` | Windows 11 ARM64 (骁龙 X Elite 等) | 原生 ARM 指令集运行，能效极高 |
| **macOS (M芯片)** | `Clash.Verge_1.7.7_aarch64.dmg` | macOS 11.0 (Big Sur) 及以上 | 首次启动需授予辅助功能与网络过滤权限 |
| **macOS (Intel)** | `Clash.Verge_1.7.7_x64.dmg` | macOS 10.15 (Catalina) 及以上 | 标准 DMG 拖入 Applications 即可 |
| **Linux 发行版** | `clash-verge_1.7.7_amd64.deb / AppImage` | Ubuntu 20.04+ / Debian 11+ / Arch | 需配置 setcap 或通过 systemd 运行 |

---

## 3. 关联教程与任务直达

<RelatedTasks 
  :tasks="[
    { title: 'Windows 11 安装实操教程', url: '/install/clash-verge-rev-windows-setup-walkthrough/', taskType: 'install', description: '图文逐步完成服务模式安装与开机自启' },
    { title: 'Clash YAML 配置文件阅读指南', url: '/subscription/how-to-read-clash-yaml-proxies-groups-rules/', taskType: 'subscription', description: '深入拆解节点、策略组与分流规则' },
    { title: '端口 7890 冲突排错方案', url: '/troubleshooting/port-7890-already-in-use-diagnosis-and-fix/', taskType: 'troubleshooting', description: '解决启动提示 address already in use 报错' }
  ]"
/>
