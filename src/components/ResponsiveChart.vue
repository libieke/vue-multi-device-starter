<script setup lang="ts">
import { computed, ref } from 'vue'
import type { EChartsOption } from 'echarts'
import { useEChart } from '@/composables/useEChart'

const props = defineProps<{ option: EChartsOption; height?: string }>()
const chartEl = ref<HTMLElement | null>(null)
const optionRef = computed(() => props.option)
useEChart(chartEl, optionRef)
</script>

<template><div ref="chartEl" class="responsive-chart" :style="{ height: height || '320px' }" /></template>

<style scoped>
.responsive-chart { width: 100%; min-width: 0; }
</style>