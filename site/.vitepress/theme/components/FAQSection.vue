<script setup lang="ts">
interface FAQItem {
  question: string;
  answer: string;
}

defineProps<{
  faqs: FAQItem[];
}>();
</script>

<template>
  <div class="faq-section">
    <div v-for="(item, idx) in faqs" :key="idx" class="faq-item">
      <div class="faq-q-row">
        <span class="faq-q-tag">Q</span>
        <h4 class="faq-question">{{ item.question }}</h4>
      </div>
      <div class="faq-a-row">
        <span class="faq-a-tag">A</span>
        <p class="faq-answer">{{ item.answer }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-section {
  margin: 1.75rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  padding: 1.25rem 1.4rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.faq-q-row {
  display: flex;
  align-items: baseline;
  gap: 0.65rem;
}

.faq-q-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.35rem;
  height: 1.35rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 800;
  flex-shrink: 0;
}

.faq-question {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.015em;
  line-height: 1.5;
}

.faq-a-row {
  display: flex;
  align-items: baseline;
  gap: 0.65rem;
}

.faq-a-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.35rem;
  height: 1.35rem;
  background: var(--c-success-bg);
  color: var(--c-success);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 800;
  flex-shrink: 0;
}

.faq-answer {
  margin: 0;
  font-size: 0.925rem;
  line-height: 1.75;
  color: var(--vp-c-text-2);
}
</style>
