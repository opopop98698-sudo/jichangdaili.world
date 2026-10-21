---
title: "已连接节点但浏览器提示“无法访问此网站”核心诊断树"
description: "已连接代理节点但浏览器打不开任何网站的系统排查清单。排查 WinINet 系统代理错位、策略组误选 DIRECT 与机房 DNS 故障。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# 已连接节点但浏览器提示“无法访问此网站”核心诊断树

<Breadcrumbs :crumbs="[
  { title: '故障排查', url: '/troubleshooting/' },
  { title: '已连接但无法上网', url: '/troubleshooting/no-internet/' },
  { title: '核心诊断树' }
]" />

<AnswerFirst 
  conclusion="「节点测速有延迟，但网页完全打不开」最常见的三个原因：1. 客户端主界面上的「系统代理 (System Proxy)」开关根本没有打开；2. 客户端监听的混合端口（如 7890）与 Windows 注册表中的端口不匹配；3. 当前策略组内选中的节点虽然物理可达，但目标机房的出口带宽已被服务商欠费关停。请依序执行下述排查清单。"
  scope="Windows 10/11 · macOS · Chrome / Edge / Firefox"
  verdict="先看系统代理开关是否开启，再看切换为全局模式能否打开网页。"
/>

---

## 1. 核心五项快速诊断自查表

| 检查顺序 | 检查项目 | 执行动作 | 正常预期结果 |
| :--- | :--- | :--- | :--- |
| **步骤 1** | **系统代理开关** | 检查客户端托盘图标是否变蓝，主界面系统代理是否开启 | 开关处于「开」，无报错提示 |
| **步骤 2** | **Windows 代理端口** | 打开「设置 -> 代理」，核对端口是否与客户端一致 | 显示 `127.0.0.1:7890` (或自定义端口) |
| **步骤 3** | **节点真连接延迟** | 在客户端右键节点，点击「真实连接测速」 | 返回真实数值（如 `180ms`），非 `0ms` 或 `Timeout` |
| **步骤 4** | **排除分流规则** | 将工作模式临时从「规则 (Rule)」切换为「全局 (Global)」 | 若切换后 Google 秒开，证明原规则有严重冲突 |
| **步骤 5** | **TUN 虚拟网卡状态** | 尝试开启 TUN 模式，绕过浏览器代理直接由网卡接管 | 浏览器网页与终端网络立即恢复 |

---

## 2. 常见问答 (FAQ)

<FAQSection 
  :faqs="[
    {
      question: '为什么 Firefox 浏览器打不开，而 Chrome 能正常打开？',
      answer: 'Firefox 浏览器内部拥有一套独立的代理设置。打开 Firefox 设置 -> 搜索“网络设置”，确保勾选的是“使用系统代理设置”，而不是“不使用代理”。'
    }
  ]"
/>

<RelatedTasks 
  :tasks="[
    { title: '关代理后彻底断网的恢复方法', url: '/troubleshooting/turn-off-proxy-and-lose-internet-completely/', taskType: 'troubleshooting', description: '学习如何快速重置 Windows 注册表残留代理' },
    { title: 'TUN 模式配置规范', url: '/subscription/tun/', taskType: 'subscription', description: '开启系统级透明代理替代浏览器代理' }
  ]"
/>
