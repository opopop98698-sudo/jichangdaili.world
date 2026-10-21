---
title: "v2rayA 官方软件档案：Linux 主机与软路由 Web 控制台透明代理"
description: "v2rayA 官方技术档案。基于 Web UI 架构的通用透明代理客户端，特别适合部署于 Linux 物理服务器、NAS（群晖/威联通/TrueNAS）与旁路由网关设备。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# v2rayA 官方技术档案

<Breadcrumbs :crumbs="[
  { title: '客户端下载', url: '/clients/' },
  { title: '软件档案库', url: '/software/' },
  { title: 'v2rayA' }
]" />

<AnswerFirst 
  conclusion="v2rayA 是一款专为 Linux 环境（包括物理服务器、VPS、NAS 与软路由设备）打造的基于 Web UI 的革命性通用透明代理工具。它彻底摆脱了传统 Linux 上配置代理必须依赖复杂命令行与手动编写 JSON 的繁琐流程，通过在浏览器访问 2017 端口即可实现直观的节点测速、分流配置与全局透明代理接管。"
  scope="Linux 服务器 / NAS (群晖/威联通) / OpenWrt 旁路由 · 架构: x64 / ARM64 / ARMv7"
  verdict="无头 Linux 服务器与家庭旁路网关 Web 管理首选，支持 Docker 一键部署。"
/>

---

## 1. 软件核心技术参数

| 参数项 | 权威数据与核验标准 |
| :--- | :--- |
| **官方代码仓库** | [github.com/v2rayA/v2rayA](https://github.com/v2rayA/v2rayA) |
| **官方网站** | [v2raya.org](https://v2raya.org) |
| **开源许可证** | AGPL-3.0 License |
| **收费模式** | 完全免费开源 (Free and Open Source) |
| **管理界面** | 原生 Web 控制台（默认监听本地 `2017` 端口） |
| **推荐核心** | Xray-core / V2Ray-core |
| **最新核验版本** | v2.2.5+ (2026-10-21 核验) |

---

## 2. 核心部署方式与能力

- **Docker 极速部署**（推荐服务器与 NAS 用户）：
```bash
docker run -d --name v2raya --restart=always --privileged \
  --network=host -v /etc/v2raya:/etc/v2raya mzz2017/v2raya
```
- **系统包管理支持**：提供 Debian/Ubuntu 的 `.deb`、Fedora 的 `.rpm` 以及 Arch Linux AUR；
- **透明代理接管机制**：支持将透明代理实现方式设置为 Redirect、TProxy 或仅开放 HTTP/Socks5 本地端口；
- **多协议原生支持**：VLESS (Reality), VMess, Trojan, Shadowsocks, Hysteria 2。

---

## 3. 相关教程与实操指引

<RelatedTasks 
  :tasks="[
    { title: 'Linux 客户端下载专题', url: '/clients/linux/', taskType: 'install', description: 'Linux 桌面与服务端代理工具对照' },
    { title: '软路由与网关客户端专题', url: '/clients/routers/', taskType: 'install', description: '软路由旁网关与透明代理选型' }
  ]"
/>
