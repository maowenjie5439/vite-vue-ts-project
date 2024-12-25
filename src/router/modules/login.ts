import { RouteRecordRaw } from 'vue-router'

const routes : RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/page/login/index.vue'),
        meta: {},
        children: []
    },
];

export default routes;