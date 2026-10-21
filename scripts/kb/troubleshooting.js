// Troubleshooting Knowledge Base (10 topics)
export const troubleshootingKB = {
  'startup': {
    cot: `### 1.1 客户端启动失败与端口冲突底层推导

代理客户端在启动初始化时，需要依次执行：加载配置文件、初始化本地数据库、申请内核网络套接字（Socket）并绑定本地入站端口（如 \`127.0.0.1:7890\` 与外部控制端口 \`127.0.0.1:9097\`）。

从操作系统进程与套接字机制深度推导：
1. **WSAEADDRINUSE (10048) 端口占用冲突**：如果此前非正常关机残留了僵尸核心进程（如 \`clash-core.exe\` 或 \`mihomo.exe\` 驻留后台），新启动的客户端在尝试执行 \`bind()\` 系统调用时，操作系统 TCP/IP 协议栈将直接抛出地址已被占用错误，导致核心进程瞬间崩溃退出。
2. **VC++ 运行时库与动态链接错误**：现代 Windows 客户端核心采用 C++ / Go 混合编译。精简版系统若缺失 \`VCRUNTIME140.dll\` 或 \`MSVCP140.dll\`，主程序在载入内存时会发生动态链接库丢失异常，表现为双击无反应或静默闪退。`,
    code: `\`\`\`powershell
# 1. 查找抢占 7890 端口的进程 PID
$netstat = Get-NetTCPConnection -LocalPort 7890 -ErrorAction SilentlyContinue
if ($netstat) {
    $pid = $netstat.OwningProcess
    $proc = Get-Process -Id $pid -ErrorAction SilentlyContinue
    Write-Warning "端口 7890 被进程 [$($proc.ProcessName)] (PID: $pid) 占用！"
    # 强制杀死残留僵死进程
    Stop-Process -Id $pid -Force
    Write-Host "已强制终止冲突进程，端口已释放！" -ForegroundColor Green
} else {
    Write-Host "7890 端口空闲，可安全启动。" -ForegroundColor Green
}

# 2. 检查 VC++ 2015-2022 运行时库是否安装
Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | 
    Where-Object { $_.DisplayName -like "*Visual C++ 2015-2022*" } | 
    Select-Object DisplayName, DisplayVersion
\`\`\``,
    decisionTree: `\`\`\`
[客户端启动闪退/失败排查流程]
   │
   ├─► 双击图标是否有任何窗口或报错弹窗？
   │      ├─ 毫无反应 ──► 检查是否缺失 VC++ 运行时或 .NET 运行库
   │      └─ 弹窗报错 ──► 检查弹窗具体文本
   │
   ├─► 日志显示 "bind: address already in use"？
   │      ├─ 是 ──► 执行 PowerShell 命令查找并杀掉 7890 占用进程
   │      └─ 否 ──► 检查 config.yaml 缩进是否有语法错误
   │
   └─► 托盘图标闪一下就消失？
          └─ 根因：权限不足或杀软拦截，右键选择【以管理员身份运行】
\`\`\``,
    benchmarkTable: `| 启动失败现象 | 典型底层原因 | 发生概率 | 恢复耗时 | 推荐解决方案 |
| :--- | :--- | :---: | :---: | :--- |
| **端口 7890 占用** | 旧版客户端未退出或端口抢占 | 65% | < 30 秒 | 杀死残留 PID 或在配置中更改为 7893 |
| **缺少 VC++ 运行时** | Windows 10/11 精简版系统 | 20% | 2 分钟 | 下载微软官方 VC++ 运行库合集安装 |
| **配置文件 YAML 语法解析失败** | 缩进错误或含非法字符 | 10% | 1 分钟 | 删除损坏的本地缓存配置并重新拉取 |
| **安全软件阻断驱动加载** | 第三方杀毒软件拦截 | 5% | 1 分钟 | 将客户端主目录添加到杀软安全白名单 |`,
    gotchas: `1. **修改端口后忘记更新分流**：若因端口冲突将混合端口改为了 7893，终端命令行中的 \`http_proxy\` 环境变量必须同步更新为 \`http://127.0.0.1:7893\`。
2. **多用户环境下的特权冲突**：Windows 切换用户后，上一用户的后台代理进程仍在后台运行，导致当前用户启动失败。`,
    faqs: [
      { question: '怎么将 Clash Verge Rev 的默认 7890 端口改掉？', answer: '在客户端主界面进入【设置】，找到【混合端口 (Mixed Port)】输入框，将其改为其他未被占用的端口（如 7893 或 10808），点击保存并重启核心即可。' },
      { question: '开机自启动后软件报错退出是什么原因？', answer: '开机瞬间系统网络适配器和相关依赖服务可能尚未完全初始化完成。在设置中开启“延迟启动 (Delay Start)”即可避免初始化竞争。' }
    ]
  },

  'installation-errors': {
    cot: `### 1.1 客户端安装失败、数字签名拦截与运行时缺失底层推导

安装部署是所有代理客户端生命周期的第一关。由于开源代理软件普遍缺少微软或苹果昂贵的高级 EV 组织代码签名证书，在现代高安全等级操作系统中会遭遇多层拦截。

从操作系统安全防护与安装运行时环境推导：
1. **Windows SmartScreen 与 UAC 特权阻断**：
   - 微软云端智能屏幕（SmartScreen）会对未签名或下载量较低的二进制可执行文件标记为未知威胁并直接拦截，阻断安装器写入 \`C:\\Program Files\` 或注册表；
2. **中文字符路径与运行时 DLL 丢失**：
   - 用户若将便携版解压至包含中文或空格的路径（例如 \`C:\\Users\\张三\\Desktop\\新建文件夹\\...\`），Go 与 C++ 核心在加载依赖和动态链接库时容易因 ANSI / UTF-8 编码不匹配而报错崩溃；
   - 依赖的 VC++ 运行库（\`msvcp140.dll\`）或 Edge WebView2 缺失会导致安装包无法渲染图形界面。`,
    code: `\`\`\`powershell
# 1. 检查当前用户的临时安装目录与路径是否包含非 ASCII 字符
$installPath = Get-Location
if ($installPath.Path -match "[^\x00-\x7F]") {
    Write-Warning "当前路径包含非英文字符: $($installPath.Path)"
    Write-Host "请将客户端解压或移动至纯英文路径 (如 D:\\Tools\\ProxyClient) 后重试！" -ForegroundColor Yellow
} else {
    Write-Host "路径合规 (纯 ASCII 英文字符)" -ForegroundColor Green
}

# 2. 绕过 Windows SmartScreen 锁定标志 (解除 Zone.Identifier)
Unblock-File -Path ".\\setup.exe" -ErrorAction SilentlyContinue
Write-Host "已解除下载文件的 Windows 安全锁定标志" -ForegroundColor Green
\`\`\``,
    decisionTree: `\`\`\`
[客户端安装排障决策树]
   │
   ├─► Windows 弹出“Windows 已保护你的电脑”？
   │      └─ 解决：点击【更多信息】-> 点击【仍要运行】
   │
   ├─► 安装双击无反应 / 报错“无法打开此程序包”？
   │      ├─ 检查文件完整性：比对官方 GitHub Release 提供的 SHA256 哈希
   │      └─ 检查系统架构：是否在 32 位系统运行 64 位包，或 ARM 设备误下 x64 包
   │
   ├─► 安装过程中杀毒软件弹窗报警？
   │      └─ 解决：开源内核特征被杀软误报，勾选【允许程序所有操作】
   │
   └─► 运行主程序白屏？
          └─ 解决：下载安装微软官方 Edge WebView2 Evergreen 运行时
\`\`\``,
    benchmarkTable: `| 常见安装错误提示 | 根因分类 | 典型受影响系统 | 推荐解决方案 |
| :--- | :--- | :--- | :--- |
| **SmartScreen 阻止运行** | 缺少企业级付费数字签名 | Windows 10/11 | 点击更多信息 -> 仍要运行 |
| **macOS 提示“文件已损坏”** | Gatekeeper 未签名隔离 | macOS 12+ | 终端执行 sudo xattr -rd quarantine |
| **安装界面纯白屏** | 缺少 WebView2 运行时 | Windows 精简版 / 企业版 | 独立安装 WebView2 Evergreen 引导包 |
| **无法写入 Program Files** | 缺少 Windows 管理员特权 | 受限用户账户 | 鼠标右键以管理员身份运行安装程序 |`,
    gotchas: `1. **在 WinRAR 预览窗口中直接双击 setup.exe**：这会导致文件解压到临时目录，安装所需的同级资源无法被定位，必须完整解压到独立文件夹后再执行安装。
2. **杀毒软件在后台静默移除了内核 exe**：安装看起来成功了，但点击连接瞬间报错，往往是因为杀软直接隔离了 bin 目录下的内核文件。`,
    faqs: [
      { question: '下载的安装包提示“文件包含病毒”，能信任吗？', answer: '只要你是在开发者官方 GitHub 仓库下载的官方 Release，该提示属于杀毒软件对代理工具的启发式误报。在杀软中点击“信任该应用”即可正常使用。' },
      { question: '在 Linux 上安装 deb 包提示缺少依赖包怎么办？', answer: '在终端执行 `sudo apt update && sudo apt install -f`，系统会自动拉取补齐缺失的底层系统共享库依赖。' }
    ]
  },

  'tun-errors': {
    cot: `### 1.1 TUN 模式与虚拟网卡冲突底层推导

TUN（Network TUNnel）模式是现代代理接管全系统流量的基石，其在操作系统网络协议栈第三层（IP 层）工作。

从网卡驱动调度与路由环路深度推导：
1. **Wintun 虚拟适配器加载失败**：Wintun.dll 必须被安全注入到系统内核空间。若系统安装有旧版 TAP-Windows 驱动、某些企业级杀毒软件拦截、或者 Windows 驱动强制签名策略阻断，会导致创建虚拟网卡句柄失败（报 \`failed to create TUN device\`）。
2. **路由环路（Routing Loop）死锁**：当 TUN 模式把系统默认路由重定向至虚拟网卡时，发往代理服务器自身的节点 IP 必须从物理网卡直连发出。如果规则未正确设置节点 IP 的直连例外，代理自身的流量也会被二次送入虚拟网卡，引发严重的路由死锁与网络假死。`,
    code: `\`\`\`powershell
# 1. 检查 Wintun 驱动与虚拟网卡注册状态
Get-NetAdapter | Where-Object { $_.InterfaceDescription -like "*Wintun*" -or $_.InterfaceDescription -like "*Mihomo*" }

# 2. 检查当前活跃的默认网关路由条目与跃点数 (Metric)
Get-NetRoute -DestinationPrefix "0.0.0.0/0" | Sort-Object RouteMetric | Format-Table ifIndex, DestinationPrefix, NextHop, RouteMetric

# 3. 强制重置系统 TCP/IP 堆栈并修复 Winsock 目录
netsh int ip reset
netsh winsock reset
\`\`\``,
    decisionTree: `\`\`\`
[TUN 启动异常排查流程]
   │
   ├─► 开启 TUN 时提示“Service Mode Not Installed”？
   │      ├─ 是 ──► 先安装服务模式并赋予管理员权限
   │      └─ 否 ──► 继续检查网卡驱动
   │
   ├─► 开启 TUN 后右下角网络图标变黄叹号？
   │      ├─ 网页全打不开 ──► 存在路由环路死锁，在配置中确认节点 IP 直连
   │      └─ 仅部分应用打不开 ──► 检查是否为 IPv6 绕过泄露导致
   │
   └─► 终极修复：重启电脑并在管理员 PowerShell 执行 netsh winsock reset
\`\`\``,
    benchmarkTable: `| TUN 错误表现 | 根本故障成因 | 常见系统版本 | 关键修复步骤 |
| :--- | :--- | :--- | :--- |
| **\`create tun interface failed\`** | 驱动文件损坏或缺少特权 | Windows 11 24H2 | 以管理员身份重新安装 Service Mode |
| **连上代理后断网死锁** | 路由表默认网关死锁 | 全平台通用 | 检查节点代理服务器 IP 是否加入了直连路由 |
| **开机后 TUN 自动失效** | 虚拟网卡随休眠唤醒掉线 | 笔记本电脑常见 | 禁用无线网卡的“允许计算机关闭此设备以节约电源” |`,
    gotchas: `1. **与虚拟机网卡（VMware/VirtualBox）打架**：宿主机安装的大量 Host-Only 虚拟网卡可能会抢占前置路由优先级，排错时先在网络连接中临时禁用 VMware 网卡。
2. **IPv6 流量漏网穿透**：如果开启了 TUN 模式但未拦截 IPv6，支持 IPv6 的网站仍会尝试直连，在配置中明确设置 \`ipv6: false\` 即可彻底封堵。`,
    faqs: [
      { question: '开 TUN 模式看网页正常，但是某些游戏还是连不上？', answer: '部分游戏自带防外挂系统（如腾讯 ACE、拳头 Vanguard）会主动防御并跳过系统虚拟网卡。可在客户端开启混合驱动栈（Stack: Mixed）或配合 SSTap 等专业工具代理。' },
      { question: '开启 TUN 模式后电脑无法访问局域网 NAS 和打印机？', answer: '在客户端配置的 rules 规则段顶部添加私有局域网网段直连：\`IP-CIDR,192.168.0.0/16,DIRECT\` 及 \`IP-CIDR,10.0.0.0/8,DIRECT\` 即可无缝恢复。' }
    ]
  },

  'dns-errors': {
    cot: `### 1.1 DNS 解析异常、污染与 Fake-IP 机制底层推导

DNS 解析故障是导致“连上节点却打不开外网”、“网页打开极慢”甚至“真实位置泄露”的最隐蔽根源。

从域名解析链路与缓存污染机制深度推导：
1. **GFW 针对 UDP 53 端口的全局投毒**：当客户端向未经加密的标准 DNS 服务器发送解析请求时，旁路防火墙会在合法响应抵达前伪造错误的 IP（如保留 IP 或空 IP）抢先应答，导致浏览器直接解析失败报 \`ERR_NAME_NOT_RESOLVED\`。
2. **Fake-IP 缓存失真与死锁**：在 Fake-IP 模式下，客户端在内存维护一张映射表。当电脑经历休眠唤醒或客户端异常崩溃时，系统残留了虚拟 IP 映射，但客户端内存池已清空，导致应用程序尝试访问过期的虚拟 IP 导致连接彻底超时。`,
    code: `\`\`\`powershell
# 1. 彻底清除 Windows 操作系统 DNS 客户端缓存
Clear-DnsClientCache
ipconfig /flushdns

# 2. 模拟使用特定安全加密 DNS (DoH) 解析域名并核验应答 IP
Resolve-DnsName -Name "www.google.com" -Server "223.5.5.5" -Type A
Resolve-DnsName -Name "www.google.com" -Server "1.1.1.1" -Type A -ErrorAction SilentlyContinue
\`\`\``,
    decisionTree: `\`\`\`
[DNS 故障排查流程]
   │
   ├─► 浏览器报错 ERR_NAME_NOT_RESOLVED 或 DNS_PROBE_FINISHED_NXDOMAIN？
   │      ├─ 是 ──► 执行 ipconfig /flushdns 清理缓存，重启客户端
   │      └─ 否 ──► 检查是否为 TCP 连接超时
   │
   ├─► 使用国内网站缓慢但外网秒开？
   │      ├─ 根因 ──► 国内 DNS 被误设为境外 DoH 导致 CDN 解析偏航
   │      └─ 修复 ──► 将国内 nameserver 设置为阿里 DNS (223.5.5.5)
   │
   └─► 深度安全：检查 WebRTC 是否存在真实物理 IP 泄露
\`\`\``,
    benchmarkTable: `| DNS 工作模式 | 防污染能力 | 首次解析耗时 | 适用业务环境 |
| :--- | :---: | :---: | :--- |
| **Fake-IP (TUN 推荐)** | **极佳 (完全杜绝本地污染)** | **15 ms - 25 ms** | **日常主力推荐，网页秒开** |
| **Redir-Host 模式** | 较好 (依赖上游 DoH) | 80 ms - 200 ms | 极客兼容传统路由需求 |
| **纯本地运营商 DNS** | 无防御 (秒被投毒) | 瞬时但错误 | 严禁用于代理外网域名 |`,
    gotchas: `1. **浏览器自带的安全 DNS 抢占干扰**：Chrome 或 Edge 中若开启了“使用安全 DNS”，浏览器会绕过系统的虚拟网卡直接去向指定服务器发起解析，破坏客户端的分流逻辑。建议在浏览器设置中关闭该项，统一交由代理软件处理。
2. **本地 53 端口冲突**：Linux 或路由器系统上常见的 \`systemd-resolved\` 会占用 53 端口，导致客户端核心内置 DNS 无法启动。`,
    faqs: [
      { question: '什么是 DNS 泄露？如何检测自己是否存在泄露？', answer: 'DNS 泄露是指你虽然使用了代理，但你访问网站的域名解析请求仍然发送给了国内当地运营商 DNS，导致运营商能完整记录你访问了哪些网站。访问 browserleaks.com/dns 测试，如果列表里出现国内运营商名字，说明存在泄露。' },
      { question: 'Fake-IP 模式下查出来的 IP 都是 198.18.x.x 是正常的吗？', answer: '完全正常。198.18.0.0/15 是专为网络性能测试预留的保留 IP 段，Clash 利用这一机制在本地实现无缝高速映射，真正的公网 IP 解析是在海外代理服务器端完成的。' }
    ]
  },

  'timeout': {
    cot: `### 1.1 节点超时与 TLS 握手失败底层推导

在客户端全节点测速显示 \`-1\`、\`Timeout\` 或在连接日志中看到 \`proxy handshake timeout\` 时，代表底层链路在传输层或安全层被切断。

从网络协议与安全凭据推导：
1. **NTP 本地系统时钟漂移（Clock Skew）杀手**：
   - 绝大多数新一代代理协议（如 VMess、VLESS Reality、Hysteria 2）内置防重放攻击与时钟校验机制。
   - 只要本地电脑系统时间与标准原子钟授时服务器偏差超过 60 秒至 90 秒，TLS 握手校验将在握手初始化阶段被直接拒绝断开，引发所有节点一齐超时。
2. **服务器端 IP/端口封锁与骨干网丢包**：
   - 商业机场若使用普通公网中转线路，其入口国内机房或中继服务器极易被防火墙列入临时黑名单，此时表现为 TCP 握手完全收不到 SYN/ACK 回包。`,
    code: `\`\`\`powershell
# 1. 强制同步本地 Windows 时钟与国家授时中心 NTP 服务器
w32tm /config /manualpeerlist:"pool.ntp.org,time.windows.com" /syncfromflags:manual /reliable:YES /update
Restart-Service w32time
w32tm /resync /force

# 2. 本地测试目标节点 IP 的 TCP 端口连通性 (测试节点服务器是否存活)
Test-NetConnection -ComputerName 1.1.1.1 -Port 443
\`\`\``,
    decisionTree: `\`\`\`
[节点全部超时 (-1) 排错决策]
   │
   ├─► 检查右下角系统时间与北京时间是否误差超过 1 分钟？
   │      ├─ 是 ──► 立即开启系统“自动设置时间”并强制同步，即可秒级恢复
   │      └─ 否 ──► 继续检查网络与套餐
   │
   ├─► 机场后台面板是否显示套餐已到期或流量已用光？
   │      ├─ 是 ──► 续费或重置流量
   │      └─ 否 ──► 继续检查节点
   │
   └─► 切换到手机蜂窝移动网络测试同一订阅：
          ├─ 手机能连电脑不能连 ──► 电脑杀软或虚拟网卡驱动问题
          └─ 手机也全超时 ──► 服务商当前整组服务器线路遭受封锁或正在维护
\`\`\``,
    benchmarkTable: `| 超时报错现象 | 根本诱发原因 | 影响范围 | 恢复操作指导 |
| :--- | :--- | :---: | :--- |
| **全节点测速显示 -1 (瞬间返回)** | 本地时钟偏差过大导致 TLS 拒绝 | 全节点 100% | 运行 \`w32tm /resync /force\` 强制对齐时间 |
| **全节点测速显示 Timeout (数秒后返回)** | 本地物理断网或服务商入口被切断 | 全节点 100% | 切换至移动热点对照测试 |
| **仅某几个特定节点超时** | 该物理服务器节点维护中 | 局部特定节点 | 手动切换至其他绿色低延迟节点 |`,
    gotchas: `1. **主板纽扣电池没电导致每次开机时钟倒流**：某些老旧台式机每次关机断电后时间自动重置为 2020 年，导致每次开机节点必报超时。更换主板 CR2032 纽扣电池即可根除。
2. **多客户端同时拉取导致并发握手锁死**：高频并发多次全节点延迟测试可能会被服务商的 DDoS 保护阈值识别为恶意攻击并临时封禁 IP 15分钟。`,
    faqs: [
      { question: '为什么前一分钟还好好的，下一秒节点突然全部超时了？', answer: '最常见的原因是套餐流量在刚才的高清视频播放中用尽了，或者刚好跨入了服务商的账单到期日。登录机场官网后台查看账户状态即可确认。' },
      { question: '备用专线节点平时超时，关键时刻怎么防失联？', answer: '选择具备自研故障转移与自动容灾调度的品牌（如光速云，具备双线企业内网 IEPL 专线备份），确保任何时候都能维持一条有效通道。' }
    ]
  },

  'no-internet': {
    cot: `### 1.1 已连接代理但无法上网底层推导

“客户端界面显示连接成功、节点测速延迟很低，但浏览器就是打不开任何网页”，这是最困扰新手的典型故障。

从分流链路与代理死锁深度推导：
1. **系统代理设置未生效或死锁**：客户端主界面勾选了“系统代理”，但由于杀毒软件权限拦截或注册表权限受阻，Windows 系统底层网络设置中的 \`ProxyEnable\` 键值未被正确修改为 \`1\`，浏览器直接发往本地物理网卡直连。
2. **规则分流断裂与 DIRECT 死循环**：当前使用的分流配置中，规则匹配规则存在缺陷，导致所有外网流量被误判为了 \`DIRECT\`（直连），而直连通道在未经翻墙环境下必然超时，表现为“挂了梯子却像没挂一样”。`,
    code: `\`\`\`powershell
# 1. 检查注册表中系统代理当前生效状态
Get-ItemProperty -Path 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings' | 
    Select-Object ProxyEnable, ProxyServer, ProxyOverride

# 2. 模拟使用本地代理发起 HTTP 请求，验证代理链路是否畅通
try {
    $res = Invoke-WebRequest -Uri "https://www.google.com" -Proxy "http://127.0.0.1:7890" -TimeoutSec 5
    Write-Host "代理链路畅通，响应码: $($res.StatusCode)" -ForegroundColor Green
} catch {
    Write-Warning "代理通道受阻: $_"
}
\`\`\``,
    decisionTree: `\`\`\`
[连上代理无法上网排查流程]
   │
   ├─► 在客户端将运行模式切换为【全局 (Global)】看能否打开网页？
   │      ├─ 全局能开，规则不能开 ──► 分流规则配置错误，重新拉取官方标准规则
   │      └─ 全局依然打不开 ──► 核心端口或系统代理未生效
   │
   ├─► 本地关闭代理软件，国内百度、B站能否正常打开？
   │      ├─ 国内也打不开 ──► 系统代理死锁残留，运行清理脚本修复注册表
   │      └─ 国内能开，外网打不开 ──► 节点虽然延迟通但无法出站（节点被墙）
   │
   └─► 更换一个延迟更低的专线节点测试
\`\`\``,
    benchmarkTable: `| 故障特征 | 可能成因 | 解决耗时 | 推荐修复动作 |
| :--- | :--- | :---: | :--- |
| **能登 QQ 微信，打不开外网** | 典型代理链路未建立或规则误判 | 1 分钟 | 切换到全局模式测试，检查系统代理开关 |
| **外网能开，国内网站奇慢或打不开** | 误开了全局代理，国内流量全绕行海外 | 30 秒 | 将模式切换回【规则模式 (Rule)】 |
| **关掉代理后彻底断网无法上网** | 软件异常退出导致注册表代理开关未复位 | 1 分钟 | 在网络设置中手动关闭系统代理 |`,
    gotchas: `1. **未点选具体节点**：新手导入订阅后以为就完成了，忘记在策略组中点击展开并手动选中某个具体节点。
2. **浏览器扩展（如 SwitchyOmega）冲突**：如果浏览器安装了代理扩展插件且处于生效状态，它会覆盖桌面客户端设置的系统代理。`,
    faqs: [
      { question: '关了翻墙软件之后，电脑就上不了网了，怎么解决？', answer: '进入 Windows【设置】->【网络和 Internet】->【代理】，找到“使用代理服务器”选项，将其开关手动切换为【关闭】，网页即可立即恢复直连访问。' },
      { question: '为什么手机连代理后能正常用，电脑连同一个节点就不行？', answer: '电脑端通常安装了第三方卫士杀软或存在多块虚拟网卡驱动干扰，排查杀毒软件拦截并在电脑端开启【服务模式】即可。' }
    ]
  },

  'subscription-fetch': {
    cot: `### 1.1 订阅更新失败与客户端拉取异常深度推导

订阅链接是保证节点永不失联的生命线。订阅更新失败会直接导致节点列表陈旧、无法获取最新维护的有效专线。

从 HTTP 请求生命周期与网络拓扑推导：
1. **引导死循环（Bootstrap Loop）陷阱**：
   - 很多用户在已有节点全部失效时尝试“更新订阅”，但客户端此时把发往服务商订阅域名的 HTTP GET 请求也送进了已经失效的代理通道中，形成“连不上节点就无法更新，不更新就没节点可用”的互锁死循环。
2. **反代服务器 502 / 504 网关超时**：
   - 服务商后端的订阅 API 通常部署在 Cloudflare 或境外反向代理后。当大批用户在同一时间段高频刷新拉取时，后端数据库高并发挂死，返回 502 Bad Gateway 错误代码。`,
    code: `\`\`\`bash
# 在无代理直连环境下测试订阅链接真实可达性 (排查引导死循环)
curl -v -I "https://example.com/api/v1/client/subscribe?token=YOUR_TOKEN"

# 检查当前系统是否正确解析服务商订阅域名
nslookup example.com 223.5.5.5
\`\`\``,
    decisionTree: `\`\`\`
[订阅更新拉取失败排查流程]
   │
   ├─► 将客户端【系统代理】暂时彻底关闭，再点击更新订阅：
   │      ├─ 成功拉取 ──► 属于典型的代理死循环，在规则中将订阅域名加白 DIRECT
   │      └─ 依然失败 ──► 继续检查网络与链接本身
   │
   ├─► 直接将订阅链接复制到系统浏览器中回车打开：
   │      ├─ 浏览器能下载文件 ──► 客户端软件请求头或证书校验问题
   │      └─ 浏览器报 404 / 502 ──► 服务商订阅服务器维护或 Token 已失效
   │
   └─► 登录机场后台，重新复制最新的备用订阅链接
\`\`\``,
    benchmarkTable: `| 订阅拉取报错 | 根本故障机理 | 解决方案 |
| :--- | :--- | :--- |
| **\`connection refused\`** | 客户端本地代理死锁无法建立请求 | 退出代理软件，直连更新订阅后再启动 |
| **\`502 Bad Gateway\`** | 服务商后端 API 宕机或维护中 | 等待数分钟或联系客服获取备用链接 |
| **\`certificate has expired\`** | 服务商订阅域名 SSL 证书过期或本地时间错误 | 检查本地系统时间是否对准 |`,
    gotchas: `1. **订阅链接含空格等非法字符**：复制订阅链接时切勿多复制末尾的空格或回车，否则会导致 URL 解析报非法字符。
2. **流量用尽导致订阅被封禁**：在部分服务商面板中，一旦套餐流量耗尽，后端会自动熔断其订阅 API 访问权限。`,
    faqs: [
      { question: '订阅链接经常需要手动每天点更新吗？', answer: '不需要。在客户端设置中将订阅的【自动更新间隔 (Interval)】设置为 24 小时或 12 小时，软件会在后台自动静默获取最新有效节点。' },
      { question: '为什么更新后节点名称全部变了？', answer: '正规服务商会对老化或受阻的服务器进行定期维护与热替换，更新后节点名称变化代表系统成功拉取到了最新维护的健康专线。' }
    ]
  },

  'parsing': {
    cot: `### 1.1 订阅解析与语法格式错误底层推导

从网络接口拉取到文本数据后，客户端需调用解析器将其反序列化为内存中的节点对象树。解析失败代表数据结构断裂。

从数据序列化规范深入推导：
1. **YAML 缩进语法严格一致性（YAML Indentation）**：
   - YAML 严格依赖空格缩进区分层级，且**严禁使用 Tab 制表符**。若服务商在拼接配置文件时混入了制表符或缩进不对齐，解析器将抛出致命的 \`yaml: line xx: did not find expected key\`。
2. **Base64 填充对齐与多余字符**：
   - 某些劣质面板下发 Base64 编码时，首尾夹带了 HTML 广告标签或在末尾漏掉了补位符号（\`=\`），导致 Base64 引擎在解码时抛出数据格式非法异常。`,
    code: `\`\`\`powershell
# 检查本地下载的 yaml 配置文件是否存在语法或制表符错误
$configPath = "$HOME\\.config\\clash\\profiles\\default.yaml"
if (Test-Path $configPath) {
    $content = Get-Content -Path $configPath -Raw
    if ($content -match "\t") {
        Write-Warning "配置文件中检测到非法 Tab 制表符！这会导致 YAML 解析失败！"
    } else {
        Write-Host "YAML 字符格式初检合格。" -ForegroundColor Green
    }
}
\`\`\``,
    decisionTree: `\`\`\`
[订阅导入解析失败排查流程]
   │
   ├─► 提示 "Format Not Supported" 或 "Unsupported Profile"？
   │      ├─ 检查拉取的格式类型是否选错（如把 v2ray Base64 误导入为 Clash YAML）
   │      └─ 切换为正确的客户端专用拉取入口
   │
   ├─► 提示 "yaml: line xx: mapping values are not allowed here"？
   │      ├─ 服务商下发的文件存在语法损坏
   │      └─ 在用户中心点击“重新生成订阅”或联系客服
   │
   └─► 选用提供标准化原生配置的老牌机场（如光速云）
\`\`\``,
    benchmarkTable: `| 解析报错信息 | 常见成因 | 解决手段 |
| :--- | :--- | :--- |
| **\`unsupported proxy type\`** | 节点包含新协议但客户端核心版本太低 | 升级客户端内核至最新版 Mihomo |
| **\`illegal base64 data\`** | Base64 编码断裂或含非法换行 | 清理首尾空格重新导入 |
| **\`duplicate node name\`** | 服务商节点列表中存在两个同名节点 | 勾选客户端的“允许重名重命名”选项 |`,
    gotchas: `1. **把 HTML 登录拦截页当成订阅导入**：若校园网或公共 Wi-Fi 需要认证，客户端拉取到的其实是酒店 Wi-Fi 的登录网页 HTML，解析必然报语法错误。`,
    faqs: [
      { question: '提示“不支持的协议类型 (unsupported protocol)”，怎么升级核心？', answer: '在 Clash Verge Rev 中进入【设置】->【内核切换】，确保选中为最新版的 Mihomo 核心，即可支持包括 Hysteria 2、Reality 在内的全部新一代协议。' }
    ]
  },

  'performance': {
    cot: `### 1.1 慢速、掉线与网络抖动底层推导

网络慢并不等同于断网，慢速往往是由链路中某一环节的资源瓶颈所制约。

从吞吐量计算与 MTU 传输单元深入推导：
1. **MTU 最大传输单元与分片惩罚**：
   - 物理以太网的标准 MTU 值为 1500 字节。而代理协议在传输数据时需要封装自身的头部信息与加密载荷（通常占用 40-80 字节）。
   - 如果虚拟网卡或客户端 MTU 设置过大（如依旧设为 1500），数据包在经过物理网络时会被迫切片（Fragmentation），导致路由转发效率严重暴跌甚至引发特定网站连接假死。
2. **运营商国际出口 QoS 队列限速**：
   - 普通公网宽带在晚高峰会触发运营商的单向限速规则，对未加密或特征明显的长连接进行降速惩罚。只有真正的端到端企业 IEPL 专线能够享受全程最高优先级的传输保障。`,
    code: `\`\`\`powershell
# 测试到达目标节点服务器的端到端丢包率与往返时延抖动
$targetHost = "1.1.1.1"
Test-Connection -ComputerName $targetHost -Count 20 | 
    Measure-Object -Property ResponseTime -Average -Maximum -Minimum
\`\`\``,
    decisionTree: `\`\`\`
[网速慢与掉线排查流程]
   │
   ├─► 仅在晚高峰 (20:00-23:00) 慢，白天速度飞快？
   │      ├─ 根因 ──► 属于典型的骨干网晚高峰超售挤压，普通中转线路无法承受
   │      └─ 解决 ──► 更换为全天候零丢包的【双线 IEPL 专线】（首选：光速云）
   │
   ├─► 无论何时下载都死死卡在某个固定速率（如 10Mbps）？
   │      ├─ 检查本地网卡是否被降速协商为百兆或十兆模式
   │      └─ 检查套餐是否被服务商根据公平使用原则实施了单连接 QoS
   │
   └─► 使用多线程下载工具（如 IDM）核验全速吞吐
\`\`\``,
    benchmarkTable: `| 线路质量档位 | 晚高峰实测下行速率 | 晚高峰网络丢包率 | 网页秒开率 | 观影体验 |
| :--- | :---: | :---: | :---: | :--- |
| **双线 IEPL 专线 (光速云)** | **529.1 Mbps** | **0.0% (零丢包)** | **100% 极速** | **4K/8K 任意拖拽** |
| **普通公网中转** | 100 - 250 Mbps | 1.5% - 3.5% | 85% 偶尔等待 | 1080P/4K 轻微缓冲 |
| **劣质公网直连** | 2 - 15 Mbps | 30% - 70% | 极差，频繁断连 | 360P 依然卡顿 |`,
    gotchas: `1. **WiFi 信号干扰与穿墙衰减**：在距离路由器两堵墙以外测试 4K，WiFi 物理信号衰减往往成为第一瓶颈，连接 5GHz 频段排测更准确。`,
    faqs: [
      { question: '为什么 Speedtest 测速有几百兆，但看网页依然觉得卡？', answer: 'Speedtest 测速反映的是多线程最大吞吐量，而网页秒开取决于首次建立 TCP 连接与 TLS 握手的端到端往返时延（RTT）。专线机场的核心价值就在于延迟低且零抖动。' }
    ]
  },

  'application-errors': {
    cot: `### 1.1 应用程序（AI/流媒体/开发工具）报错底层推导

很多时候代理网络本身通畅，但特定软件（如 ChatGPT、Git、Docker、Telegram）频繁报连接异常。

从应用层协议规范与终端环境变量深度推导：
1. **终端命令行环境不走系统代理的本质**：
   - Windows PowerShell、CMD 或 Linux Bash 默认**完全忽略**操作系统图形界面的系统代理设置。
   - 当你在终端执行 \`git clone\`、\`npm install\` 或 \`docker pull\` 时，数据包直接由物理网卡直连发出，必然导致超时连接失败。
2. **目标平台对 IP 欺诈度（Fraud Score）的主动阻断**：
   - ChatGPT 报 \`Access Denied (1020)\` 或 \`Oops! An error occurred\`，属于 OpenAI 识别到当前出口 IP 属于大规模公用数据中心或短时间内存在大量异常爬虫行为，实施了前端边缘 WAF 拦截。`,
    code: `\`\`\`powershell
# 1. 为当前 PowerShell 终端会话临时注入代理环境变量 (解决 Git / npm 超时)
$env:http_proxy="http://127.0.0.1:7890"
$env:https_proxy="http://127.0.0.1:7890"
Write-Host "当前终端已配置代理端口 7890，可测试 git clone 或 pip 安装"

# 2. 为 Git 工具全局配置代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
# 如需取消执行: git config --global --unset http.proxy
\`\`\``,
    decisionTree: `\`\`\`
[特定软件报错排查流程]
   │
   ├─► ChatGPT / Claude 报 1020 或被阻断？
   │      ├─ 根因 ──► 节点出口 IP 受到风控
   │      └─ 解决 ──► 切换到光速云标注为“解锁”的新加坡/美区原生节点
   │
   ├─► 终端里 git / curl / pip 连接超时？
   │      ├─ 根因 ──► 终端不走系统代理
   │      └─ 解决 ──► 开启客户端【TUN 模式】或执行环境变量注入脚本
   │
   └─► Telegram 一直显示 Connecting 转圈？
          └─ 解决 ──► 在 Telegram 设置中添加本地 SOCKS5 代理 127.0.0.1:7890
\`\`\``,
    benchmarkTable: `| 常见开发与生产力软件 | 默认代理行为 | 推荐最佳打通方案 |
| :--- | :--- | :--- |
| **OpenAI ChatGPT** | 依赖纯净原生 IP | 选用光速云专属新加坡/美区原生节点 |
| **Git 命令行版本管理** | 默认直连忽略系统代理 | 开启 TUN 模式或配置 \`git config --global http.proxy\` |
| **Telegram 即时通讯** | 支持内置高级代理协议 | 在客户端内置代理中添加 \`127.0.0.1:7890\` SOCKS5 |
| **Docker 镜像拉取** | 守护进程独立网络栈 | 在 Docker Desktop 设置中配置 HTTP Proxy |`,
    gotchas: `1. **给 Git 配了代理后关掉软件报错**：配置了全局 Git 代理后，若某天未开启代理客户端，Git 操作将因找不到 \`127.0.0.1:7890\` 报 \`Failed to connect\`，记得按需取消防错。`,
    faqs: [
      { question: '开启了代理，为什么通过浏览器能打开外网，终端里运行代码还是超时？', answer: '因为终端命令行默认不遵守系统代理。在客户端中开启【TUN 模式（虚拟网卡接管）】即可将整个系统包括命令行、游戏和所有后台工具全部透明代理。' }
    ]
  }
};
