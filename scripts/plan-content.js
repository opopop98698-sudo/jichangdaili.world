import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// 1. Definition of the 8 content sections
const SECTIONS = [
  { id: 'recommend', title: '机场推荐', url: '/recommend/', description: '具体服务、套餐与客户端兼容条件核对指南' },
  { id: 'free', title: '免费机场', url: '/free/', description: '真实免费、试用、活动赠送及限制规则全面解析' },
  { id: 'clients', title: '客户端下载', url: '/clients/', description: '主流代理软件、多系统架构、版本及官方安全发布来源' },
  { id: 'install', title: '安装教程', url: '/install/', description: '全平台客户端安装步骤、首次启动、系统权限与环境配置' },
  { id: 'subscription', title: '订阅配置', url: '/subscription/', description: '订阅链接导入、规则分流、DNS 解析、TUN 虚拟网卡与应用集成' },
  { id: 'troubleshooting', title: '故障排查', url: '/troubleshooting/', description: '按报错症状分类的系统化检查树、修复方案与可逆验证' },
  { id: 'reviews', title: '客户端评测', url: '/reviews/', description: '同基准测试、系统资源消耗、分流准确性与客观优劣势对比' },
  { id: 'learn', title: '新手课堂', url: '/learn/', description: '网络常识、核心与客户端边界、计费规则与常见误区解读' }
];

