<template>
    <el-container>
        <el-header>
            <Header></Header>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="/" router>
                    <template v-for="item in menus">
                        <el-menu-item v-if="!item.children" :index="item.path"> {{ item.meta!.title }} </el-menu-item>
                        <el-sub-menu v-else :index="item.path">
                            <template #title>
                                {{ item.meta!.title }}
                            </template>
                            <el-menu-item v-for="child in item.children" :index="child.path"> {{ child.meta!.title }}
                            </el-menu-item>
                        </el-sub-menu>
                    </template>
                </el-menu>
            </el-aside>
            <el-main>
                <el-breadcrumb separator="/">
                    <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <a href="/">promotion management</a>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
                    <el-breadcrumb-item>promotion detail</el-breadcrumb-item> -->
                    <el-breadcrumb-item v-for="item in commonStore.$state.currentRouteNameList" :key="item" :to="{ name: item }">{{ item
                        }}</el-breadcrumb-item>
                </el-breadcrumb>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import Header from './components/Header.vue';
import { useCommonStore } from '@/store/common'
const router = useRouter();
const route = useRoute();
const commonStore = useCommonStore()

console.log("🚀 ~ router:", router)
console.log("🚀 ~ router.options:", router.options)
// console.log("🚀 ~ router.getRoutes():", router.getRoutes())
// const menus = router.getRoutes().filter(item => item.meta.isShow);
// console.log("🚀 ~ menus:", menus)
const menus = router.options.routes[0].children!.filter(item => item.meta!.isShow);

onMounted(() => {
    console.log("🚀 ~ onMounted ~ commonStore.currentRouteNameList:", commonStore.currentRouteNameList)
})
</script>
<style lang="scss" scoped>
.el-header {
    padding: 0;
    margin-bottom: 5px;
}

.el-container {
    height: 100%;

    .el-menu {
        height: 100%;
    }
}
</style>
