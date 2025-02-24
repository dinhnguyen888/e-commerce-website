import { useState } from "react";
import cartApi from "../services/cart.api";

const useCart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addToCart = async (cartItem) => {
        setLoading(true);
        setError(null);
        try {
            const newCartItem = await cartApi.addToCart(cartItem);
            setCart((prevCart) => [...prevCart, newCartItem]);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        cart,
        loading,
        error,
        addToCart,
    };
};

export default useCart;
