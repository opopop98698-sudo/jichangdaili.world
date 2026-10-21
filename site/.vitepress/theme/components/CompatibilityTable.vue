<script setup lang="ts">
interface CompatibilityItem {
  client: string;
  core: string;
  os: string;
  subFormats: string[];
  protocols: string[];
  tunSupport: string;
  ruleEngine: string;
  recommendationLevel: string;
}

defineProps<{
  items: CompatibilityItem[];
}>();
</script>

<template>
  <div class="table-container">
    <table class="compat-table">
      <thead>
        <tr>
          <th>客户端</th>
          <th>底层核心</th>
          <th>支持操作系统</th>
          <th>兼容订阅格式</th>
          <th>核心协议支持</th>
          <th>TUN 虚拟网卡</th>
          <th>分流引擎</th>
          <th>评级</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.client">
          <td class="font-bold">{{ item.client }}</td>
          <td><code>{{ item.core }}</code></td>
          <td>{{ item.os }}</td>
          <td>
            <div class="tag-cell">
              <span v-for="f in item.subFormats" :key="f" class="format-tag">{{ f }}</span>
            </div>
          </td>
          <td>
            <div class="tag-cell">
              <span v-for="p in item.protocols" :key="p" class="proto-tag">{{ p }}</span>
            </div>
          </td>
          <td>{{ item.tunSupport }}</td>
          <td>{{ item.ruleEngine }}</td>
          <td>
            <span class="rec-badge">{{ item.recommendationLevel }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  -webkit-overflow-scrolling: touch;
}
.compat-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  text-align: left;
  white-space: nowrap;
}
.compat-table th {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-weight: 600;
  padding: 0.75rem 1rem;
  border-bottom: 2px solid var(--vp-c-divider);
}
.compat-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}
.compat-table tr:last-child td {
  border-bottom: none;
}
.font-bold {
  font-weight: 700;
}
.tag-cell {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  max-width: 240px;
  white-space: normal;
}
.format-tag {
  font-size: 0.72rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}
.proto-tag {
  font-size: 0.7rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.08rem 0.35rem;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
}
.rec-badge {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
}
</style>
