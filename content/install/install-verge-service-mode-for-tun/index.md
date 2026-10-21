---
title: "安装Clash Verge服务模式(Service Mode)以启用TUN虚拟网卡"
description: "深入解析 Clash Verge Rev 服务模式 (Service Mode) 的安装必要性、底层 Wintun 驱动调用、管理员提权排障及开机自启系统服务管理。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# 安装Clash Verge服务模式(Service Mode)以启用TUN虚拟网卡

<Breadcrumbs :crumbs="[
  { title: '安装教程', url: '/install/' },
  { title: 'Clash Verge Rev 安装', url: '/install/verge-rev/' },
  { title: '服务模式与 TUN' }
]" />

<AnswerFirst 
  conclusion="服务模式 (Service Mode) 是在 Windows 系统下顺畅开启 TUN 虚拟网卡的前置基础设施。它将一个名为「clash_verge_service」的轻量守护进程注册为 Windows 系统服务，以 LocalSystem 权限常驻。安装服务模式后，无需每次开机都以管理员权限右键运行客户端，且彻底规避了网络切换时虚拟网卡掉线的风险。"
  scope="Windows 10 / Windows 11 · 需本地管理员 UAC 权限"
  verdict="在「设置 -> 服务模式」点击安装，状态灯变绿即代表部署成功。"
/>

---

## 1. 为什么系统代理不够用，必须安装服务模式？

- **系统代理 (System Proxy)**：仅通过注册表通知支持 WinINet 的软件（如 Edge、Chrome）。命令行终端 (CMD/PowerShell)、Git、网络游戏、WSL 及大量第三方应用完全不遵守该代理。
- **服务模式 + TUN**：通过系统服务在操作系统内核层创建虚拟网卡 (Wintun)，直接在网络第 3 层 (IP 层) 拦截全系统发出的所有 TCP/UDP 数据包，实现真正意义上的 100% 透明接管。

---

## 2. 常见问答 (FAQ)

<FAQSection 
  :faqs="[
    {
      question: '点击安装服务模式后，提示 Install Service Failed 怎么处理？',
      answer: '这通常是由于当前客户端是以普通受限权限运行，被 Windows UAC 策略静默拦截。彻底退出客户端，右键图标选择“以管理员身份运行”，再次进入设置点击安装即可成功。'
    }
  ]"
/>

<RelatedTasks 
  :tasks="[
    { title: 'Windows 11 安装实操教程', url: '/install/clash-verge-rev-windows-setup-walkthrough/', taskType: 'install', description: '回顾全套客户端安装步骤' },
    { title: 'TUN 虚拟网卡与系统代理深入对比', url: '/subscription/tun/', taskType: 'subscription', description: '深入理解虚拟网卡路由表重定向机制' }
  ]"
/>
