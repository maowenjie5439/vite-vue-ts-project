import type { IndexHtmlTransformContext, Plugin } from 'vite'
import glob from 'fast-glob'

interface PreloadImgsOptions {
    dir: string,
    attrs: {
        rel: 'preload' | 'prefetch',
    }
}
export const preloadImgs = (options: PreloadImgsOptions): Plugin => {
    let assetsImgs: string[] = []

    return {
        name: 'vite-plugin-img-preload',

        generateBundle(_, bundle){
            debugger;
            // console.log("🚀 ~ generateBundle ~ bundle:", bundle)

            const assetsImgs = glob.sync(options.dir)

            console.log("🚀 ~ generateBundle ~ assetsImgs:", assetsImgs)

            // bundle

        },
        transformIndexHtml(_, ctx: IndexHtmlTransformContext) {
            debugger

            let imgPaths: string[] = []
            const { dir, attrs = {}} = options
            // 读取public目录下的图片，结构如['imgs/autumn.jpg', 'imgs/spring.jpg']
            if(ctx.server){
                // 开发环境
                imgPaths = glob.sync(dir)
                // 考虑base路径
                imgPaths = imgPaths.map(filePath => {
                    return ctx.server?.config.base + filePath
                })
                assetsImgs = imgPaths
            }else{
                // 生产环境
                console.log('生产环境')

            }
            // console.log("🚀 ~ preloadImgs.ts:19 ~ transformIndexHtml ~ imgs:", imgs)


            // console.log("🚀 ~ preloadImgs.ts:25 ~ transformIndexHtml ~ preloadImgs:", preloadImgs)


            // console.log("🚀 ~ preloadImgs.ts:28 ~ transformIndexHtml ~ dir:", dir)

            return assetsImgs.map(imgPath => {
                return {
                    tag: 'link',
                    attrs: {
                        rel: 'prefetch',
                        as: 'image',
                        href: imgPath,
                        ...attrs
                    }
                }
            })
        }
    }
}