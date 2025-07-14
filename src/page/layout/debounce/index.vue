<script lang="ts" setup>
import { ref } from 'vue';
import { debounceRef } from '@/utils/debounceRef';

const input = debounceRef('')

onMounted(() => {

})
onUnmounted(() => {
})
</script>

<template>
    <h3>防抖示例</h3>
    <div>
        <!-- <input type="text" ref="inputRef" style="display: block;" /> -->
         <el-input v-model="input" style="display: block;" />
        <!-- <span>{{ inputRef?.value }}</span> -->
    </div>
</template>

<style lang="scss" scoped></style>
