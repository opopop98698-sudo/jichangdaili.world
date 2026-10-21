---
title: "Clash Nyanpasu 官方软件档案：Tauri 架构多核心 Clash 客户端与扩展插件"
description: "Clash Nyanpasu 官方技术档案。基于 Tauri 架构开发的现代化 Clash 桌面客户端，支持多核心自由切换与高度定制化的配置增强插件，界面精致现代，兼容 Windows、macOS 与 Linux。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# Clash Nyanpasu 官方技术档案

<Breadcrumbs :crumbs="[
  { title: '客户端下载', url: '/clients/' },
  { title: '软件档案库', url: '/software/' },
  { title: 'Clash Nyanpasu' }
]" />

<AnswerFirst 
  conclusion="Clash Nyanpasu 是桌面端上一款备受好评的现代化开源 Clash 客户端。同样基于高性能低内存的 Tauri 框架构建，前端采用 Vue 3，界面精致优雅。其最大特色在于支持多核心（Mihomo / Clash Core）无缝热切换，并提供了极其丰富的配置增强扩展插件系统，适合喜爱客制化与多核心对比的进阶用户。"
  scope="Windows 10/11 · macOS 12+ · Linux · 免费开源"
  verdict="界面优雅、支持多核心自由切换与丰富插件生态的桌面高阶客户端。"
/>

---

## 1. 软件核心技术参数

| 参数项 | 权威数据与核验标准 |
| :--- | :--- |
| **官方代码仓库** | [github.com/libnyanpasu/clash-nyanpasu](https://github.com/libnyanpasu/clash-nyanpasu) |
| **开源许可证** | GPL-3.0 License |
| **收费模式** | 完全免费开源 (Free and Open Source) |
| **前端架构** | Tauri + Vue 3 / TypeScript |
| **支持核心** | Mihomo (Clash Meta) 与 原版 Clash Core 可自选 |
| **最新核验版本** | v1.6.1+ (2026-10-21 核验) |

---

## 2. 跨平台支持与包格式

- **Windows**：支持 `.exe` 安装包与 `.zip` 绿色便携版；
- **macOS**：提供同时支持 Apple Silicon 与 Intel 架构的 `.dmg` 镜像；
- **Linux**：提供 `.AppImage`、`.deb` 与 `.rpm` 安装包。

---

## 3. 核心能力与协议覆盖

- **支持协议**：Shadowsocks, VMess, VLESS (Reality), Trojan, Hysteria, Hysteria 2, TUIC；
- **TUN 虚拟网卡**：深度集成系统级虚拟网卡，提供完整旁路流量捕获；
- **插件系统**：支持用户编写自定义规则增强脚本、定时任务与多订阅自动合并。

---

## 4. 相关教程与实操指引

<RelatedTasks 
  :tasks="[
    { title: 'Clash for Windows 替代客户端对比', url: '/clients/clash-for-windows-migration-and-alternatives-guide/', taskType: 'install', description: 'Verge Rev vs FlClash vs Nyanpasu 深度选型' },
    { title: 'Windows 客户端下载专题', url: '/clients/windows/', taskType: 'install', description: 'Windows 平台软件架构与发布源' }
  ]"
/>