// 2. Full enumeration of 80 Level-2 Topics and 160 Clusters
const TOPICS_AND_CLUSTERS = [
  // Section 1: recommend
  {
    sectionId: 'recommend', topicId: 'universal', title: '通用订阅与多格式机场',
    clusters: [
      { id: 'multiformat-check', title: '多格式支持核对', articles: [
        { slug: 'verify-airport-sub-formats', title: '如何核对机场是否同时提供Clash、V2Ray与Base64通用订阅链接' },
        { slug: 'multi-protocol-node-support-guide', title: '多协议节点支持核对：SS、VMess、VLESS与Trojan的可用性判断' },
        { slug: 'auto-format-conversion-risks', title: '机场后端自带格式转换器的容错率与常见解析缺失点' }
      ]},
      { id: 'cross-client-migration', title: '跨客户端迁移选型', articles: [
        { slug: 'migrate-between-clash-and-singbox', title: '从Clash迁移到sing-box：订阅链接与节点兼容性选型指南' },
        { slug: 'cross-platform-subscription-portability', title: '跨平台订阅可移植性评测：Windows、macOS与移动端通用要求' },
        { slug: 'hybrid-node-airport-selection', title: '混合节点类型机场的客户端适配策略与容灾建议' }
      ]}
    ]
  },
  {
    sectionId: 'recommend', topicId: 'mihomo', title: 'Clash 与 Mihomo 兼容机场',
    clusters: [
      { id: 'clash-subscription', title: 'Clash 订阅适配', articles: [
        { slug: 'mihomo-extended-yaml-features-check', title: 'Mihomo核心专属特性核对：Proxy-Provider与Hysteria2支持' },
        { slug: 'clash-meta-yaml-compatibility-testing', title: 'Clash Meta配置兼容测试：标准YAML格式与自定义规则拉取' },
        { slug: 'clash-node-group-naming-conventions', title: '机场策略组命名规范与Clash Verge Rev自动识别逻辑' }
      ]},
      { id: 'clash-requirements', title: 'Clash 使用需求选型', articles: [
        { slug: 'choose-airport-for-clash-verge-rev', title: 'Clash Verge Rev用户如何挑选低故障率且节点及时的机场' },
        { slug: 'rule-based-airport-node-selection', title: '分流规则重度用户选购机场的必看指标与节点健康检查频率' },
        { slug: 'high-concurrency-clash-airport-criteria', title: '高并发长连接场景下Clash兼容机场的连接数限制核查' }
      ]}
    ]
  },
  {
    sectionId: 'recommend', topicId: 'xray-clients', title: 'v2rayN 与 v2rayNG 兼容机场',
    clusters: [
      { id: 'v2rayn-selection', title: 'v2rayN 服务选择', articles: [
        { slug: 'v2rayn-core-compatibility-matching', title: 'v2rayN多核心兼容性：Xray与sing-box核心切换选型' },
        { slug: 'v2rayn-custom-routing-airport-criteria', title: '适合v2rayN高级自定义路由与GeoIP分流的机场特征' },
        { slug: 'v2rayn-bulk-node-latency-testing', title: '大规模节点导入后v2rayN真连接延迟测试的有效性辨析' }
      ]},
      { id: 'v2rayng-selection', title: 'v2rayNG 服务选择', articles: [
        { slug: 'v2rayng-android-power-saving-criteria', title: 'Android端v2rayNG长时间待机保活对节点稳定性的要求' },
        { slug: 'v2rayng-sub-auto-update-airport-check', title: 'v2rayNG移动端订阅定时更新失败排查与机场链接要求' },
        { slug: 'v2rayng-split-tunnel-app-routing-tips', title: 'v2rayNG分应用代理配合机场原生IP节点的选型方法' }
      ]}
    ]
  },
  {
    sectionId: 'recommend', topicId: 'singbox', title: 'sing-box 与 Hiddify 兼容机场',
    clusters: [
      { id: 'config-core-criteria', title: '配置与核心条件', articles: [
        { slug: 'singbox-native-json-airport-selection', title: '支持sing-box原生JSON订阅配置的机场挑选标准' },
        { slug: 'hiddify-multi-protocol-airport-matching', title: 'Hiddify跨平台客户端与新一代多协议机场的适配矩阵' },
        { slug: 'rule-set-srs-binary-airport-support', title: '独立规则集SRS二进制编译与机场订阅的分流兼容度' }
      ]},
      { id: 'cross-platform-maintenance', title: '跨平台与更新维护', articles: [
        { slug: 'singbox-version-breaking-changes-prep', title: 'sing-box版本破坏性迭代时机场配置模版的跟进质量核对' },
        { slug: 'hiddify-auto-warp-multi-node-balance', title: 'Hiddify自动优选节点与多协议并发连接的机场支持情况' },
        { slug: 'full-platform-singbox-sync-experience', title: '全平台使用sing-box多端同步配置时的统一节点筛选要求' }
      ]}
    ]
  },
  {
    sectionId: 'recommend', topicId: 'apple', title: '苹果设备机场选择',
    clusters: [
      { id: 'ios-ipados-selection', title: 'iPhone 与 iPad 选型', articles: [
        { slug: 'shadowrocket-subscription-airport-checklist', title: '小火箭Shadowrocket用户选购机场的核心避坑清单' },
        { slug: 'ios-on-demand-vpn-airport-criteria', title: 'iOS按需连接On-Demand特性对节点握手延迟的严苛要求' },
        { slug: 'loon-surge-stash-premium-airport-fit', title: 'Loon、Surge与Stash高端规则客户端对应的节点质量门槛' }
      ]},
      { id: 'macos-multi-device', title: 'Mac 与苹果多设备', articles: [
        { slug: 'macos-apple-silicon-native-client-airports', title: 'Mac平台原生ARM架构客户端支持与机场多节点切换' },
        { slug: 'icloud-private-relay-airport-coexistence', title: 'iCloud专用代理与第三方客户端并存时的机场选型注意' },
        { slug: 'apple-ecosystem-multi-device-concurrency', title: '苹果全家桶多设备同开时机场并发连接与IP限制核对' }
      ]}
    ]
  },
  {
    sectionId: 'recommend', topicId: 'beginner-friendly', title: '新手友好机场',
    clusters: [
      { id: 'first-purchase-onboarding', title: '首次购买与上手', articles: [
        { slug: 'first-time-buyer-airport-checklist', title: '第一次买机场：五步筛选法与必须提前确认的参数' },
        { slug: 'one-click-import-button-reality-check', title: '一键导入客户端按钮背后的协议细节与可用性核查' },
        { slug: 'beginner-refund-policy-and-trial-scope', title: '新手退款保证条款与最短试用周期的阅读指南' }
      ]},
      { id: 'support-documentation-quality', title: '售后与资料质量', articles: [
        { slug: 'airport-doc-quality-grading-criteria', title: '从知识库文档质量提前预判机场的技术底蕴与维护态度' },
        { slug: 'ticket-support-response-time-benchmarks', title: '工单响应时效与Telegram交流群技术支持的客观考核' },
        { slug: 'beginner-friendly-traffic-reset-rules', title: '新手易懂的自然月与账单月流量重置规则解析' }
      ]}
    ]
  },
  {
    sectionId: 'recommend', topicId: 'budget', title: '便宜机场与总使用成本',
    clusters: [
      { id: 'low-threshold-entry', title: '低门槛首次付款', articles: [
        { slug: 'budget-airport-first-payment-thresholds', title: '月付5元到15元便宜机场的真实体验边界与风险预警' },
        { slug: 'avoid-annual-lock-in-cheap-airports', title: '便宜机场年付陷阱识别：为什么新手切勿轻信三年付超低价' },
        { slug: 'cheap-airport-bandwidth-sharing-ratios', title: '百兆与千兆共享带宽比率背后的真实峰值吞吐量' }
      ]},
      { id: 'tradeoffs-within-budget', title: '同预算服务取舍', articles: [
        { slug: 'budget-tradeoffs-nodes-vs-sla-uptime', title: '预算有限时：优先选节点数量还是优先选线路可用率' },
        { slug: 'cheap-airport-peak-hour-speed-drops', title: '低价机场在晚高峰20:00-23:00的抗丢包能力评估' },
        { slug: 'budget-airport-disaster-recovery-options', title: '便宜机场用户如何低成本自建双机场容灾备用方案' }
      ]}
    ]
  },
  {
    sectionId: 'recommend', topicId: 'flexible-usage', title: '低频与灵活流量方案',
    clusters: [
      { id: 'backup-low-frequency', title: '低频与备用用途', articles: [
        { slug: 'backup-airport-selection-for-emergency', title: '主线路故障时备用机场的挑选策略与待机维护成本' },
        { slug: 'low-frequency-user-traffic-decay-rules', title: '低频用户长期不使用时的账号保留规则与保活要求' },
        { slug: 'emergency-hotspot-lightweight-airports', title: '出差临时应急场景下小容量即开即用机场推荐' }
      ]},
      { id: 'pay-as-you-go-rules', title: '按量与不限时条件', articles: [
        { slug: 'pay-as-you-go-no-expiration-airports', title: '不限时按量付费机场的计费口径与单GB综合单价对比' },
        { slug: 'multiplier-nodes-in-pay-as-you-go', title: '高倍率节点对按量付费余额的消耗陷阱与防范技巧' },
        { slug: 'pay-as-you-go-node-pool-maintenance-check', title: '不限时套餐节点池更新频率与长效连通率核查' }
      ]}
    ]
  },
  {
    sectionId: 'recommend', topicId: 'multi-device', title: '多设备与软路由机场',
    clusters: [
      { id: 'device-connection-limits', title: '设备与连接限制', articles: [
        { slug: 'simultaneous-device-limits-and-ip-rules', title: '同时在线设备数与出口公网IP限制的实际计算规则' },
        { slug: 'family-sharing-multi-user-airport-fit', title: '家庭与团队多人共享场景下防止账号封禁的挑选规范' },
        { slug: 'tcp-udp-concurrency-limits-per-account', title: '并发连接数超限引起的节点短暂阻断现象与阈值考量' }
      ]},
      { id: 'router-gateway-criteria', title: '路由器接入条件', articles: [
        { slug: 'openwrt-passwall-openclash-airport-fit', title: 'OpenClash与PassWall软路由部署对机场订阅的特殊要求' },
        { slug: 'router-udp-fullcone-gaming-airport-check', title: '软路由NAT类型与FullCone UDP对游戏主机加速的支持' },
        { slug: 'home-gateway-bypass-performance-stress', title: '全屋智能家居环境网关旁路运行时的机场稳定性压力' }
      ]}
    ]
  },
  {
    sectionId: 'recommend', topicId: 'workload', title: '办公、AI与视频任务适配',
    clusters: [
      { id: 'office-ai-workload', title: '办公与AI需求', articles: [
        { slug: 'chatgpt-claude-ai-clean-ip-airports', title: 'ChatGPT与Claude等AI工具对原生IP纯净度与欺诈值的要求' },
        { slug: 'github-remote-dev-ssh-airport-stability', title: '开发者远程代码拉取与SSH连接长久保活的线路要求' },
        { slug: 'remote-office-zoom-teams-jitter-thresholds', title: '跨国视频会议Zoom与Teams对抖动与丢包率的底线指标' }
      ]},
      { id: 'streaming-peak-hours', title: '视频与高峰条件', articles: [
        { slug: 'netflix-disney-youtube-4k-airports', title: '4K超高清视频流媒体解锁与动态DNS证书检测' },
        { slug: 'peak-hour-iplc-iepl-transit-lines-guide', title: '晚高峰期IPLC专线、IEPL专线与普通公网中转体验差异' },
        { slug: 'regional-content-streaming-ip-types', title: '不同地区流媒体分流节点广播IP与原生机房IP的辨识' }
      ]}
    ]
  },

  // Section 2: free
  {
    sectionId: 'free', topicId: 'community', title: '长期免费与公益资源',
    clusters: [
      { id: 'eligibility-supply', title: '免费资格与供给', articles: [
        { slug: 'community-public-nodes-survival-time', title: '开源社区与公共节点订阅的存活周期与带宽限制分析' },
        { slug: 'public-node-harvesting-mechanisms', title: '网络爬虫抓取的全网免费节点池质量现状与可用率' },
        { slug: 'education-and-academic-proxy-access', title: '学术与教育科研公益镜像代理的申请资格与边界' }
      ]},
      { id: 'maintenance-changes', title: '维护与变动', articles: [
        { slug: 'public-proxy-abrupt-downtime-reasons', title: '公益节点无预警失效背后的IP阻断与服务器欠费机制' },
        { slug: 'how-to-track-reliable-free-sub-sources', title: '如何寻找并跟踪维护者持续更新的长期免费订阅源' },
        { slug: 'free-proxy-bandwidth-throttling-hours', title: '公益节点晚高峰自动化限流策略与排队机制解析' }
      ]}
    ]
  },
  {
    sectionId: 'free', topicId: 'trial', title: '机场免费试用',
    clusters: [
      { id: 'activation-test-plan', title: '激活与测试安排', articles: [
        { slug: 'airport-free-trial-onboarding-steps', title: '商业机场1至3天免费试用套餐的领取与节点激活步骤' },
        { slug: 'plan-effective-trial-speed-testing', title: '如何在有限试用期内科学完成节点测速与应用适配验证' },
        { slug: 'trial-package-node-discrimination-check', title: '防范试用陷阱：核验试用套餐是否被故意分配至低速节点池' }
      ]},
      { id: 'trial-eligibility', title: '领取资格', articles: [
        { slug: 'mobile-binding-and-email-verification-trials', title: '免费试用时手机号绑定与临时邮箱防护机制的利弊' },
        { slug: 'anti-abuse-device-fingerprint-in-trials', title: '机场防御多次领取的设备指纹与IP频次限制原理解析' },
        { slug: 'credit-card-free-trials-risk-assessment', title: '绑定信用卡开启免费试用时的自动续费扣款防范' }
      ]}
    ]
  },
  {
    sectionId: 'free', topicId: 'gifts', title: '注册赠送与活动流量',
    clusters: [
      { id: 'gift-types-credit', title: '赠送类型与到账', articles: [
        { slug: 'sign-up-bonus-traffic-collection-tips', title: '注册即送5G到100G流量的真实发放形式与提取流程' },
        { slug: 'daily-check-in-traffic-draw-rules', title: '每日签到赠送随机流量的算法机制与累积上限说明' },
        { slug: 'promotional-holiday-coupons-and-credits', title: '节日促销赠送金额抵扣券与免费流量包的兑换规范' }
      ]},
      { id: 'validity-rules', title: '赠送有效规则', articles: [
        { slug: 'bonus-traffic-expiration-and-reset', title: '注册赠送流量的有效期限制：次月清零与阶段性回收' },
        { slug: 'bonus-traffic-node-access-permissions', title: '赠送流量是否支持全量节点：限制中转与专线节点解读' },
        { slug: 'inactive-account-traffic-clawback-policy', title: '长期不活动用户赠送余额被系统回收的预防方法' }
      ]}
    ]
  },
  {
    sectionId: 'free', topicId: 'sources', title: '免费节点与订阅来源',
    clusters: [
      { id: 'resource-formats', title: '资源形态', articles: [
        { slug: 'clash-raw-yaml-free-sources-eval', title: 'GitHub上发布的Clash免费Raw订阅源的安全性与可用性' },
        { slug: 'base64-plain-text-free-node-lists', title: 'Base64编码单节点链接聚合列表的解析与去重技术' },
        { slug: 'telegram-channel-node-feed-risks', title: '电报频道每日分享节点文本的有效时限与混淆欺诈' }
      ]},
      { id: 'source-verification', title: '来源核验', articles: [
        { slug: 'how-to-verify-free-node-origin-servers', title: '如何通过IP归属地与ASN核验免费节点的真实托管服务商' },
        { slug: 'automated-node-harvesting-repo-filters', title: '识别自动化批量收割仓库中的失效节点与僵尸配置' },
        { slug: 'dns-hijacking-risks-in-public-subscriptions', title: '公开订阅链接中内置恶意DNS服务器地址的审查手段' }
      ]}
    ]
  },
  {
    sectionId: 'free', topicId: 'limits', title: '免费套餐流量与限速',
    clusters: [
      { id: 'quota-allocation', title: '流量额度', articles: [
        { slug: 'realistic-expectations-for-free-traffic', title: '免费流量额度真相：1GB与50GB实际能支撑哪些任务' },
        { slug: 'traffic-calculation-discrepancies-in-free', title: '免费节点流量计算倍率不透明导致的提早断网' },
        { slug: 'background-app-traffic-consumption-defense', title: '使用免费微小流量时如何关闭系统静默背景消耗' }
      ]},
      { id: 'speed-feature-caps', title: '速度与功能限制', articles: [
        { slug: 'free-tier-bandwidth-shaping-at-2mbps', title: '免费节点普遍存在的2Mbps限速机制及其对网页加载的影响' },
        { slug: 'udp-forwarding-disabled-on-free-nodes', title: '免费节点默认关闭UDP转发导致的通话与联机失效' },
        { slug: 'maximum-active-connections-cap-free', title: '免费套餐连接数限制在5到10个时的浏览器分页崩溃' }
      ]}
    ]
  },
  {
    sectionId: 'free', topicId: 'compatibility', title: '免费资源客户端适配',
    clusters: [
      { id: 'format-matching', title: '格式匹配', articles: [
        { slug: 'importing-raw-free-nodes-to-clash', title: '如何将散落的免费vmess://链接安全导入Clash客户端' },
        { slug: 'convert-free-sub-links-to-singbox-json', title: '免费订阅转换为sing-box配置时的语法报错规避' },
        { slug: 'v2rayn-clipboard-import-free-nodes', title: 'v2rayN从剪贴板批量导入上百个免费节点的清洗操作' }
      ]},
      { id: 'delivery-parsing', title: '获取与交付', articles: [
        { slug: 'third-party-subconverter-privacy-leaks', title: '借助第三方公开Subconverter转换免费订阅的安全风险' },
        { slug: 'local-python-script-free-sub-dedup', title: '使用本地轻量脚本去重并过滤不可达的免费节点' },
        { slug: 'offline-free-node-backup-in-client', title: '网络中断前在客户端本地留存可用免费节点的备份技巧' }
      ]}
    ]
  },
  {
    sectionId: 'free', topicId: 'use-cases', title: '免费方案适用场景',
    clusters: [
      { id: 'lightweight-tasks', title: '轻度任务', articles: [
        { slug: 'using-free-nodes-for-google-search-only', title: '仅用于Google查阅学术资料时免费节点的最小配置' },
        { slug: 'github-raw-download-acceleration-free', title: '利用免费节点加速GitHub代码克隆与Releases下载' },
        { slug: 'lightweight-messaging-tg-whatsapp-free', title: '收发即时文字通讯时免费节点的保活与网络消耗' }
      ]},
      { id: 'pre-purchase-testing', title: '购买前体验目标', articles: [
        { slug: 'using-free-trials-to-test-client-setup', title: '用免费试用跑通整套客户端流程后再做付费决策的步骤' },
        { slug: 'compare-isp-compatibility-using-trials', title: '在电信、联通与移动宽带下分别用免费节点测试连通' },
        { slug: 'identifying-device-bottlenecks-with-free', title: '通过免费测试排除路由器与网卡问题确保证明' }
      ]}
    ]
  },
  {
    sectionId: 'free', topicId: 'security', title: '免费资源隐私与安全',
    clusters: [
      { id: 'link-account-protection', title: '链接与账户保护', articles: [
        { slug: 'avoid-entering-personal-data-over-free-nodes', title: '为什么绝对不能通过免费公共节点进行在线支付与密码输入' },
        { slug: 'mitm-attack-risks-on-unverified-nodes', title: '公共未核验节点中间人篡改明文流量与证书劫持防范' },
        { slug: 'protecting-origin-ip-from-free-node-logs', title: '免费节点运营者抓取客户端真实连接IP的技术事实' }
      ]},
      { id: 'permission-trust-assessment', title: '权限与信任判断', articles: [
        { slug: 'never-install-root-ca-from-free-providers', title: '使用免费代理时严禁安装任何未知机构根证书的警示' },
        { slug: 'browser-webrtc-leak-protection-free', title: '在免费节点下开启浏览器WebRTC防护防止真实内网暴露' },
        { slug: 'evaluating-reputation-of-community-proxies', title: '评估开源社区公开发布者的信誉与安全历史' }
      ]}
    ]
  },
  {
    sectionId: 'free', topicId: 'account', title: '免费资格与账户管理',
    clusters: [
      { id: 'account-device-rules', title: '资格与设备规则', articles: [
        { slug: 'managing-single-device-limits-on-free', title: '免费账号仅允许单设备登录时的设备抢占排查' },
        { slug: 'preventing-accidental-ban-on-free-tiers', title: '防止免费账号触发滥用防御规则被封禁的注意事项' },
        { slug: 'password-hygiene-for-free-trial-portals', title: '注册免费试用网站时的独立密码管理与防关联建议' }
      ]},
      { id: 'cancellation-data-handling', title: '取消与资料处理', articles: [
        { slug: 'how-to-safely-delete-free-trial-accounts', title: '免费试用结束后注销账号并清除面板绑定的全流程' },
        { slug: 'revoking-telegram-bot-authorizations', title: '撤销与免费机场绑定的Telegram机器人通知授权' },
        { slug: 'cleaning-up-stale-free-sub-urls-in-apps', title: '在各客户端中彻底清理过期失效的免费订阅URL缓存' }
      ]}
    ]
  },
  {
    sectionId: 'free', topicId: 'alternatives', title: '资源失效与后续选择',
    clusters: [
      { id: 'failure-cause-breakdown', title: '失效原因分类', articles: [
        { slug: 'why-free-nodes-stop-working-suddenly', title: '免费节点大面积突然变红不可达的三大技术归因' },
        { slug: 'sni-blocking-and-ip-null-routing-free', title: '针对免费节点的SNI精准探测阻断与IP空路由现象' },
        { slug: 'identifying-server-side-traffic-exhaustion', title: '区分是自身客户端配置错误还是服务器端流量耗尽' }
      ]},
      { id: 'free-vs-paid-tradeoffs', title: '免费与付费取舍', articles: [
        { slug: 'the-true-time-cost-of-hunting-free-nodes', title: '每天寻找维护免费节点的时间成本与付费服务的性价比账本' },
        { slug: 'when-to-transition-from-free-to-budget-paid', title: '何时应该从免费方案平滑过渡到每月10元的轻量付费服务' },
        { slug: 'minimum-paid-tier-checklist-for-starters', title: '首个付费入门方案必须满足的五个基本参数' }
      ]}
    ]
  },

  // Section 3: clients
  {
    sectionId: 'clients', topicId: 'windows', title: 'Windows 客户端',
    clusters: [
      { id: 'package-types', title: '安装包形态', articles: [
        { slug: 'windows-installer-vs-portable-zip-guide', title: 'Windows代理客户端安装版与便携版怎么下载：文件形态与适用情况' },
        { slug: 'windows-x64-arm64-architecture-picker', title: 'Windows电脑该选x64、ARM64还是其他安装包：下载前核对方法' },
        { slug: 'setup-exe-with-runtime-vs-slim-packages', title: '客户端同时提供含运行库和精简包时，应该下载哪一个？' }
      ]},
      { id: 'system-support-matrix', title: '系统支持资料', articles: [
        { slug: 'windows-10-vs-windows-11-client-readiness', title: 'Windows 10与Windows 11各版本代理客户端驱动与内核兼容表' },
        { slug: 'windows-7-legacy-proxy-client-options', title: 'Windows 7与老旧系统上可继续运行的客户端版本归档' },
        { slug: 'wintun-driver-compatibility-on-windows', title: 'Wintun虚拟网卡驱动在不同Windows版本下的签名支持' }
      ]}
    ]
  },
  {
    sectionId: 'clients', topicId: 'android', title: 'Android 客户端',
    clusters: [
      { id: 'app-stores-apk-releases', title: '应用商店与发布包', articles: [
        { slug: 'google-play-vs-github-apk-differences', title: 'Google Play商店版与GitHub发布版APK功能差异核对' },
        { slug: 'identifying-fake-proxy-apps-on-playstore', title: '警惕应用商店中的套壳仿冒客户端：官方作者识别技巧' },
        { slug: 'downloading-standalone-apk-without-google', title: '无Google框架的国产Android手机安全下载独立APK指南' }
      ]},
      { id: 'versions-branches', title: '版本与分支', articles: [
        { slug: 'v2rayng-arm64-v8a-vs-universal-apk', title: 'v2rayNG下载该选arm64-v8a还是universal通用架构包' },
        { slug: 'clash-meta-android-release-channel-guide', title: 'Clash Meta for Android正式版与预发布版分支取舍' },
        { slug: 'hiddify-android-nightly-vs-stable-builds', title: 'Hiddify Android稳定版与Nightly构建包的稳定性对照' }
      ]}
    ]
  },
  {
    sectionId: 'clients', topicId: 'ios', title: 'iPhone 与 iPad 客户端',
    clusters: [
      { id: 'app-store-identity', title: '商店条目识别', articles: [
        { slug: 'shadowrocket-official-app-store-identifier', title: '认准正版Shadowrocket：官方开发者与App Store唯一识别码' },
        { slug: 'surge-loon-stash-quantumult-x-overview', title: 'iOS四大进阶网络工具Surge、Loon、Stash与QX身份核验' },
        { slug: 'singbox-ios-testflight-and-appstore-entry', title: 'sing-box在iOS平台的TestFlight公测与正式App Store入口' }
      ]},
      { id: 'distribution-purchase-history', title: '分发条件与购买记录', articles: [
        { slug: 'us-region-apple-id-client-download-guide', title: '非国区Apple ID下载客户端的安全流程与礼品卡充值须知' },
        { slug: 'shared-apple-id-security-risks-for-ios', title: '网上共享Apple ID下载小火箭导致设备被锁的风险与防范' },
        { slug: 'restoring-in-app-purchases-on-new-iphone', title: '换新iPhone后如何使用已购项目恢复已付费代理软件' }
      ]}
    ]
  },
  {
    sectionId: 'clients', topicId: 'macos', title: 'macOS 客户端',
    clusters: [
      { id: 'apple-silicon-intel-builds', title: '芯片与构建类型', articles: [
        { slug: 'apple-silicon-m-series-vs-intel-pkg-choice', title: 'M1/M2/M3 Apple Silicon与Intel芯片该下载哪个macOS包' },
        { slug: 'universal-binary-macos-proxy-performance', title: 'macOS通用二进制包与单架构原生构建的内存占用分析' },
        { slug: 'rosetta-translation-overhead-for-clients', title: '使用Rosetta转译运行老旧x64客户端的性能与续航损耗' }
      ]},
      { id: 'macos-signatures-gatekeeper', title: '系统与签名资料', articles: [
        { slug: 'bypass-macos-gatekeeper-unidentified-dev', title: 'macOS提示“无法打开因为无法验证开发者”的正规解法' },
        { slug: 'dmg-drag-install-vs-homebrew-cask-macos', title: 'DMG直接拖入Applications与Homebrew Cask安装的优劣' },
        { slug: 'system-network-extension-permissions-mac', title: 'macOS系统网络扩展授权与Helper工具安装官方指引' }
      ]}
    ]
  },
  {
    sectionId: 'clients', topicId: 'linux', title: 'Linux 客户端',
    clusters: [
      { id: 'distribution-packages', title: '发行包类型', articles: [
        { slug: 'linux-deb-rpm-appimage-tar-gz-picker', title: 'Ubuntu、Debian、Fedora该下载deb、rpm还是AppImage' },
        { slug: 'arch-linux-aur-proxy-client-maintenance', title: 'Arch Linux通过AUR安装维护Clash Verge与sing-box' },
        { slug: 'flatpak-snap-sandbox-limitations-proxy', title: 'Flatpak与Snap沙盒打包客户端在网络权限上的特殊限制' }
      ]},
      { id: 'repositories-maintenance', title: '软件源与维护', articles: [
        { slug: 'official-ppa-and-apt-repos-for-clients', title: '官方APT/YUM镜像源配置与签名公钥导入步骤' },
        { slug: 'headless-server-cli-core-download-guide', title: 'Linux无头服务器仅下载CLI独立核心的轻量化实践' },
        { slug: 'systemd-service-file-integration-for-linux', title: 'Linux下为代理核心手动编写systemd后台服务守护单元' }
      ]}
    ]
  },
  {
    sectionId: 'clients', topicId: 'routers', title: '软路由与网络设备客户端',
    clusters: [
      { id: 'firmware-hardware-matching', title: '固件与硬件匹配', articles: [
        { slug: 'openwrt-luci-app-openclash-ipk-download', title: 'OpenWrt固件下载OpenClash对应CPU架构IPK包指引' },
        { slug: 'passwall-ssr-plus-plugin-source-matching', title: 'PassWall与SSR-Plus插件安装包与依赖核心版本核对' },
        { slug: 'gl-inet-router-native-proxy-client-guide', title: 'GL.iNet便携路由器内置代理功能的固件更新与插件补充' }
      ]},
      { id: 'plugins-update-sources', title: '插件与更新来源', articles: [
        { slug: 'verifying-openwrt-plugin-github-releases', title: '如何在GitHub Releases安全核对路由器插件的MD5与SHA256' },
        { slug: 'offline-ipk-dependency-manual-install', title: '软路由断网环境下离线上传并安装核心依赖包' },
        { slug: 'asuswrt-merlin-koolshare-client-status', title: '华硕梅林固件软件中心相关代理插件的当前维护现状' }
      ]}
    ]
  },
  {
    sectionId: 'clients', topicId: 'clash-family', title: 'Clash 系软件下载资料',
    clusters: [
      { id: 'project-branch-identities', title: '项目与分支身份', articles: [
        { slug: 'clash-verge-rev-official-github-repo', title: '认准Clash Verge Rev唯一官方仓库与衍生分叉辨析' },
        { slug: 'clash-nyanpasu-features-and-download-entry', title: 'Clash Nyanpasu项目定位、特色UI与下载渠道说明' },
        { slug: 'flclash-cross-platform-releases-overview', title: 'FlClash基于Flutter的多平台统一客户端版本下载' }
      ]},
      { id: 'maintenance-status-history', title: '维护状态与历史', articles: [
        { slug: 'archived-clash-for-windows-safety-alert', title: '已归档停更的Clash for Windows历史版本安全风险提示' },
        { slug: 'clash-core-vs-mihomo-meta-kernel-lineage', title: '原版Clash Premium核心与开源Mihomo核心的谱系演进' },
        { slug: 'how-to-check-if-a-clash-fork-is-abandoned', title: '通过提交记录和Issue响应判断某个Clash分支是否弃坑' }
      ]}
    ]
  },
  {
    sectionId: 'clients', topicId: 'xray-family', title: 'v2rayN 与 Xray 客户端资料',
    clusters: [
      { id: 'client-release-artifacts', title: '客户端发布文件', articles: [
        { slug: 'v2rayn-with-core-vs-without-core-zip', title: 'v2rayN发布页With-Core与普通Zip包的区别与下载选择' },
        { slug: 'v2rayng-apk-github-assets-explained', title: 'v2rayNG GitHub Releases列表中各APK包命名后缀详解' },
        { slug: 'nekoray-nekobox-releases-archive-status', title: 'NekoRay与NekoBox项目现状及跨平台归档版本获取' }
      ]},
      { id: 'bundled-external-cores', title: '内置与外置核心', articles: [
        { slug: 'xray-core-official-releases-and-download', title: 'Xray-core官方二进制文件的下载与版本匹配原则' },
        { slug: 'manually-updating-xray-core-in-v2rayn', title: '如何在v2rayN根目录手动替换并升级最新版Xray核心' },
        { slug: 'geoip-dat-and-geosite-dat-database-update', title: '独立下载更新GeoIP.dat与GeoSite.dat路由规则数据库' }
      ]}
    ]
  },
  {
    sectionId: 'clients', topicId: 'singbox-family', title: 'sing-box 与跨平台软件资料',
    clusters: [
      { id: 'core-vs-client-boundaries', title: '项目与客户端边界', articles: [
        { slug: 'singbox-core-cli-vs-gui-client-downloads', title: 'sing-box独立命令行核心与带UI图形界面的下载区分' },
        { slug: 'hiddify-app-releases-multi-platform-matrix', title: 'Hiddify跨平台客户端在各操作系统的正式下载渠道' },
        { slug: 'karing-multi-protocol-client-official-source', title: 'Karing多协议客户端项目背景与官方分发地址核验' }
      ]},
      { id: 'build-coverage-notes', title: '构建覆盖与说明', articles: [
        { slug: 'singbox-tags-and-experimental-features-build', title: 'sing-box包含with_gvisor与with_quic的特殊编译版本' },
        { slug: 'hiddify-desktop-standalone-vs-store-versions', title: 'Hiddify桌面独立安装包与微软应用商店版本的优劣' },
        { slug: 'identifying-nightly-pre-releases-in-singbox', title: '在sing-box发布列表中避开开发测试包选择稳定版' }
      ]}
    ]
  },
  {
    sectionId: 'clients', topicId: 'download-safety', title: '安全下载与版本留档',
    clusters: [
      { id: 'signatures-checksum-verification', title: '签名与校验', articles: [
        { slug: 'verify-client-sha256-checksum-windows-mac', title: '在Windows和Mac终端上校验下载文件的SHA256哈希值' },
        { slug: 'gpg-signature-verification-for-linux-proxy', title: '使用GPG密钥验证Linux代理软件发布包的完整性' },
        { slug: 'detecting-trojan-infected-proxy-installers', title: '识别带有后门与键盘记录器的虚假代理安装包特征' }
      ]},
      { id: 'archival-history-retrieval', title: '历史版本与归档', articles: [
        { slug: 'downloading-archived-releases-when-repo-deleted', title: '开源仓库被封或删除后从官方镜像归档安全下载的方法' },
        { slug: 'wayback-machine-and-github-archive-usage', title: '利用Wayback Machine核查软件发布历史与官方域名变迁' },
        { slug: 'maintaining-local-known-good-installer-vault', title: '在本地构建个人受信代理客户端已知良好版本备份库' }
      ]}
    ]
  },

  // Section 4: install
  {
    sectionId: 'install', topicId: 'verge-rev', title: 'Clash Verge Rev 安装',
    clusters: [
      { id: 'install-first-launch', title: '安装与首次启动', articles: [
        { slug: 'clash-verge-rev-windows-setup-walkthrough', title: 'Clash Verge Rev在Windows 11上的安装与首次启动教程' },
        { slug: 'clash-verge-rev-macos-dmg-install-guide', title: 'Clash Verge Rev在macOS上的安装与辅助功能权限授予' },
        { slug: 'clash-verge-rev-first-run-language-and-kernel', title: '首次运行Clash Verge Rev切换中文界面与核对Mihomo核心' }
      ]},
      { id: 'service-mode-exit', title: '后台服务与退出', articles: [
        { slug: 'install-verge-service-mode-for-tun', title: '安装Clash Verge服务模式(Service Mode)以启用TUN虚拟网卡' },
        { slug: 'clash-verge-rev-auto-start-on-boot-config', title: '配置开机无感静默自启与最小化到系统托盘' },
        { slug: 'clean-exit-and-system-proxy-reset-verge', title: '彻底退出Clash Verge Rev并自动恢复Windows系统代理' }
      ]}
    ]
  },
  {
    sectionId: 'install', topicId: 'v2rayn', title: 'v2rayN 安装',
    clusters: [
      { id: 'extract-runtime-setup', title: '解压与运行环境', articles: [
        { slug: 'v2rayn-extract-and-folder-permissions', title: 'v2rayN解压路径选择：避开中文目录与系统C盘权限坑' },
        { slug: 'dotnet-desktop-runtime-install-for-v2rayn', title: '安装v2rayN必备的Microsoft .NET 8 Desktop Runtime' },
        { slug: 'v2rayn-initial-settings-and-tray-icon', title: 'v2rayN初次启动托盘图标变色逻辑与主界面基础布局' }
      ]},
      { id: 'core-startup-verification', title: '核心启动与基础验收', articles: [
        { slug: 'v2rayn-select-default-core-xray-vs-singbox', title: '在v2rayN中选定默认运行核心：Xray与sing-box的切换' },
        { slug: 'verifying-v2rayn-core-listen-ports', title: '检查v2rayN核心是否正常监听10808与10809本地端口' },
        { slug: 'v2rayn-first-start-firewall-prompt-handling', title: '处理Windows Defender安全中心首次弹出的防火墙网络许可' }
      ]}
    ]
  },
  {
    sectionId: 'install', topicId: 'v2rayng', title: 'v2rayNG 安装',
    clusters: [
      { id: 'apk-app-init', title: '安装包与应用初始化', articles: [
        { slug: 'v2rayng-sideload-install-on-android', title: 'Android手机侧载安装v2rayNG APK安装包图文流程' },
        { slug: 'v2rayng-first-open-ui-and-language-setup', title: 'v2rayNG首次打开设置默认界面语言与分流策略' },
        { slug: 'v2rayng-storage-permission-for-config-export', title: '授予外部存储与媒体读写权限以支持本地配置导出' }
      ]},
      { id: 'vpn-permission-background', title: 'VPN 授权与后台', articles: [
        { slug: 'android-vpn-profile-authorization-prompt', title: '确认系统级VPN连接请求对话框与密钥图标显示' },
        { slug: 'disable-battery-optimization-for-v2rayng', title: '在华为、小米、OPPO手机上关闭电池优化防止后台被杀' },
        { slug: 'v2rayng-notification-toggle-and-quick-settings', title: '开启常驻通知栏控制开关与Android下拉快捷磁贴配置' }
      ]}
    ]
  },
  {
    sectionId: 'install', topicId: 'shadowrocket', title: 'Shadowrocket 安装',
    clusters: [
      { id: 'app-store-get-first-run', title: '商店获取与首启', articles: [
        { slug: 'installing-shadowrocket-from-us-app-store', title: '从美区App Store检索、购买并下载Shadowrocket完整步骤' },
        { slug: 'shadowrocket-initial-interface-breakdown', title: 'Shadowrocket初次启动主界面：节点、配置与感叹号状态' },
        { slug: 'updating-shadowrocket-without-losing-profiles', title: '后续更新Shadowrocket版本时保留原有节点与规则的技巧' }
      ]},
      { id: 'system-permissions-restore', title: '系统授权与恢复', articles: [
        { slug: 'shadowrocket-add-vpn-configurations-allow', title: 'iOS系统提示“添加VPN配置”时的Face ID认证与通过' },
        { slug: 'install-mitm-root-certificate-in-shadowrocket', title: '按需安装与信任本地HTTPS解密根证书的安全流程' },
        { slug: 'icloud-backup-and-sync-for-shadowrocket', title: '开启iCloud云盘同步在多台iPad与iPhone间共享节点' }
      ]}
    ]
  },
  {
    sectionId: 'install', topicId: 'flclash', title: 'FlClash 安装',
    clusters: [
      { id: 'desktop-install-workflow', title: '桌面安装流程', articles: [
        { slug: 'flclash-windows-installation-and-setup', title: 'FlClash在Windows系统的安装步骤与Flutter环境要求' },
        { slug: 'flclash-macos-installation-and-arm64-support', title: 'FlClash在Mac平台安装与原生Apple Silicon支持验证' },
        { slug: 'flclash-linux-appimage-run-permissions', title: 'Linux下赋予FlClash AppImage执行权限并创建桌面快捷入口' }
      ]},
      { id: 'mobile-install-permissions', title: '移动安装与授权', articles: [
        { slug: 'flclash-android-installation-and-vpn-setup', title: 'FlClash Android客户端安装与Material You界面初始化' },
        { slug: 'flclash-ios-testflight-installation-notes', title: 'FlClash iOS公测版本安装与网络扩展授权说明' },
        { slug: 'flclash-cross-device-ui-consistency-check', title: '核对FlClash在各端统一的策略组管理与核心版本' }
      ]}
    ]
  },
  {
    sectionId: 'install', topicId: 'hiddify', title: 'Hiddify 安装',
    clusters: [
      { id: 'first-install-initialization', title: '首次安装和初始化', articles: [
        { slug: 'hiddify-windows-setup-and-first-launch', title: 'Hiddify在Windows 10/11系统的安装与首次运行' },
        { slug: 'hiddify-android-apk-install-and-defaults', title: 'Hiddify Android端安装与原生中文语言包设置' },
        { slug: 'hiddify-macos-installation-and-security-prompt', title: 'Hiddify macOS端安装包安全权限解锁与核心初始化' }
      ]},
      { id: 'system-integration-uninstall', title: '系统集成与卸载', articles: [
        { slug: 'hiddify-system-proxy-and-tun-service-setup', title: '在Hiddify中一键开启系统代理与TUN虚拟网卡驱动' },
        { slug: 'hiddify-auto-startup-and-minimize-to-tray', title: '配置Hiddify开机自启动与最小化至系统托盘工作模式' },
        { slug: 'clean-uninstall-hiddify-and-remove-adapters', title: '彻底卸载Hiddify并清除残留虚拟网卡与网络配置' }
      ]}
    ]
  },
  {
    sectionId: 'install', topicId: 'singbox', title: 'sing-box 安装',
    clusters: [
      { id: 'cli-core-init', title: '命令行核心初始化', articles: [
        { slug: 'singbox-cli-binary-install-on-windows', title: 'Windows通过PowerShell解压配置sing-box命令行核心' },
        { slug: 'singbox-cli-install-on-linux-systemd', title: 'Linux服务器解压sing-box二进制并配置systemd自启动服务' },
        { slug: 'singbox-cli-install-on-macos-terminal', title: 'macOS终端安装配置独立sing-box核心并测试运行' }
      ]},
      { id: 'gui-client-init', title: '图形客户端初始化', articles: [
        { slug: 'singbox-for-windows-gui-installation', title: 'sing-box官方Windows图形客户端安装与网络驱动部署' },
        { slug: 'singbox-for-android-google-play-and-apk', title: 'sing-box Android客户端安装与基础连接参数配置' },
        { slug: 'singbox-for-apple-platforms-setup', title: 'sing-box在iOS与macOS独立App的安装与核心版本核验' }
      ]}
    ]
  },
  {
    sectionId: 'install', topicId: 'prerequisites', title: '系统依赖与安装准备',
    clusters: [
      { id: 'desktop-environment-check', title: '桌面系统检查', articles: [
        { slug: 'check-windows-system-architecture-and-build', title: '安装前检查Windows系统版本号、补丁与CPU架构' },
        { slug: 'check-visual-c-redistributables-windows', title: '安装并修复Microsoft Visual C++ 2015-2022运行库' },
        { slug: 'check-macos-security-and-sip-status', title: '核对macOS系统完整性保护(SIP)与第三方网络扩展支持' }
      ]},
      { id: 'isolation-resource-prep', title: '环境隔离与资源准备', articles: [
        { slug: 'uninstall-legacy-clash-and-conflicting-proxies', title: '安装新客户端前彻底清理老旧Clash或多余代理工具' },
        { slug: 'configure-antivirus-exclusions-for-proxy-cores', title: '在杀毒软件与火绒中为代理核心目录设置信任白名单' },
        { slug: 'free-up-local-ports-7890-10808-before-install', title: '安装前检查并释放常见的本地7890与10808代理端口' }
      ]}
    ]
  },
  {
    sectionId: 'install', topicId: 'gateways', title: 'Linux 服务与软路由部署',
    clusters: [
      { id: 'service-daemon-management', title: '服务与启动管理', articles: [
        { slug: 'deploy-mihomo-meta-service-on-linux', title: '在Ubuntu/Debian服务器上部署Mihomo核心并配置Daemon' },
        { slug: 'configure-systemd-service-auto-restart', title: '编写systemd守护脚本实现代理进程异常退出后自动拉起' },
        { slug: 'linux-cap-net-bind-service-privileges', title: '配置setcap赋予代理核心无root绑定低位特权端口权限' }
      ]},
      { id: 'gateway-install-recovery', title: '网关安装与恢复', articles: [
        { slug: 'openclash-ipk-manual-install-via-ssh', title: '通过SSH连接软路由手动安装OpenClash核心与UI界面' },
        { slug: 'passwall-installation-and-dependencies-fix', title: 'PassWall插件安装与缺失iptables/nftables依赖修复' },
        { slug: 'recover-bricked-router-after-proxy-install-crash', title: '软路由安装代理插件导致网络中断时的救援与回退流程' }
      ]}
    ]
  },
  {
    sectionId: 'install', topicId: 'lifecycle', title: '升级、迁移与卸载',
    clusters: [
      { id: 'upgrade-rollback', title: '升级与回退', articles: [
        { slug: 'how-to-safely-upgrade-clash-verge-rev', title: 'Clash Verge Rev版本无损平滑升级步骤与配置迁移' },
        { slug: 'rollback-to-previous-client-version-safely', title: '新版本出现重大Bug时如何安全回退至上一稳定版本' },
        { slug: 'exporting-and-importing-client-settings-backup', title: '跨设备更换电脑时完整备份与迁移客户端本地自定义配置' }
      ]},
      { id: 'clean-reinstall-purge', title: '干净重装与退出', articles: [
        { slug: 'deep-clean-uninstall-windows-proxy-clients', title: '在Windows下彻底卸载代理客户端并清除AppData残留数据' },
        { slug: 'purge-macos-library-application-support-files', title: '在macOS下彻底清理~/Library中残留的代理配置与缓存' },
        { slug: 'emergency-reset-system-proxy-settings-registry', title: '客户端意外卸载后修复系统注册表残留代理重获网络' }
      ]}
    ]
  },

  // Section 5: subscription
  {
    sectionId: 'subscription', topicId: 'links', title: '订阅链接与导入入口',
    clusters: [
      { id: 'link-types-retrieval', title: '链接获取与类型', articles: [
        { slug: 'understanding-different-subscription-url-formats', title: '订阅链接格式详解：区分Clash YAML、Base64与sing-box JSON' },
        { slug: 'how-to-copy-sub-link-from-airport-dashboard', title: '如何在机场用户中心正确复制对应客户端的专用订阅链接' },
        { slug: 'one-click-import-vs-manual-url-copy', title: '一键导入客户端与手动复制粘贴订阅URL的原理与排错' }
      ]},
      { id: 'credentials-scope-audit', title: '凭据与访问范围', articles: [
        { slug: 'how-to-audit-token-and-user-info-in-sub-url', title: '解析订阅URL中的Token与用户信息：防范泄露与盗刷' },
        { slug: 'resetting-compromised-subscription-tokens', title: '订阅链接不慎泄露后如何在机场面板重置Token并更新' },
        { slug: 'userinfo-header-and-traffic-display-in-clients', title: '解析订阅响应头Subscription-Userinfo并展示剩余流量' }
      ]}
    ]
  },
  {
    sectionId: 'subscription', topicId: 'clash-yaml', title: 'Clash YAML 配置',
    clusters: [
      { id: 'yaml-structure-references', title: '配置结构与引用', articles: [
        { slug: 'how-to-read-clash-yaml-proxies-groups-rules', title: 'Clash YAML怎么读：节点、策略组、规则与外部资源的关系' },
        { slug: 'mihomo-proxy-providers-and-rule-providers', title: 'Mihomo的proxy-providers如何与策略组关联：配置阅读示例' },
        { slug: 'minimal-verifiable-clash-config-setup', title: '怎样制作最小可验证的Clash配置，而不是一次导入整套复杂规则？' }
      ]},
      { id: 'parsers-profile-mixins', title: '覆盖与增强', articles: [
        { slug: 'writing-parsers-in-clash-verge-rev', title: '在Clash Verge Rev中编写扩展配置(Script/Merge)动态插入节点' },
        { slug: 'overriding-default-dns-settings-in-yaml', title: '通过配置覆盖功能强行修改机场订阅中的默认DNS设置' },
        { slug: 'clash-profile-mixin-advanced-customization', title: '利用Mixin机制为所有外部订阅统一附加本地直连规则' }
      ]}
    ]
  },
  {
    sectionId: 'subscription', topicId: 'node-uris', title: 'VLESS、VMess 与 Trojan 节点',
    clusters: [
      { id: 'uri-field-breakdown', title: '节点链接字段', articles: [
        { slug: 'decoding-vless-node-uri-parameters', title: '拆解VLESS节点链接：UUID、Server、Port与Flow字段含义' },
        { slug: 'decoding-vmess-base64-json-structure', title: '解码VMess Base64字符串：内部JSON各键值对详细解析' },
        { slug: 'trojan-node-uri-password-and-sni-fields', title: 'Trojan节点链接解析：密码、SNI域名与传输安全配置' }
      ]},
      { id: 'transport-tls-combos', title: '传输与安全组合', articles: [
        { slug: 'vless-xtls-reality-transport-parameters', title: 'VLESS+Reality组合参数解析：公钥、ShortId与蜘蛛域名' },
        { slug: 'hysteria2-and-tuic-udp-protocol-uri-guide', title: 'Hysteria 2与TUIC高吞吐协议节点链接的字段格式' },
        { slug: 'websocket-grpc-cdn-transport-layer-configs', title: 'WebSocket与gRPC配合CDN中转时的Host与Path设置' }
      ]}
    ]
  },
  {
    sectionId: 'subscription', topicId: 'singbox-json', title: 'sing-box JSON 配置',
    clusters: [
      { id: 'json-objects-hierarchy', title: '对象与结构', articles: [
        { slug: 'singbox-json-config-inbounds-outbounds-route', title: 'sing-box JSON核心结构拆解：inbounds、outbounds与route' },
        { slug: 'understanding-singbox-selector-and-urltest', title: 'sing-box中selector策略组与urltest自动优选编写方法' },
        { slug: 'singbox-dns-independent-object-configuration', title: 'sing-box独立DNS路由对象与规则匹配机制深度解析' }
      ]},
      { id: 'version-migration-splitting', title: '版本迁移与拆分', articles: [
        { slug: 'migrating-singbox-config-from-1-8-to-1-10', title: '从sing-box 1.8平滑升级到1.10+：语法变动与破坏性修复' },
        { slug: 'splitting-large-singbox-json-into-modular-files', title: '将大型sing-box配置拆分为按功能模块化引用的JSON片段' },
        { slug: 'compiling-srs-rule-sets-from-json-rules', title: '从标准JSON规则列表编译为sing-box专用二进制.srs规则集' }
      ]}
    ]
  },
  {
    sectionId: 'subscription', topicId: 'conversion', title: '订阅转换与兼容性',
    clusters: [
      { id: 'conversion-capability-bounds', title: '转换能力边界', articles: [
        { slug: 'subconverter-capabilities-and-protocol-loss', title: '订阅转换器的能力边界：哪些新协议在转换中会被丢失或降级' },
        { slug: 'why-not-all-clash-rules-convert-to-singbox', title: '为什么Clash复杂的策略组无法百分之百无损转为sing-box' },
        { slug: 'identifying-broken-node-configs-after-conversion', title: '排查订阅转换后节点无法连接的参数缺失与编码乱码' }
      ]},
      { id: 'safe-conversion-workflow', title: '安全转换流程', articles: [
        { slug: 'setting-up-local-subconverter-docker-service', title: '使用Docker在本地搭建私有订阅转换后端彻底隔离泄露' },
        { slug: 'sub-web-frontend-custom-rule-injection', title: '在Sub-Web前端中注入自定义免翻规则与远程规则集' },
        { slug: 'auditing-public-subconverter-server-trust', title: '审查公开订阅转换站点服务条款与网络传输抓包分析' }
      ]}
    ]
  },
  {
    sectionId: 'subscription', topicId: 'updates', title: '订阅更新与多源管理',
    clusters: [
      { id: 'update-cadence-caching', title: '更新策略与缓存', articles: [
        { slug: 'configuring-auto-update-interval-in-clients', title: '在客户端合理配置订阅自动更新周期避免被机场限流' },
        { slug: 'clearing-subscription-cache-when-nodes-stale', title: '节点大面积变动时手动清除本地订阅缓存强制拉取' },
        { slug: 'handling-client-update-failure-due-to-stale-ip', title: '解决因本地DNS缓存陈旧导致的订阅更新请求超时' }
      ]},
      { id: 'multi-provider-merge', title: '多机场与合并', articles: [
        { slug: 'combining-multiple-airports-into-one-clash-profile', title: '如何将两家不同机场的订阅合并为一个Clash配置文件' },
        { slug: 'setting-up-failover-policy-between-two-providers', title: '在策略组中设置主备机场自动故障转移(Fallback)' },
        { slug: 'tagging-and-prefixing-nodes-from-different-subs', title: '为不同来源的节点批量添加前缀标签便于管理与识别' }
      ]}
    ]
  },
  {
    sectionId: 'subscription', topicId: 'rules', title: '规则分流与策略组',
    clusters: [
      { id: 'rule-matching-precedence', title: '规则匹配与顺序', articles: [
        { slug: 'rule-order-matters-top-to-bottom-precedence', title: '规则匹配的自上而下顺序原理：为什么直连规则要靠前' },
        { slug: 'domain-suffix-vs-domain-keyword-matching', title: 'DOMAIN-SUFFIX与DOMAIN-KEYWORD的使用场景与性能对比' },
        { slug: 'geoip-cn-and-geosite-cn-direct-routing', title: '利用GeoIP:CN与GeoSite:CN实现国内流量绝对直连' }
      ]},
      { id: 'policy-groups-health-check', title: '策略组与健康检查', articles: [
        { slug: 'configuring-url-test-auto-selection-group', title: '配置URL-Test自动优选策略组：容差参数与检测间隔' },
        { slug: 'customizing-proxy-groups-for-media-and-ai', title: '为流媒体、OpenAI与普通网页分别创建专属分流策略组' },
        { slug: 'load-balance-round-robin-vs-consistent-hash', title: '负载均衡策略组Round-Robin轮询与一致性哈希的选择' }
      ]}
    ]
  },
  {
    sectionId: 'subscription', topicId: 'dns', title: 'DNS 配置与解析策略',
    clusters: [
      { id: 'resolution-chain-selection', title: '解析链与选择', articles: [
        { slug: 'clash-dns-nameserver-vs-fallback-chain', title: 'Clash DNS配置详解：nameserver与fallback的分流逻辑' },
        { slug: 'doh-dot-encrypted-dns-setup-in-clients', title: '在客户端中配置DoH与DoT加密DNS防止运营商劫持' },
        { slug: 'default-nameserver-bootstrap-resolution', title: 'default-nameserver引导DNS的作用与必须使用纯IP的原因' }
      ]},
      { id: 'routing-address-resolution', title: '分流与地址结果', articles: [
        { slug: 'understanding-fake-ip-pool-mechanics', title: 'Fake-IP模式原理：198.18.0.0/16虚拟IP池如何提升响应速度' },
        { slug: 'fake-ip-filter-tuning-for-local-apps', title: '配置fake-ip-filter避开网易云音乐、局域网与联机游戏' },
        { slug: 'redir-host-vs-fake-ip-in-modern-clients', title: 'Redir-Host已被淘汰：为什么所有主流客户端转向Fake-IP' }
      ]}
    ]
  },
  {
    sectionId: 'subscription', topicId: 'tun', title: 'TUN 与系统代理',
    clusters: [
      { id: 'tun-modes-permissions', title: '模式与权限', articles: [
        { slug: 'how-tun-mode-captures-all-system-traffic', title: 'TUN模式工作原理：虚拟网卡如何截获不遵守代理的应用流量' },
        { slug: 'system-proxy-vs-tun-mode-feature-comparison', title: '系统代理模式与TUN虚拟网卡模式适用场景深度对比' },
        { slug: 'enabling-tun-mode-requires-admin-elevation', title: '为什么开启TUN模式必须要求管理员权限提升与驱动支持' }
      ]},
      { id: 'routing-table-restore', title: '路由与恢复', articles: [
        { slug: 'inspecting-windows-routing-table-under-tun', title: '查看并解析开启TUN模式后Windows路由表的0.0.0.0重定向' },
        { slug: 'strict-route-and-endpoint-independent-nat', title: '开启strict-route严格路由防止UDP数据包在TUN下泄露' },
        { slug: 'restoring-default-gateway-after-tun-crash', title: 'TUN模式异常崩溃后恢复电脑默认网关路由表的方法' }
      ]}
    ]
  },
  {
    sectionId: 'subscription', topicId: 'integration', title: '应用接入与多设备配置',
    clusters: [
      { id: 'browser-terminal-ide-setup', title: '浏览器、终端与开发工具', articles: [
        { slug: 'setting-up-http-proxy-in-chrome-edge', title: '在Chrome与Edge中配合SwitchyOmega插件接入本地代理端口' },
        { slug: 'configuring-proxy-in-terminal-powershell-git', title: '在PowerShell、CMD与Git Bash中配置HTTP/HTTPS/ALL_PROXY' },
        { slug: 'configuring-proxy-in-vscode-and-cursor', title: '在VS Code与Cursor开发环境中设置代理拉取插件与模型' }
      ]},
      { id: 'backup-sync-access-control', title: '备份同步与访问控制', articles: [
        { slug: 'allowing-lan-connections-to-share-proxy', title: '开启Allow-LAN局域网共享：让同一WiFi下的手机使用电脑代理' },
        { slug: 'protecting-lan-proxy-with-authentication', title: '为局域网代理共享设置身份认证账号密码防止蹭网' },
        { slug: 'syncing-profiles-via-git-or-webdav', title: '使用私有Git仓库或WebDAV在多台工作机之间无感同步配置' }
      ]}
    ]
  },

  // Section 6: troubleshooting
  {
    sectionId: 'troubleshooting', topicId: 'startup', title: '客户端启动失败',
    clusters: [
      { id: 'process-exit-startup', title: '启动与进程', articles: [
        { slug: 'troubleshoot-clash-verge-rev-silent-exit', title: 'Clash Verge Rev点击后托盘无图标且进程静默退出的排查' },
        { slug: 'troubleshoot-v2rayn-crash-on-splash-screen', title: 'v2rayN启动报错“应用程序发生未处理的异常”修复' },
        { slug: 'troubleshoot-client-app-blocked-by-smartscreen', title: 'Windows Defender SmartScreen拦截客户端启动的解除' }
      ]},
      { id: 'port-conflicts-instances', title: '端口与多实例', articles: [
        { slug: 'port-7890-already-in-use-diagnosis-and-fix', title: '报错“bind: address already in use: 7890”端口占用诊断' },
        { slug: 'detecting-hidden-zombie-proxy-core-processes', title: '通过任务管理器排查并在后台终止僵尸状态的代理核心进程' },
        { slug: 'changing-default-mixed-port-to-avoid-conflict', title: '在配置文件中修改混合端口(mixed-port)彻底解决端口冲突' }
      ]}
    ]
  },
  {
    sectionId: 'troubleshooting', topicId: 'installation-errors', title: '安装、升级与权限错误',
    clusters: [
      { id: 'package-dependency-errors', title: '安装包与依赖', articles: [
        { slug: 'fix-missing-vcruntime140-dll-error', title: '启动提示缺少VCRUNTIME140.dll或MSVCP140.dll的修复方案' },
        { slug: 'fix-windows-installer-service-unavailable', title: 'Windows Installer服务无法访问导致安装包安装失败处理' },
        { slug: 'troubleshoot-corrupted-download-hash-mismatch', title: '下载安装包提示“文件已损坏”或解压CRC校验失败排错' }
      ]},
      { id: 'post-upgrade-regressions', title: '升级后回归问题', articles: [
        { slug: 'fix-client-blank-white-screen-after-upgrade', title: '客户端版本升级后界面出现白屏或无限加载排查' },
        { slug: 'fixing-config-schema-mismatch-after-core-update', title: '核心升级后报错“unmarshal configuration failed”语法不兼容' },
        { slug: 're-registering-tun-virtual-adapter-after-update', title: '客户端更新后TUN虚拟网卡丢失或无法启用的重新注册步骤' }
      ]}
    ]
  },
  {
    sectionId: 'troubleshooting', topicId: 'subscription-fetch', title: '订阅更新失败',
    clusters: [
      { id: 'network-request-failures', title: '请求与网络', articles: [
        { slug: 'troubleshoot-subscription-timeout-connection-refused', title: '订阅更新提示“connect: connection refused”或超时排查' },
        { slug: 'subscription-fails-when-proxy-is-off-bootstrap-loop', title: '未开代理无法更新订阅，开代理后节点失效的死锁破解' },
        { slug: 'dns-lookup-failure-for-subscription-domain', title: '订阅域名无法解析(no such host)时本地Host强制绑定' }
      ]},
      { id: 'http-status-client-divergence', title: '状态码与客户端差异', articles: [
        { slug: 'subscription-update-http-401-403-forbidden', title: '订阅更新返回HTTP 401或403错误：Token失效与账户过期' },
        { slug: 'subscription-update-http-502-504-bad-gateway', title: '订阅更新返回HTTP 502/504：机场服务端维护判断方法' },
        { slug: 'updating-works-in-browser-fails-in-client', title: '浏览器打开订阅链接正常但在客户端中拉取失败的原因' }
      ]}
    ]
  },
  {
    sectionId: 'troubleshooting', topicId: 'parsing', title: '订阅解析与导入错误',
    clusters: [
      { id: 'structure-encoding-errors', title: '结构与编码', articles: [
        { slug: 'fix-yaml-syntax-error-mapping-values-not-allowed', title: '报错“yaml: line X: mapping values are not allowed”格式修复' },
        { slug: 'handling-illegal-base64-character-errors', title: '导入Base64订阅提示“illegal base64 data at input”清洗' },
        { slug: 'subscription-returns-html-login-page-instead-of-config', title: '订阅拉取到的内容是HTML登录页面而非配置文件的排错' }
      ]},
      { id: 'field-schema-mismatch', title: '字段与版本', articles: [
        { slug: 'fixing-unsupported-proxy-type-error', title: '客户端报错“unsupported proxy type: hysteria2”核心版本过旧' },
        { slug: 'resolving-duplicate-proxy-name-conflicts', title: '配置中存在同名节点导致“proxy duplicated: 香港01”报错修复' },
        { slug: 'missing-cipher-or-password-field-in-node', title: '节点配置缺失cipher加密方式或password密码的补全办法' }
      ]}
    ]
  },
  {
    sectionId: 'troubleshooting', topicId: 'timeout', title: '节点超时与认证失败',
    clusters: [
      { id: 'server-unreachable-timeout', title: '目标可达性', articles: [
        { slug: 'troubleshoot-all-nodes-timeout-in-speed-test', title: '客户端批量延迟测速全红全超时(Timeout)的紧急检查清单' },
        { slug: 'ping-works-but-tcp-ping-fails-on-proxy-node', title: 'ICMP Ping通但TCP Ping超时：解析端口被封与服务器封锁' },
        { slug: 'testing-node-reachability-using-powershell-tcping', title: '使用PowerShell或tcping工具独立排查节点服务器端口连通性' }
      ]},
      { id: 'auth-tls-handshake-failure', title: '认证与握手', articles: [
        { slug: 'fixing-tls-handshake-timeout-or-cert-invalid', title: '报错“tls: handshake timeout”或证书不受信任的原因与修复' },
        { slug: 'troubleshoot-system-clock-skew-causing-tls-failure', title: '本地电脑系统时间不准引起TLS握手认证失败的校准方法' },
        { slug: 'vless-reality-auth-failed-shortid-mismatch', title: 'VLESS Reality节点连接失败提示认证错误与公钥不匹配核对' }
      ]}
    ]
  },
  {
    sectionId: 'troubleshooting', topicId: 'no-internet', title: '已连接但无法上网',
    clusters: [
      { id: 'traffic-proxy-bypass-check', title: '请求是否经过代理', articles: [
        { slug: 'connected-to-proxy-but-no-internet-checklist', title: '已连接节点但浏览器提示“无法访问此网站”核心诊断树' },
        { slug: 'checking-windows-system-proxy-toggle-switch', title: '检查Windows“设置-网络-代理”开关是否被其他应用强制关闭' },
        { slug: 'direct-mode-selected-accidentally-in-tray', title: '排查托盘菜单是否误选了Direct直连模式导致所有请求未代理' }
      ]},
      { id: 'local-access-disconnect-recovery', title: '本地访问与断开恢复', articles: [
        { slug: 'foreign-sites-work-domestic-sites-broken', title: '国外网站正常打开但国内微信、百度无法访问的分流修复' },
        { slug: 'turn-off-proxy-and-lose-internet-completely', title: '关闭代理客户端后整台电脑彻底无法上网的紧急恢复指南' },
        { slug: 'lan-network-shared-printer-unreachable-under-proxy', title: '开启代理后局域网共享打印机和NAS无法访问的白名单设置' }
      ]}
    ]
  },
  {
    sectionId: 'troubleshooting', topicId: 'dns-errors', title: 'DNS 解析异常',
    clusters: [
      { id: 'resolution-failure-poisoning', title: '解析失败与缓存', articles: [
        { slug: 'dns-probe-finished-nxdomain-error-fix', title: '浏览器频繁提示DNS_PROBE_FINISHED_NXDOMAIN的排错流程' },
        { slug: 'flushing-dns-cache-in-windows-and-browsers', title: '在Windows终端与Chrome浏览器中彻底清空DNS解析缓存' },
        { slug: 'detecting-dns-hijacking-by-local-broadband-isp', title: '判断本地宽带运营商是否劫持了标准UDP 53端口DNS请求' }
      ]},
      { id: 'dns-routing-fakeip-leaks', title: '分流与 Fake-IP', articles: [
        { slug: 'fixing-dns-leaks-when-accessing-sensitive-sites', title: '访问测试网站发现DNS泄露为本地运营商IP的防护设置' },
        { slug: 'fake-ip-pool-exhaustion-and-stale-mapping', title: '长时间运行后Fake-IP池溢出与映射未及时清理的重置方法' },
        { slug: 'router-dnsmasq-conflict-with-client-fakeip', title: '软路由上dnsmasq与客户端Fake-IP冲突导致内网无法解析' }
      ]}
    ]
  },
  {
    sectionId: 'troubleshooting', topicId: 'tun-errors', title: 'TUN、路由与模式冲突',
    clusters: [
      { id: 'wintun-virtual-adapter-crash', title: '虚拟网卡与权限', articles: [
        { slug: 'failed-to-create-tun-device-wintun-error', title: '报错“failed to create TUN device”或无法创建虚拟网卡' },
        { slug: 'manually-installing-wintun-dll-driver', title: '手动下载并向系统注入wintun.dll虚拟网卡驱动的指南' },
        { slug: 'antivirus-blocking-tun-adapter-creation', title: '排查安全软件静默拦截虚拟网络适配器安装的日志证据' }
      ]},
      { id: 'routing-loops-ipv6-leaks', title: '路径与双栈', articles: [
        { slug: 'routing-loop-detected-crashing-proxy-core', title: '报错“routing loop detected”死循环导致核心崩溃的排错' },
        { slug: 'ipv6-traffic-bypassing-tun-causing-ip-leak', title: '本地IPv6网络绕过TUN虚拟网卡导致真实公网IP暴露的防御' },
        { slug: 'hyper-v-vmware-virtual-switches-conflict-tun', title: 'Hyper-V与VMware虚拟交换机与代理TUN网卡冲突的处理' }
      ]}
    ]
  },
  {
    sectionId: 'troubleshooting', topicId: 'performance', title: '慢速、掉线与持续质量',
    clusters: [
      { id: 'bandwidth-cpu-bottlenecks', title: '带宽与处理瓶颈', articles: [
        { slug: 'proxy-speed-capped-at-10mbps-bottleneck-analysis', title: '测速始终卡在10Mbps：从客户端核心、网卡到线路逐级摸排' },
        { slug: 'high-cpu-usage-by-proxy-core-process', title: '代理核心进程持续占用单核100% CPU的原因与规则调优' },
        { slug: 'mtu-size-misconfiguration-causing-packet-loss', title: 'MTU过大导致分片丢包：在客户端中调优TUN模式MTU数值' }
      ]},
      { id: 'intermittent-disconnect-recovery', title: '间歇中断与恢复', articles: [
        { slug: 'connections-drop-every-few-minutes-keepalive', title: '每隔几分钟连接自动中断重连：TCP Keep-Alive参数调优' },
        { slug: 'udp-quic-blocked-by-isp-causing-streaming-stutter', title: '运营商对UDP流量严重QoS限速时关闭网页QUIC协议' },
        { slug: 'diagnosing-transit-route-loss-with-mtr', title: '使用MTR持续跟踪到节点机房的每一跳丢包率与抖动' }
      ]}
    ]
  },
  {
    sectionId: 'troubleshooting', topicId: 'application-errors', title: 'AI、视频与开发工具故障',
    clusters: [
      { id: 'ai-tools-cli-failures', title: 'AI 与开发工具', articles: [
        { slug: 'chatgpt-access-denied-error-1020-blocked', title: '访问ChatGPT提示Access Denied、Error 1020或不支持区域' },
        { slug: 'git-clone-fails-with-schannel-ssl-connect-error', title: 'Git Clone提示“Failed to connect to github.com port 443”修复' },
        { slug: 'pip-npm-docker-pull-connection-timeout-fix', title: 'pip install、npm install与Docker拉取镜像走代理配置' }
      ]},
      { id: 'streaming-geo-block-abnormalities', title: '播放与网页异常', articles: [
        { slug: 'netflix-only-shows-originals-region-unblock-fix', title: 'Netflix只能看自制剧：节点被判定为机房IP的解锁恢复' },
        { slug: 'youtube-defaults-to-360p-buffer-health-check', title: 'YouTube播放默认清晰度极低且经常转圈的缓冲区诊断' },
        { slug: 'discord-rtc-connecting-voice-channel-failure', title: 'Discord语音频道一直卡在“RTC Connecting”或无法收发语音' }
      ]}
    ]
  },

  // Section 7: reviews
  {
    sectionId: 'reviews', topicId: 'methodology', title: '评测方法与样本',
    clusters: [
      { id: 'variable-control-workloads', title: '控制变量与任务', articles: [
        { slug: 'proxy-client-benchmark-methodology-explained', title: '代理客户端评测方法论：硬件基准、网络环境与控制变量' },
        { slug: 'standardizing-test-workloads-browsing-vs-streaming', title: '标准化负载任务设计：大文件并发吞吐与多Tab网页加载' },
        { slug: 'simulating-weak-network-and-packet-loss-tests', title: '使用弱网模拟工具测试各客户端在30%丢包下的恢复能力' }
      ]},
      { id: 'statistical-evidence-logging', title: '统计与证据', articles: [
        { slug: 'collecting-memory-and-cpu-metrics-objectively', title: '如何客观采集客户端进程CPU、工作集内存与句柄数指标' },
        { slug: 'measuring-cold-start-and-profile-switch-latency', title: '各客户端冷启动耗时与万级规则切换延迟的测算方法' },
        { slug: 'logging-and-reproducing-benchmark-evidence', title: '原始测试日志归档规范与读者可自行复现的测试脚本' }
      ]}
    ]
  },
  {
    sectionId: 'reviews', topicId: 'mihomo-clients', title: 'Clash 系客户端比较',
    clusters: [
      { id: 'ui-workflow-comparison', title: '界面与使用流程', articles: [
        { slug: 'clash-verge-rev-vs-clash-nyanpasu-comparison', title: 'Clash Verge Rev对比Clash Nyanpasu：UI美观度与易用性实测' },
        { slug: 'flclash-vs-clash-verge-rev-ux-benchmarks', title: 'FlClash对比Clash Verge Rev：跨平台一致性与交互流畅度' },
        { slug: 'clash-multi-profile-switching-experience', title: '多配置订阅同时存在时各Clash客户端的平滑切换体验' }
      ]},
      { id: 'extensions-maintenance-cadence', title: '扩展与维护', articles: [
        { slug: 'comparing-script-and-merge-capabilities-clash', title: '扩展配置与插件能力对比：JavaScript支持与Merge规则' },
        { slug: 'kernel-update-cadence-in-verge-and-nyanpasu', title: '核对Mihomo核心版本跟进速度与各客户端内置更新器' },
        { slug: 'open-source-community-health-of-clash-forks', title: 'Clash各大活跃分支的开源社区活跃度与Bug修复周期' }
      ]}
    ]
  },
  {
    sectionId: 'reviews', topicId: 'xray-clients', title: 'Xray 与多核心客户端比较',
    clusters: [
      { id: 'capability-exposure-switching', title: '能力暴露与切换', articles: [
        { slug: 'v2rayn-vs-nekobox-multi-core-feature-depth', title: 'v2rayN对比NekoBox：高级路由配置与核心暴露深度评测' },
        { slug: 'switching-between-xray-and-singbox-in-v2rayn', title: '在v2rayN中无缝切换Xray与sing-box核心的稳定性表现' },
        { slug: 'sub-group-management-in-v2rayn-vs-nekoray', title: '分组管理与批量测试功能：v2rayN海量节点运维效率' }
      ]},
      { id: 'import-diagnostics-usability', title: '导入和诊断', articles: [
        { slug: 'v2rayn-vs-v2rayng-clipboard-import-speed', title: '桌面端v2rayN与移动端v2rayNG剪贴板批量导入容错率对比' },
        { slug: 'comparing-built-in-log-viewers-for-troubleshooting', title: '内置日志查看器与实时连接追踪功能的使用便利度' },
        { slug: 'v2rayn-custom-routing-rule-editor-evaluation', title: 'v2rayN图形化路由规则编辑器的上手门槛与灵活性评测' }
      ]}
    ]
  },
  {
    sectionId: 'reviews', topicId: 'singbox-clients', title: 'sing-box 客户端比较',
    clusters: [
      { id: 'default-configs-import-experience', title: '默认配置与导入', articles: [
        { slug: 'official-singbox-gui-vs-hiddify-comparison', title: 'sing-box官方图形界面对比Hiddify：开箱即用度实测' },
        { slug: 'karing-vs-hiddify-multi-protocol-support', title: 'Karing对比Hiddify：通用订阅导入与协议兼容度全方位横评' },
        { slug: 'singbox-universal-json-generation-compliance', title: '各三方sing-box客户端生成配置与官方标准格式的符合度' }
      ]},
      { id: 'version-migration-error-tolerance', title: '版本迁移与错误', articles: [
        { slug: 'how-different-singbox-apps-handle-schema-breakage', title: 'sing-box核心升级导致语法变动时不同客户端的容错表现' },
        { slug: 'crash-recovery-in-singbox-gui-clients', title: '配置出现非法字段时各GUI客户端的崩溃预防与错误提示' },
        { slug: 'singbox-rule-set-auto-download-efficiency', title: '远程.srs规则集二进制自动拉取与本地更新缓存机制对比' }
      ]}
    ]
  },
  {
    sectionId: 'reviews', topicId: 'desktop', title: '桌面资源与连接表现',
    clusters: [
      { id: 'cpu-memory-startup-benchmarks', title: 'CPU、内存与启动', articles: [
        { slug: 'desktop-client-idle-memory-footprint-benchmark', title: 'Windows桌面代理客户端空闲待机内存开销实测横评' },
        { slug: 'cpu-spikes-during-10000-rule-matching-benchmark', title: '万条规则并发匹配与DNS查询时各客户端CPU峰值占用' },
        { slug: 'client-cold-start-to-traffic-ready-latency', title: '从点击启动到首个网络请求完成代理的耗时秒表测定' }
      ]},
      { id: 'long-haul-stability-recovery', title: '持续使用与恢复', articles: [
        { slug: '72-hour-continuous-operation-memory-leak-test', title: '连续挂机72小时长效稳定性测试：是否存在内存泄漏' },
        { slug: 'laptop-sleep-and-wake-proxy-recovery-benchmark', title: '笔记本休眠唤醒后各客户端虚拟网卡与网络恢复成功率' },
        { slug: 'handling-gigabit-throughput-stress-test', title: '千兆公网并发下载压测下客户端进程崩溃与丢包率记录' }
      ]}
    ]
  },
  {
    sectionId: 'reviews', topicId: 'mobile', title: '移动端续航与网络切换',
    clusters: [
      { id: 'battery-drain-background-keepalive', title: '电量与后台', articles: [
        { slug: 'android-proxy-battery-drain-comparison', title: 'v2rayNG、Clash Meta与Hiddify在Android下的耗电量评测' },
        { slug: 'ios-shadowrocket-vs-surge-battery-impact', title: 'iOS端小火箭Shadowrocket对比Surge后台待机耗电实测' },
        { slug: 'aggressive-oem-battery-killer-survival-rates', title: '国内品牌手机激进杀后台机制下各客户端的保活存活率' }
      ]},
      { id: 'network-handover-latency', title: '切网与应用体验', articles: [
        { slug: 'wifi-to-cellular-handover-reconnect-latency', title: '从WiFi切换到蜂窝移动网络时节点重连的延迟测算' },
        { slug: 'subway-weak-signal-recovery-comparison', title: '地铁与地下车库弱网环境下各移动客户端快速恢复表现' },
        { slug: 'split-tunnel-app-proxy-performance-mobile', title: '移动端分应用代理开启后对国内主流App加载速度的影响' }
      ]}
    ]
  },
  {
    sectionId: 'reviews', topicId: 'subscription-ux', title: '订阅管理与配置体验',
    clusters: [
      { id: 'import-speed-interpretability', title: '导入效率与可解释性', articles: [
        { slug: 'benchmark-importing-100-nodes-across-clients', title: '百个节点同时导入时各客户端的解析耗时与界面卡顿评测' },
        { slug: 'visualizing-node-latency-and-traffic-usage-ux', title: '节点测速结果排序、分组展示与已用流量可视化的体验对比' },
        { slug: 'error-message-clarity-when-subscription-fails', title: '订阅拉取失败时各客户端报错信息的可理解度与诊断指引' }
      ]},
      { id: 'update-frequency-conflict-resolution', title: '更新与冲突处理', articles: [
        { slug: 'background-silent-subscription-update-reliability', title: '后台静默定时更新订阅时的成功率与异常重试机制' },
        { slug: 'custom-rules-retention-during-subscription-update', title: '更新订阅后本地自定义节点备注与规则是否被无情覆盖' },
        { slug: 'merging-multiple-subscriptions-ux-comparison', title: '多机场订阅共存时多源管理界面的组织便利性横评' }
      ]}
    ]
  },
  {
    sectionId: 'reviews', topicId: 'network-behavior', title: '分流、DNS 与 TUN 行为',
    clusters: [
      { id: 'rule-routing-accuracy-tests', title: '分流准确性', articles: [
        { slug: 'evaluating-accuracy-of-geoip-and-geosite-routing', title: '常见GeoIP与GeoSite规则库在国内外网站分流上的准确率' },
        { slug: 'dns-leak-test-results-across-all-clients', title: '全平台主流客户端DNS防泄露实测：谁在悄悄向ISP查询' },
        { slug: 'udp-and-webrtc-leak-prevention-benchmark', title: '开启代理后WebRTC真实IP泄露测试与各客户端防御效果' }
      ]},
      { id: 'dns-leak-dualstack-handling', title: '解析与双栈', articles: [
        { slug: 'ipv4-ipv6-dual-stack-routing-behavior', title: 'IPv4/IPv6双栈环境下各客户端的优先解析与回退策略' },
        { slug: 'wintun-vs-system-proxy-packet-loss-comparison', title: 'Wintun虚拟网卡模式对比系统代理模式的吞吐量与丢包率' },
        { slug: 'local-dns-cache-hit-rate-and-latency-benchmarks', title: '内置DNS缓存命中率对日常网页首屏加载时间的提升评测' }
      ]}
    ]
  },
  {
    sectionId: 'reviews', topicId: 'security-maintenance', title: '来源透明与维护质量',
    clusters: [
      { id: 'release-transparency-permissions', title: '发布与权限', articles: [
        { slug: 'evaluating-client-source-code-transparency', title: '开源程度核查：核心与GUI是否完全开源或包含未公开二进制' },
        { slug: 'reproducible-builds-status-for-popular-clients', title: '可复现构建(Reproducible Builds)在主流代理工具中的现状' },
        { slug: 'auditing-third-party-network-analytics-in-clients', title: '排查客户端是否内置未经授权的遥测、统计或第三方SDK' }
      ]},
      { id: 'issue-response-cve-hygiene', title: '维护与问题反馈', articles: [
        { slug: 'github-issues-response-time-and-resolution-rate', title: '各项目GitHub Issues响应中位数与安全漏洞修复记录' },
        { slug: 'handling-cve-vulnerabilities-in-proxy-cores', title: '历史高危漏洞发生时各客户端推送紧急补丁的响应速度' },
        { slug: 'project-bus-factor-and-sole-maintainer-risks', title: '巴士系数(Bus Factor)评估：单人维护项目停更的潜在风险' }
      ]}
    ]
  },
  {
    sectionId: 'reviews', topicId: 'usability-cost', title: '易用性、费用与设备选择',
    clusters: [
      { id: 'novice-accessibility-readiness', title: '新手与无障碍', articles: [
        { slug: 'novice-time-to-first-connection-benchmark', title: '零基础新手从安装到首次连通耗时评测：谁最开箱即用' },
        { slug: 'screen-reader-and-keyboard-accessibility-review', title: '屏幕阅读器与纯键盘操作在各代理客户端中的无障碍支持' },
        { slug: 'multi-language-localization-quality-review', title: '多语言本地化翻译水准与技术术语中文表述的准确度' }
      ]},
      { id: 'commercial-licensing-tco', title: '软件收费与长期投入', articles: [
        { slug: 'free-open-source-vs-paid-commercial-clients', title: '免费开源工具与付费商业客户端(如Surge)的性价比综合算账' },
        { slug: 'in-app-purchase-models-and-license-bind-limits', title: '买断制、订阅制与设备激活数绑定的使用限制分析' },
        { slug: 'long-term-total-cost-of-ownership-proxy-tools', title: '跨五年时间跨度使用代理软件的总拥有成本(TCO)核算' }
      ]}
    ]
  },

  // Section 8: learn
  {
    sectionId: 'learn', topicId: 'roles', title: '客户端、机场与核心关系',
    clusters: [
      { id: 'service-role-demarcation', title: '服务角色', articles: [
        { slug: 'demystifying-client-kernel-and-airport-roles', title: '图解代理三要素：客户端界面、协议核心与机场服务的分工' },
        { slug: 'why-buying-software-does-not-include-nodes', title: '为什么购买了Shadowrocket或下载了Clash依然无法上网？' },
        { slug: 'airport-responsibility-vs-client-bug-boundaries', title: '断网到底是谁的锅：区分节点故障、本地配置与软件Bug' }
      ]},
      { id: 'core-client-server-boundaries', title: '能力与边界', articles: [
        { slug: 'what-is-a-proxy-kernel-core-mechanics', title: '什么是代理核心(Core)：Xray、Mihomo与sing-box的真实职责' },
        { slug: 'gui-wrapper-versus-underlying-daemon-flow', title: 'GUI外壳与底层Daemon守护进程之间的数据通信机制' },
        { slug: 'why-clients-cannot-magically-accelerate-bad-nodes', title: '为什么客户端优化无法逾越物理距离与劣质机房的带宽瓶颈' }
      ]}
    ]
  },
  {
    sectionId: 'learn', topicId: 'journey', title: '从零开始的使用路径',
    clusters: [
      { id: 'prerequisite-assessment', title: '需求和准备', articles: [
        { slug: 'assessing-your-proxy-needs-work-study-gaming', title: '明确你的真实网络需求：科研查资料、跨国办公还是流媒体' },
        { slug: 'hardware-and-system-readiness-checklist', title: '开启代理前的设备准备：操作系统支持、磁盘空间与权限' },
        { slug: 'understanding-basic-internet-connectivity-checks', title: '在开始折腾前确认本地宽带的基础健康状态' }
      ]},
      { id: 'milestones-acceptance-criteria', title: '阶段与完成标准', articles: [
        { slug: 'five-milestones-of-proxy-mastery-journey', title: '从新手到熟练：掌握科学网络工具的五个关键里程碑' },
        { slug: 'acceptance-criteria-for-successful-proxy-setup', title: '如何确认你的代理设置完全成功：验收测试三步法' },
        { slug: 'what-to-do-when-your-proxy-suddenly-stops', title: '当代理突然无法连接时的新手急救自查思维导图' }
      ]}
    ]
  },
  {
    sectionId: 'learn', topicId: 'devices', title: '系统、架构与版本常识',
    clusters: [
      { id: 'os-cpu-architecture-matrix', title: '系统与硬件身份', articles: [
        { slug: 'demystifying-cpu-architectures-x64-arm64-armv7', title: 'CPU架构快速科普：x86_64、ARM64与mips该怎么看' },
        { slug: 'operating-system-differences-windows-mac-linux', title: 'Windows、macOS与Linux在网络栈与代理机制上的底层差异' },
        { slug: 'mobile-os-sandboxing-and-vpn-api-limitations', title: '移动端iOS与Android沙盒环境对代理后台的严苛限制' }
      ]},
      { id: 'version-release-channel-literacy', title: '版本与维护知识', articles: [
        { slug: 'semantic-versioning-major-minor-patch-guide', title: '如何看懂软件版本号：为什么主版本号改变意味着破坏性改动' },
        { slug: 'stable-beta-nightly-release-channels-explained', title: 'Alpha、Beta、Release与Nightly版本发布通道的含义' },
        { slug: 'long-term-support-lts-concept-for-proxies', title: '代理软件的长期支持(LTS)理念与拒绝无脑跟风更新' }
      ]}
    ]
  },
  {
    sectionId: 'learn', topicId: 'subscription-basics', title: '订阅与配置基本概念',
    clusters: [
      { id: 'uris-nodes-config-files', title: '链接、节点和配置', articles: [
        { slug: 'what-is-a-node-server-ip-port-and-protocol', title: '什么是节点：服务器IP、端口、协议与密码的具体物理存在' },
        { slug: 'what-is-a-subscription-url-and-how-it-works', title: '订阅链接到底是什么：为什么它能动态拉取一长串节点' },
        { slug: 'difference-between-single-node-and-full-profile', title: '单节点URI与完整配置文件的区别与适用场景' }
      ]},
      { id: 'expiration-update-mechanics', title: '更新与失效原理', articles: [
        { slug: 'why-subscription-links-expire-and-stop-updating', title: '为什么订阅链接会失效：套餐到期、流量耗尽与Token被重置' },
        { slug: 'how-node-ip-changes-are-delivered-via-sub', title: '机场机房IP被墙更换后，客户端如何通过订阅静默获取新地址' },
        { slug: 'local-config-tampering-risks-explained', title: '手动修改订阅配置文件后再次更新被覆盖的底层逻辑' }
      ]}
    ]
  },
  {
    sectionId: 'learn', topicId: 'protocols', title: '网络与协议入门',
    clusters: [
      { id: 'network-layers-proxy-chains', title: '连接层次', articles: [
        { slug: 'osi-model-layers-explained-for-proxy-users', title: '用大白话讲透网络分层：从TCP/UDP传输层到HTTP应用层' },
        { slug: 'shadowsocks-vmess-vless-evolution-history', title: '协议进化史：从原始Shadowsocks到VMess与VLESS的演进' },
        { slug: 'quic-udp-protocols-hysteria-and-tuic-explained', title: '基于UDP的新一代协议：Hysteria 2与TUIC为什么速度更快' }
      ]},
      { id: 'ip-dns-routing-paths', title: '地址与路径', articles: [
        { slug: 'what-is-an-ip-address-and-asn-explained', title: 'IP地址、子网掩码与自治系统(ASN)通俗解说' },
        { slug: 'how-domain-names-resolve-to-ips-via-dns', title: '输入网址后发生了什么：DNS解析的完整生命周期' },
        { slug: 'routing-packets-across-international-cables', title: '数据包是如何漂洋过海的：海底光缆与国际骨干网传输' }
      ]}
    ]
  },
  {
    sectionId: 'learn', topicId: 'proxy-modes', title: '代理模式与流量范围',
    clusters: [
      { id: 'global-rule-direct-concepts', title: '模式选择概念', articles: [
        { slug: 'global-vs-rule-vs-direct-mode-explained', title: '全局模式、规则模式与直连模式的核心区别与选择策略' },
        { slug: 'why-you-should-never-use-global-mode-daily', title: '为什么日常使用绝不推荐全局模式：网速变慢与国内封号' },
        { slug: 'how-rule-mode-decides-which-traffic-to-proxy', title: '规则模式如何智能判定流量走直连还是走代理节点' }
      ]},
      { id: 'lan-bypass-loopback-scope', title: '使用边界与本地网络', articles: [
        { slug: 'loopback-address-and-localhost-explained', title: '127.0.0.1与localhost：本地回环地址与代理端口监听' },
        { slug: 'lan-private-ip-ranges-192-168-explained', title: '私有IP地址段(10.x, 172.16.x, 192.168.x)与局域网直连' },
        { slug: 'why-local-banking-apps-reject-proxy-traffic', title: '为什么打开代理后部分国内银行App和政务网站拒绝访问' }
      ]}
    ]
  },
  {
    sectionId: 'learn', topicId: 'billing', title: '套餐、流量与付费常识',
    clusters: [
      { id: 'billing-cycles-unit-pricing', title: '价格和周期', articles: [
        { slug: 'airport-pricing-tiers-and-hidden-unit-costs', title: '看穿机场定价套路：月付、季付、年付与每GB真实单价' },
        { slug: 'why-extremely-cheap-annual-plans-often-exit-scam', title: '超低价年付“跑路”概率与小成本月付保平安逻辑' },
        { slug: 'currency-exchange-rates-and-payment-gateway-fees', title: '美元标价、USDT虚拟币支付与第三方通道手续费解密' }
      ]},
      { id: 'bandwidth-caps-reset-policies', title: '额度和限制', articles: [
        { slug: 'calendar-month-vs-billing-cycle-reset-explained', title: '自然月重置与账单日重置：你的流量什么时候会归零' },
        { slug: 'what-is-traffic-multiplier-ratio-in-airports', title: '什么是节点倍率：为什么用10G流量会被扣除30G余额' },
        { slug: 'unlimited-traffic-myth-and-fair-usage-policy', title: '不限量流量的真相：公平使用原则(FUP)与峰值恶性限速' }
      ]}
    ]
  },
  {
    sectionId: 'learn', topicId: 'privacy', title: '凭据、权限与隐私常识',
    clusters: [
      { id: 'tokens-keys-exposure-risks', title: '敏感信息', articles: [
        { slug: 'why-you-must-never-share-your-sub-link', title: '为什么绝对不能将订阅链接公开发给他人或发在群聊中' },
        { slug: 'what-info-can-airport-operators-actually-see', title: '机场运维人员到底能看到你的哪些网络浏览记录' },
        { slug: 'https-encryption-and-what-proxies-cannot-read', title: 'HTTPS加密的作用：代理节点能看到域名但看不到你的密码' }
      ]},
      { id: 'root-ca-vpn-permission-scopes', title: '权限与证书', articles: [
        { slug: 'what-happens-when-you-trust-a-root-ca-cert', title: '信任根证书的致命危险：深入解析中间人解密技术' },
        { slug: 'why-proxy-clients-demand-system-vpn-permissions', title: '为什么代理软件必须索要系统级网络配置与VPN权限' },
        { slug: 'antivirus-false-positives-on-proxy-binaries', title: '安全杀毒软件误报病毒的原理与开源软件被误杀的防范' }
      ]}
    ]
  },
  {
    sectionId: 'learn', topicId: 'metrics', title: '测速与稳定性理解',
    clusters: [
      { id: 'latency-throughput-jitter-metrics', title: '指标解释', articles: [
        { slug: 'ping-latency-vs-real-download-speed-explained', title: '延迟低不等于速度快：大白话解析Ping延迟与下载带宽' },
        { slug: 'jitter-and-packet-loss-impact-on-calls-and-games', title: '网络抖动(Jitter)与丢包率对语音开黑和视频通话的致命打击' },
        { slug: 'tcping-vs-google-http-ping-benchmarks', title: 'TCP Ping、ICMP Ping与Google真实响应时间的巨大差别' }
      ]},
      { id: 'benchmarking-methodology-evidence', title: '结果与证据', articles: [
        { slug: 'why-speedtest-results-look-great-but-web-is-slow', title: '为什么Speedtest测速几百兆但实际打开网页依然卡顿？' },
        { slug: 'how-youtube-nerds-stats-reveal-real-speed', title: '通过YouTube“详细统计信息”客观检验视频连接速度' },
        { slug: 'speed-test-traffic-consumption-warning', title: '测速也是要跑流量的：一次千兆全量测速烧掉几十G流量' }
      ]}
    ]
  },
  {
    sectionId: 'learn', topicId: 'help', title: '查资料、求助与常用词',
    clusters: [
      { id: 'official-docs-issue-retrieval', title: '文档与来源', articles: [
        { slug: 'how-to-read-official-github-documentation', title: '如何高效查阅GitHub官方文档与Release更新日志' },
        { slug: 'searching-closed-github-issues-for-solutions', title: '利用GitHub搜索已关闭的Issue解决99%的历史报错' },
        { slug: 'identifying-outdated-and-misleading-tutorials', title: '如何识别百度搜出来的老旧过时代理教程并主动避坑' }
      ]},
      { id: 'structured-bug-reporting-postmortem', title: '反馈与复盘', articles: [
        { slug: 'how-to-ask-smart-questions-in-tech-communities', title: '提问的智慧：向机场客服或社群求助时必须提供的关键信息' },
        { slug: 'how-to-safely-copy-error-logs-with-redaction', title: '提交报错日志前如何脱敏隐藏自己的私有Token与公网IP' },
        { slug: 'writing-a-postmortem-after-fixing-a-major-glitch', title: '故障解决后的个人复盘：记录已知良好配置防止再次踩坑' }
      ]}
    ]
  }
];

