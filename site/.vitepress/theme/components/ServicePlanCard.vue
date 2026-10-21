<script setup lang="ts">
defineProps<{
  brand: string;
  audience: string;
  compatibility: string;
  currency?: string | null;
  price?: number | string | null;
  billingPeriod?: string | null;
  trafficRule?: string | null;
  limits?: string | null;
  verifiedAt?: string | null;
  profileUrl?: string | null;
  targetUrl?: string | null;
  commercialRelationship: 'self-operated' | 'sponsored' | 'organic-reviewed' | 'pending';
}>();
</script>

<template>
  <div class="service-plan-card">
    <div class="sp-header">
      <div class="sp-brand-info">
        <h4 class="sp-brand-name">{{ brand }}</h4>
        <span class="sp-badge" :class="commercialRelationship">
          {{ commercialRelationship === 'sponsored' ? '推广合作' : commercialRelationship === 'self-operated' ? '站方自营' : commercialRelationship === 'pending' ? '未核验/待审核' : '客观实测' }}
        </span>
      </div>
      <div class="sp-price-block">
        <template v-if="price !== null && price !== undefined">
          <span class="sp-cur">{{ currency || '¥' }}</span>
          <span class="sp-num">{{ price }}</span>
          <span class="sp-cycle">/ {{ billingPeriod || '月' }}</span>
        </template>
        <template v-else>
          <span class="sp-unverified">价格待实时核验</span>
        </template>
      </div>
    </div>

    <div class="sp-body">
      <div class="sp-row">
        <span class="sp-label">适合人群:</span>
        <span class="sp-val">{{ audience }}</span>
      </div>
      <div class="sp-row">
        <span class="sp-label">兼容客户端:</span>
        <span class="sp-val">{{ compatibility }}</span>
      </div>
      <div class="sp-row">
        <span class="sp-label">流量与重置:</span>
        <span class="sp-val">{{ trafficRule || '以服务商当前套餐规则为准' }}</span>
      </div>
      <div class="sp-row">
        <span class="sp-label">使用限制:</span>
        <span class="sp-val">{{ limits || '请遵守当地法律及服务条款' }}</span>
      </div>
    </div>

    <div class="sp-footer">
      <span class="sp-audit-date">
        {{ verifiedAt ? `核验日期: ${verifiedAt}` : '核验状态: 数据待核对' }}
      </span>
      <div class="sp-actions">
        <a v-if="profileUrl" :href="profileUrl" class="sp-btn sp-btn-profile">
          查看品牌档案
        </a>
        <a v-if="targetUrl" :href="targetUrl" target="_blank" rel="sponsored nofollow noopener noreferrer" class="sp-btn sp-btn-target">
          官网入口 ↗
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-plan-card {
  margin: 1.25rem 0;
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.sp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
.sp-brand-info {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}
.sp-brand-name {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.sp-badge {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}
.sp-badge.sponsored {
  background: #fef3c7;
  color: #92400e;
}
.sp-badge.self-operated {
  background: #dbeafe;
  color: #1e40af;
}
.sp-badge.pending {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-3);
}
.sp-badge.organic-reviewed {
  background: #d1fae5;
  color: #065f46;
}
.sp-price-block {
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
}
.sp-cur {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
.sp-num {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
}
.sp-cycle {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}
.sp-unverified {
  font-size: 0.825rem;
  color: var(--vp-c-text-3);
  font-style: italic;
}
.sp-body {
  margin: 0.85rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  font-size: 0.875rem;
}
.sp-row {
  display: flex;
  gap: 0.5rem;
}
.sp-label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 80px;
}
.sp-val {
  color: var(--vp-c-text-1);
}
.sp-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--vp-c-divider);
}
.sp-audit-date {
  font-size: 0.775rem;
  color: var(--vp-c-text-3);
}
.sp-actions {
  display: flex;
  gap: 0.5rem;
}
.sp-btn {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  text-decoration: none;
}
.sp-btn-profile {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}
.sp-btn-target {
  background: var(--vp-c-brand-1);
  color: #fff !important;
}
</style>
