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
    <h3 class="pi-title">{{ title }}</h3>
    <div class="pi-grid">
      <a v-for="art in articles" :key="art.url" :href="art.url" class="pi-item">
        <span v-if="art.clusterTitle" class="pi-cluster">{{ art.clusterTitle }}</span>
        <span class="pi-art-title">{{ art.title }}</span>
        <span v-if="art.description" class="pi-art-desc">{{ art.description }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.published-index-card {
  margin: 2rem 0;
}
.pi-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}
.pi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}
.pi-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem 1.15rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
}
.pi-item:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}
.pi-cluster {
  font-size: 0.725rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  width: fit-content;
}
.pi-art-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.45;
}
.pi-art-desc {
  font-size: 0.825rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
