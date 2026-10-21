---
title: "报错“bind: address already in use: 7890”端口占用诊断与解决"
description: "彻底解决 Clash Verge Rev 与主流客户端启动时提示“bind: address already in use: 7890”报错。包含 PowerShell 定位占用 PID、结束僵尸进程、修改混合端口及防范 Hyper-V 端口保留的系统级方案。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# 报错“bind: address already in use: 7890”端口占用诊断与解决

<Breadcrumbs :crumbs="[
  { title: '故障排查', url: '/troubleshooting/' },
  { title: '客户端启动失败', url: '/troubleshooting/startup/' },
  { title: '端口 7890 冲突诊断' }
]" />

<AnswerFirst 
  conclusion="报错「bind: address already in use: 7890」的根本原因，是当前 Windows 系统的 TCP 协议栈中，已经有另一个正在运行的程序抢先独占绑定了本地 127.0.0.1 的 7890 端口。排查与修复的标准方案只需两步：首先在 PowerShell 中运行 netstat 命令查出霸占该端口的进程标识符 (PID) 并强制结束；如果该端口被 Windows 系统组件（如 Hyper-V 动态端口保留池）独占，则直接在客户端设置中将端口修改为 7895 或 17890 即可一劳永逸解除冲突。"
  scope="Windows 10 / Windows 11 · 适用软件: Clash Verge Rev / 原版 CFW / FlClash"
  verdict="优先杀掉后台残留的僵尸 clash-meta.exe 进程；频繁冲突则直接更换端口号。"
/>

---

## 1. 端口冲突的底层成因与三类幕后元凶

在 TCP/IP 规范中，一个指定的本地 IP 接口与端口组合（如 `127.0.0.1:7890`）在同一时刻只能由一个套接字 (Socket) 进行 `LISTEN` 监听。当代理核心尝试启动并调用操作系统的 `bind()` 系统函数时，如果操作系统发现该端口处于非空闲状态，便会拒绝请求并抛出 `WSAEADDRINUSE (10048)` 错误，也就是前端日志中呈现的：

```
[FATAL] Start Clash core error: start Mixed(mixed-port): listen tcp 127.0.0.1:7890: bind: address already in use
```

在日常 Windows 使用中，霸占 7890 端口的元凶通常可以归纳为以下三类：

```
+------------------------------------------------------------------------+
| 元凶 A: 上一次异常退出的代理客户端残留的“僵尸核心” (占 70%)               |
| - 现象: 之前点击了关闭窗口，前端 UI 消失了，但底层的 clash-meta.exe 进程   |
|   因某些原因在后台死锁挂起，依然霸占着 7890 端口不释放。                   |
+------------------------------------------------------------------------+
                                   ▲
                                   │
+------------------------------------------------------------------------+
| 元凶 B: 电脑上同时安装并运行了第二个代理软件 (占 20%)                     |
| - 现象: 电脑同时开着原版 Clash for Windows、v2rayN 或其他一键翻墙器，      |
|   它们默认都在抢夺 7890 端口。                                          |
+------------------------------------------------------------------------+
                                   ▲
                                   │
+------------------------------------------------------------------------+
| 元凶 C: Windows Hyper-V / WSL2 动态排除端口范围 (占 10%)                 |
| - 现象: 电脑安装了 WSL2 或 Docker Desktop，Windows 开机时随机将 7890     |
|   划入了系统保留端口段 (Excluded Port Range)，普通用户程序无法绑定。    |
+------------------------------------------------------------------------+
```

---

## 2. 诊断与排查决策树

面对此报错时，请严格按照以下决策树执行操作：

```
[启动弹出 bind: address already in use: 7890 报错]
                     │
                     ▼
  [以管理员身份打开 PowerShell 运行 netstat 命令]
  netstat -ano | findstr "7890"
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
 [查到具体的占用 PID]     [输出为空，未查到任何 PID]
         │                       │
         ▼                       ▼
在任务管理器中查看该 PID:    检查 Windows 动态保留端口段:
- 如果是 clash-meta.exe       netsh interface ipv4 show excludedportrange protocol=tcp
  -> 强制结束该任务          如果 7890 落在保留范围内:
- 如果是未知软件/网易云/迅雷    -> 方案二: 修改 Clash 端口为 7895
  -> 更改该软件配置或结束它
```

---

## 3. 标准处理实操步骤 (两种彻底修复方案)

