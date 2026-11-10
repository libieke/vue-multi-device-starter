<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, Monitor, DataLine, List, Moon, Sunny } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/app'
import { useScreen } from '@/composables/useScreen'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const { isMobile, isTablet } = useScreen()
const collapsed = computed(() => appStore.sidebarCollapsed || isTablet.value)
const sidebarWidth = computed(() => isMobile.value ? '0px' : collapsed.value ? '72px' : '232px')

const menus = [
  { path: '/dashboard', title: '运营概览', icon: DataLine },
  { path: '/table', title: '数据列表', icon: List },
]
function navigate(path: string) {
  router.push(path)
  appStore.setMobileMenu(false)
}
</script>

<template>
  <div class="admin-layout">
    <div v-if="isMobile && appStore.mobileMenuVisible" class="mobile-mask" @click="appStore.setMobileMenu(false)" />
    <aside class="sidebar" :class="{ 'sidebar-mobile-open': isMobile && appStore.mobileMenuVisible, 'sidebar-collapsed': collapsed }">
      <div class="brand"><el-icon><Monitor /></el-icon><span v-if="!collapsed">自适应管理平台</span></div>
      <div
        v-for="item in menus" :key="item.path"
        class="menu-item" :class="{ active: route.path === item.path }"
        @click="navigate(item.path)"
      >
        <el-icon><component :is="item.icon" /></el-icon>
        <span v-if="!collapsed">{{ item.title }}</span>
      </div>
      <div class="sidebar-bottom" @click="navigate('/screen')">
        <el-icon><Monitor /></el-icon><span v-if="!collapsed">可视化大屏</span>
      </div>
    </aside>

    <section class="main-area" :style="{ marginLeft: sidebarWidth }">
      <header class="app-header">
        <el-button text circle @click="isMobile ? appStore.setMobileMenu(!appStore.mobileMenuVisible) : appStore.toggleSidebar()">
          <el-icon><Menu /></el-icon>
        </el-button>
        <strong>{{ route.meta.title || '管理平台' }}</strong>
        <div class="header-actions">
          <el-button text circle @click="appStore.toggleTheme()">
            <el-icon><Sunny v-if="appStore.darkMode" /><Moon v-else /></el-icon>
          </el-button>
          <el-button v-if="!isMobile" type="primary" plain @click="navigate('/screen')">进入大屏</el-button>
        </div>
      </header>
      <main class="main-content"><router-view /></main>
    </section>
  </div>
</template>

<style scoped lang="scss">
.admin-layout { min-height: 100vh; }
.sidebar {
  position: fixed; z-index: 20; inset: 0 auto 0 0; width: 232px;
  display: flex; flex-direction: column; padding: 16px 12px;
  color: #dbe6f5; background: #17263d; transition: width .2s, transform .2s;
}
.sidebar-collapsed { width: 72px; }
.brand { height: 48px; display: flex; align-items: center; gap: 12px; padding: 0 10px; font-weight: 700; white-space: nowrap; }
.brand .el-icon { font-size: 22px; color: #66b1ff; }
.menu-item, .sidebar-bottom {
  height: 46px; display: flex; align-items: center; gap: 12px; padding: 0 12px;
  margin-top: 8px; border-radius: 8px; cursor: pointer; white-space: nowrap;
}
.menu-item:hover, .sidebar-bottom:hover { background: rgba(255,255,255,.08); }
.menu-item.active { color: #fff; background: #2d70c9; }
.menu-item .el-icon, .sidebar-bottom .el-icon { font-size: 18px; }
.sidebar-bottom { margin-top: auto; }
.main-area { min-height: 100vh; transition: margin-left .2s; }
.app-header {
  position: sticky; top: 0; z-index: 10; height: 60px; display: flex; align-items: center;
  gap: 12px; padding: 0 22px; background: #fff; border-bottom: 1px solid #edf0f5;
}
.header-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.main-content { padding: 22px; min-width: 0; }
.mobile-mask { position: fixed; z-index: 19; inset: 0; background: rgba(0,0,0,.38); }
@media (max-width: 767px) {
  .sidebar { width: 232px; transform: translateX(-100%); }
  .sidebar.sidebar-mobile-open { transform: translateX(0); }
  .sidebar-collapsed { width: 232px; }
  .main-area { margin-left: 0 !important; }
  .app-header { padding: 0 12px; }
  .main-content { padding: 14px 12px calc(14px + env(safe-area-inset-bottom)); }
}
</style>