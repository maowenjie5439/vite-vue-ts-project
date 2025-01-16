import { RouteRecordRaw } from "vue-router";

// 定义路由配置
const routes = [
    {
        path: "/",
        name: "Layout",
        component: () => import("@/layout/index.vue"), // 路由懒加载
        meta: {
            title: "首页",
        },
        children: [
            {
                path: "/",
                name: "HomePage",
                component: () =>
                    import(
                        /* webpackChunkName: "home" */ "@/page/home/index.vue"
                    ),
                meta: {
                    isShow: true,
                    title: "默认首页",
                    parentRouteName: "Layout",
                },
            },
            {
                path: "/p",
                name: "ParentPage",
                meta: {
                    isShow: true,
                    title: "父菜单",
                    parentRouteName: "Layout",
                },
                children: [
                    {
                        path: "/p/child1",
                        name: "ChildPage1",
                        meta: {
                            isShow: true,
                            title: "子菜单1",
                            parentRouteName: "ParentPage",
                        },
                    },
                    {
                        path: "/p/child2",
                        name: "ChildPage2",
                        meta: {
                            isShow: true,
                            title: "子菜单2",
                            parentRouteName: "ParentPage",
                        },
                    },
                ],
            },
            {
                path: "/project",
                name: "ProjectPage",
                component: () => import("@/page/project/index.vue"),
                meta: {
                    isShow: true,
                    title: "项目模块",
                    parentRouteName: "Layout",
                },
            },
            {
                path: "/user",
                name: "UserPage",
                component: () =>
                    import(
                        /* webpackChunkName: "user" */ "@/page/user/index.vue"
                    ),
                meta: {
                    title: "用户模块",
                    isShow: true,
                    parentRouteName: "Layout",
                },
            },
            {
                path: "/role",
                name: "RolePage",
                component: () =>
                    import(
                        /* webpackChunkName: "role" */ "@/page/role/index.vue"
                    ),
                meta: {
                    title: "角色模块",
                    isShow: true,
                    parentRouteName: "Layout",
                },
            },
            {
                path: "/auth",
                name: "AuthPage",
                component: () =>
                    import(
                        /* webpackChunkName: "auth" */ "@/page/auth/index.vue"
                    ),
                meta: {
                    title: "权限模块",
                    isShow: true,
                    parentRouteName: "Layout",
                },
            },
        ],
    },
];

export default routes;
