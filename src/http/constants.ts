/**
 * @author 毛文杰
 * @date 2024-12-25 10:51:42
 */
// 基础常量
const baseConstants = {
    // 成功标志
    SUCCESS: '0',
    // 判断是否成功
    isSuccess: (code: number | string) => {
      return code == baseConstants.SUCCESS
    },
    // 取消标志
    CANCEL: '1',
    // 是否取消
    isCancel: (code: number | string) => {
      return code == baseConstants.CANCEL
    },
    // 错误标志
    ERROR: '2',
    // 是否错误
    isError: (code: number | string) => {
      return code == baseConstants.ERROR
    }
  }
  
  // 扩展常量
  const extConstants = {
    // 通用错误
    Error: '40000',
    // 表单字段不完整
    IncompleteFormFields: '40001',
  }
  // 导出默认模块
  export default { ...baseConstants, extConstants }
  