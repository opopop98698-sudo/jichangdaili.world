---
title: "v2rayNG 官方软件档案：Android 代理客户端标杆、协议与纯净 APK"
description: "v2rayNG 官方技术档案。Android 平台开源代理客户端标杆，内置 Xray 核心，支持 VpnService 全局接管、分应用代理与省电优化。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# v2rayNG 官方技术档案

<Breadcrumbs :crumbs="[
  { title: '客户端下载', url: '/clients/' },
  { title: '软件档案库', url: '/software/' },
  { title: 'v2rayNG' }
]" />

<AnswerFirst 
  conclusion="v2rayNG 是 Android 平台上最稳健、装机量最大的开源代理客户端。由 2dust 团队维护，内置原生 Xray 核心，完美调用 Android 系统底层的 VpnService 接口实现全局与按应用分流代理。在休眠保活、弱网自愈与电池续航方面经过多年打磨，是安卓设备上最值得信赖的基础代理工具。"
  scope="Android 5.0 ~ Android 15+ · 适用架构: arm64-v8a / universal / x86_64"
  verdict="安卓设备标配工具，认准官方 GitHub Releases 下载 arm64-v8a 专属架构包。"
/>

---

## 1. 软件核心技术参数

| 参数项 | 权威数据与核验标准 |
| :--- | :--- |
| **官方代码仓库** | [github.com/2dust/v2rayNG](https://github.com/2dust/v2rayNG) |
| **开源许可证** | GPL-3.0 License |
| **收费模式** | 完全免费开源 (Free and Open Source) |
| **开发语言** | Kotlin / Java (Android Native) |
| **内置代理核心** | Xray-core (深度优化安卓编译版) |
| **最新核验版本** | v1.9.15+ (2026-10-21 核验) |

---

## 2. APK 架构选择指南

- **`v2rayNG_x.x.x_arm64-v8a.apk`**：绝大多数（98%）近 6 年内的智能手机与平板推荐首选，运行速度与功耗表现最佳；
- **`v2rayNG_x.x.x_universal.apk`**：通用兼容包，适合老旧 32 位手机或无法判断架构的机型；
- **`v2rayNG_x.x.x_x86_64.apk`**：电脑安卓模拟器（如雷电、夜神、MuMu）专属安装包。

---

## 3. 核心能力与协议覆盖

- **协议原生覆盖**：VLESS (Reality / gRPC / WS), VMess, Trojan, Shadowsocks, Socks5, Hysteria 2；
- **分应用代理 (Per-App Proxy)**：支持勾选指定国内 App 彻底绕过代理直连，仅让特定海外软件走节点，有效节省流量并提升银行类软件安全性；
- **路由分流**：内置绕过局域网及大陆 IP 地址规则集，支持按域名白名单定向分流。

---

## 4. 相关教程与实操指引

<RelatedTasks 
  :tasks="[
    { title: 'v2rayNG 安装与首次配置实操', url: '/install/v2rayng/', taskType: 'install', description: '配置 VpnService 授权与订阅节点导入' },
    { title: 'Android 客户端下载专题', url: '/clients/android/', taskType: 'install', description: '安卓平台客户端横向对比与防坑警示' },
    { title: '手机连上代理无法上网排查', url: '/troubleshooting/connected-to-proxy-but-no-internet-checklist/', taskType: 'troubleshoot', description: '排查分应用代理冲突与 DNS 超时' }
  ]"
/>
