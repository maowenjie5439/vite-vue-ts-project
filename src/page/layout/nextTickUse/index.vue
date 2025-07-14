<template>
    <div style="height: 400px">
        <input v-model="inputValue" />
        <hr />
        <div v-for="(item, index) in list" :key="index">
            {{ item.text }}
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

const inputValue = ref("");
const list = ref([]);

const timer = ref(null);

function debounce(fn, delay) {
    let timer = null
    
    return function (...args) {
        // 如果已经设置了定时器，就清除它
        if (timer) clearTimeout(timer)
        
        // 设置新的定时器
        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
        }, delay)
    }
}

// 使用自己实现的 debounce
const debouncedFetch = debounce(async (value) => {
    const res = await fetch(`/api/list?key=${value}`)
    const data = await res.json();
    console.log("data: ", data);
    list.value = data.data.list;
}, 300)
watch(inputValue, async (newValue) => {
    debouncedFetch(newValue)
});
</script>
