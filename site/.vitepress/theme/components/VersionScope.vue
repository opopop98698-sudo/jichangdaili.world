<script setup lang="ts">
defineProps<{
  targetVersion: string;
  osScope: string;
  verifiedAt: string;
  deprecatedVersions?: string;
}>();
</script>

<template>
  <div class="version-scope-card">
    <div class="vs-item">
      <span class="vs-label">基准核验版本</span>
      <span class="vs-value highlight">v{{ targetVersion }}</span>
    </div>
    <div class="vs-item">
      <span class="vs-label">系统环境与架构</span>
      <span class="vs-value">{{ osScope }}</span>
    </div>
    <div class="vs-item">
      <span class="vs-label">实测/核验日期</span>
      <span class="vs-value">{{ verifiedAt }}</span>
    </div>
    <div v-if="deprecatedVersions" class="vs-item">
      <span class="vs-label">已知不兼容/废弃版本</span>
      <span class="vs-value text-danger">{{ deprecatedVersions }}</span>
    </div>
  </div>
</template>

<style scoped>
.version-scope-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  margin: 1.25rem 0;
  padding: 1rem 1.25rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.vs-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.vs-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  font-weight: 600;
}
.vs-value {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}
.vs-value.highlight {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  font-family: var(--vp-font-family-mono);
}
.vs-value.text-danger {
  color: var(--vp-c-red-1, #ef4444);
}
</style>
