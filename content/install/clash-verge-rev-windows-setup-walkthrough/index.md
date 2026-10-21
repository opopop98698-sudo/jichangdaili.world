---
title: "Clash Verge Rev在Windows 11上的安装与首次启动教程"
description: "面向 Windows 11 用户的 Clash Verge Rev 全图文安装与首次初始化实操手册。包含安装包核验、WebView2 依赖、Service Mode 服务模式提权、TUN 驱动注入与开机静默启动设置。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# Clash Verge Rev在Windows 11上的安装与首次启动教程

<Breadcrumbs :crumbs="[
  { title: '安装教程', url: '/install/' },
  { title: 'Clash Verge Rev 安装', url: '/install/verge-rev/' },
  { title: 'Windows 11 安装实操' }
]" />

<AnswerFirst 
  conclusion="Clash Verge Rev 在 Windows 11 系统下的安装标准流程分为四步：核验并运行官方 x64 MSI 安装包、在设置中安装服务模式 (Service Mode)、开启开机自启并设置托盘静默驻留，最后通过本地 127.0.0.1:7890 端口回环测试验收核心运行状态。完成这四步后，才可进入下一阶段的订阅链接导入与节点选择。"
  scope="Windows 11 (22H2 / 23H2 / 24H2) 64位 · Clash Verge Rev v1.7.0 ~ v1.7.7"
  verdict="必须以管理员身份提权安装服务模式，否则 TUN 虚拟网卡无法接管全系统流量。"
/>

---

## 1. 核心概念与系统组件协同关系

在 Windows 11 环境下，Clash Verge Rev 并非单一的单一进程程序，而是由三个相互协作的软件层级组成：

```
+-------------------------------------------------------------------------+
| 用户界面展示层: Tauri 前端 (调用 Windows 11 自带的 WebView2 运行时)       |
| - 渲染极简现代 UI、处理鼠标点击交互、管理本地主题与多语言切换                 |
+-------------------------------------------------------------------------+
                                    │ (本地 IPC / WebSocket 通信)
                                    ▼
+-------------------------------------------------------------------------+
| 系统服务守护层: Clash Verge Service (Windows 命名服务: clash_verge_service) |
| - 以 LocalSystem 特权常驻系统后台，负责管理 Wintun 虚拟网卡驱动的动态插拔    |
+-------------------------------------------------------------------------+
                                    │ (管道通信与子进程拉起)
                                    ▼
+-------------------------------------------------------------------------+
| 底层网络核心层: Mihomo 内核 (原 Clash.Meta, 可执行文件: clash-meta.exe)  |
| - 监听本地 7890 混合端口，执行 DNS Fake-IP 映射与 ACL4SSR 规则分流匹配    |
+-------------------------------------------------------------------------+
```

理解这一分工至关重要：
- **WebView2 异常**会导致客户端打开后呈现“一片空白”或无限转圈；
- **Service Mode 缺失**会导致点击“TUN 模式”时弹窗报错“权限不足”或“无法创建虚拟适配器”；
- **Mihomo 核心被拦截**（如被杀毒软件误杀）会导致客户端界面正常但测速全红、无法联网。

---

## 2. 安装前置条件自查与环境准备

在正式启动安装程序前，请执行以下准备工作：

### 2.1 检查系统版本与 CPU 架构
打开 Windows 11「设置」->「系统」->「系统信息」，核对以下指标：
- **操作系统版本**：必须为 Windows 11 21H2 或更高版本（推荐 23H2）。
- **系统类型**：确认显示为“64 位操作系统，基于 x64 的处理器”。如果是高通骁龙芯片笔记本，则需对应下载 arm64 安装包。

### 2.2 检查与释放本地 7890 端口
代理核心默认使用 7890 端口。若之前安装过原版 Clash for Windows 或其他工具并残留了后台服务，会导致端口抢占。在 PowerShell 中运行：
```powershell
netstat -ano | findstr "7890"
```
如果输出为空，说明端口纯净可用；若输出显示有 PID 占用，打开任务管理器根据 PID 结束对应进程。

---

## 3. 标准逐步安装实操流程

<VersionScope 
  targetVersion="1.7.7"
  osScope="Windows 11 Pro 64位 (Build 22631+)"
  verifiedAt="2026-10-21"
/>

<SetupSteps 
  :steps="[
    {
      stepNumber: 1,
      title: '获取并校验官方安装包',
      description: '前往官方 GitHub Releases 页面，下载 Clash.Verge_1.7.7_x64_zh-CN.msi。在文件所在目录打开 PowerShell，运行命令核验 SHA256 哈希值。',
      commandOrAction: 'Get-FileHash -Algorithm SHA256 .\\Clash.Verge_1.7.7_x64_zh-CN.msi',
      successIndicator: '输出的 Hash 字符串与官方发布页面提供的校验清单完全一致。',
      rollbackTip: '若哈希不符，说明下载过程中存在数据丢失或劫持，立即删除并更换网络重新下载。'
    },
    {
      stepNumber: 2,
      title: '运行 Windows Installer 安装向导',
      description: '双击该 .msi 文件。Windows 弹出 UAC 提权提示，点击「是」。建议保持默认路径 C:\\Program Files\\Clash Verge 并点击「下一步」，直至安装完成。',
      successIndicator: '桌面生成 Clash Verge 快捷图标，开始菜单新增应用条目。'
    },
    {
      stepNumber: 3,
      title: '首次启动与内核状态核对',
      description: '双击启动 Clash Verge。软件自动在任务栏右下角生成蓝色托盘图标。点击左侧菜单底部的「设置 (Settings)」，核对第一项「内核选择 (Clash Core)」当前是否处于【Mihomo】。',
      successIndicator: '内核版本显示为 Mihomo v1.18.x 或更高版本，右侧显示绿色运行指示。',
      rollbackTip: '如果显示 Alpha 或 Clash 内核，手动将其切换为 Mihomo 并点击保存重启。'
    },
    {
      stepNumber: 4,
      title: '安装服务模式 (Service Mode)',
      description: '在设置页面下滑至「服务模式 (Service Mode)」，点击右侧的「安装」按钮。系统弹出管理员凭据授权，点击「是」。安装成功后，服务模式指示灯由灰色变为明亮绿色。',
      successIndicator: '提示“服务安装成功”，状态显示为“已安装 (Installed)”。',
      rollbackTip: '若提示 Install Failed，右键以管理员身份重新启动 Clash Verge 客户端后再试。'
    },
    {
      stepNumber: 5,
      title: '开机自启与系统托盘驻留设置',
      description: '在常规设置中开启「开机自启动」、「静默启动（启动时不弹出主窗口）」及「点击关闭按钮时最小化到托盘」。',
      successIndicator: '点击主窗口右上角的 X 号，主界面平滑收起至系统托盘，不中断后台连接。'
    }
  ]"
