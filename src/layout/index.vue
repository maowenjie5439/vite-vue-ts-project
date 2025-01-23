<template>
    <!-- <van-button type="primary" @click="onClick">测试</van-button> -->
    <!-- <van-icon name="chat-o" badge="99+" /> -->
    <RouterView />
    <van-tabbar v-model="activeRoute" route>
        <van-tabbar-item replace to="/" icon="home-o" name="home">首页</van-tabbar-item>
        <van-tabbar-item replace to="/search" icon="search" name="search">搜索</van-tabbar-item>
        <van-tabbar-item replace to="/setting" icon="setting-o" name="setting">设置</van-tabbar-item>
    </van-tabbar>
</template>
<script lang="ts" setup>
import { useCommonStore } from '@/store/common'
const router = useRouter();
const route = useRoute();
const commonStore = useCommonStore()

const activeRoute = ref('search')

// console.log("🚀 ~ router:", router)
// console.log("🚀 ~ router.options:", router.options)

// const menus = router.options.routes[0].children!.filter(item => item.meta!.isShow);

const onClick = () => {
    // showToast('No need to import showToast');
    showDialog({ title: '标题' })
}

watch(activeRoute, (newVal) => {
    console.log("🚀 ~ watch ~ newVal:", newVal)
})
</script>
<style lang="scss" scoped></style>
