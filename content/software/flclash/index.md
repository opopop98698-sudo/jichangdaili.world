---
title: "FlClash 官方软件档案：Flutter 跨平台轻量 Clash 客户端与发布源"
description: "FlClash 官方技术档案。基于 Flutter 开发的跨平台开源 Clash 客户端，界面轻量流畅，全平台统一交互设计，内置 Mihomo 核心，支持 Windows、macOS、Linux 与 Android。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# FlClash 官方技术档案

<Breadcrumbs :crumbs="[
  { title: '客户端下载', url: '/clients/' },
  { title: '软件档案库', url: '/software/' },
  { title: 'FlClash' }
]" />

<AnswerFirst 
  conclusion="FlClash 是一款基于 Google Flutter 框架重构的高颜值跨平台开源 Clash 客户端。其最大的特色是全平台（Windows / macOS / Linux / Android）统一的现代交互视觉与极低的空闲系统开销。内置 Mihomo (Clash Meta) 代理核心，全面支持 Clash YAML 规则订阅与策略组切换，适合追求极简流畅、跨设备多端使用习惯统一的用户。"
  scope="Windows / Android / macOS / Linux · 架构: x64 / ARM64"
  verdict="多设备统一交互的轻量首选，低配电脑与移动设备流畅运行。"
/>

---

## 1. 软件核心技术参数

| 参数项 | 权威数据与核验标准 |
| :--- | :--- |
| **官方代码仓库** | [github.com/chen08209/FlClash](https://github.com/chen08209/FlClash) |
| **开源许可证** | GPL-3.0 License |
| **收费模式** | 完全免费开源 (Free and Open Source) |
| **开发框架** | Google Flutter + Dart |
| **内置代理核心** | Mihomo (Clash Meta) |
| **最新核验版本** | v0.8.69+ (2026-10-21 核验) |

---

## 2. 跨平台支持与构建格式

- **Windows**：提供 `_windows_amd64-setup.exe` 与免安装便携版 `_windows_amd64.zip`；
- **Android**：提供 `_android_arm64-v8a.apk` 与 `_android_universal.apk`；
- **macOS**：提供支持 Apple Silicon 与 Intel 芯片的原生 `.dmg` 镜像；
- **Linux**：提供 `.AppImage` 与 `.deb` 包。

---

## 3. 核心能力与协议覆盖

- **原生支持协议**：Shadowsocks, VMess, VLESS (Reality), Trojan, Hysteria 2, TUIC；
- **系统接管**：全平台原生支持系统代理与 TUN 模式（一键虚拟网卡流量接管）；
- **策略组分流**：支持自动测速节点优选 (URL-Test)、故障转移 (Fallback)、负载均衡 (Load-Balance) 与节点手动指定。

---

## 4. 相关教程与实操指引

<RelatedTasks 
  :tasks="[
    { title: 'FlClash 桌面与移动端安装教程', url: '/install/flclash/', taskType: 'install', description: '跨平台安装与配置教程' },
    { title: '从旧版 CFW 迁移至 FlClash', url: '/clients/clash-for-windows-migration-and-alternatives-guide/', taskType: 'install', description: '轻量化替代对比' }
  ]"
/>
