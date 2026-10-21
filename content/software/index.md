---
title: "代理软件档案库：主流客户端技术指标与官方渠道"
description: "收录 Clash Verge Rev、v2rayN、v2rayNG、Shadowrocket、FlClash、Hiddify 及 sing-box 等主流代理客户端的完整软件档案、协议支持矩阵与官方安全来源。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# 代理软件官方档案库

<Breadcrumbs :crumbs="[{ title: '软件档案', url: '/software/' }]" />

<AnswerFirst 
  conclusion="本档案库为每个主流开源代理软件建立独立的数字化档案，严格追踪其官方代码仓库、底层内置核心、许可证协议、全平台支持架构及最新核验版本。拒绝任何中间商套壳打包，为用户提供最纯净、可验证的技术背景参考。"
  scope="全平台主流客户端 · 开源/商业核验标准"
  verdict="所有档案条目均直接关联官方原始分发渠道，绝不分发加壳或未验证二进制。"
/>

---

## 1. 已建立档案的客户端名录

<div class="software-cards-grid">
  <div class="sc-card">
    <div class="sc-header">
      <h3 class="sc-name">Clash Verge Rev</h3>
      <span class="sc-badge">强烈推荐</span>
    </div>
    <p class="sc-desc">基于 Tauri 框架打造的现代开源 Clash 客户端，内置新一代 Mihomo (Clash Meta) 核心，原生支持 TUN 模式与脚本扩展。</p>
    <div class="sc-meta">
      <span>底层核心: Mihomo</span>
      <span>核验版本: v1.7.7</span>
    </div>
    <div class="sc-footer">
      <a href="/software/clash-verge-rev/" class="sc-link">查看完整软件档案 →</a>
    </div>
  </div>

  <div class="sc-card">
    <div class="sc-header">
      <h3 class="sc-name">v2rayN</h3>
      <span class="sc-badge">资深推荐</span>
    </div>
    <p class="sc-desc">Windows 平台极其经典的代理客户端外壳，基于 .NET 8 开发，支持 Xray-core 与 sing-box 双核心无缝切换与海量节点测速。</p>
    <div class="sc-meta">
      <span>底层核心: Xray / sing-box</span>
      <span>核验版本: v6.60</span>
    </div>
    <div class="sc-footer">
      <a href="/software/v2rayn/" class="sc-link">查看完整软件档案 →</a>
    </div>
  </div>
</div>

<style scoped>
.software-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
  margin: 1.5rem 0;
}
.sc-card {
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  gap: 0.65rem;
}
.sc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sc-name {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.sc-badge {
  font-size: 0.725rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}
.sc-desc {
  margin: 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
.sc-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.775rem;
  color: var(--vp-c-text-3);
  padding: 0.5rem 0;
  border-top: 1px dashed var(--vp-c-divider);
}
.sc-footer {
  margin-top: auto;
}
.sc-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
</style>
