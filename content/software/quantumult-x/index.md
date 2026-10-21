---
title: "Quantumult X (圈 X) 官方软件档案：iOS 极客代理、JS 脚本重写与协议支持"
description: "Quantumult X (圈 X) 官方技术档案。iOS 平台备受进阶玩家推崇的高性能代理客户端，以极致的网络吞吐与强大的 JavaScript 脚本重写重定向能力著称。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# Quantumult X (圈 X) 官方技术档案

<Breadcrumbs :crumbs="[
  { title: '客户端下载', url: '/clients/' },
  { title: '软件档案库', url: '/software/' },
  { title: 'Quantumult X' }
]" />

<AnswerFirst 
  conclusion="Quantumult X（俗称「圈 X」）是 iOS / iPadOS 平台上的顶级进阶代理工具。以纯 C 编写的底层网络引擎具备近乎满载设备性能的极端吞吐能力。其最著名的特性是强悍的 HTTP/HTTPS 请求重定向、MitM 中间人解密与自定义 JavaScript 脚本生态。适合对网络请求有精细定制控制欲的进阶极客用户。"
  scope="iOS 14.0+ / iPadOS 14.0+ · 商业买断制 (App Store 售价约 $7.99)"
  verdict="适合进阶脚本与规则玩家，不适合仅需简单翻墙的基础新手。"
/>

---

## 1. 软件核心技术参数

| 参数项 | 权威数据与核验标准 |
| :--- | :--- |
| **官方发布渠道** | 苹果海外 App Store（美区/港区/日区等） |
| **官方开发者** | cross utility labs |
| **收费模式** | 商业买断制（美区标准售价通常为 $7.99） |
| **底层引擎** | 自研极致优化网络框架 |
| **最新核验版本** | v1.5.0+ (2026-10-21 核验) |

---

## 2. 协议支持与特性取舍

- **经典协议原生支持**：Shadowsocks (SS/SSR), VMess, Trojan, HTTP(S), Socks5；
- **新协议注意事项**：原生不直接支持 Hysteria 2 / TUIC 等现代 UDP 类协议，如服务商仅提供此类新协议节点，需配合转换工具或改选 Stash / Shadowrocket；
- **标志性能力**：强大的分流规则过滤、高度灵活的 MitM 证书重写解密、基于 JavaScript 的本地自动化脚本执行。

---

## 3. 相关教程与实操指引

<RelatedTasks 
  :tasks="[
    { title: 'iPhone / iPad 客户端选型专题', url: '/clients/ios/', taskType: 'install', description: 'iOS 代理工具选型横向对比' },
    { title: '海外 Apple ID 与小火箭获取指南', url: '/clients/ios-shadowrocket-stash-appstore-region-guide/', taskType: 'install', description: '避免 iCloud 锁机安全指南' }
  ]"
/>
