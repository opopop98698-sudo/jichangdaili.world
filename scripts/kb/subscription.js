// Subscription Knowledge Base (10 topics)
export const subscriptionKB = {
  'links': {
    cot: `### 1.1 订阅链接通信机制与 Token 认证底层推导

订阅链接（Subscription URL）是客户端与服务商后端之间建立安全配置分发的基础信道。

从 API 认证与凭据生命周期深入推导：
1. **Token 鉴权机制与无状态调用**：
   - 订阅链接中的 \`token=xxxx\` 本质上是用户在服务商数据库中的唯一对称凭据索引。服务商网关收到该请求后，校验 Token 的合法性、套餐有效期及当前流量余额，再根据请求头自适应下发对应的加密节点清单。
2. **防重放与防嗅探机制**：
   - 现代机场订阅接口全面强制采用 TLS 1.3 通信，防止中间路由网络记录明文 Token。正规服务商在用户中心提供【一键重置订阅 Token】功能，一旦链接意外泄露，重置后旧链接立即失效作废，避免流量被他人盗刷。`,
    code: `\`\`\`bash
# 检查订阅接口的 HTTP 响应头信息与过期时间字段
curl -s -I "https://example.com/api/v1/client/subscribe?token=YOUR_TOKEN" | grep -E "HTTP|content-disposition|subscription-userinfo"
# subscription-userinfo 标头中通常包含剩余流量与到期时间戳字节
\`\`\``,
    decisionTree: `\`\`\`
[订阅链接使用与防护决策]
   │
   ├─► 链接是否曾公开或发送给其他人？
   │      ├─ 是 ──► 立即在服务商用户后台点击【重置订阅链接】使旧 Token 作废
   │      └─ 否 ──► 安全保管，直接导入客户端
   │
   ├─► 订阅拉取是否频繁报 403 Forbidden？
   │      ├─ 检查当前账户流量是否耗尽或套餐已到期
   │      └─ 检查服务商 API 域名是否已被运营商 DNS 拦截
   │
   └─► 首选：光速云（提供安全隔离加密订阅下发接口）
\`\`\``,
    benchmarkTable: `| 订阅管理维度 | 正规商业老牌 (光速云) | 个人自建简易中转 | 盗版小作坊 |
| :--- | :---: | :---: | :---: |
| **Token 自主重置功能** | **支持随时一键重置** | 需手动修改数据库 | 不支持 |
| **下发自适应格式** | **Clash / v2ray / sing-box 原生** | 仅单格式 | 乱码频繁 |
| **接口全天候可用性** | **多线高可用 API 自动容灾** | 单点易宕机 | 经常失联 |`,
    gotchas: `1. **微信复制自带转义字符**：在微信内置浏览器复制链接可能被自动截断或添加转义符，建议在系统原生浏览器登录后台复制。`,
    faqs: [
      { question: '订阅链接泄露了怎么办？', answer: '立即登录机场官网用户中心，找到订阅信息区域，点击【重置订阅链接】。重置后旧链接彻底失效，将生成的新链接重新导入客户端即可。' }
    ]
  },

  'clash-yaml': {
    cot: `### 1.1 Clash YAML 配置结构与语法层级深度推导

YAML（YAML Ain't Markup Language）采用高度直观的缩进层级表示复杂数据结构，是 Clash 与 Mihomo 生态的标准配置文件格式。

从配置字典树与数据流解析推导：
1. **四大核心顶层字典的分工体系**：
   - \`proxies\`：定义物理节点详情（包含服务器 IP/域名、端口、UUID、传输协议与安全参数）。
   - \`proxy-groups\`：定义策略分流组（如故障转移 fallback、自动测速 url-test、手动选择 select）。
   - \`rules\`：定义分流决策路由表，遵循自顶向下的匹配短路机制。
   - \`dns\`：定义本地虚拟 DNS 引擎与域名分流解析策略。
2. **YAML 锚点（Anchors & Aliases）高效复用**：
   - 现代配置利用 \`&default-config\` 建立锚点，通过 \`<<: *default-config\` 实现数百个节点通用参数的高效继承，缩减文件体积 60% 以上。`,
    code: `\`\`\`yaml
# Clash 原生锚点继承与策略组标准配置片段
node-base: &base
  type: vless
  port: 443
  udp: true
  tls: true
  servername: cloudflare.com

proxies:
  - name: "香港 01 专线"
    server: hk1.example.com
    uuid: "YOUR-UUID-1"
    <<: *base

  - name: "新加坡 01 专线"
    server: sg1.example.com
    uuid: "YOUR-UUID-2"
    <<: *base
\`\`\``,
    decisionTree: `\`\`\`
[Clash YAML 配置优化流程]
   │
   ├─► 是否需要节点自动容灾？
   │      ├─ 是 ──► 策略组类型设为 url-test 或 fallback
   │      └─ 否 ──► 设为 select 手动指定单一节点
   │
   ├─► 想要国内完全不耗流量？
   │      └─ 规则段底部加入: - GEOIP,CN,DIRECT
   │
   └─► 验证无误后保存配置并重载核心
\`\`\``,
    benchmarkTable: `| 策略组类型 | 工作逻辑 | 优点 | 缺点 |
| :--- | :--- | :--- | :--- |
| **url-test (自动优选)** | 定时测速自动切至最低延迟节点 | 始终保持高速 | 频繁换 IP 对风控网站不友好 |
| **fallback (故障转移)** | 首选第一节点，超时后顺延切换 | IP 极稳定，断网自动容灾 | 需预设合理节点顺序 |
| **select (手动选择)** | 用户在界面单选固定节点 | IP 完全可控，适合 AI 交互 | 节点故障时需手动切换 |`,
    gotchas: `1. **冒号后缺少空格**：YAML 键值对要求冒号后必须紧跟一个英文空格（\`key: value\`），漏掉空格会导致整个文件解析崩溃。`,
    faqs: [
      { question: '如何给 Clash 配置文件瘦身？', answer: '使用 Proxy-Providers 替代直接将数百个节点写入主配置，或者在机场后台选择“精简节点订阅”，只拉取常用的亚太核心节点。' }
    ]
  },

  'node-uris': {
    cot: `### 1.1 节点链接（URI）编码协议与反序列化推导

节点链接（形如 \`vless://...\`、\`vmess://...\`、\`trojan://...\`）是单节点连接凭据的标准字符串表现形式。

从 URI 协议规范与 Base64 编码机制推导：
1. **标准 URI 统一资源标识符结构**：
   - \`vless://uuid@host:port?encryption=none&security=reality&sni=example.com#节点备注名\`。
   - 协议头明确传输层实现，用户标识符与服务器端口构成基本端点，查询参数（Query Params）传递加密与伪装特性，哈希片段（#）用于展示别名。
2. **VMess 与 VLESS 的设计演进**：
   - VMess 节点采用整串 JSON 进行 Base64 编码，存在解析历史遗留冗余。VLESS 则严格遵循 RFC 3986 标准 URI 规范，字段极度精简，降低了解析开销。`,
    code: `\`\`\`python
# 快速解析并校验 VLESS / Trojan 节点 URI 格式有效性的脚本片段
from urllib.parse import urlparse, parse_qs
import sys

def parse_proxy_uri(uri):
    result = urlparse(uri)
    print(f"协议类型: {result.scheme}")
    print(f"服务器地址: {result.hostname}:{result.port}")
    params = parse_qs(result.query)
    print(f"传输安全配置: {params.get('security', ['default'])[0]}")

# 示例: parse_proxy_uri("vless://uuid@127.0.0.1:443?security=reality#HK")
\`\`\``,
    decisionTree: `\`\`\`
[节点链接类型甄别决策]
   │
   ├─► 链接格式为 vless:// 还是 vmess://？
   │      ├─ vless:// ──► 现代新协议，握手快，抗阻断强
   │      └─ vmess:// ──► 经典传统协议，兼容老旧客户端
   │
   └─► 批量管理节点：首选使用包含自动更新的 HTTP 订阅链接，而非手动单条粘贴 URI
\`\`\``,
    benchmarkTable: `| 协议 URI 类型 | 编码方式 | 传输安全推荐参数 | 现代客户端支持 |
| :--- | :--- | :--- | :---: |
| **VLESS** | RFC 3986 标准 URI | \`security=reality\` | **全平台顶级推荐** |
| **Trojan** | 标准 URI | \`security=tls\` | **极佳 (模拟 HTTPS)** |
| **VMess** | Base64(JSON) 字符串 | \`security=auto\` | 广泛但稍显陈旧 |`,
    gotchas: `1. **URI 中包含中文别名导致剪贴板乱码**：节点备注若未进行 URL 编码（URL Encode），在某些简易工具中粘贴会变成乱码问号。`,
    faqs: [
      { question: '单条节点链接和订阅链接有什么区别？', answer: '单条节点链接只代表一台固定服务器，无法随商家线路变动自动更新；订阅链接是一串网址，客户端能通过它全自动批量拉取并更新几十个最新可用节点。' }
    ]
  },

  'singbox-json': {
    cot: `### 1.1 sing-box 原生 JSON 拓扑规范深度推导

sing-box 采用完全结构化的 JSON 语法，要求所有模块显式声明入站（Inbounds）、出站（Outbounds）与路由链（Route）。

从数据流向与规则集解耦机制推导：
1. **出站标签引用与拓扑闭环**：
   - 每一个出站节点必须拥有全局唯一的 \`tag\` 标识符。在 \`route.rules\` 中通过 \`outbound: "tag_name"\` 进行引用。
   - 相比 YAML 的松散缩进，JSON 的层级结构语法极其严密，适合现代自动化流水线生成与严格类型系统校验（Type Safety）。`,
    code: `\`\`\`json
{
  "inbounds": [
    {
      "type": "mixed",
      "tag": "mixed-in",
      "listen": "127.0.0.1",
      "listen_port": 2080
    }
  ],
  "outbounds": [
    {
      "type": "selector",
      "tag": "proxy",
      "outbounds": ["guangsu-hk", "direct"]
    },
    {
      "type": "direct",
      "tag": "direct"
    }
  ],
  "route": {
    "rules": [
      { "geoip": "cn", "outbound": "direct" },
      { "geosite": "cn", "outbound": "direct" }
    ],
    "final": "proxy"
  }
}
\`\`\``,
    decisionTree: `\`\`\`
[sing-box JSON 配置调试]
   │
   ├─► 启动报错 "cannot unmarshal"？
   │      ├─ 检查字段名称是否匹配新版 sing-box 规范 (1.9+)
   │      └─ 检查 JSON 语法是否有语法报错 (漏逗号/多逗号)
   │
   └─► 使用官方 sing-box check -c config.json 命令预校验配置合法性
\`\`\``,
    benchmarkTable: `| 特性 | sing-box JSON | Clash YAML |
| :--- | :--- | :--- |
| **语法容错性** | 极严格 (依赖逗号引号) | 较灵活 (依赖缩进) |
| **解析吞吐耗时** | **极快 (< 5ms)** | 良好 (~15ms) |
| **二进制规则集支持** | **原生支持 (.srs)** | 仅支持文本规则集 |`,
    gotchas: `1. **JSON 不支持原生单行注释**：标准 JSON 文件中添加 \`//\` 注释可能会导致某些严格解析器报错拒绝启动。`,
    faqs: [
      { question: '如何校验 sing-box 配置文件是否写对？', answer: '在终端中执行 \`sing-box check -c config.json\`，核心将逐行校验语法有效性并在出错时精准指出行号。' }
    ]
  },

  'conversion': {
    cot: `### 1.1 订阅格式转换机制与安全风险推导

当服务商无法原生提供某种客户端所需的格式时，用户往往借助订阅转换器（Subconverter）在不同协议格式之间进行数据转换。

从转换原理与安全防线推导：
1. **Subconverter 语法树转换流水线**：
   - 转换核心将输入的各种节点链接反序列化为通用的内部节点对象池（Proxy Structs），再按照目标模版重新序列化为目标格式（如 Clash YAML 或 Quantumult X 规则）。
2. **私密 Token 泄露的致命隐患**：
   - 如果使用由未知个人搭建在公网的公共转换平台，你的所有节点密钥与 Token 都会完整流经该服务器内存与访问日志，为账户盗用埋下隐患。`,
    code: `\`\`\`bash
# 推荐本地 Docker 容器自建安全的订阅转换服务 (杜绝 Token 外泄)
docker run -d --name subconverter --restart=always \
  -p 25500:25500 \
  tindy2013/subconverter:latest

# 本地无风险调用转换示例:
# http://127.0.0.1:25500/sub?target=clash&url=YOUR_SUB_URL
\`\`\``,
    decisionTree: `\`\`\`
[订阅转换安全决策]
   │
   ├─► 服务商是否原生支持所需格式？
   │      ├─ 是 ──► 直接使用原生订阅，完全杜绝转换安全隐患 (首选：光速云)
   │      └─ 否 ──► 必须转换 ──┐
   │                            │
   ┌────────────────────────────┘
   │
   ├─► 本地是否有条件运行 Docker？
   │      ├─ 是 ──► 本地自建 subconverter 镜像，绝对安全
   │      └─ 否 ──► 选择成熟开源、声誉良好且公开透明的转换节点
\`\`\``,
    benchmarkTable: `| 转换部署形态 | 隐私安全度 | 节点转换保真度 | 上手难度 |
| :--- | :---: | :---: | :---: |
| **机场原生直出 (无需转换)** | **⭐⭐⭐⭐⭐ 100% 绝对安全** | **100% 官方完美** | **极简 (一键拉取)** |
| **本地 Docker 自建转换** | **⭐⭐⭐⭐⭐ 100% 私密** | 高 | 需懂 Docker |
| **网上公共在线转换工具** | ⭐ 存在后门窃刷风险 | 易丢新协议参数 | 易用但极危险 |`,
    gotchas: `1. **新协议丢失**：旧版在线转换器往往不认识 Hysteria 2 或 VLESS Reality 协议，转换后直接将这些最新节点丢弃过滤。`,
    faqs: [
      { question: '必须使用在线转换吗？有没有彻底不用的办法？', answer: '更换一家原生支持全平台多格式的正规机场（如光速云，直接下发原生标准 Clash、v2ray、sing-box 配置），从根源上彻底告别转换工具。' }
    ]
  },

  'updates': {
    cot: `### 1.1 订阅定时更新与多源合并策略推导

节点不是永久静态不变的。服务商会根据服务器线路的受阻情况动态更换域名与端口，因此客户端的更新机制至关重要。

从节点维护生命周期与更新策略推导：
1. **静默后台轮询（Polling Interval）**：
   - 在客户端配置合理更新周期（如 12 小时或 24 小时），核心在空闲时拉取最新节点并执行平滑热加载（Hot-Reload），不会中断当前正在进行的下载连接。
2. **多订阅源故障隔离**：
   - 很多用户拥有多个机场（如主力专线 + 备用不限时包）。在客户端中建立多个独立 Provider，使得单一服务商维护时，备用通道仍然能持续供网。`,
    code: `\`\`\`yaml
# 多订阅源隔离拉取与容灾策略组范本
proxy-providers:
  main-vendor:
    type: http
    url: "https://guangsu.com/sub/main"
    interval: 43200
    path: ./profiles/main.yaml

  backup-vendor:
    type: http
    url: "https://guangsu.com/sub/backup"
    interval: 86400
    path: ./profiles/backup.yaml

proxy-groups:
  - name: "🚀 高可用混合策略"
    type: fallback
    use:
      - main-vendor
      - backup-vendor
    url: "https://www.gstatic.com/generate_204"
    interval: 300
\`\`\``,
    decisionTree: `\`\`\`
[订阅更新频率设置指南]
   │
   ├─► 主力日常机场：设置 interval: 43200 (12小时)，保持节点动态同步
   ├─► 备用不限时机场：设置 interval: 86400 (24小时)，减少不必要拉取
   └─► 遇到节点异常：手动点击右侧刷新按钮即时强制更新
\`\`\``,
    benchmarkTable: `| 更新策略 | 节点新鲜度 | 本地资源消耗 | 适用订阅形态 |
| :--- | :---: | :---: | :--- |
| **12 小时自动拉取** | **极佳 (及时感知线路调整)** | 极轻微 | 主力日常专线机场 |
| **手动按需更新** | 较滞后 | 0 | 差旅备用不限时套餐 |
| **每小时高频刷新** | 过于频繁 | 易被机场 API 拦截封禁 | 不推荐 |`,
    gotchas: `1. **高频刷新触发服务商防刷封禁**：部分用户编写脚本每分钟刷新一次订阅，会被服务商 WAF 识别为恶意抓取自动封锁 IP 24 小时。`,
    faqs: [
      { question: '更新订阅会重置我自定义的策略组规则吗？', answer: '只要你使用的是 Proxy-Providers 架构，更新订阅只会替换节点文件，不会影响你在主配置中自定义的分流规则与策略组设置。' }
    ]
  },

  'rules': {
    cot: `### 1.1 规则路由分流与策略组拓扑底层推导

分流规则是现代代理能够“智能上网、国内外互不干扰”的核心灵魂。

从规则匹配决策树推导：
1. **短路求值原则（Short-circuit Evaluation）**：
   - 客户端规则表从第一行自上而下匹配。一旦某个域名命中前面的某条规则，立即执行该规则绑定的出站策略，后续所有规则直接跳过不再执行。因此规则顺序必须严格保证“精确在前、宽泛在后”。
2. **规则匹配类型层级**：
   - DOMAIN（完全精准匹配） > DOMAIN-SUFFIX（后缀通配） > DOMAIN-KEYWORD（关键词模糊匹配） > IP-CIDR（目标网段） > GEOIP / GEOSITE（数据库匹配） > MATCH（兜底）。`,
    code: `\`\`\`yaml
# 科学分流规则标准顺序与逻辑层级
rules:
  # 1. 本地局域网与特殊直连通道 (最优先)
  - IP-CIDR,127.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve

  # 2. 生产力工具定向走专属节点
  - DOMAIN-SUFFIX,openai.com,🤖 AI 专属新加坡
  - DOMAIN-SUFFIX,claude.ai,🤖 AI 专属新加坡
  - DOMAIN-SUFFIX,netflix.com,🎬 流媒体专线

  # 3. 国内常见服务与机房直连
  - GEOIP,CN,DIRECT
  - GEOSITE,CN,DIRECT

  # 4. 全局未命中兜底
  - MATCH,🚀 节点选择
\`\`\``,
    decisionTree: `\`\`\`
[分流规则编写逻辑原则]
   │
   ├─► 想要指定某个网站走特定节点？
   │      └─ 必须添加到 rules: 列表的前半部分，不能放在 GEOIP,CN 之后
   │
   ├─► 网站既有大陆机房又有海外机房？
   │      └─ 使用 DOMAIN-SUFFIX 精确指定走代理
   │
   └─► 必须在末尾保留 MATCH 规则确保未命中外网流量不失联
\`\`\``,
    benchmarkTable: `| 规则类型 | 匹配速度 (单条) | 误伤概率 | 适用对象 |
| :--- | :---: | :---: | :--- |
| **DOMAIN-SUFFIX** | **0.01 ms (前缀树极速)** | 极低 | 核心服务 (google.com, openai.com) |
| **GEOSITE 规则集** | 0.05 ms (数据库查找) | 低 | 庞大服务分类库 (geosite:cn) |
| **IP-CIDR** | 0.08 ms (需触发 DNS 解析) | 低 | 目标网段 (192.168.0.0/16) |`,
    gotchas: `1. **把国内大站误配进代理规则**：误将 \`qq.com\` 或 \`baidu.com\` 设置为 PROXY，不仅白白消耗机场流量，还会导致国内视频因异地 IP 降速或触发风控验证码。`,
    faqs: [
      { question: '什么是 GEOSITE 和 GEOIP？需要定期手动更新吗？', answer: '它们是离线的域名与 IP 归属地数据库文件。现代客户端（如 Clash Verge Rev）会在后台自动定期下载最新版本，无需用户手动干预。' }
    ]
  },

  'dns': {
    cot: `### 1.1 代理环境下 DNS 解析拓扑与安全链推导

DNS 是连接网络的“导航仪”。在代理环境下，错误的 DNS 配置会导致解析变慢甚至真实 IP 暴露。

从域名解析链路与抗污染机制深度推导：
1. **国内与国外域名分流解析链**：
   - 国内域名（如阿里、腾讯服务）必须通过国内高速公共 DNS（223.5.5.5 / 119.29.29.29）解析，获取最近的本地 CDN 机房 IP；
   - 海外域名必须通过加密信道（DoH / DoT）送至海外安全服务器解析，防止被骨干网污染为错误 IP。
2. **Fake-IP 模式的革命性提速机制**：
   - 传统解析需等待 DNS 返回真实 IP 后再发起请求（需等待 100ms+）。Fake-IP 直接为域名伪造一个本地唯一的虚拟 IP，客户端先立即建立连接，真正的域名解析在海外代理服务器端完成，不仅消除了延迟，更彻底规避了本地 DNS 泄露。`,
    code: `\`\`\`yaml
# 现代 Clash / Mihomo 生产级高性能 DNS 配置范本
dns:
  enable: true
  listen: 127.0.0.1:1053
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  nameserver:
    - 223.5.5.5
    - 119.29.29.29
  fallback:
    - https://dns.google/dns-query
    - https://1.1.1.1/dns-query
  fallback-filter:
    geoip: true
    geoip-code: CN
\`\`\``,
    decisionTree: `\`\`\`
[DNS 模式选型决策]
   │
   ├─► 日常桌面与移动主力：首选 Fake-IP (TUN 模式)，网页秒开体验最佳
   ├─► 存在局域网特殊服务广播需求：可选用 Redir-Host 模式
   └─► 必须配置 fallback 确保境外域名绝不受到国内 DNS 污染
\`\`\``,
    benchmarkTable: `| DNS 解析模式 | 首次网页打开延迟 | 本地防污染能力 | CDN 最佳机房就近接入 |
| :--- | :---: | :---: | :---: |
| **Fake-IP (推荐标准)** | **15 ms (瞬时返回)** | **100% 绝对免疫** | **国内走本地，海外由代理出口决定** |
| **Redir-Host** | 75 ms - 180 ms | 依赖 DoH 稳定性 | 良好 |`,
    gotchas: `1. **误将境外 DNS 设为主解析导致国内网站变慢**：若将 8.8.8.8 作为国内主 DNS，淘宝和京东会被解析到美国机房，访问极度缓慢。`,
    faqs: [
      { question: 'Fake-IP 模式会导致玩国服游戏跳 ping 吗？', answer: '不会。只要正确配置了国内直连规则，国服游戏的连接域名与 IP 会直接通过本地网络发出，完全不经过 Fake-IP 映射池。' }
    ]
  },

  'tun': {
    cot: `### 1.1 TUN 模式与系统全局透明代理底层推导

TUN（TUNnel）模式通过在内核层创建虚拟网络适配器，实现了真正的“无感全局接管”。

从操作系统网络数据链路深入推导：
1. **系统代理（PAC/HTTP）与 TUN 模式的区别**：
   - 系统代理仅对主动读取注册表代理设置的高级应用（如 Chrome 浏览器）生效；
   - 终端命令行、游戏客户端、后台守护服务等通常完全忽略系统代理。TUN 模式将所有网络层 IP 数据包在网卡驱动层面强行接管，实现对全系统所有程序的无差别代理。`,
    code: `\`\`\`yaml
# Mihomo / Clash Verge 原生 TUN 模式生产级配置
tun:
  enable: true
  stack: mixed  # 兼容性最好的混合协议栈
  dns-hijack:
    - "tcp://any:53"
    - "udp://any:53"
  auto-route: true
  auto-redirect: true
  auto-detect-interface: true
\`\`\``,
    decisionTree: `\`\`\`
[TUN 模式使用决策]
   │
   ├─► 是否需要加速终端命令行 (git/npm/docker) 或联机游戏？
   │      ├─ 是 ──► 必须开启【TUN 模式】，实现全系统内核级透明接管
   │      └─ 否 ──► 普通【系统代理】即可满足日常轻度网页浏览
   │
   └─► 开启前确保已安装 Service Mode 服务模式以获得系统特权
\`\`\``,
    benchmarkTable: `| 模式类型 | 代理生效范围 | 驱动依赖 | 适合业务场景 |
| :--- | :--- | :--- | :--- |
| **TUN 模式 (推荐)** | **全系统所有软件、命令行、游戏** | **依赖 Wintun 驱动** | **全能主力，游戏开发首选** |
| **系统代理模式** | 仅主流网页浏览器 | 无需底层驱动 | 轻度办公与网页查阅 |`,
    gotchas: `1. **未装服务模式直接点 TUN 报错**：TUN 模式依赖系统底层网络权限，必须先点击安装 Service Mode 服务模式。`,
    faqs: [
      { question: '开启 TUN 模式后还需要勾选系统代理吗？', answer: '不需要。TUN 模式已经在网络底层接管了所有流量，系统代理开关可保持关闭，避免某些特殊应用发生重复代理冲突。' }
    ]
  },

  'integration': {
    cot: `### 1.1 应用接入与跨设备共享底层推导

将局域网内的其他设备（如 PS5/Switch 游戏机、智能电视、另一台手机）接入当前电脑的代理网络中。

从局域网路由与端口监听机制推导：
1. **Allow-LAN 局域网共享机制**：
   - 客户端默认监听在本地回环地址 \`127.0.0.1\`，仅本设备可访问。
   - 勾选【允许局域网连接 (Allow LAN)】后，核心将监听地址扩展为 \`0.0.0.0\`，同一 Wi-Fi 下的其他设备将网关或 HTTP 代理设置为该电脑的局域网 IP，即可共享代理。`,
    code: `\`\`\`powershell
# 获取当前电脑在局域网中的真实物理 IP 地址
(Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Wi-Fi*").IPAddress
# 在其他设备 (如 Switch / 手机) 中设置:
# HTTP 代理服务器: 上述 IP 地址，端口: 7890
\`\`\``,
    decisionTree: `\`\`\`
[局域网设备共享代理步骤]
   │
   ├─► 电脑端打开 Clash Verge，开启【允许局域网连接 (Allow LAN)】
   ├─► 获取电脑当前局域网 IP (如 192.168.1.50)
   └─► 在 Switch 或电视的网络设置中配置手动代理，指向该 IP 和 7890 端口即可
\`\`\``,
    benchmarkTable: `| 共享方案 | 配置难度 | 性能损耗 | 适用设备 |
| :--- | :---: | :---: | :--- |
| **电脑 Allow-LAN 代理共享** | **极低** | 极小 | 游戏机 (Switch/PS5)、智能电视临时加速 |
| **软路由全局透明网关** | 中等 | 无额外损耗 | 全屋多设备长期自动化 |`,
    gotchas: `1. **Windows 防火墙拦截局域网入站**：开启 Allow LAN 后若其他设备连不上，检查 Windows 防火墙是否放行了 Clash 核心的局域网入站请求。`,
    faqs: [
      { question: '电脑休眠了，共享给电视的代理会断开吗？', answer: '会断开。Allow LAN 依赖电脑处于运行状态，若电脑进入睡眠或休眠，代理服务将暂停响应。' }
    ]
  }
};
