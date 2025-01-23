<script lang="ts" setup>
import service from '@/http/request'
const onClick = () => {
    service.get('/getUserList').then(res => {
        console.log("🚀 ~ onClick ~ res:", res)
    })
}
</script>

<template>
<div class="title-box">
    <span>首页</span>
</div>
<div class="content-box">
    <van-button type="primary" @click="onClick">获取用户列表</van-button>
</div>
</template>

<style lang="scss" scoped>
.title-box {
    text-align: center;
}
</style>
