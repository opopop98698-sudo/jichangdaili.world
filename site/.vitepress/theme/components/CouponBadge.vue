<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  code?: string;
}>();

const copied = ref(false);

const isActionable = computed(() => {
  if (!props.code) return false;
  const trimmed = props.code.trim();
  return trimmed !== '' && trimmed !== '无' && trimmed !== '官网活动' && trimmed !== '活动优惠' && trimmed !== '待复测';
});

const copyCode = async () => {
  if (!isActionable.value || !props.code) return;
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(props.code.trim());
    } else if (typeof document !== 'undefined') {
      const ta = document.createElement('textarea');
      ta.value = props.code.trim();
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (e) {
    console.error('Failed to copy coupon code', e);
  }
};
</script>

<template>
  <button
    v-if="isActionable"
    type="button"
    class="coupon-badge coupon-clickable"
    :class="{ 'is-copied': copied }"
    :title="copied ? '已复制！' : `点击一键复制优惠码：${code}`"
    @click.stop="copyCode"
  >
    <span class="coupon-text">{{ code }}</span>
    <span class="coupon-action-icon">
      <svg v-if="!copied" class="copy-svg" viewBox="0 0 24 24" width="11" height="11">
        <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
      </svg>
      <span v-else class="copied-indicator">✓</span>
    </span>
  </button>
  <span v-else class="coupon-badge coupon-muted">
    {{ code || '无' }}
  </span>
</template>

<style scoped>
.coupon-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 2px 7px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.35;
  border-radius: 4px;
  white-space: nowrap !important;
  word-break: keep-all !important;
  vertical-align: middle;
  border: 1px solid transparent;
  transition: all 0.18s ease;
  user-select: none;
}

.coupon-clickable {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: rgba(0, 102, 204, 0.22);
  cursor: pointer;
}

.coupon-clickable:hover {
  background-color: var(--vp-c-brand-1);
  color: #ffffff;
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 102, 204, 0.25);
}

.coupon-clickable:active {
  transform: translateY(0);
}

.coupon-clickable.is-copied {
  background-color: var(--c-success-bg);
  color: var(--c-success);
  border-color: var(--c-success-border);
  box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.15);
}

.coupon-muted {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  border-color: var(--vp-c-divider);
  font-size: 0.775rem;
}

.copy-svg {
  opacity: 0.7;
  transition: opacity 0.15s ease;
}

.coupon-clickable:hover .copy-svg {
  opacity: 1;
}

.copied-indicator {
  font-size: 0.85em;
  font-weight: 700;
}
</style>
