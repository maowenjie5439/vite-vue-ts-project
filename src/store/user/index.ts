import { defineStore } from "pinia";
import { UserState } from "./types";
import { LoginRequest} from "@/api/user";
import pinia from "../index";

export const useUserStoreHook = defineStore('userInfo', {
    state: () : UserState => ({
        username: '',
        token: '',
        roles: []
    }),
    getters: {},
    actions: {
        set(user: any) {
            this.username = user.username
            this.token = user.token
            this.roles = user.roles
        },
        clear() {
            this.username = ''
            this.token = ''
            this.roles = []
        },
        getToken() {
            return this.$state.token
        }
    },
    persist: true
})

// defineStore 返回的是一个函数，不是 store 实例本身
// 这个函数需要传入 pinia 实例才能正常工作
// 每次调用这个函数都会返回同一个 store 实例（单例模式）

// 在setup中pinia实例是自动注入的，所以不需要手动传入
// 如果需要在其他地方使用pinia实例，需要手动传入pinia实例
export function useUserStore(){
    return useUserStoreHook(pinia)
}
