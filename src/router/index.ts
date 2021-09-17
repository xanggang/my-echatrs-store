import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/views/index.vue'
import Edit from '@/views/FormEdit/index.vue'

const routes = [
  {
    path: '/',
    component: Edit,
    meta: {
      title: 'echart可视化配置',
    },
  }
]

const index = createRouter({
  history: createWebHistory(),
  routes,
})

export default index
