import React from "react";
import { Card, Form, Button, Select, Col } from "antd";
import { Account } from "@/types/Account";
import { Product } from "@/types/Product";
import { CreatePayment } from "@/types/Payment";

interface PaymentFormProps {
    user: Account;
    product: Product;
    handlePayment: (values: CreatePayment) => void;
    loading: boolean; // Add loading prop
}

const PaymentForm: React.FC<PaymentFormProps> = ({
    user,

    handlePayment,
    loading, // Destructure loading prop
}) => {
    const [form] = Form.useForm();

    const onFinish = (values: CreatePayment) => {
        handlePayment(values);
    };

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
                <Form form={form} onFinish={onFinish} layout="vertical">
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

                            <Select.Option value="MOMO">MOMO</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading} // Add loading state to button
                            block
                        >
                            Thanh toán ngay
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Col>
    );
};

export default PaymentForm;
