// 3-Tier Multi-Dimensional Article Synthesizer
// Differentiates every article by:
// 1. Detected OS & Client entities
// 2. Topic Knowledge Base (80 topics)
// 3. Cluster progression tier (Tier 0: Verification, Tier 1: Deep Comparison, Tier 2: Fault Tolerance & Recovery)

export function detectEntities(title, text = '') {
  const full = (title + ' ' + text).toLowerCase();
  
  const isWindows = /windows|win10|win11|x64|arm64|setup|portable|便携/.test(full);
  const isMac = /macos|mac|m1|m2|m3|m4|apple silicon|dmg/.test(full);
  const isIOS = /ios|iphone|ipad|小火箭|shadowrocket|quantumult|loon|surge/.test(full);
  const isAndroid = /android|安卓|鸿蒙|harmonyos|apk|v2rayng/.test(full);
  const isLinux = /linux|ubuntu|debian|appimage|systemd/.test(full);
  const isRouter = /路由|openwrt|旁路由|网关|gateway|tproxy|fake-ip/.test(full);

  const isVerge = /verge|mihomo|clash meta/.test(full);
  const isV2rayN = /v2rayn|\.net|desktop runtime/.test(full);
  const isV2rayNG = /v2rayng/.test(full);
  const isShadowrocket = /shadowrocket|小火箭/.test(full);
  const isSingbox = /sing-box|singbox|hiddify|karing/.test(full);
  const isFlClash = /flclash|flutter/.test(full);

  const isSmartScreen = /smartscreen|拦截|未签名|保护你的电脑|已损坏|quarantine/.test(full);
  const isPort = /端口|7890|7897|10808|占用|bind|address already in use/.test(full);
  const isTUN = /tun|虚拟网卡|wintun|service mode|服务模式|驱动/.test(full);
  const isDNS = /dns|污染|泄露|fake-ip|redir-host|上游/.test(full);
  const isSub = /订阅|转换|subconverter|yaml|base64|json|一键导入|token/.test(full);
  const isProtocol = /协议|reality|hysteria|tuic|trojan|vmess|shadowsocks|ss-2022/.test(full);
  const isSpeed = /测速|延迟|ttfb|丢包|jitter|抖动|4k|晚高峰|吞吐/.test(full);
  const isFree = /免费|白嫖|公益|试用|签到|赠送|风险|爬虫/.test(full);
  const isBilling = /计费|年付|月付|按量|倍率|跑路|套餐/.test(full);

  return {
    isWindows, isMac, isIOS, isAndroid, isLinux, isRouter,
    isVerge, isV2rayN, isV2rayNG, isShadowrocket, isSingbox, isFlClash,
    isSmartScreen, isPort, isTUN, isDNS, isSub, isProtocol, isSpeed, isFree, isBilling
  };
}

// 1. Specialized CoT Generation
export function buildArticleCoT(art, ent, kb, tierIndex = 0) {
  let tierPerspective = '';
  if (tierIndex === 0) {
    tierPerspective = `### 1.1 核心问题本质归因与规范化交互推导

针对「${art.title}」，其首要技术矛盾在于**基础接入语义与数据交互边界的精准界定**。

1. **协议下发与客户端握手机制**：
   - 客户端在与服务节点或订阅接口建立初始通信时，底层 Socket 必须在规定的超时阈值内完成 TLS 扩展（如 ALPN、Server Name Indication）的对齐；
   - 若本地环境存在参数歧义或缺少必要的执行环境（${art.preconditions || '需要具备宿主系统管理员特权与基础网络调试能力'}），会导致首次握手被阻断在协议协商阶段；
2. **规范化接入流程推导**：
   - 正规生产环境要求：严禁在未做环境体检的情况下直接载入配置，必须依照规范先核验系统网络栈与核心特权，确保数据通信信道完整。`;
  } else if (tierIndex === 1) {
    tierPerspective = `### 1.1 多维架构差异与底层协议性能模型推导

聚焦「${art.title}」，其核心挑战在于**跨架构、跨协议之间的性能损耗与语义转换壁垒**。

1. **加密套件开销与内联调度模型**：
   - 不同的传输协议在内核中的内存分配（Memory Allocation）与 CPU 周期占用呈现几何级差异。传统基于流加密的协议在高并发下会产生频繁的上下文切换；而基于现代 AEAD 或零拷贝内联加速（如 XTLS-Vision、gVisor TUN）的协议能将 CPU 占用降低 60% 以上；
2. **异构网络环境的适应力边界**：
   - 在复杂网络拓扑（如多出口路由、双栈 IPv4/IPv6、高频移动漫游）中，协议栈必须具备动态拥塞窗口（CWND）自愈与智能心跳探活能力，否则轻微的链路抖动即会引发全量连接重置。`;
  } else {
    tierPerspective = `### 1.1 异常故障链推导与高可用容灾闭环

深度剖析「${art.title}」，其技术关键在于**防御性容灾、边缘异常捕获与配置漂移自愈**。

1. **级联失效与雪崩效应机制**：
   - 当代理链条中的某一局部组件（如本地端口冲突、订阅拉取超时、DNS 解析污染）突发异常时，上层应用程序若缺少优雅降级逻辑，会以毫秒级频率不断发起重试，瞬间耗尽系统 Socket 文件描述符（FD）；
2. **自愈恢复的设计哲学**：
   - 真正具备工业级稳定性的配置方案，必须建立多层兜底通道（Fallbacks）。在主节点或核心转换逻辑失效瞬间，能够平滑切换至备用内网通道，实现终端业务零感中断。`;
  }

  return `${tierPerspective}\n\n${kb.cot}`;
}

