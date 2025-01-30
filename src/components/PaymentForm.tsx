import React from "react";
import { Card, Form, Button, Select, Col } from "antd";
import { Account } from "@/types/Account";
import { Product } from "@/types/Product";

interface PaymentFormProps {
    user: Account;
    product: Product;
    handlePayment: (values: { paymentGateway: string }) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ user, handlePayment }) => {
    return (
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
                            <Select.Option value="VNPAY">VNPAY</Select.Option>
                            <Select.Option value="stripe">Stripe</Select.Option>
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
    );
};

export default PaymentForm;
