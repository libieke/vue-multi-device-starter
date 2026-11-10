import { onBeforeUnmount, onMounted, shallowRef, watch, type Ref } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

export function useEChart(el: Ref<HTMLElement | null>, option: Readonly<Ref<EChartsOption>>) {
  const chart = shallowRef<echarts.ECharts | null>(null)
  let observer: ResizeObserver | undefined

  const render = () => {
    if (!el.value) return
    if (!chart.value) chart.value = echarts.init(el.value)
    chart.value.setOption(option.value, true)
    chart.value.resize()
  }

  onMounted(() => {
    render()
    if (el.value && 'ResizeObserver' in window) {
      observer = new ResizeObserver(() => chart.value?.resize())
      observer.observe(el.value)
    }
    window.addEventListener('resize', render)
  })

  watch(option, () => render(), { deep: true })
  onBeforeUnmount(() => {
    observer?.disconnect()
    window.removeEventListener('resize', render)
    chart.value?.dispose()
    chart.value = null
  })

  return { chart, render }
}