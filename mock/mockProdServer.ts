import { createProdMockServer } from 'vite-plugin-mock/client'
// 导入您的 mock 配置文件
import userMock from './user'
import projectMock from './project'

export function setupProdMockServer() {
    createProdMockServer([...userMock, ...projectMock])
} 

// 根据类型定义文件，vite-plugin-mock@3.0.2 的 ViteMockOptions 接口并不包含 prodEnabled 和 injectFile 属性。
// 如果需要生产环境的 mock 支持，可能需要降级到较早版本或寻找其他 mock 方案。