import { MockMethod } from "vite-plugin-mock";

export default [
    {
        url: '/api/list',
        method: 'get',
        response: () => {
            return {
                code: 0,
                message: 'success',
                data: {
                    list: Array(1000).fill(0).map(() => ({
                        id: Math.floor(Math.random() * 1001),
                        text: `随机数: ${Math.floor(Math.random() * 1001)}`,
                    })),
                },
            };
        },
    },
] as MockMethod[];