// 2. Specialized Code Generation
export function buildArticleCode(art, ent, kb, tierIndex = 0) {
  if (ent.isPort) {
    if (tierIndex === 0) {
      return `\`\`\`powershell
# 1. 快速定位占用 7890 端口的具体程序 PID 与进程名称
$targetPort = 7890
$connection = Get-NetTCPConnection -LocalPort $targetPort -ErrorAction SilentlyContinue
if ($connection) {
    $procId = $connection.OwningProcess | Select-Object -Unique
    $process = Get-Process -Id $procId -ErrorAction SilentlyContinue
    Write-Warning "端口 $targetPort 正在被 [$($process.ProcessName)] (PID: $procId) 独占！"
} else {
    Write-Host "端口 $targetPort 空闲可用。" -ForegroundColor Green
}
\`\`\``;
    } else if (tierIndex === 1) {
      return `\`\`\`yaml
# Clash Verge Rev 配置文件中动态修改混合端口规避冲突范本
port: 7892
socks-port: 7893
mixed-port: 7894 # 将默认 7890 迁移至 7894，彻底避开系统端口争抢
allow-lan: false
mode: rule
log-level: info
external-controller: 127.0.0.1:9098 # 同步将 API 端口由 9097 迁移至 9098
\`\`\``;
    } else {
      return `\`\`\`powershell
# 一键自动排查并强制释放所有代理冲突端口守护脚本
$clashPorts = @(7890, 7891, 7892, 7893, 7894, 7897, 10808)
foreach ($p in $clashPorts) {
    $conns = Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue
    if ($conns) {
        $pids = $conns.OwningProcess | Select-Object -Unique
        foreach ($id in $pids) {
            $pName = (Get-Process -Id $id -ErrorAction SilentlyContinue).ProcessName
            Write-Host "正在终止占用端口 $p 的僵尸进程: $pName (PID: $id)" -ForegroundColor Yellow
            Stop-Process -Id $id -Force
        }
    }
}
Write-Host "[✓] 全部代理相关端口已完成清空重置！" -ForegroundColor Green
\`\`\``;
    }
  }

  if (ent.isSub) {
    if (tierIndex === 0) {
      return `\`\`\`bash
# 模拟不同客户端 User-Agent 发送 HTTP 标头探针，核对服务端输出订阅类型
SUB_URL="https://example.com/api/v1/client/subscribe?token=YOUR_TOKEN"

echo "=== 正在探测 Clash 格式响应标头 ==="
curl -s -I -H "User-Agent: ClashVerge/1.7.7" "$SUB_URL" | grep -iE "(content-disposition|subscription-userinfo|content-type)"

echo "=== 正在探测通用 Base64 格式响应标头 ==="
curl -s -I -H "User-Agent: v2rayN/6.23" "$SUB_URL" | grep -iE "(content-disposition|subscription-userinfo|content-type)"
\`\`\``;
    } else if (tierIndex === 1) {
      return `\`\`\`python
# 订阅链接 Base64 解码与多协议节点类型分类统计探针
import urllib.request
import base64

sub_url = "https://example.com/api/v1/client/subscribe?token=YOUR_TOKEN"
req = urllib.request.Request(sub_url, headers={'User-Agent': 'v2rayN/6.23'})
raw_data = urllib.request.urlopen(req, timeout=10).read()

# Base64 解码并统计节点协议分布
nodes = base64.b64decode(raw_data + b'===').decode('utf-8', errors='ignore').splitlines()
protocols = {}
for n in nodes:
    proto = n.split('://')[0] if '://' in n else 'unknown'
    protocols[proto] = protocols.get(proto, 0) + 1

print("节点总数:", len(nodes))
print("协议分布详情:", protocols)
\`\`\``;
    } else {
      return `\`\`\`bash
# 订阅转换器 (Subconverter) 参数防丢损自动化比对校验脚本
RAW_SUB="https://example.com/raw_clash_sub.yaml"
CONVERTED_SUB="https://sub.converter.com/sub?target=clash&url=YOUR_SUB"

# 抓取并对比原始节点与转换后节点的 TLS / Reality 字段完整性
curl -s "$RAW_SUB" > /tmp/raw.yaml
curl -s "$CONVERTED_SUB" > /tmp/conv.yaml

echo "原始订阅中包含的 VLESS/Reality 节点数量:"
grep -c "type: vless" /tmp/raw.yaml
echo "转换后订阅保留的 VLESS/Reality 节点数量:"
grep -c "type: vless" /tmp/conv.yaml
\`\`\``;
    }
  }

  if (ent.isSmartScreen || ent.isWindows) {
    if (tierIndex === 0) {
      return `\`\`\`powershell
# 解除 Windows SmartScreen 对下载客户端的 Zone.Identifier 安全拦截标记
$clientPath = ".\\Clash-Verge-Rev-Setup.exe"
if (Test-Path $clientPath) {
    Unblock-File -Path $clientPath
    Write-Host "[✓] 已成功剥离 Windows 下载文件安全锁定属性 (ZoneId=3)，可直接双击安装。" -ForegroundColor Green
}
Get-FileHash -Path $clientPath -Algorithm SHA256 | Select-Object Algorithm, Hash
\`\`\``;
    } else if (tierIndex === 1) {
      return `\`\`\`powershell
# 检查当前 Windows 操作系统的真实处理器架构与运行库依赖
$osArch = (Get-CimInstance Win32_OperatingSystem).OSArchitecture
Write-Host "检测到当前操作系统底层架构: $osArch"
if ($osArch -eq "64-bit") {
    Write-Host "推荐下载并安装标准 x64 版本安装包" -ForegroundColor Green
} elseif ($osArch -like "*ARM*") {
    Write-Host "推荐下载 ARM64 原生架构包 (避免模拟层性能衰减)" -ForegroundColor Cyan
}

# 验证 VC++ 2015-2022 运行库安装状态
Get-ItemProperty HKLM:\\SOFTWARE\\Microsoft\\VisualStudio\\14.0\\VC\\Runtimes\\X64 -ErrorAction SilentlyContinue | Select-Object Version
\`\`\``;
    } else {
      return `\`\`\`powershell
# 紧急排错：一键恢复被锁定的 Windows 系统代理注册表设置
Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" -Name ProxyEnable -Value 0
Remove-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" -Name ProxyServer -ErrorAction SilentlyContinue
Remove-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" -Name AutoConfigURL -ErrorAction SilentlyContinue
Write-Host "[✓] Windows 系统全局代理已被强制重置为直连状态！" -ForegroundColor Green
\`\`\``;
    }
  }

  // General fallback by tier
  if (tierIndex === 0) {
    return kb.code;
  } else if (tierIndex === 1) {
    return `\`\`\`bash
# 科学多轮采样测量真实端到端往返延迟 (TTFB) 与抖动
PROXY="http://127.0.0.1:7890"
TARGET="https://www.google.com/generate_204"

echo "正在执行 5 轮高精度端到端网络延迟测量..."
for i in {1..5}; do
    ttfb=$(curl -o /dev/null -s -w "%{time_starttransfer}\\n" -x $PROXY $TARGET)
    ms=$(awk "BEGIN {print $ttfb * 1000}")
    echo "第 $i 轮首字节响应时间: \${ms} ms"
    sleep 0.3
done
\`\`\``;
  } else {
    return `\`\`\`powershell
# 自动化健康检查与网络适配器路由优先级重置脚本
Get-NetRoute -DestinationPrefix "0.0.0.0/0" | Sort-Object RouteMetric | Select-Object InterfaceAlias, DestinationPrefix, NextHop, RouteMetric

# 刷新本地操作系统 DNS 解析缓存
Clear-DnsClientCache
Write-Host "[✓] 本地 DNS 缓存与路由状态已刷新完毕" -ForegroundColor Green
\`\`\``;
  }
}

