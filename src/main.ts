import { createApp } from 'vue'
import './styles/style.css'
import App from './App.vue'
import router from './router'
import pinia from './store'
import 'nprogress/nprogress.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')