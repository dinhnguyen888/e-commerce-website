import apiClient from "./config.api";

export const registerUser = async (userData) => {
    try {
        const response = await apiClient.post("/register", userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};