// 3. Specialized Decision Tree
export function buildArticleDecisionTree(art, ent, kb, tierIndex = 0) {
  if (tierIndex === 0) {
    return `\`\`\`
[针对「${art.title}」的基准准入核对决策]
   │
   ├─► 步骤 1：核实前置运行环境
   │      ├─ 检查操作系统版本与架构匹配度
   │      └─ 确认宿主管理员特权就绪
   │
   ├─► 步骤 2：执行标准部署或参数配置
   │      ├─ 按照本指南规范写入核心参数
   │      └─ 确认通信端口无冲突占用
   │
   └─► 步骤 3：验证连通性首包
          └─ 发起真实网络探针，核对首字节响应时间
\`\`\``;
  } else if (tierIndex === 1) {
    return `\`\`\`
[针对「${art.title}」的多维架构选型对比决策]
   │
   ├─► 场景 A：追求极致低延迟与游戏加速
   │      └─ 必须选择【IPLC 纯专线 + Shadowsocks 2022 / UDP 直连】
   │
   ├─► 场景 B：公网抗封锁与日常生产力
   │      └─ 首选【VLESS-Reality + XTLS-Vision】(借用合规大厂权威证书)
   │
   └─► 场景 C：移动弱网恶劣丢包环境
          └─ 优先选择【Hysteria 2】(魔改 QUIC，暴力突破 30% 丢包)
\`\`\``;
  } else {
    return `\`\`\`
[针对「${art.title}」的异常排查与容灾兜底决策]
   │
   ├─► 现象：启动瞬间崩溃闪退 / 托盘图标消失？
   │      ├─ 1. 检查日志是否有 bind address in use (端口抢占)
   │      └─ 2. 检查杀毒软件隔离区是否删除了核心文件
   │
   ├─► 现象：关掉客户端后全电脑断网打不开网页？
   │      └─ 立即运行 PowerShell 脚本重置系统代理注册表
   │
   └─► 现象：测速全是 Timeout 超时？
          └─ 检查订阅是否过期，或切换为家庭直连网络重新拉取
\`\`\``;
  }
}

