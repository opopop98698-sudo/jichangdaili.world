---
title: "OpenClash 官方软件档案：OpenWrt 软路由最强代理插件、核心与依赖"
description: "OpenClash 官方技术档案。OpenWrt 路由器平台上功能最为强劲、生态最为成熟的图形化代理插件，支持 Fake-IP、TUN 模式与全面的 Clash 规则订阅自动化更新。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# OpenClash 官方技术档案

<Breadcrumbs :crumbs="[
  { title: '客户端下载', url: '/clients/' },
  { title: '软件档案库', url: '/software/' },
  { title: 'OpenClash' }
]" />

<AnswerFirst 
  conclusion="OpenClash 是 OpenWrt 软路由与家庭网关生态中装机量最大、社区讨论最活跃的 LuCI 插件。基于开源 Mihomo (Clash Meta) 核心，完美支持 Fake-IP、TUN 虚拟网卡转发，以及针对家庭局域网内不同设备（如电视盒子、游戏主机、NAS、个人手机）的精细 MAC 地址黑白名单控制。功能大而全，适合内存在 512MB 以上的主流软路由小主机。"
  scope="OpenWrt 19.07 ~ 23.05+ / iStoreOS · 适用架构: x86_64 / aarch64 / mips"
  verdict="成熟 OpenWrt 固件首选，需提前预留 40MB+ 闪存空间与必备系统依赖。"
/>

---

## 1. 软件核心技术参数

| 参数项 | 权威数据与核验标准 |
| :--- | :--- |
| **官方代码仓库** | [github.com/vernesong/OpenClash](https://github.com/vernesong/OpenClash) |
| **开源许可证** | GPL-3.0 License |
| **收费模式** | 完全免费开源 (Free and Open Source) |
| **软件形式** | OpenWrt LuCI 软件包 (`luci-app-openclash.ipk`) |
| **推荐核心** | Mihomo (Clash Meta) 官方编译版 |
| **最新核验版本** | v0.46.068+ (2026-10-21 核验) |

---

## 2. 软路由安装前提与依赖清单

在 OpenWrt 终端中执行安装前，必须确保安装了以下系统依赖：
```bash
opkg update
opkg install luci-compat dnsmasq-full ca-bundle kmod-tun
```
- **内存建议**：运行 Mihomo 核心通常占用 150MB ~ 250MB 物理内存，建议路由器空闲内存不少于 512MB；
- **存储空间**：`/overlay` 可用空间必须大于 40MB，否则内核文件无法完全写入会导致路由器无法启动。

---

## 3. 核心能力与协议覆盖

- **全协议兼容**：Shadowsocks, VMess, VLESS (Reality), Trojan, Hysteria 2, TUIC, WireGuard；
- **DNS 防污染与 Fake-IP**：内置高性能 Dnsmasq 转发接管，阻断运营商 DNS 劫持；
- **流媒体与分流**：直接读取服务商提供的 Clash 订阅链接，支持规则集自动定时更新。

---

## 4. 相关教程与实操指引

<RelatedTasks 
  :tasks="[
    { title: 'OpenWrt 软路由选型与 nftables 避坑', url: '/clients/openwrt-router-client-selection-and-nftables-guide/', taskType: 'install', description: 'OpenClash vs Nikki vs PassWall2 对比' },
    { title: '软路由与网络设备客户端专题', url: '/clients/routers/', taskType: 'install', description: '固件与硬件匹配自检流程' }
  ]"
/>
