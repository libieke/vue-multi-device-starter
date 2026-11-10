<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useScreen } from "@/composables/useScreen";
import ResponsiveChart from "@/components/ResponsiveChart.vue";
import type { EChartsOption } from "echarts";

const router = useRouter();
const { isMobile, isTablet } = useScreen();
const trendOption = computed<EChartsOption>(() => ({
  tooltip: { trigger: "axis" },
  grid: { left: 12, right: 12, top: 20, bottom: 28, containLabel: true },
  xAxis: {
    type: "category",
    data: ["01", "02", "03", "04", "05", "06", "07", "08"],
  },
  yAxis: { type: "value" },
  series: [
    {
      type: "bar",
      data: [120, 200, 150, 280, 190, 320, 260, 390],
      itemStyle: { borderRadius: [5, 5, 0, 0] },
    },
  ],
}));
const pieOption: EChartsOption = {
  tooltip: { trigger: "item" },
  legend: { bottom: 0 },
  series: [
    {
      type: "pie",
      radius: ["42%", "68%"],
      data: [
        { value: 42, name: "生产" },
        { value: 28, name: "仓储" },
        { value: 18, name: "运输" },
        { value: 12, name: "其他" },
      ],
    },
  ],
};
</script>

<template>
  <div class="screen-page">
    <header class="screen-header">
      <el-button text @click="router.push('/dashboard')"
        >返回管理平台</el-button
      >
      <h1>可视化中心</h1>
      <span>{{
        isMobile ? "移动端视图" : isTablet ? "平板视图" : "PC 大屏视图"
      }}</span>
    </header>
    <div class="screen-grid">
      <section class="screen-panel metric">
        <span>今日总产值</span><strong>¥ 2,486,520</strong
        ><small>同比增长 12.6%</small>
      </section>
      <section class="screen-panel metric">
        <span>设备在线率</span><strong>98.6%</strong
        ><small>在线设备 1,286 台</small>
      </section>
      <section class="screen-panel metric">
        <span>今日订单</span><strong>8,642</strong
        ><small>已完成 7,920 单</small>
      </section>
      <section class="screen-panel chart">
        <h3>近 8 日产量趋势</h3>
        <ResponsiveChart :option="trendOption" height="280px" />
      </section>
      <section class="screen-panel chart">
        <h3>业务类型占比</h3>
        <ResponsiveChart :option="pieOption" height="280px" />
      </section>
      <section class="screen-panel wide">
        <h3>运行状态</h3>
        <div class="status-list">
          <div
            v-for="item in [
              '生产系统运行正常',
              '仓储系统运行正常',
              '物流系统运行正常',
              '数据采集服务运行正常',
            ]"
            :key="item"
          >
            <i />{{ item }}<b>正常</b>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.screen-page {
  min-height: 100vh;
  padding: 22px;
  color: #e9f3ff;
  background: radial-gradient(ellipse at top, #153b63, #071426 70%);
}
.screen-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 22px;
}
.screen-header h1 {
  margin: 0;
  text-align: center;
  font-size: clamp(18px, 2vw, 30px);
  letter-spacing: 2px;
}
.screen-header span {
  color: #79c9ff;
  white-space: nowrap;
  font-size: 13px;
}
.screen-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.screen-panel {
  min-width: 0;
  padding: 18px;
  border: 1px solid rgba(75, 180, 255, 0.25);
  border-radius: 10px;
  background: rgba(9, 35, 62, 0.78);
  box-shadow: inset 0 0 24px rgba(27, 133, 203, 0.08);
}
.metric {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.metric span,
.metric small {
  color: #8cb5d9;
}
.metric strong {
  color: #55d8ff;
  font-size: clamp(24px, 2.6vw, 36px);
}
.chart {
  grid-column: span 1;
}
.chart h3,
.wide h3 {
  margin: 0 0 12px;
  font-size: 16px;
}
.wide {
  grid-column: 1 / -1;
}
.status-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.status-list div {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  color: #a9c7e3;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
}
.status-list i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #28d69b;
  box-shadow: 0 0 10px #28d69b;
}
.status-list b {
  margin-left: auto;
  color: #28d69b;
  white-space: nowrap;
}
@media (max-width: 1199px) {
  .screen-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .wide {
    grid-column: 1 / -1;
  }
  .status-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 767px) {
  .screen-page {
    padding: 12px;
  }
  .screen-header {
    flex-wrap: wrap;
    margin-bottom: 14px;
  }
  .screen-header h1 {
    order: -1;
    width: 100%;
  }
  .screen-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .screen-panel {
    padding: 14px;
  }
  .wide {
    grid-column: auto;
  }
  .status-list {
    grid-template-columns: 1fr;
  }
}
</style>
