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
      <div class="sl-title-group">
        <span class="sl-icon">📚</span>
        <span class="sl-title">参考与官方来源</span>
      </div>
      <span class="sl-desc">所有技术参数、链接均核验自以下公开权威渠道：</span>
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
  margin: 2rem 0;
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.sl-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.85rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.sl-title-group {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.sl-icon {
  font-size: 1.05rem;
}

.sl-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
}

.sl-desc {
  font-size: 0.825rem;
  color: var(--vp-c-text-3);
}

.sl-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sl-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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
  font-weight: 600;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 0.1rem 0.45rem;
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
