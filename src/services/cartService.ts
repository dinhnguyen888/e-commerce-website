import axios from "axios";
import { Cart } from "@/types/Cart";

const BASE_URL = new URL(
    "Cart",
    process.env.NEXT_PUBLIC_BACKEND_URL
).toString();
// const BASE_URL = "https://localhost:7202/api/Cart";
const cartService = {
    async getCartItems(userId: string): Promise<Cart[]> {
        const response = await axios.get(`${BASE_URL}/${userId}`);
        return response.data;
    },

    async addToCart(item: Omit<Cart, "id" | "addToCartAt">): Promise<Cart> {
        const response = await axios.post(BASE_URL, item);
        return response.data;
    },

    async removeFromCart(itemId: string): Promise<void> {
        await axios.delete(`${BASE_URL}/${itemId}`);
    },

    async clearCart(userId: string): Promise<void> {
        await axios.delete(`${BASE_URL}/clear/${userId}`);
    },
};

export default cartService;
