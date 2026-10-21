---
title: "安装教程：全平台代理客户端安装、初始化与卸载"
description: "提供 Windows、macOS、Android、iOS 及 Linux 平台的代理客户端标准安装教程、权限授予说明、服务模式部署与完全干净卸载方案。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# 客户端安装、系统权限与生命周期管理指南

<Breadcrumbs :crumbs="[{ title: '安装教程', url: '/install/' }]" />

<AnswerFirst 
  conclusion="代理客户端的安装核心在于两点：正确配置系统基础依赖（如 Windows 下的 VC++ 运行库或 .NET 运行时），以及按需授予系统级网络权限（如 Windows 服务模式、macOS 网络扩展、Android VpnService）。安装完成后需立即核验本地监听端口与托盘图标状态，确保环境纯净后再进行订阅导入。"
  scope="Windows 10/11 · macOS 11+ · Android · iOS · Linux systemd"
  verdict="严禁在未彻底清理旧客户端系统代理的情况下直接安装新客户端，以防网络死锁。"
/>

---

## 1. 安装前的三大环境准备与排障

在点击任何客户端安装包前，请依次确认以下三项系统前置条件：

### 1.1 释放常见本地代理端口
主流客户端默认监听以下本地端口，若被其他正在运行的程序占用会导致核心启动失败：
- `7890` (混合端口 Mixed-port，常见于 Clash 系)
- `10808` / `10809` (Socks / HTTP 代理端口，常见于 v2rayN)
- `9090` (Clash 外部控制 External Controller API 端口)

可在 PowerShell 中运行命令检查端口状态：
```powershell
netstat -ano | findstr "7890"
```

### 1.2 确认基础运行库就绪
- **Clash Verge Rev (Tauri 架构)**：Windows 10 需确保内置或已安装 `WebView2 Runtime`。
- **v2rayN (.NET 架构)**：系统必须安装 `Microsoft .NET Desktop Runtime 8.0 (x64)`。
- **C++ 底层依赖**：建议在 Windows 下安装 `Microsoft Visual C++ 2015-2022 Redistributable (x64)`。

---

## 2. 核心客户端标准安装流程 (以 Clash Verge Rev 为例)

<VersionScope 
  targetVersion="1.7.7"
  osScope="Windows 10 (1809+) / Windows 11 Pro 64位"
  verifiedAt="2026-10-21"
  deprecatedVersions="已废弃对 Windows 7 / 8.1 的官方支持"
/>

<SetupSteps 
  :steps="[
    {
      stepNumber: 1,
      title: '解压或运行官方安装包',
      description: '双击运行官方安装包 Clash.Verge_1.7.7_x64_zh-CN.msi。建议选择默认路径或安装在非系统盘的纯英文目录（如 D:\\Tools\\ClashVerge）。严禁路径中包含中文或特殊空格字符。',
      successIndicator: '安装向导完成，未弹出文件写入权限被拒绝报错。',
      rollbackTip: '若安装被杀毒软件拦截，请在杀毒软件弹窗中选择“允许程序所有操作”或加入信任白名单。'
    },
    {
      stepNumber: 2,
      title: '首次启动与界面语言设置',
      description: '从开始菜单启动 Clash Verge。首次启动后右下角系统托盘将出现蓝色 Verge 图标。左侧导航栏点击「设置 (Settings)」，核对默认核心是否显示为 Mihomo。',
      successIndicator: '主界面正常加载，无白屏；核心版本号正常显示（如 Mihomo v1.18+）。',
      rollbackTip: '若界面出现白屏，重启软件或按 Ctrl+R 强制刷新前端渲染视图。'
    },
    {
      stepNumber: 3,
      title: '安装服务模式 (Service Mode)',
      description: '在设置页面找到「服务模式 (Service Mode)」，点击右侧的「安装」按钮。系统将弹出 UAC 提权请求，点击「是」允许程序注册 Windows 系统服务。',
      successIndicator: '服务模式状态指示灯变为绿色，右侧显示“已安装 / 运行中”。',
      rollbackTip: '若提示安装失败，尝试以系统管理员身份右键运行 Clash Verge 后重试。'
    },
    {
      stepNumber: 4,
      title: '开机自启与系统托盘驻留',
      description: '在常规设置中开启「开机自启动」与「静默启动」，并勾选「关闭窗口时最小化到系统托盘」。',
      successIndicator: '点击右上角关闭按钮，软件界面隐藏，托盘图标持续常驻运行。'
    }
  ]"
/>

---

## 3. 系统权限授予与底层机制解析

不同操作系统对网络接管具有不同的安全边界，理解这些权限有助于排查授权故障：

