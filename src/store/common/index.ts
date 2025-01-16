import { defineStore } from "pinia";
import pinia from "../index";
import { CommonState } from "./types";

export const useCommonStoreHook = defineStore('common', {
    state: () : CommonState => ({
        currentRouteNameList: []
    }),
    getters: {},
    actions: {
        
    },
    persist: true
})

// defineStore 返回的是一个函数，不是 store 实例本身
// 这个函数需要传入 pinia 实例才能正常工作
// 每次调用这个函数都会返回同一个 store 实例（单例模式）
export function useCommonStore(){
    return useCommonStoreHook(pinia)
}
