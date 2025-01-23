import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('@/page/home/index.vue')
            },
            {
                path: '/search',
                name: 'search',
                component: () => import('@/page/search/index.vue')
            },
            {
                path: '/setting',
                name: 'setting',
                component: () => import('@/page/setting/index.vue')
            }
        ]
    }
]

export default routes