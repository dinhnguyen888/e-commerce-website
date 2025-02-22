import apiClient from "./config.api";

export const fetchProducts = async () => {
    try {
        const response = await apiClient.get("/products");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
