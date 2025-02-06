<script lang="ts" setup>
import service from '@/http/request'
const onClick = () => {
    service.get('/etUserList').then(res => {
        console.log("🚀 ~ onClick ~ res:", res)
    })
}

const p1 = Promise.resolve(1)
const p2 = new Promise(resolve => resolve(p1))

p2.then(() => {
    console.log(2)
})

p1.then(() =>{
    console.log(1)
}).then(() => {
    console.log(4)
})

console.log(3)
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
