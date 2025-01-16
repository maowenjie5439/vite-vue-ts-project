import { MockMethod } from "vite-plugin-mock";
import { type LoginResponse } from "../src/api/user";
export default [
    {
        url: "/api/login",
        method: "post",
        response: ({ body }) => {
            if (body.username === "admin" && body.password === "admin") {
                return {
                    code: 0,
                    data: {
                        username: "毛文杰",
                        roles: ["admin"],
                        token: "123456",
                    } as LoginResponse,
                    message: "登录成功",
                };
            }
            return {
                code: 1,
                message: "用户名或密码错误",
            };
        },
    },
    {
        // 获取用户列表的接口
        url: '/api/getUserList',
        method: 'get',
        response: () => {
            return {
                code: 0,
                message: '获取成功',
                data: [
                    {
                        id: 1,
                        nickName: '张三',
                        userName: '张三',
                        role: [
                            {
                                role: 1,
                                roleName: '管理员'
                            },
                            {
                                role: 2,
                                roleName: '普通用户'
                            }
                        ]
                    },
                    {
                        id: 2,
                        nickName: '李四',
                        userName: '李四',
                        role: [
                            {
                                role: 1,
                                roleName: '管理员'
                            }
                        ]
                    },
                    {
                        id: 3,
                        nickName: '王五',
                        userName: '王五',
                        role: [
                            {
                                role: 2,
                                roleName: '普通用户'
                            }
                        ]
                    }
                ]
            };
        }
    }
];