// Verify the numbers
console.log('Verifying content scale specifications...');
let totalSections = SECTIONS.length;
let totalTopics = TOPICS_AND_CLUSTERS.length;
let totalClusters = 0;
let totalArticles = 0;

TOPICS_AND_CLUSTERS.forEach(t => {
  totalClusters += t.clusters.length;
  t.clusters.forEach(c => {
    totalArticles += c.articles.length;
  });
});

console.log(`Sections: ${totalSections} (expected 8)`);
console.log(`Topics: ${totalTopics} (expected 80)`);
console.log(`Clusters: ${totalClusters} (expected 160)`);
console.log(`Articles: ${totalArticles} (expected 480)`);
const totalNodes = 1 + totalSections + totalTopics + totalClusters + totalArticles;
console.log(`Total Planning Nodes: ${totalNodes} (expected 729: 1 Home + 8 Sections + 80 Topics + 160 Clusters + 480 Articles)`);

if (totalTopics !== 80 || totalClusters !== 160 || totalArticles !== 480 || totalNodes !== 729) {
  throw new Error(`Scale mismatch! Expected 80 topics, 160 clusters, 480 articles, 729 total nodes.`);
}

// Generate Registry & Graph
const registry = [];
const graph = {
  nodes: [],
  edges: []
};
const articleTitles = [];
const urlMap = [];
const keywordOwnership = [];

