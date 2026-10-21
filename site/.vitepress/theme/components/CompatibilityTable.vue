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
          <th>客户端名称</th>
          <th>底层核心</th>
          <th>支持操作系统</th>
          <th>兼容订阅格式</th>
          <th>核心协议支持</th>
          <th>TUN 虚拟网卡</th>
          <th>分流引擎</th>
          <th>评级标准</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.client">
          <td class="font-bold client-name-cell">{{ item.client }}</td>
          <td><code class="core-tag">{{ item.core }}</code></td>
          <td class="os-cell">{{ item.os }}</td>
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
          <td>
            <span class="feature-status" :class="{ 'is-native': item.tunSupport.includes('原生') }">
              {{ item.tunSupport }}
            </span>
          </td>
          <td class="engine-cell">{{ item.ruleEngine }}</td>
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
  margin: 1.75rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
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
  font-weight: 700;
  padding: 0.85rem 1rem;
  border-bottom: 2px solid var(--vp-c-divider);
  letter-spacing: 0.02em;
}

.compat-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  vertical-align: middle;
}

.compat-table tbody tr:nth-child(even) {
  background-color: var(--vp-c-bg-soft);
}

.compat-table tbody tr:hover {
  background-color: var(--vp-c-brand-soft);
  transition: background-color 0.15s ease;
}

.compat-table tr:last-child td {
  border-bottom: none;
}

.font-bold {
  font-weight: 700;
}

.client-name-cell {
  font-size: 0.925rem;
}

.core-tag {
  font-size: 0.775rem;
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg-alt);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

.os-cell {
  color: var(--vp-c-text-2);
}

.engine-cell {
  max-width: 200px;
  white-space: normal;
  font-size: 0.825rem;
  line-height: 1.45;
  color: var(--vp-c-text-2);
}

.tag-cell {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  max-width: 260px;
  white-space: normal;
}

.format-tag {
  font-size: 0.725rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
  color: var(--vp-c-text-2);
}

.proto-tag {
  font-size: 0.72rem;
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-soft);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
  font-weight: 500;
}

.feature-status {
  font-size: 0.825rem;
  color: var(--vp-c-text-2);
}

.feature-status.is-native {
  color: var(--c-success);
  font-weight: 600;
}

.rec-badge {
  display: inline-block;
  padding: 0.2rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-soft);
  border-radius: 4px;
  letter-spacing: 0.02em;
}
</style>
