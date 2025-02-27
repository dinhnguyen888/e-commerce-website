import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { viewPaymentHistory as viewPaymentHistoryService } from "../services/payment.viewHistory";
import { useAuth } from "./AuthContext";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const { userId } = useAuth();
    const [paymentHistory, setPaymentHistory] = useState([]);

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const token = localStorage.getItem("token");
                const history = await viewPaymentHistoryService(token);
                setPaymentHistory(Array.isArray(history) ? history : []);
            } catch (error) {
                console.error("Failed to fetch payment history:", error);
            }
        };

        if (userId) {
            fetchPaymentHistory();
        }
    }, [userId]);

    const processPayment = async (paymentData) => {
        try {
            // Giả lập gọi API thanh toán
            console.log("Đang xử lý thanh toán:", paymentData);

            // Đây là nơi bạn sẽ gọi API thanh toán thực tế
            // const response = await fetch('your-payment-api-endpoint', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(paymentData),
            // });

            // Giả lập delay để mô phỏng quá trình thanh toán
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Nếu thanh toán thành công
            return {
                success: true,
                message: "Thanh toán thành công",
                orderId: paymentData.orderId,
            };
        } catch (error) {
            console.error("Lỗi xử lý thanh toán:", error);
            throw new Error("Không thể xử lý thanh toán");
        }
    };

    const value = {
        paymentHistory,
        processPayment,
    };

    return (
        <PaymentContext.Provider value={value}>
            {children}
        </PaymentContext.Provider>
    );
};

PaymentProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const usePayment = () => {
    const context = useContext(PaymentContext);
    if (!context) {
        throw new Error("usePayment must be used within a PaymentProvider");
    }
    return context;
};
