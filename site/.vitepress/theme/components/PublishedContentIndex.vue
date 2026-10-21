<script setup lang="ts">
interface ArticleItem {
  title: string;
  url: string;
  slug: string;
  description?: string;
  clusterTitle?: string;
}

defineProps<{
  title: string;
  articles: ArticleItem[];
}>();
</script>

<template>
  <div class="published-index-card">
    <div class="pi-header">
      <h3 class="pi-title">{{ title }}</h3>
      <span class="pi-count">已收录 {{ articles.length }} 篇</span>
    </div>
    <div class="pi-grid">
      <a v-for="art in articles" :key="art.url" :href="art.url" class="pi-item">
        <div class="pi-item-top">
          <span v-if="art.clusterTitle" class="pi-cluster">{{ art.clusterTitle }}</span>
          <span class="pi-arrow">→</span>
        </div>
        <span class="pi-art-title">{{ art.title }}</span>
        <span v-if="art.description" class="pi-art-desc">{{ art.description }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.published-index-card {
  margin: 2.5rem 0;
}

.pi-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.25rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.pi-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.015em;
  margin: 0;
}

.pi-count {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-weight: 600;
}

.pi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.15rem;
}

.pi-item {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 1.15rem 1.25rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: border-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
}

.pi-item:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(0, 102, 204, 0.08);
}

.pi-item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pi-cluster {
  font-size: 0.725rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 0.12rem 0.45rem;
  border-radius: 4px;
  width: fit-content;
}

.pi-arrow {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  transition: transform 0.2s ease, color 0.2s ease;
}

.pi-item:hover .pi-arrow {
  color: var(--vp-c-brand-1);
  transform: translateX(3px);
}

.pi-art-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.pi-art-desc {
  font-size: 0.825rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
