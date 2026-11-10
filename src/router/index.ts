import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/AdminLayout.vue'),
      redirect: '/dashboard',
      children: [
        { path: 'dashboard', name: 'Dashboard', component: () => import('@/views/DashboardView.vue'), meta: { title: '运营概览' } },
        { path: 'table', name: 'TableDemo', component: () => import('@/views/TableView.vue'), meta: { title: '数据列表' } },
      ],
    },
    { path: '/screen', name: 'BigScreen', component: () => import('@/views/BigScreenView.vue'), meta: { title: '数据可视化大屏' } },
    { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router