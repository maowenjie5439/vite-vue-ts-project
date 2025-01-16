import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import { ElMessage } from "element-plus";
import config from "../../config/development.config";
import constants from "@/http/constants";

interface BaseResponse<T> {
    code: number;
    message: string;
    data: T;
}

const service = axios.create({
    // baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    // baseURL: config.url,
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        console.log("🚀 request ~ config:", config);
        return config;
    },
    (error: AxiosError) => {
        ElMessage.error("请求出错了, " + error.message);
        console.log("🚀 request ~ error:", error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        console.log("🚀 ~ response ~ response:", response);
        if (response.status === 200) {
            return response.data;
        }
        ElMessage.error("服务异常");
        return response.data
    },
    (error: AxiosError) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        console.log("🚀 ~ response ~ error:", error);
        const { response } = error;
        if (response) {
            ElMessage.error(error.message);
            return Promise.reject(error);
        }
        ElMessage.error("网络连接异常，请稍后再试");
    }
);

// 此处相当于二次响应拦截
// 为响应数据进行定制化处理
const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<BaseResponse<T>> => {
    const conf = config;
    return new Promise((resolve, reject) => {
        service
            .request<any, BaseResponse<T>>(conf)
            .then((res: BaseResponse<T>) => {
                const data = res; // 如果data.code为错误代码返回message信息
                if (!constants.isSuccess(data.code)) {
                    ElMessage({
                        message: data.message ?? '服务异常',
                        type: "error",
                    });
                    reject(data);
                } else {
                    ElMessage({
                        message: data.message ?? 'success',
                        type: "success",
                    }); // 此处返回data信息 也就是 api 中配置好的 Response类型
                    resolve(data);
                }
            });
    });
};

export function get<T = any, U = any>(
    config: AxiosRequestConfig,
    url: string,
    parms?: U
): Promise<BaseResponse<T>> {
    return requestInstance({ ...config, url, method: "GET", params: parms });
}

export function post<T = any, U = any>(
    config: AxiosRequestConfig,
    url: string,
    data: U
): Promise<BaseResponse<T>> {
    return requestInstance({ ...config, url, method: "POST", data: data });
}

export function put<T = any, U = any>(
    config: AxiosRequestConfig,
    url: string,
    parms?: U
): Promise<BaseResponse<T>> {
    return requestInstance({ ...config, url, method: "PUT", params: parms });
}
export function del<T = any, U = any>(
    config: AxiosRequestConfig,
    url: string,
    data: U
): Promise<BaseResponse<T>> {
    return requestInstance({ ...config, url, method: "DELETE", data: data });
}

export default service;
