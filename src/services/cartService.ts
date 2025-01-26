import axios from "axios";
import { Cart } from "@/types/Cart";

const API_BASE_URL = "https://localhost:7202/api/Cart";

const cartService = {
    async getCartItems(userId: string): Promise<Cart[]> {
        const response = await axios.get(`${API_BASE_URL}/${userId}`);
        return response.data;
    },

    async addToCart(item: Omit<Cart, "id" | "addToCartAt">): Promise<Cart> {
        const response = await axios.post(API_BASE_URL, item);
        return response.data;
    },

    async removeFromCart(itemId: string): Promise<void> {
        await axios.delete(`${API_BASE_URL}/${itemId}`);
    },

    async clearCart(userId: string): Promise<void> {
        await axios.delete(`${API_BASE_URL}/clear/${userId}`);
    },
};

export default cartService;
