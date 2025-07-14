<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { ElInput } from 'element-plus';
import MyInput from './MyInput.vue';

const inputValue = ref('Hello world')
const inputInstance = useTemplateRef<InstanceType<typeof ElInput>>('inputRef')
const inputRef = ref<any>()
const onFocus = () => {
    console.log('onFocus')
}

const onBlur = () => {
    console.log('onBlur')
}

onMounted(() => {
    console.log('inputInstance: ', inputInstance.value)

    // inputInstance.
    setTimeout(() => {
        console.log('准备执行clear')
        inputInstance.value?.clear()
    }, 1000);
})


</script>

<template>
    <h3>组件二次封装</h3>

    <div>
        <div>
            父组件<br />
            <MyInput v-model="inputValue" ref="inputRef" placeholder="请输入" @focus="onFocus" @blur="onBlur" style="width: 200px;">
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </MyInput>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
