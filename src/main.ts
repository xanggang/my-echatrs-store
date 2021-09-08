import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createHead } from '@vueuse/head'
import { store } from './store'
import './index.css'

import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'

const head = createHead()
const app = createApp(App)

app.use(store)
app.use(router)
app.use(head)

app.mount('#app')
app.use(Antd)
