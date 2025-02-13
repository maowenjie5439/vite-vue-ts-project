<template>
  <div class="wrap-content">
    <h3>Vite + Vue3 + TypeScript + Element-Plus 企业中台最佳实践</h3>
  </div>

  <div style="display: flex; flex-direction: column; gap: 20px">
    <span>a: {{ state.a }}</span>
    <span>b: {{ state.b }}</span>
    <span>c: {{ state.c }}</span>

    <el-space>
      <el-button type="primary" @click="state.a++">a++</el-button>
      <el-button type="primary" @click="state.b++">b++</el-button>
      <el-button type="primary" @click="state.c.push(1)">c.push</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </el-space>
  </div>
</template>
<script lang="ts" setup>
import { useResettableReactive, useResettableRef, useResettableRefFn } from './useResettable';
import { cloneDeep } from 'lodash-es';
// const {state, reset} = useResettableRefFn(() => ({
//   a: 1,
//   b: 2,
//   c: [1, 2, 3],
// }));

// const { state, reset } = useResettableRef({
//   a: 1,
//   b: 2,
//   c: [1, 2, 3],
// }, cloneDeep);

const [ state, reset ] = useResettableReactive({
  a: 1,
  b: 2,
  c: [1, 2, 3],
}, cloneDeep);
console.log(JSON.stringify(state));
</script>
<style lang="scss" scoped>
.wrap-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: max-content;
  flex-direction: column;
}
</style>
