---
title: "Shadowrocket (小火箭) 官方软件档案：iOS 经典代理工具、协议与 App Store 规则"
description: "Shadowrocket (小火箭) 官方技术档案。iOS 平台经典高性价比规则代理客户端，支持节点订阅、测速、分流规则配置与详细流量日志，解析海外 App Store 购买流程。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# Shadowrocket (小火箭) 官方技术档案

<Breadcrumbs :crumbs="[
  { title: '客户端下载', url: '/clients/' },
  { title: '软件档案库', url: '/software/' },
  { title: 'Shadowrocket' }
]" />

<AnswerFirst 
  conclusion="Shadowrocket（中文俗称「小火箭」）是 iOS / iPadOS 生态中历经十年检验、装机量最大的高性价比规则代理软件。以买断制亲民定价（通常美区售价 $2.99）、全协议极速支持与高度稳定的系统级 NetworkExtension 框架著称。支持扫描二维码、批量链接导入，以及强大的场景分流规则与抓包解密功能。"
  scope="iOS 12.0+ / iPadOS 12.0+ · 设备: iPhone / iPad 全系列"
  verdict="iOS 设备高性价比首选，必须登录海外 Apple ID 在 App Store 内合法购买。"
/>

> [!CAUTION] 严禁在系统设置中登录他人 iCloud
> 购买下载 Shadowrocket 时，绝对严禁在系统「设置」中登录任何共享账号。只能打开「App Store」单点登录，下载后立即退出，防止设备被锁定！

---

## 1. 软件核心技术参数

| 参数项 | 权威数据与核验标准 |
| :--- | :--- |
| **官方发布渠道** | 苹果官方 App Store（仅限海外区域上架，如美区/港区/日区） |
| **官方开发者标识** | Shadow Launch Technology Limited |
| **软件定价模式** | 一次性买断制（美区标准售价 $2.99） |
| **底层核心** | 自研高效率 C/Objective-C 原生底层引擎 |
| **最新核验版本** | v2.2.60+ (2026-10-21 核验) |

---

## 2. 协议支持能力

- **全面支持经典与现代协议**：Shadowsocks, ShadowsocksR, VMess, VLESS, Trojan, Hysteria, Hysteria 2, TUIC, WireGuard, Snell, HTTP, HTTPS, Socks5；
- **配置与规则生态**：兼容标准 Base64 订阅链接，支持通过 URL 导入第三方分流规则配置，支持 HTTPS 解密与流量请求查看器。

---

## 3. 相关教程与实操指引

<RelatedTasks 
  :tasks="[
    { title: 'Shadowrocket 安装与系统授权指引', url: '/install/shadowrocket/', taskType: 'install', description: 'iOS 安装后添加 VPN 配置与证书安装' },
    { title: 'iOS 代理客户端下载与海外 Apple ID 防坑指南', url: '/clients/ios-shadowrocket-stash-appstore-region-guide/', taskType: 'install', description: '安全获取美区账号与兑换码防坑' },
    { title: 'iPhone / iPad 客户端专题', url: '/clients/ios/', taskType: 'install', description: 'iOS 生态代理工具对比' }
  ]"
/>
