import { defineConfig, loadEnv } from "vite";
import type { UserConfig, ConfigEnv } from "vite";
// import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath } from "url";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from "vite-plugin-mock";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import ElementPlus from "unplugin-element-plus/vite";
import Icons from "unplugin-icons/vite";
import ViteCompression from "vite-plugin-compression";
import { preloadImgs } from "./config/plugins/preloadImgs";

export default defineConfig(
    ({ mode }: ConfigEnv): UserConfig & { test: { include: string[] } } => {
        debugger;
        // 获取当前工作目录
        const root = process.cwd();
        // 获取环境变量
        const env = loadEnv(mode, root);
        console.log("🚀 ~ defineConfig ~ env:", env);
        return {
            // 项目根目录
            root,
            // 项目部署的基础路径
            base: "./",
            publicDir: fileURLToPath(new URL("./public", import.meta.url)), // 无需处理的静态资源位置
            assetsInclude: fileURLToPath(
                new URL("./src/assets", import.meta.url)
            ), // 需要处理的静态资源位置
            plugins: [
                ViteCompression({
                    // verbose: true,
                    // disable: false,
                    threshold: 1024 * 20, // 压缩阈值
                    algorithm: "gzip", // 压缩算法
                    ext: ".gz", // 压缩后缀
                }),
                // Vue模板文件编译插件
                vue(),
                // jsx文件编译插件
                vueJsx(),
                // mock插件
                viteMockServe({
                    // 拦截接口的目录
                    mockPath: "mock",
                    // 是否启用mock
                    enable: env.VITE_APP_USE_MOCK === "true",
                }),
                // 开启ElementPlus自动引入CSS
                ElementPlus({}),
                // 按需引入插件，自动引入ElementPlus，处理 API 级别的自动导入
                AutoImport({
                    resolvers: [ElementPlusResolver(), IconsResolver()],
                    // 生成类型声明文件
                    dts: "types/auto-imports.d.ts",
                    // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
                    imports: ["vue", "vue-router"],
                }),
                // 按需引入插件，处理组件级别的自动导入
                Components({
                    resolvers: [ElementPlusResolver(), IconsResolver()],
                    // 生成类型声明文件
                    dts: "types/components.d.ts",
                }),
                Icons({
                    autoInstall: true,
                }),
                preloadImgs({
                    dir: 'src/assets/imgs/*.{jpg,png, svg}',
                    attrs: {
                        rel: 'preload',
                    }
                }),
            ],
            // 运行后本地预览的服务器
            server: {
                // 是否开启https
                // https: false,
                // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
                host: true,
                // 开发环境预览服务器端口
                port: 9000,
                // 启动后是否自动打开浏览器
                open: false,
                // 是否开启CORS跨域
                cors: true,
                // 代理服务器
                // 帮助我们开发时解决跨域问题
                proxy: {
                    // 这里的意思是 以/api开头发送的请求都会被转发到 http://xxx:9000
                    [env.VITE_APP_API_BASEURL]: {
                        target: "http://localhost:9000",
                        // 改变 Host Header
                        changeOrigin: true,
                        // 发起请求时将 '/api' 替换为 ''
                        //rewrite: (path) => path.replace(/^\/api/, ""),
                    },
                    [env.VITE_APP_MOCK_BASEURL]: {
                        target: "http://localhost:9000",
                        // 改变 Host Header
                        changeOrigin: true,
                        // 发起请求时将 '/api' 替换为 ''
                        //rewrite: (path) => path.replace(/^\/api/, ""),
                    },
                },
            },
            // 打包配置
            build: {
                // 关闭 sorcemap 报错不会映射到源码
                sourcemap: true,
                // 打包大小超出 400kb 提示警告
                chunkSizeWarningLimit: 400,
                rollupOptions: {
                    // 打包入口文件 根目录下的 index.html
                    // 也就是项目从哪个文件开始打包
                    input: {
                        index: fileURLToPath(
                            new URL("./index.html", import.meta.url)
                        ),
                    },
                    // plugins: [visualizer({ open: true })],
                    // output: {
                    //     format: "esm",
                    //     // 1. 代码分割的chunk文件命名
                    //     chunkFileNames: "static/js/[name]-[hash].js",
                    //     // 2. 入口文件的chunk文件命名
                    //     entryFileNames: "static/js/[name]-[hash].js",
                    //     // 3. 静态资源文件的命名
                    //     assetFileNames: "static/[ext]/[name]-[hash].[ext]",
                    //     // [name]: 文件名
                    //     // [hash]: 内容哈希值，用于缓存控制
                    //     // [ext]: 文件扩展名
                    // },
                    // output: {
                    //     manualChunks: (id: string) => {
                    //         if (id.includes('node_modules')) {
                    //             return 'vendor';
                    //         }else{
                    //             return 'index'
                    //         }
                    //     },
                    // }

                    output: {
                        // 最小chunk文件大小24kb
                        experimentalMinChunkSize: 20 * 1024,
                        manualChunks: (id: string) => {
                            if (id.includes("node_modules")) {
                                return "vendor";
                            }
                        },
                        // 1. 代码分割的chunk文件命名
                        chunkFileNames: "static/js/chunk-[hash].js",
                        // 2. 入口文件的chunk文件命名
                        entryFileNames: "static/js/entry-[hash].js",
                        // 3. 静态资源文件的命名
                        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
                    },
                },
            },
            // 配置别名
            resolve: {
                alias: {
                    "@": fileURLToPath(new URL("./src", import.meta.url)),
                    "#": fileURLToPath(new URL("./types", import.meta.url)),
                },
            },
            css: {
                preprocessorOptions: {
                    scss: {
                        // additionalData: `@import "@/styles/index.scss";`,
                    },
                },
            },
            test: {
                include: ["test/**/*.test.ts"],
            },
        };
    }
);
