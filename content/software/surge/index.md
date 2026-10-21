---
title: "Surge 官方软件档案：苹果生态工业级网络调试、抓包与顶级代理工具"
description: "Surge 官方技术档案。苹果生态（iOS / macOS）顶级网络调试与高级规则代理软件，以行业标杆级的稳定性、详细的抓包分析与企业级策略路由享誉业界。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# Surge 官方技术档案

<Breadcrumbs :crumbs="[
  { title: '客户端下载', url: '/clients/' },
  { title: '软件档案库', url: '/software/' },
  { title: 'Surge' }
]" />

<AnswerFirst 
  conclusion="Surge 是运行于 iOS 与 macOS 生态下的工业级网络调试工具与顶级规则代理客户端。在网络性能吞吐、多网卡并发处理、详细抓包分析与企业级策略路由规则方面，Surge 被公认为行业最高标杆。因其高昂的商业授权价格（iOS 基础/专业版约 $49.99，Mac 版授权约 $49.99 ~ $99.99），它主要面向软件工程师、网络安全研究者及追求极致体验的发烧友。"
  scope="iOS 16.0+ / macOS 12+ · 商业授权许可制"
  verdict="苹果生态顶级商业工具，功能天花板，定价较高适合专业技术人员。"
/>

---

## 1. 软件核心技术参数

| 参数项 | 权威数据与核验标准 |
| :--- | :--- |
| **官方网站** | [nssurge.com](https://nssurge.com) |
| **官方发布渠道** | iOS 端为海外 App Store 内购；macOS 端为官网 DMG 下载激活授权 |
| **收费模式** | 商业授权与年费订阅机制 |
| **底层引擎** | Surge Custom Network Stack (高性能自研引擎) |
| **最新核验版本** | Surge 5 (v5.9.0+) (2026-10-21 核验) |

---

## 2. 核心能力与协议覆盖

- **支持协议**：Snell（Surge 原生私有协议）、Shadowsocks、VMess、Trojan、WireGuard、TUIC、Socks5、HTTP；
- **行业标杆特性**：
  - **增强模式 (Enhanced Mode)**：在 Mac 上无需设置系统代理，直接通过虚拟接口接管所有原生应用程序流量；
  - **网关模式 (Router / Gateway Mode)**：让 Mac 充当家庭局域网旁路网关，为 Apple TV、智能电视等设备提供全局透明分流；
  - **抓包与性能分析**：完整的请求耗时瀑布图、DNS 解析耗时追踪、TLS 握手细节审计。

---

## 3. 相关教程与实操指引

<RelatedTasks 
  :tasks="[
    { title: 'macOS 客户端下载专题', url: '/clients/macos/', taskType: 'install', description: 'Mac 平台开源与商业代理软件对照' },
    { title: 'iPhone / iPad 客户端专题', url: '/clients/ios/', taskType: 'install', description: 'iOS 生态网络分流工具对比' }
  ]"
/>
