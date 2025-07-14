<script lang="ts" setup>
import { ElInput, InputProps } from 'element-plus';
import { h } from 'vue';

const attrs = useAttrs()
/**
 * 1. 属性穿透
 * 2. 插槽
 * 3. 方法
 */
const props = defineProps<Partial<InputProps>>()

console.log('props: ', props)
const vm = getCurrentInstance()// 获取当前组件实例

const changeRef = (inputStance : any) => {
    console.log('inputStance: ', inputStance)
    vm!.exposed = inputStance || {}
    vm!.exposeProxy = inputStance || {}
}

onMounted(() => {
    // console.log('attrs: ', attrs)
})
</script>

<template>
    <!-- <el-input v-model="modelValue" v-bind="$attrs"></el-input> -->
    <component :is="h(ElInput, { ...$attrs, ...props, ref: changeRef }, $slots)"></component>
</template>

<style lang="scss" scoped></style>
