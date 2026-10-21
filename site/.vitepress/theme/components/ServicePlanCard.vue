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
          查看品牌档案 →
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
  margin: 1.5rem 0;
  padding: 1.35rem 1.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.sp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.65rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.sp-brand-info {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.sp-brand-name {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.015em;
}

.sp-badge {
  font-size: 0.725rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.sp-badge.sponsored {
  background: var(--c-warning-bg);
  color: var(--c-warning);
  border: 1px solid var(--c-warning-border);
}

.sp-badge.self-operated {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-soft);
}

.sp-badge.pending {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-divider);
}

.sp-badge.organic-reviewed {
  background: var(--c-success-bg);
  color: var(--c-success);
  border: 1px solid var(--c-success-border);
}

.sp-price-block {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.sp-cur {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.sp-num {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  letter-spacing: -0.02em;
}

.sp-cycle {
  font-size: 0.825rem;
  color: var(--vp-c-text-2);
}

.sp-unverified {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  font-style: italic;
}

.sp-body {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.sp-row {
  display: flex;
  gap: 0.65rem;
}

.sp-label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 85px;
}

.sp-val {
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.sp-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px dashed var(--vp-c-divider);
}

.sp-audit-date {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.sp-actions {
  display: flex;
  gap: 0.65rem;
}

.sp-btn {
  font-size: 0.825rem;
  font-weight: 600;
  padding: 0.4rem 0.85rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.15s ease;
}

.sp-btn-profile {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.sp-btn-profile:hover {
  border-color: var(--vp-c-brand-1);
}

.sp-btn-target {
  background: var(--vp-c-brand-1);
  color: #fff !important;
}

.dark .sp-btn-target {
  color: #111 !important;
}

.sp-btn-target:hover {
  opacity: 0.92;
}
</style>
