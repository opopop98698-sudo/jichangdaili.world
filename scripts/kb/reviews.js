// Reviews Knowledge Base (10 topics)
export const reviewsKB = {
  'methodology': {
    cot: `### 1.1 代理工具与网络服务科学测评方法论推导

盲目的“跑分截图”无法反映代理工具的真实工程素质。一套科学、严谨、可复现的测评体系必须排除本地网络瞬时抖动、公网随机丢包与第三方服务端欺骗。

从分布式网络测量学与统计学模型推导：
1. **多维度核心度量矩阵**：
   - **TCP 握手与真实传输延迟（TTFB）**：不仅看单次 ICMP Ping（极易被节点中转伪造欺骗），必须测量端到端从发送 HTTP 请求到首字节到达的时间；
   - **吞吐带宽与拥塞窗口（CWND）爬升**：通过大文件分片并行下载与单线程压测，测量 TCP BBR 算法在晚高峰高丢包场景下的真实抗震能力；
   - **延迟抖动标准差（Jitter / StdDev）**：抖动越小代表专线稳定性越高；
2. **测试基线与控制变量原则**：
   - 固定同一宽带物理环境（千兆电信/联通/移动独立测试）；
   - 固定测试时间段（日常平峰 14:00 vs 晚高峰严酷拥堵期 21:00）；
   - 杜绝单次测试偶然性，采用连续 10 次采样取四分位中位数（IQR）。`,
    code: `\`\`\`bash
# 科学测评标准执行脚本：端到端真实延迟 (TTFB) 与抖动多轮采样分析
cat << 'EOF' > evaluate_benchmark.sh
#!/bin/bash
PROXY="http://127.0.0.1:7890"
TARGET="https://www.google.com/generate_204"

echo "正在执行 10 轮端到端 TTFB 测量 (排除 ICMP 虚假低延迟)..."
results=()

for i in {1..10}; do
    ttfb=$(curl -o /dev/null -s -w "%{time_starttransfer}\n" -x $PROXY $TARGET)
    ms=$(awk "BEGIN {print $ttfb * 1000}")
    results+=($ms)
    echo "第 $i 轮首字传输耗时: \${ms} ms"
    sleep 0.5
done

# 计算平均值与极差
awk -v r="\${results[*]}" 'BEGIN {
    split(r, a, " ");
    sum=0; min=99999; max=0;
    for (i in a) {
        sum += a[i];
        if (a[i] < min) min = a[i];
        if (a[i] > max) max = a[i];
    }
    printf "================ 科学测评结果汇总 ================\n";
    printf "平均 TTFB 真实响应: %.2f ms\n", sum / length(a);
    printf "极值波动跨度 (Max-Min): %.2f ms\n", max - min;
}'
EOF
chmod +x evaluate_benchmark.sh
\`\`\``,
    decisionTree: `\`\`\`
[科学评测指标可信度决策]
   │
   ├─► 评测数据来源审查：
   │      ├─ 仅有一张客户端内测 Ping 截图 ──► 可信度极低！(中转机仅测了国内入口延迟)
   │      ├─ 仅跑了一次 Speedtest 峰值 ──► 可信度一般 (无法反映持久拥堵与丢包)
   │      └─ 晚高峰连续 TTFB 采样 + 流媒体真实 4K 缓冲曲线 ──► 顶级高可信度
   │
   ├─► 核心三看原则：
   │      ├─ 1. 看晚高峰 (20:30-22:30) 丢包率是否低于 0.5%
   │      ├─ 2. 看 Google/OpenAI 原生纯净度 (是否频繁跳验证码)
   │      └─ 3. 看流媒体解锁原生归属地 (是否支持非自制剧播放)
   │
   └─► 终极指标：平峰跑分无意义，唯有晚高峰持久战见真章
\`\`\``,
    benchmarkTable: `| 测评维度 | 核心度量工具 | 虚假作弊可能性 | 真正优秀基线标准 |
| :--- | :--- | :---: | :--- |
| **真实往返延迟** | **端到端 HTTP GET (TTFB)** | **几乎无法作弊** | **IPLC < 60ms / 直连 < 180ms** |
| 客户端内 Ping | 仅测客户端到国内中转入口 | 极高 (假绿节点常见) | 仅作为本地连通参考 |
| 晚高峰吞吐带宽 | YouTube 4K 统计信息 / 分片压测 | 低 | **稳定维持 100Mbps+ 无缓冲** |
| 节点可用性 SLA | 连续 7x24 小时状态心跳监控 | 零 | **全天在线率 > 99.8%** |`,
    gotchas: `1. **把客户端测速列表的“绿色低延迟”当成真快**：许多节点国内中转机回包极快（显示 15ms），但中转到落地机早已瘫痪，打开网页依然转圈。
2. **在白天网络空闲期做评测下结论**：白天公网出口充沛，任何垃圾节点都能跑满带宽；只有晚高峰 20:00-23:00 才能鉴别出真正不超售的优质专线。`,
    faqs: [
      { question: '为什么测评里有些机场测速条全红，我用起来却非常流畅？', answer: '测速脚本全并发拉取所有节点会导致瞬间带宽被打满，节点触发保护性限速降权；而日常只使用单条主力节点，专线独享带宽非常充沛。' },
      { question: '什么是流媒体的“非自制剧解锁”？', answer: 'Netflix 等流媒体如果识别到出口是普通机房广播 IP，会只允许你看 Netflix 自己版权的自制剧（无版权限制）；只有采买原生家庭宽带住宅 IP，才能完整解锁当地有版权限制的各类热门影视剧。' }
    ]
  },

  'mihomo-clients': {
    cot: `### 1.1 Mihomo (Clash Meta) 客户端生态竞争格局与架构横评推导

自原始 Clash 内核停更后，Mihomo（原 Clash.Meta）接管了现代 Clash 协议生态的火炬，并在其周围形成了四大主力桌面客户端：**Clash Verge Rev、Clash Nyanpasu、FlClash 与 Mihomo Party**。

从渲染架构与进程调度模型横向推导：
1. **Clash Verge Rev (Tauri + React)**：
   - 继承自原 Verge 代码库，由新维护团队重构。基于微软 WebView2 渲染，体积小（安装包约 20MB），启动迅速。深度集成 Service Mode 和脚本扩展（Script/Merge），生态成熟度最高；
2. **Clash Nyanpasu (Tauri + Vue3)**：
   - 界面现代优雅，采用模块化设计与更现代的路由控制，但在复杂脚本覆写和特权服务安装的边缘场景下偶有兼容性小瑕疵；
3. **FlClash (Flutter + Mihomo)**：
   - 彻底摆脱 WebView 依赖，全平台界面 100% 像素级一致，但对超复杂高阶 YAML 规则脚本的扩展支持稍逊；
4. **Mihomo Party (Electron/Tauri)**：
   - 专注于开箱即用的“小白化”设计，提供极致直观的节点卡片与图形化分流设置。`,
    code: `\`\`\`bash
# 检查本地运行的 Mihomo 客户端内核版本与 RESTful API 交互状态
curl -s http://127.0.0.1:9097/version | jq '{version: .version}'

# 输出示例:
# { "version": "v1.18.10 mihomo meta linux/amd64" }

# 查询当前活跃的代理规则与入站流量
curl -s http://127.0.0.1:9097/connections | jq '.connections | length'
\`\`\``,
    decisionTree: `\`\`\`
[Mihomo 系客户端选型横评决策]
   │
   ├─► 使用者核心偏好与画像：
   │      ├─ 追求生态最成熟、功能最全、教程最多 ──► 必须选择【Clash Verge Rev】(综合王者)
   │      ├─ 追求跨平台体验绝对一致、免装 WebView2 ──► 首推【FlClash】(现代跨端标杆)
   │      ├─ 追求极简视觉美学与二次元清新风格 ──► 尝试【Clash Nyanpasu】
   │      └─ 纯新手、惧怕任何代码与复杂配置 ──► 选择【Mihomo Party】
   │
   └─► 共同底座：全系均采用高性能 Mihomo 内核，底层协议支持与分流能力保持同一梯队
\`\`\``,
    benchmarkTable: `| 客户端评测对象 | 前端架构 | 内存常驻占用 | Service Mode 易用度 | 脚本覆写能力 | 综合推荐指数 |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Clash Verge Rev** | **Tauri (WebView2)** | **约 90MB** | **★★★★★ 极其稳定** | **★★★★★ 顶级灵活** | **★★★★★ (年度首选)** |
| FlClash | Flutter GPU 渲染 | 约 95MB | ★★★★☆ 良好 | ★★★☆☆ 基础扩展 | ★★★★☆ (跨端首选) |
| Clash Nyanpasu | Tauri (WebView2) | 约 105MB | ★★★★☆ 良好 | ★★★★☆ 良好 | ★★★★☆ (颜值首选) |
| Mihomo Party | 现代 Web 混合壳 | 约 130MB | ★★★★☆ 良好 | ★★★☆☆ 简化点选 | ★★★★☆ (新手首选) |`,
    gotchas: `1. **升级客户端时不同壳体配置路径冲突**：Verge 的配置在 \`clash-verge\` 目录，Nyanpasu 在 \`clash-nyanpasu\`，同时安装多个可能导致端口占用与订阅更新不同步。
2. **精简版 Windows 运行 Verge Rev 白屏**：由于系统缺少 Edge WebView2 运行时，遇此情况建议直接换用自带渲染引擎的 FlClash。`,
    faqs: [
      { question: 'Clash Verge 很久以前停更了，Clash Verge Rev 是正版吗？', answer: '是的。原作者停更后，开源社区建立了 Clash Verge Rev 官方新项目组，持续合并最新 Mihomo 内核并修复系统漏洞，是目前正统的活跃继承者。' },
      { question: '为什么推荐使用 Mihomo 核心而不是旧版开源 Clash 核心？', answer: '旧版 Clash 早已停止维护，不支持 VLESS、Reality、Hysteria 2、TUIC、SSH 等现代抗封锁协议，也无法解析二进制 Rule-Set 规则集，已被现代网络彻底淘汰。' }
    ]
  },

  'xray-clients': {
    cot: `### 1.1 Xray 生态客户端横评与架构演进推导

Xray 是引领 Project X 协议创新（VLESS、XTLS、Reality、Vision）的行业领军内核。围绕 Xray 构建的生态客户端各具鲜明的平台特性。

从各客户端定位与底层实现横向推导：
1. **v2rayN (Windows)**：
   - 桌面端的“瑞士军刀”。功能覆盖极其全面，具备最强大的单节点测速、路由分流自定义、全协议外挂能力，但 UI 偏向传统 Windows 窗体风格，小白上手有门槛；
2. **v2rayNG (Android)**：
   - 安卓平台 Xray 绝对主力。原生 Android 架构，性能轻快，功耗控制优秀，支持一键更新 Geo 规则与分应用代理；
3. **v2rayA (跨平台 WebUI / 软路由)**：
   - 基于 Web 架构设计，天然适合部署在 Linux 服务器、NAS、OpenWrt 路由器作为全屋局域网透明网关；
4. **SagerNet / Matsuri (Android 极客端)**：
   - 插件化架构，支持通过安装独立插件支持各种冷门协议，但维护周期波动较大。`,
    code: `\`\`\`powershell
# 检查 v2rayN 目录下的 Xray 内核版本信息
$xrayPath = ".\\bin\\Xray\\xray.exe"
if (Test-Path $xrayPath) {
    & $xrayPath version
} else {
    Write-Host "当前为未集成内核的纯 GUI 版本，需下载 Xray-core 放置于 bin/Xray 目录" -ForegroundColor Yellow
}
\`\`\``,
    decisionTree: `\`\`\`
[Xray 系客户端适用场景决策]
   │
   ├─► 使用场景与平台：
   │      ├─ Windows 电脑测速、排错、精细化协议调试 ──► 必须选择【v2rayN】
   │      ├─ Android 手机日常主力随身翻墙 ──► 必须首选【v2rayNG】
   │      └─ Linux 服务器 / NAS / 软路由透明代理 ──► 极力推荐【v2rayA】
   │
   └─► 核心优势：对 VLESS-XTLS-Reality 与 Vision 协议支持最为原生纯正，无任何中间层损耗
\`\`\``,
    benchmarkTable: `| 客户端评测对象 | 核心协议支持 | 内存占用 | 易用度评级 | 适用主力场景 |
| :--- | :---: | :---: | :---: | :--- |
| **v2rayN (Windows)** | **100% 完整原生** | 约 120MB | ★★★☆☆ (偏极客调试) | **桌面测速、协议深度定制、主力备用** |
| **v2rayNG (Android)** | **100% 完整原生** | **约 35MB (极轻量)** | **★★★★★ 极其简单** | **安卓随身日常主力** |
| **v2rayA (WebUI)** | 100% 完整原生 | 约 50MB (后端) | ★★★★☆ 直观易管 | 路由器旁路由、NAS 网关 |`,
    gotchas: `1. **误将 v2rayN 纯 UI 包当完整客户端**：解压后双击没有任何反应，导入节点测试全为 -1，必须下载带 \`With-Core\` 后缀的完整整合包。
2. **v2rayNG 开启分应用代理却未勾选微信导致丢消息**：如果未将微信加入直连排除名单，国外出口断连时国内消息将无法及时推送。`,
    faqs: [
      { question: 'v2rayN 和 Clash Verge 相比，日常翻墙选哪个更好？', answer: '如果你只想要界面漂亮、开箱即用、一键托管并且经常看流媒体，选 Clash Verge Rev 更省心；如果你喜欢给每个节点测速、经常导入单条 vless 链接或手动改参数，v2rayN 功能更强大。' },
      { question: '为什么 Xray 官方不自己出一个好看的跨平台客户端？', answer: 'Xray 核心团队专注于底层网络协议研发、抗审查密码学与核心高性能转发（Core），将图形化界面（GUI）完全开放给全球开源社区独立开发维护。' }
    ]
  },

  'singbox-clients': {
    cot: `### 1.1 Sing-box 生态客户端横评与技术前瞻推导

Sing-box 凭借现代化的架构设计，迅速崛起为与 Xray、Mihomo 并驾齐驱的第三大代理支柱。围绕 Sing-box 内核涌现出的客户端形成了鲜明的特色阵营。

从客户端架构与用户体验横向推导：
1. **Hiddify (Flutter 跨平台)**：
   - 目前 Sing-box 生态中体验最惊艳、支持平台最全（Win/Mac/Android/iOS/Linux）的图形客户端。具备万能格式自适应转换能力，颜值极高；
2. **sing-box for Apple (iOS / macOS 原生生态)**：
   - 官方为苹果平台深度量身定制。纯 Swift 编写，与 Apple NetworkExtension 无缝融合，系统资源占用极低，能耗控制无可匹敌；
3. **Karing (跨平台新秀)**：
   - 兼容 Clash、V2Ray、Sing-box 规则，界面精炼，对 TV 电视盒子适配良好；
4. **原生 CLI 命令行版本**：
   - 纯粹的极客之选，适合嵌入在 Alpine/Docker 容器或轻量 VPS 中常驻后台。`,
    code: `\`\`\`bash
# 验证当前系统 Sing-box 客户端内核所包含的内置编译标签 (Tag)
sing-box version
# 输出示例重点关注是否包含:
# Tags: with_gvisor, with_quic, with_wireguard, with_ech, with_utls
\`\`\``,
    decisionTree: `\`\`\`
[Sing-box 系客户端选型决策]
   │
   ├─► 是否在 Apple 苹果生态设备 (iPhone/Mac/Apple TV)？
   │      ├─ 是 ──► 首推【sing-box for Apple】或【Shadowrocket】
   │      └─ 否 (Windows / Android / Linux)
   │
   ├─► 是否追求零门槛开箱即用与现代设计？
   │      ├─ 追求 ──► 极力推荐【Hiddify】(万能订阅直接贴)
   │      └─ 极客用户 ──► 使用【sing-box CLI】编写自定义 JSON 规则链
   │
   └─► 核心杀手锏：原生支持 TUIC v5 与 Hysteria 2 UDP 极速协议
\`\`\``,
    benchmarkTable: `| 客户端评测对象 | 适配平台 | 协议前沿度 | 内存与功耗表现 | 推荐评级 |
| :--- | :--- | :---: | :---: | :--- |
| **Hiddify** | **Win/Mac/Android/iOS/Linux** | **次世代全覆盖** | **优秀 (~80MB)** | **★★★★★ 跨平台全能** |
| **sing-box for Apple** | iOS / iPadOS / macOS / tvOS | 官方一手首发 | **极致原生 (< 45MB)** | **★★★★★ 苹果生态必装** |
| Karing | Win/Mac/Android/iOS | 良好全面 | 良好 (~70MB) | ★★★★☆ 极简实用 |
| 原生 sing-box CLI | Linux / Server / VPS | 官方一手首发 | **神级 (< 25MB)** | ★★★★★ 极客与网关标配 |`,
    gotchas: `1. **Hiddify 开启全局 WARP 导致节点循环**：Hiddify 菜单内自带 WARP 开关，若未理解其链式代理原理盲目打开，会导致原有专线节点被强制走 CF 慢速出口。
2. **跨平台导入规则集未预热**：Sing-box 使用二进制 \`.srs\` 规则，初次导入若网络不畅拉取不到远程规则集，会导致客户端暂时处于兜底 DIRECT 直连模式。`,
    faqs: [
      { question: 'Sing-box 客户端和 Clash Verge 相比最大的优势是什么？', answer: 'Sing-box 在 UDP 协议（Hysteria 2、TUIC）上的性能爆发力和连接收敛速度远超老式内核，且对苹果 iOS/tvOS 生态的支持是官方第一方原生级别的。' },
      { question: 'Hiddify 为什么不需要手动配置各种复杂的 DNS 规则？', answer: 'Hiddify 在底层对 Sing-box 的 DNS 模块进行了高度智能封装，自动将大陆域名路由至本地系统 DNS，将境外域名重定向走加密远程 DNS，杜绝了 DNS 污染。' }
    ]
  },

  'desktop': {
    cot: `### 1.1 桌面端（Windows / macOS / Linux）客户端综合横评推导

桌面操作系统由于承载了高并发多任务、开发环境、终端命令行、3A 游戏与 4K 超清生产力，对代理客户端的**网络接管深度、特权服务稳定性与内存常驻表现**提出了最高要求。

从三大桌面操作系统架构横向推导：
1. **Windows 平台**：
   - 生态最繁荣，但网络栈最杂乱。需要客户端具备强大的 Wintun 驱动调用能力（接管 UWP 与 CMD 命令行流量）；Clash Verge Rev 与 v2rayN 是 Windows 上的绝对双雄；
2. **macOS 平台**：
   - 依赖 Apple NetworkExtension 或 utun 虚拟网卡。Surge for Mac 是功能最强悍的专业生产力天花板（但价格昂贵）；免费开源首推 Clash Verge Rev macOS 原生版与 sing-box；
3. **Linux 平台**：
   - 桌面生态相对小众。传统客户端多为纯 CLI；FlClash (AppImage) 与 Clash Verge Rev (deb/rpm) 成功将现代 GUI 引入 Linux 桌面，体验飞跃。`,
    code: `\`\`\`bash
# 跨平台快速检测当前桌面终端环境变量代理是否生效
curl -s https://ipinfo.io/ip
# 若未走代理显示本地公网 IP；设置临时代理验证:
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"
curl -s https://ipinfo.io/ip
\`\`\``,
    decisionTree: `\`\`\`
[桌面端操作系统客户端选型决策]
   │
   ├─► Windows 平台：
   │      ├─ 个人日常生产力 / 看剧 / 游戏 ──► 首选【Clash Verge Rev】(开服务模式+TUN)
   │      └─ 协议极客 / 单节点测速 / 轻量便携 ──► 首选【v2rayN】
   │
   ├─► macOS 平台：
   │      ├─ 预算充沛、需要抓包与终极分流控制 ──► 购买商业软件【Surge for Mac】
   │      └─ 追求免费开源、功能完整 ──► 首选【Clash Verge Rev macOS 版】
   │
   └─► Linux 平台：
          ├─ 桌面环境 (Ubuntu/Fedora/Arch) ──► 首选【FlClash】或【Clash Verge Rev】
          └─ 无头服务器 / 终端玩家 ──► 原生【sing-box CLI】或【mihomo core】
\`\`\``,
    benchmarkTable: `| 桌面系统 | 综合第一推荐 | 最佳备用/极客选型 | TUN 全局接管能力 | 推荐指数 |
| :--- | :--- | :--- | :---: | :--- |
| **Windows 10/11** | **Clash Verge Rev** | **v2rayN** | 原生 Wintun 极佳 | **★★★★★** |
| **macOS (M系列/Intel)** | **Clash Verge Rev** | **Surge / sing-box** | 增强扩展无需 root | **★★★★★** |
| **Linux 桌面** | **FlClash (AppImage)** | **mihomo CLI** | iptables / tun | ★★★★☆ |`,
    gotchas: `1. **Windows 开启系统代理后终端 CMD / PowerShell 不走代理**：系统代理仅对浏览器有效，终端中必须手动开启 TUN 模式或在脚本中 \`export http_proxy\`。
2. **macOS 升级系统版本后 TUN 虚拟网卡失效**：macOS 大版本升级后系统安全策略可能重置系统扩展权限，需在【系统设置】->【隐私与安全性】重新允许客户端 helper 运行。`,
    faqs: [
      { question: 'Windows 上玩外服游戏，开启系统代理管用吗？', answer: '完全不管用。系统代理仅支持 HTTP/SOCKS 协议的浏览器应用，游戏走的是底层 UDP 协议，必须在客户端中开启【TUN 模式】或者【服务模式】才能接管游戏数据包。' },
      { question: 'Mac 上安装 Clash Verge Rev 提示需要输入电脑开机密码？', answer: '这是正常授权。客户端需要向 macOS 系统注册后台特权辅助程序（Privileged Helper），用于无缝创建虚拟网卡和路由表接管，输入密码授权一次即可。' }
    ]
  },

  'mobile': {
    cot: `### 1.1 移动端（iOS / Android）客户端架构特性与横评推导

移动端代理客户端与桌面端最大的不同在于**严格的功耗温控限制、频繁的网络环境切换（Wi-Fi 与 5G 瞬切）以及手机厂商激进的后台墓碑策略**。

从移动端系统底层运行时推导：
1. **iOS 生态生态矩阵**：
   - 由于苹果沙盒机制，全系客户端必须依赖 iOS 的 \`NetworkExtension.framework\`。
   - **Shadowrocket (小火箭)**：全协议支持、功能均衡、买断价低廉 ($3.99)，是 90% 用户的装机必备标配；
   - **Quantumult X (圈 X)**：UI 精致、脚本能力与重写（Rewrite）强悍，适合喜欢自定义规则和去广告的高级玩家；
   - **Loon / Surge iOS**：界面现代、插件生态极佳、网络调试天花板。
2. **Android 生态矩阵**：
   - 依赖 Android \`VpnService\` API。
   - **v2rayNG**：轻量稳定、省电、极简无广告，老牌长青；
   - **FlClash / Clash for Android**：规则分流能力强，界面现代好看；
   - **Surfboard**：完美兼容 Surge 3 规则语法，性能调优出色。`,
    code: `\`\`\`text
# 移动端主流客户端特性与规则生态对比矩阵：
Shadowrocket: 支持全格式导入 (Clash, V2Ray, Trojan, SS)，内置一键分流，生态最广
Quantumult X: 支持 JS 脚本重写、MITM 本地去广告、高度自定义节点策略组
v2rayNG: Android 平台最省电、体积最小、后台抗杀能力最强，Xray 原生支持
FlClash: 跨平台一致 UI，支持多内核切换，适合多设备统一使用习惯
\`\`\``,
    decisionTree: `\`\`\`
[移动端手机代理客户端选型决策]
   │
   ├─► 手机操作系统：
   │      ├─ 苹果 iPhone / iPad (iOS)：
   │      │      ├─ 追求最省心、高性价比、新手入门 ──► 首选【Shadowrocket (小火箭)】
   │      │      ├─ 热衷折腾去广告、重写脚本、精美 UI ──► 选择【Quantumult X】或【Loon】
   │      │      └─ 苹果全家桶极客玩家 ──► 选择【sing-box for Apple】
   │      │
   │      └─ 安卓手机 (Android)：
   │             ├─ 追求极致省电、稳定抗后台强杀 ──► 必须首选【v2rayNG】
   │             └─ 习惯 Clash 分流语法与精美现代 UI ──► 首选【FlClash】或【Clash Meta for Android】
   │
   └─► 核心要点：无论哪个客户端，手机端后台均需配置“电池无限制”以防息屏掉线
\`\`\``,
    benchmarkTable: `| 移动客户端 | 平台 | 待机电池功耗 | 协议支持度 | 新手学习门槛 | 综合推荐指数 |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Shadowrocket** | **iOS** | **极低 (约 1-2%/天)** | **全协议大满贯** | **极低 (一键导入即用)** | **★★★★★ (iOS 标配)** |
| Quantumult X | iOS | 极低 | 优秀全面 | 较高 (需懂分流重写) | ★★★★☆ (进阶神作) |
| **v2rayNG** | **Android** | **极低 (< 2%/天)** | **Xray 原生最全** | **极低** | **★★★★★ (安卓首选)** |
| FlClash | Android | 适中 | Mihomo 全协议 | 低 (现代 UI 直观) | ★★★★☆ (颜值优选) |`,
    gotchas: `1. **国产安卓系统锁屏后代理静默断开**：必须在手机设置里将客户端从“智能省电”改为“允许后台高耗电 / 无限制”，并在多任务界面锁定后台卡片。
2. **iOS 切换 Wi-Fi 与蜂窝网络时出现短时间断网**：这是 iOS 系统网络接口重新协商 VPN 配置的正常微秒级过渡，通常 2-3 秒内自动恢复。`,
    faqs: [
      { question: 'iPhone 上常年开着小火箭，对手机电池寿命有损伤吗？', answer: '几乎没有任何特殊损伤。现代客户端仅在有实际网络请求时才进行加解密运算，在屏幕熄灭无流量时处于休眠状态，整机待机一整晚耗电通常不足 1%-2%。' },
      { question: '安卓手机上有必要安装好几个代理客户端吗？', answer: '没必要。Android 系统同一时间只允许一个应用接管本地 VPNService 虚拟网卡，同时运行多个会导致后打开的强制挤掉先打开的。日常保留一个主力、一个备用即可。' }
    ]
  },

  'subscription-ux': {
    cot: `### 1.1 订阅管理与用户体验交互机制横评推导

对于拥有数个机场、上百个节点的用户而言，客户端的**订阅管理交互、自动定时更新机制、节点去重清洗与异常兜底能力**直接决定了长期的使用幸福感。

从数据存储与异步更新机制横向推导：
1. **自动更新生命周期管理**：
   - 优质客户端（如 Clash Verge Rev / v2rayN）支持设置精准的更新 Cron 周期（如每 24 小时或每天凌晨 4 点静默同步），并在订阅解析失败时保留最后一次成功的本地缓存，避免“因一次拉取超时导致所有节点被清空”；
2. **本地配置覆写与链式增强**：
   - 现代高级用户往往需要将机场自带的简单规则替换为自定义的 ACL4SSR 或 Loyalsoldier 高级分流规则集。Verge Rev 的 Merge/Script 机制支持纯本地覆写，机场订阅更新不会冲掉个人自定义规则；
3. **健康检查与智能排序**：
   - 内置定时 Url-Test 自动测速，将延迟最低或最先连通的节点动态置顶，实现节点故障无感自动切换。`,
    code: `\`\`\`yaml
# Clash Verge Rev 本地扩展脚本示例：在订阅更新时自动追加自定义分流规则与去重
# 保障订阅无论怎么拉取，个人配置永远不丢失
prepend-rules:
  - 'DOMAIN-SUFFIX,my-private-domain.com,DIRECT'
  - 'DOMAIN-KEYWORD,special-work,DIRECT'
  - 'GEOSITE,category-anticensorship,节点选择'
\`\`\``,
    decisionTree: `\`\`\`
[订阅管理体验优劣鉴别决策]
   │
   ├─► 订阅拉取失败时的客户端表现：
   │      ├─ 劣质设计：直接清空本地节点列表，变成空白导致断网 ──► 坚决弃用
   │      └─ 优秀设计：自动保留旧有可用配置缓存，静默弹出告警提示 ──► 稳妥可靠
   │
   ├─► 是否支持定时后台静默自动更新？
   │      ├─ 支持 (可自定义更新间隔，如 12h/24h) ──► 保证随时拿到机场最新可用 IP
   │      └─ 不支持 (每次都需手动点刷新) ──► 维护成本高
   │
   └─► 规则定制能力：是否支持本地脚本覆写 (Merge/Script) 免去重复配置烦恼
\`\`\``,
    benchmarkTable: `| 客户端评测对象 | 订阅更新稳定性 | 节点容灾缓存策略 | 定时自动更新 | 本地规则覆写 | 综合易用度 |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Clash Verge Rev** | **极高** | **失败保留旧缓存** | **支持 (小时级)** | **Script / Merge 强悍** | **★★★★★** |
| Hiddify | 极高 | 自动回滚机制 | 支持 | 图形化开关控制 | ★★★★☆ |
| v2rayN | 极高 | 保留已有节点池 | 支持定时任务 | 路由高级规则集 | ★★★★☆ |
| 传统老旧客户端 | 脆弱 | 失败直接变空 | 部分支持 | 需手动修改本地文本 | ★★☆☆☆ |`,
    gotchas: `1. **更新订阅时覆盖了本地手动修改的文件**：在老版客户端中若直接在下载好的 config.yaml 乱改，一旦点击更新，远端下载的新文件会瞬间抹掉全部手写内容。
2. **将自动更新间隔设置得过短（如 5 分钟）**：频繁并发请求会导致机场反爬虫风控判定你在恶意刷 API，触发临时封禁订阅链接 1 小时。`,
    faqs: [
      { question: '订阅更新频率设置多久最合适？', answer: '建议设置为 12 小时或 24 小时更新一次。机场的节点 IP 通常很稳定，过于频繁更新浪费流量还易触发风控，24 小时自动更新足以保证拿到最新的维护节点。' },
      { question: '订阅更新提示“Network Timeout”网络超时，怎么解决？', answer: '因为许多机场的用户中心域名被封锁，更新时客户端必须走本地已有的代理通道。请在客户端设置中开启【更新订阅走代理】选项即可顺利拉取。' }
    ]
  },

  'network-behavior': {
    cot: `### 1.1 客户端网络接管行为、虚拟网卡与 DNS 泄露横评推导

代理客户端绝不仅仅是一个“SOCKS 转换器”，其对操作系统网络栈的行为改造（System Proxy、TUN 虚拟网卡、Fake-IP 池）深刻影响着系统的网络响应速度与隐私安全性。

从 TCP/IP 协议栈与系统路由表深度横向推导：
1. **系统代理模式 (System Proxy) vs TUN 虚拟网卡模式**：
   - 系统代理只是通知遵循 Windows InternetSettings 的应用程序（如 Edge/Chrome）主动将 HTTP 流量送往 127.0.0.1:7890，对命令行、系统后台服务及网游毫无约束；
   - TUN 模式在内核层创建虚拟网卡设备（Wintun / utun），在系统路由表中添加高优先级默认路由，**强制捕获整机全部 TCP/UDP 流量**，实现真正的无缝全局接管；
2. **Fake-IP 机制 vs Redir-Host 机制实测对比**：
   - Redir-Host 模式下，客户端必须先向远端或本地发起真实 DNS 解析拿到目标 IP 后再做分流，带来额外的 100-300ms DNS 往返开销；
   - Fake-IP 模式下，客户端直接从本地虚拟保留网段（如 \`198.18.0.1\`）瞬间返回假 IP，完全跳过客户端侧 DNS 解析，将域名直接打包通过加密隧道发送至落地机解析，彻底杜绝本地 DNS 污染与解析延迟。`,
    code: `\`\`\`bash
# 验证当前系统是否存在 DNS 泄露风险的命令行探针
# 测试目标：查询返回的 DNS 解析服务器 IP 是否为你的国内真实运营商宽带归属
curl -s "https://dnsleaktest.com/json" | jq .

# 检查当前虚拟网卡 (TUN) 路由接管优先级与跃点数 (Metric)
Get-NetRoute -DestinationPrefix "0.0.0.0/0" | Select-Object IfIndex, InterfaceAlias, RouteMetric
\`\`\``,
    decisionTree: `\`\`\`
[网络接管模式选型决策]
   │
   ├─► 核心上网需求：
   │      ├─ 仅在浏览器查资料 / 看视频 ──► 仅开启【系统代理】即可 (轻量、不修改系统网络驱动)
   │      ├─ 包含写代码 (Git/Docker/Pip) / 外服游戏 / 各种专用桌面软件 ──► 必须开启【TUN 虚拟网卡模式】
   │      └─ 需要局域网全屋共享 ──► 开启【允许局域网连接 (Allow LAN)】
   │
   ├─► DNS 模式选择：
   │      ├─ 优先选用【Fake-IP】(网页秒开、无 DNS 污染)
   │      └─ 若遇到极少数内网工单系统或特定软件无法识别 Fake-IP ──► 降级切回【Redir-Host】
   │
   └─► 安全规范：定期在 dnsleaktest 网站检测是否存在运营商 DNS 泄露
\`\`\``,
    benchmarkTable: `| 网络接管模式 | 流量捕获完整度 | UDP 支持能力 | 网页首包响应速度 | 驱动特权要求 |
| :--- | :---: | :---: | :---: | :--- |
| **TUN 模式 (Fake-IP)** | **100% 全系统所有流量** | **完美原生支持 (游戏必备)** | **极快 (本地 1ms 伪造应答)** | **高 (需管理员权限安装驱动)** |
| TUN 模式 (Redir-Host) | 100% 全系统所有流量 | 完美原生支持 | 较慢 (受制于远端 DNS 往返) | 高 |
| 普通系统代理 (System Proxy) | 仅约 40% (仅支持代理的软件) | 极弱 (不支持底层 UDP) | 正常 | 极低 (普通用户权限即可) |`,
    gotchas: `1. **开启 TUN 模式后局域网打印机或 NAS 无法访问**：Fake-IP 模式若未在配置中将局域网保留网段（\`192.168.0.0/16\`、\`10.0.0.0/8\`）加入 Direct 直连白名单，会导致局域网流量被误引流。
2. **误认为系统代理能加速 Git Clone**：在终端运行 \`git clone\` 时，Git 默认不读取 Windows 系统代理，必须开启 TUN 模式或手动执行 \`git config --global http.proxy\`。`,
    faqs: [
      { question: '什么是 DNS 泄露？为什么它非常危险？', answer: '当你访问境外网站时，如果你的电脑依然向本地电信/联通运营商的 DNS 服务器询问该网站的 IP，运营商就能百分之百记录下你浏览的所有域名清单，这就是 DNS 泄露。' },
      { question: '开启 Fake-IP 之后，在命令行里 ping google 显示 198.18.x.x 是中毒了吗？', answer: '完全正常。198.18.0.0/15 是 IETF 专门划分用于基准测试的保留 IP 段，Mihomo 客户端用它来给域名做本地虚拟地址映射，正是 Fake-IP 正常运行的标志。' }
    ]
  },

  'security-maintenance': {
    cot: `### 1.1 开源透明度、安全响应与维护生命周期横评推导

代理软件在操作系统中通常持有最高的**网络协议栈调度特权、系统管理员权限甚至内核级虚拟网卡驱动**。软件自身的代码透明度与维护生命周期，直接决定了用户的终端数字安全。

从开源供应链安全与 CVE 漏洞演进推导：
1. **开源可审计性（Open Source Auditing）**：
   - 纯正开源项目（如 Mihomo、Xray-core、Sing-box、Clash Verge Rev）的代码完全托管在 GitHub，全球数万开发者共同审查。任何后门、恶意代码注入或隐私回传行为在代码提交 PR 阶段就会被立刻曝光；
   - 封闭源代码或私有商业打包版由于无法审查其内部编译产物，存在极高的供应链投毒风险；
2. **CVE 漏洞热修复时效**：
   - 底层 Go 语言运行库或加密库爆发安全漏洞时（如 HTTP/2 快速重置攻击 DoS 漏洞），一流维护团队会在 24-48 小时内完成依赖升级并释出 Release；长期停更的项目则会沦为黑客攻击的活靶子。`,
    code: `\`\`\`bash
# 验证下载的客户端可执行文件数字签名与 SHA-256 哈希完整性
# (以 Windows 环境校验下载文件为例)
Get-FileHash -Path ".\\Clash.Verge_1.7.7_x64-setup.exe" -Algorithm SHA256

# 比对该 Hash 是否与 GitHub Release 官方发布页面给出的哈希完全一致
# 杜绝任何中间人在传输过程中的篡改或木马植入
\`\`\``,
    decisionTree: `\`\`\`
[客户端安全信任层级决策]
   │
   ├─► 客户端代码开源状态审查：
   │      ├─ 100% 完整开源 (核心与 UI 均在 GitHub 公开可编译) ──► 最高安全可信度 (首选)
   │      ├─ 核心开源 + UI 闭源但有良好品牌口碑 (如 Shadowrocket) ──► 良好可信
   │      └─ 纯闭源、无官方网站、来自未知网盘/论坛的“整合免翻包” ──► 坚决不使用！
   │
   ├─► 项目活跃度与更新频率：
   │      ├─ 最近一次 Commit / Release 在 1-3 个月以内 ──► 活跃维护中
   │      └─ 超过 1 年以上没有任何更新 ──► 存在安全漏洞累积风险，建议迁移
   │
   └─► 核心原则：代理软件拥有系统极高特权，安全底线决不能打折
\`\`\``,
    benchmarkTable: `| 客户端评测对象 | 开源透明状态 | 社区 Star 规模 | 漏洞响应修复时效 | 供应链安全评级 |
| :--- | :---: | :---: | :---: | :--- |
| **Clash Verge Rev** | **100% 完全开源** | **> 15,000+** | **24-48 小时极速** | **★★★★★ (顶级可信)** |
| **sing-box** | **100% 完全开源** | **> 20,000+** | **48 小时内** | **★★★★★ (顶级可信)** |
| **v2rayN** | **100% 完全开源** | **> 60,000+** | 极快活跃迭代 | **★★★★★ (顶级可信)** |
| Shadowrocket (小火箭) | 商业闭源 (App Store) | 苹果商店正规审核 | 开发者持续跟进 | ★★★★☆ (商业合规) |
| 未知破解论坛免翻版 | **纯闭源不可控** | 无 | 零维护 | **☆☆☆☆☆ (极度危险)** |`,
    gotchas: `1. **从非官方第三方镜像站下载伪造的客户端安装包**：黑客常花钱购买搜索引擎广告，在虚假网站提供植入了恶意远控木马的“Clash 下载器”。
2. **对官方更新提示视而不见长期使用存在已知 CVE 的旧版本**：旧版 Go 运行库的内存溢出或 TLS 漏洞会被公网恶意扫描利用。`,
    faqs: [
      { question: '原 Clash for Windows (CFW) 停更那么久了，还能继续用吗？', answer: '不建议继续使用。CFW 已停更数年，其内置的 Electron 框架和 Clash 内核存在未修复的已知远程代码执行漏洞，且无法支持新一代抗封协议，建议尽快平滑迁移至 Clash Verge Rev。' },
      { question: '为什么很多安全杀毒软件会把正规的开源代理客户端报毒拦截？', answer: '因为许多网络黑客会将开源代理内核封装在勒索病毒中用于建立隐蔽隧道，安全软件的启发式杀毒引擎在扫描到相同的代码特征时会产生误报。认准官方 GitHub 哈希即可信任放行。' }
    ]
  },

  'usability-cost': {
    cot: `### 1.1 客户端易用性、上手门槛与学习成本综合推导

工具的终极价值是为人服务。一款优秀的网络工具应当在**强大的底层协议定制能力与极简的开箱即用体验**之间达成完美的平衡。

从人机交互认知模型（HCI）与用户心智负担深度推导：
1. **三级认知阶梯模型**：
   - **入门级（小白零负担）**：用户只需要复制一条订阅链接，粘贴后点击一个硕大的“连接”开关，即可畅通无阻访问网络；
   - **进阶级（规则掌控者）**：用户理解并能自由切换“规则 / 全局 / 直连”模式，会点选不同国家地区策略组；
   - **极客级（底层架构师）**：用户能独立编写复杂的分流 YAML/JSON，定制 DNS 上游分流解析池，编写预处理脚本；
2. **生态迁移成本**：
   - 跨设备用户更倾向于在多端拥有相似的视觉与交互反馈，降低每次切换设备时的试错摩擦力。`,
    code: `\`\`\`text
# 主流客户端易用性上手难度与学习阶梯雷达评估：
[小白入门指数]
Hiddify: ★★★★★ (最简单，复制链接即用)
Shadowrocket: ★★★★★ (iOS 一键开关，极简)
Clash Verge Rev: ★★★★☆ (界面现代，稍加点选即可)
v2rayN: ★★★☆☆ (界面较为硬核，选项密集)
sing-box CLI: ★☆☆☆☆ (纯终端命令行，纯极客专属)

[极客定制空间]
sing-box CLI: ★★★★★ (完全自由定制所有数据流)
v2rayN: ★★★★★ (全协议全参数手动外挂)
Clash Verge Rev: ★★★★★ (Merge / Script 脚本无缝覆写)
Hiddify: ★★★☆☆ (封装较深，深度定制受限)
\`\`\``,
    decisionTree: `\`\`\`
[根据个人技能与耐心选型决策]
   │
   ├─► 使用者个人技术背景：
   │      ├─ 纯非技术人员 (文科生/长辈/仅看视频) ──► 坚决选择【Hiddify】或【Shadowrocket】
   │      ├─ 普通电脑用户 (能看懂基础教程) ──► 首推【Clash Verge Rev】
   │      └─ 程序员 / 网络工程师 (折腾党) ──► 选择【v2rayN】或【sing-box CLI】
   │
   └─► 选型黄金法则：不要为了用不到的极客功能，强行增加每天操作的心智负担
\`\`\``,
    benchmarkTable: `| 客户端评测对象 | 初次配置所需耗时 | 官方中文界面 | 报错排查难度 | 综合上手难度 |
| :--- | :---: | :---: | :---: | :--- |
| **Hiddify** | **< 1 分钟 (极速)** | **完整原生支持** | **极低 (清晰弹窗)** | **入门极简 (适合 100% 用户)** |
| **Shadowrocket** | **< 2 分钟** | **完整原生支持** | **极低** | **iOS 极简标杆** |
| **Clash Verge Rev** | **约 3 分钟** | **完整原生支持** | **低 (内置运行日志)** | **大众主流平衡王者** |
| v2rayN | 约 5-10 分钟 | 完整原生支持 | 中等 (日志信息丰富) | 偏向专业测速与调试 |
| sing-box CLI | 30 分钟以上 | 纯命令行无界面 | 需理解 Linux 错误码 | 纯开发者极客玩具 |`,
    gotchas: `1. **盲目向电脑完全不懂的长辈推荐 v2rayN**：界面繁杂的参数和快捷键极易被误触导致代理断连，给他人带来巨大沟通成本。
2. **把简单问题复杂化**：明明只是看个 YouTube，非要花好几天去手写上千行自定义 sing-box json 规则，最后遇到解析语法错误崩溃断网。`,
    faqs: [
      { question: '新手入门第一次使用，推荐哪款客户端最不会踩坑？', answer: 'Windows 与 Mac 电脑首推【Clash Verge Rev】，iPhone 手机首推【Shadowrocket（小火箭）】，Android 手机首推【v2rayNG】或【Hiddify】。这套组合教程最多、最成熟稳定。' },
      { question: '学会用客户端之后，需要每天在里面调整节点和设置吗？', answer: '完全不需要。配置好规则分流（Rule 模式）后，客户端会在后台自动根据你访问的网站智能判断直连或走代理，日常只需让它静默运行即可，无需任何人工干预。' }
    ]
  }
};