/>

---

## 4. 首次启动环境验收测试

安装并配置好服务后，在尚未导入任何机场订阅的情况下，可以通过以下三项验收测试确认底层环境完好：

```
[验收测试 1: 核心监听端口测试]
打开浏览器，访问 http://127.0.0.1:7890
预期结果: 浏览器页面返回带有 "clash" 或 404/Empty 的响应，证明 Mihomo 核心已成功绑定 7890 端口并接管 HTTP 流量。

[验收测试 2: Windows 服务状态测试]
在 PowerShell 中运行: Get-Service -Name "clash_verge_service"
预期结果: Status 显示为 "Running"，StartType 为 "Automatic"。

[验收测试 3: 虚拟网络适配器就绪测试]
在客户端主界面临时开启「TUN 模式」开关。
打开 Windows 终端运行: Get-NetAdapter -Name "*wintun*"
预期结果: 网络适配器列表中出现名为 "Mihomo" 或 "Wintun Userspace Tunnel" 的虚拟网卡，状态显示为 "Up"。验证完成后可先关闭 TUN，等待导入订阅后再正式开启。
```

---

## 5. 真实案例与技术故障预防

### 5.1 案例：Windows Defender 阻止 Wintun 驱动注册
某 Windows 11 专业版用户在执行步骤 4 安装服务模式时，弹窗提示“Service Installed Successfully”，但一旦开启 TUN 模式，Windows 即刻断网，系统日志记录 `Event ID 7000: The wintun service failed to start`。
- **故障原因**：该用户的 Windows Defender 开启了“受保护的文件夹访问权限 (Controlled Folder Access)”及严格的驱动强制签名策略，将 Wintun 临时驱动释放文件（位于系统驱动缓存中）隔离处理。
- **正规解决方案**：打开 Windows 安全中心 ->「应用和浏览器控制」->「基于声誉的保护设置」，将 Clash Verge 安装目录及 `%LOCALAPPDATA%\clash-verge` 添加至防病毒排除项中，随后重新点击服务模式安装，故障彻底消除。

---

## 6. 常见问答 (FAQ)

<FAQSection 
  :faqs="[
    {
      question: '为什么安装后界面只有英文，怎么改成简体中文？',
      answer: '点击左侧导航栏的「Settings（齿轮图标）」，在「General（常规）」设置区中找到「Language（语言）」下拉菜单，将其由 English 切换为「中文 (简体)」，界面即可瞬间完成热切换，无需重启软件。'
    },
    {
      question: '装好之后，右下角托盘图标突然变成了灰色或者消失了是怎么回事？',
      answer: '托盘图标变灰或消失，通常意味着底层的 Mihomo 核心进程发生意外崩溃并自动退出了。请检查：1. 本地 7890 或 9090 端口是否在启动后被迅雷、网易云等软件中途抢占；2. 杀毒软件是否在后台误拦截了 clash-meta.exe。'
    },
    {
      question: '我的电脑是 Windows 10，能完全照着这篇教程操作吗？',
      answer: '完全可以。Clash Verge Rev 对 Windows 10 (1809 及以上) 提供了完全等同的兼容支持。唯一需要注意的是，部分精简版或老旧版本的 Windows 10 缺少系统自带的 Microsoft Edge WebView2 Runtime，安装前需前往微软官方下载并安装 WebView2 独立安装包。'
    }
  ]"
/>

<SourceList 
  :sources="[
    { title: 'Clash Verge Rev 官方文档与安装指南', url: 'https://github.com/clash-verge-rev/clash-verge-rev', sourceType: '官方仓库', verifiedDate: '2026-10-21' },
    { title: 'Wintun 虚拟网卡底层驱动官方规范', url: 'https://www.wintun.net/', sourceType: '官方驱动主页', verifiedDate: '2026-10-21' }
  ]"
/>

<RelatedTasks 
  :tasks="[
    { title: 'Clash YAML 配置文件阅读指南', url: '/subscription/clash-yaml/', taskType: 'subscription', description: '下一步：学习如何正确导入并配置订阅文件' },
    { title: 'TUN 模式与系统代理深入对比', url: '/subscription/tun/', taskType: 'subscription', description: '深入理解虚拟网卡接管系统全部流量的原理' },
    { title: '解决已连接但无法上网的问题', url: '/troubleshooting/no-internet/', taskType: 'troubleshooting', description: '若开启代理后网页打不开时的急救排查步骤' }
  ]"
/>
