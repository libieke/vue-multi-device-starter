import { computed, onMounted, onUnmounted, ref } from 'vue'

/**
 * 统一屏幕断点：
 * mobile: < 768px；tablet: 768px ~ 1199px；desktop: >= 1200px
 * 用 window.resize 监听视口变化，避免仅监听 DOM 尺寸导致断点更新不及时。
 */
export function useScreen() {
  const width = ref(typeof window === 'undefined' ? 1440 : window.innerWidth)
  const height = ref(typeof window === 'undefined' ? 900 : window.innerHeight)

  const update = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update, { passive: true })
  })
  onUnmounted(() => window.removeEventListener('resize', update))

  return {
    width,
    height,
    isMobile: computed(() => width.value < 768),
    isTablet: computed(() => width.value >= 768 && width.value < 1200),
    isDesktop: computed(() => width.value >= 1200),
  }
}