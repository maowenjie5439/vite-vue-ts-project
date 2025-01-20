import { RouteRecordRaw } from 'vue-router'

const routes : RouteRecordRaw[] = [
    {
        path: '/test',
        name: 'test',
        component: () => import('@/page/test/index.vue'),
        meta: {
            title: '测试页面'
        },
    },
];

export default routes;