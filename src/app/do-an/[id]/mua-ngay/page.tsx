"use client";
import { useEffect, useState } from "react";
import { Form, Button, Card, Radio } from "antd";
import { message } from "antd";
import productService from "@/services/productService";
import accountService from "@/services/accountService";
import { ProductDetail } from "@/types/Product";

export default function CheckoutPage({ params }: { params: { id: string } }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productData, userInfo] = await Promise.all([
                    productService.getProductDetailById(params.id),
                    accountService.getCurrentUser(),
                ]);
                setProduct(productData);
                setUserData(userInfo);
            } catch (error) {
                message.error("Failed to fetch data");
            }
        };
        fetchData();
    }, [params.id]);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            // Implement checkout logic here
            console.log("Payment method:", values.paymentMethod);
            message.success("Order placed successfully!");
        } catch (error) {
            message.error("Something went wrong!");
        }
        setLoading(false);
    };

    if (!product || !userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Card title="Checkout">
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="paymentMethod"
                        label="Payment Method"
                        rules={[
                            {
                                required: true,
                                message: "Please select a payment method",
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value="vnpay">VNPay</Radio>
                            <Radio value="vtcpay">VTC Pay</Radio>
                            <Radio value="nganluong">Ngân Lượng</Radio>
                            <Radio value="momo">Momo</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Place Order
                    </Button>
                </Form>
            </Card>
            <Card title="Order Summary" className="mt-6">
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span>Product:</span>
                        <span>{product.title}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Price:</span>
                        <span>{product.price.toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-4">
                        <span>Total:</span>
                        <span>{product.price.toLocaleString()}đ</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}
