import React from "react";
import { Card, Form, Button, Select, Col } from "antd";
import { Account } from "@/types/Account";
import { Product } from "@/types/Product";

interface LoggedInFormProps {
    user: Account;
    product: Product;
}

const LoggedInForm: React.FC<LoggedInFormProps> = ({ user, product }) => {
    const handlePayment = async (values: { paymentGateway: string }) => {
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
        <>
            <Col xs={24}>
                <Card title="Thông tin người dùng" bordered={false}>
                    <div>
                        <p>
                            <strong>Tên:</strong> {user.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                    </div>
                </Card>
                <Card title="Phương thức thanh toán" bordered={false}>
                    <Form layout="vertical" onFinish={handlePayment}>
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
                                <Select.Option value="VNPAY">
                                    VNPAY
                                </Select.Option>
                                <Select.Option value="stripe">
                                    Stripe
                                </Select.Option>
                                <Select.Option value="VTCPAY">
                                    VTC PAY
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
        </>
    );
};

export default LoggedInForm;
