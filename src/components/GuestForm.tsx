import React from "react";
import { Card, Form, Button, Select, Input, Col } from "antd";
import { Product } from "@/types/Product";

interface GuestFormProps {
    product: Product;
}

const GuestForm: React.FC<GuestFormProps> = ({ product }) => {
    const handlePayment = async (values: {
        name: string;
        email: string;
        paymentGateway: string;
    }) => {
        try {
            const response = await fetch("/api/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: product.id,
                    amount: product.price,
                    ...values,
                }),
            });

            if (response.ok) {
                alert("Thanh toán thành công!");
            } else {
                alert("Thanh toán thất bại. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Thanh toán thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <Col xs={24}>
            <Card title="Thông tin người dùng" bordered={false}>
                <Form layout="vertical" onFinish={handlePayment}>
                    <Form.Item
                        label="Tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên của bạn!",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên của bạn" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập email của bạn!",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập email của bạn" />
                    </Form.Item>
                    <Form.Item
                        label="Chọn cổng thanh toán"
                        name="paymentGateway"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn cổng thanh toán!",
                            },
                        ]}
                    >
                        <Select placeholder="Chọn cổng thanh toán">
                            <Select.Option value="VNPAY">VNPAY</Select.Option>
                            <Select.Option value="stripe">Stripe</Select.Option>
                            <Select.Option value="VTCPAY">
                                VTC pay
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Thanh toán ngay
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Col>
    );
};

export default GuestForm;
