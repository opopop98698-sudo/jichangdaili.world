// Install Knowledge Base (10 topics)
export const installKB = {
  'verge-rev': {
    cot: `### 1.1 Clash Verge Rev 安装部署机制与内核驱动底层推导

Clash Verge Rev 是当前基于 Mihomo (Clash Meta) 内核最为成熟、功能最完备的跨平台桌面客户端。
其架构由 **Tauri 前端壳体 + Mihomo Go 内核 + Service Mode 系统服务驱动** 三层组成。

从安装运行生命周期深度推导：
1. **安装环境依赖链**：
   - Windows 平台依赖微软官方 WebView2 Evergreen 运行环境渲染现代 UI。若精简版 Windows 剥离了该组件，启动将直接白屏或报 \`WebView2Loader.dll\` 丢失。
   - 内核接管流量依赖 Wintun 驱动。普通用户态程序无法直接创建虚拟网卡，必须通过独立的 Windows 系统服务（Clash Verge Service）获取 \`NT AUTHORITY\\SYSTEM\` 权限。
2. **Setup 安装版 vs Portable 便携版选型底逻辑**：
   - 安装版将二进制写至 \`Program Files\`，并将配置隔离在 \`%APPDATA%\\clash-verge\`，由系统负责卸载与注册表清理；
   - 便携版将所有 profiles、logs、config 保留在解压目录下的 \`.config\` 文件夹内，适合沙盒化测试或放置于移动介质随身携带。`,
    code: `\`\`\`powershell
# 1. 验证 WebView2 运行时是否安装正常
$webview2 = Get-ItemProperty HKLM:\\Software\\WOW6432Node\\Microsoft\\EdgeUpdate\\Clients\\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5} -ErrorAction SilentlyContinue
if ($null -eq $webview2) {
    Write-Host "检测到缺少 WebView2，正在自动下载官方常青引导程序..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri "https://go.microsoft.com/fwlink/p/?LinkId=2124703" -OutFile "MicrosoftEdgeWebview2Setup.exe"
    Start-Process -FilePath ".\\MicrosoftEdgeWebview2Setup.exe" -ArgumentList "/silent /install" -Wait
    Write-Host "WebView2 安装完毕" -ForegroundColor Green
} else {
    Write-Host "WebView2 已就绪: $($webview2.pv)" -ForegroundColor Green
}

# 2. 检查 Clash Verge 服务是否正确注册与运行
Get-Service -Name "clash_verge_service" -ErrorAction SilentlyContinue | Select-Object Name, Status, StartType
\`\`\``,
    decisionTree: `\`\`\`
[Clash Verge Rev 安装部署决策]
   │
   ├─► 是否有完整 Windows 管理员权限？
   │      ├─ 是 ──► 下载 Setup.exe 安装版 ──► 安装完成后在【设置】开启【服务模式】(TUN 必备)
   │      └─ 否 (办公机/临时机) ──► 下载 Portable.zip 便携版 ──► 仅使用系统代理模式 (7897 端口)
   │
   ├─► 操作系统版本与架构？
   │      ├─ Windows 10/11 x64 ──► 下载 x64-setup.exe
   │      ├─ 骁龙 X Elite / ARM64 ──► 务必下载 arm64-setup.exe (免模拟损耗)
   │      └─ macOS (M1/M2/M3/M4) ──► 下载 aarch64.dmg (避免 Rosetta 转译)
   │
   └─► 认准官方 GitHub 仓库 Release，禁止使用包含所谓“免翻版”的第三方二次打包文件
\`\`\``,
    benchmarkTable: `| 安装版本类型 | 核心运行特权 | TUN 虚拟网卡支持 | 升级迁移便利度 | 推荐使用场景 |
| :--- | :---: | :---: | :---: | :--- |
| **标准安装包 (Setup.exe)** | **通过 Service 获取 SYSTEM 特权** | **原生无缝启用 Wintun** | **内置检查更新并自动覆盖** | **90% 个人主力桌面电脑首选** |
| **便携绿色包 (Portable.zip)** | 受限于当前登录普通用户权限 | 需以管理员身份运行辅助脚本 | 手动解压并替换 binary | 企业严格限制机器、U 盘移动环境 |
| **macOS DMG 镜像包** | 自动触发 Helper 提权弹窗 | 原生 utun 支持 | 拖拽至 Applications 覆盖 | Apple Silicon / Intel Mac 标配 |`,
    gotchas: `1. **解压或安装路径切勿包含中文字符**：Mihomo 底层 Go 运行库在解析含 Unicode 复杂字符的文件路径时容易发生越界 panic，导致配置文件无法持久化。
2. **360 或火绒等国产杀软误报拦截**：Service Mode 注册 Windows 服务时会调用 \`sc.exe create\`，易触发主动防御拦截，需点击【允许程序所有操作】。`,
    faqs: [
      { question: 'Clash Verge Rev 提示“Service Mode 安装失败”怎么解决？', answer: '请先退出 360/火绒等安全防护软件，以鼠标右键“以管理员身份运行”重新打开 Clash Verge Rev，在【设置】->【服务模式】旁点击重新安装驱动。' },
      { question: 'macOS 打开 Clash Verge Rev 提示“文件已损坏，打不开”？', answer: '这是 macOS Gatekeeper 未签名拦截。在终端运行 `sudo xattr -rd com.apple.quarantine /Applications/Clash\\ Verge\\ Rev.app` 即可解锁运行。' }
    ]
  },

  'v2rayn': {
    cot: `### 1.1 v2rayN 绿色化部署架构与内核外挂机制推导

v2rayN 作为 Windows 平台历史最悠久、用户基数最庞大的经典 GUI 客户端，其架构与 Clash 系截然不同：
其本质是一个基于 **.NET 框架编写的外壳调度程序**，内部通过标准命令行参数外挂启动 \`xray.exe\`、\`sing-box.exe\` 等原生核心。

从进程协同与依赖模型推导：
1. **.NET Desktop Runtime 依赖链**：
   - v2rayN v6.x 基于 .NET 6.0 构建，v7.x 全面升级至 .NET 8.0。若未预先安装官方 Microsoft .NET Desktop Runtime，程序启动将直接静默闪退或弹出核心缺失对话框。
2. **内核包完整性依赖**：
   - 官方 GitHub 分为 \`v2rayN-windows-64.zip\`（纯 UI，不含任何内核）与 \`v2rayN-With-Core.zip\`（内置 Xray、Sing-box、Geo 数据库）。新手若误下载纯 UI 包，启动后测试节点将全部报错 \`Core not found\`。`,
    code: `\`\`\`powershell
# 1. 检查本地是否已安装 .NET 8.0 / 6.0 Desktop Runtime
$runtimes = dotnet --list-runtimes 2>$null
Write-Host "检测到本地已安装的 .NET 运行库:"
$runtimes | Select-String "Microsoft.WindowsDesktop.App"

if ($null -eq ($runtimes | Select-String "Microsoft.WindowsDesktop.App (6|8)")) {
    Write-Host "缺少必需的 .NET Desktop Runtime，建议使用 Winget 自动安装:" -ForegroundColor Yellow
    Write-Host "winget install Microsoft.DotNet.DesktopRuntime.8" -ForegroundColor Cyan
}

# 2. 校验 v2rayN 目录内核完整性
Get-ChildItem -Path ".\\bin" -Recurse | Where-Object { $_.Name -match "(xray|sing-box)\\.exe" } | Select-Object Name, Length, LastWriteTime
\`\`\``,
    decisionTree: `\`\`\`
[v2rayN 安装包选型决策]
   │
   ├─► 是否熟悉手动下载内核与 GeoIP 数据库？
   │      ├─ 否 (小白/新手) ──► 必须下载【v2rayN-With-Core.zip】(开箱即用，内核自带)
   │      └─ 是 (极客玩家) ──► 下载【v2rayN-windows-64.zip】自行定制最新 Xray/Sing-box core
   │
   ├─► 本机是否已安装 .NET Desktop Runtime？
   │      ├─ 已安装 ──► 解压后双击【v2rayN.exe】直接启动
   │      └─ 未安装 ──► 启动弹出提示时，点击链接安装微软官方【.NET 8.0 桌面运行时】
   │
   └─► 解压路径选择：务必解压至纯英文路径（如 D:\\Tools\\v2rayN\\），切勿在压缩包内直接双击
\`\`\``,
    benchmarkTable: `| 下载包类型 | 内置内核与资源 | 体积大小 | 运行时要求 | 适合群体 |
| :--- | :---: | :---: | :---: | :--- |
| **v2rayN-With-Core.zip** | **集成 Xray + sing-box + GeoIP/Site** | ~80MB | **.NET 6.0 / 8.0 Desktop Runtime** | **所有普通用户与节点测速首选** |
| **v2rayN-windows-64.zip** | 仅纯 GUI 前端界面 | ~5MB | .NET 6.0 / 8.0 Desktop Runtime | 需自定义外挂内核版本的开发者 |
| **v2rayN-arm64.zip** | ARM64 原生架构包 | ~75MB | .NET ARM64 运行时 | Surface Pro X / 骁龙平台 PC |`,
    gotchas: `1. **切勿在 Windows 压缩包内直接双击启动**：在 WinRAR/7-Zip 预览窗口双击运行会导致配置文件写入 Windows 临时文件夹 \`%TEMP%\`，退出后所有节点与订阅信息全部丢失。
2. **杀毒软件隔离 xray.exe 内核**：部分安全软件对 Xray 开源二进制报毒，发现所有节点连接延迟均为 -1 时，请检查杀软隔离区并将 v2rayN 整个文件夹加入排除项。`,
    faqs: [
      { question: '双击 v2rayN.exe 没有任何反应，也没有弹出报错窗口？', answer: '99% 的原因是缺少微软 .NET Desktop Runtime。请前往微软官网下载安装 .NET 8.0 Desktop Runtime (x64) 即可恢复。' },
      { question: '为什么导入订阅后节点全部显示测试失败，延迟为 -1？', answer: '检查 bin/Xray 目录下是否存在 xray.exe。如果文件被安全软件拦截清除，重新解压覆盖 bin 目录并添加杀软信任白名单。' }
    ]
  },

  'v2rayng': {
    cot: `### 1.1 v2rayNG 移动端部署特性与 Android 系统适配推导

v2rayNG 是 Android 平台最标准且稳定的 Xray 内核客户端，直接调用 Android 原生 \`VpnService\` API 建立本地回环隧道。

从移动端软硬件运行机制推导：
1. **CPU 架构分支（ABI）精准匹配**：
   - 近五年 95% 以上主流安卓机均采用 64 位 ARM 处理器（\`arm64-v8a\`）。下载通用 universal 包体积过大且浪费空间；下载错误架构（如 x86_64）将导致 APK 安装报“解析软件包出现问题”。
2. **Android 系统的后台降频与墓碑清理机制**：
   - 国产 OEM 系统为了延长续航，在锁屏后数分钟会对持有后台 VPNService 的进程施加限制，强杀网络 Socket 连接，导致代理断连、微信通知延迟。必须在安装后执行系统级保活配置。`,
    code: `\`\`\`bash
# 1. 查看连接的 Android 设备原生 ABI 架构
adb shell getprop ro.product.cpu.abi
# 典型输出: arm64-v8a

# 2. 静默安装匹配架构的 v2rayNG APK
adb install -r -d v2rayNG_1.8.36_arm64-v8a.apk

# 3. 授予该应用忽略电池优化白名单权限 (防止息屏掉线)
adb shell dumpsys deviceidle whitelist +com.v2ray.ang
\`\`\``,
    decisionTree: `\`\`\`
[v2rayNG 安装与初始化决策]
   │
   ├─► APK 下载架构选择：
   │      ├─ 手机处理器为高通/天玑/麒麟 ──► 认准【arm64-v8a.apk】(体积小、执行效率最高)
   │      ├─ 模拟器或 x86 平板 ──► 选择【x86_64.apk】
   │      └─ 不清楚具体架构 ──► 保守选择【universal.apk】
   │
   ├─► 安装后系统权限关键三步：
   │      ├─ 1. 允许应用创建 VPN 连接 (弹窗勾选“一律允许”)
   │      ├─ 2. 电池策略：从“智能省电”改为【无限制】/【不优化】
   │      └─ 3. 多任务后台卡片：下拉加锁防误杀
   │
   └─► 协议测试：导入机场节点后先点右下角 V 图标启动，再测连通性 (Ping)
\`\`\``,
    benchmarkTable: `| APK 安装包命名 | 适用 CPU 架构 | 文件体积 | 运行性能表现 | 适用机型 |
| :--- | :---: | :---: | :---: | :--- |
| **arm64-v8a.apk** | **64位 ARM (AArch64)** | **约 35MB** | **原生最高指令集执行效率** | **2018 年后绝大多数安卓主力机** |
| **universal.apk** | 包含全部 ABI 二进制 | 约 95MB | 兼容模式，解压耗存储 | 老旧低端机、无法判断架构的设备 |
| **x86_64.apk** | Intel / AMD 桌面架构 | 约 38MB | 桌面 x86 指令直通 | 雷电/MuMu/夜神等安卓模拟器 |`,
    gotchas: `1. **“解析软件包出现错误”**：若下载文件不完整（因网络波动中断）或安卓系统版本过低（v2rayNG 当前通常需要 Android 6.0 以上），会导致系统安装器拒绝解析。
2. **误开启“仅分流大陆地址”而规则库过期**：初装后若未手动在菜单中点击“更新 GeoIP/GeoSite 资源文件”，可能导致部分国内合规站点被误走代理。`,
    faqs: [
      { question: '华为 HarmonyOS 安装 v2rayNG 提示“该应用未通过纯净模式检测”？', answer: '在弹出的风险提示中选择“我已了解风险”，或在系统【设置】->【系统和更新】->【纯净模式】中关闭纯净模式即可正常完成安装。' },
      { question: '开启代理后息屏 5 分钟，微信和电报收不到任何新消息？', answer: '进入手机【设置】->【应用管理】->【v2rayNG】->【电池/耗电保护】，将策略调整为【无限制 / 允许后台高耗电】，并在多任务界面锁定后台。' }
    ]
  },

  'shadowrocket': {
    cot: `### 1.1 Shadowrocket (小火箭) iOS 环境部署机制推导

Shadowrocket 是 iOS 平台最流行的经典规则代理客户端。受 Apple App Store 区域审核政策限制，该应用仅在非中国大陆区 App Store（美区、港区、日区等）上架分发。

从 iOS 安全沙盒机制与 App Store 分发生态推导：
1. **Apple ID 沙盒隔离机制**：
   - iOS 允许“设置中的主 iCloud 账号”与“App Store 媒体与购买项目账号”分离。用户完全不需要登出主 iCloud（避免通信录、照片同步紊乱），仅需在 App Store 单独切换外区购买账号。
2. **NENetworkExtension 核心权限链**：
   - Shadowrocket 首次点击启动开关时，iOS 系统会强制弹出“‘Shadowrocket’想添加 VPN 配置”授权确认窗口。此步骤由 iOS Secure Enclave 签名校验，需输入系统锁屏密码或通过 FaceID 完成信任，否则无法写入网络扩展。`,
    code: `\`\`\`text
# Shadowrocket 正确安装与初始化标准流：
步骤 1: 打开 iOS 自带 App Store -> 点击右上角个人头像
步骤 2: 滑动至最底部，点击【退出登录】(注意：仅在 App Store 退出，严禁在系统设置中退出 iCloud)
步骤 3: 输入已购买 Shadowrocket 的外区 Apple ID 与密码并登录
步骤 4: 搜索 "Shadowrocket" (认准开发者: Shadow Launch Technology Limited，图标为四翼小火箭)
步骤 5: 点击下载/云朵图标下载安装完毕后，回到 App Store 退出外区账号，切回个人日常账号
步骤 6: 打开 Shadowrocket，首次启动拨动开关，在弹出的“添加 VPN 配置”输入手机锁屏密码完成授权
\`\`\``,
    decisionTree: `\`\`\`
[Shadowrocket 获取与安装决策]
   │
   ├─► 是否已有外区 Apple ID (如美区/港区)？
   │      ├─ 是 ──► 检查是否已购买 (3.99 美金) ──► 直接登录 App Store 下载
   │      └─ 否 ──► 注册个人外区 Apple ID 并绑定外币卡/礼品卡兑换购买
   │
   ├─► 账号登录安全警示：
   │      ├─ 严格要求：必须仅在【App Store 内部】登录！
   │      └─ 绝对禁止：切勿在【设置 -> 顶部个人头像 -> iCloud】处登录陌生公共账号 (否则有锁机变砖风险！)
   │
   └─► 认准正版开发者：
          └─ 开发者全称: "Shadow Launch Technology Limited" (避免误下钓鱼山寨换皮 App)
\`\`\``,
    benchmarkTable: `| 客户端获取方式 | 账号安全等级 | 升级与重装保障 | 长期可用性 | 推荐评级 |
| :--- | :---: | :---: | :---: | :--- |
| **自建美区 ID 礼品卡购买 ($3.99)** | **最高 (独享私有密码与 2FA)** | **永久绑定终身自动更新** | **100% 稳定永不失效** | **★★★★★ 强烈首推** |
| **机场提供专属共享 Apple ID** | 中等 (共享账号易被苹果封停) | 无法自动更新，更新需重复借用 | 受苹果风控影响高 | ★★★☆☆ 临时过渡可选 |
| **第三方签名分发 / 助手爱思助手** | 极低 (企业证书极易掉签崩溃) | 掉签后应用闪退打不开 | 极短 (通常几周即掉签) | ★☆☆☆☆ 坚决不推荐 |`,
    gotchas: `1. **严禁在系统【设置 -> iCloud】登录任何外部购买账号**：部分黑心卖家提供的共享账号若开启了“查找我的 iPhone”，一旦在 iCloud 登录会导致手机被远程锁定并被勒索！
2. **首次启动未弹“添加 VPN 配置”弹窗直接闪退**：通常因 iOS 描述文件冲突或存在过多的遗留 VPN 扩展，需在【设置】->【通用】->【VPN 与设备管理】中清理旧配置后重试。`,
    faqs: [
      { question: '下载好小火箭后，把 App Store 切回国区账号，小火箭还能继续使用和走代理吗？', answer: '完全可以。iOS 上的 App 只要成功安装到本机，切换或退出 App Store 账号不影响日常使用与后台代理。后续仅在大版本更新时才需临时切换。' },
      { question: '为什么搜索 Shadowrocket 出现很多叫“小火箭加速器”的软件，收费还很贵？', answer: '这些是借名字蹭热度的山寨骗子软件。正版小火箭图标为黄色圆圈内白色小火箭，开发者为 Shadow Launch Technology Limited，买断价仅 3.99 美元。' }
    ]
  },

  'flclash': {
    cot: `### 1.1 FlClash 跨平台 UI 架构与全平台部署推导

FlClash 是基于 Google Flutter 框架与 Mihomo 核心开发的现代化跨平台代理客户端，其最大优势在于 **Windows、macOS、Android、Linux 界面风格与操作逻辑 100% 高度统一**。

从 Flutter 跨平台原生混合编译架构推导：
1. **Flutter 引擎与宿主 OS 交互**：
   - 界面使用 Skia/Impeller 引擎直接在 GPU 表面绘制，不依赖系统原生 WebView 运行库，彻底规避了 Windows 下缺少 WebView2 导致的白屏问题；
   - 底层依旧封装 Mihomo Go 核心，在 Windows 端通过 \`wintun.dll\` 建立 TUN，在 Linux 端通过 \`tun\` 模块通信。
2. **安装形态适配**：
   - Windows 提供 Setup 与 Portable；macOS 支持 arm64/x64 原生 dmg；Android 提供单一精简 apk；Linux 更是提供了 AppImage 免安装即开即用包。`,
    code: `\`\`\`bash
# Linux 下 FlClash AppImage 一键部署与授权
chmod +x FlClash-linux-amd64.AppImage

# 授予 Linux TUN 模式特权能力 (避免以 root 运行整个 GUI)
sudo setcap cap_net_admin,cap_net_bind_service=+ep ./FlClash-linux-amd64.AppImage

# 启动 FlClash
./FlClash-linux-amd64.AppImage &
\`\`\``,
    decisionTree: `\`\`\`
[FlClash 全平台安装选型决策]
   │
   ├─► 目标运行操作系统：
   │      ├─ Windows 10/11 ──► 优先下载【FlClash-windows-amd64-setup.exe】
   │      ├─ macOS (苹果电脑) ──► 下载【FlClash-macos-arm64.dmg】(Apple Silicon)
   │      ├─ Android 手机/电视盒子 ──► 下载【FlClash-android-arm64-v8a.apk】
   │      └─ Linux (Ubuntu/Debian) ──► 下载【FlClash-linux-amd64.AppImage】
   │
   └─► 核心特点体验：
          ├─ 优点：界面清爽现代、占用轻量，跨设备换用毫无学习成本
          └─ 进阶功能：支持多配置切换与内置简易脚本覆写
\`\`\``,
    benchmarkTable: `| 平台版本 | 界面渲染技术 | 依赖组件 | 内存开销 (初始) | 推荐评级 |
| :--- | :---: | :---: | :---: | :--- |
| **Windows 版** | **Flutter Impeller/Skia GPU** | **无 (自带运行时，免 WebView2)** | **约 95MB** | **★★★★★ 极简首选** |
| **macOS 版** | Flutter Metal 原生加速 | 无额外依赖 | 约 110MB | ★★★★★ 媲美原生流畅度 |
| **Android 版** | Android NDK + Flutter | Android 7.0+ | 约 80MB | ★★★★☆ 适合颜值党 |
| **Linux 版** | AppImage 打包 | glibc 2.28+ / FUSE | 约 120MB | ★★★★★ Linux 桌面最强 UI |`,
    gotchas: `1. **Linux 运行 AppImage 提示缺少 FUSE**：Ubuntu 22.04+ 默认未预装 libfuse2，需终端执行 \`sudo apt install libfuse2\` 才能运行。
2. **Windows 开启 TUN 模式无网**：请确保解压目录或安装目录下自带的 \`wintun.dll\` 未被杀毒软件删除，且必须在设置里启用“管理员模式”。`,
    faqs: [
      { question: 'FlClash 与 Clash Verge Rev 相比，日常该如何选择？', answer: '如果你追求极致现代、UI 美观统一且机器上没有也不想装 WebView2，首选 FlClash；如果你需要大量深度 Script/Merge 脚本与复杂链式分流，选 Clash Verge Rev。' },
      { question: '在 Android 电视机（Android TV）上安装 FlClash 能用遥控器操作吗？', answer: 'FlClash 的 Flutter 界面专为触控与键鼠优化，电视遥控器方向键支持较弱，建议配合无线飞鼠或在电视上使用专为 TV 适配的 Clash for Android 电视版。' }
    ]
  },

  'hiddify': {
    cot: `### 1.1 Hiddify 全能内核客户端部署与通用导入机制推导

Hiddify 是基于 Google Flutter 与 sing-box 核心打造的全开源、多功能一站式代理客户端，旨在抹平所有复杂协议与配置门槛。

从内核架构与网络特性推导：
1. **原生集成 Sing-box 核心**：
   - 原生支持 VLESS-XTLS-Reality、ShadowTLS、Tuic v5、Hysteria 2、WireGuard 等所有次世代抗审查协议，无需像老客户端那样繁琐安装不同补丁；
2. **全协议万能解析引擎**：
   - Hiddify 内部集成了自动协议识别转换模块，无论是标准 Clash YAML 链接、Sing-box JSON 链接、V2Ray 聚合订阅 base64，还是单条 \`vless://\`、\`hysteria2://\` 节点链接，均可直接粘贴并瞬间转换为统一的内核运行时配置。`,
    code: `\`\`\`text
# Hiddify 统一快速导入配置操作范式：
1. 复制机场提供的任一订阅链接 (Clash 格式 / sing-box 格式 / 通用聚合均可)
2. 打开 Hiddify -> 点击右上角【+】号
3. 选择【从剪贴板添加配置文件】
4. Hiddify 自动检测链接类型，下载并编译为 Sing-box 统一缓存
5. 在主界面选择工作模式：
   - 智能路由 (Smart Proxy)：相当于规则分流模式 (Rule)
   - 全局代理 (Global)：全部流量强制走选定节点
6. 点击屏幕中央大圆圈【连接】按钮即可启用
\`\`\``,
    decisionTree: `\`\`\`
[Hiddify 客户端适用场景决策]
   │
   ├─► 机场节点协议类型：
   │      ├─ 包含大量 Hysteria 2 / TUIC / Reality 次世代协议 ──► 首选【Hiddify】(内核原生，性能爆发)
   │      └─ 传统 SS / VMess / 经典中转 ──► Hiddify 或 Clash 均可流畅运行
   │
   ├─► 使用者上手意愿：
   │      ├─ 懒人新手：希望一键复制粘贴任何链接直接能用 ──► 极力推荐【Hiddify】
   │      └─ 资深发烧友：需要手动逐行定制分流 yaml 语法 ──► 建议 Clash Verge Rev
   │
   └─► 跨平台多开：支持 Windows / macOS / Android / iOS / Linux 界面全通
\`\`\``,
    benchmarkTable: `| 协议支持度 | 启动建立连接延迟 | 内存占用表现 | 规则分流配置难度 | 推荐场景 |
| :--- | :---: | :---: | :---: | :--- |
| **全协议 (含 Hy2/Tuic/Reality)** | **< 150ms (Sing-box 极速内核)** | **~70MB - 130MB** | **极低 (全图形化点选屏蔽/代理)** | **全协议机场用户、跨平台新手首推** |
| 传统客户端对比 (v2rayN) | ~300ms (多进程外挂) | ~150MB+ | 较高 (需理解核心配置) | 偏向 Windows 深度调试测速 |`,
    gotchas: `1. **iOS 版本 TestFlight 名额限制**：iOS 端 Hiddify 偶尔需通过 TestFlight 测试计划或特定外区商店获取，安装前需核验商店上架状态。
2. **WARP+ 集成导致流量环路**：Hiddify 内部支持 Cloudflare WARP 链式前置功能，若机场节点本身封锁了 UDP，开启 WARP 功能可能导致全局断网。`,
    faqs: [
      { question: 'Hiddify 开启后有些国内应用打开很慢或打不开？', answer: '在设置中检查【路由模式】，确保选择的是【分流/智能（Bypass LAN & Mainland）】，而不是【全局代理（Proxy All）】。' },
      { question: '为什么 Hiddify 能够直接导入 Clash 的订阅链接？', answer: 'Hiddify 内部集成了轻量化配置转换适配器，可以在本地静默将 Clash 的 Proxies 与 Rules 字典映射为 Sing-box 规范的 Inbounds/Outbounds 节点池。' }
    ]
  },

  'singbox': {
    cot: `### 1.1 原生 Sing-box 内核运行机制与部署哲学推导

Sing-box 是新一代以极简、模块化、高性能著称的通用代理平台内核（The universal proxy platform）。它摒弃了过往 V2Ray 的沉重历史包袱，采用纯 Go 语言从底层重新构建。

从内核底层与系统接口推导：
1. **JSON 声明式配置哲学**：
   - Sing-box 完全基于结构化 JSON。其核心由 \`dns\`、\`inbounds\`、\`outbounds\`、\`route\`、\`experimental\` 五大顶层模块构成，执行效率比复杂解析树高出数倍；
2. **系统底层集成能力**：
   - Sing-box 的 TUN 模式基于原生 gVisor / System 虚拟栈构建，在 Linux 环境下可直接作为 Systemd 服务驻留后台，无需任何图形界面即可实现数万并发连接的毫秒级转发。`,
    code: `\`\`\`bash
# 1. Linux 下下载并安装原生 sing-box 二进制
VERSION="1.11.4"
curl -Lo sing-box.tar.gz "https://github.com/SagerNet/sing-box/releases/download/v\${VERSION}/sing-box-\${VERSION}-linux-amd64.tar.gz"
tar -xzf sing-box.tar.gz
sudo mv sing-box-*/sing-box /usr/local/bin/

# 2. 校验配置语法是否合规
sing-box check -c /etc/sing-box/config.json

# 3. 创建并启用 systemd 守候进程
sudo tee /etc/systemd/system/sing-box.service <<EOF
[Unit]
Description=sing-box service
After=network.target nss-lookup.target

[Service]
CapabilityBoundingSet=CAP_NET_ADMIN CAP_NET_BIND_SERVICE
AmbientCapabilities=CAP_NET_ADMIN CAP_NET_BIND_SERVICE
ExecStart=/usr/local/bin/sing-box run -c /etc/sing-box/config.json
Restart=on-failure
RestartSec=10s
LimitNOFILE=infinity

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now sing-box
\`\`\``,
    decisionTree: `\`\`\`
[Sing-box 部署形态选型决策]
   │
   ├─► 使用场景环境：
   │      ├─ 无桌面 Linux VPS / 旁路由网关 ──► 原生 CLI + Systemd 守护进程 (极致省资源)
   │      ├─ 苹果生态 (macOS / iOS / Apple TV) ──► 官方图形客户端【sing-box for Apple】
   │      └─ Windows / Android 桌面环境 ──► 建议搭配 Hiddify、FlClash 等基于 Sing-box 的 GUI 壳体
   │
   └─► 配置文件来源：
          ├─ 机场自带官方 Sing-box 订阅 ──► 直接填入配置文件路径运行
          └─ 仅有 Clash 订阅 ──► 通过本地 Sub-Store 转换为 Sing-box JSON 格式
\`\`\``,
    benchmarkTable: `| 客户端形态 | CPU 占用 (1Gbps 吞吐) | 内存占用常驻 | 协议覆盖度 | 适用玩家群体 |
| :--- | :---: | :---: | :---: | :--- |
| **原生 CLI 内核 (Linux/Win)** | **< 3% (极轻量)** | **约 25MB - 45MB** | **最全面原生支持** | **VPS 开发者、软路由玩家、极客** |
| **sing-box for Apple (GUI)** | < 5% | 约 50MB | 苹果生态最佳优化 | Mac/iPhone 深度原生党 |
| **第三方封装 GUI (Hiddify等)** | 5% - 8% | 约 80MB - 120MB | 全面图形化点选 | 绝大多数注重操作便利的普通用户 |`,
    gotchas: `1. **JSON 语法对尾部逗号极其敏感**：修改 \`config.json\` 时，若在数组或对象最后一个元素后面多加了一个逗号 \`,\`，内核启动将直接抛出 JSON parse error 闪退退出。
2. **TUN 模式需要 Linux CAP_NET_ADMIN 权限**：若非 root 用户启动 CLI 版，必须使用 \`setcap\` 或在 Systemd 服务中赋予网络管理特权。`,
    faqs: [
      { question: '普通小白用户推荐直接折腾 Sing-box CLI 命令行版本吗？', answer: '不推荐。命令行版本要求用户完全理解 JSON 语法、DNS 分流策略与 Linux 进程管理。普通用户建议直接使用基于 Sing-box 核心开发的成熟图形客户端（如 Hiddify 或 FlClash）。' },
      { question: 'Sing-box 的 Rule-set (.srs) 是什么文件？', answer: '这是 Sing-box 独创的二进制编译规则集文件，相比传统的几万行纯文本规则，二进制反序列化速度提升了上百倍，极大降低了应用启动和规则匹配时的 CPU 尖刺。' }
    ]
  },

  'prerequisites': {
    cot: `### 1.1 系统运行环境依赖与底层组件运行机理推导

代理客户端本质是高度依赖底层操作系统网络栈、虚拟设备驱动及现代图形渲染管线的高性能网络工具。

从系统调用与运行依赖链路推导：
1. **Windows 运行库生态三剑客**：
   - **Microsoft Visual C++ Redistributable (2015-2022)**：Go 与 C++ 编译的核心二进制（如 xray-core、dll 动态链接库）必需的 C 标准库运行时；
   - **Microsoft .NET Desktop Runtime**：v2rayN、Netch 等 C# 开发工具的执行宿主；
   - **Microsoft Edge WebView2 Runtime**：基于 Chromium 的轻量前端渲染容器，Clash Verge Rev、Clash Nyanpasu 等现代客户端的 UI 基石。
2. **虚拟网卡核心驱动（Wintun / TAP）**：
   - 接管全局 TCP/UDP 流量必需的内核驱动。旧式 TAP-Windows 性能低下且延迟高；现代客户端全面转向高性能 \`Wintun\` 驱动。缺少数字签名或被杀软拦截会导致 TUN 网卡无法创建。`,
    code: `\`\`\`powershell
# Windows 代理客户端依赖环境一键体检与自动补齐脚本
Write-Host "=== 正在检测代理客户端系统前置依赖 ===" -ForegroundColor Cyan

# 1. 检测 VC++ 2015-2022 运行库
$vc = Get-ItemProperty HKLM:\\SOFTWARE\\Microsoft\\VisualStudio\\14.0\\VC\\Runtimes\\X64 -ErrorAction SilentlyContinue
if ($null -ne $vc) {
    Write-Host "[✓] Visual C++ 2015-2022 x64 运行库已就绪" -ForegroundColor Green
} else {
    Write-Host "[✗] 缺少 VC++ 运行库，建议使用 winget 安装: winget install Microsoft.VCRedist.2015+.x64" -ForegroundColor Red
}

# 2. 检测 WebView2 Evergreen
$wv2 = Get-ItemProperty HKLM:\\Software\\WOW6432Node\\Microsoft\\EdgeUpdate\\Clients\\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5} -ErrorAction SilentlyContinue
if ($null -ne $wv2) {
    Write-Host "[✓] WebView2 运行时已就绪: $($wv2.pv)" -ForegroundColor Green
} else {
    Write-Host "[✗] 缺少 WebView2，现代 UI 客户端将无法渲染" -ForegroundColor Red
}

# 3. 检测系统管理员执行权限
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
Write-Host "当前进程管理员权限状态: $isAdmin"
\`\`\``,
    decisionTree: `\`\`\`
[客户端前置依赖体检排查树]
   │
   ├─► 启动客户端报错：“找不到 MSVCP140.dll / VCRUNTIME140.dll”？
   │      └─ 解决方案：下载并安装微软官方【Visual C++ 2015-2022 Redistributable x64】
   │
   ├─► 启动客户端窗口一片空白 (纯白色或纯黑色)？
   │      └─ 解决方案：下载安装微软官方【Microsoft Edge WebView2 Evergreen 引导程序】
   │
   ├─► 启动 v2rayN 闪退，无任何提示？
   │      └─ 解决方案：安装微软官方【.NET 8.0 Desktop Runtime】
   │
   └─► 开启 TUN 模式报“创建虚拟适配器失败”？
          └─ 解决方案：右键“以管理员身份运行”，并在杀毒软件中放行 wintun.sys 驱动加载
\`\`\``,
    benchmarkTable: `| 依赖组件名 | 负责功能 | 影响的客户端产品 | 官方下载体积 | 缺失后果 |
| :--- | :--- | :--- | :---: | :--- |
| **VC++ 2015-2022** | C/C++ 动态链接库运行时 | Xray 内核、sing-box、各类 helper | ~14MB | 报 dll 缺失，内核无法启动 |
| **WebView2** | Chromium UI 界面渲染 | Clash Verge Rev, Clash Nyanpasu | ~2MB (引导器) | 客户端打开后大面积白屏 |
| **.NET Desktop 8.0** | C# 桌面托管运行环境 | v2rayN 7.x, Netch | ~55MB | 双击主程序无响应或直接崩溃 |
| **Wintun.dll / sys** | 零拷贝高性能虚拟网卡驱动 | 全系列客户端 TUN 模式 | < 1MB | 无法接管游戏和全系统 UDP 流量 |`,
    gotchas: `1. **企业或网吧阉割版 Ghost 系统精简过度**：极度精简的 Windows 删除了 Windows Defender 和 Edge 更新机制，可能导致 WebView2 无法通过常规静默命令安装，需下载独立离线安装包。
2. **杀毒软件拦截临时驱动注册**：火绒或 360 的系统防护会阻止应用程序在 \`System32\\drivers\` 目录动态注册临时虚拟网桥，初次配置必须选择允许。`,
    faqs: [
      { question: '明明已经装过 VC++ 运行库了，为什么依然提示缺少 msvcp140.dll？', answer: '64 位操作系统中，如果你的客户端或内核是 32 位的，它需要 VC++ x86 运行库；如果是 64 位的则需要 VC++ x64。建议同时安装微软官方的 x86 与 x64 两款组件。' },
      { question: 'Windows 7 系统还能安装并运行现代代理客户端吗？', answer: '非常困难。Windows 7 不支持现代 WebView2 且缺少新版 TLS 1.3 根证书，建议至少升级到 Windows 10 21H2 以上系统以获得完整的网络驱动支持。' }
    ]
  },

  'gateways': {
    cot: `### 1.1 透明网关与旁路由分流底层推导

旁路由（旁路网关）是在家庭或企业局域网中，不改变主路由器宽带拨号地位的前提下，部署一台专用设备（软路由/NAS/Linux）集中处理全屋科学上网与分流的架构方案。

从 TCP/IP 数据链路层与 ARP 协议推导：
1. **单网口旁路由数据环回过程**：
   - 终端设备（PC/手机）将默认网关手动指向旁路由 IP；
   - 终端发出的数据包通过二层交换机送达旁路由网卡；旁路由内核防火墙（iptables / nftables）通过 REDIRECT 或 TPROXY 将目标为境外的流量重定向至本地代理核心端口；
   - 经由节点加密封包后，旁路由作为源端重新将报文经由二层网络回传至主路由发送到公网。
2. **DNS 污染防护与 Fake-IP 机制**：
   - 传统 DNS 劫持会导致终端在解析阶段就已经拿到污染的错误 IP。旁路由运行 Clash/Sing-box 的 Fake-IP 模式，在局域网内劫持 53 端口，直接返回本地保留网段地址（如 \`198.18.0.0/15\`），杜绝一切运营商 DNS 污染。`,
    code: `\`\`\`bash
# Linux / OpenWrt 旁路由标准网络与防火墙配置示例
# 1. 开启内核 IPv4 转发
echo "net.ipv4.ip_forward = 1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# 2. 防火墙 iptables 设置 (解决部分主路由不识别旁路导致无法上网的 NAT 规则)
# 在 OpenWrt 防火墙自定义规则追加:
iptables -t nat -A PREROUTING -p udp --dport 53 -j REDIRECT --to-ports 1053
iptables -t nat -A PREROUTING -p tcp --dport 53 -j REDIRECT --to-ports 1053

# 针对所有由旁路由网卡转发出去的局域网流量做伪装 (MASQUERADE 规避 ICMP 重定向丢包)
iptables -t nat -I POSTROUTING -o eth0 -j MASQUERADE
\`\`\``,
    decisionTree: `\`\`\`
[全屋代理部署方案决策]
   │
   ├─► 家中是否有常开设备 (NAS / 软路由 / 迷你主机)？
   │      ├─ 是 ──► 推荐【单臂旁路由架构】(主路由负责拨号稳定，旁路由挂代理)
   │      └─ 否 ──► 采用客户端本地 TUN 模式，设备各自独立运行
   │
   ├─► 旁路由网关指向策略：
   │      ├─ 全家设备默认全走代理 ──► 在主路由 DHCP 设置中直接将【默认网关】和【DNS】设为旁路由 IP
   │      └─ 仅指定设备 (如 Apple TV / 游戏主机) 走代理 ──► 仅在对应设备上【手动静态配置 IP/网关】
   │
   └─► 核心要点：主路由开启 DHCP，旁路由务必关闭 DHCP 避免局域网 IP 分配冲突
\`\`\``,
    benchmarkTable: `| 部署形态 | 宽带拨号负担 | 配置复杂度 | 局域网断网风险 | 适用设备覆盖度 |
| :--- | :---: | :---: | :---: | :--- |
| **旁路由 (旁路网关)** | **完全由主路由承担，极稳** | **中等 (需调整设备网关)** | **极低 (旁路由重启不影响主网络)** | **全屋所有设备 (包括电视/PS5/Switch)** |
| 主路由直接刷固件 (All-in-One) | 路由本身承载所有加解密 | 极高 (配置失误全家断网) | 高 (插件崩溃全家连不上 Wi-Fi) | 全屋所有设备 |
| 单机客户端 TUN 模式 | 各设备独立分担 | 极低 (一键点选) | 零 (仅本机受影响) | 仅限支持安装客户端的 PC/手机 |`,
    gotchas: `1. **局域网双 DHCP 服务器冲突**：安装旁路由固件（如 OpenWrt）后，若未在接口配置中勾选“忽略此接口（关闭 DHCP）”，会导致局域网内存在两个 DHCP 抢先分发 IP，引发设备严重断网。
2. **旁路由未加 MASQUERADE 伪装导致发包不通**：部分品牌路由器（如华为、TP-Link）开启了严格的反向路由路径过滤（RP Filter），旁路由若不开启 iptables MASQUERADE，回包会被主路由静默丢弃。`,
    faqs: [
      { question: '将手机网关指向旁路由后，国内百度微信变慢甚至打不开？', answer: '这通常是 DNS 解析死锁或 Fake-IP 漏流。请检查旁路由中 Clash/Sing-box 的分流规则，确保 Domestic / Direct 规则组生效，并配置快速的国内上游 DNS（如 223.5.5.5）。' },
      { question: '旁路由模式下玩 Switch 或 PS5 联机游戏延迟会增加吗？', answer: '优质的局域网内旁路由仅带来不到 1ms 的转发开销。只要在旁路由中为游戏主机配置直连或匹配优质 IPLC 节点加速，反而能获得比原生网络更低更稳的联机延迟。' }
    ]
  },

  'lifecycle': {
    cot: `### 1.1 客户端生命周期管理与配置安全隔离推导

网络代理客户端在操作系统中的生命周期包括：**部署安装 -> 运行时自启与内核热重载 -> 节点规则订阅自动更新 -> 跨版本平滑升级 -> 干净卸载与注册表残留清除**。

从操作系统注册表与网络钩子深度推导：
1. **系统代理挂钩（System Proxy Hook）机制**：
   - 桌面客户端开启“系统代理”时，会通过 Windows API \`InternetSetOption\` 修改注册表项 \`Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\`。
   - 若客户端未正常关闭（如遇系统死机、强行断电或任务管理器强杀进程），系统代理开关将保持开启，指向失效的本地端口（如 127.0.0.1:7897），直接导致用户重启后“电脑连得上 Wi-Fi 却打不开任何网页”。
2. **静默卸载与驱动解绑**：
   - 彻底卸载必须先在应用内停止并注销 Service Mode，卸载虚拟网卡设备，避免在系统设备管理器中遗留僵尸网络适配器。`,
    code: `\`\`\`powershell
# 1. 紧急重置：解除系统残留的代理锁定 (解决“关掉代理后无法上网”)
Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" -Name ProxyEnable -Value 0
Remove-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" -Name ProxyServer -ErrorAction SilentlyContinue
Remove-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" -Name AutoConfigURL -ErrorAction SilentlyContinue
Write-Host "系统网络代理注册表已重置为直连模式" -ForegroundColor Green

# 2. 导出客户端配置数据与自定义配置文件用于迁移备份
$backupPath = "$HOME\\Desktop\\Proxy_Backup_$(Get-Date -Format 'yyyyMMdd')"
New-Item -ItemType Directory -Path $backupPath -Force | Out-Null
Copy-Item -Path "$env:APPDATA\\clash-verge\\profiles" -Destination $backupPath -Recurse -ErrorAction SilentlyContinue
Write-Host "已将核心订阅与分流规则备份至: $backupPath" -ForegroundColor Cyan
\`\`\``,
    decisionTree: `\`\`\`
[客户端升级与运维排错决策]
   │
   ├─► 遇到软件突然打不开网页 / 重启电脑后彻底断网：
   │      ├─ 1. 第一时间检查系统代理：Win+I -> 网络 -> 代理 -> 关闭手动设置代理
   │      └─ 2. 运行上述 PowerShell 脚本一键抹除残留注册表项
   │
   ├─► 客户端版本升级操作规范：
   │      ├─ 安装版升级：建议先退出托盘程序，直接运行新版安装包覆盖安装
   │      └─ 便携版升级：备份旧版【profiles】文件夹，下载新版解压后将备份拷回
   │
   └─► 彻底卸载流程：
          └─ 1. 关闭系统代理 -> 2. 停止服务模式卸载 TUN -> 3. 运行 Uninstall.exe
\`\`\``,
    benchmarkTable: `| 生命周期阶段 | 推荐操作姿势 | 危险高发误区 | 自动恢复措施 |
| :--- | :--- | :--- | :--- |
| **启动与自启** | **开启延时启动，防止开机打架** | 多个客户端同时开启开机自启争抢端口 | 检查任务管理器【启动】选项卡 |
| **版本迭代升级** | 认准官方 Release 覆盖更新 | 跨大版本直接暴力删除旧文件夹造成配置丢失 | 提前备份 profiles 目录 |
| **突发异常关闭** | 通过托盘菜单安全退出 | 直接任务管理器强杀进程或拔电源关机 | 运行注册表重置一键脚本 |
| **彻底卸载注销** | 先停用 TUN 服务驱动再卸载 | 直接 Shift+Delete 删除文件夹遗留系统服务 | 命令行执行 sc.exe delete 服务名 |`,
    gotchas: `1. **未关闭系统代理直接关机/强杀客户端**：导致 Windows 注册表代理键值停留在 127.0.0.1，第二天开机所有浏览器提示“代理服务器连接失败”。
2. **多款客户端混用端口冲突**：同时开启 v2rayN 与 Clash Verge，两者若默认监听相同端口（如 socks5 10808 或 http 7890），会导致后启动的应用报 \`bind: address already in use\` 崩溃。`,
    faqs: [
      { question: '卸载客户端后，电脑所有网页都打不开了怎么办？', answer: '按键盘快捷键 Win+R 输入 `inetcpl.cpl` 打开 Internet 选项 -> 点击【连接】选项卡 -> 点击【局域网设置】 -> 将【为 LAN 使用代理服务器】前面的勾取消掉，点击确定即可。' },
      { question: '客户端升级后之前下载的节点和个性化规则会被清空吗？', answer: '使用官方覆盖安装通常不会清空配置文件，但为了绝对安全，建议升级前将 `%APPDATA%\\<客户端名>` 目录下的 profiles 文件夹复制一份到桌面做备份。' }
    ]
  }
};
