<script lang="ts" setup>
const currentSeason = defineModel<string>('season')
// 定义季节数据
const seasons = [
    { name: '春', value: 'spring', eng: 'Spring' },
    { name: '夏', value: 'summer', eng: 'Summer' },
    { name: '秋', value: 'autumn', eng: 'Autumn' },
    { name: '冬', value: 'winter', eng: 'Winter' }
]

// 选择季节
const selectSeason = (season: string) => {
    currentSeason.value = season
}
</script>

<template>
    <!-- 季节选择器 -->
    <div class="season-selector">
        <button v-for="season in seasons" :key="season.value" :class="{ active: currentSeason === season.value }"
            @click="selectSeason(season.value)">
            {{ season.name }}
        </button>
    </div>
</template>

<style lang="scss" scoped></style>
