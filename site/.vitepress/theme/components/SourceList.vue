<script setup lang="ts">
interface SourceItem {
  title: string;
  url: string;
  sourceType: string;
  verifiedDate: string;
  note?: string;
}

defineProps<{
  sources: SourceItem[];
}>();
</script>

<template>
  <div class="source-list-card">
    <div class="sl-header">
      <span class="sl-title">参考与官方来源</span>
      <span class="sl-desc">所有技术参数、链接均核验自以下公开渠道：</span>
    </div>
    <ul class="sl-items">
      <li v-for="(s, idx) in sources" :key="idx" class="sl-item">
        <div class="sl-item-main">
          <a :href="s.url" target="_blank" rel="noopener noreferrer" class="sl-link">
            {{ s.title }} ↗
          </a>
          <span class="sl-badge">{{ s.sourceType }}</span>
        </div>
        <div class="sl-item-meta">
          <span class="sl-date">核验时间: {{ s.verifiedDate }}</span>
          <span v-if="s.note" class="sl-note">备注: {{ s.note }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.source-list-card {
  margin: 1.5rem 0;
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.sl-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
.sl-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.sl-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}
.sl-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}
.sl-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.sl-item-main {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
}
.sl-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.sl-link:hover {
  text-decoration: underline;
}
.sl-badge {
  font-size: 0.7rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 0.05rem 0.4rem;
  border-radius: 4px;
  color: var(--vp-c-text-2);
}
.sl-item-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.775rem;
  color: var(--vp-c-text-3);
  flex-wrap: wrap;
}
</style>
