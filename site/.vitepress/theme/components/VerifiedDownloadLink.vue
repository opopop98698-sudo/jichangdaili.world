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
        <span class="vdl-verified-tag">✓ 官方核验安全发布源</span>
        <span class="vdl-ver">版本: v{{ version }}</span>
        <span v-if="sha256" class="vdl-sha" :title="'完整 SHA256: ' + sha256">
          校验: <code>{{ sha256.slice(0, 10) }}...</code>
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
  margin: 1.25rem 0;
  padding: 1.15rem 1.35rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.verified-download-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 3px 10px rgba(0, 102, 204, 0.08);
}

.vdl-left {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.vdl-title-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.vdl-title {
  font-weight: 700;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.vdl-badge {
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

.vdl-meta {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-size: 0.825rem;
  color: var(--vp-c-text-2);
  flex-wrap: wrap;
}

.vdl-verified-tag {
  color: var(--c-success);
  font-weight: 600;
}

.vdl-ver {
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.vdl-sha {
  font-size: 0.775rem;
  color: var(--vp-c-text-3);
}

.vdl-sha code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.775rem;
  padding: 0.1rem 0.3rem;
}

.vdl-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 1.15rem;
  font-size: 0.875rem;
  font-weight: 600;
  background: var(--vp-c-brand-1);
  color: #fff !important;
  border-radius: 6px;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.2s ease, transform 0.15s ease;
}

.dark .vdl-btn {
  color: #111 !important;
}

.vdl-btn:hover {
  opacity: 0.92;
  transform: translateY(-1px);
}
</style>
