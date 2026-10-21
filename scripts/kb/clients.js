// Clients Knowledge Base (10 topics)
export const clientsKB = {
  'windows': {
    cot: `### 1.1 Windows 客户端架构选型与安装包形态深度推导

Windows 是桌面代理客户端最庞大、软硬件生态最复杂的操作系统。

从 Windows 驱动模型与打包技术深入推导：
1. **安装版（Setup.exe）与便携版（Portable.zip）本质区别**：
   - 安装版会自动注册系统开始菜单快捷方式、配置开机自启注册表启动项，并拥有向 \`System32\\drivers\` 目录安装 Wintun 虚拟网卡驱动的默认特权。
   - 便携版将所有配置文件与运行日志存放在程序自身目录下，不污染系统注册表，非常适合放置在 U 盘随身携带或无系统管理员权限的办公机使用，但需要手动处理驱动加载。
2. **x64 与 ARM64 原生架构匹配**：
   - 绝大多数 PC 采用 Intel / AMD x64 处理器；新一代高通骁龙 X Elite 笔记本（Windows on ARM）必须下载原生 ARM64 版本，避免模拟器转译带来的 20%+ CPU 开销与电池额外损耗。`,
    code: `\`\`\`powershell
# 1. 检查当前 Windows 操作系统的真实处理器架构
$arch = (Get-CimInstance Win32_OperatingSystem).OSArchitecture
Write-Host "当前系统架构: $arch"
if ($arch -eq "64-bit") {
    Write-Host "推荐下载并安装 x64 版本安装包" -ForegroundColor Green
} elseif ($arch -like "*ARM*") {
    Write-Host "推荐下载并安装 arm64 原生版本安装包" -ForegroundColor Cyan
}

# 2. 检查系统是否已就绪 WebView2 运行环境
Get-ItemProperty HKLM:\\Software\\WOW6432Node\\Microsoft\\EdgeUpdate\\Clients\\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5} -ErrorAction SilentlyContinue | Select-Object pv
\`\`\``,
    decisionTree: `\`\`\`
[Windows 客户端选型决策]
   │
   ├─► 是否为主力固定电脑？
   │      ├─ 是 ──► 首选【Clash Verge Rev x64 安装版】(开箱即用，支持一键服务模式)
   │      └─ 否 (临时机/U盘) ──► 首选【便携绿色版 Portable.zip】
   │
   ├─► 是否为高通骁龙 ARM 笔记本？
   │      └─ 必须下载 arm64 专属架构包
   │
   └─► 认准官方 GitHub 仓库下载，绝不使用未经核验的第三方整合版
\`\`\``,
    benchmarkTable: `| 客户端包形态 | 系统特权获取 | 升级便捷度 | 适用人群 |
| :--- | :---: | :---: | :--- |
| **安装版 (Setup.exe)** | **自动集成 Service Mode** | **自动检测覆盖** | **95% 普通用户首推标准形态** |
| **便携版 (Portable.zip)** | 需手动放置 Wintun 驱动 | 需手动解压迁移配置 | 移动办公、U 盘随身、无管理员权限 |`,
    gotchas: `1. **安装路径切忌包含中文和空格**：路径若包含中文字符会导致底层核心在启动时读取配置文件抛出编码异常崩溃。`,
    faqs: [
      { question: 'Windows 10/11 安装提示“Windows 已保护你的电脑 (SmartScreen)”，怎么办？', answer: '这是因为开源开源未购买微软昂贵的企业数字签名证书。点击【更多信息】，再点击【仍要运行】即可正常安装。' }
    ]
  },

  'android': {
    cot: `### 1.1 Android 客户端分发与后台保活底层推导

Android 系统的碎片化与各家手机厂商对电池后台的激进优化，是 Android 代理工具稳定性的最大考验。

从 Android 沙盒与 VPNService 机制推导：
1. **Google Play 商店版 vs GitHub 原生 APK 差异**：
   - 遵循 Google 政策，Play 商店版客户端受严格权限审查限制，某些高阶内核调试接口可能被裁剪；
   - GitHub Releases 发布的独立 Full APK 包含完整的原生核心与最新协议特性，推荐首选直接安装官方 GitHub 原生发布包。
2. **系统级的电池省电与后台保活拦截**：
   - 国产安卓系统（MIUI/HyperOS、OriginOS、ColorOS、HarmonyOS）默认会在灭屏数分钟后无情清理后台未加白名单的第三方 VPN 进程，导致外网频繁掉线。`,
    code: `\`\`\`text
[Android 后台持久保活必备三步]
1. 进入系统【设置】->【应用管理】-> 找到 v2rayNG 或 FlClash
2. 将【省电策略 / 电池优化】更改为【无限制 / 不优化】
3. 开启系统的【自启动权限】，并在多任务后台界面长按该应用卡片点击【加锁】
\`\`\``,
    decisionTree: `\`\`\`
[Android 客户端选择决策]
   │
   ├─► 追求简单直观稳定？
   │      ├─ 是 ──► 首选【v2rayNG】(生态成熟，省电，全协议支持)
   │      └─ 否 ──► 追求界面美观可选【FlClash】或【Clash Meta for Android】
   │
   └─► 必须配置系统后台白名单，确保灭屏不断流
\`\`\``,
    benchmarkTable: `| Android 客户端 | 核心引擎 | 耗电控制 | 界面友好度 | 适合协议 |
| :--- | :--- | :---: | :---: | :--- |
| **v2rayNG** | Xray-core | **极佳 (< 3% 耗电)** | 经典实用 | VLESS Reality / VMess / SS |
| **FlClash** | Mihomo | 良好 | **⭐⭐⭐⭐⭐ 极美现代 UI** | Clash YAML 订阅 |
| **Clash Meta Android** | Mihomo | 良好 | 较硬核 | 极客高级分流 |`,
    gotchas: `1. **开启了双 WiFi 加速导致代理异常**：部分手机的“双通道加速”功能会绕过本地 VPN 接口分流。`,
    faqs: [
      { question: '安卓手机连上代理后，状态栏显示钥匙图标正常吗？', answer: '完全正常。钥匙或锁链图标代表当前系统底层标准的 VpnService 网络扩展正在安全接管网络流量。' }
    ]
  },

  'ios': {
    cot: `### 1.1 iOS 客户端生态与分发闭环深度推导

iOS 系统的沙盒严格隔离策略与 App Store 区域审核政策，决定了其获取与使用机制的独特性。

从系统接口与外区分发逻辑推导：
1. **NetworkExtension 框架与 On-Demand**：
   - iOS 所有的代理工具均通过苹果官方的 \`NetworkExtension\` 框架构建，以极其省电的底层原生代码运行在受控内存区。
2. **非国区 Apple ID 的必要性**：
   - 由于合规政策，中国大陆地区的 App Store 无法上架任何科学上网工具。用户必须自备外区（美区、日区、港区）Apple ID 才能下载正版成熟工具。`,
    code: `\`\`\`text
[iOS 官方正版获取标准流程]
1. 在浏览器注册一个属于自己的免税区美区 Apple ID (免信用卡绑定)
2. 在 App Store 退出国区账号，登录美区账号
3. 购买美区 Apple 礼品卡充值，以 $2.99 官方正版购买 Shadowrocket (小火箭)
4. 打开小火箭扫码或粘贴订阅链接，享受终身极速更新
\`\`\``,
    decisionTree: `\`\`\`
[iOS 客户端选型决策]
   │
   ├─► 性价比与上手难易度
   │      ├─ 首选【Shadowrocket (小火箭)】($2.99，全协议通吃，维护极勤奋)
   │      └─ 极客深度分流可选【Loon】或【Quantumult X】
   │
   └─► 坚决不用来路不明的共享 ID 下载免费盗版，谨防锁机敲诈
\`\`\``,
    benchmarkTable: `| 客户端名称 | App Store 价格 | 协议支持覆盖 | 易用度 | 耗电表现 |
| :--- | :---: | :---: | :---: | :---: |
| **Shadowrocket (小火箭)** | **$2.99** | **全协议顶级覆盖** | **极高 (扫码即用)** | **极佳 (日常 < 2%)** |
| **Quantumult X (圈X)** | $7.99 | 强大脚本支持 | 中等 (需懂配置) | 优异 |
| **Surge iOS** | $49.99+ | 极致专业诊断 | 极专业 | 顶级 |`,
    gotchas: `1. **切勿在系统【设置】中直接登录陌生共享 Apple ID**：若在 iPhone 主设置中登录了别人的 ID，手机可能被恶意远程锁机勒索！下载软件只需在【App Store】应用内登录即可。`,
    faqs: [
      { question: '买过一次 Shadowrocket，以后换新 iPhone 还需要再花钱吗？', answer: '不需要。只要在新手机上登录你购买过该软件的同一个 Apple ID，进入已购项目直接免费重新下载即可。' }
    ]
  },

  'macos': {
    cot: `### 1.1 macOS 架构分发与系统权限深度推导

macOS 正在全面转向 Apple Silicon（M1/M2/M3/M4）芯片生态，同时伴随 Gatekeeper、SIP 与系统扩展的严苛安全防线。

从 Darwin 内核与权限机制深入推导：
1. **Apple Silicon 原生 ARM64 与 Rosetta 2 转译损耗**：
   - 运行原生编译的 ARM64 版本代理客户端，不仅握手吞吐效率提升 30%，且完全不消耗 Rosetta 2 转译指令集的额外内存与电量。
2. **清除 Gatekeeper 隔离属性**：
   - macOS 从网上下载的 dmg 在挂载运行时，系统会自动给文件附加 \`com.apple.quarantine\` 扩展属性，导致弹出“已损坏，无法打开”的误报提示。通过终端命令清除该属性即可正常运行。`,
    code: `\`\`\`bash
# 解决 macOS 提示“已损坏，无法打开”或未签名拦截命令
sudo xattr -rd com.apple.quarantine "/Applications/Clash Verge.app"

# 检查当前 Mac 处理器的实际芯片架构
uname -m
# 返回 arm64 代表 Apple Silicon 芯片；返回 x86_64 代表老款 Intel 芯片
\`\`\``,
    decisionTree: `\`\`\`
[macOS 客户端选型决策]
   │
   ├─► 芯片架构判断：
   │      ├─ M1/M2/M3/M4 芯片 ──► 必须下载带有 aarch64 或 arm64 标识的 dmg
   │      └─ Intel 芯片 ──► 下载 x64 版本 dmg
   │
   └─► 推荐客户端：Clash Verge Rev (macOS 原生版，支持菜单栏托盘与服务模式)
\`\`\``,
    benchmarkTable: `| 架构构建包 | 适用机型 | 能效表现 | 吞吐损耗 |
| :--- | :--- | :---: | :---: |
| **ARM64 原生 dmg (推荐)** | **Apple Silicon (M系列处理器)** | **待机 CPU 占用 0.1%** | **0 额外损耗** |
| **x86_64 构建包** | 老款 Intel Mac | 正常 | 正常 |
| **x86_64 强行跑在 M 芯片** | M 系列芯片 | 需 Rosetta 2 转译 | 额外消耗 15% 内存 |`,
    gotchas: `1. **未在“隐私与安全性”中授权**：首次启动若被系统拦截，必须进入 Mac【系统设置】->【隐私与安全性】，向下滚动点击【仍要打开】。`,
    faqs: [
      { question: 'Mac 电脑每次开机都要手动去开代理吗？', answer: '在 Clash Verge Rev 设置中勾选【开机启动 (Auto Launch)】以及【静默启动 (Silent Start)】，每次开机后软件就会自动常驻在顶部菜单栏静默服务。' }
    ]
  },

  'linux': {
    cot: `### 1.1 Linux 桌面与无头服务器客户端底层推导

Linux 系统在开发者、数据中心与自动化测试中占据绝对统治地位，其代理机制更侧重于 systemd 守护进程与无头（Headless）运行。

从 Linux 网络栈推导：
1. **systemd 服务守护与持久化**：
   - 在没有图形界面的 Ubuntu / Debian 服务器上，直接运行二进制并在后台脱离终端，需要将其包装为标准的 systemd service，配置开机自启、崩溃自动重启与日志轮转。
2. **iptables / nftables 透明代理重定向**：
   - 通过 TPROXY 或 REDIRECT 模块，将进出服务器的指定端口流量透明重定向至本地代理监听端口。`,
    code: `\`\`\`ini
# /etc/systemd/system/mihomo.service 系统服务自启范本
[Unit]
Description=Mihomo Daemon Service
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/local/bin/mihomo -d /etc/mihomo
Restart=on-failure
RestartSec=5s
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
\`\`\``,
    decisionTree: `\`\`\`
[Linux 客户端部署决策]
   │
   ├─► 有桌面图形环境 (Ubuntu Desktop / Arch)？
   │      ├─ 是 ──► 可安装 Clash Verge Rev AppImage 或 deb 包
   │      └─ 否 ──► 纯服务器终端环境
   │
   └─► 无头服务器首选：部署独立二进制 mihomo 或 sing-box 并注册 systemd 服务
\`\`\``,
    benchmarkTable: `| Linux 部署形态 | 图形界面依赖 | 资源占用 | 适合场景 |
| :--- | :---: | :---: | :--- |
| **systemd + 核心二进制** | **完全无依赖** | **极低 (< 30MB)** | **云服务器、Docker 宿主机、软路由** |
| **AppImage 桌面客户端** | 依赖桌面环境 | ~80MB | Ubuntu / Fedora 个人工作站 |`,
    gotchas: `1. **权限不足导致 1024 以下低端口无法绑定**：若使用非 root 运行代理核心，需通过 \`setcap 'cap_net_bind_service=+ep' /path/to/binary\` 赋予网络特权。`,
    faqs: [
      { question: 'Linux 服务器上怎么给 curl 和 wget 配置代理？', answer: '在 \`~/.bashrc\` 中添加 \`export http_proxy=http://127.0.0.1:7890\` 和 \`export https_proxy=http://127.0.0.1:7890\`，执行 \`source ~/.bashrc\` 即可立即生效。' }
    ]
  },

  'routers': {
    cot: `### 1.1 软路由与网络设备（OpenWrt/OpenClash）底层推导

软路由是实现全屋所有家庭智能设备（手机、PC、智能电视、游戏主机）无感全局分流的终极形态。

从路由固件与硬件架构推导：
1. **处理器架构与加密指令集匹配**：
   - x86 软路由（Intel J4125、N100）支持原生 AES-NI 硬件加密加速指令集，处理百兆高并发加密流量 CPU 占用不足 5%；
   - ARM 架构硬路由（联发科 Filogic 820、高通 IPQ 系列）必须选择对应架构编译的 ipk 插件（如 aarch64_cortex-a53）。`,
    code: `\`\`\`bash
# 在 OpenWrt 终端中检查当前硬件架构与核心指令集支持
opkg print-architecture
uname -m
cat /proc/cpuinfo | grep -i "Features"
\`\`\``,
    decisionTree: `\`\`\`
[软路由科学上网方案选择]
   │
   ├─► 追求功能强大与精细分流？
   │      ├─ 首选【OpenClash】(支持丰富规则集与全协议内核)
   │      └─ 轻量极简可选【PassWall】或【ShellCrash】
   │
   └─► 核心注意：正确配置 DNS 转发，防止局域网发生 DNS 环路投毒
\`\`\``,
    benchmarkTable: `| 软路由方案 | 功能丰富度 | 内存与算力开销 | 适用硬件环境 |
| :--- | :---: | :---: | :--- |
| **OpenClash** | **⭐⭐⭐⭐⭐ 顶级丰富** | 中等 (建议 512MB+ 内存) | x86 工控机、高配 ARM 路由 |
| **ShellCrash** | 优异 | 极小 | 各种原厂固件硬路由 |
| **PassWall** | 良好 | 适中 | 经典 OpenWrt 玩家 |`,
    gotchas: `1. **Dnsmasq 端口 53 冲突**：OpenClash 接管本地 DNS 时，若与路由器原生的 Dnsmasq 服务设置不当，会导致局域网设备全部无法解析域名。`,
    faqs: [
      { question: '软路由和电脑端 Clash 可以同时开吗？', answer: '如果软路由已经全局分流，电脑端无需再开启本地客户端。若同时开启，可能导致网络包被二次转发或发生路由环路导致网络变慢。' }
    ]
  },

  'clash-family': {
    cot: `### 1.1 Clash 家族分支演进与项目背景深度推导

2023 年底原版 Clash 核心停更后，社区分化出了多个现代分支，理清分支血缘是避免下载停更旧软件的前提。

从内核血脉演进深度推导：
1. **Mihomo（Clash.Meta）的王者地位**：原版核心停更后，Meta 团队（现重命名为 Mihomo）全面接管了核心代码维护，加入了对 Hysteria 2、Reality、Trojan gRPC 等现代协议的全面支持，成为目前全家族无可争议的事实标准核心。
2. **现代图形界面（Tauri 革命）**：原版 CFW 采用庞大臃肿的 Electron 框架（内存占用 200MB+）。新一代 Clash Verge Rev 采用 Rust 驱动的轻量级 Tauri 框架，界面流畅度与内存控制大幅提升。`,
    code: `\`\`\`text
[Clash 家族演进谱系]
原版 Clash (Dreamacro 核心, 2023 已停更) ──► 坚决淘汰
      │
      ▼
Mihomo (原 Clash.Meta, 活跃维护全能核心)
      │
      ├─► Clash Verge Rev (当前最推荐桌面端, Tauri + 现代 UI)
      ├─► Clash Nyanpasu (二次元猫耳风格桌面端)
      └─► FlClash (Flutter 跨平台多端统一界面)
\`\`\``,
    decisionTree: `\`\`\`
[Clash 家族客户端选择]
   │
   ├─► 电脑桌面端主力：坚决选择【Clash Verge Rev】(生态最繁荣，更新最勤奋)
   ├─► 想要手机与电脑界面统一：选择【FlClash】
   └─► 淘汰警报：若还在使用旧版 Clash for Windows，请立即升级替换
\`\`\``,
    benchmarkTable: `| 客户端分支 | 维护活跃度 | 底层核心 | 框架技术 | 协议更新支持 |
| :--- | :---: | :---: | :---: | :---: |
| **Clash Verge Rev** | **极高 (每周活跃)** | **Mihomo (Meta)** | **Rust + Tauri** | **全协议顶级** |
| **FlClash** | 良好 | Mihomo (Meta) | Flutter | 良好 |
| **旧版 Clash for Windows** | **已死亡停更** | 旧版 Premium | Electron (庞大) | 缺乏新协议 |`,
    gotchas: `1. **百度搜到带病毒的旧版 CFW**：黑灰产常搭建高仿的“Clash 官网”分发内置木马的旧版 CFW，切勿上当。`,
    faqs: [
      { question: '从旧版 CFW 迁移到 Clash Verge Rev 麻烦吗？', answer: '极为简单。只需在 Clash Verge Rev 中点击新建配置，直接粘贴你的机场订阅链接，开启系统代理即可无缝使用，操作逻辑与旧版基本一致。' }
    ]
  },

  'xray-family': {
    cot: `### 1.1 Xray 家族与核心演进谱系推导

Xray 是从 V2Ray 生态中分化出的高性能纯粹技术流分支，致力于提供极致安全与性能的底层协议实现。

从协议演进与核心特性推导：
1. **XTLS 与 VLESS 的起源地**：Xray 团队率先推出了革命性的 XTLS 技术，直接在内核中实现 TLS 数据的零拷贝解密转发，将传统加密开销削减到物理极限。
2. **多核心切换的灵活性**：在 v2rayN 中，用户不仅可以使用 Xray-core，还可随时配置切换为 sing-box-core，根据不同协议自由调度。`,
    code: `\`\`\`bash
# 检查当前安装的 Xray 核心版本号与支持特性
./xray version
# 输出应包含 Xray 的正式 Release 版本号以及所支持的协议清单
\`\`\``,
    decisionTree: `\`\`\`
[Xray 系列客户端使用推荐]
   │
   ├─► Windows 平台首选：【v2rayN】
   ├─► Android 手机首选：【v2rayNG】
   └─► 跨平台多功能调试：可选【NekoBox / NekoRay】
\`\`\``,
    benchmarkTable: `| 工具名称 | 对应核心 | 推荐平台 | 核心特色 |
| :--- | :--- | :--- | :--- |
| **v2rayN** | Xray-core / sing-box | Windows | 经典、稳定、批量测速强大 |
| **v2rayNG** | Xray-core | Android | 安卓端国民级梯子工具 |`,
    gotchas: `1. **核心文件被误报拦截**：更新 Xray 核心时若杀毒软件弹出警告，需在排除项中放行。`,
    faqs: [
      { question: 'v2rayN 怎么切换 Xray 核心和 sing-box 核心？', answer: '在 v2rayN 顶部菜单进入【设置】->【参数设置】->【核心类型】，即可根据当前节点协议在 Xray 与 sing-box 之间一键切换。' }
    ]
  },

  'singbox-family': {
    cot: `### 1.1 sing-box 家族产品矩阵与跨平台构建推导

sing-box 正在构建一个涵盖 CLI 命令行、图形客户端与移动端的现代化统一架构平台。

从模块化与跨平台架构推导：
1. **单一核心、全端覆盖**：无论是在 Android、iOS、macOS、Windows 还是 Linux 上，底层均复用同一套高度经过优化的 Go 语言网络转发引擎。
2. **实验性特性与快速演进**：sing-box 往往能在第一时间实现最新协议规范的实验性草案（如 TUIC、ECH、Warp 原生接入）。`,
    code: `\`\`\`bash
# 运行 sing-box 格式化与自动化检查命令
sing-box format -c config.json -w
sing-box check -c config.json
\`\`\``,
    decisionTree: `\`\`\`
[sing-box 家族工具选型]
   │
   ├─► 追求简单图形界面：选择【Hiddify】或【sing-box 官方 GUI】
   └─► 软路由/服务器透明网关：选择【sing-box 原生 CLI 核心】
\`\`\``,
    benchmarkTable: `| 客户端形态 | 面向人群 | 优点 | 缺点 |
| :--- | :--- | :--- | :--- |
| **sing-box GUI 客户端** | 极客与技术爱好者 | 内存极小、协议新 | 规则语法门槛稍高 |
| **Hiddify (基于 sing-box)** | 广大普通用户 | 界面优美开箱即用 | 深度定制选项较少 |`,
    gotchas: `1. **不同次版本号间配置字段微调**：sing-box 发展快速，版本大升级时需参考官方发布说明核对配置字段变动。`,
    faqs: [
      { question: '普通新手推荐直接上手原生 sing-box 吗？', answer: '建议新手优先使用 Clash Verge Rev；若对内存和性能有极致追求，或者使用低配老旧电脑，再尝试上手 sing-box。' }
    ]
  },

  'download-safety': {
    cot: `### 1.1 开源代理工具安全下载与数字签名核验底层推导

网络代理软件涉及对操作系统网络层流量的全局劫持。如果下载到被恶意攻击者篡改注入木马的流氓版本，将导致包括浏览器密码、Cookie、银行卡与聊天记录在内的所有隐私完全失窃。

从软件供应链安全与密码学核验深入推导：
1. **GitHub Releases 官方发布渠道唯一真实性**：
   - 所有合规合法的开源代理客户端，其唯一官方公开发布源均为官方 GitHub 仓库的 Releases 页面。任何非 GitHub 域名的所谓“官方下载站”均属于未经授权的第三方镜像甚至钓鱼网站。
2. **SHA256 密码学哈希防篡改证明**：
   - 开发者在发布软件时，会公布对应安装包的 SHA256 校验和文本。用户下载后在本地计算文件的哈希值，只要两串哈希值完全一致，从数学概率上即可 100% 证明该文件在传输过程中未被运营商劫持注入、未被恶意替换。`,
    code: `\`\`\`powershell
# 官方标准安全下载三步核验流程 (PowerShell)
# 1. 计算本地下载好的安装包散列值
$file = "$HOME\\Downloads\\Clash.Verge_x64.exe"
$calculatedHash = (Get-FileHash -Path $file -Algorithm SHA256).Hash.ToLower()

# 2. 对照官方 Release 页面公布的 sha256 文本 (假设为 officialHash)
$officialHash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855".ToLower()

if ($calculatedHash -eq $officialHash) {
    Write-Host "✅ 哈希完全匹配，文件 100% 纯净安全！" -ForegroundColor Green
} else {
    Write-Error "❌ 警告！哈希不匹配！文件可能已被篡改或损坏，严禁运行！"
}
\`\`\``,
    decisionTree: `\`\`\`
[软件安全下载决策准则]
   │
   ├─► 来源是否为官方 GitHub Releases 或本站官方直链？
   │      ├─ 是 ──► 可信来源，下载并校验哈希
   │      └─ 否 (来自百度网盘/第三方下载站) ──► 坚决删除，严禁双击运行！
   │
   └─► 下载后必须执行 Get-FileHash 校验散列值匹配
\`\`\``,
    benchmarkTable: `| 下载来源 | 安全可信度 | 是否存在木马风险 | 维护更新同步度 |
| :--- | :---: | :---: | :---: |
| **官方 GitHub Releases 仓库** | **⭐⭐⭐⭐⭐ 100% 绝对权威** | **完全零风险** | **第一时间同步** |
| **本站经过安全审计的官方通道** | **⭐⭐⭐⭐⭐ 经哈希复核** | **安全纯净** | **及时跟进稳定版** |
| **搜索引擎竞价广告所谓的官网** | ❌ 极度危险 | 极高概率携带后门 | 停止维护的改装版 |`,
    gotchas: `1. **认准 GitHub 官方 Organization 组织标识**：部分攻击者会在 GitHub 注册相似名字的克隆仿冒仓库分发恶意软件，需核验仓库的 Star 数量（通常上万）与历史提交记录。`,
    faqs: [
      { question: '下载被浏览器或 Windows Defender 拦截，怎么区分是误报还是真病毒？', answer: '只要通过官方 GitHub 认证渠道下载且核对 SHA256 哈希值与作者发布的一致，拦截就属于杀毒软件对“网络虚拟网卡驱动注入”行为的常规误报，可安全放行。' }
    ]
  }
};
