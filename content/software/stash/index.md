---
title: "Stash 官方软件档案：苹果生态 Clash 标杆、覆写脚本与 App Store 购买指南"
description: "Stash 官方技术档案。专为 iOS、iPadOS 与 macOS 设计的高级规则网络代理工具，被誉为「苹果生态下的 Clash」，原生兼容 Clash 规则配置、覆写脚本与高级策略组。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# Stash 官方技术档案

<Breadcrumbs :crumbs="[
  { title: '客户端下载', url: '/clients/' },
  { title: '软件档案库', url: '/software/' },
  { title: 'Stash' }
]" />

<AnswerFirst 
  conclusion="Stash 是苹果生态（iOS / iPadOS / macOS）中体验最为精致、对 Clash 生态兼容度最完美的商业代理客户端。它原生支持 Clash YAML 订阅、规则集与策略组，并深度引入了类似 Quantumult X 的 HTTP 脚本覆写与重定向能力。通过 iCloud 可以在 iPhone、iPad 与 Mac 之间实时无缝同步节点与配置，是苹果全家桶用户的不二之选。"
  scope="iOS 15.0+ / iPadOS 15.0+ / macOS 12+ · 商业买断制"
  verdict="苹果生态最强 Clash 规则客户端，需海外 Apple ID 在 App Store 购买（约 $3.99）。"
/>

---

## 1. 软件核心技术参数

| 参数项 | 权威数据与核验标准 |
| :--- | :--- |
| **官方网站** | [stash.ws](https://stash.ws) |
| **官方发布渠道** | 苹果海外 App Store / Mac App Store |
| **收费模式** | 商业买断制（美区标准售价通常为 $3.99） |
| **底层核心** | 自研高兼容度 Clash 规则引擎 |
| **最新核验版本** | v2.6.4+ (2026-10-21 核验) |

---

## 2. 协议与规则核心能力

- **原生代理协议覆盖**：Shadowsocks, ShadowsocksR, VMess, VLESS (Reality), Trojan, Hysteria 2, TUIC, WireGuard, Snell；
- **Clash 规则无损导入**：直接读取标准 Clash YAML 订阅链接，支持 Proxy-Providers 与 Rule-Providers；
- **Stash 独占高级特性**：
  - **按需连接 (On-Demand)**：根据网络类型（蜂窝移动网络 / 家用 Wi-Fi / 指定 SSID）自动激活或休眠代理；
  - **iCloud 同步**：跨设备自动同步自定义规则与策略偏好；
  - **脚本扩展覆写 (Stash Overrides)**：通过 JavaScript 动态覆写节点参数与请求头。

---

## 3. 相关教程与实操指引

<RelatedTasks 
  :tasks="[
    { title: 'iOS 代理客户端下载与海外 Apple ID 指南', url: '/clients/ios-shadowrocket-stash-appstore-region-guide/', taskType: 'install', description: '安全获取美区账号与 App Store 兑换码' },
    { title: 'iPhone / iPad 客户端选型专题', url: '/clients/ios/', taskType: 'install', description: '小火箭 vs Stash vs 圈 X 对比' }
  ]"
/>
