"use client";
import React from "react";
import { Button, Form, Input } from "antd";
import { GithubOutlined } from "@ant-design/icons";

interface LoginFormValues {
    email: string;
    password: string;
}

function LoginPage() {
    const onFinish = (values: LoginFormValues) => {
        console.log("Success:", values);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Đăng nhập
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Vui lòng đăng nhập để tiếp tục
                    </p>
                </div>

                <Form
                    name="login"
                    className="mt-8 space-y-6"
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
                        <Input size="large" placeholder="Nhập email của bạn" />
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
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            size="large"
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>

                    <div className="relative">
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
                        className="w-full flex items-center justify-center"
                        onClick={() => {
                            // Xử lý đăng nhập với Github
                            console.log("Github login");
                        }}
                    >
                        Đăng nhập với Github
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default LoginPage;
