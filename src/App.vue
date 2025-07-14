<script lang="ts" setup>
import { StagewiseToolbar } from '@stagewise/toolbar-vue'
import { ref, reactive} from 'vue'
const stagewiseConfig = {
  plugins: []
}
const isDev = import.meta.env.MODE === 'development'
console.log("🚀 ~ import.meta.env:", import.meta.env)
</script>

<template>
  <router-view></router-view>
  <StagewiseToolbar v-if="isDev" :config="stagewiseConfig" />
</template>

<style lang="scss" scoped>
</style>
