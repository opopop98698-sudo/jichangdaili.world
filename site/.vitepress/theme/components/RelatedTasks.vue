<script setup lang="ts">
interface RelatedLink {
  title: string;
  url: string;
  taskType: 'download' | 'install' | 'subscription' | 'troubleshooting' | 'reviews' | 'learn';
  description?: string;
}

defineProps<{
  tasks: RelatedLink[];
}>();

const taskTypeLabels: Record<string, string> = {
  download: '获取客户端',
  install: '安装与启动',
  subscription: '订阅配置',
  troubleshooting: '相关排障',
  reviews: '客户端评测',
  learn: '新手必读'
};
</script>

<template>
  <div class="related-tasks-box">
    <div class="rt-title">下一步或相关任务</div>
    <div class="rt-grid">
      <a v-for="t in tasks" :key="t.url" :href="t.url" class="rt-card">
        <span class="rt-badge">{{ taskTypeLabels[t.taskType] || '相关指南' }}</span>
        <span class="rt-name">{{ t.title }}</span>
        <span v-if="t.description" class="rt-desc">{{ t.description }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.related-tasks-box {
  margin: 2rem 0;
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.rt-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.85rem;
}
.rt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.85rem;
}
.rt-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.85rem 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}
.rt-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}
.rt-badge {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  width: fit-content;
}
.rt-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}
.rt-desc {
  font-size: 0.775rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
</style>
