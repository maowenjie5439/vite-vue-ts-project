<script lang="ts">
import { ElButton } from "element-plus";
import { defineComponent, h, onMounted, ref } from "vue";

export default defineComponent({
    setup(props, { attrs, slots }) {
        const btnRef = ref<any>();

        onMounted(() => {
            console.log(btnRef.value);

            // 暴露原组件的方法
            const exposeObj: Record<string, Function> = {}
            for(const key in btnRef.value){
                if(typeof btnRef.value[key] === 'function'){
                    exposeObj[key] = btnRef.value[key]
                }
            }
            // console.log('mwj-button attrs: ', attrs);
            // console.log('mwj-button exposeObj: ', exposeObj);
        })
        const data = {
            ...attrs,
            ref: btnRef,
        };
        return () => {
            return h(ElButton, data, slots);
        };
    },
});
</script>

<template></template>

<style lang="scss" scoped></style>