// 4. Specialized Benchmark Table
export function buildArticleBenchmarkTable(art, ent, kb, tierIndex = 0) {
  if (tierIndex === 0) {
    return `| 核心功能项 | 标准推荐规范 | 常见偏离误区 | 验证通过基线 |
| :--- | :--- | :--- | :--- |
| **执行权限** | 管理员/SYSTEM 特权 | 普通受限普通用户启动 | Wintun 驱动正常加载 |
| **端口绑定** | 独立专属混合端口 (7890/7894) | 多工具重复抢占 7890 | 状态显示 LISTENING |
| **规则下发** | 原生自适应 UA 动态路由 | 强制通过不可信转换 | YAML 字典无乱码 |
| **首包延迟** | TTFB < 60ms (亚洲专线) | 仅测中转假绿延迟 | 真实页面秒开 |`;
  } else if (tierIndex === 1) {
    return `| 协议/形态方案 | CPU 资源消耗 | 晚高峰抗丢包表现 | 流媒体与 AI 解锁率 | 推荐指数 |
| :--- | :---: | :---: | :---: | :--- |
| **专线 IEPL/IPLC (SS-2022)** | **极低 (< 2% CPU)** | **★★★★★ (0% 物理丢包)** | **99.9% 原生解锁** | **★★★★★ 首推** |
| 次世代 VLESS Reality | 低 | ★★★★☆ 良好 | 95% (视落地 IP) | ★★★★★ 极佳 |
| 暴力魔改 Hysteria 2 | 适中 | **★★★★★ (弱网超强)** | 90% | ★★★★☆ 弱网王 |
| 传统淘汰 Shadowsocks (CFB) | 低 | ★☆☆☆☆ (易被主动探测) | 50% | ★☆☆☆☆ 废弃 |`;
  } else {
    return `| 常见故障诱因 | 发生频度 | 故障破坏等级 | 平均自愈耗时 | 推荐标准化解法 |
| :--- | :---: | :---: | :---: | :--- |
| **残留僵尸核心占用端口** | **高发 (45%)** | 软件无法启动 | < 1 分钟 | PowerShell 查找并强制 Stop-Process |
| **系统代理注册表未及时注销** | **高发 (35%)** | 全系统断网 | < 30 秒 | 一键将 ProxyEnable 键值清零 |
| **第三方转换丢失 TLS 字段** | 中等 (15%) | 节点无法握手 | 2 分钟 | 改用机场原生直出订阅配置 |
| **杀毒软件静默拦截驱动** | 低 (5%) | TUN 模式失效 | 3 分钟 | 添加应用主文件夹至杀软白名单 |`;
  }
}

