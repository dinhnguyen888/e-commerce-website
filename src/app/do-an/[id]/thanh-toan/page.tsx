"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Row, Col, Card, Spin, Alert, Button } from "antd";
import Image from "next/image";
import productServiceInstance from "@/services/productService";
import paymentServiceInstance from "@/services/paymentService";
import { Product } from "@/types/Product";
import useAuthStore from "@/stores/useAuthStore";
import AccountServiceInstance from "@/services/accountService";
import { Account } from "@/types/Account";
import PaymentForm from "@/components/PaymentForm";
import { CreatePayment } from "@/types/Payment";

export default function PaymentPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<Account | null>(null);

    const { getAccessToken, getUserId } = useAuthStore();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null); // Reset error state
            try {
                const data = await productServiceInstance.getProductById(
                    params.id?.toString()
                );
                setProduct(data);
            } catch (error) {
                console.error("Fetch product error:", error);
                setError(
                    "Không thể lấy thông tin sản phẩm. Vui lòng thử lại sau."
                );
            } finally {
                setLoading(false);
            }
        };

        const fetchUser = async () => {
            const token = getAccessToken();
            if (token) {
                try {
                    const userData =
                        await AccountServiceInstance.getAccountByToken(token);
                    setUser(userData);
                } catch (error) {
                    console.error("Fetch user error:", error);
                }
            }
        };

        if (params.id) fetchProduct();
        fetchUser();
    }, [params.id, getAccessToken]);

    const handlePayment = async (values: CreatePayment) => {
        try {
            const paymentData = {
                productPay: product.title,
                productId: product.id,
                userId: getUserId(),
                paymentGateway: values.paymentGateway,
                productPrice: product.price,
            };

            const paymentUrl = await paymentServiceInstance.createPaymentUrl(
                paymentData
            );
            window.location.href = paymentUrl;
        } catch (error) {
            console.error("Payment error:", error);
            alert("Thanh toán thất bại. Vui lòng thử lại.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Alert message={error} type="error" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Alert message="Không tìm thấy sản phẩm" type="warning" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen flex-col">
                <Alert
                    message="Bạn cần đăng nhập để thanh toán"
                    type="warning"
                />
                <div className="mt-4">
                    <Button
                        className="ant-btn ant-btn-primary bg-blue-600 text-white"
                        onClick={() => {
                            window.location.href = "/dang-nhap";
                        }}
                    >
                        Đăng nhập
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-black">
                Chi tiết thanh toán
            </h1>
            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <Card title="Thông tin sản phẩm" bordered={false}>
                        {product.imageUrl && (
                            <div className="relative h-48 w-full mb-4">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.title}
                                    fill
                                    className="object-contain rounded-md"
                                />
                            </div>
                        )}
                        <p>
                            <strong>Tên:</strong> {product.title}
                        </p>
                        <p>
                            <strong>Giá:</strong> {product.price}đ
                        </p>
                    </Card>
                </Col>
                <PaymentForm
                    user={user}
                    product={product}
                    handlePayment={handlePayment}
                />
            </Row>
        </div>
    );
}
