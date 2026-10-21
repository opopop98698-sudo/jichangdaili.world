<script setup lang="ts">
defineProps<{
  name: string;
  category?: string;
  repo?: string | null;
  officialSite?: string | null;
  version: string;
  license: string;
  core: string;
  platforms: string[];
  protocols?: string[];
}>();
</script>

<template>
  <div class="client-identity-card">
    <div class="cic-header">
      <div class="cic-title-group">
        <h3 class="cic-name">{{ name }}</h3>
        <span v-if="category" class="cic-badge">{{ category }}</span>
      </div>
      <div class="cic-version-badge">已核验版本: v{{ version }}</div>
    </div>

    <div class="cic-grid">
      <div class="cic-item">
        <span class="cic-label">底层核心</span>
        <span class="cic-val">{{ core }}</span>
      </div>
      <div class="cic-item">
        <span class="cic-label">软件协议</span>
        <span class="cic-val">{{ license }}</span>
      </div>
      <div class="cic-item full-width">
        <span class="cic-label">支持平台</span>
        <div class="cic-tags">
          <span v-for="p in platforms" :key="p" class="cic-tag">{{ p }}</span>
        </div>
      </div>
      <div v-if="protocols && protocols.length" class="cic-item full-width">
        <span class="cic-label">核心协议</span>
        <div class="cic-tags">
          <span v-for="proto in protocols" :key="proto" class="cic-proto-tag">{{ proto }}</span>
        </div>
      </div>
      <div class="cic-item full-width cic-links">
        <span class="cic-label">官方发布渠道</span>
        <div class="cic-link-buttons">
          <a v-if="repo" :href="repo" target="_blank" rel="noopener noreferrer" class="cic-btn cic-btn-gh">
            GitHub 官方仓库
          </a>
          <a v-if="officialSite" :href="officialSite" target="_blank" rel="noopener noreferrer" class="cic-btn cic-btn-site">
            官方站点 / 商店
          </a>
          <span v-if="!repo && !officialSite" class="cic-val text-muted">以 App Store 官方开发者名录为准</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.client-identity-card {
  margin: 1.5rem 0;
  padding: 1.25rem 1.5rem;
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.cic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}
.cic-title-group {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}
.cic-name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.cic-badge {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
  border-radius: 4px;
}
.cic-version-badge {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
}
.cic-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}
@media (max-width: 640px) {
  .cic-grid {
    grid-template-columns: 1fr;
  }
}
.cic-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.cic-item.full-width {
  grid-column: 1 / -1;
}
.cic-label {
  font-size: 0.775rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.cic-val {
  font-size: 0.925rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}
.cic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.2rem;
}
.cic-tag {
  font-size: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  color: var(--vp-c-text-1);
}
.cic-proto-tag {
  font-size: 0.72rem;
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-soft);
  padding: 0.12rem 0.45rem;
  border-radius: 4px;
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
}
.cic-links {
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--vp-c-divider);
}
.cic-link-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.35rem;
}
.cic-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}
.cic-btn-gh {
  background-color: var(--vp-c-text-1);
  color: var(--vp-c-bg) !important;
}
.cic-btn-gh:hover {
  opacity: 0.9;
}
.cic-btn-site {
  background-color: var(--vp-c-brand-1);
  color: #fff !important;
}
.cic-btn-site:hover {
  opacity: 0.92;
}
.text-muted {
  color: var(--vp-c-text-3);
  font-style: italic;
}
</style>
