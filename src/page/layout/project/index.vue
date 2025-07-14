<script lang="ts" setup>
const handleClick = () => {
  console.log('点击')

  obj.value.b.h.push(11)
  // obj.value.a = 2
}

const obj = ref({
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
      f: {
        g: 4,
      }
    },
    h: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
})

// watch(obj, (newVal) => {
//   console.log('obj发生了变化', newVal)
// }, {deep: true})

watch(obj.value, (newVal) => {
  console.log('obj发生了变化', newVal)
})
</script>

<template>
  <button @click="handleClick" style="max-width: 100px; max-height: 100px;">点击</button>
</template>

<style lang="scss" scoped>



</style>
