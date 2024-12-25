// 导入 createPinia 函数，用于创建 Pinia 实例
import { createPinia } from 'pinia'

// 导入持久化插件，用于将 store 数据持久化到 localStorage
// 这样即使页面刷新，数据也不会丢失
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建 Pinia 实例
const pinia = createPinia()

// 将持久化插件添加到 Pinia 实例中
// 这样所有的 store 都可以通过配置 persist: true 来启用持久化功能
pinia.use(piniaPluginPersistedstate)

// 导出配置好的 Pinia 实例，供 main.ts 使用
export default pinia