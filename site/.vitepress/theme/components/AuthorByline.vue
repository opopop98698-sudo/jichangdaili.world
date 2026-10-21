<script setup lang="ts">
defineProps<{
  author?: string;
  role?: string;
  verifiedDate?: string;
}>();
</script>

<template>
  <div class="author-byline-card">
    <div class="ab-avatar-wrapper">
      <div class="ab-avatar-icon">🛡️</div>
    </div>
    <div class="ab-meta-info">
      <div class="ab-author-row">
        <span class="ab-author-name">{{ author || '机场代理网络协议审计组' }}</span>
        <span class="ab-role-badge">{{ role || '资深网络工程师团队' }}</span>
      </div>
      <div class="ab-details-row">
        <span class="ab-date">最后技术复查：{{ verifiedDate || '2026年10月' }}</span>
        <span class="ab-sep">·</span>
        <a href="/reviews/methodology/" class="ab-link">真机抓包与多网实测规范</a>
        <span class="ab-sep">·</span>
        <a href="/about/" class="ab-link">关于技术团队</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.author-byline-card {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 1rem;
  margin: 1.25rem 0;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
}

.ab-avatar-wrapper {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: var(--vp-c-brand-soft);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.ab-meta-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.ab-author-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.ab-author-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.ab-role-badge {
  font-size: 0.75rem;
  padding: 0.1rem 0.45rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 4px;
  font-weight: 500;
}

.ab-details-row {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.ab-sep {
  opacity: 0.5;
}

.ab-link {
  color: var(--vp-c-text-2);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.ab-link:hover {
  color: var(--vp-c-brand-1);
}
</style>
