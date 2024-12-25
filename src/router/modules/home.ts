import { RouteRecordRaw } from 'vue-router';

// 定义路由配置
const routes : RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/page/home/index.vue'), // 路由懒加载
        meta: {
            title: '首页'
        },
        children: []
    },
]

export default routes;