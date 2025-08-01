import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import 'nprogress/nprogress.css'
import components from '@/components'

import '@/assets/style/base.css'
import '@/assets/style/components.css'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(components)
app.mount('#app')