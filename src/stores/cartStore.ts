import { create } from "zustand";
import cartService from "@/services/cartService";
import { Cart } from "@/types/Cart";
import { message } from "antd";
interface CartState {
    cartItems: Cart[];
    loading: boolean;
    fetchCart: (userId: string) => Promise<void>;
    addItem: (item: Omit<Cart, "Id">) => Promise<void>;
    removeItem: (itemId: string) => Promise<void>;
    clearCart: (userId: string) => Promise<void>;
}

const useCartStore = create<CartState>((set, get) => ({
    cartItems: [],
    loading: false,

    fetchCart: async (userId) => {
        set({ loading: true });
        try {
            const items = await cartService.getCartItems(userId);
            set({ cartItems: items });
        } finally {
            set({ loading: false });
        }
    },

    addItem: async (item) => {
        set({ loading: true });
        try {
            // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
            const productExists = get().cartItems.some(
                (cartItem) => cartItem.productId === item.productId
            );

            if (productExists) {
                console.error("Product already exists in the cart");
                message.info("Sản phẩm này đã có trong giỏ hàng!");
                return;
            }

            // Nếu chưa tồn tại, thêm sản phẩm mới
            const newItem = await cartService.addToCart(item);
            set((state) => ({ cartItems: [...state.cartItems, newItem] }));
            message.success("Đã thêm sản phẩm vào giỏ hàng!");
        } finally {
            set({ loading: false });
        }
    },

    removeItem: async (itemId) => {
        set({ loading: true });
        try {
            await cartService.removeFromCart(itemId);
            set((state) => ({
                cartItems: state.cartItems.filter((item) => item.id !== itemId),
            }));
        } finally {
            set({ loading: false });
        }
    },

    clearCart: async (userId) => {
        set({ loading: true });
        try {
            await cartService.clearCart(userId);
            set({ cartItems: [] });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useCartStore;
