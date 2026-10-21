---
title: "Clash Mi 官方软件档案：轻量级跨平台 Mihomo 规则代理客户端"
description: "Clash Mi 官方技术档案。基于 Mihomo 内核开发的轻量级跨平台客户端，支持标准 Clash YAML 订阅与规则分流，提供原生简洁的跨端体验。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# Clash Mi 官方技术档案

<Breadcrumbs :crumbs="[
  { title: '客户端下载', url: '/clients/' },
  { title: '软件档案库', url: '/software/' },
  { title: 'Clash Mi' }
]" />

<AnswerFirst 
  conclusion="Clash Mi 是一款专注于极简与跨端一致性的 Mihomo 客户端。支持直接导入标准 Clash YAML 订阅与规则集，涵盖 Windows、macOS、Android 与 iOS 四大平台。界面纯净、无任何广告与冗余功能，启动迅速，适合偏好原生轻快体验的 Clash 用户。"
  scope="Windows / macOS / Android / iOS · 免费开源"
  verdict="轻量极简跨平台 Mihomo 客户端，直接兼容现有 Clash 订阅。"
/>

---

## 1. 软件核心技术参数

| 参数项 | 权威数据与核验标准 |
| :--- | :--- |
| **官方代码仓库** | [github.com/ClashMi/ClashMi](https://github.com/ClashMi/ClashMi) |
| **开源许可证** | GPL-3.0 License |
| **收费模式** | 完全免费开源 (Free and Open Source) |
| **内置代理核心** | Mihomo (Clash Meta) 原生嵌入 |
| **最新核验版本** | v1.2.0+ (2026-10-21 核验) |

---

## 2. 跨平台版本支持

- **Windows**：提供标准 64 位 `.exe` 与 `.zip` 便携版；
- **macOS**：提供支持 Apple Silicon 与 Intel 的 `.dmg`；
- **Android**：提供官方 GitHub Release `.apk`；
- **iOS**：部分海外区域 App Store 提供正式版本。

---

## 3. 核心能力与协议覆盖

- **支持协议**：Shadowsocks, VMess, VLESS (Reality), Trojan, Hysteria 2, TUIC；
- **Clash YAML 直读**：无需任何配置转换，完美识别策略组与节点排序。

---

## 4. 相关教程与实操指引

<RelatedTasks 
  :tasks="[
    { title: '全平台客户端下载总览', url: '/clients/', taskType: 'install', description: '六大操作系统代理软件横向评测' },
    { title: '订阅配置总览', url: '/subscription/', taskType: 'configure', description: 'Clash YAML 订阅导入与规则核验' }
  ]"
/>