// 1. Home node
const homeNode = {
  id: 'home',
  type: 'home',
  parentId: null,
  url: '/',
  title: '机场代理：客户端下载、订阅配置与兼容机场指南',
  h1: '代理客户端下载、安装与订阅使用指南',
  description: '专业且客观的代理客户端下载、安装教程、订阅配置、故障排查、客户端评测及兼容机场选型指南。',
  status: 'published',
  sectionId: null
};
registry.push(homeNode);
graph.nodes.push({ id: homeNode.id, url: homeNode.url, title: homeNode.title, type: homeNode.type });
urlMap.push({ id: homeNode.id, url: homeNode.url, type: homeNode.type, status: homeNode.status });

// 2. Section nodes
SECTIONS.forEach(s => {
  const sNode = {
    id: `sec-${s.id}`,
    type: 'section',
    parentId: 'home',
    sectionId: s.id,
    url: s.url,
    title: `${s.title}｜机场代理`,
    h1: `${s.title}`,
    description: s.description,
    status: 'published'
  };
  registry.push(sNode);
  graph.nodes.push({ id: sNode.id, url: sNode.url, title: sNode.title, type: sNode.type });
  graph.edges.push({ from: 'home', to: sNode.id, relationship: 'contains' });
  urlMap.push({ id: sNode.id, url: sNode.url, type: sNode.type, status: sNode.status });
});

