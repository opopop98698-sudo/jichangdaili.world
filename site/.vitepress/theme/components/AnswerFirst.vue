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
      <span class="af-badge">直接结论</span>
      <span v-if="scope" class="af-scope">适用范围: {{ scope }}</span>
    </div>
    <div class="af-body">
      <p class="af-conclusion">{{ conclusion }}</p>
      <slot />
    </div>
    <div v-if="verdict" class="af-footer">
      <span class="af-verdict-label">核心判断:</span>
      <span class="af-verdict-value">{{ verdict }}</span>
    </div>
  </div>
</template>

<style scoped>
.answer-first-card {
  margin: 1.5rem 0;
  padding: 1.25rem 1.5rem;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-brand-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
}
.af-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}
.af-badge {
  display: inline-block;
  padding: 0.2rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  border-radius: 4px;
  letter-spacing: 0.05em;
}
.af-scope {
  font-size: 0.825rem;
  color: var(--vp-c-text-2);
}
.af-conclusion {
  font-size: 1.05rem;
  line-height: 1.6;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
}
.af-footer {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 0.85rem;
  display: flex;
  gap: 0.5rem;
}
.af-verdict-label {
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.af-verdict-value {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
