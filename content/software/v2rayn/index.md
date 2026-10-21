---
title: "v2rayN 官方软件档案与双核心架构技术规格"
description: "v2rayN 官方技术档案。详细记录项目 GitHub 仓库、Xray 与 sing-box 核心切换、.NET 8 依赖、海量节点测速与路由自定义规则特性。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# v2rayN 官方软件档案

<Breadcrumbs :crumbs="[
  { title: '软件档案', url: '/software/' },
  { title: 'v2rayN' }
]" />

<ClientIdentityCard 
  name="v2rayN"
  category="Windows 经典多核心代理外壳"
  repo="https://github.com/2dust/v2rayN"
  version="6.60"
  license="GPL-3.0"
  core="Xray-core / sing-box 双核心自由切换"
  :platforms="['Windows 10 / Windows 11 (依赖 .NET 8 Desktop Runtime)']"
  :protocols="['VMess', 'VLESS (Reality/gRPC/WS)', 'Trojan', 'Shadowsocks', 'Socks5', 'HTTP', 'Hysteria 2', 'TUIC']"
/>

---

## 1. 项目背景与技术定位

v2rayN 是由开发者 2dust 主导开发并长期维护的 Windows 平台开源网络代理工具。与一体化的客户端不同，v2rayN 在本质上是一个**高度模块化的 GUI 控制外壳**。它将底层网络转发与加密协议完全委托给独立的可执行文件（如 `xray.exe` 或 `sing-box.exe`），外壳程序仅负责进程调度、配置生成、多线程延迟测速与直观的路由规则编辑。

- **多核心灵活切换**：用户可以在核心类型设置中，一秒在成熟稳健的 Xray-core 与轻量快速的 sing-box 核心之间自由切换，无惧新旧协议断层。
- **海量节点批处理能力**：即使在面对数千个散落节点的超大型机场订阅时，v2rayN 的真连接延迟测速与可用性过滤效率依然居于行业领先地位。
- **运行环境要求**：软件基于 C# / WPF 开发，自 6.x 版本起全面转向 .NET 8，宿主机必须提前安装对应的运行时环境。

---

## 2. 官方发布包类型选择指南

在官方 GitHub Releases 页面中，v2rayN 通常会提供两个截然不同的压缩包：

| 构建包文件名 | 包含内容 | 适合用户群 |
| :--- | :--- | :--- |
| **`v2rayN-With-Core.zip`** | 包含 v2rayN 界面 + 完整的 Xray-core、sing-box 核心及最新的 GeoIP/GeoSite 规则库 | **强烈推荐**。新手无需手动下载配置核心，解压即可直接使用 |
| **`v2rayN.zip`** | 仅包含 v2rayN 界面外壳可执行文件，无任何底层核心 | 适合已有固定核心版本、想要手动管理 `bin` 目录的高级技术用户 |

---

## 3. 关联教程与任务直达

<RelatedTasks 
  :tasks="[
    { title: 'v2rayN 安装与环境搭建指南', url: '/install/v2rayn/', taskType: 'install', description: '配置 .NET 8 桌面运行时并初始化 Xray 核心' },
    { title: 'Base64 订阅链接与节点导入', url: '/subscription/links/', taskType: 'subscription', description: '从剪贴板快速导入节点并执行延迟测试' },
    { title: '已连接但无法上网排错', url: '/troubleshooting/no-internet/', taskType: 'troubleshooting', description: '解决 Windows 代理开关与端口错位故障' }
  ]"
/>
