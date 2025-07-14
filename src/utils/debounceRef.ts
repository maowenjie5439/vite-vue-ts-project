import {customRef} from 'vue';

export const debounceRef = (value: any, delay: number = 1000) => {
    let timerId: NodeJS.Timeout | null = null

    return customRef((track, trigger) => {
        return {
            get() {
                // console.log('🚀 ~ debounceRef ~ get:', value)
                // 依赖收集
                track();
                return value;
            },
            set(newValue: any) {
                if (timerId) {
                    clearTimeout(timerId);
                }
                timerId = setTimeout(() => {
                    value = newValue;
                    trigger();
                }, delay);
            }
        }
    })
}



