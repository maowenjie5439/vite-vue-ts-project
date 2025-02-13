<script lang="tsx" setup>
import { renderDialog } from '@/components/dialog'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import LoginForm from './components/LoginForm/index.vue'
import { title } from 'process'
import { ref } from 'vue'

const loginData = ref({
    username: '',
    password: ''
})
const loginForm = ref<any>(null)
let dialog = ref<any>(null)
const isLoading = ref(false)

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
}

const handleClose = () => {
    console.log('关闭命令对话框')
}

// const onLogin = async () => {
//     console.log('登录按钮被点击')
//     console.log('loginForm', loginForm)
//     await loginForm?.value?.validate((valid: any) => {
//         if (valid) {
//             isLoading.value = true;
//             setTimeout(() => {
//                 dialogVisible.value = false;
//                 loginData.value.username = '';
//                 loginData.value.password = '';
//                 isLoading.value = false;
//             }, 2000);
//         } else {
//             return false
//         }
//     })

// }

const openDialog = () => {
    // dialogVisible.value = true
    dialog.value = renderDialog(LoginForm, {
        ref: loginForm,
    }, {
        title: '登录',
        alignCenter: true,
        center: true,
    }, {
        footer: () => {
            return (
                <div class="dialog-footer">
                    <ElButton onClick={handleClose}>取消</ElButton>
                    <ElButton type="primary" loading={isLoading.value}>登录</ElButton>
                </div>
            )
        }
    })
}

// watch(dialogVisible, (val) => {
//     console.log('dialogVisible', val)
// })
</script>

<template>
    <el-button type="primary" @click="openDialog">打开命令对话框</el-button>
    <!-- <el-dialog v-model="dialogVisible" :before-close="handleClose" title="登录" align-center center>
        <el-form :model="loginData" label-width="80px" style="max-width: 80%;" :rules="rules" ref="loginForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginData.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginData.password" autocomplete="off" :show-password="true" />
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onLogin" :loading="isLoading">
                    登录
                </el-button>
            </div>
        </template>
</el-dialog> -->
</template>

<style lang="scss" scoped></style>