// 3. Level-2 topics, clusters, and articles
TOPICS_AND_CLUSTERS.forEach(t => {
  const topicNodeId = `topic-${t.sectionId}-${t.topicId}`;
  const topicUrl = `/${t.sectionId}/${t.topicId}/`;
  const topicNode = {
    id: topicNodeId,
    type: 'topic',
    parentId: `sec-${t.sectionId}`,
    sectionId: t.sectionId,
    topicId: t.topicId,
    url: topicUrl,
    title: `${t.title}｜${SECTIONS.find(s => s.id === t.sectionId).title}｜机场代理`,
    h1: t.title,
    description: `${t.title}二级专题全景指南：涵盖子集群架构、深度技术规范与选型评测。`,
    status: 'published' // Key Level-2 hubs published
  };
  registry.push(topicNode);
  graph.nodes.push({ id: topicNode.id, url: topicNode.url, title: topicNode.title, type: topicNode.type });
  graph.edges.push({ from: `sec-${t.sectionId}`, to: topicNode.id, relationship: 'contains' });
  urlMap.push({ id: topicNode.id, url: topicNode.url, type: topicNode.type, status: topicNode.status });

  t.clusters.forEach(c => {
    const clusterNodeId = `cluster-${t.sectionId}-${t.topicId}-${c.id}`;
    const clusterUrl = `/${t.sectionId}/${t.topicId}/${c.id}/`;
    const clusterNode = {
      id: clusterNodeId,
      type: 'cluster',
      parentId: topicNodeId,
      sectionId: t.sectionId,
      topicId: t.topicId,
      clusterId: c.id,
      url: clusterUrl,
      title: `${c.title} - ${t.title}｜机场代理`,
      h1: c.title,
      description: `${t.title}下的「${c.title}」三级集群综合知识库，包含针对性问答与独立解决方案。`,
      status: 'draft' // editorial task tracking
    };
    registry.push(clusterNode);
    graph.nodes.push({ id: clusterNode.id, url: clusterNode.url, title: clusterNode.title, type: clusterNode.type });
    graph.edges.push({ from: topicNodeId, to: clusterNode.id, relationship: 'contains' });
    urlMap.push({ id: clusterNode.id, url: clusterNode.url, type: clusterNode.type, status: clusterNode.status });

    c.articles.forEach(a => {
      const articleNodeId = `art-${t.sectionId}-${a.slug}`;
      const articleUrl = `/${t.sectionId}/${a.slug}/`;
      const articleNode = {
        id: articleNodeId,
        type: 'article',
        parentId: clusterNodeId,
        sectionId: t.sectionId,
        topicId: t.topicId,
        clusterId: c.id,
        slug: a.slug,
        url: articleUrl,
        title: a.title,
        h1: a.title,
        description: `针对「${a.title}」的深度解析与实操步骤，提供可复查证据、适用版本与排查方案。`,
        status: 'draft', // by default draft, published whitelist will promote verified articles
        searchIntent: a.title,
        preconditions: '具备基础网络访问能力及对应操作系统权限',
        expectedAnswer: `提供解决「${a.title}」的直接结论、具体步骤与验证标准。`
      };
      registry.push(articleNode);
      graph.nodes.push({ id: articleNode.id, url: articleNode.url, title: articleNode.title, type: articleNode.type });
      graph.edges.push({ from: clusterNodeId, to: articleNode.id, relationship: 'contains' });
      urlMap.push({ id: articleNode.id, url: articleNode.url, type: articleNode.type, status: articleNode.status });

      articleTitles.push({
        id: articleNodeId,
        section: t.sectionId,
        topic: t.topicId,
        cluster: c.id,
        slug: a.slug,
        url: articleUrl,
        title: a.title
      });

      keywordOwnership.push({
        keyword: a.title,
        ownerUrl: articleUrl,
        cluster: c.title,
        topic: t.title,
        section: t.sectionId
      });
    });
  });
});

