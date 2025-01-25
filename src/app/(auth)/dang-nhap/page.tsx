"use client";
import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import AuthService from "@/services/authService";
import useAuthStore from "@/stores/userStore";

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { setTokens } = useAuthStore();

    const onFinish = async (values: LoginFormValues) => {
        try {
            setLoading(true);
            const response = await AuthService.login({
                email: values.email,
                password: values.password,
            });
            message.success("Đăng nhập thành công!");
            console.log(response);
            setTokens(response.accessToken, response.refreshToken);
            window.location.href = "/";
        } catch (error) {
            message.error(
                "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin."
            );
            console.error("Error not found:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md my-20">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Đăng nhập
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Vui lòng đăng nhập để tiếp tục
                    </p>
                </div>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập email!",
                                type: "email",
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            placeholder="Nhập email của bạn"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu!",
                            },
                        ]}
                    >
                        <Input.Password
                            size="large"
                            placeholder="Nhập mật khẩu"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={loading}
                            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700"
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Hoặc
                            </span>
                        </div>
                    </div>

                    <Button
                        icon={<GithubOutlined />}
                        size="large"
                        className="w-full flex items-center justify-center rounded-lg"
                        onClick={() => {
                            console.log("Github login");
                        }}
                    >
                        Đăng nhập với Github
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
