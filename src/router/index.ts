import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress' // 引入页面加载进度条

// 定义路由配置
const routes : RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('../page/home/index.vue'), // 路由懒加载
        meta: {
            title: '首页'
        },
        children: []
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../page/test/index.vue'),
        meta: {
            title: '测试'
        }
    }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 历史模式
  routes: routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    NProgress.start()
    // 添加一个人为延迟用于测试
    // setTimeout(() => {
        next()
    // }, 1000) // 延迟1秒
}) 

// 全局后置守卫
router.afterEach(() => {
    NProgress.done() // 路由跳转完成后结束进度条
})

export default router
