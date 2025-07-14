<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import SeasonSelecter from './SeasonSelecter.vue'

// 定义季节数据
const seasons = [
  { name: '春', value: 'spring', eng: 'Spring' },
  { name: '夏', value: 'summer', eng: 'Summer' },
  { name: '秋', value: 'autumn', eng: 'Autumn' },
  { name: '冬', value: 'winter', eng: 'Winter' }
]

const backgroundImage = ref('')

const currentSeason = ref('spring')

watch(currentSeason, async (newVal) => {
  console.log('newVal: ', newVal)
  // 方案1： 使用 import 动态导入
  // const res = await import(`@/assets/img/${newVal}.jpg`)
  // const res = await import(`./assets/img/${newVal}.jpg`)
  // backgroundImage.value = res.default

  // 方案二：使用URL构造器的半静态导入
  // const url = new URL(`../../../assets/img/${newVal}.jpg`, import.meta.url)
  // backgroundImage.value = url.pathname
  // console.log('url: ', url)

  // 方案三： 将资源复制到public目录下
  backgroundImage.value = `/imgs/${newVal}.jpg`
}, { immediate: true })


onMounted(() => {
})
</script>

<template>
  <div class="seasonal-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <SeasonSelecter v-model:season="currentSeason" />
    <!-- 季节显示 -->
    <div class="season-display">
      <div class="season-name">
        {{ seasons.find(s => s.value === currentSeason)?.eng }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.seasonal-background {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  transition: background-image 0.8s ease;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

  .season-selector, .season-display {
    position: relative;
    z-index: 2;
  }

  .season-selector {
    display: flex;
    gap: 10px;
    margin-bottom: 60px;
    position: absolute;
    top: 50px;

    button {
      padding: 8px 24px;
      background-color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 16px;

      &.active {
        background-color: #3498db;
        color: white;
      }
    }
  }

  .season-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .season-name {
      font-size: 120px;
      font-weight: bold;
      line-height: 1;
    }
  }
}
</style>
