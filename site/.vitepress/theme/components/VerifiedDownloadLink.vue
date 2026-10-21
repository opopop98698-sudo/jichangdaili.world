<script setup lang="ts">
defineProps<{
  title: string;
  url: string;
  fileType: string;
  arch: string;
  version: string;
  sourceType: 'github-official' | 'app-store' | 'official-mirror';
  sha256?: string;
}>();
</script>

<template>
  <div class="verified-download-card">
    <div class="vdl-left">
      <div class="vdl-title-row">
        <span class="vdl-title">{{ title }}</span>
        <span class="vdl-badge">{{ fileType }} · {{ arch }}</span>
      </div>
      <div class="vdl-meta">
        <span class="vdl-verified-tag">✓ 官方核验来源</span>
        <span class="vdl-ver">版本: v{{ version }}</span>
        <span v-if="sha256" class="vdl-sha" :title="'SHA256: ' + sha256">
          校验: {{ sha256.slice(0, 10) }}...
        </span>
      </div>
    </div>
    <div class="vdl-right">
      <a :href="url" target="_blank" rel="noopener noreferrer" class="vdl-btn">
        获取文件 ↗
      </a>
    </div>
  </div>
</template>

<style scoped>
.verified-download-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem 1.25rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: border-color 0.2s ease;
}
.verified-download-card:hover {
  border-color: var(--vp-c-brand-1);
}
.vdl-left {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.vdl-title-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
}
.vdl-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}
.vdl-badge {
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
}
.vdl-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  flex-wrap: wrap;
}
.vdl-verified-tag {
  color: var(--vp-c-green-1, #10b981);
  font-weight: 600;
}
.vdl-sha {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}
.vdl-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  background: var(--vp-c-brand-1);
  color: #fff !important;
  border-radius: 6px;
  text-decoration: none;
  white-space: nowrap;
}
.vdl-btn:hover {
  opacity: 0.9;
}
</style>
