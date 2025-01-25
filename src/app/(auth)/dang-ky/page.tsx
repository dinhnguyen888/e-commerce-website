"use client";
import React from "react";
import { Button, Form, Input } from "antd";

interface RegisterFormValues {
    email: string;
    password: string;
    roleId: number;
}

const RegisterPage: React.FC = () => {
    const onFinish = (values: Omit<RegisterFormValues, "roleId">) => {
        // Add default roleId as 1 (user role)
        const formData: RegisterFormValues = {
            ...values,
            roleId: 1,
        };

        console.log("Form Submitted:", formData);

        // Add your registration API logic here
        // Example: axios.post("/api/register", formData);
    };

    return (
        <div className="h-full flex items-center justify-center bg-gray-100 px-4 mt-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md my-28">
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
                    >
                        <Input.Password
                            size="large"
                            placeholder="Nhập mật khẩu"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
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
