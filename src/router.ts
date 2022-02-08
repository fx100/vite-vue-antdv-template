import { createRouter, createWebHistory, RouterView } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('~/pages/index.vue'),
  },
  {
    path: '/examples/',
    component: RouterView,
    children: [
      {
        path: 'modal',
        component: () => import('~/pages/examples/modal.vue'),
      },
      {
        path: 'form',
        component: () => import('~/pages/examples/form.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
