"use client";
import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import AuthService from "@/services/authService";

interface RegisterFormValues {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}

const RegisterPage: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: RegisterFormValues) => {
        try {
            setLoading(true);
            const response = await AuthService.register(
                values.email,
                values.password,
                values.name
            );
            message.success("Đăng ký thành công!");
            console.log("Registration response:", response);
            window.location.href = "/dang-nhap";
        } catch (error) {
            message.error("Đăng kí thất bại. Vui lòng kiểm tra lại thông tin.");
            console.error("Error not found:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex items-center justify-center bg-gray-100 px-4 py-20">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md ">
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Đăng ký
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Vui lòng nhập thông tin để tạo tài khoản
                    </p>
                </div>

                {/* Form */}
                <Form
                    name="register"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    {/* Email Field */}
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
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên!",
                                type: "array",
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            placeholder="Nhập tên của bạn"
                            className="rounded-lg"
                        />
                    </Form.Item>
                    {/* Password Field */}
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu!",
                            },
                            {
                                min: 6,
                                message: "Mật khẩu phải có ít nhất 6 ký tự!",
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            size="large"
                            placeholder="Nhập mật khẩu"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    {/* Confirm Password Field */}
                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng xác nhận mật khẩu!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "Mật khẩu xác nhận không khớp!"
                                        )
                                    );
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            size="large"
                            placeholder="Nhập lại mật khẩu"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={loading}
                            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700"
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default RegisterPage;
