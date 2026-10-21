<script setup lang="ts">
interface Step {
  stepNumber: number;
  title: string;
  description: string;
  commandOrAction?: string;
  successIndicator: string;
  rollbackTip?: string;
}

defineProps<{
  steps: Step[];
}>();
</script>

<template>
  <div class="setup-steps-wrapper">
    <div v-for="step in steps" :key="step.stepNumber" class="step-card">
      <div class="step-num-col">
        <span class="step-number">{{ step.stepNumber }}</span>
      </div>
      <div class="step-content">
        <h4 class="step-title">{{ step.title }}</h4>
        <p class="step-desc">{{ step.description }}</p>
        
        <div v-if="step.commandOrAction" class="step-action-box">
          <code class="step-code">{{ step.commandOrAction }}</code>
        </div>

        <div class="step-indicator">
          <span class="indicator-icon">✓</span>
          <span class="indicator-text"><strong>成功标志:</strong> {{ step.successIndicator }}</span>
        </div>

        <div v-if="step.rollbackTip" class="step-rollback">
          <span class="rollback-icon">↩</span>
          <span class="rollback-text"><strong>回退方案:</strong> {{ step.rollbackTip }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.setup-steps-wrapper {
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.step-card {
  display: flex;
  gap: 1.25rem;
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.step-num-col {
  flex-shrink: 0;
}
.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: var(--vp-c-brand-1);
  color: #fff;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.95rem;
}
.step-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.step-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.step-desc {
  margin: 0;
  font-size: 0.925rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
.step-action-box {
  margin: 0.4rem 0;
  padding: 0.6rem 0.85rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow-x: auto;
}
.step-code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}
.step-indicator {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--vp-c-green-1, #10b981);
  margin-top: 0.25rem;
}
.step-rollback {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: 0.825rem;
  color: var(--vp-c-text-2);
}
.indicator-icon {
  font-weight: bold;
}
.rollback-icon {
  font-size: 0.9rem;
}
</style>
