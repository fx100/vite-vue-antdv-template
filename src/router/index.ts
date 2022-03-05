import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('~/views/HomeView.vue'),
  },
  {
    path: '/modal-demo',
    component: () => import('~/views/ModalDemoView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
