import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/views/index.vue'

const routes = [
  {
    path: '/',
    component: Index,
    meta: {
      title: 'Vite + Vue + TypeScript + Tailwind Starter Template',
    },
  }
]

const index = createRouter({
  history: createWebHistory(),
  routes,
})

export default index