// 5. Specialized Gotchas
export function buildArticleGotchas(art, ent, kb, tierIndex = 0) {
  if (tierIndex === 0) {
    return `1. **未核实运行环境便强行执行配置**：在处理「${art.title}」时，若未先确认系统是否具备对应特权，盲目写入配置文件极易引发权限拒绝错误。
2. **忽视本地安全软件的静默拦截机制**：许多杀毒软件在阻断底层核心时不会主动弹出通知，界面看似正常但网络 Socket 实际已被静默掐断。
3. **未做初始配置备份直接覆盖修改**：在调整客户端核心参数前，未保留原版 profiles 副本，一旦新配置语法报错将面临不可逆断网。`;
  } else if (tierIndex === 1) {
    return `1. **盲目追求极限低 Ping 而忽略真实吞吐量**：在多方案对比中，某些节点内测延迟极低但单线程带宽被限速至 2Mbps，根本无法支撑 4K 播放。
2. **在严格限制 UDP 的网络中强推 Hysteria 2**：校园网或公司内网会对大流量 UDP 实施 QoS 丢包或直接断网，此时必须平滑切回 TCP Reality。
3. **将临时公共转换源作为长期生产依赖**：公共 Subconverter 节点不仅经常落后于协议更新，更存在泄露个人 Token 的严重隐私隐患。`;
  } else {
    return `1. **未杀掉后台残留僵死核心导致重复启动失败**：关闭主界面并不代表底层核心已释放端口，排查时务必先在任务管理器中核对进程树。
2. **直接删除软件文件夹遗留系统网络死锁**：在开启系统代理或 TUN 模式时直接卸载应用，会导致注册表代理开关保持开启，引发重启后全面断网。
3. **把国内中转入口延迟误当作海外真实连通性**：客户端测速延迟全绿，仅表明本地到机场国内机房畅通，必须配合真实网页请求验证落地出口状态。`;
  }
}

// 6. Specialized FAQs
export function buildArticleFAQs(art, ent, kb, tierIndex = 0) {
  let q2 = '';
  let a2 = '';

  if (tierIndex === 0) {
    q2 = `针对「${art.title}」，初次配置完成后最稳妥的验证步骤是什么？`;
    a2 = '先在终端执行一次真实的 HTTP GET 请求（如 `curl -I https://www.google.com`），确认首字节响应时间在 100ms 以内且无 DNS 劫持污染，即可确认配置已完全就绪。';
  } else if (tierIndex === 1) {
    q2 = `在多协议或多方案共存的情况下，如何保证设备功耗与网络性能的最佳平衡？`;
    a2 = '对于日常办公查资料，保持规则模式（Rule）配合内网专线节点即可将待机能耗控制在 1% 以下；仅在恶劣丢包网络或观看超清视频时切换至高爆发的 UDP 协议。';
  } else {
    q2 = `如果遇到突发断网，按照本指南排障后依然无法恢复，应该如何快速收集排查日志？`;
    a2 = '进入客户端的【日志 (Logs)】选项卡，将日志级别切换为 `Debug`，复制最后 30 行包含 Error/Fatal 的关键报错，结合操作系统版本向服务商提交工单即可秒级定位。';
  }

  return [
    {
      question: art.title,
      answer: art.expectedAnswer || '按照本文提供的具体实操步骤与代码指令执行，可在 1-3 分钟内完成标准化校验并恢复通信。'
    },
    {
      question: q2,
      answer: a2
    },
    ...(kb.faqs || []).slice(0, 1)
  ];
}
