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
      <h4 class="faq-question">Q: {{ item.question }}</h4>
      <p class="faq-answer">{{ item.answer }}</p>
    </div>
  </div>
</template>

<style scoped>
.faq-section {
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.faq-item {
  padding: 1rem 1.25rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.faq-question {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.faq-answer {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
</style>
