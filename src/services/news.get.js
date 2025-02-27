import apiClient from "./APIConfig";

export const getNews = async () => {
    try {
        const response = await apiClient.get("/News");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || "Failed to fetch news");
    }
};
