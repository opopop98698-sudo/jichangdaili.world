<script setup lang="ts">
defineProps<{
  conclusion: string;
  scope?: string;
  verdict?: string;
}>();
</script>

<template>
  <div class="answer-first-card">
    <div class="af-header">
      <div class="af-badge">
        <span class="af-badge-dot">●</span>
        <span>直接结论</span>
      </div>
      <span v-if="scope" class="af-scope">适用范围: {{ scope }}</span>
    </div>
    <div class="af-body">
      <p class="af-conclusion">{{ conclusion }}</p>
      <slot />
    </div>
    <div v-if="verdict" class="af-footer">
      <span class="af-verdict-icon">⚡</span>
      <span class="af-verdict-label">核心判断:</span>
      <span class="af-verdict-value">{{ verdict }}</span>
    </div>
  </div>
</template>

<style scoped>
.answer-first-card {
  margin: 1.75rem 0;
  padding: 1.25rem 1.5rem;
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
}

.af-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
}

.af-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.6rem;
  font-size: 0.775rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  border-radius: 4px;
  letter-spacing: 0.04em;
}

.af-badge-dot {
  font-size: 0.6rem;
}

.af-scope {
  font-size: 0.825rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.af-body {
  margin: 0;
}

.af-conclusion {
  font-size: 1.025rem;
  line-height: 1.75;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
}

.af-footer {
  margin-top: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 0.875rem;
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.af-verdict-icon {
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
}

.af-verdict-label {
  font-weight: 700;
  color: var(--vp-c-text-2);
}

.af-verdict-value {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
</style>
