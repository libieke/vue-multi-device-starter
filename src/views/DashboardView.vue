<script setup lang="ts">
import { computed } from 'vue'
import { useScreen } from '@/composables/useScreen'
import ResponsiveChart from '@/components/ResponsiveChart.vue'
import type { EChartsOption } from 'echarts'

const { isMobile } = useScreen()
const stats = [
  { label: '今日访问量', value: '28,649', trend: '+12.8%' },
  { label: '订单总数', value: '3,852', trend: '+8.2%' },
  { label: '成交金额', value: '¥126,580', trend: '+15.6%' },
  { label: '活跃用户', value: '8,426', trend: '+6.4%' },
]
const chartOption = computed<EChartsOption>(() => ({
  tooltip: { trigger: 'axis' },
  legend: { data: ['访问量', '订单量'], bottom: 0 },
  grid: { left: isMobile.value ? 8 : 24, right: 12, top: 24, bottom: 48, containLabel: true },
  xAxis: { type: 'category', boundaryGap: false, data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
  yAxis: { type: 'value', splitLine: { lineStyle: { type: 'dashed', color: '#e9edf3' } } },
  series: [
    { name: '访问量', type: 'line', smooth: true, areaStyle: { opacity: .12 }, data: [120, 180, 150, 240, 210, 290, 340] },
    { name: '订单量', type: 'line', smooth: true, data: [35, 52, 46, 72, 65, 88, 104] },
  ],
}))
</script>

<template>
  <div class="page-container">
    <h2 class="page-title">运营概览</h2>
    <div class="stats-grid">
      <div v-for="item in stats" :key="item.label" class="stat-card">
        <span class="muted">{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
        <small>较昨日 <b>{{ item.trend }}</b></small>
      </div>
    </div>
    <section class="panel chart-panel">
      <h3 class="panel-title">近 7 日运营趋势</h3>
      <ResponsiveChart :option="chartOption" :height="isMobile ? '260px' : '340px'" />
    </section>
  </div>
</template>

<style scoped>
.stats-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 18px; }
.stat-card { display: flex; flex-direction: column; gap: 12px; min-width: 0; padding: 20px; background: #fff; border-radius: 12px; }
.stat-card strong { font-size: clamp(20px, 2vw, 28px); overflow-wrap: anywhere; }
.stat-card small { color: #8b98a8; }
.stat-card b { color: #16a675; font-weight: 600; }
.chart-panel { margin-top: 18px; }
@media (max-width: 1199px) { .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 767px) {
  .stats-grid { gap: 10px; }
  .stat-card { padding: 14px 12px; gap: 8px; }
  .stat-card strong { font-size: 20px; }
  .stat-card small { font-size: 11px; }
}
</style>