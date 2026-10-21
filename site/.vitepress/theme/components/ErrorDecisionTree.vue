<script setup lang="ts">
interface DecisionNode {
  symptom: string;
  checkAction: string;
  isYesResult: string;
  isNoResult: string;
  solutionLink?: string;
}

defineProps<{
  title: string;
  nodes: DecisionNode[];
}>();
</script>

<template>
  <div class="decision-tree-card">
    <div class="dt-header">
      <span class="dt-badge">可逆排障决策树</span>
      <h4 class="dt-title">{{ title }}</h4>
    </div>

    <div class="dt-nodes">
      <div v-for="(node, idx) in nodes" :key="idx" class="dt-node-item">
        <div class="dt-step-label">排查项 #{{ idx + 1 }}</div>
        <div class="dt-symptom-title">{{ node.symptom }}</div>
        
        <div class="dt-check-box">
          <span class="dt-box-label">执行检查:</span>
          <code>{{ node.checkAction }}</code>
        </div>

        <div class="dt-branches">
          <div class="dt-branch dt-branch-yes">
            <span class="branch-tag tag-yes">如果是 [YES]</span>
            <span class="branch-text">{{ node.isYesResult }}</span>
          </div>
          <div class="dt-branch dt-branch-no">
            <span class="branch-tag tag-no">如果否 [NO]</span>
            <span class="branch-text">{{ node.isNoResult }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.decision-tree-card {
  margin: 1.5rem 0;
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.dt-header {
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
.dt-badge {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}
.dt-title {
  margin: 0.5rem 0 0 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.dt-nodes {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.dt-node-item {
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}
.dt-step-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
}
.dt-symptom-title {
  font-weight: 700;
  font-size: 0.975rem;
  margin: 0.2rem 0 0.5rem 0;
  color: var(--vp-c-text-1);
}
.dt-check-box {
  margin: 0.5rem 0;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.85rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}
.dt-box-label {
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.dt-branches {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 0.75rem;
}
@media (max-width: 640px) {
  .dt-branches {
    grid-template-columns: 1fr;
  }
}
.dt-branch {
  padding: 0.65rem 0.85rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.85rem;
}
.dt-branch-yes {
  background: var(--vp-c-green-soft, rgba(16, 185, 129, 0.08));
  border: 1px solid rgba(16, 185, 129, 0.2);
}
.dt-branch-no {
  background: var(--vp-c-red-soft, rgba(239, 68, 68, 0.08));
  border: 1px solid rgba(239, 68, 68, 0.2);
}
.branch-tag {
  font-size: 0.7rem;
  font-weight: 700;
  width: fit-content;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
}
.tag-yes {
  color: #065f46;
  background: #a7f3d0;
}
.tag-no {
  color: #991b1b;
  background: #fecaca;
}
.branch-text {
  color: var(--vp-c-text-1);
  line-height: 1.45;
}
</style>