// Ensure target directories exist
fs.mkdirSync(path.join(rootDir, 'data'), { recursive: true });
fs.mkdirSync(path.join(rootDir, 'editorial'), { recursive: true });

// Write data files
fs.writeFileSync(path.join(rootDir, 'data', 'CONTENT_REGISTRY.json'), JSON.stringify(registry, null, 2), 'utf8');
fs.writeFileSync(path.join(rootDir, 'data', 'CONTENT_GRAPH.json'), JSON.stringify(graph, null, 2), 'utf8');

// Write CSV files
const csvHeader = 'id,section,topic,cluster,slug,url,title\n';
const csvRows = articleTitles.map(a => `"${a.id}","${a.section}","${a.topic}","${a.cluster}","${a.slug}","${a.url}","${a.title.replace(/"/g, '""')}"`).join('\n');
fs.writeFileSync(path.join(rootDir, 'ARTICLE_TITLES_480.csv'), csvHeader + csvRows, 'utf8');

const urlMapHeader = 'id,url,type,status\n';
const urlMapRows = urlMap.map(u => `"${u.id}","${u.url}","${u.type}","${u.status}"`).join('\n');
fs.writeFileSync(path.join(rootDir, 'URL_MAP.csv'), urlMapHeader + urlMapRows, 'utf8');

