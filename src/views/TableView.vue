<script setup lang="ts">
import { computed, ref } from 'vue'
import { useScreen } from '@/composables/useScreen'

const { isMobile } = useScreen()
const keyword = ref('')
const rows = ref(Array.from({ length: 36 }, (_, i) => ({
  id: `ORD-${String(i + 1).padStart(4, '0')}`,
  customer: ['张三', '李四', '王五', '赵六'][i % 4],
  amount: (128 + i * 37.5).toFixed(2),
  status: i % 3 === 0 ? '待处理' : i % 3 === 1 ? '已完成' : '处理中',
})))
const filteredRows = computed(() => rows.value.filter(row =>
  `${row.id}${row.customer}${row.status}`.toLowerCase().includes(keyword.value.toLowerCase()),
))
</script>

<template>
  <div class="page-container">
    <h2 class="page-title">数据列表</h2>
    <section class="panel">
      <div class="toolbar">
        <el-input v-model="keyword" clearable placeholder="搜索订单号、客户或状态" style="max-width: 320px" />
        <span class="muted">共 {{ filteredRows.length }} 条</span>
      </div>
      <div v-if="isMobile" class="mobile-cards">
        <article v-for="row in filteredRows" :key="row.id" class="data-card">
          <div class="card-head"><b>{{ row.id }}</b><el-tag size="small">{{ row.status }}</el-tag></div>
          <div class="card-line"><span>客户</span><b>{{ row.customer }}</b></div>
          <div class="card-line"><span>金额</span><b>¥{{ row.amount }}</b></div>
        </article>
        <el-empty v-if="!filteredRows.length" description="暂无数据" />
      </div>
      <el-table v-else :data="filteredRows" stripe style="width: 100%">
        <el-table-column prop="id" label="订单编号" min-width="150" />
        <el-table-column prop="customer" label="客户" min-width="100" />
        <el-table-column prop="amount" label="金额（元）" min-width="130" />
        <el-table-column prop="status" label="状态" min-width="110">
          <template #default="{ row }"><el-tag>{{ row.status }}</el-tag></template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<style scoped>
.toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
.mobile-cards { display: grid; gap: 12px; }
.data-card { padding: 14px; border: 1px solid #edf0f5; border-radius: 10px; }
.card-head, .card-line { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.card-head { margin-bottom: 12px; }
.card-line { padding-top: 8px; color: #6f7d8e; font-size: 13px; }
.card-line b { color: #263445; font-weight: 500; }
@media (max-width: 767px) { .toolbar { align-items: flex-start; flex-direction: column; } .toolbar .el-input { max-width: none !important; width: 100%; } }
</style>