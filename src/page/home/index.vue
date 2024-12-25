<script lang="ts" setup>
console.log(import.meta.env.VITE_APP_API_BASE_URL)
console.log(import.meta.env.DEV)
</script>

<template>
  <div>Home</div>
  <router-link to="/test">to test</router-link><br/>
  <el-button type="success">Success</el-button>
</template>

<style lang="scss" scoped></style>
