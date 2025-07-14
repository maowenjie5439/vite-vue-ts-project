<script lang="ts" setup>
const handleChildClick = (event: MouseEvent) => {
    console.log('child click');
    console.log(event);
    // event.stopPropagation();
    // emit('click', event)
}

// const emit = defineEmits(['click'])
</script>

<template>
    <button @click="handleChildClick">点击</button>
</template>

<style lang="scss" scoped>



</style>
