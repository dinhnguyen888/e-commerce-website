import apiClient from "./APIConfig";

const addToCart = async (cartItem) => {
    try {
        const response = await apiClient.post("/cart", cartItem);
        return response.data;
    } catch (error) {
        console.error("Failed to add item to cart", error);
        throw error;
    }
};

export default {
    addToCart,
};
