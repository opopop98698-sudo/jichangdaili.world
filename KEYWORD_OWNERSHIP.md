# 关键词所有权与唯一承接页映射表 (KEYWORD_OWNERSHIP.md)

> **核心原则**: 一个独立问题或核心关键词有且仅有一个官方主要承接页，禁止站内同义替换竞食。

| 核心搜索意图 / 关键词 | 唯一主承接 URL | 所属三级集群 | 所属二级专题 | 一级栏目 |
| :--- | :--- | :--- | :--- | :--- |
| 如何核对机场是否同时提供Clash、V2Ray与Base64通用订阅链接 | [/recommend/verify-airport-sub-formats/](/recommend/verify-airport-sub-formats/) | 多格式支持核对 | 通用订阅与多格式机场 | recommend |
| 多协议节点支持核对：SS、VMess、VLESS与Trojan的可用性判断 | [/recommend/multi-protocol-node-support-guide/](/recommend/multi-protocol-node-support-guide/) | 多格式支持核对 | 通用订阅与多格式机场 | recommend |
| 机场后端自带格式转换器的容错率与常见解析缺失点 | [/recommend/auto-format-conversion-risks/](/recommend/auto-format-conversion-risks/) | 多格式支持核对 | 通用订阅与多格式机场 | recommend |
| 从Clash迁移到sing-box：订阅链接与节点兼容性选型指南 | [/recommend/migrate-between-clash-and-singbox/](/recommend/migrate-between-clash-and-singbox/) | 跨客户端迁移选型 | 通用订阅与多格式机场 | recommend |
| 跨平台订阅可移植性评测：Windows、macOS与移动端通用要求 | [/recommend/cross-platform-subscription-portability/](/recommend/cross-platform-subscription-portability/) | 跨客户端迁移选型 | 通用订阅与多格式机场 | recommend |
| 混合节点类型机场的客户端适配策略与容灾建议 | [/recommend/hybrid-node-airport-selection/](/recommend/hybrid-node-airport-selection/) | 跨客户端迁移选型 | 通用订阅与多格式机场 | recommend |
| Mihomo核心专属特性核对：Proxy-Provider与Hysteria2支持 | [/recommend/mihomo-extended-yaml-features-check/](/recommend/mihomo-extended-yaml-features-check/) | Clash 订阅适配 | Clash 与 Mihomo 兼容机场 | recommend |
| Clash Meta配置兼容测试：标准YAML格式与自定义规则拉取 | [/recommend/clash-meta-yaml-compatibility-testing/](/recommend/clash-meta-yaml-compatibility-testing/) | Clash 订阅适配 | Clash 与 Mihomo 兼容机场 | recommend |
| 机场策略组命名规范与Clash Verge Rev自动识别逻辑 | [/recommend/clash-node-group-naming-conventions/](/recommend/clash-node-group-naming-conventions/) | Clash 订阅适配 | Clash 与 Mihomo 兼容机场 | recommend |
| Clash Verge Rev用户如何挑选低故障率且节点及时的机场 | [/recommend/choose-airport-for-clash-verge-rev/](/recommend/choose-airport-for-clash-verge-rev/) | Clash 使用需求选型 | Clash 与 Mihomo 兼容机场 | recommend |
| 分流规则重度用户选购机场的必看指标与节点健康检查频率 | [/recommend/rule-based-airport-node-selection/](/recommend/rule-based-airport-node-selection/) | Clash 使用需求选型 | Clash 与 Mihomo 兼容机场 | recommend |
| 高并发长连接场景下Clash兼容机场的连接数限制核查 | [/recommend/high-concurrency-clash-airport-criteria/](/recommend/high-concurrency-clash-airport-criteria/) | Clash 使用需求选型 | Clash 与 Mihomo 兼容机场 | recommend |
| v2rayN多核心兼容性：Xray与sing-box核心切换选型 | [/recommend/v2rayn-core-compatibility-matching/](/recommend/v2rayn-core-compatibility-matching/) | v2rayN 服务选择 | v2rayN 与 v2rayNG 兼容机场 | recommend |
| 适合v2rayN高级自定义路由与GeoIP分流的机场特征 | [/recommend/v2rayn-custom-routing-airport-criteria/](/recommend/v2rayn-custom-routing-airport-criteria/) | v2rayN 服务选择 | v2rayN 与 v2rayNG 兼容机场 | recommend |
| 大规模节点导入后v2rayN真连接延迟测试的有效性辨析 | [/recommend/v2rayn-bulk-node-latency-testing/](/recommend/v2rayn-bulk-node-latency-testing/) | v2rayN 服务选择 | v2rayN 与 v2rayNG 兼容机场 | recommend |
| Android端v2rayNG长时间待机保活对节点稳定性的要求 | [/recommend/v2rayng-android-power-saving-criteria/](/recommend/v2rayng-android-power-saving-criteria/) | v2rayNG 服务选择 | v2rayN 与 v2rayNG 兼容机场 | recommend |
| v2rayNG移动端订阅定时更新失败排查与机场链接要求 | [/recommend/v2rayng-sub-auto-update-airport-check/](/recommend/v2rayng-sub-auto-update-airport-check/) | v2rayNG 服务选择 | v2rayN 与 v2rayNG 兼容机场 | recommend |
| v2rayNG分应用代理配合机场原生IP节点的选型方法 | [/recommend/v2rayng-split-tunnel-app-routing-tips/](/recommend/v2rayng-split-tunnel-app-routing-tips/) | v2rayNG 服务选择 | v2rayN 与 v2rayNG 兼容机场 | recommend |
| 支持sing-box原生JSON订阅配置的机场挑选标准 | [/recommend/singbox-native-json-airport-selection/](/recommend/singbox-native-json-airport-selection/) | 配置与核心条件 | sing-box 与 Hiddify 兼容机场 | recommend |
| Hiddify跨平台客户端与新一代多协议机场的适配矩阵 | [/recommend/hiddify-multi-protocol-airport-matching/](/recommend/hiddify-multi-protocol-airport-matching/) | 配置与核心条件 | sing-box 与 Hiddify 兼容机场 | recommend |
| 独立规则集SRS二进制编译与机场订阅的分流兼容度 | [/recommend/rule-set-srs-binary-airport-support/](/recommend/rule-set-srs-binary-airport-support/) | 配置与核心条件 | sing-box 与 Hiddify 兼容机场 | recommend |
| sing-box版本破坏性迭代时机场配置模版的跟进质量核对 | [/recommend/singbox-version-breaking-changes-prep/](/recommend/singbox-version-breaking-changes-prep/) | 跨平台与更新维护 | sing-box 与 Hiddify 兼容机场 | recommend |
| Hiddify自动优选节点与多协议并发连接的机场支持情况 | [/recommend/hiddify-auto-warp-multi-node-balance/](/recommend/hiddify-auto-warp-multi-node-balance/) | 跨平台与更新维护 | sing-box 与 Hiddify 兼容机场 | recommend |
| 全平台使用sing-box多端同步配置时的统一节点筛选要求 | [/recommend/full-platform-singbox-sync-experience/](/recommend/full-platform-singbox-sync-experience/) | 跨平台与更新维护 | sing-box 与 Hiddify 兼容机场 | recommend |
| 小火箭Shadowrocket用户选购机场的核心避坑清单 | [/recommend/shadowrocket-subscription-airport-checklist/](/recommend/shadowrocket-subscription-airport-checklist/) | iPhone 与 iPad 选型 | 苹果设备机场选择 | recommend |
| iOS按需连接On-Demand特性对节点握手延迟的严苛要求 | [/recommend/ios-on-demand-vpn-airport-criteria/](/recommend/ios-on-demand-vpn-airport-criteria/) | iPhone 与 iPad 选型 | 苹果设备机场选择 | recommend |
| Loon、Surge与Stash高端规则客户端对应的节点质量门槛 | [/recommend/loon-surge-stash-premium-airport-fit/](/recommend/loon-surge-stash-premium-airport-fit/) | iPhone 与 iPad 选型 | 苹果设备机场选择 | recommend |
| Mac平台原生ARM架构客户端支持与机场多节点切换 | [/recommend/macos-apple-silicon-native-client-airports/](/recommend/macos-apple-silicon-native-client-airports/) | Mac 与苹果多设备 | 苹果设备机场选择 | recommend |
| iCloud专用代理与第三方客户端并存时的机场选型注意 | [/recommend/icloud-private-relay-airport-coexistence/](/recommend/icloud-private-relay-airport-coexistence/) | Mac 与苹果多设备 | 苹果设备机场选择 | recommend |
| 苹果全家桶多设备同开时机场并发连接与IP限制核对 | [/recommend/apple-ecosystem-multi-device-concurrency/](/recommend/apple-ecosystem-multi-device-concurrency/) | Mac 与苹果多设备 | 苹果设备机场选择 | recommend |
| 第一次买机场：五步筛选法与必须提前确认的参数 | [/recommend/first-time-buyer-airport-checklist/](/recommend/first-time-buyer-airport-checklist/) | 首次购买与上手 | 新手友好机场 | recommend |
| 一键导入客户端按钮背后的协议细节与可用性核查 | [/recommend/one-click-import-button-reality-check/](/recommend/one-click-import-button-reality-check/) | 首次购买与上手 | 新手友好机场 | recommend |
| 新手退款保证条款与最短试用周期的阅读指南 | [/recommend/beginner-refund-policy-and-trial-scope/](/recommend/beginner-refund-policy-and-trial-scope/) | 首次购买与上手 | 新手友好机场 | recommend |
| 从知识库文档质量提前预判机场的技术底蕴与维护态度 | [/recommend/airport-doc-quality-grading-criteria/](/recommend/airport-doc-quality-grading-criteria/) | 售后与资料质量 | 新手友好机场 | recommend |
| 工单响应时效与Telegram交流群技术支持的客观考核 | [/recommend/ticket-support-response-time-benchmarks/](/recommend/ticket-support-response-time-benchmarks/) | 售后与资料质量 | 新手友好机场 | recommend |
| 新手易懂的自然月与账单月流量重置规则解析 | [/recommend/beginner-friendly-traffic-reset-rules/](/recommend/beginner-friendly-traffic-reset-rules/) | 售后与资料质量 | 新手友好机场 | recommend |
| 月付5元到15元便宜机场的真实体验边界与风险预警 | [/recommend/budget-airport-first-payment-thresholds/](/recommend/budget-airport-first-payment-thresholds/) | 低门槛首次付款 | 便宜机场与总使用成本 | recommend |
| 便宜机场年付陷阱识别：为什么新手切勿轻信三年付超低价 | [/recommend/avoid-annual-lock-in-cheap-airports/](/recommend/avoid-annual-lock-in-cheap-airports/) | 低门槛首次付款 | 便宜机场与总使用成本 | recommend |
| 百兆与千兆共享带宽比率背后的真实峰值吞吐量 | [/recommend/cheap-airport-bandwidth-sharing-ratios/](/recommend/cheap-airport-bandwidth-sharing-ratios/) | 低门槛首次付款 | 便宜机场与总使用成本 | recommend |
| 预算有限时：优先选节点数量还是优先选线路可用率 | [/recommend/budget-tradeoffs-nodes-vs-sla-uptime/](/recommend/budget-tradeoffs-nodes-vs-sla-uptime/) | 同预算服务取舍 | 便宜机场与总使用成本 | recommend |
| 低价机场在晚高峰20:00-23:00的抗丢包能力评估 | [/recommend/cheap-airport-peak-hour-speed-drops/](/recommend/cheap-airport-peak-hour-speed-drops/) | 同预算服务取舍 | 便宜机场与总使用成本 | recommend |
| 便宜机场用户如何低成本自建双机场容灾备用方案 | [/recommend/budget-airport-disaster-recovery-options/](/recommend/budget-airport-disaster-recovery-options/) | 同预算服务取舍 | 便宜机场与总使用成本 | recommend |
| 主线路故障时备用机场的挑选策略与待机维护成本 | [/recommend/backup-airport-selection-for-emergency/](/recommend/backup-airport-selection-for-emergency/) | 低频与备用用途 | 低频与灵活流量方案 | recommend |
| 低频用户长期不使用时的账号保留规则与保活要求 | [/recommend/low-frequency-user-traffic-decay-rules/](/recommend/low-frequency-user-traffic-decay-rules/) | 低频与备用用途 | 低频与灵活流量方案 | recommend |
| 出差临时应急场景下小容量即开即用机场推荐 | [/recommend/emergency-hotspot-lightweight-airports/](/recommend/emergency-hotspot-lightweight-airports/) | 低频与备用用途 | 低频与灵活流量方案 | recommend |
| 不限时按量付费机场的计费口径与单GB综合单价对比 | [/recommend/pay-as-you-go-no-expiration-airports/](/recommend/pay-as-you-go-no-expiration-airports/) | 按量与不限时条件 | 低频与灵活流量方案 | recommend |
| 高倍率节点对按量付费余额的消耗陷阱与防范技巧 | [/recommend/multiplier-nodes-in-pay-as-you-go/](/recommend/multiplier-nodes-in-pay-as-you-go/) | 按量与不限时条件 | 低频与灵活流量方案 | recommend |
| 不限时套餐节点池更新频率与长效连通率核查 | [/recommend/pay-as-you-go-node-pool-maintenance-check/](/recommend/pay-as-you-go-node-pool-maintenance-check/) | 按量与不限时条件 | 低频与灵活流量方案 | recommend |
| 同时在线设备数与出口公网IP限制的实际计算规则 | [/recommend/simultaneous-device-limits-and-ip-rules/](/recommend/simultaneous-device-limits-and-ip-rules/) | 设备与连接限制 | 多设备与软路由机场 | recommend |
| 家庭与团队多人共享场景下防止账号封禁的挑选规范 | [/recommend/family-sharing-multi-user-airport-fit/](/recommend/family-sharing-multi-user-airport-fit/) | 设备与连接限制 | 多设备与软路由机场 | recommend |
| 并发连接数超限引起的节点短暂阻断现象与阈值考量 | [/recommend/tcp-udp-concurrency-limits-per-account/](/recommend/tcp-udp-concurrency-limits-per-account/) | 设备与连接限制 | 多设备与软路由机场 | recommend |
| OpenClash与PassWall软路由部署对机场订阅的特殊要求 | [/recommend/openwrt-passwall-openclash-airport-fit/](/recommend/openwrt-passwall-openclash-airport-fit/) | 路由器接入条件 | 多设备与软路由机场 | recommend |
| 软路由NAT类型与FullCone UDP对游戏主机加速的支持 | [/recommend/router-udp-fullcone-gaming-airport-check/](/recommend/router-udp-fullcone-gaming-airport-check/) | 路由器接入条件 | 多设备与软路由机场 | recommend |
| 全屋智能家居环境网关旁路运行时的机场稳定性压力 | [/recommend/home-gateway-bypass-performance-stress/](/recommend/home-gateway-bypass-performance-stress/) | 路由器接入条件 | 多设备与软路由机场 | recommend |
| ChatGPT与Claude等AI工具对原生IP纯净度与欺诈值的要求 | [/recommend/chatgpt-claude-ai-clean-ip-airports/](/recommend/chatgpt-claude-ai-clean-ip-airports/) | 办公与AI需求 | 办公、AI与视频任务适配 | recommend |
| 开发者远程代码拉取与SSH连接长久保活的线路要求 | [/recommend/github-remote-dev-ssh-airport-stability/](/recommend/github-remote-dev-ssh-airport-stability/) | 办公与AI需求 | 办公、AI与视频任务适配 | recommend |
| 跨国视频会议Zoom与Teams对抖动与丢包率的底线指标 | [/recommend/remote-office-zoom-teams-jitter-thresholds/](/recommend/remote-office-zoom-teams-jitter-thresholds/) | 办公与AI需求 | 办公、AI与视频任务适配 | recommend |
| 4K超高清视频流媒体解锁与动态DNS证书检测 | [/recommend/netflix-disney-youtube-4k-airports/](/recommend/netflix-disney-youtube-4k-airports/) | 视频与高峰条件 | 办公、AI与视频任务适配 | recommend |
| 晚高峰期IPLC专线、IEPL专线与普通公网中转体验差异 | [/recommend/peak-hour-iplc-iepl-transit-lines-guide/](/recommend/peak-hour-iplc-iepl-transit-lines-guide/) | 视频与高峰条件 | 办公、AI与视频任务适配 | recommend |
| 不同地区流媒体分流节点广播IP与原生机房IP的辨识 | [/recommend/regional-content-streaming-ip-types/](/recommend/regional-content-streaming-ip-types/) | 视频与高峰条件 | 办公、AI与视频任务适配 | recommend |
| 开源社区与公共节点订阅的存活周期与带宽限制分析 | [/free/community-public-nodes-survival-time/](/free/community-public-nodes-survival-time/) | 免费资格与供给 | 长期免费与公益资源 | free |
| 网络爬虫抓取的全网免费节点池质量现状与可用率 | [/free/public-node-harvesting-mechanisms/](/free/public-node-harvesting-mechanisms/) | 免费资格与供给 | 长期免费与公益资源 | free |
| 学术与教育科研公益镜像代理的申请资格与边界 | [/free/education-and-academic-proxy-access/](/free/education-and-academic-proxy-access/) | 免费资格与供给 | 长期免费与公益资源 | free |
| 公益节点无预警失效背后的IP阻断与服务器欠费机制 | [/free/public-proxy-abrupt-downtime-reasons/](/free/public-proxy-abrupt-downtime-reasons/) | 维护与变动 | 长期免费与公益资源 | free |
| 如何寻找并跟踪维护者持续更新的长期免费订阅源 | [/free/how-to-track-reliable-free-sub-sources/](/free/how-to-track-reliable-free-sub-sources/) | 维护与变动 | 长期免费与公益资源 | free |
| 公益节点晚高峰自动化限流策略与排队机制解析 | [/free/free-proxy-bandwidth-throttling-hours/](/free/free-proxy-bandwidth-throttling-hours/) | 维护与变动 | 长期免费与公益资源 | free |
| 商业机场1至3天免费试用套餐的领取与节点激活步骤 | [/free/airport-free-trial-onboarding-steps/](/free/airport-free-trial-onboarding-steps/) | 激活与测试安排 | 机场免费试用 | free |
| 如何在有限试用期内科学完成节点测速与应用适配验证 | [/free/plan-effective-trial-speed-testing/](/free/plan-effective-trial-speed-testing/) | 激活与测试安排 | 机场免费试用 | free |
| 防范试用陷阱：核验试用套餐是否被故意分配至低速节点池 | [/free/trial-package-node-discrimination-check/](/free/trial-package-node-discrimination-check/) | 激活与测试安排 | 机场免费试用 | free |
| 免费试用时手机号绑定与临时邮箱防护机制的利弊 | [/free/mobile-binding-and-email-verification-trials/](/free/mobile-binding-and-email-verification-trials/) | 领取资格 | 机场免费试用 | free |
| 机场防御多次领取的设备指纹与IP频次限制原理解析 | [/free/anti-abuse-device-fingerprint-in-trials/](/free/anti-abuse-device-fingerprint-in-trials/) | 领取资格 | 机场免费试用 | free |
| 绑定信用卡开启免费试用时的自动续费扣款防范 | [/free/credit-card-free-trials-risk-assessment/](/free/credit-card-free-trials-risk-assessment/) | 领取资格 | 机场免费试用 | free |
| 注册即送5G到100G流量的真实发放形式与提取流程 | [/free/sign-up-bonus-traffic-collection-tips/](/free/sign-up-bonus-traffic-collection-tips/) | 赠送类型与到账 | 注册赠送与活动流量 | free |
| 每日签到赠送随机流量的算法机制与累积上限说明 | [/free/daily-check-in-traffic-draw-rules/](/free/daily-check-in-traffic-draw-rules/) | 赠送类型与到账 | 注册赠送与活动流量 | free |
| 节日促销赠送金额抵扣券与免费流量包的兑换规范 | [/free/promotional-holiday-coupons-and-credits/](/free/promotional-holiday-coupons-and-credits/) | 赠送类型与到账 | 注册赠送与活动流量 | free |
| 注册赠送流量的有效期限制：次月清零与阶段性回收 | [/free/bonus-traffic-expiration-and-reset/](/free/bonus-traffic-expiration-and-reset/) | 赠送有效规则 | 注册赠送与活动流量 | free |
| 赠送流量是否支持全量节点：限制中转与专线节点解读 | [/free/bonus-traffic-node-access-permissions/](/free/bonus-traffic-node-access-permissions/) | 赠送有效规则 | 注册赠送与活动流量 | free |
| 长期不活动用户赠送余额被系统回收的预防方法 | [/free/inactive-account-traffic-clawback-policy/](/free/inactive-account-traffic-clawback-policy/) | 赠送有效规则 | 注册赠送与活动流量 | free |
| GitHub上发布的Clash免费Raw订阅源的安全性与可用性 | [/free/clash-raw-yaml-free-sources-eval/](/free/clash-raw-yaml-free-sources-eval/) | 资源形态 | 免费节点与订阅来源 | free |
| Base64编码单节点链接聚合列表的解析与去重技术 | [/free/base64-plain-text-free-node-lists/](/free/base64-plain-text-free-node-lists/) | 资源形态 | 免费节点与订阅来源 | free |
| 电报频道每日分享节点文本的有效时限与混淆欺诈 | [/free/telegram-channel-node-feed-risks/](/free/telegram-channel-node-feed-risks/) | 资源形态 | 免费节点与订阅来源 | free |
| 如何通过IP归属地与ASN核验免费节点的真实托管服务商 | [/free/how-to-verify-free-node-origin-servers/](/free/how-to-verify-free-node-origin-servers/) | 来源核验 | 免费节点与订阅来源 | free |
| 识别自动化批量收割仓库中的失效节点与僵尸配置 | [/free/automated-node-harvesting-repo-filters/](/free/automated-node-harvesting-repo-filters/) | 来源核验 | 免费节点与订阅来源 | free |
| 公开订阅链接中内置恶意DNS服务器地址的审查手段 | [/free/dns-hijacking-risks-in-public-subscriptions/](/free/dns-hijacking-risks-in-public-subscriptions/) | 来源核验 | 免费节点与订阅来源 | free |
| 免费流量额度真相：1GB与50GB实际能支撑哪些任务 | [/free/realistic-expectations-for-free-traffic/](/free/realistic-expectations-for-free-traffic/) | 流量额度 | 免费套餐流量与限速 | free |
| 免费节点流量计算倍率不透明导致的提早断网 | [/free/traffic-calculation-discrepancies-in-free/](/free/traffic-calculation-discrepancies-in-free/) | 流量额度 | 免费套餐流量与限速 | free |
| 使用免费微小流量时如何关闭系统静默背景消耗 | [/free/background-app-traffic-consumption-defense/](/free/background-app-traffic-consumption-defense/) | 流量额度 | 免费套餐流量与限速 | free |
| 免费节点普遍存在的2Mbps限速机制及其对网页加载的影响 | [/free/free-tier-bandwidth-shaping-at-2mbps/](/free/free-tier-bandwidth-shaping-at-2mbps/) | 速度与功能限制 | 免费套餐流量与限速 | free |
| 免费节点默认关闭UDP转发导致的通话与联机失效 | [/free/udp-forwarding-disabled-on-free-nodes/](/free/udp-forwarding-disabled-on-free-nodes/) | 速度与功能限制 | 免费套餐流量与限速 | free |
| 免费套餐连接数限制在5到10个时的浏览器分页崩溃 | [/free/maximum-active-connections-cap-free/](/free/maximum-active-connections-cap-free/) | 速度与功能限制 | 免费套餐流量与限速 | free |
| 如何将散落的免费vmess://链接安全导入Clash客户端 | [/free/importing-raw-free-nodes-to-clash/](/free/importing-raw-free-nodes-to-clash/) | 格式匹配 | 免费资源客户端适配 | free |
| 免费订阅转换为sing-box配置时的语法报错规避 | [/free/convert-free-sub-links-to-singbox-json/](/free/convert-free-sub-links-to-singbox-json/) | 格式匹配 | 免费资源客户端适配 | free |
| v2rayN从剪贴板批量导入上百个免费节点的清洗操作 | [/free/v2rayn-clipboard-import-free-nodes/](/free/v2rayn-clipboard-import-free-nodes/) | 格式匹配 | 免费资源客户端适配 | free |
| 借助第三方公开Subconverter转换免费订阅的安全风险 | [/free/third-party-subconverter-privacy-leaks/](/free/third-party-subconverter-privacy-leaks/) | 获取与交付 | 免费资源客户端适配 | free |
| 使用本地轻量脚本去重并过滤不可达的免费节点 | [/free/local-python-script-free-sub-dedup/](/free/local-python-script-free-sub-dedup/) | 获取与交付 | 免费资源客户端适配 | free |
| 网络中断前在客户端本地留存可用免费节点的备份技巧 | [/free/offline-free-node-backup-in-client/](/free/offline-free-node-backup-in-client/) | 获取与交付 | 免费资源客户端适配 | free |
| 仅用于Google查阅学术资料时免费节点的最小配置 | [/free/using-free-nodes-for-google-search-only/](/free/using-free-nodes-for-google-search-only/) | 轻度任务 | 免费方案适用场景 | free |
| 利用免费节点加速GitHub代码克隆与Releases下载 | [/free/github-raw-download-acceleration-free/](/free/github-raw-download-acceleration-free/) | 轻度任务 | 免费方案适用场景 | free |
| 收发即时文字通讯时免费节点的保活与网络消耗 | [/free/lightweight-messaging-tg-whatsapp-free/](/free/lightweight-messaging-tg-whatsapp-free/) | 轻度任务 | 免费方案适用场景 | free |
| 用免费试用跑通整套客户端流程后再做付费决策的步骤 | [/free/using-free-trials-to-test-client-setup/](/free/using-free-trials-to-test-client-setup/) | 购买前体验目标 | 免费方案适用场景 | free |
| 在电信、联通与移动宽带下分别用免费节点测试连通 | [/free/compare-isp-compatibility-using-trials/](/free/compare-isp-compatibility-using-trials/) | 购买前体验目标 | 免费方案适用场景 | free |
| 通过免费测试排除路由器与网卡问题确保证明 | [/free/identifying-device-bottlenecks-with-free/](/free/identifying-device-bottlenecks-with-free/) | 购买前体验目标 | 免费方案适用场景 | free |
| 为什么绝对不能通过免费公共节点进行在线支付与密码输入 | [/free/avoid-entering-personal-data-over-free-nodes/](/free/avoid-entering-personal-data-over-free-nodes/) | 链接与账户保护 | 免费资源隐私与安全 | free |
| 公共未核验节点中间人篡改明文流量与证书劫持防范 | [/free/mitm-attack-risks-on-unverified-nodes/](/free/mitm-attack-risks-on-unverified-nodes/) | 链接与账户保护 | 免费资源隐私与安全 | free |
| 免费节点运营者抓取客户端真实连接IP的技术事实 | [/free/protecting-origin-ip-from-free-node-logs/](/free/protecting-origin-ip-from-free-node-logs/) | 链接与账户保护 | 免费资源隐私与安全 | free |
| 使用免费代理时严禁安装任何未知机构根证书的警示 | [/free/never-install-root-ca-from-free-providers/](/free/never-install-root-ca-from-free-providers/) | 权限与信任判断 | 免费资源隐私与安全 | free |
| 在免费节点下开启浏览器WebRTC防护防止真实内网暴露 | [/free/browser-webrtc-leak-protection-free/](/free/browser-webrtc-leak-protection-free/) | 权限与信任判断 | 免费资源隐私与安全 | free |
| 评估开源社区公开发布者的信誉与安全历史 | [/free/evaluating-reputation-of-community-proxies/](/free/evaluating-reputation-of-community-proxies/) | 权限与信任判断 | 免费资源隐私与安全 | free |
| 免费账号仅允许单设备登录时的设备抢占排查 | [/free/managing-single-device-limits-on-free/](/free/managing-single-device-limits-on-free/) | 资格与设备规则 | 免费资格与账户管理 | free |
| 防止免费账号触发滥用防御规则被封禁的注意事项 | [/free/preventing-accidental-ban-on-free-tiers/](/free/preventing-accidental-ban-on-free-tiers/) | 资格与设备规则 | 免费资格与账户管理 | free |
| 注册免费试用网站时的独立密码管理与防关联建议 | [/free/password-hygiene-for-free-trial-portals/](/free/password-hygiene-for-free-trial-portals/) | 资格与设备规则 | 免费资格与账户管理 | free |
| 免费试用结束后注销账号并清除面板绑定的全流程 | [/free/how-to-safely-delete-free-trial-accounts/](/free/how-to-safely-delete-free-trial-accounts/) | 取消与资料处理 | 免费资格与账户管理 | free |
| 撤销与免费机场绑定的Telegram机器人通知授权 | [/free/revoking-telegram-bot-authorizations/](/free/revoking-telegram-bot-authorizations/) | 取消与资料处理 | 免费资格与账户管理 | free |
| 在各客户端中彻底清理过期失效的免费订阅URL缓存 | [/free/cleaning-up-stale-free-sub-urls-in-apps/](/free/cleaning-up-stale-free-sub-urls-in-apps/) | 取消与资料处理 | 免费资格与账户管理 | free |
| 免费节点大面积突然变红不可达的三大技术归因 | [/free/why-free-nodes-stop-working-suddenly/](/free/why-free-nodes-stop-working-suddenly/) | 失效原因分类 | 资源失效与后续选择 | free |
| 针对免费节点的SNI精准探测阻断与IP空路由现象 | [/free/sni-blocking-and-ip-null-routing-free/](/free/sni-blocking-and-ip-null-routing-free/) | 失效原因分类 | 资源失效与后续选择 | free |
| 区分是自身客户端配置错误还是服务器端流量耗尽 | [/free/identifying-server-side-traffic-exhaustion/](/free/identifying-server-side-traffic-exhaustion/) | 失效原因分类 | 资源失效与后续选择 | free |
| 每天寻找维护免费节点的时间成本与付费服务的性价比账本 | [/free/the-true-time-cost-of-hunting-free-nodes/](/free/the-true-time-cost-of-hunting-free-nodes/) | 免费与付费取舍 | 资源失效与后续选择 | free |
| 何时应该从免费方案平滑过渡到每月10元的轻量付费服务 | [/free/when-to-transition-from-free-to-budget-paid/](/free/when-to-transition-from-free-to-budget-paid/) | 免费与付费取舍 | 资源失效与后续选择 | free |
| 首个付费入门方案必须满足的五个基本参数 | [/free/minimum-paid-tier-checklist-for-starters/](/free/minimum-paid-tier-checklist-for-starters/) | 免费与付费取舍 | 资源失效与后续选择 | free |
| Windows代理客户端安装版与便携版怎么下载：文件形态与适用情况 | [/clients/windows-installer-vs-portable-zip-guide/](/clients/windows-installer-vs-portable-zip-guide/) | 安装包形态 | Windows 客户端 | clients |
| Windows电脑该选x64、ARM64还是其他安装包：下载前核对方法 | [/clients/windows-x64-arm64-architecture-picker/](/clients/windows-x64-arm64-architecture-picker/) | 安装包形态 | Windows 客户端 | clients |
| 客户端同时提供含运行库和精简包时，应该下载哪一个？ | [/clients/setup-exe-with-runtime-vs-slim-packages/](/clients/setup-exe-with-runtime-vs-slim-packages/) | 安装包形态 | Windows 客户端 | clients |
| Windows 10与Windows 11各版本代理客户端驱动与内核兼容表 | [/clients/windows-10-vs-windows-11-client-readiness/](/clients/windows-10-vs-windows-11-client-readiness/) | 系统支持资料 | Windows 客户端 | clients |
| Windows 7与老旧系统上可继续运行的客户端版本归档 | [/clients/windows-7-legacy-proxy-client-options/](/clients/windows-7-legacy-proxy-client-options/) | 系统支持资料 | Windows 客户端 | clients |
| Wintun虚拟网卡驱动在不同Windows版本下的签名支持 | [/clients/wintun-driver-compatibility-on-windows/](/clients/wintun-driver-compatibility-on-windows/) | 系统支持资料 | Windows 客户端 | clients |
| Google Play商店版与GitHub发布版APK功能差异核对 | [/clients/google-play-vs-github-apk-differences/](/clients/google-play-vs-github-apk-differences/) | 应用商店与发布包 | Android 客户端 | clients |
| 警惕应用商店中的套壳仿冒客户端：官方作者识别技巧 | [/clients/identifying-fake-proxy-apps-on-playstore/](/clients/identifying-fake-proxy-apps-on-playstore/) | 应用商店与发布包 | Android 客户端 | clients |
| 无Google框架的国产Android手机安全下载独立APK指南 | [/clients/downloading-standalone-apk-without-google/](/clients/downloading-standalone-apk-without-google/) | 应用商店与发布包 | Android 客户端 | clients |
| v2rayNG下载该选arm64-v8a还是universal通用架构包 | [/clients/v2rayng-arm64-v8a-vs-universal-apk/](/clients/v2rayng-arm64-v8a-vs-universal-apk/) | 版本与分支 | Android 客户端 | clients |
| Clash Meta for Android正式版与预发布版分支取舍 | [/clients/clash-meta-android-release-channel-guide/](/clients/clash-meta-android-release-channel-guide/) | 版本与分支 | Android 客户端 | clients |
| Hiddify Android稳定版与Nightly构建包的稳定性对照 | [/clients/hiddify-android-nightly-vs-stable-builds/](/clients/hiddify-android-nightly-vs-stable-builds/) | 版本与分支 | Android 客户端 | clients |
| 认准正版Shadowrocket：官方开发者与App Store唯一识别码 | [/clients/shadowrocket-official-app-store-identifier/](/clients/shadowrocket-official-app-store-identifier/) | 商店条目识别 | iPhone 与 iPad 客户端 | clients |
| iOS四大进阶网络工具Surge、Loon、Stash与QX身份核验 | [/clients/surge-loon-stash-quantumult-x-overview/](/clients/surge-loon-stash-quantumult-x-overview/) | 商店条目识别 | iPhone 与 iPad 客户端 | clients |
| sing-box在iOS平台的TestFlight公测与正式App Store入口 | [/clients/singbox-ios-testflight-and-appstore-entry/](/clients/singbox-ios-testflight-and-appstore-entry/) | 商店条目识别 | iPhone 与 iPad 客户端 | clients |
| 非国区Apple ID下载客户端的安全流程与礼品卡充值须知 | [/clients/us-region-apple-id-client-download-guide/](/clients/us-region-apple-id-client-download-guide/) | 分发条件与购买记录 | iPhone 与 iPad 客户端 | clients |
| 网上共享Apple ID下载小火箭导致设备被锁的风险与防范 | [/clients/shared-apple-id-security-risks-for-ios/](/clients/shared-apple-id-security-risks-for-ios/) | 分发条件与购买记录 | iPhone 与 iPad 客户端 | clients |
| 换新iPhone后如何使用已购项目恢复已付费代理软件 | [/clients/restoring-in-app-purchases-on-new-iphone/](/clients/restoring-in-app-purchases-on-new-iphone/) | 分发条件与购买记录 | iPhone 与 iPad 客户端 | clients |
| M1/M2/M3 Apple Silicon与Intel芯片该下载哪个macOS包 | [/clients/apple-silicon-m-series-vs-intel-pkg-choice/](/clients/apple-silicon-m-series-vs-intel-pkg-choice/) | 芯片与构建类型 | macOS 客户端 | clients |
| macOS通用二进制包与单架构原生构建的内存占用分析 | [/clients/universal-binary-macos-proxy-performance/](/clients/universal-binary-macos-proxy-performance/) | 芯片与构建类型 | macOS 客户端 | clients |
| 使用Rosetta转译运行老旧x64客户端的性能与续航损耗 | [/clients/rosetta-translation-overhead-for-clients/](/clients/rosetta-translation-overhead-for-clients/) | 芯片与构建类型 | macOS 客户端 | clients |
| macOS提示“无法打开因为无法验证开发者”的正规解法 | [/clients/bypass-macos-gatekeeper-unidentified-dev/](/clients/bypass-macos-gatekeeper-unidentified-dev/) | 系统与签名资料 | macOS 客户端 | clients |
| DMG直接拖入Applications与Homebrew Cask安装的优劣 | [/clients/dmg-drag-install-vs-homebrew-cask-macos/](/clients/dmg-drag-install-vs-homebrew-cask-macos/) | 系统与签名资料 | macOS 客户端 | clients |
| macOS系统网络扩展授权与Helper工具安装官方指引 | [/clients/system-network-extension-permissions-mac/](/clients/system-network-extension-permissions-mac/) | 系统与签名资料 | macOS 客户端 | clients |
| Ubuntu、Debian、Fedora该下载deb、rpm还是AppImage | [/clients/linux-deb-rpm-appimage-tar-gz-picker/](/clients/linux-deb-rpm-appimage-tar-gz-picker/) | 发行包类型 | Linux 客户端 | clients |
| Arch Linux通过AUR安装维护Clash Verge与sing-box | [/clients/arch-linux-aur-proxy-client-maintenance/](/clients/arch-linux-aur-proxy-client-maintenance/) | 发行包类型 | Linux 客户端 | clients |
| Flatpak与Snap沙盒打包客户端在网络权限上的特殊限制 | [/clients/flatpak-snap-sandbox-limitations-proxy/](/clients/flatpak-snap-sandbox-limitations-proxy/) | 发行包类型 | Linux 客户端 | clients |
| 官方APT/YUM镜像源配置与签名公钥导入步骤 | [/clients/official-ppa-and-apt-repos-for-clients/](/clients/official-ppa-and-apt-repos-for-clients/) | 软件源与维护 | Linux 客户端 | clients |
| Linux无头服务器仅下载CLI独立核心的轻量化实践 | [/clients/headless-server-cli-core-download-guide/](/clients/headless-server-cli-core-download-guide/) | 软件源与维护 | Linux 客户端 | clients |
| Linux下为代理核心手动编写systemd后台服务守护单元 | [/clients/systemd-service-file-integration-for-linux/](/clients/systemd-service-file-integration-for-linux/) | 软件源与维护 | Linux 客户端 | clients |
| OpenWrt固件下载OpenClash对应CPU架构IPK包指引 | [/clients/openwrt-luci-app-openclash-ipk-download/](/clients/openwrt-luci-app-openclash-ipk-download/) | 固件与硬件匹配 | 软路由与网络设备客户端 | clients |
| PassWall与SSR-Plus插件安装包与依赖核心版本核对 | [/clients/passwall-ssr-plus-plugin-source-matching/](/clients/passwall-ssr-plus-plugin-source-matching/) | 固件与硬件匹配 | 软路由与网络设备客户端 | clients |
| GL.iNet便携路由器内置代理功能的固件更新与插件补充 | [/clients/gl-inet-router-native-proxy-client-guide/](/clients/gl-inet-router-native-proxy-client-guide/) | 固件与硬件匹配 | 软路由与网络设备客户端 | clients |
| 如何在GitHub Releases安全核对路由器插件的MD5与SHA256 | [/clients/verifying-openwrt-plugin-github-releases/](/clients/verifying-openwrt-plugin-github-releases/) | 插件与更新来源 | 软路由与网络设备客户端 | clients |
| 软路由断网环境下离线上传并安装核心依赖包 | [/clients/offline-ipk-dependency-manual-install/](/clients/offline-ipk-dependency-manual-install/) | 插件与更新来源 | 软路由与网络设备客户端 | clients |
| 华硕梅林固件软件中心相关代理插件的当前维护现状 | [/clients/asuswrt-merlin-koolshare-client-status/](/clients/asuswrt-merlin-koolshare-client-status/) | 插件与更新来源 | 软路由与网络设备客户端 | clients |
| 认准Clash Verge Rev唯一官方仓库与衍生分叉辨析 | [/clients/clash-verge-rev-official-github-repo/](/clients/clash-verge-rev-official-github-repo/) | 项目与分支身份 | Clash 系软件下载资料 | clients |
| Clash Nyanpasu项目定位、特色UI与下载渠道说明 | [/clients/clash-nyanpasu-features-and-download-entry/](/clients/clash-nyanpasu-features-and-download-entry/) | 项目与分支身份 | Clash 系软件下载资料 | clients |
| FlClash基于Flutter的多平台统一客户端版本下载 | [/clients/flclash-cross-platform-releases-overview/](/clients/flclash-cross-platform-releases-overview/) | 项目与分支身份 | Clash 系软件下载资料 | clients |
| 已归档停更的Clash for Windows历史版本安全风险提示 | [/clients/archived-clash-for-windows-safety-alert/](/clients/archived-clash-for-windows-safety-alert/) | 维护状态与历史 | Clash 系软件下载资料 | clients |
| 原版Clash Premium核心与开源Mihomo核心的谱系演进 | [/clients/clash-core-vs-mihomo-meta-kernel-lineage/](/clients/clash-core-vs-mihomo-meta-kernel-lineage/) | 维护状态与历史 | Clash 系软件下载资料 | clients |
| 通过提交记录和Issue响应判断某个Clash分支是否弃坑 | [/clients/how-to-check-if-a-clash-fork-is-abandoned/](/clients/how-to-check-if-a-clash-fork-is-abandoned/) | 维护状态与历史 | Clash 系软件下载资料 | clients |
| v2rayN发布页With-Core与普通Zip包的区别与下载选择 | [/clients/v2rayn-with-core-vs-without-core-zip/](/clients/v2rayn-with-core-vs-without-core-zip/) | 客户端发布文件 | v2rayN 与 Xray 客户端资料 | clients |
| v2rayNG GitHub Releases列表中各APK包命名后缀详解 | [/clients/v2rayng-apk-github-assets-explained/](/clients/v2rayng-apk-github-assets-explained/) | 客户端发布文件 | v2rayN 与 Xray 客户端资料 | clients |
| NekoRay与NekoBox项目现状及跨平台归档版本获取 | [/clients/nekoray-nekobox-releases-archive-status/](/clients/nekoray-nekobox-releases-archive-status/) | 客户端发布文件 | v2rayN 与 Xray 客户端资料 | clients |
| Xray-core官方二进制文件的下载与版本匹配原则 | [/clients/xray-core-official-releases-and-download/](/clients/xray-core-official-releases-and-download/) | 内置与外置核心 | v2rayN 与 Xray 客户端资料 | clients |
| 如何在v2rayN根目录手动替换并升级最新版Xray核心 | [/clients/manually-updating-xray-core-in-v2rayn/](/clients/manually-updating-xray-core-in-v2rayn/) | 内置与外置核心 | v2rayN 与 Xray 客户端资料 | clients |
| 独立下载更新GeoIP.dat与GeoSite.dat路由规则数据库 | [/clients/geoip-dat-and-geosite-dat-database-update/](/clients/geoip-dat-and-geosite-dat-database-update/) | 内置与外置核心 | v2rayN 与 Xray 客户端资料 | clients |
| sing-box独立命令行核心与带UI图形界面的下载区分 | [/clients/singbox-core-cli-vs-gui-client-downloads/](/clients/singbox-core-cli-vs-gui-client-downloads/) | 项目与客户端边界 | sing-box 与跨平台软件资料 | clients |
| Hiddify跨平台客户端在各操作系统的正式下载渠道 | [/clients/hiddify-app-releases-multi-platform-matrix/](/clients/hiddify-app-releases-multi-platform-matrix/) | 项目与客户端边界 | sing-box 与跨平台软件资料 | clients |
| Karing多协议客户端项目背景与官方分发地址核验 | [/clients/karing-multi-protocol-client-official-source/](/clients/karing-multi-protocol-client-official-source/) | 项目与客户端边界 | sing-box 与跨平台软件资料 | clients |
| sing-box包含with_gvisor与with_quic的特殊编译版本 | [/clients/singbox-tags-and-experimental-features-build/](/clients/singbox-tags-and-experimental-features-build/) | 构建覆盖与说明 | sing-box 与跨平台软件资料 | clients |
| Hiddify桌面独立安装包与微软应用商店版本的优劣 | [/clients/hiddify-desktop-standalone-vs-store-versions/](/clients/hiddify-desktop-standalone-vs-store-versions/) | 构建覆盖与说明 | sing-box 与跨平台软件资料 | clients |
| 在sing-box发布列表中避开开发测试包选择稳定版 | [/clients/identifying-nightly-pre-releases-in-singbox/](/clients/identifying-nightly-pre-releases-in-singbox/) | 构建覆盖与说明 | sing-box 与跨平台软件资料 | clients |
| 在Windows和Mac终端上校验下载文件的SHA256哈希值 | [/clients/verify-client-sha256-checksum-windows-mac/](/clients/verify-client-sha256-checksum-windows-mac/) | 签名与校验 | 安全下载与版本留档 | clients |
| 使用GPG密钥验证Linux代理软件发布包的完整性 | [/clients/gpg-signature-verification-for-linux-proxy/](/clients/gpg-signature-verification-for-linux-proxy/) | 签名与校验 | 安全下载与版本留档 | clients |
| 识别带有后门与键盘记录器的虚假代理安装包特征 | [/clients/detecting-trojan-infected-proxy-installers/](/clients/detecting-trojan-infected-proxy-installers/) | 签名与校验 | 安全下载与版本留档 | clients |
| 开源仓库被封或删除后从官方镜像归档安全下载的方法 | [/clients/downloading-archived-releases-when-repo-deleted/](/clients/downloading-archived-releases-when-repo-deleted/) | 历史版本与归档 | 安全下载与版本留档 | clients |
| 利用Wayback Machine核查软件发布历史与官方域名变迁 | [/clients/wayback-machine-and-github-archive-usage/](/clients/wayback-machine-and-github-archive-usage/) | 历史版本与归档 | 安全下载与版本留档 | clients |
| 在本地构建个人受信代理客户端已知良好版本备份库 | [/clients/maintaining-local-known-good-installer-vault/](/clients/maintaining-local-known-good-installer-vault/) | 历史版本与归档 | 安全下载与版本留档 | clients |
| Clash Verge Rev在Windows 11上的安装与首次启动教程 | [/install/clash-verge-rev-windows-setup-walkthrough/](/install/clash-verge-rev-windows-setup-walkthrough/) | 安装与首次启动 | Clash Verge Rev 安装 | install |
| Clash Verge Rev在macOS上的安装与辅助功能权限授予 | [/install/clash-verge-rev-macos-dmg-install-guide/](/install/clash-verge-rev-macos-dmg-install-guide/) | 安装与首次启动 | Clash Verge Rev 安装 | install |
| 首次运行Clash Verge Rev切换中文界面与核对Mihomo核心 | [/install/clash-verge-rev-first-run-language-and-kernel/](/install/clash-verge-rev-first-run-language-and-kernel/) | 安装与首次启动 | Clash Verge Rev 安装 | install |
| 安装Clash Verge服务模式(Service Mode)以启用TUN虚拟网卡 | [/install/install-verge-service-mode-for-tun/](/install/install-verge-service-mode-for-tun/) | 后台服务与退出 | Clash Verge Rev 安装 | install |
| 配置开机无感静默自启与最小化到系统托盘 | [/install/clash-verge-rev-auto-start-on-boot-config/](/install/clash-verge-rev-auto-start-on-boot-config/) | 后台服务与退出 | Clash Verge Rev 安装 | install |
| 彻底退出Clash Verge Rev并自动恢复Windows系统代理 | [/install/clean-exit-and-system-proxy-reset-verge/](/install/clean-exit-and-system-proxy-reset-verge/) | 后台服务与退出 | Clash Verge Rev 安装 | install |
| v2rayN解压路径选择：避开中文目录与系统C盘权限坑 | [/install/v2rayn-extract-and-folder-permissions/](/install/v2rayn-extract-and-folder-permissions/) | 解压与运行环境 | v2rayN 安装 | install |
| 安装v2rayN必备的Microsoft .NET 8 Desktop Runtime | [/install/dotnet-desktop-runtime-install-for-v2rayn/](/install/dotnet-desktop-runtime-install-for-v2rayn/) | 解压与运行环境 | v2rayN 安装 | install |
| v2rayN初次启动托盘图标变色逻辑与主界面基础布局 | [/install/v2rayn-initial-settings-and-tray-icon/](/install/v2rayn-initial-settings-and-tray-icon/) | 解压与运行环境 | v2rayN 安装 | install |
| 在v2rayN中选定默认运行核心：Xray与sing-box的切换 | [/install/v2rayn-select-default-core-xray-vs-singbox/](/install/v2rayn-select-default-core-xray-vs-singbox/) | 核心启动与基础验收 | v2rayN 安装 | install |
| 检查v2rayN核心是否正常监听10808与10809本地端口 | [/install/verifying-v2rayn-core-listen-ports/](/install/verifying-v2rayn-core-listen-ports/) | 核心启动与基础验收 | v2rayN 安装 | install |
| 处理Windows Defender安全中心首次弹出的防火墙网络许可 | [/install/v2rayn-first-start-firewall-prompt-handling/](/install/v2rayn-first-start-firewall-prompt-handling/) | 核心启动与基础验收 | v2rayN 安装 | install |
| Android手机侧载安装v2rayNG APK安装包图文流程 | [/install/v2rayng-sideload-install-on-android/](/install/v2rayng-sideload-install-on-android/) | 安装包与应用初始化 | v2rayNG 安装 | install |
| v2rayNG首次打开设置默认界面语言与分流策略 | [/install/v2rayng-first-open-ui-and-language-setup/](/install/v2rayng-first-open-ui-and-language-setup/) | 安装包与应用初始化 | v2rayNG 安装 | install |
| 授予外部存储与媒体读写权限以支持本地配置导出 | [/install/v2rayng-storage-permission-for-config-export/](/install/v2rayng-storage-permission-for-config-export/) | 安装包与应用初始化 | v2rayNG 安装 | install |
| 确认系统级VPN连接请求对话框与密钥图标显示 | [/install/android-vpn-profile-authorization-prompt/](/install/android-vpn-profile-authorization-prompt/) | VPN 授权与后台 | v2rayNG 安装 | install |
| 在华为、小米、OPPO手机上关闭电池优化防止后台被杀 | [/install/disable-battery-optimization-for-v2rayng/](/install/disable-battery-optimization-for-v2rayng/) | VPN 授权与后台 | v2rayNG 安装 | install |
| 开启常驻通知栏控制开关与Android下拉快捷磁贴配置 | [/install/v2rayng-notification-toggle-and-quick-settings/](/install/v2rayng-notification-toggle-and-quick-settings/) | VPN 授权与后台 | v2rayNG 安装 | install |
| 从美区App Store检索、购买并下载Shadowrocket完整步骤 | [/install/installing-shadowrocket-from-us-app-store/](/install/installing-shadowrocket-from-us-app-store/) | 商店获取与首启 | Shadowrocket 安装 | install |
| Shadowrocket初次启动主界面：节点、配置与感叹号状态 | [/install/shadowrocket-initial-interface-breakdown/](/install/shadowrocket-initial-interface-breakdown/) | 商店获取与首启 | Shadowrocket 安装 | install |
| 后续更新Shadowrocket版本时保留原有节点与规则的技巧 | [/install/updating-shadowrocket-without-losing-profiles/](/install/updating-shadowrocket-without-losing-profiles/) | 商店获取与首启 | Shadowrocket 安装 | install |
| iOS系统提示“添加VPN配置”时的Face ID认证与通过 | [/install/shadowrocket-add-vpn-configurations-allow/](/install/shadowrocket-add-vpn-configurations-allow/) | 系统授权与恢复 | Shadowrocket 安装 | install |
| 按需安装与信任本地HTTPS解密根证书的安全流程 | [/install/install-mitm-root-certificate-in-shadowrocket/](/install/install-mitm-root-certificate-in-shadowrocket/) | 系统授权与恢复 | Shadowrocket 安装 | install |
| 开启iCloud云盘同步在多台iPad与iPhone间共享节点 | [/install/icloud-backup-and-sync-for-shadowrocket/](/install/icloud-backup-and-sync-for-shadowrocket/) | 系统授权与恢复 | Shadowrocket 安装 | install |
| FlClash在Windows系统的安装步骤与Flutter环境要求 | [/install/flclash-windows-installation-and-setup/](/install/flclash-windows-installation-and-setup/) | 桌面安装流程 | FlClash 安装 | install |
| FlClash在Mac平台安装与原生Apple Silicon支持验证 | [/install/flclash-macos-installation-and-arm64-support/](/install/flclash-macos-installation-and-arm64-support/) | 桌面安装流程 | FlClash 安装 | install |
| Linux下赋予FlClash AppImage执行权限并创建桌面快捷入口 | [/install/flclash-linux-appimage-run-permissions/](/install/flclash-linux-appimage-run-permissions/) | 桌面安装流程 | FlClash 安装 | install |
| FlClash Android客户端安装与Material You界面初始化 | [/install/flclash-android-installation-and-vpn-setup/](/install/flclash-android-installation-and-vpn-setup/) | 移动安装与授权 | FlClash 安装 | install |
| FlClash iOS公测版本安装与网络扩展授权说明 | [/install/flclash-ios-testflight-installation-notes/](/install/flclash-ios-testflight-installation-notes/) | 移动安装与授权 | FlClash 安装 | install |
| 核对FlClash在各端统一的策略组管理与核心版本 | [/install/flclash-cross-device-ui-consistency-check/](/install/flclash-cross-device-ui-consistency-check/) | 移动安装与授权 | FlClash 安装 | install |
| Hiddify在Windows 10/11系统的安装与首次运行 | [/install/hiddify-windows-setup-and-first-launch/](/install/hiddify-windows-setup-and-first-launch/) | 首次安装和初始化 | Hiddify 安装 | install |
| Hiddify Android端安装与原生中文语言包设置 | [/install/hiddify-android-apk-install-and-defaults/](/install/hiddify-android-apk-install-and-defaults/) | 首次安装和初始化 | Hiddify 安装 | install |
| Hiddify macOS端安装包安全权限解锁与核心初始化 | [/install/hiddify-macos-installation-and-security-prompt/](/install/hiddify-macos-installation-and-security-prompt/) | 首次安装和初始化 | Hiddify 安装 | install |
| 在Hiddify中一键开启系统代理与TUN虚拟网卡驱动 | [/install/hiddify-system-proxy-and-tun-service-setup/](/install/hiddify-system-proxy-and-tun-service-setup/) | 系统集成与卸载 | Hiddify 安装 | install |
| 配置Hiddify开机自启动与最小化至系统托盘工作模式 | [/install/hiddify-auto-startup-and-minimize-to-tray/](/install/hiddify-auto-startup-and-minimize-to-tray/) | 系统集成与卸载 | Hiddify 安装 | install |
| 彻底卸载Hiddify并清除残留虚拟网卡与网络配置 | [/install/clean-uninstall-hiddify-and-remove-adapters/](/install/clean-uninstall-hiddify-and-remove-adapters/) | 系统集成与卸载 | Hiddify 安装 | install |
| Windows通过PowerShell解压配置sing-box命令行核心 | [/install/singbox-cli-binary-install-on-windows/](/install/singbox-cli-binary-install-on-windows/) | 命令行核心初始化 | sing-box 安装 | install |
| Linux服务器解压sing-box二进制并配置systemd自启动服务 | [/install/singbox-cli-install-on-linux-systemd/](/install/singbox-cli-install-on-linux-systemd/) | 命令行核心初始化 | sing-box 安装 | install |
| macOS终端安装配置独立sing-box核心并测试运行 | [/install/singbox-cli-install-on-macos-terminal/](/install/singbox-cli-install-on-macos-terminal/) | 命令行核心初始化 | sing-box 安装 | install |
| sing-box官方Windows图形客户端安装与网络驱动部署 | [/install/singbox-for-windows-gui-installation/](/install/singbox-for-windows-gui-installation/) | 图形客户端初始化 | sing-box 安装 | install |
| sing-box Android客户端安装与基础连接参数配置 | [/install/singbox-for-android-google-play-and-apk/](/install/singbox-for-android-google-play-and-apk/) | 图形客户端初始化 | sing-box 安装 | install |
| sing-box在iOS与macOS独立App的安装与核心版本核验 | [/install/singbox-for-apple-platforms-setup/](/install/singbox-for-apple-platforms-setup/) | 图形客户端初始化 | sing-box 安装 | install |
| 安装前检查Windows系统版本号、补丁与CPU架构 | [/install/check-windows-system-architecture-and-build/](/install/check-windows-system-architecture-and-build/) | 桌面系统检查 | 系统依赖与安装准备 | install |
| 安装并修复Microsoft Visual C++ 2015-2022运行库 | [/install/check-visual-c-redistributables-windows/](/install/check-visual-c-redistributables-windows/) | 桌面系统检查 | 系统依赖与安装准备 | install |
| 核对macOS系统完整性保护(SIP)与第三方网络扩展支持 | [/install/check-macos-security-and-sip-status/](/install/check-macos-security-and-sip-status/) | 桌面系统检查 | 系统依赖与安装准备 | install |
| 安装新客户端前彻底清理老旧Clash或多余代理工具 | [/install/uninstall-legacy-clash-and-conflicting-proxies/](/install/uninstall-legacy-clash-and-conflicting-proxies/) | 环境隔离与资源准备 | 系统依赖与安装准备 | install |
| 在杀毒软件与火绒中为代理核心目录设置信任白名单 | [/install/configure-antivirus-exclusions-for-proxy-cores/](/install/configure-antivirus-exclusions-for-proxy-cores/) | 环境隔离与资源准备 | 系统依赖与安装准备 | install |
| 安装前检查并释放常见的本地7890与10808代理端口 | [/install/free-up-local-ports-7890-10808-before-install/](/install/free-up-local-ports-7890-10808-before-install/) | 环境隔离与资源准备 | 系统依赖与安装准备 | install |
| 在Ubuntu/Debian服务器上部署Mihomo核心并配置Daemon | [/install/deploy-mihomo-meta-service-on-linux/](/install/deploy-mihomo-meta-service-on-linux/) | 服务与启动管理 | Linux 服务与软路由部署 | install |
| 编写systemd守护脚本实现代理进程异常退出后自动拉起 | [/install/configure-systemd-service-auto-restart/](/install/configure-systemd-service-auto-restart/) | 服务与启动管理 | Linux 服务与软路由部署 | install |
| 配置setcap赋予代理核心无root绑定低位特权端口权限 | [/install/linux-cap-net-bind-service-privileges/](/install/linux-cap-net-bind-service-privileges/) | 服务与启动管理 | Linux 服务与软路由部署 | install |
| 通过SSH连接软路由手动安装OpenClash核心与UI界面 | [/install/openclash-ipk-manual-install-via-ssh/](/install/openclash-ipk-manual-install-via-ssh/) | 网关安装与恢复 | Linux 服务与软路由部署 | install |
| PassWall插件安装与缺失iptables/nftables依赖修复 | [/install/passwall-installation-and-dependencies-fix/](/install/passwall-installation-and-dependencies-fix/) | 网关安装与恢复 | Linux 服务与软路由部署 | install |
| 软路由安装代理插件导致网络中断时的救援与回退流程 | [/install/recover-bricked-router-after-proxy-install-crash/](/install/recover-bricked-router-after-proxy-install-crash/) | 网关安装与恢复 | Linux 服务与软路由部署 | install |
| Clash Verge Rev版本无损平滑升级步骤与配置迁移 | [/install/how-to-safely-upgrade-clash-verge-rev/](/install/how-to-safely-upgrade-clash-verge-rev/) | 升级与回退 | 升级、迁移与卸载 | install |
| 新版本出现重大Bug时如何安全回退至上一稳定版本 | [/install/rollback-to-previous-client-version-safely/](/install/rollback-to-previous-client-version-safely/) | 升级与回退 | 升级、迁移与卸载 | install |
| 跨设备更换电脑时完整备份与迁移客户端本地自定义配置 | [/install/exporting-and-importing-client-settings-backup/](/install/exporting-and-importing-client-settings-backup/) | 升级与回退 | 升级、迁移与卸载 | install |
| 在Windows下彻底卸载代理客户端并清除AppData残留数据 | [/install/deep-clean-uninstall-windows-proxy-clients/](/install/deep-clean-uninstall-windows-proxy-clients/) | 干净重装与退出 | 升级、迁移与卸载 | install |
| 在macOS下彻底清理~/Library中残留的代理配置与缓存 | [/install/purge-macos-library-application-support-files/](/install/purge-macos-library-application-support-files/) | 干净重装与退出 | 升级、迁移与卸载 | install |
| 客户端意外卸载后修复系统注册表残留代理重获网络 | [/install/emergency-reset-system-proxy-settings-registry/](/install/emergency-reset-system-proxy-settings-registry/) | 干净重装与退出 | 升级、迁移与卸载 | install |
| 订阅链接格式详解：区分Clash YAML、Base64与sing-box JSON | [/subscription/understanding-different-subscription-url-formats/](/subscription/understanding-different-subscription-url-formats/) | 链接获取与类型 | 订阅链接与导入入口 | subscription |
| 如何在机场用户中心正确复制对应客户端的专用订阅链接 | [/subscription/how-to-copy-sub-link-from-airport-dashboard/](/subscription/how-to-copy-sub-link-from-airport-dashboard/) | 链接获取与类型 | 订阅链接与导入入口 | subscription |
| 一键导入客户端与手动复制粘贴订阅URL的原理与排错 | [/subscription/one-click-import-vs-manual-url-copy/](/subscription/one-click-import-vs-manual-url-copy/) | 链接获取与类型 | 订阅链接与导入入口 | subscription |
| 解析订阅URL中的Token与用户信息：防范泄露与盗刷 | [/subscription/how-to-audit-token-and-user-info-in-sub-url/](/subscription/how-to-audit-token-and-user-info-in-sub-url/) | 凭据与访问范围 | 订阅链接与导入入口 | subscription |
| 订阅链接不慎泄露后如何在机场面板重置Token并更新 | [/subscription/resetting-compromised-subscription-tokens/](/subscription/resetting-compromised-subscription-tokens/) | 凭据与访问范围 | 订阅链接与导入入口 | subscription |
| 解析订阅响应头Subscription-Userinfo并展示剩余流量 | [/subscription/userinfo-header-and-traffic-display-in-clients/](/subscription/userinfo-header-and-traffic-display-in-clients/) | 凭据与访问范围 | 订阅链接与导入入口 | subscription |
| Clash YAML怎么读：节点、策略组、规则与外部资源的关系 | [/subscription/how-to-read-clash-yaml-proxies-groups-rules/](/subscription/how-to-read-clash-yaml-proxies-groups-rules/) | 配置结构与引用 | Clash YAML 配置 | subscription |
| Mihomo的proxy-providers如何与策略组关联：配置阅读示例 | [/subscription/mihomo-proxy-providers-and-rule-providers/](/subscription/mihomo-proxy-providers-and-rule-providers/) | 配置结构与引用 | Clash YAML 配置 | subscription |
| 怎样制作最小可验证的Clash配置，而不是一次导入整套复杂规则？ | [/subscription/minimal-verifiable-clash-config-setup/](/subscription/minimal-verifiable-clash-config-setup/) | 配置结构与引用 | Clash YAML 配置 | subscription |
| 在Clash Verge Rev中编写扩展配置(Script/Merge)动态插入节点 | [/subscription/writing-parsers-in-clash-verge-rev/](/subscription/writing-parsers-in-clash-verge-rev/) | 覆盖与增强 | Clash YAML 配置 | subscription |
| 通过配置覆盖功能强行修改机场订阅中的默认DNS设置 | [/subscription/overriding-default-dns-settings-in-yaml/](/subscription/overriding-default-dns-settings-in-yaml/) | 覆盖与增强 | Clash YAML 配置 | subscription |
| 利用Mixin机制为所有外部订阅统一附加本地直连规则 | [/subscription/clash-profile-mixin-advanced-customization/](/subscription/clash-profile-mixin-advanced-customization/) | 覆盖与增强 | Clash YAML 配置 | subscription |
| 拆解VLESS节点链接：UUID、Server、Port与Flow字段含义 | [/subscription/decoding-vless-node-uri-parameters/](/subscription/decoding-vless-node-uri-parameters/) | 节点链接字段 | VLESS、VMess 与 Trojan 节点 | subscription |
| 解码VMess Base64字符串：内部JSON各键值对详细解析 | [/subscription/decoding-vmess-base64-json-structure/](/subscription/decoding-vmess-base64-json-structure/) | 节点链接字段 | VLESS、VMess 与 Trojan 节点 | subscription |
| Trojan节点链接解析：密码、SNI域名与传输安全配置 | [/subscription/trojan-node-uri-password-and-sni-fields/](/subscription/trojan-node-uri-password-and-sni-fields/) | 节点链接字段 | VLESS、VMess 与 Trojan 节点 | subscription |
| VLESS+Reality组合参数解析：公钥、ShortId与蜘蛛域名 | [/subscription/vless-xtls-reality-transport-parameters/](/subscription/vless-xtls-reality-transport-parameters/) | 传输与安全组合 | VLESS、VMess 与 Trojan 节点 | subscription |
| Hysteria 2与TUIC高吞吐协议节点链接的字段格式 | [/subscription/hysteria2-and-tuic-udp-protocol-uri-guide/](/subscription/hysteria2-and-tuic-udp-protocol-uri-guide/) | 传输与安全组合 | VLESS、VMess 与 Trojan 节点 | subscription |
| WebSocket与gRPC配合CDN中转时的Host与Path设置 | [/subscription/websocket-grpc-cdn-transport-layer-configs/](/subscription/websocket-grpc-cdn-transport-layer-configs/) | 传输与安全组合 | VLESS、VMess 与 Trojan 节点 | subscription |
| sing-box JSON核心结构拆解：inbounds、outbounds与route | [/subscription/singbox-json-config-inbounds-outbounds-route/](/subscription/singbox-json-config-inbounds-outbounds-route/) | 对象与结构 | sing-box JSON 配置 | subscription |
| sing-box中selector策略组与urltest自动优选编写方法 | [/subscription/understanding-singbox-selector-and-urltest/](/subscription/understanding-singbox-selector-and-urltest/) | 对象与结构 | sing-box JSON 配置 | subscription |
| sing-box独立DNS路由对象与规则匹配机制深度解析 | [/subscription/singbox-dns-independent-object-configuration/](/subscription/singbox-dns-independent-object-configuration/) | 对象与结构 | sing-box JSON 配置 | subscription |
| 从sing-box 1.8平滑升级到1.10+：语法变动与破坏性修复 | [/subscription/migrating-singbox-config-from-1-8-to-1-10/](/subscription/migrating-singbox-config-from-1-8-to-1-10/) | 版本迁移与拆分 | sing-box JSON 配置 | subscription |
| 将大型sing-box配置拆分为按功能模块化引用的JSON片段 | [/subscription/splitting-large-singbox-json-into-modular-files/](/subscription/splitting-large-singbox-json-into-modular-files/) | 版本迁移与拆分 | sing-box JSON 配置 | subscription |
| 从标准JSON规则列表编译为sing-box专用二进制.srs规则集 | [/subscription/compiling-srs-rule-sets-from-json-rules/](/subscription/compiling-srs-rule-sets-from-json-rules/) | 版本迁移与拆分 | sing-box JSON 配置 | subscription |
| 订阅转换器的能力边界：哪些新协议在转换中会被丢失或降级 | [/subscription/subconverter-capabilities-and-protocol-loss/](/subscription/subconverter-capabilities-and-protocol-loss/) | 转换能力边界 | 订阅转换与兼容性 | subscription |
| 为什么Clash复杂的策略组无法百分之百无损转为sing-box | [/subscription/why-not-all-clash-rules-convert-to-singbox/](/subscription/why-not-all-clash-rules-convert-to-singbox/) | 转换能力边界 | 订阅转换与兼容性 | subscription |
| 排查订阅转换后节点无法连接的参数缺失与编码乱码 | [/subscription/identifying-broken-node-configs-after-conversion/](/subscription/identifying-broken-node-configs-after-conversion/) | 转换能力边界 | 订阅转换与兼容性 | subscription |
| 使用Docker在本地搭建私有订阅转换后端彻底隔离泄露 | [/subscription/setting-up-local-subconverter-docker-service/](/subscription/setting-up-local-subconverter-docker-service/) | 安全转换流程 | 订阅转换与兼容性 | subscription |
| 在Sub-Web前端中注入自定义免翻规则与远程规则集 | [/subscription/sub-web-frontend-custom-rule-injection/](/subscription/sub-web-frontend-custom-rule-injection/) | 安全转换流程 | 订阅转换与兼容性 | subscription |
| 审查公开订阅转换站点服务条款与网络传输抓包分析 | [/subscription/auditing-public-subconverter-server-trust/](/subscription/auditing-public-subconverter-server-trust/) | 安全转换流程 | 订阅转换与兼容性 | subscription |
| 在客户端合理配置订阅自动更新周期避免被机场限流 | [/subscription/configuring-auto-update-interval-in-clients/](/subscription/configuring-auto-update-interval-in-clients/) | 更新策略与缓存 | 订阅更新与多源管理 | subscription |
| 节点大面积变动时手动清除本地订阅缓存强制拉取 | [/subscription/clearing-subscription-cache-when-nodes-stale/](/subscription/clearing-subscription-cache-when-nodes-stale/) | 更新策略与缓存 | 订阅更新与多源管理 | subscription |
| 解决因本地DNS缓存陈旧导致的订阅更新请求超时 | [/subscription/handling-client-update-failure-due-to-stale-ip/](/subscription/handling-client-update-failure-due-to-stale-ip/) | 更新策略与缓存 | 订阅更新与多源管理 | subscription |
| 如何将两家不同机场的订阅合并为一个Clash配置文件 | [/subscription/combining-multiple-airports-into-one-clash-profile/](/subscription/combining-multiple-airports-into-one-clash-profile/) | 多机场与合并 | 订阅更新与多源管理 | subscription |
| 在策略组中设置主备机场自动故障转移(Fallback) | [/subscription/setting-up-failover-policy-between-two-providers/](/subscription/setting-up-failover-policy-between-two-providers/) | 多机场与合并 | 订阅更新与多源管理 | subscription |
| 为不同来源的节点批量添加前缀标签便于管理与识别 | [/subscription/tagging-and-prefixing-nodes-from-different-subs/](/subscription/tagging-and-prefixing-nodes-from-different-subs/) | 多机场与合并 | 订阅更新与多源管理 | subscription |
| 规则匹配的自上而下顺序原理：为什么直连规则要靠前 | [/subscription/rule-order-matters-top-to-bottom-precedence/](/subscription/rule-order-matters-top-to-bottom-precedence/) | 规则匹配与顺序 | 规则分流与策略组 | subscription |
| DOMAIN-SUFFIX与DOMAIN-KEYWORD的使用场景与性能对比 | [/subscription/domain-suffix-vs-domain-keyword-matching/](/subscription/domain-suffix-vs-domain-keyword-matching/) | 规则匹配与顺序 | 规则分流与策略组 | subscription |
| 利用GeoIP:CN与GeoSite:CN实现国内流量绝对直连 | [/subscription/geoip-cn-and-geosite-cn-direct-routing/](/subscription/geoip-cn-and-geosite-cn-direct-routing/) | 规则匹配与顺序 | 规则分流与策略组 | subscription |
| 配置URL-Test自动优选策略组：容差参数与检测间隔 | [/subscription/configuring-url-test-auto-selection-group/](/subscription/configuring-url-test-auto-selection-group/) | 策略组与健康检查 | 规则分流与策略组 | subscription |
| 为流媒体、OpenAI与普通网页分别创建专属分流策略组 | [/subscription/customizing-proxy-groups-for-media-and-ai/](/subscription/customizing-proxy-groups-for-media-and-ai/) | 策略组与健康检查 | 规则分流与策略组 | subscription |
| 负载均衡策略组Round-Robin轮询与一致性哈希的选择 | [/subscription/load-balance-round-robin-vs-consistent-hash/](/subscription/load-balance-round-robin-vs-consistent-hash/) | 策略组与健康检查 | 规则分流与策略组 | subscription |
| Clash DNS配置详解：nameserver与fallback的分流逻辑 | [/subscription/clash-dns-nameserver-vs-fallback-chain/](/subscription/clash-dns-nameserver-vs-fallback-chain/) | 解析链与选择 | DNS 配置与解析策略 | subscription |
| 在客户端中配置DoH与DoT加密DNS防止运营商劫持 | [/subscription/doh-dot-encrypted-dns-setup-in-clients/](/subscription/doh-dot-encrypted-dns-setup-in-clients/) | 解析链与选择 | DNS 配置与解析策略 | subscription |
| default-nameserver引导DNS的作用与必须使用纯IP的原因 | [/subscription/default-nameserver-bootstrap-resolution/](/subscription/default-nameserver-bootstrap-resolution/) | 解析链与选择 | DNS 配置与解析策略 | subscription |
| Fake-IP模式原理：198.18.0.0/16虚拟IP池如何提升响应速度 | [/subscription/understanding-fake-ip-pool-mechanics/](/subscription/understanding-fake-ip-pool-mechanics/) | 分流与地址结果 | DNS 配置与解析策略 | subscription |
| 配置fake-ip-filter避开网易云音乐、局域网与联机游戏 | [/subscription/fake-ip-filter-tuning-for-local-apps/](/subscription/fake-ip-filter-tuning-for-local-apps/) | 分流与地址结果 | DNS 配置与解析策略 | subscription |
| Redir-Host已被淘汰：为什么所有主流客户端转向Fake-IP | [/subscription/redir-host-vs-fake-ip-in-modern-clients/](/subscription/redir-host-vs-fake-ip-in-modern-clients/) | 分流与地址结果 | DNS 配置与解析策略 | subscription |
| TUN模式工作原理：虚拟网卡如何截获不遵守代理的应用流量 | [/subscription/how-tun-mode-captures-all-system-traffic/](/subscription/how-tun-mode-captures-all-system-traffic/) | 模式与权限 | TUN 与系统代理 | subscription |
| 系统代理模式与TUN虚拟网卡模式适用场景深度对比 | [/subscription/system-proxy-vs-tun-mode-feature-comparison/](/subscription/system-proxy-vs-tun-mode-feature-comparison/) | 模式与权限 | TUN 与系统代理 | subscription |
| 为什么开启TUN模式必须要求管理员权限提升与驱动支持 | [/subscription/enabling-tun-mode-requires-admin-elevation/](/subscription/enabling-tun-mode-requires-admin-elevation/) | 模式与权限 | TUN 与系统代理 | subscription |
| 查看并解析开启TUN模式后Windows路由表的0.0.0.0重定向 | [/subscription/inspecting-windows-routing-table-under-tun/](/subscription/inspecting-windows-routing-table-under-tun/) | 路由与恢复 | TUN 与系统代理 | subscription |
| 开启strict-route严格路由防止UDP数据包在TUN下泄露 | [/subscription/strict-route-and-endpoint-independent-nat/](/subscription/strict-route-and-endpoint-independent-nat/) | 路由与恢复 | TUN 与系统代理 | subscription |
| TUN模式异常崩溃后恢复电脑默认网关路由表的方法 | [/subscription/restoring-default-gateway-after-tun-crash/](/subscription/restoring-default-gateway-after-tun-crash/) | 路由与恢复 | TUN 与系统代理 | subscription |
| 在Chrome与Edge中配合SwitchyOmega插件接入本地代理端口 | [/subscription/setting-up-http-proxy-in-chrome-edge/](/subscription/setting-up-http-proxy-in-chrome-edge/) | 浏览器、终端与开发工具 | 应用接入与多设备配置 | subscription |
| 在PowerShell、CMD与Git Bash中配置HTTP/HTTPS/ALL_PROXY | [/subscription/configuring-proxy-in-terminal-powershell-git/](/subscription/configuring-proxy-in-terminal-powershell-git/) | 浏览器、终端与开发工具 | 应用接入与多设备配置 | subscription |
| 在VS Code与Cursor开发环境中设置代理拉取插件与模型 | [/subscription/configuring-proxy-in-vscode-and-cursor/](/subscription/configuring-proxy-in-vscode-and-cursor/) | 浏览器、终端与开发工具 | 应用接入与多设备配置 | subscription |
| 开启Allow-LAN局域网共享：让同一WiFi下的手机使用电脑代理 | [/subscription/allowing-lan-connections-to-share-proxy/](/subscription/allowing-lan-connections-to-share-proxy/) | 备份同步与访问控制 | 应用接入与多设备配置 | subscription |
| 为局域网代理共享设置身份认证账号密码防止蹭网 | [/subscription/protecting-lan-proxy-with-authentication/](/subscription/protecting-lan-proxy-with-authentication/) | 备份同步与访问控制 | 应用接入与多设备配置 | subscription |
| 使用私有Git仓库或WebDAV在多台工作机之间无感同步配置 | [/subscription/syncing-profiles-via-git-or-webdav/](/subscription/syncing-profiles-via-git-or-webdav/) | 备份同步与访问控制 | 应用接入与多设备配置 | subscription |
| Clash Verge Rev点击后托盘无图标且进程静默退出的排查 | [/troubleshooting/troubleshoot-clash-verge-rev-silent-exit/](/troubleshooting/troubleshoot-clash-verge-rev-silent-exit/) | 启动与进程 | 客户端启动失败 | troubleshooting |
| v2rayN启动报错“应用程序发生未处理的异常”修复 | [/troubleshooting/troubleshoot-v2rayn-crash-on-splash-screen/](/troubleshooting/troubleshoot-v2rayn-crash-on-splash-screen/) | 启动与进程 | 客户端启动失败 | troubleshooting |
| Windows Defender SmartScreen拦截客户端启动的解除 | [/troubleshooting/troubleshoot-client-app-blocked-by-smartscreen/](/troubleshooting/troubleshoot-client-app-blocked-by-smartscreen/) | 启动与进程 | 客户端启动失败 | troubleshooting |
| 报错“bind: address already in use: 7890”端口占用诊断 | [/troubleshooting/port-7890-already-in-use-diagnosis-and-fix/](/troubleshooting/port-7890-already-in-use-diagnosis-and-fix/) | 端口与多实例 | 客户端启动失败 | troubleshooting |
| 通过任务管理器排查并在后台终止僵尸状态的代理核心进程 | [/troubleshooting/detecting-hidden-zombie-proxy-core-processes/](/troubleshooting/detecting-hidden-zombie-proxy-core-processes/) | 端口与多实例 | 客户端启动失败 | troubleshooting |
| 在配置文件中修改混合端口(mixed-port)彻底解决端口冲突 | [/troubleshooting/changing-default-mixed-port-to-avoid-conflict/](/troubleshooting/changing-default-mixed-port-to-avoid-conflict/) | 端口与多实例 | 客户端启动失败 | troubleshooting |
| 启动提示缺少VCRUNTIME140.dll或MSVCP140.dll的修复方案 | [/troubleshooting/fix-missing-vcruntime140-dll-error/](/troubleshooting/fix-missing-vcruntime140-dll-error/) | 安装包与依赖 | 安装、升级与权限错误 | troubleshooting |
| Windows Installer服务无法访问导致安装包安装失败处理 | [/troubleshooting/fix-windows-installer-service-unavailable/](/troubleshooting/fix-windows-installer-service-unavailable/) | 安装包与依赖 | 安装、升级与权限错误 | troubleshooting |
| 下载安装包提示“文件已损坏”或解压CRC校验失败排错 | [/troubleshooting/troubleshoot-corrupted-download-hash-mismatch/](/troubleshooting/troubleshoot-corrupted-download-hash-mismatch/) | 安装包与依赖 | 安装、升级与权限错误 | troubleshooting |
| 客户端版本升级后界面出现白屏或无限加载排查 | [/troubleshooting/fix-client-blank-white-screen-after-upgrade/](/troubleshooting/fix-client-blank-white-screen-after-upgrade/) | 升级后回归问题 | 安装、升级与权限错误 | troubleshooting |
| 核心升级后报错“unmarshal configuration failed”语法不兼容 | [/troubleshooting/fixing-config-schema-mismatch-after-core-update/](/troubleshooting/fixing-config-schema-mismatch-after-core-update/) | 升级后回归问题 | 安装、升级与权限错误 | troubleshooting |
| 客户端更新后TUN虚拟网卡丢失或无法启用的重新注册步骤 | [/troubleshooting/re-registering-tun-virtual-adapter-after-update/](/troubleshooting/re-registering-tun-virtual-adapter-after-update/) | 升级后回归问题 | 安装、升级与权限错误 | troubleshooting |
| 订阅更新提示“connect: connection refused”或超时排查 | [/troubleshooting/troubleshoot-subscription-timeout-connection-refused/](/troubleshooting/troubleshoot-subscription-timeout-connection-refused/) | 请求与网络 | 订阅更新失败 | troubleshooting |
| 未开代理无法更新订阅，开代理后节点失效的死锁破解 | [/troubleshooting/subscription-fails-when-proxy-is-off-bootstrap-loop/](/troubleshooting/subscription-fails-when-proxy-is-off-bootstrap-loop/) | 请求与网络 | 订阅更新失败 | troubleshooting |
| 订阅域名无法解析(no such host)时本地Host强制绑定 | [/troubleshooting/dns-lookup-failure-for-subscription-domain/](/troubleshooting/dns-lookup-failure-for-subscription-domain/) | 请求与网络 | 订阅更新失败 | troubleshooting |
| 订阅更新返回HTTP 401或403错误：Token失效与账户过期 | [/troubleshooting/subscription-update-http-401-403-forbidden/](/troubleshooting/subscription-update-http-401-403-forbidden/) | 状态码与客户端差异 | 订阅更新失败 | troubleshooting |
| 订阅更新返回HTTP 502/504：机场服务端维护判断方法 | [/troubleshooting/subscription-update-http-502-504-bad-gateway/](/troubleshooting/subscription-update-http-502-504-bad-gateway/) | 状态码与客户端差异 | 订阅更新失败 | troubleshooting |
| 浏览器打开订阅链接正常但在客户端中拉取失败的原因 | [/troubleshooting/updating-works-in-browser-fails-in-client/](/troubleshooting/updating-works-in-browser-fails-in-client/) | 状态码与客户端差异 | 订阅更新失败 | troubleshooting |
| 报错“yaml: line X: mapping values are not allowed”格式修复 | [/troubleshooting/fix-yaml-syntax-error-mapping-values-not-allowed/](/troubleshooting/fix-yaml-syntax-error-mapping-values-not-allowed/) | 结构与编码 | 订阅解析与导入错误 | troubleshooting |
| 导入Base64订阅提示“illegal base64 data at input”清洗 | [/troubleshooting/handling-illegal-base64-character-errors/](/troubleshooting/handling-illegal-base64-character-errors/) | 结构与编码 | 订阅解析与导入错误 | troubleshooting |
| 订阅拉取到的内容是HTML登录页面而非配置文件的排错 | [/troubleshooting/subscription-returns-html-login-page-instead-of-config/](/troubleshooting/subscription-returns-html-login-page-instead-of-config/) | 结构与编码 | 订阅解析与导入错误 | troubleshooting |
| 客户端报错“unsupported proxy type: hysteria2”核心版本过旧 | [/troubleshooting/fixing-unsupported-proxy-type-error/](/troubleshooting/fixing-unsupported-proxy-type-error/) | 字段与版本 | 订阅解析与导入错误 | troubleshooting |
| 配置中存在同名节点导致“proxy duplicated: 香港01”报错修复 | [/troubleshooting/resolving-duplicate-proxy-name-conflicts/](/troubleshooting/resolving-duplicate-proxy-name-conflicts/) | 字段与版本 | 订阅解析与导入错误 | troubleshooting |
| 节点配置缺失cipher加密方式或password密码的补全办法 | [/troubleshooting/missing-cipher-or-password-field-in-node/](/troubleshooting/missing-cipher-or-password-field-in-node/) | 字段与版本 | 订阅解析与导入错误 | troubleshooting |
| 客户端批量延迟测速全红全超时(Timeout)的紧急检查清单 | [/troubleshooting/troubleshoot-all-nodes-timeout-in-speed-test/](/troubleshooting/troubleshoot-all-nodes-timeout-in-speed-test/) | 目标可达性 | 节点超时与认证失败 | troubleshooting |
| ICMP Ping通但TCP Ping超时：解析端口被封与服务器封锁 | [/troubleshooting/ping-works-but-tcp-ping-fails-on-proxy-node/](/troubleshooting/ping-works-but-tcp-ping-fails-on-proxy-node/) | 目标可达性 | 节点超时与认证失败 | troubleshooting |
| 使用PowerShell或tcping工具独立排查节点服务器端口连通性 | [/troubleshooting/testing-node-reachability-using-powershell-tcping/](/troubleshooting/testing-node-reachability-using-powershell-tcping/) | 目标可达性 | 节点超时与认证失败 | troubleshooting |
| 报错“tls: handshake timeout”或证书不受信任的原因与修复 | [/troubleshooting/fixing-tls-handshake-timeout-or-cert-invalid/](/troubleshooting/fixing-tls-handshake-timeout-or-cert-invalid/) | 认证与握手 | 节点超时与认证失败 | troubleshooting |
| 本地电脑系统时间不准引起TLS握手认证失败的校准方法 | [/troubleshooting/troubleshoot-system-clock-skew-causing-tls-failure/](/troubleshooting/troubleshoot-system-clock-skew-causing-tls-failure/) | 认证与握手 | 节点超时与认证失败 | troubleshooting |
| VLESS Reality节点连接失败提示认证错误与公钥不匹配核对 | [/troubleshooting/vless-reality-auth-failed-shortid-mismatch/](/troubleshooting/vless-reality-auth-failed-shortid-mismatch/) | 认证与握手 | 节点超时与认证失败 | troubleshooting |
| 已连接节点但浏览器提示“无法访问此网站”核心诊断树 | [/troubleshooting/connected-to-proxy-but-no-internet-checklist/](/troubleshooting/connected-to-proxy-but-no-internet-checklist/) | 请求是否经过代理 | 已连接但无法上网 | troubleshooting |
| 检查Windows“设置-网络-代理”开关是否被其他应用强制关闭 | [/troubleshooting/checking-windows-system-proxy-toggle-switch/](/troubleshooting/checking-windows-system-proxy-toggle-switch/) | 请求是否经过代理 | 已连接但无法上网 | troubleshooting |
| 排查托盘菜单是否误选了Direct直连模式导致所有请求未代理 | [/troubleshooting/direct-mode-selected-accidentally-in-tray/](/troubleshooting/direct-mode-selected-accidentally-in-tray/) | 请求是否经过代理 | 已连接但无法上网 | troubleshooting |
| 国外网站正常打开但国内微信、百度无法访问的分流修复 | [/troubleshooting/foreign-sites-work-domestic-sites-broken/](/troubleshooting/foreign-sites-work-domestic-sites-broken/) | 本地访问与断开恢复 | 已连接但无法上网 | troubleshooting |
| 关闭代理客户端后整台电脑彻底无法上网的紧急恢复指南 | [/troubleshooting/turn-off-proxy-and-lose-internet-completely/](/troubleshooting/turn-off-proxy-and-lose-internet-completely/) | 本地访问与断开恢复 | 已连接但无法上网 | troubleshooting |
| 开启代理后局域网共享打印机和NAS无法访问的白名单设置 | [/troubleshooting/lan-network-shared-printer-unreachable-under-proxy/](/troubleshooting/lan-network-shared-printer-unreachable-under-proxy/) | 本地访问与断开恢复 | 已连接但无法上网 | troubleshooting |
| 浏览器频繁提示DNS_PROBE_FINISHED_NXDOMAIN的排错流程 | [/troubleshooting/dns-probe-finished-nxdomain-error-fix/](/troubleshooting/dns-probe-finished-nxdomain-error-fix/) | 解析失败与缓存 | DNS 解析异常 | troubleshooting |
| 在Windows终端与Chrome浏览器中彻底清空DNS解析缓存 | [/troubleshooting/flushing-dns-cache-in-windows-and-browsers/](/troubleshooting/flushing-dns-cache-in-windows-and-browsers/) | 解析失败与缓存 | DNS 解析异常 | troubleshooting |
| 判断本地宽带运营商是否劫持了标准UDP 53端口DNS请求 | [/troubleshooting/detecting-dns-hijacking-by-local-broadband-isp/](/troubleshooting/detecting-dns-hijacking-by-local-broadband-isp/) | 解析失败与缓存 | DNS 解析异常 | troubleshooting |
| 访问测试网站发现DNS泄露为本地运营商IP的防护设置 | [/troubleshooting/fixing-dns-leaks-when-accessing-sensitive-sites/](/troubleshooting/fixing-dns-leaks-when-accessing-sensitive-sites/) | 分流与 Fake-IP | DNS 解析异常 | troubleshooting |
| 长时间运行后Fake-IP池溢出与映射未及时清理的重置方法 | [/troubleshooting/fake-ip-pool-exhaustion-and-stale-mapping/](/troubleshooting/fake-ip-pool-exhaustion-and-stale-mapping/) | 分流与 Fake-IP | DNS 解析异常 | troubleshooting |
| 软路由上dnsmasq与客户端Fake-IP冲突导致内网无法解析 | [/troubleshooting/router-dnsmasq-conflict-with-client-fakeip/](/troubleshooting/router-dnsmasq-conflict-with-client-fakeip/) | 分流与 Fake-IP | DNS 解析异常 | troubleshooting |
| 报错“failed to create TUN device”或无法创建虚拟网卡 | [/troubleshooting/failed-to-create-tun-device-wintun-error/](/troubleshooting/failed-to-create-tun-device-wintun-error/) | 虚拟网卡与权限 | TUN、路由与模式冲突 | troubleshooting |
| 手动下载并向系统注入wintun.dll虚拟网卡驱动的指南 | [/troubleshooting/manually-installing-wintun-dll-driver/](/troubleshooting/manually-installing-wintun-dll-driver/) | 虚拟网卡与权限 | TUN、路由与模式冲突 | troubleshooting |
| 排查安全软件静默拦截虚拟网络适配器安装的日志证据 | [/troubleshooting/antivirus-blocking-tun-adapter-creation/](/troubleshooting/antivirus-blocking-tun-adapter-creation/) | 虚拟网卡与权限 | TUN、路由与模式冲突 | troubleshooting |
| 报错“routing loop detected”死循环导致核心崩溃的排错 | [/troubleshooting/routing-loop-detected-crashing-proxy-core/](/troubleshooting/routing-loop-detected-crashing-proxy-core/) | 路径与双栈 | TUN、路由与模式冲突 | troubleshooting |
| 本地IPv6网络绕过TUN虚拟网卡导致真实公网IP暴露的防御 | [/troubleshooting/ipv6-traffic-bypassing-tun-causing-ip-leak/](/troubleshooting/ipv6-traffic-bypassing-tun-causing-ip-leak/) | 路径与双栈 | TUN、路由与模式冲突 | troubleshooting |
| Hyper-V与VMware虚拟交换机与代理TUN网卡冲突的处理 | [/troubleshooting/hyper-v-vmware-virtual-switches-conflict-tun/](/troubleshooting/hyper-v-vmware-virtual-switches-conflict-tun/) | 路径与双栈 | TUN、路由与模式冲突 | troubleshooting |
| 测速始终卡在10Mbps：从客户端核心、网卡到线路逐级摸排 | [/troubleshooting/proxy-speed-capped-at-10mbps-bottleneck-analysis/](/troubleshooting/proxy-speed-capped-at-10mbps-bottleneck-analysis/) | 带宽与处理瓶颈 | 慢速、掉线与持续质量 | troubleshooting |
| 代理核心进程持续占用单核100% CPU的原因与规则调优 | [/troubleshooting/high-cpu-usage-by-proxy-core-process/](/troubleshooting/high-cpu-usage-by-proxy-core-process/) | 带宽与处理瓶颈 | 慢速、掉线与持续质量 | troubleshooting |
| MTU过大导致分片丢包：在客户端中调优TUN模式MTU数值 | [/troubleshooting/mtu-size-misconfiguration-causing-packet-loss/](/troubleshooting/mtu-size-misconfiguration-causing-packet-loss/) | 带宽与处理瓶颈 | 慢速、掉线与持续质量 | troubleshooting |
| 每隔几分钟连接自动中断重连：TCP Keep-Alive参数调优 | [/troubleshooting/connections-drop-every-few-minutes-keepalive/](/troubleshooting/connections-drop-every-few-minutes-keepalive/) | 间歇中断与恢复 | 慢速、掉线与持续质量 | troubleshooting |
| 运营商对UDP流量严重QoS限速时关闭网页QUIC协议 | [/troubleshooting/udp-quic-blocked-by-isp-causing-streaming-stutter/](/troubleshooting/udp-quic-blocked-by-isp-causing-streaming-stutter/) | 间歇中断与恢复 | 慢速、掉线与持续质量 | troubleshooting |
| 使用MTR持续跟踪到节点机房的每一跳丢包率与抖动 | [/troubleshooting/diagnosing-transit-route-loss-with-mtr/](/troubleshooting/diagnosing-transit-route-loss-with-mtr/) | 间歇中断与恢复 | 慢速、掉线与持续质量 | troubleshooting |
| 访问ChatGPT提示Access Denied、Error 1020或不支持区域 | [/troubleshooting/chatgpt-access-denied-error-1020-blocked/](/troubleshooting/chatgpt-access-denied-error-1020-blocked/) | AI 与开发工具 | AI、视频与开发工具故障 | troubleshooting |
| Git Clone提示“Failed to connect to github.com port 443”修复 | [/troubleshooting/git-clone-fails-with-schannel-ssl-connect-error/](/troubleshooting/git-clone-fails-with-schannel-ssl-connect-error/) | AI 与开发工具 | AI、视频与开发工具故障 | troubleshooting |
| pip install、npm install与Docker拉取镜像走代理配置 | [/troubleshooting/pip-npm-docker-pull-connection-timeout-fix/](/troubleshooting/pip-npm-docker-pull-connection-timeout-fix/) | AI 与开发工具 | AI、视频与开发工具故障 | troubleshooting |
| Netflix只能看自制剧：节点被判定为机房IP的解锁恢复 | [/troubleshooting/netflix-only-shows-originals-region-unblock-fix/](/troubleshooting/netflix-only-shows-originals-region-unblock-fix/) | 播放与网页异常 | AI、视频与开发工具故障 | troubleshooting |
| YouTube播放默认清晰度极低且经常转圈的缓冲区诊断 | [/troubleshooting/youtube-defaults-to-360p-buffer-health-check/](/troubleshooting/youtube-defaults-to-360p-buffer-health-check/) | 播放与网页异常 | AI、视频与开发工具故障 | troubleshooting |
| Discord语音频道一直卡在“RTC Connecting”或无法收发语音 | [/troubleshooting/discord-rtc-connecting-voice-channel-failure/](/troubleshooting/discord-rtc-connecting-voice-channel-failure/) | 播放与网页异常 | AI、视频与开发工具故障 | troubleshooting |
| 代理客户端评测方法论：硬件基准、网络环境与控制变量 | [/reviews/proxy-client-benchmark-methodology-explained/](/reviews/proxy-client-benchmark-methodology-explained/) | 控制变量与任务 | 评测方法与样本 | reviews |
| 标准化负载任务设计：大文件并发吞吐与多Tab网页加载 | [/reviews/standardizing-test-workloads-browsing-vs-streaming/](/reviews/standardizing-test-workloads-browsing-vs-streaming/) | 控制变量与任务 | 评测方法与样本 | reviews |
| 使用弱网模拟工具测试各客户端在30%丢包下的恢复能力 | [/reviews/simulating-weak-network-and-packet-loss-tests/](/reviews/simulating-weak-network-and-packet-loss-tests/) | 控制变量与任务 | 评测方法与样本 | reviews |
| 如何客观采集客户端进程CPU、工作集内存与句柄数指标 | [/reviews/collecting-memory-and-cpu-metrics-objectively/](/reviews/collecting-memory-and-cpu-metrics-objectively/) | 统计与证据 | 评测方法与样本 | reviews |
| 各客户端冷启动耗时与万级规则切换延迟的测算方法 | [/reviews/measuring-cold-start-and-profile-switch-latency/](/reviews/measuring-cold-start-and-profile-switch-latency/) | 统计与证据 | 评测方法与样本 | reviews |
| 原始测试日志归档规范与读者可自行复现的测试脚本 | [/reviews/logging-and-reproducing-benchmark-evidence/](/reviews/logging-and-reproducing-benchmark-evidence/) | 统计与证据 | 评测方法与样本 | reviews |
| Clash Verge Rev对比Clash Nyanpasu：UI美观度与易用性实测 | [/reviews/clash-verge-rev-vs-clash-nyanpasu-comparison/](/reviews/clash-verge-rev-vs-clash-nyanpasu-comparison/) | 界面与使用流程 | Clash 系客户端比较 | reviews |
| FlClash对比Clash Verge Rev：跨平台一致性与交互流畅度 | [/reviews/flclash-vs-clash-verge-rev-ux-benchmarks/](/reviews/flclash-vs-clash-verge-rev-ux-benchmarks/) | 界面与使用流程 | Clash 系客户端比较 | reviews |
| 多配置订阅同时存在时各Clash客户端的平滑切换体验 | [/reviews/clash-multi-profile-switching-experience/](/reviews/clash-multi-profile-switching-experience/) | 界面与使用流程 | Clash 系客户端比较 | reviews |
| 扩展配置与插件能力对比：JavaScript支持与Merge规则 | [/reviews/comparing-script-and-merge-capabilities-clash/](/reviews/comparing-script-and-merge-capabilities-clash/) | 扩展与维护 | Clash 系客户端比较 | reviews |
| 核对Mihomo核心版本跟进速度与各客户端内置更新器 | [/reviews/kernel-update-cadence-in-verge-and-nyanpasu/](/reviews/kernel-update-cadence-in-verge-and-nyanpasu/) | 扩展与维护 | Clash 系客户端比较 | reviews |
| Clash各大活跃分支的开源社区活跃度与Bug修复周期 | [/reviews/open-source-community-health-of-clash-forks/](/reviews/open-source-community-health-of-clash-forks/) | 扩展与维护 | Clash 系客户端比较 | reviews |
| v2rayN对比NekoBox：高级路由配置与核心暴露深度评测 | [/reviews/v2rayn-vs-nekobox-multi-core-feature-depth/](/reviews/v2rayn-vs-nekobox-multi-core-feature-depth/) | 能力暴露与切换 | Xray 与多核心客户端比较 | reviews |
| 在v2rayN中无缝切换Xray与sing-box核心的稳定性表现 | [/reviews/switching-between-xray-and-singbox-in-v2rayn/](/reviews/switching-between-xray-and-singbox-in-v2rayn/) | 能力暴露与切换 | Xray 与多核心客户端比较 | reviews |
| 分组管理与批量测试功能：v2rayN海量节点运维效率 | [/reviews/sub-group-management-in-v2rayn-vs-nekoray/](/reviews/sub-group-management-in-v2rayn-vs-nekoray/) | 能力暴露与切换 | Xray 与多核心客户端比较 | reviews |
| 桌面端v2rayN与移动端v2rayNG剪贴板批量导入容错率对比 | [/reviews/v2rayn-vs-v2rayng-clipboard-import-speed/](/reviews/v2rayn-vs-v2rayng-clipboard-import-speed/) | 导入和诊断 | Xray 与多核心客户端比较 | reviews |
| 内置日志查看器与实时连接追踪功能的使用便利度 | [/reviews/comparing-built-in-log-viewers-for-troubleshooting/](/reviews/comparing-built-in-log-viewers-for-troubleshooting/) | 导入和诊断 | Xray 与多核心客户端比较 | reviews |
| v2rayN图形化路由规则编辑器的上手门槛与灵活性评测 | [/reviews/v2rayn-custom-routing-rule-editor-evaluation/](/reviews/v2rayn-custom-routing-rule-editor-evaluation/) | 导入和诊断 | Xray 与多核心客户端比较 | reviews |
| sing-box官方图形界面对比Hiddify：开箱即用度实测 | [/reviews/official-singbox-gui-vs-hiddify-comparison/](/reviews/official-singbox-gui-vs-hiddify-comparison/) | 默认配置与导入 | sing-box 客户端比较 | reviews |
| Karing对比Hiddify：通用订阅导入与协议兼容度全方位横评 | [/reviews/karing-vs-hiddify-multi-protocol-support/](/reviews/karing-vs-hiddify-multi-protocol-support/) | 默认配置与导入 | sing-box 客户端比较 | reviews |
| 各三方sing-box客户端生成配置与官方标准格式的符合度 | [/reviews/singbox-universal-json-generation-compliance/](/reviews/singbox-universal-json-generation-compliance/) | 默认配置与导入 | sing-box 客户端比较 | reviews |
| sing-box核心升级导致语法变动时不同客户端的容错表现 | [/reviews/how-different-singbox-apps-handle-schema-breakage/](/reviews/how-different-singbox-apps-handle-schema-breakage/) | 版本迁移与错误 | sing-box 客户端比较 | reviews |
| 配置出现非法字段时各GUI客户端的崩溃预防与错误提示 | [/reviews/crash-recovery-in-singbox-gui-clients/](/reviews/crash-recovery-in-singbox-gui-clients/) | 版本迁移与错误 | sing-box 客户端比较 | reviews |
| 远程.srs规则集二进制自动拉取与本地更新缓存机制对比 | [/reviews/singbox-rule-set-auto-download-efficiency/](/reviews/singbox-rule-set-auto-download-efficiency/) | 版本迁移与错误 | sing-box 客户端比较 | reviews |
| Windows桌面代理客户端空闲待机内存开销实测横评 | [/reviews/desktop-client-idle-memory-footprint-benchmark/](/reviews/desktop-client-idle-memory-footprint-benchmark/) | CPU、内存与启动 | 桌面资源与连接表现 | reviews |
| 万条规则并发匹配与DNS查询时各客户端CPU峰值占用 | [/reviews/cpu-spikes-during-10000-rule-matching-benchmark/](/reviews/cpu-spikes-during-10000-rule-matching-benchmark/) | CPU、内存与启动 | 桌面资源与连接表现 | reviews |
| 从点击启动到首个网络请求完成代理的耗时秒表测定 | [/reviews/client-cold-start-to-traffic-ready-latency/](/reviews/client-cold-start-to-traffic-ready-latency/) | CPU、内存与启动 | 桌面资源与连接表现 | reviews |
| 连续挂机72小时长效稳定性测试：是否存在内存泄漏 | [/reviews/72-hour-continuous-operation-memory-leak-test/](/reviews/72-hour-continuous-operation-memory-leak-test/) | 持续使用与恢复 | 桌面资源与连接表现 | reviews |
| 笔记本休眠唤醒后各客户端虚拟网卡与网络恢复成功率 | [/reviews/laptop-sleep-and-wake-proxy-recovery-benchmark/](/reviews/laptop-sleep-and-wake-proxy-recovery-benchmark/) | 持续使用与恢复 | 桌面资源与连接表现 | reviews |
| 千兆公网并发下载压测下客户端进程崩溃与丢包率记录 | [/reviews/handling-gigabit-throughput-stress-test/](/reviews/handling-gigabit-throughput-stress-test/) | 持续使用与恢复 | 桌面资源与连接表现 | reviews |
| v2rayNG、Clash Meta与Hiddify在Android下的耗电量评测 | [/reviews/android-proxy-battery-drain-comparison/](/reviews/android-proxy-battery-drain-comparison/) | 电量与后台 | 移动端续航与网络切换 | reviews |
| iOS端小火箭Shadowrocket对比Surge后台待机耗电实测 | [/reviews/ios-shadowrocket-vs-surge-battery-impact/](/reviews/ios-shadowrocket-vs-surge-battery-impact/) | 电量与后台 | 移动端续航与网络切换 | reviews |
| 国内品牌手机激进杀后台机制下各客户端的保活存活率 | [/reviews/aggressive-oem-battery-killer-survival-rates/](/reviews/aggressive-oem-battery-killer-survival-rates/) | 电量与后台 | 移动端续航与网络切换 | reviews |
| 从WiFi切换到蜂窝移动网络时节点重连的延迟测算 | [/reviews/wifi-to-cellular-handover-reconnect-latency/](/reviews/wifi-to-cellular-handover-reconnect-latency/) | 切网与应用体验 | 移动端续航与网络切换 | reviews |
| 地铁与地下车库弱网环境下各移动客户端快速恢复表现 | [/reviews/subway-weak-signal-recovery-comparison/](/reviews/subway-weak-signal-recovery-comparison/) | 切网与应用体验 | 移动端续航与网络切换 | reviews |
| 移动端分应用代理开启后对国内主流App加载速度的影响 | [/reviews/split-tunnel-app-proxy-performance-mobile/](/reviews/split-tunnel-app-proxy-performance-mobile/) | 切网与应用体验 | 移动端续航与网络切换 | reviews |
| 百个节点同时导入时各客户端的解析耗时与界面卡顿评测 | [/reviews/benchmark-importing-100-nodes-across-clients/](/reviews/benchmark-importing-100-nodes-across-clients/) | 导入效率与可解释性 | 订阅管理与配置体验 | reviews |
| 节点测速结果排序、分组展示与已用流量可视化的体验对比 | [/reviews/visualizing-node-latency-and-traffic-usage-ux/](/reviews/visualizing-node-latency-and-traffic-usage-ux/) | 导入效率与可解释性 | 订阅管理与配置体验 | reviews |
| 订阅拉取失败时各客户端报错信息的可理解度与诊断指引 | [/reviews/error-message-clarity-when-subscription-fails/](/reviews/error-message-clarity-when-subscription-fails/) | 导入效率与可解释性 | 订阅管理与配置体验 | reviews |
| 后台静默定时更新订阅时的成功率与异常重试机制 | [/reviews/background-silent-subscription-update-reliability/](/reviews/background-silent-subscription-update-reliability/) | 更新与冲突处理 | 订阅管理与配置体验 | reviews |
| 更新订阅后本地自定义节点备注与规则是否被无情覆盖 | [/reviews/custom-rules-retention-during-subscription-update/](/reviews/custom-rules-retention-during-subscription-update/) | 更新与冲突处理 | 订阅管理与配置体验 | reviews |
| 多机场订阅共存时多源管理界面的组织便利性横评 | [/reviews/merging-multiple-subscriptions-ux-comparison/](/reviews/merging-multiple-subscriptions-ux-comparison/) | 更新与冲突处理 | 订阅管理与配置体验 | reviews |
| 常见GeoIP与GeoSite规则库在国内外网站分流上的准确率 | [/reviews/evaluating-accuracy-of-geoip-and-geosite-routing/](/reviews/evaluating-accuracy-of-geoip-and-geosite-routing/) | 分流准确性 | 分流、DNS 与 TUN 行为 | reviews |
| 全平台主流客户端DNS防泄露实测：谁在悄悄向ISP查询 | [/reviews/dns-leak-test-results-across-all-clients/](/reviews/dns-leak-test-results-across-all-clients/) | 分流准确性 | 分流、DNS 与 TUN 行为 | reviews |
| 开启代理后WebRTC真实IP泄露测试与各客户端防御效果 | [/reviews/udp-and-webrtc-leak-prevention-benchmark/](/reviews/udp-and-webrtc-leak-prevention-benchmark/) | 分流准确性 | 分流、DNS 与 TUN 行为 | reviews |
| IPv4/IPv6双栈环境下各客户端的优先解析与回退策略 | [/reviews/ipv4-ipv6-dual-stack-routing-behavior/](/reviews/ipv4-ipv6-dual-stack-routing-behavior/) | 解析与双栈 | 分流、DNS 与 TUN 行为 | reviews |
| Wintun虚拟网卡模式对比系统代理模式的吞吐量与丢包率 | [/reviews/wintun-vs-system-proxy-packet-loss-comparison/](/reviews/wintun-vs-system-proxy-packet-loss-comparison/) | 解析与双栈 | 分流、DNS 与 TUN 行为 | reviews |
| 内置DNS缓存命中率对日常网页首屏加载时间的提升评测 | [/reviews/local-dns-cache-hit-rate-and-latency-benchmarks/](/reviews/local-dns-cache-hit-rate-and-latency-benchmarks/) | 解析与双栈 | 分流、DNS 与 TUN 行为 | reviews |
| 开源程度核查：核心与GUI是否完全开源或包含未公开二进制 | [/reviews/evaluating-client-source-code-transparency/](/reviews/evaluating-client-source-code-transparency/) | 发布与权限 | 来源透明与维护质量 | reviews |
| 可复现构建(Reproducible Builds)在主流代理工具中的现状 | [/reviews/reproducible-builds-status-for-popular-clients/](/reviews/reproducible-builds-status-for-popular-clients/) | 发布与权限 | 来源透明与维护质量 | reviews |
| 排查客户端是否内置未经授权的遥测、统计或第三方SDK | [/reviews/auditing-third-party-network-analytics-in-clients/](/reviews/auditing-third-party-network-analytics-in-clients/) | 发布与权限 | 来源透明与维护质量 | reviews |
| 各项目GitHub Issues响应中位数与安全漏洞修复记录 | [/reviews/github-issues-response-time-and-resolution-rate/](/reviews/github-issues-response-time-and-resolution-rate/) | 维护与问题反馈 | 来源透明与维护质量 | reviews |
| 历史高危漏洞发生时各客户端推送紧急补丁的响应速度 | [/reviews/handling-cve-vulnerabilities-in-proxy-cores/](/reviews/handling-cve-vulnerabilities-in-proxy-cores/) | 维护与问题反馈 | 来源透明与维护质量 | reviews |
| 巴士系数(Bus Factor)评估：单人维护项目停更的潜在风险 | [/reviews/project-bus-factor-and-sole-maintainer-risks/](/reviews/project-bus-factor-and-sole-maintainer-risks/) | 维护与问题反馈 | 来源透明与维护质量 | reviews |
| 零基础新手从安装到首次连通耗时评测：谁最开箱即用 | [/reviews/novice-time-to-first-connection-benchmark/](/reviews/novice-time-to-first-connection-benchmark/) | 新手与无障碍 | 易用性、费用与设备选择 | reviews |
| 屏幕阅读器与纯键盘操作在各代理客户端中的无障碍支持 | [/reviews/screen-reader-and-keyboard-accessibility-review/](/reviews/screen-reader-and-keyboard-accessibility-review/) | 新手与无障碍 | 易用性、费用与设备选择 | reviews |
| 多语言本地化翻译水准与技术术语中文表述的准确度 | [/reviews/multi-language-localization-quality-review/](/reviews/multi-language-localization-quality-review/) | 新手与无障碍 | 易用性、费用与设备选择 | reviews |
| 免费开源工具与付费商业客户端(如Surge)的性价比综合算账 | [/reviews/free-open-source-vs-paid-commercial-clients/](/reviews/free-open-source-vs-paid-commercial-clients/) | 软件收费与长期投入 | 易用性、费用与设备选择 | reviews |
| 买断制、订阅制与设备激活数绑定的使用限制分析 | [/reviews/in-app-purchase-models-and-license-bind-limits/](/reviews/in-app-purchase-models-and-license-bind-limits/) | 软件收费与长期投入 | 易用性、费用与设备选择 | reviews |
| 跨五年时间跨度使用代理软件的总拥有成本(TCO)核算 | [/reviews/long-term-total-cost-of-ownership-proxy-tools/](/reviews/long-term-total-cost-of-ownership-proxy-tools/) | 软件收费与长期投入 | 易用性、费用与设备选择 | reviews |
| 图解代理三要素：客户端界面、协议核心与机场服务的分工 | [/learn/demystifying-client-kernel-and-airport-roles/](/learn/demystifying-client-kernel-and-airport-roles/) | 服务角色 | 客户端、机场与核心关系 | learn |
| 为什么购买了Shadowrocket或下载了Clash依然无法上网？ | [/learn/why-buying-software-does-not-include-nodes/](/learn/why-buying-software-does-not-include-nodes/) | 服务角色 | 客户端、机场与核心关系 | learn |
| 断网到底是谁的锅：区分节点故障、本地配置与软件Bug | [/learn/airport-responsibility-vs-client-bug-boundaries/](/learn/airport-responsibility-vs-client-bug-boundaries/) | 服务角色 | 客户端、机场与核心关系 | learn |
| 什么是代理核心(Core)：Xray、Mihomo与sing-box的真实职责 | [/learn/what-is-a-proxy-kernel-core-mechanics/](/learn/what-is-a-proxy-kernel-core-mechanics/) | 能力与边界 | 客户端、机场与核心关系 | learn |
| GUI外壳与底层Daemon守护进程之间的数据通信机制 | [/learn/gui-wrapper-versus-underlying-daemon-flow/](/learn/gui-wrapper-versus-underlying-daemon-flow/) | 能力与边界 | 客户端、机场与核心关系 | learn |
| 为什么客户端优化无法逾越物理距离与劣质机房的带宽瓶颈 | [/learn/why-clients-cannot-magically-accelerate-bad-nodes/](/learn/why-clients-cannot-magically-accelerate-bad-nodes/) | 能力与边界 | 客户端、机场与核心关系 | learn |
| 明确你的真实网络需求：科研查资料、跨国办公还是流媒体 | [/learn/assessing-your-proxy-needs-work-study-gaming/](/learn/assessing-your-proxy-needs-work-study-gaming/) | 需求和准备 | 从零开始的使用路径 | learn |
| 开启代理前的设备准备：操作系统支持、磁盘空间与权限 | [/learn/hardware-and-system-readiness-checklist/](/learn/hardware-and-system-readiness-checklist/) | 需求和准备 | 从零开始的使用路径 | learn |
| 在开始折腾前确认本地宽带的基础健康状态 | [/learn/understanding-basic-internet-connectivity-checks/](/learn/understanding-basic-internet-connectivity-checks/) | 需求和准备 | 从零开始的使用路径 | learn |
| 从新手到熟练：掌握科学网络工具的五个关键里程碑 | [/learn/five-milestones-of-proxy-mastery-journey/](/learn/five-milestones-of-proxy-mastery-journey/) | 阶段与完成标准 | 从零开始的使用路径 | learn |
| 如何确认你的代理设置完全成功：验收测试三步法 | [/learn/acceptance-criteria-for-successful-proxy-setup/](/learn/acceptance-criteria-for-successful-proxy-setup/) | 阶段与完成标准 | 从零开始的使用路径 | learn |
| 当代理突然无法连接时的新手急救自查思维导图 | [/learn/what-to-do-when-your-proxy-suddenly-stops/](/learn/what-to-do-when-your-proxy-suddenly-stops/) | 阶段与完成标准 | 从零开始的使用路径 | learn |
| CPU架构快速科普：x86_64、ARM64与mips该怎么看 | [/learn/demystifying-cpu-architectures-x64-arm64-armv7/](/learn/demystifying-cpu-architectures-x64-arm64-armv7/) | 系统与硬件身份 | 系统、架构与版本常识 | learn |
| Windows、macOS与Linux在网络栈与代理机制上的底层差异 | [/learn/operating-system-differences-windows-mac-linux/](/learn/operating-system-differences-windows-mac-linux/) | 系统与硬件身份 | 系统、架构与版本常识 | learn |
| 移动端iOS与Android沙盒环境对代理后台的严苛限制 | [/learn/mobile-os-sandboxing-and-vpn-api-limitations/](/learn/mobile-os-sandboxing-and-vpn-api-limitations/) | 系统与硬件身份 | 系统、架构与版本常识 | learn |
| 如何看懂软件版本号：为什么主版本号改变意味着破坏性改动 | [/learn/semantic-versioning-major-minor-patch-guide/](/learn/semantic-versioning-major-minor-patch-guide/) | 版本与维护知识 | 系统、架构与版本常识 | learn |
| Alpha、Beta、Release与Nightly版本发布通道的含义 | [/learn/stable-beta-nightly-release-channels-explained/](/learn/stable-beta-nightly-release-channels-explained/) | 版本与维护知识 | 系统、架构与版本常识 | learn |
| 代理软件的长期支持(LTS)理念与拒绝无脑跟风更新 | [/learn/long-term-support-lts-concept-for-proxies/](/learn/long-term-support-lts-concept-for-proxies/) | 版本与维护知识 | 系统、架构与版本常识 | learn |
| 什么是节点：服务器IP、端口、协议与密码的具体物理存在 | [/learn/what-is-a-node-server-ip-port-and-protocol/](/learn/what-is-a-node-server-ip-port-and-protocol/) | 链接、节点和配置 | 订阅与配置基本概念 | learn |
| 订阅链接到底是什么：为什么它能动态拉取一长串节点 | [/learn/what-is-a-subscription-url-and-how-it-works/](/learn/what-is-a-subscription-url-and-how-it-works/) | 链接、节点和配置 | 订阅与配置基本概念 | learn |
| 单节点URI与完整配置文件的区别与适用场景 | [/learn/difference-between-single-node-and-full-profile/](/learn/difference-between-single-node-and-full-profile/) | 链接、节点和配置 | 订阅与配置基本概念 | learn |
| 为什么订阅链接会失效：套餐到期、流量耗尽与Token被重置 | [/learn/why-subscription-links-expire-and-stop-updating/](/learn/why-subscription-links-expire-and-stop-updating/) | 更新与失效原理 | 订阅与配置基本概念 | learn |
| 机场机房IP被墙更换后，客户端如何通过订阅静默获取新地址 | [/learn/how-node-ip-changes-are-delivered-via-sub/](/learn/how-node-ip-changes-are-delivered-via-sub/) | 更新与失效原理 | 订阅与配置基本概念 | learn |
| 手动修改订阅配置文件后再次更新被覆盖的底层逻辑 | [/learn/local-config-tampering-risks-explained/](/learn/local-config-tampering-risks-explained/) | 更新与失效原理 | 订阅与配置基本概念 | learn |
| 用大白话讲透网络分层：从TCP/UDP传输层到HTTP应用层 | [/learn/osi-model-layers-explained-for-proxy-users/](/learn/osi-model-layers-explained-for-proxy-users/) | 连接层次 | 网络与协议入门 | learn |
| 协议进化史：从原始Shadowsocks到VMess与VLESS的演进 | [/learn/shadowsocks-vmess-vless-evolution-history/](/learn/shadowsocks-vmess-vless-evolution-history/) | 连接层次 | 网络与协议入门 | learn |
| 基于UDP的新一代协议：Hysteria 2与TUIC为什么速度更快 | [/learn/quic-udp-protocols-hysteria-and-tuic-explained/](/learn/quic-udp-protocols-hysteria-and-tuic-explained/) | 连接层次 | 网络与协议入门 | learn |
| IP地址、子网掩码与自治系统(ASN)通俗解说 | [/learn/what-is-an-ip-address-and-asn-explained/](/learn/what-is-an-ip-address-and-asn-explained/) | 地址与路径 | 网络与协议入门 | learn |
| 输入网址后发生了什么：DNS解析的完整生命周期 | [/learn/how-domain-names-resolve-to-ips-via-dns/](/learn/how-domain-names-resolve-to-ips-via-dns/) | 地址与路径 | 网络与协议入门 | learn |
| 数据包是如何漂洋过海的：海底光缆与国际骨干网传输 | [/learn/routing-packets-across-international-cables/](/learn/routing-packets-across-international-cables/) | 地址与路径 | 网络与协议入门 | learn |
| 全局模式、规则模式与直连模式的核心区别与选择策略 | [/learn/global-vs-rule-vs-direct-mode-explained/](/learn/global-vs-rule-vs-direct-mode-explained/) | 模式选择概念 | 代理模式与流量范围 | learn |
| 为什么日常使用绝不推荐全局模式：网速变慢与国内封号 | [/learn/why-you-should-never-use-global-mode-daily/](/learn/why-you-should-never-use-global-mode-daily/) | 模式选择概念 | 代理模式与流量范围 | learn |
| 规则模式如何智能判定流量走直连还是走代理节点 | [/learn/how-rule-mode-decides-which-traffic-to-proxy/](/learn/how-rule-mode-decides-which-traffic-to-proxy/) | 模式选择概念 | 代理模式与流量范围 | learn |
| 127.0.0.1与localhost：本地回环地址与代理端口监听 | [/learn/loopback-address-and-localhost-explained/](/learn/loopback-address-and-localhost-explained/) | 使用边界与本地网络 | 代理模式与流量范围 | learn |
| 私有IP地址段(10.x, 172.16.x, 192.168.x)与局域网直连 | [/learn/lan-private-ip-ranges-192-168-explained/](/learn/lan-private-ip-ranges-192-168-explained/) | 使用边界与本地网络 | 代理模式与流量范围 | learn |
| 为什么打开代理后部分国内银行App和政务网站拒绝访问 | [/learn/why-local-banking-apps-reject-proxy-traffic/](/learn/why-local-banking-apps-reject-proxy-traffic/) | 使用边界与本地网络 | 代理模式与流量范围 | learn |
| 看穿机场定价套路：月付、季付、年付与每GB真实单价 | [/learn/airport-pricing-tiers-and-hidden-unit-costs/](/learn/airport-pricing-tiers-and-hidden-unit-costs/) | 价格和周期 | 套餐、流量与付费常识 | learn |
| 超低价年付“跑路”概率与小成本月付保平安逻辑 | [/learn/why-extremely-cheap-annual-plans-often-exit-scam/](/learn/why-extremely-cheap-annual-plans-often-exit-scam/) | 价格和周期 | 套餐、流量与付费常识 | learn |
| 美元标价、USDT虚拟币支付与第三方通道手续费解密 | [/learn/currency-exchange-rates-and-payment-gateway-fees/](/learn/currency-exchange-rates-and-payment-gateway-fees/) | 价格和周期 | 套餐、流量与付费常识 | learn |
| 自然月重置与账单日重置：你的流量什么时候会归零 | [/learn/calendar-month-vs-billing-cycle-reset-explained/](/learn/calendar-month-vs-billing-cycle-reset-explained/) | 额度和限制 | 套餐、流量与付费常识 | learn |
| 什么是节点倍率：为什么用10G流量会被扣除30G余额 | [/learn/what-is-traffic-multiplier-ratio-in-airports/](/learn/what-is-traffic-multiplier-ratio-in-airports/) | 额度和限制 | 套餐、流量与付费常识 | learn |
| 不限量流量的真相：公平使用原则(FUP)与峰值恶性限速 | [/learn/unlimited-traffic-myth-and-fair-usage-policy/](/learn/unlimited-traffic-myth-and-fair-usage-policy/) | 额度和限制 | 套餐、流量与付费常识 | learn |
| 为什么绝对不能将订阅链接公开发给他人或发在群聊中 | [/learn/why-you-must-never-share-your-sub-link/](/learn/why-you-must-never-share-your-sub-link/) | 敏感信息 | 凭据、权限与隐私常识 | learn |
| 机场运维人员到底能看到你的哪些网络浏览记录 | [/learn/what-info-can-airport-operators-actually-see/](/learn/what-info-can-airport-operators-actually-see/) | 敏感信息 | 凭据、权限与隐私常识 | learn |
| HTTPS加密的作用：代理节点能看到域名但看不到你的密码 | [/learn/https-encryption-and-what-proxies-cannot-read/](/learn/https-encryption-and-what-proxies-cannot-read/) | 敏感信息 | 凭据、权限与隐私常识 | learn |
| 信任根证书的致命危险：深入解析中间人解密技术 | [/learn/what-happens-when-you-trust-a-root-ca-cert/](/learn/what-happens-when-you-trust-a-root-ca-cert/) | 权限与证书 | 凭据、权限与隐私常识 | learn |
| 为什么代理软件必须索要系统级网络配置与VPN权限 | [/learn/why-proxy-clients-demand-system-vpn-permissions/](/learn/why-proxy-clients-demand-system-vpn-permissions/) | 权限与证书 | 凭据、权限与隐私常识 | learn |
| 安全杀毒软件误报病毒的原理与开源软件被误杀的防范 | [/learn/antivirus-false-positives-on-proxy-binaries/](/learn/antivirus-false-positives-on-proxy-binaries/) | 权限与证书 | 凭据、权限与隐私常识 | learn |
| 延迟低不等于速度快：大白话解析Ping延迟与下载带宽 | [/learn/ping-latency-vs-real-download-speed-explained/](/learn/ping-latency-vs-real-download-speed-explained/) | 指标解释 | 测速与稳定性理解 | learn |
| 网络抖动(Jitter)与丢包率对语音开黑和视频通话的致命打击 | [/learn/jitter-and-packet-loss-impact-on-calls-and-games/](/learn/jitter-and-packet-loss-impact-on-calls-and-games/) | 指标解释 | 测速与稳定性理解 | learn |
| TCP Ping、ICMP Ping与Google真实响应时间的巨大差别 | [/learn/tcping-vs-google-http-ping-benchmarks/](/learn/tcping-vs-google-http-ping-benchmarks/) | 指标解释 | 测速与稳定性理解 | learn |
| 为什么Speedtest测速几百兆但实际打开网页依然卡顿？ | [/learn/why-speedtest-results-look-great-but-web-is-slow/](/learn/why-speedtest-results-look-great-but-web-is-slow/) | 结果与证据 | 测速与稳定性理解 | learn |
| 通过YouTube“详细统计信息”客观检验视频连接速度 | [/learn/how-youtube-nerds-stats-reveal-real-speed/](/learn/how-youtube-nerds-stats-reveal-real-speed/) | 结果与证据 | 测速与稳定性理解 | learn |
| 测速也是要跑流量的：一次千兆全量测速烧掉几十G流量 | [/learn/speed-test-traffic-consumption-warning/](/learn/speed-test-traffic-consumption-warning/) | 结果与证据 | 测速与稳定性理解 | learn |
| 如何高效查阅GitHub官方文档与Release更新日志 | [/learn/how-to-read-official-github-documentation/](/learn/how-to-read-official-github-documentation/) | 文档与来源 | 查资料、求助与常用词 | learn |
| 利用GitHub搜索已关闭的Issue解决99%的历史报错 | [/learn/searching-closed-github-issues-for-solutions/](/learn/searching-closed-github-issues-for-solutions/) | 文档与来源 | 查资料、求助与常用词 | learn |
| 如何识别百度搜出来的老旧过时代理教程并主动避坑 | [/learn/identifying-outdated-and-misleading-tutorials/](/learn/identifying-outdated-and-misleading-tutorials/) | 文档与来源 | 查资料、求助与常用词 | learn |
| 提问的智慧：向机场客服或社群求助时必须提供的关键信息 | [/learn/how-to-ask-smart-questions-in-tech-communities/](/learn/how-to-ask-smart-questions-in-tech-communities/) | 反馈与复盘 | 查资料、求助与常用词 | learn |
| 提交报错日志前如何脱敏隐藏自己的私有Token与公网IP | [/learn/how-to-safely-copy-error-logs-with-redaction/](/learn/how-to-safely-copy-error-logs-with-redaction/) | 反馈与复盘 | 查资料、求助与常用词 | learn |
| 故障解决后的个人复盘：记录已知良好配置防止再次踩坑 | [/learn/writing-a-postmortem-after-fixing-a-major-glitch/](/learn/writing-a-postmortem-after-fixing-a-major-glitch/) | 反馈与复盘 | 查资料、求助与常用词 | learn |
