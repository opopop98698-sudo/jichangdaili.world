<script setup lang="ts">
interface Crumb {
  title: string;
  url?: string;
}

defineProps<{
  crumbs: Crumb[];
}>();
</script>

<template>
  <nav class="breadcrumbs-nav" aria-label="Breadcrumb">
    <ol class="bc-list">
      <li class="bc-item">
        <a href="/" class="bc-link">首页</a>
      </li>
      <li v-for="(c, idx) in crumbs" :key="idx" class="bc-item">
        <span class="bc-sep">/</span>
        <a v-if="c.url && idx < crumbs.length - 1" :href="c.url" class="bc-link">{{ c.title }}</a>
        <span v-else class="bc-current" aria-current="page">{{ c.title }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumbs-nav {
  margin-top: 0.25rem;
  margin-bottom: 1.5rem;
}

.bc-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.825rem;
  color: var(--vp-c-text-3);
  font-weight: 500;
}

.bc-item {
  display: flex;
  align-items: center;
}

.bc-sep {
  margin: 0 0.5rem;
  color: var(--vp-c-text-3);
  opacity: 0.6;
}

.bc-link {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.15s ease;
}

.bc-link:hover {
  color: var(--vp-c-brand-1);
}

.bc-current {
  color: var(--vp-c-text-1);
  font-weight: 600;
}
</style>
