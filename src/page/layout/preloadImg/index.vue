<template>
    <h3>图片预加载</h3>
    <el-button @click="handleClick" style="width: 100px; margin-bottom: 20px;">显示图片</el-button>
    <div class="img-container" v-if="showImg">
        <img src="/imgs/spring.jpg" alt="spring" class="img-item">
        <img src="/imgs/summer.jpg" alt="autumn" class="img-item">

        <img src="@/assets/imgs/autumn.jpg" alt="spring" class="img-item">
        <img src="@/assets/imgs/winter.jpg" alt="autumn" class="img-item">
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const showImg = ref(false)
const handleClick = () => {
    showImg.value = true
}

onMounted(() => {
    console.log("图片预加载mounted")
})
</script>
<style scoped lang="scss">
.img-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.img-item {
    max-height: 200px;
}
</style>

