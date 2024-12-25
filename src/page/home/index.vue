<script lang="ts" setup>
import service from '../../http/request';

console.log(import.meta.env.VITE_APP_API_BASE_URL)
console.log(import.meta.env.DEV)

const sendRequest = async () => {
    console.log("sendRequest");
    const res = await service.post('/common/device/list', {index: -1})
    console.log(res)
}
</script>

<template>
  <div>Home</div>
  <router-link to="/test">to test</router-link><br/>
  <el-button type="success" @click="sendRequest">发送请求</el-button>
</template>

<style lang="scss" scoped></style>
