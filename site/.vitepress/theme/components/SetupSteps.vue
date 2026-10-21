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
    <div 
      v-for="(step, idx) in steps" 
      :key="step.stepNumber" 
      class="step-card"
      :class="{ 'is-last': idx === steps.length - 1 }"
    >
      <div class="step-num-col">
        <span class="step-number">{{ step.stepNumber }}</span>
        <div v-if="idx < steps.length - 1" class="step-rail"></div>
      </div>
      <div class="step-content">
        <h4 class="step-title">{{ step.title }}</h4>
        <p class="step-desc">{{ step.description }}</p>
        
        <div v-if="step.commandOrAction" class="step-action-box">
          <div class="step-action-header">
            <span class="step-action-label">执行操作 / 命令</span>
          </div>
          <pre class="step-code"><code>{{ step.commandOrAction }}</code></pre>
        </div>

        <div class="step-indicator">
          <span class="indicator-icon">✓</span>
          <span class="indicator-text"><strong>成功标志:</strong> {{ step.successIndicator }}</span>
        </div>

        <div v-if="step.rollbackTip" class="step-rollback">
          <span class="rollback-icon">↩</span>
          <span class="rollback-text"><strong>异常回退:</strong> {{ step.rollbackTip }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.setup-steps-wrapper {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
}

.step-card {
  display: flex;
  gap: 1.25rem;
  position: relative;
  padding-bottom: 2rem;
}

.step-card.is-last {
  padding-bottom: 0.5rem;
}

.step-num-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 2.25rem;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  background: var(--vp-c-brand-1);
  color: #fff;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: 0 2px 6px rgba(0, 102, 204, 0.25);
  z-index: 2;
}

.dark .step-number {
  color: #111;
  box-shadow: 0 2px 8px rgba(59, 158, 255, 0.35);
}

.step-rail {
  width: 2px;
  flex: 1;
  background: var(--vp-c-divider);
  margin-top: 0.5rem;
  margin-bottom: -0.25rem;
  z-index: 1;
}

.step-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.step-content:hover {
  border-color: var(--vp-c-brand-soft);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.dark .step-content:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.step-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
}

.step-desc {
  margin: 0;
  font-size: 0.925rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.step-action-box {
  margin: 0.4rem 0;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.step-action-header {
  padding: 0.35rem 0.85rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
}

.step-code {
  margin: 0;
  padding: 0.75rem 0.85rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}

.step-indicator {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--c-success);
  padding: 0.5rem 0.75rem;
  background: var(--c-success-bg);
  border: 1px solid var(--c-success-border);
  border-radius: 6px;
  margin-top: 0.35rem;
}

.step-rollback {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.825rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 6px;
}

.indicator-icon {
  font-weight: 800;
  line-height: 1;
}

.rollback-icon {
  font-size: 0.95rem;
  line-height: 1;
}
</style>
