<script setup lang="ts">
defineProps<{
  type?: 'commercial' | 'safety' | 'benchmark';
}>();
</script>

<template>
  <aside class="disclosure-box" role="note">
    <div class="dc-icon">ℹ</div>
    <div class="dc-body">
      <div class="dc-title">
        <template v-if="type === 'commercial'">商业与利益冲突透明声明</template>
        <template v-else-if="type === 'safety'">安全与免责声明</template>
        <template v-else>评测与数据客观性声明</template>
      </div>
      <div class="dc-content">
        <slot>
          本站所有软件下载链接均直链至官方 GitHub Releases 或 App Store，绝不托管或修改第三方二进制文件。若部分服务包含推广链接，将严格标记 sponsored 并接受公众监督，且绝不影响评测结论与故障排查的中立性。
        </slot>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.disclosure-box {
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-left: 3px solid var(--vp-c-text-3);
  border-radius: 6px;
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
}
.dc-icon {
  font-weight: bold;
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
  line-height: 1;
}
.dc-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.dc-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.dc-content {
  font-size: 0.825rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}
</style>