// Write KEYWORD_OWNERSHIP.md
let koMd = `# 关键词所有权与唯一承接页映射表 (KEYWORD_OWNERSHIP.md)\n\n`;
koMd += `> **核心原则**: 一个独立问题或核心关键词有且仅有一个官方主要承接页，禁止站内同义替换竞食。\n\n`;
koMd += `| 核心搜索意图 / 关键词 | 唯一主承接 URL | 所属三级集群 | 所属二级专题 | 一级栏目 |\n`;
koMd += `| :--- | :--- | :--- | :--- | :--- |\n`;
keywordOwnership.forEach(k => {
  koMd += `| ${k.keyword} | [${k.ownerUrl}](${k.ownerUrl}) | ${k.cluster} | ${k.topic} | ${k.section} |\n`;
});
fs.writeFileSync(path.join(rootDir, 'KEYWORD_OWNERSHIP.md'), koMd, 'utf8');

// Generate editorial task markdown files in editorial/<section>/<id>.md
console.log('Generating editorial tasks in editorial/ ...');
let taskCount = 0;
registry.forEach(node => {
  const sec = node.sectionId || 'root';
  const secDir = path.join(rootDir, 'editorial', sec);
  fs.mkdirSync(secDir, { recursive: true });
  const taskFile = path.join(secDir, `${node.id}.md`);
  const content = `---
id: "${node.id}"
type: "${node.type}"
parentId: "${node.parentId || ''}"
url: "${node.url}"
title: "${node.title.replace(/"/g, '\\"')}"
status: "${node.status}"
searchIntent: "${(node.searchIntent || node.title).replace(/"/g, '\\"')}"
expectedAnswer: "${(node.expectedAnswer || node.description).replace(/"/g, '\\"')}"
lastAudit: "2026-10-21"
---

# 编辑任务：${node.title}

- **节点 ID**: \`${node.id}\`
- **规范 URL**: \`${node.url}\`
- **层级类型**: \`${node.type}\`
- **当前状态**: \`${node.status}\`

## 1. 独立问题与预期目标
${node.expectedAnswer || node.description}

## 2. 撰写前置条件与证据要求
- 核对官方发布源或官方文档。
- 严禁假冒实测数据，未亲测步骤需加注“依据官方文档”。
- 遵守 7,000 ~ 15,000 汉字长文深度架构要求（按页面实际任务展开）。
`;
  fs.writeFileSync(taskFile, content, 'utf8');
  taskCount++;
});

console.log(`Successfully planned ${registry.length} nodes! Generated ${taskCount} editorial task files.`);
