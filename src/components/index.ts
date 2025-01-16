import { App, Component } from "vue";

// 动态导入common组下的vue
const modules = import.meta.glob("/src/components/*/index.vue", {
    eager: true,
}) as Record<string, any>;

console.log("modules: ", modules);

const componentList: { name: string; component: Component }[] = [];

for (const path in modules) {
    let name = (/src\/components\/(.*)\/index.vue/.exec(path) as any[])[1];
    componentList.push({
        name,
        component: modules[path].default,
    });
}

console.log("componentList: ", componentList);

export default {
    install(app: App) {
        componentList.forEach(({ name, component }) => {
            app.component(name, component);
        });
    },
};
