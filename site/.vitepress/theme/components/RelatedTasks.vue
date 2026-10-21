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
    <div class="rt-header">
      <span class="rt-icon">🔗</span>
      <h4 class="rt-title">下一步或相关任务指引</h4>
    </div>
    <div class="rt-grid">
      <a v-for="t in tasks" :key="t.url" :href="t.url" class="rt-card">
        <div class="rt-top-row">
          <span class="rt-badge">{{ taskTypeLabels[t.taskType] || '相关指南' }}</span>
          <span class="rt-arrow">→</span>
        </div>
        <span class="rt-name">{{ t.title }}</span>
        <span v-if="t.description" class="rt-desc">{{ t.description }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.related-tasks-box {
  margin: 2.5rem 0 1.5rem 0;
  padding: 1.35rem 1.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.rt-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.rt-icon {
  font-size: 1rem;
}

.rt-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
  letter-spacing: -0.01em;
}

.rt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.rt-card {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1rem 1.15rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
}

.rt-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.08);
}

.rt-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rt-badge {
  font-size: 0.725rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 0.15rem 0.45rem;
  border-radius: 3px;
  border: 1px solid var(--vp-c-brand-soft);
}

.rt-arrow {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  transition: transform 0.2s ease, color 0.2s ease;
}

.rt-card:hover .rt-arrow {
  color: var(--vp-c-brand-1);
  transform: translateX(3px);
}

.rt-name {
  font-size: 0.925rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.45;
}

.rt-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
