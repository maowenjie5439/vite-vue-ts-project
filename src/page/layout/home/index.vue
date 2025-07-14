<template>
  <div class="wrap-content">
    <h3>Vite + Vue3 + TypeScript + Element-Plus 企业中台最佳实践</h3>
  </div>

  <!-- <div style="display: flex; flex-direction: column; gap: 20px">
    <span>a: {{ state.a }}</span>
    <span>b: {{ state.b }}</span>
    <span>c: {{ state.c }}</span>

    <el-space>
      <el-button type="primary" @click="state.a++">a++</el-button>
      <el-button type="primary" @click="state.b++">b++</el-button>
      <el-button type="primary" @click="state.c.push(1)">c.push</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </el-space>
  </div> -->


  <div>
    <span style="margin-right: 50px;">{{ count }}</span>
    <el-button type="primary" @click="handleClick">点击</el-button>
  </div>

  <div>
    <button @click="show = !show">Toggle</button>
    <Transition>
      <p v-if="show">hello</p>
    </Transition>
  </div>

  <div class="outter">
    <div class="inner">
      <div class="content"></div>
    </div>
  </div>

  
  <hr/>

  <div @click="handlePropagationClick">
    <Child @click="handleParentClick"/>
  </div>
</template>
<script lang="ts" setup>
import { useResettableReactive, useResettableRef, useResettableRefFn } from './useResettable';
import { cloneDeep } from 'lodash-es';
import Child from './Child.vue';
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
// const [ state, reset ] = useResettableReactive({
//   a: 1,
//   b: 2,
//   c: [1, 2, 3],
// }, cloneDeep);
// console.log(JSON.stringify(state));

const count = ref(0)
const show = ref(true)

const handleClick = () => {
  count.value++
}

watch(count, (newVal) => {
  console.log('newVal: ', newVal)
})

onMounted(() => {
  // console.log('count: ', count.value)
  count.value++
})

const handleParentClick = (e: MouseEvent, ...args: any[]) => {
  console.log('parent click')
}

const handlePropagationClick = () => {
  console.log('propagation click')
}


onMounted(() => {
  console.log("默认首页mounted")
})
</script>
<style lang="scss" scoped>
.outter{
  width: 200px;
}

.inner{
  width: 100%;
  height: 0;
  // 保持宽高比为4：3
  padding-top: 75%;
  position: relative;
  background-color: red;
}

.content{
  position: absolute;
  inset: 0;
  // top: 20px;
  background-color: red;
}
.wrap-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: max-content;
  flex-direction: column;
  width: 100%;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
