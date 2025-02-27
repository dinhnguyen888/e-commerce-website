import axios from "axios";

export const viewPaymentHistory = async (token) => {
    try {
        const response = await axios.get("/view-payment-history", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(
            "An error occurred while retrieving payments by account ID:",
            error
        );
        throw error;
    }
};