### 方案一：通过 PowerShell 定位并强制结束占用进程 (立即可逆)
1. **打开终端**：右键点击 Windows 11 开始按钮，选择「终端（管理员）」或「PowerShell（管理员）」。
2. **查询占用端口的进程 ID (PID)**：
   ```powershell
   netstat -ano | findstr ":7890"
   ```
   输出结果示例：
   ```text
   TCP    127.0.0.1:7890         0.0.0.0:0              LISTENING       14820
   ```
   最后一列的数字 `14820` 即为当前霸占该端口的进程 PID。
3. **根据 PID 查询具体软件名称**：
   ```powershell
   tasklist | findstr "14820"
   ```
   输出通常会显示为 `clash-meta.exe` 或 `clash-verge.exe`。
4. **强制终止该进程释放端口**：
   ```powershell
   taskkill /F /PID 14820
   ```
   终端提示“成功终止 PID 为 14820 的进程”。此时重新打开 Clash Verge，核心即可成功绑定端口并恢复绿色运行状态。

---

### 方案二：在客户端内修改混合端口 (一劳永逸彻底规避)
如果你经常遇到端口被系统组件临时保留，最稳妥的方式是修改客户端的默认监听端口：
1. **进入设置界面**：在 Clash Verge Rev 主界面点击左侧「设置 (Settings)」。
2. **修改 Mixed Port**：找到「混合端口 (Mixed Port)」，默认数值通常为 `7890`。将其修改为一个极少被系统占用的自定义高位端口，例如 `7895`、`17890` 或 `27890`。
3. **点击保存并重启内核**：修改完成后，客户端将重新以新的端口拉起 Mihomo 核心。
4. **注意配套检查**：如果之前在 Chrome 插件（如 SwitchyOmega）或终端环境变量中硬编码了 `127.0.0.1:7890`，修改后需同步在插件设置中将端口更新为新的数值（如 `7895`）。

---

## 4. 常见问答 (FAQ)

<FAQSection 
  :faqs="[
    {
      question: '为什么任务管理器里找不到 netstat 查出来的那个 PID？',
      answer: '这通常是因为该端口被具有高权限的系统内核级驱动（如 Windows NAT 驱动或杀毒软件网络过滤服务）占用。此时无需强行寻找系统进程，直接采用方案二，在 Clash 设置中将端口修改为 7895 即可轻松绕过。'
    },
    {
      question: '把端口从 7890 改成 7895 后，会不会影响我的节点速度？',
      answer: '完全不会。7890 或 7895 只是你的电脑内部不同应用程序（如浏览器与代理客户端）之间在本地回环通信 (127.0.0.1) 的门牌号，与境外节点服务器的实际物理传输速度没有任何因果关系。'
    },
    {
      question: '每次开机都报错 7890 端口被占用，怎么彻底根治？',
      answer: '如果每次开机都固定复现，说明你的电脑中安装了设置了开机自启动的其他代理工具（如开机自启的旧版 CFW 或某些网游加速器）。打开任务管理器的「启动应用」标签页，禁用所有不需要的代理软件自启项，仅保留当前主力客户端即可根治。'
    }
  ]"
/>

<SourceList 
  :sources="[
    { title: 'Microsoft TCP/IP 端口排他性与保留范围说明', url: 'https://learn.microsoft.com/troubleshoot/windows-server/networking/default-dynamic-port-range-tcpip-chang', sourceType: '微软官方支持库', verifiedDate: '2026-10-21' },
    { title: 'Mihomo 核心 Inbound 监听配置规范', url: 'https://wiki.metacubex.one/config/inbound/', sourceType: '官方核心文档', verifiedDate: '2026-10-21' }
  ]"
/>

<RelatedTasks 
  :tasks="[
    { title: 'Clash Verge Rev 安装与服务模式配置', url: '/install/clash-verge-rev-windows-setup-walkthrough/', taskType: 'install', description: '核对正确的 Windows 11 安装步骤' },
    { title: '已连接但无法上网故障排查', url: '/troubleshooting/no-internet/', taskType: 'troubleshooting', description: '端口修复后如果依然无法联网的下一步排查' },
    { title: '关代理后彻底断网的紧急恢复', url: '/troubleshooting/turn-off-proxy-and-lose-internet-completely/', taskType: 'troubleshooting', description: '学习如何快速重置 Windows 注册表残留代理' }
  ]"
/>
