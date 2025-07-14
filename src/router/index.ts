import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
    RouteLocationNormalizedGeneric,
    RouteRecordRaw,
} from "vue-router";
import NProgress from "nprogress"; // 引入页面加载进度条
import { useUserStore } from "@/store/user";
import { useCommonStore } from "@/store/common";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const commonStore = useCommonStore();
const route = useRoute();

// 定义路由配置
const modules: Record<string, any> = import.meta.glob("./modules/*.ts", {
    eager: true,
});
/**
 * // vite 生成的代码
import * as __glob__0_0 from './dir/foo.js'
import * as __glob__0_1 from './dir/bar.js'
const modules = {
  './dir/foo.js': __glob__0_0,
  './dir/bar.js': __glob__0_1
}
 */
const routes: RouteRecordRaw[] = [];

Object.values(modules).forEach((route) => {
    // console.log('route: ', route)
    routes.push(...route.default);
});

// console.log("routes: ", routes);
// 创建路由实例
const router = createRouter({
    history: createWebHashHistory(), // 使用 HTML5 历史模式
    routes: routes,
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
    NProgress.start();
    // debugger
    // console.log("🚀 ~ router.beforeEach ~ userStore.get():", userStore.getToken())
    // if(to.path !== '/login' && !userStore.getToken() && to.path !== '/test') {
    //     next('/login')
    // }
    next();
    console.log("🚀 ~ router.beforeEach ~ from:", from.path);
    console.log("🚀 ~ router.beforeEach ~ to:", to.path);
    // 处理路由
    handleRoute(to);
});

// 全局后置守卫
router.afterEach(() => {
    NProgress.done(); // 路由跳转完成后结束进度条
});

// 记录所有的路由
const handleRoute = (to: RouteLocationNormalizedGeneric) => {
    // console.log("🚀 ~ handleRoute ~ to:", to);
    // 记录所有的路由
    const allRoutes = router.getRoutes();
    // console.log("🚀 ~ handleRoute ~ allRoutes:", allRoutes);

    let parentRouteName = to.name as string;
    const currentRouteNameList = [];
    // 递归查找父级路由
    while (true) {
        const route = allRoutes.find((item) => item.name === parentRouteName);
        if (route) {
            currentRouteNameList.push(route.name);
            parentRouteName = route.meta.parentRouteName as string;
        } else {
            break;
        }
    }
    // 反转
    currentRouteNameList.reverse();
    console.log(
        "🚀 ~ handleRoute ~ currentRouteNameList:",
        currentRouteNameList
    );
    // 保存当前路由数据到store
    commonStore.$state.currentRouteNameList = currentRouteNameList as string[];
};
export default router;
