---
title: "已连接但无法上网排查：本地代理错位与分流修复"
description: "排查代理客户端显示节点已连接且测速正常，但浏览器提示“无法访问此网站”或关闭代理后全电脑彻底断网的高频故障。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# 已连接但无法上网排查与网络急救指南

<Breadcrumbs :crumbs="[
  { title: '故障排查', url: '/troubleshooting/' },
  { title: '已连接但无法上网', url: '/troubleshooting/no-internet/' }
]" />

<AnswerFirst 
  conclusion="「客户端显示已连接、延迟几百毫秒正常，但网页一个都打不开」是代理使用中最普遍的挫折场景。其本质是流量没有正确流经本地代理监听端口，或者在通过代理后被错误的策略组/DNS死锁拦截。最常见的两大致命原因：Windows 注册表系统代理开关未同步开启，或者策略组内误选了空的、不可达的假节点。"
  scope="Windows 10/11 · macOS · Android · iOS"
  verdict="先检查 Windows 系统代理开关与端口，再排查分流规则是否误选 DIRECT。"
/>

---

## 1. 流量流经的三大关卡排查法

```
[浏览器发出请求: www.google.com]
               │
               ▼
[关卡 1: 系统代理有没有把流量送给客户端？]
-> 检查 Windows 设置 -> 代理，开关是否打开，端口是不是 7890
               │ (通过)
               ▼
[关卡 2: 客户端策略组有没有选中活着且能上网的节点？]
-> 在客户端内切换为 Global 全局模式测试，排除规则冲突
               │ (通过)
               ▼
[关卡 3: 节点服务器能不能正常把请求送出公网？]
-> 检查节点 IP 纯净度与机房 DNS 是否故障
```

---

## 2. 本专题精选文章

- [关闭代理客户端后整台电脑彻底无法上网的紧急恢复指南](/troubleshooting/turn-off-proxy-and-lose-internet-completely/)
- [已连接节点但浏览器提示“无法访问此网站”核心诊断树](/troubleshooting/connected-to-proxy-but-no-internet-checklist/)
- [国外网站正常打开但国内微信、百度无法访问的分流修复](/troubleshooting/foreign-sites-work-domestic-sites-broken/)

<RelatedTasks 
  :tasks="[
    { title: 'TUN 虚拟网卡模式与权限配置', url: '/subscription/tun/', taskType: 'subscription', description: '配置透明网络接管，绕过脆弱的浏览器系统代理' },
    { title: 'DNS 解析与防劫持方案', url: '/subscription/dns/', taskType: 'subscription', description: '排查 Fake-IP 模式引起的域名解析异常' },
    { title: '端口 7890 冲突诊断与解决', url: '/troubleshooting/port-7890-already-in-use-diagnosis-and-fix/', taskType: 'troubleshooting', description: '排查本地端口无法监听引起的断网' }
  ]"
/>
