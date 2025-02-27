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

    return (
        <PaymentContext.Provider value={{ paymentHistory }}>
            {children}
        </PaymentContext.Provider>
    );
};

PaymentProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const usePayment = () => useContext(PaymentContext);
