---
title: "Clash Verge Rev在macOS上的安装与辅助功能权限授予"
description: "面向 Mac 用户的 Clash Verge Rev 完整安装指南。涵盖 Apple Silicon 原生包选择、绕过 Gatekeeper 拦截、系统辅助功能授权与 utun 虚拟网卡配置。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# Clash Verge Rev在macOS上的安装与辅助功能权限授予

<Breadcrumbs :crumbs="[
  { title: '安装教程', url: '/install/' },
  { title: 'Clash Verge Rev 安装', url: '/install/verge-rev/' },
  { title: 'macOS 安装指南' }
]" />

<AnswerFirst 
  conclusion="在 macOS 上安装 Clash Verge Rev 时，搭载 M1/M2/M3/M4 芯片的 Mac 必须下载带有「aarch64」后缀的 DMG 包，老款 Intel Mac 下载「x64」包。安装后若系统提示“无法打开因为无法验证开发者”，在「系统设置」->「隐私与安全性」中点击「仍要打开」即可。要启用 TUN 虚拟网卡，还需在网络设置中允许创建网络扩展。"
  scope="macOS 11 (Big Sur) ~ macOS 15 (Sequoia) · Apple Silicon & Intel"
  verdict="认准 aarch64 DMG 拖入应用程序，授权系统网络扩展开启 TUN。"
/>

---

## 1. 核心四步安装流程

1. **下载 DMG 文件**：前往官方 GitHub Releases 下载 `Clash.Verge_1.7.7_aarch64.dmg`。
2. **拖拽安装**：双击挂载 DMG 镜像，将 Clash Verge 图标拖入右侧的 `Applications` 文件夹。
3. **安全权限放行**：首次双击打开若提示未受信任，进入「系统设置」->「隐私与安全性」，滑到底部点击「仍要打开」。
4. **授予网络扩展权限**：在软件设置中开启 TUN 模式，系统弹出“Clash Verge 想要添加网络扩展”，输入开机指纹或密码允许。

---

## 2. 常见问答 (FAQ)

<FAQSection 
  :faqs="[
    {
      question: 'Mac 上安装服务模式需要单独运行命令吗？',
      answer: '不需要。macOS 版在首次开启 TUN 模式时，会直接通过系统标准的 Security.framework 请求特权 Helper 工具安装，无需手动编写 launchd 守护脚本。'
    }
  ]"
/>

<RelatedTasks 
  :tasks="[
    { title: 'macOS 客户端下载资料', url: '/clients/macos/', taskType: 'download', description: '核对 Mac 构建包架构与签名资料' },
    { title: 'Clash YAML 配置文件阅读指南', url: '/subscription/how-to-read-clash-yaml-proxies-groups-rules/', taskType: 'subscription', description: '配置 Mac 上的订阅链接与分流规则' }
  ]"
/>
