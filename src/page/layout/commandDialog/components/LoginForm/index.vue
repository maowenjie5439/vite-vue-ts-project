<script lang="ts" setup>
const loginData = ref({
    username: '',
    password: ''
})
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
}

const isLoading = ref(false)

const onLogin = () => {
    isLoading.value = true;

    setTimeout(() => {
        isLoading.value = false;

    }, 2000);
}

const onCancel = () => {

    loginData.value.username = '';
    loginData.value.password = '';
}

</script>

<template>
    <el-form :model="loginData" label-width="80px" style="max-width: 80%;" :rules="rules" ref="loginForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="loginData.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginData.password" autocomplete="off" :show-password="true" />
        </el-form-item>
        <!-- <el-form-item>
            <el-button type="primary" @click="onCancel" :loading="isLoading">取消</el-button>
            <el-button type="primary" @click="onLogin" :loading="isLoading">登录</el-button>
        </el-form-item> -->
    </el-form>
</template>
<style lang="scss" scoped></style>
