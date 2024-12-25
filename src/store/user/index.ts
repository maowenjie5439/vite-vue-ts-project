import { defineStore } from "pinia";
import { UserState } from "./types";
import { LoginRequest, userLogin } from "@/api/user";
import pinia from "../index";

export const useUserStoreHook = defineStore('userInfo', {
    state: () : UserState => ({
        username: '毛文杰',
        token: '123456',
        roles: ['admin']
    }),
    getters: {},
    actions: {
       storeUserLogin(data:LoginRequest){
        return userLogin(data).then((res)=>{
            this.username = res.username
            this.token = res.accessToken
            this.roles = res.roles
            return res;
        })
        .catch((err)=>{
            return err;
        })
       }
    },
    persist: true
})

// defineStore 返回的是一个函数，不是 store 实例本身
// 这个函数需要传入 pinia 实例才能正常工作
// 每次调用这个函数都会返回同一个 store 实例（单例模式）
export function useUserStore(){
    return useUserStoreHook(pinia)
}
