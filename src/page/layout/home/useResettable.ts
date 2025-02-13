import { UnwrapRef, reactive } from "vue";

/**
 * 
 * @param cb 返回一个响应式对象的初始状态
 * @returns 
 */
export const useResettableRefFn = <T>(cb: () => T) =>{
    // 获取初始状态
    const state = ref(cb());
    const reset = () => {
        // 每次调用就能获得初始状态
        state.value = cb()
    }
    return [state, reset]
}

// 默认的深拷贝函数, 目前只能用于深拷贝对象
const defaultClone = (value: any) => {
    if(!value || typeof value !== 'object'){
        return value
    }
    return JSON.parse(JSON.stringify(value))
};

export const useResettableRef = <T>(stateValue: UnwrapRef<T>, clone:Function = defaultClone) =>{
    //深拷贝初始状态对象
    const initState = clone(stateValue)
    const state = ref(stateValue);
    const reset = () =>{
        // 这里也需要使用深拷贝，否则第二次重置时会失效（第一次重置后state就指向了initState）
        state.value = clone(initState)
    }

    return [state, reset]
}

export const useResettableReactive = <T extends object>(
    stateValue: UnwrapRef<T> & object, // 确保是普通对象且解包响应式类型
    clone: Function = defaultClone
) : [T, () => void] => {
    const initState = clone(stateValue)
    const state = reactive(clone(stateValue)) as T;
    const reset = () => {
        Object.keys(state).forEach((key) => {
            delete state[key as keyof T];
        });
        Object.assign(state, initState);
    }
    return [state, reset]
}