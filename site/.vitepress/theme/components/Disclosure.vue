<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'commercial' | 'safety' | 'benchmark' | 'warning';
}>(), {
  type: 'benchmark'
});

const configs = {
  commercial: {
    icon: '⚖️',
    title: '商业与利益冲突透明声明',
    className: 'type-commercial'
  },
  safety: {
    icon: '🛡️',
    title: '安全与风险免责提示',
    className: 'type-safety'
  },
  warning: {
    icon: '⚠️',
    title: '高风险安全防坑警示',
    className: 'type-safety'
  },
  benchmark: {
    icon: '🔬',
    title: '基准测试与数据可复查声明',
    className: 'type-benchmark'
  }
};

const config = configs[props.type] || configs.benchmark;
</script>

<template>
  <aside class="disclosure-box" :class="config.className" role="note">
    <div class="dc-icon-col">
      <span class="dc-icon">{{ config.icon }}</span>
    </div>
    <div class="dc-body">
      <div class="dc-title">{{ config.title }}</div>
      <div class="dc-content">
        <slot>
          本站所有软件下载链接均直链至官方 GitHub Releases 或 App Store，绝不托管或修改第三方二进制文件。若部分服务包含推广链接，将严格标记 sponsored 并接受公众监督，且绝不影响评测结论与故障排查的中立性。
        </slot>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.disclosure-box {
  margin: 1.75rem 0;
  padding: 1.15rem 1.35rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--vp-c-text-3);
  border-radius: 6px;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.type-commercial {
  border-left-color: var(--c-warning);
  background: var(--c-warning-bg);
}

.type-safety {
  border-left-color: var(--c-danger);
  background: var(--c-danger-bg);
}

.type-benchmark {
  border-left-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.dc-icon-col {
  flex-shrink: 0;
  padding-top: 0.1rem;
}

.dc-icon {
  font-size: 1.25rem;
  line-height: 1;
}

.dc-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.dc-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
}

.dc-content {
  font-size: 0.85rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}
</style>
