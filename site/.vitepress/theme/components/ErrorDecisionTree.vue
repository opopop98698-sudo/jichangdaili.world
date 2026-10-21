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
      <div class="dt-badge-group">
        <span class="dt-badge">可逆排障决策树</span>
        <span class="dt-rule-hint">按顺序自上而下核对</span>
      </div>
      <h4 class="dt-title">{{ title }}</h4>
    </div>

    <div class="dt-nodes">
      <div v-for="(node, idx) in nodes" :key="idx" class="dt-node-item">
        <div class="dt-node-top">
          <span class="dt-step-label">节点 #0{{ idx + 1 }}</span>
          <h5 class="dt-symptom-title">{{ node.symptom }}</h5>
        </div>
        
        <div class="dt-check-box">
          <div class="dt-check-label">
            <span class="dt-check-icon">🔍</span>
            <span>执行检查项:</span>
          </div>
          <code class="dt-check-code">{{ node.checkAction }}</code>
        </div>

        <div class="dt-branches">
          <div class="dt-branch dt-branch-yes">
            <div class="branch-tag-row">
              <span class="branch-tag tag-yes">如果符合 [YES]</span>
              <span class="branch-arrow">→</span>
            </div>
            <p class="branch-text">{{ node.isYesResult }}</p>
          </div>

          <div class="dt-branch dt-branch-no">
            <div class="branch-tag-row">
              <span class="branch-tag tag-no">如果不符 [NO]</span>
              <span class="branch-arrow">→</span>
            </div>
            <p class="branch-text">{{ node.isNoResult }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.decision-tree-card {
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.dt-header {
  margin-bottom: 1.25rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.dt-badge-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dt-badge {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  letter-spacing: 0.03em;
}

.dt-rule-hint {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.dt-title {
  margin: 0.5rem 0 0 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.015em;
}

.dt-nodes {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.dt-node-item {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dt-node-top {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.dt-step-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  letter-spacing: 0.05em;
  font-family: var(--vp-font-family-mono);
}

.dt-symptom-title {
  font-weight: 700;
  font-size: 1.05rem;
  margin: 0;
  color: var(--vp-c-text-1);
}

.dt-check-box {
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.dt-check-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.dt-check-icon {
  font-size: 0.85rem;
}

.dt-check-code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
  word-break: break-all;
}

.dt-branches {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
  margin-top: 0.25rem;
}

@media (max-width: 720px) {
  .dt-branches {
    grid-template-columns: 1fr;
  }
}

.dt-branch {
  padding: 0.85rem 1rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  font-size: 0.875rem;
  line-height: 1.6;
}

.dt-branch-yes {
  background: var(--c-success-bg);
  border: 1px solid var(--c-success-border);
}

.dt-branch-no {
  background: var(--c-danger-bg);
  border: 1px solid var(--c-danger-border);
}

.branch-tag-row {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.branch-tag {
  font-size: 0.725rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  letter-spacing: 0.02em;
}

.tag-yes {
  color: var(--c-success);
  background: var(--vp-c-bg);
  border: 1px solid var(--c-success-border);
}

.tag-no {
  color: var(--c-danger);
  background: var(--vp-c-bg);
  border: 1px solid var(--c-danger-border);
}

.branch-arrow {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}

.branch-text {
  margin: 0;
  color: var(--vp-c-text-1);
}
</style>
