---
title: "标准核验服务商技术规范档案（审核标准模板）"
description: "本站品牌档案的基准数据结构与审查规范。详细记录审核流程、兼容测试项目、计费口径与缺失数据标记原则。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# 标准核验服务商技术规范档案

<Breadcrumbs :crumbs="[
  { title: '品牌档案', url: '/brands/' },
  { title: '审核规范模板' }
]" />

<AnswerFirst 
  conclusion="本条目作为本站所有入驻或受审查服务商的基准数据规范（Reference Audit Spec）。展示了合规档案所必须具备的完整字段模型：品牌名称、官方可信入口、协议支持范围、计费口径说明、可用性测试日志及商业关系声明。缺失数据保持 null 或待核验状态，严禁无中生有。"
  scope="全站数据模型规范 · SLA 审核标准"
  verdict="坚持数据求真，向用户展示最透明的真实技术底色。"
/>

---

## 1. 规范档案数据卡片展示

<ServicePlanCard 
  brand="标准审核技术规范 (待核验演示)"
  audience="跨国开发、海外电商运营、高吞吐学术数据传输"
  compatibility="Clash Verge Rev / v2rayN / Shadowrocket / sing-box"
  currency="CNY"
  :price="null"
  billingPeriod="月付"
  trafficRule="基础 1.0x 节点，账单日重置"
  limits="限制同时在线设备 3 台；禁止高频爬虫与邮件群发"
  commercialRelationship="pending"
  profileUrl="/brands/reference-audit-spec/"
/>

---

## 2. 审查字段模型与数据字段说明

在 `data/brands.json` 和 `data/plans.json` 中，每个服务商必须维护以下标准化结构：

```json
{
  "id": "reference-audit-spec",
  "name": "待核验商业服务（模板标准规范）",
  "status": "pending_audit",
  "officialSite": null,
  "entryUrl": null,
  "commercialRelationship": "none",
  "disclosure": "未收到授权、未实际完成可用性及长期稳定性核验的服务商保持缺失状态。",
  "supportedFormats": ["Clash YAML", "Base64", "sing-box JSON"],
  "supportedProtocols": ["VLESS", "VMess", "Trojan"],
  "lastVerifiedAt": null,
  "slaNotes": "需满足连续30天以上可用率99.5%以上方可进入正式核验名录"
}
```

---

## 3. 关联选型指引

<RelatedTasks 
  :tasks="[
    { title: '机场推荐选型指南', url: '/recommend/', taskType: 'subscription', description: '对照客户端兼容条件挑选合适服务' },
    { title: '多格式兼容机场选型', url: '/recommend/universal/', taskType: 'subscription', description: '核对服务商对 Clash、v2rayN 与 sing-box 的支持' },
    { title: '全平台客户端下载', url: '/clients/', taskType: 'download', description: '获取官方正规客户端安装包' }
  ]"
/>
