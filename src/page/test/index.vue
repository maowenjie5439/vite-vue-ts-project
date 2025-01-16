<script lang="ts" setup>
import service from "../../http/request";
import { MwjInputInstance } from "../../components/mwj-input/index.vue";
import { onMounted, ref } from "vue";
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
const inputRef = ref<MwjInputInstance>();
const username = ref("mwj");

const sendRequest = async () => {
    console.log("sendRequest");
    const res = await service.post("/common/device/list", { index: -1 });
    console.log(res);
};

const onSelect = () => {
    inputRef.value!.select();
};

onMounted(() => {
  // userStore.clear()
});

/* const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing()
.catch(function(error) {
  console.log('oh no', error);
  return 'mwj'
})
.then(function(res) {
  console.log('carry on', res);
}); */
</script>

<template>
    <div>Home</div>
    <router-link to="/login">to login</router-link><br />
    <el-button type="success" @click="sendRequest">发送请求</el-button>

    <div>
        <el-text class="mx-1">Default</el-text>
        <el-text class="mx-1" type="primary">Primary</el-text>
        <el-text class="mx-1" type="success">Success</el-text>
    </div>
    <hr />
    <div>
        <span class="text">primary</span>
    </div>

    <mwj-button round type="success" @click="onSelect">选中文字</mwj-button>
    <mwj-input ref="inputRef" v-model="username">用户名</mwj-input>
</template>

<style lang="scss" scoped>
.text {
    color: $primary-color;
}
</style>
