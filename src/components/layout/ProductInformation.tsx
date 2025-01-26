"use client";

import React from "react";
import { Button } from "antd";
import {
    ShoppingCartOutlined,
    PhoneOutlined,
    DollarOutlined,
} from "@ant-design/icons";
import useAuthStore from "@/stores/userStore";
import useCartStore from "@/stores/cartStore";

interface ProductInfoClientProps {
    name: string;
    price: number;
    specifications?: Record<string, string>;
    productId: string;
    productName: string;
    productDescription: string;
}

const ProductInformation: React.FC<ProductInfoClientProps> = ({
    name,
    price,
    specifications,
    productId,
    productName,
    productDescription,
}) => {
    const { getUserId } = useAuthStore();
    const userId = getUserId() ?? ""; // Lấy userId từ store
    const { addItem } = useCartStore();

    const handleAddToCart = async () => {
        try {
            await addItem({
                id: productId,
                userId: userId,
                productId: productId,
                productName: productName,
                productDescription: productDescription,
                price: price,
                addToCartAt: new Date().toISOString(),
            });
            // alert("Sản phẩm đã được thêm vào giỏ hàng!");
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    const handleContact = () => {
        window.open("https://www.facebook.com/nguyen.inh.869154/");
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div className="border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
                <p className="text-3xl text-red-600 font-sans font-bold mt-4">
                    {price.toLocaleString()}đ
                </p>
            </div>

            <div className="space-y-4">
                <Button
                    type="primary"
                    size="large"
                    icon={<DollarOutlined />}
                    onClick={() => console.log("Buy Now clicked")}
                    className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                    Buy Now
                </Button>
                <Button
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    className="w-full h-12 text-lg border-blue-500 text-blue-500 hover:text-blue-600 hover:border-blue-600"
                >
                    Add to Cart
                </Button>
                <Button
                    size="large"
                    icon={<PhoneOutlined />}
                    onClick={handleContact}
                    className="w-full h-12 text-lg"
                >
                    Contact
                </Button>
            </div>

            {specifications && (
                <ul className="mt-6 border-t pt-4 space-y-2">
                    {Object.entries(specifications).map(([key, value]) => (
                        <li key={key} className="flex gap-2 w-full">
                            <span className="text-gray-600 font-bold">
                                {key}:
                            </span>
                            <span className="font-medium">{value}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductInformation;
