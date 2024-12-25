import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import config from '../../config/development.config'

interface BaseResponse<T> {
    code: number;
    message: string;
    data: T;
}

const service = axios.create({
    // baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    baseURL: config.url,
    timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log("response", response);
        if (response.status === 200) {
            return response.data;
        }
        ElMessage.error("出错了...");
        return response.data;
    },
    (error: AxiosError) => {
        console.log("error", error);
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
const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
    const conf = config;
    return new Promise((resolve, reject) => {
        service.request<any, AxiosResponse<BaseResponse<T>>>(conf).then((res: AxiosResponse<BaseResponse<T>>) => {
            const data = res.data; // 如果data.code为错误代码返回message信息
            if (data.code != 0) {
                ElMessage({
                    message: data.message,
                    type: 'error',
                });
                reject(data.message);
            } else {
                ElMessage({
                    message: data.message,
                    type: 'success',
                }); // 此处返回data信息 也就是 api 中配置好的 Response类型
                resolve(data.data as T);
            }
        });
    });
};
export function get<T = any, U = any>(config: AxiosRequestConfig, url: string, parms?: U): Promise<T> {
    return requestInstance({ ...config, url, method: 'GET', params: parms });
}
export function post<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
    return requestInstance({ ...config, url, method: 'POST', data: data });
}

export function put<T = any, U = any>(config: AxiosRequestConfig, url: string, parms?: U): Promise<T> {
    return requestInstance({ ...config, url, method: 'PUT', params: parms });
}
export function del<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
    return requestInstance({ ...config, url, method: 'DELETE', data: data });
}

// export default service;
