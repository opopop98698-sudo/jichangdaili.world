---
title: "PassWall2 官方软件档案：OpenWrt 多核心自由搭配与精细访问控制插件"
description: "PassWall2 官方技术档案。OpenWrt 社区老牌实用的路由透明代理客户端，以多核心自由搭配、灵活的分流规则与访问控制黑白名单著称。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# PassWall2 官方技术档案

<Breadcrumbs :crumbs="[
  { title: '客户端下载', url: '/clients/' },
  { title: '软件档案库', url: '/software/' },
  { title: 'PassWall2' }
]" />

<AnswerFirst 
  conclusion="PassWall2 是 OpenWrt 软路由领域历史悠久、功能极其实用的透明代理插件。其核心特色在于多核心（Xray-core、sing-box、Shadowsocks-Rust 等）自由无缝组合搭配，支持根据不同域名或 IP 规则将流量分别指向不同的代理内核。具备清晰的局域网设备黑白名单与 DNS 防污染能力，非常适合有复杂多协议分流需求的软路由用户。"
  scope="OpenWrt 21.02 ~ 23.05+ · 适用架构: x86_64 / aarch64 / arm"
  verdict="多核心按需搭配的老牌软路由神器，适合有精细化分流定制需求的进阶用户。"
/>

---

## 1. 软件核心技术参数

| 参数项 | 权威数据与核验标准 |
| :--- | :--- |
| **官方代码仓库** | [github.com/xiaorouji/openwrt-passwall](https://github.com/xiaorouji/openwrt-passwall) |
| **开源许可证** | GPL-3.0 License |
| **收费模式** | 完全免费开源 (Free and Open Source) |
| **软件形式** | OpenWrt LuCI 软件包 (`luci-app-passwall.ipk`) |
| **内置支持核心** | Xray-core / sing-box / Shadowsocks-Rust |
| **最新核验版本** | v4.76+ (2026-10-21 核验) |

---

## 2. 核心技术优势与对比

- **多核心灵活调度**：不同节点可指定运行在不同核心上（如 VMess/VLESS 跑在 Xray，Hysteria 跑在 sing-box）；
- **访问控制列表 (ACL)**：按局域网设备 IP 或 MAC 地址精细指定分流策略（如让电视走代理、让智能家居完全直连）；
- **多防火墙兼容**：同时提供兼容传统 iptables 与现代 nftables 的版本分支。

---

## 3. 相关教程与实操指引

<RelatedTasks 
  :tasks="[
    { title: 'OpenWrt 软路由选型与 nftables 避坑', url: '/clients/openwrt-router-client-selection-and-nftables-guide/', taskType: 'install', description: 'OpenClash vs Nikki vs PassWall2 对比' },
    { title: '软路由与网络设备客户端专题', url: '/clients/routers/', taskType: 'install', description: '路由器与网关设备选型指南' }
  ]"
/>
