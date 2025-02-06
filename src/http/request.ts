import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
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
        console.log("请求出错了, " + error.message);
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
        // 检查返回的是否是 HTML
        if (typeof response.data === 'string' && response.data.includes('<!doctype html>')) {
            showToast({
                message: '404 NOT FOUND',
                position: 'top',
            });
            // return response.data
            // return Promise.reject(new Error('接口不存在'))
            return null
        }
        if (response.status === 200) {
            // showToast({
            //     message: '请求成功',
            //     position: 'top',
            //   });
            return response.data;
        }
        showToast({
            message: '服务异常',
            position: 'top',
          });
        return response.data
    },
    (error: AxiosError) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        console.log("🚀 ~ response ~ error:", error);
        const { response } = error;
        if (response) {
            // showToast({
            //     message: (response.data as BaseResponse<any>).message,
            //     position: 'top',
            //   });
            return Promise.reject(error);
        }
        showToast({
            message: '网络连接异常，请稍后再试',
            position: 'top',
          });
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
                    console.log(data.message ?? '服务异常');
                    reject(data);
                } else {
                    console.log(data.message ?? 'success');
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
