import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { usePayment } from "../contexts/PaymentContext";
import CheckoutContent from "../components/contents/CheckoutContent";
import BaseLayout from "../components/layout/BaseLayout";
import toast from "react-hot-toast";

const paymentMethods = [
    {
        value: "VNPAY",
        name: "Thanh toán qua VNPAY",
        logo: "/vnpay-logo.webp",
        isSandboxEnv: true,
    },
    {
        value: "PAYOS",
        name: "Ví điện tử PAYOS",
        logo: "/payos-logo.svg",
    },
    {
        value: "MOMO",
        name: "Ví MoMo",
        logo: "/momo-logo.png",
        isSandboxEnv: true,
    },
    {
        value: "PAYPAL",
        name: "PayPal",
        logo: "/paypal-logo.png",
    },
];

const CheckoutPage = () => {
    const { accessToken, userId, username, email } = useAuth();
    const {
        tempProductId,
        tempProductPay,
        tempPrice,
        initiatePayment,
        loading,
    } = usePayment();
    const [selectedGateway, setSelectedGateway] = useState("PAYOS");
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) {
            navigate("/dang-nhap", { replace: true });
        }
    }, [accessToken, navigate]);

    const handlePayment = async () => {
        try {
            if (!userId || !tempProductId || !tempProductPay || !tempPrice) {
                toast.error("Thiếu thông tin thanh toán!");
                return;
            }

            const paymentData = {
                productId: tempProductId,
                productName: tempProductPay,
                userId: userId,
                price: tempPrice,
            };

            await initiatePayment(paymentData, selectedGateway);
        } catch (error) {
            message.error("Không thể khởi tạo thanh toán: " + error.message);
        }
    };

    if (!accessToken) {
        return null;
    }

    return (
        <BaseLayout>
            <div className="container mx-auto py-8">
                <CheckoutContent
                    username={username}
                    email={email}
                    productName={tempProductPay}
                    productPrice={tempPrice}
                    selectedGateway={selectedGateway}
                    onGatewayChange={setSelectedGateway}
                    onPayment={handlePayment}
                    loading={loading}
                    paymentMethods={paymentMethods}
                />
            </div>
        </BaseLayout>
    );
};

export default CheckoutPage;
