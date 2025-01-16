<script lang="ts">
import { ElInput } from "element-plus";
import { ComponentPublicInstance, defineComponent, h, onMounted, ref } from "vue";

export type MwjInputInstance = ComponentPublicInstance<typeof ElInput>

export default defineComponent({
    setup(props, { attrs, slots, expose }) {
        const inputRef = ref<any>();
        const exposeObj: Record<string, Function> = {}

        onMounted(() => {
            // console.log(inputRef.value);

            // 暴露原组件的方法
            for(const key in inputRef.value){
                // console.log(`key: ${key}, value: ${inputRef.value[key]}`)
                if(typeof inputRef.value[key] === 'function'){
                    exposeObj[key] = inputRef.value[key]
                }
            }
            // console.log('mwj-input attrs: ', attrs);
            // console.log('mwj-input exposeObj: ', exposeObj);

        })

        // 暴露方法
        expose(exposeObj)

        const data = {
            ...attrs,
            ref: inputRef,
        };
        return () => {
            return h(ElInput, data, slots);
        };
    },
});
</script>

<template></template>

<style lang="scss" scoped></style>