```
[Windows 平台]
普通运行 ──> 仅能修改 IE/WinINet 系统代理设置 (局域网与终端无法透明接管)
提权安装服务 ──> 注入 Wintun 虚拟网卡驱动 ──> 具备接管全系统 IP 报文能力 (TUN)

[macOS 平台]
普通 App ──> 受系统沙盒限制
系统偏好设置 ──> 辅助功能与网络扩展授权 ──> 创建虚拟 utun 设备接管流量

[Android 平台]
请求 android.permission.BIND_VPN_SERVICE ──> 系统弹出带钥匙图标的 VPN 确认弹窗
关闭电池优化 (Doze Mode) ──> 防止屏幕熄灭后核心进程被后台直接杀死
```

---

## 4. 彻底干净卸载与网络急救方案

如果不慎直接删除了客户端文件夹，常会导致系统代理残留，出现“关掉客户端后所有网页都打不开”的死锁状态。请按照以下步骤完全恢复：

### 4.1 彻底清理残余数据目录
除了删除主程序，还需清理本地生成的配置缓存：
- Windows: `%APPDATA%\clash-verge` 或 `%LOCALAPPDATA%\Programs\v2rayN`
- macOS: `~/Library/Application Support/clash-verge`

### 4.2 紧急恢复 Windows 注册表代理
若电脑彻底断网，在 PowerShell 中执行以下两条命令，强制重置系统代理：
```powershell
Set-ItemProperty -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings' -Name ProxyEnable -Value 0
Set-ItemProperty -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings' -Name ProxyServer -Value ''
```
执行后刷新浏览器，电脑网络即可瞬间恢复直连。

---

## 5. 二级专题深度索引

本栏目下设 10 个深度二级专题，覆盖从单项客户端搭建到软路由固件安装的完整部署教程：

- [Clash Verge Rev 安装](/install/verge-rev/)：Windows/Mac 安装、首次启动与服务模式
- [v2rayN 安装](/install/v2rayn/)：.NET 8 环境搭建、解压路径与双核心初始化
- [v2rayNG 安装](/install/v2rayng/)：Android 侧载 APK、VPN 授权与后台保活
- [Shadowrocket 安装](/install/shadowrocket/)：美区 App Store 获取、证书信任与首启
- [FlClash 安装](/install/flclash/)：跨平台 Flutter 客户端统一安装部署流程
- [Hiddify 安装](/install/hiddify/)：全协议多端初始化与系统集成
- [sing-box 安装](/install/singbox/)：独立 CLI 命令行核心与图形客户端配置
- [系统依赖与安装准备](/install/prerequisites/)：架构检查、运行库修复与端口释放
- [Linux 服务与软路由部署](/install/gateways/)：systemd 服务守护与 OpenClash 手动安装
- [升级、迁移与卸载](/install/lifecycle/)：无损版本升级、回退与注册表残留急救

---

## 6. 常见问答 (FAQ)

<FAQSection 
  :faqs="[
    {
      question: '安装客户端时杀毒软件（如 360 或 Windows Defender）误报木马怎么办？',
      answer: '开源代理工具（特别是包含核心编译二进制文件的压缩包）因具备网络重定向功能，常被杀毒软件的行为分析机制判定为“代理木马 (Proxy.Risk)”。只要你下载的是官方 GitHub Releases 正式发布包并核验了哈希，可安全加入杀软的信任排除项。'
    },
    {
      question: '为什么一定要安装服务模式 (Service Mode) 才能开 TUN？',
      answer: 'TUN 模式需要在操作系统底层创建虚拟网络适配器 (Wintun)，这涉及到对系统路由表和低层驱动的直接控制。在没有系统服务守护的情况下，普通权限的应用无法维持虚拟网卡的常驻稳定性。'
    },
    {
      question: '安装完软件后，为什么还是打不开 Google 或 YouTube？',
      answer: '安装客户端只是完成了“工具准备”。此时软件内没有任何可用的服务器节点。请继续前往「订阅配置」栏目，导入合法的订阅链接并选择节点后方可正常使用。'
    }
  ]"
/>

<RelatedTasks 
  :tasks="[
    { title: '订阅配置与导入指南', url: '/subscription/links/', taskType: 'subscription', description: '学习如何向客户端导入 YAML 或 Base64 订阅' },
    { title: '客户端启动失败排查', url: '/troubleshooting/startup/', taskType: 'troubleshooting', description: '诊断端口冲突、服务未启动与闪退故障' },
    { title: 'TUN 虚拟网卡与系统代理对比', url: '/subscription/tun/', taskType: 'subscription', description: '深入理解全局流量接管与性能表现' }
  ]"
/>
