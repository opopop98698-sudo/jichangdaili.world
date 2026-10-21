---
title: "Mihomo的proxy-providers如何与策略组关联：配置阅读示例"
description: "深入解析 Mihomo (Clash Meta) 专属的 proxy-providers 与 rule-providers 机制。提供外部订阅自动更新、策略组批量引用与规则集过滤示例。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# Mihomo的proxy-providers如何与策略组关联：配置阅读示例

<Breadcrumbs :crumbs="[
  { title: '订阅配置', url: '/subscription/' },
  { title: 'Clash YAML 配置', url: '/subscription/clash-yaml/' },
  { title: 'Proxy-Providers 关联示例' }
]" />

<AnswerFirst 
  conclusion="proxy-providers 是现代 Mihomo (Clash Meta) 内核最重要的特性之一。它将海量节点从主配置文件中剥离出去，以独立的远程链接形式动态挂载。策略组通过「use: [provider_name]」关键字直接引用整个节点池，不再需要在主配置的 proxies 列表中逐个硬编码节点名称，大幅提升了多机场合并与维护的灵活性。"
  scope="Mihomo (Clash Meta) v1.16+ · Clash Verge Rev / FlClash"
  verdict="使用 use 替代 proxies，实现机场节点列表与本地主规则的彻底解耦。"
/>

---

## 1. 核心 YAML 配置代码示例

```yaml
# 1. 声明外部节点提供者 (proxy-providers)
proxy-providers:
  airport_main:
    type: http
    url: "https://example.com/api/v1/client/subscribe?token=REDACTED&clash=1"
    path: ./profiles/airport_main.yaml
    interval: 86400 # 24小时自动更新
    health-check:
      enable: true
      url: http://cp.cloudflare.com/generate_204
      interval: 300

# 2. 策略组直接引用该 provider (通过 use 关键字)
proxy-groups:
  - name: 🚀 节点选择
    type: select
    use:
      - airport_main # 自动展开 airport_main 内包含的所有节点
    proxies:
      - DIRECT # 依然允许手动插入特殊节点

  - name: ♻️ 香港自动优选
    type: url-test
    url: http://cp.cloudflare.com/generate_204
    interval: 300
    use:
      - airport_main
    filter: "(?i)港|hk|hongkong" # 借助正则，自动只筛选出香港节点参与测速！
```

---

## 2. 常见问答 (FAQ)

<FAQSection 
  :faqs="[
    {
      question: 'filter 正则表达式的作用是什么？',
      answer: 'filter 允许你在同一个 provider 包含的成百上千个节点中，按名字智能筛选子集。例如 filter 正则匹配美或us可以让“美国专属策略组”只包含美国机房的节点，无需人工一个个挑出来。'
    }
  ]"
/>

<RelatedTasks 
  :tasks="[
    { title: 'Clash YAML 语法深度解析', url: '/subscription/how-to-read-clash-yaml-proxies-groups-rules/', taskType: 'subscription', description: '理解节点、策略组与规则的基础关系' },
    { title: '多机场订阅合并与容灾', url: '/subscription/updates/', taskType: 'subscription', description: '配置主备两家机场的 Fallback 故障转移' }
  ]"
/>
