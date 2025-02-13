import { Component } from "vue";
import { ElDialog } from "element-plus";
/**
 * 
 * @param component dialog的默认插槽组件
 * @param cmpProps 组件的属性
 * @param dialogProps dialog的属性
 */
export const renderDialog = (component: Component, cmpProps: object, dialogProps: object, slots: Record<string, () => any>) => {
    console.log("🚀 ~ file: index.ts ~ line 1 ~ renderDialog ~ component", component)
    const diaglogVisible = ref(true);
    // 1. 创建一个div元素
    const div = document.createElement('div');    
    // 2. 创建一个vnode
    const dialog = () => h(ElDialog, { ...dialogProps,
        onClosed: () =>{
            // 关闭时销毁div
            app.unmount();
            div.remove();
        },
        modelValue: diaglogVisible.value
    },{
        default: () => h(component, { ...cmpProps }),
        ...slots
    });
    // 3. 渲染vnode
    const app = createApp(dialog);
    // 4. 将div挂载到body上
    document.body.appendChild(div);
    // 5. 挂载到div上
    app.mount(div);
    return dialog
}