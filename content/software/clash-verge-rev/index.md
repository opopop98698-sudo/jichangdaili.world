---
title: "Clash Verge Rev 官方软件档案：内核、协议支持与安全发布源"
description: "Clash Verge Rev 官方技术档案。基于 Tauri 框架开发的现代化开源 Clash GUI 客户端，内置 Mihomo (Clash Meta) 核心，原生支持 TUN 模式、脚本扩展与多语言界面，为 2026 年替代原版 CFW 的首选。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# Clash Verge Rev 官方技术档案

<Breadcrumbs :crumbs="[
  { title: '客户端下载', url: '/clients/' },
  { title: '软件档案库', url: '/software/' },
  { title: 'Clash Verge Rev' }
]" />

<AnswerFirst 
  conclusion="Clash Verge Rev 是目前 Windows、macOS 与 Linux 平台上生态最健康、维护最活跃的开源 Clash 桌面客户端。采用 Tauri 框架打造，内存占用仅为原版 CFW 的三分之一，原生内置现代 Mihomo 核心，全面兼容 Hysteria 2、TUIC、VLESS Reality 等新一代代理协议，并支持通过一键服务模式激活 TUN 全局虚拟网卡。"
  scope="Windows 10/11 · macOS 11+ · Linux · 架构: x64 / ARM64"
  verdict="2026 替代原版 Clash for Windows 首选，安装版与便携版均可开箱即用。"
/>

---

## 1. 软件核心技术参数

| 参数项 | 权威数据与核验标准 |
| :--- | :--- |
| **官方代码仓库** | [github.com/clash-verge-rev/clash-verge-rev](https://github.com/clash-verge-rev/clash-verge-rev) |
| **开源许可证** | GPL-3.0 License |
| **收费模式** | 完全免费开源 (Free and Open Source) |
| **前端架构** | Tauri (Rust 底层) + React / TypeScript |
| **内置代理核心** | Mihomo (Clash Meta 官方维护分支) |
| **最新核验版本** | v1.7.7 (2026-10-21 核验) |

---

## 2. 跨平台支持与构建安装包类型

```
+----------------+-------------------------------+-----------------------------------+
| 操作系统       | 支持的系统版本                | 构建包格式与 CPU 架构             |
+----------------+-------------------------------+-----------------------------------+
| Windows        | Windows 10 (1809+) / Win 11   | .exe (安装版) / .zip (便携版)     |
|                |                               | [x64, arm64]                      |
+----------------+-------------------------------+-----------------------------------+
| macOS          | macOS 11.0 (Big Sur) 及以上   | .dmg / .tar.gz                    |
|                |                               | [Apple Silicon (arm64), Intel(x64)]|
+----------------+-------------------------------+-----------------------------------+
| Linux          | Ubuntu 20.04+, Debian, Arch   | .deb / .rpm / .AppImage / AUR     |
|                |                               | [x64, arm64]                      |
+----------------+-------------------------------+-----------------------------------+
```

---

## 3. 协议支持与核心能力矩阵

- **代理协议原生支持**：Shadowsocks, ShadowsocksR, VMess, VLESS (支持 Reality / gRPC / WebSocket), Trojan, Hysteria 2, TUIC v5, WireGuard, Socks5, HTTP(S)。
- **网络接管能力**：
  - **系统代理 (System Proxy)**：一键修改 Windows / macOS 系统代理设置；
  - **服务模式 (Service Mode)**：通过注册系统服务激活 Wintun 网卡驱动，实现无需浏览器配置的全局流量劫持；
  - **高级分流引擎**：支持经典规则集、Rule-Providers、Proxy-Providers 与 JavaScript 自定义扩展覆写脚本。

---

## 4. 相关教程与实操指引

<RelatedTasks 
  :tasks="[
    { title: 'Clash Verge Rev Windows 安装步骤', url: '/install/verge-rev/', taskType: 'install', description: 'Windows 11 下服务模式与 TUN 驱动配置' },
    { title: '从旧版 CFW 迁移至 Verge Rev 教程', url: '/clients/clash-for-windows-migration-and-alternatives-guide/', taskType: 'install', description: '保留配置与规则平滑升级' },
    { title: 'Windows 客户端下载专题', url: '/clients/windows/', taskType: 'install', description: 'x64 与 ARM64 安装包选择' }
  ]"
/>
