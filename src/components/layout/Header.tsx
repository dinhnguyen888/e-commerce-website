"use client";
import React, { useEffect, useState } from "react";
import TopNavbar from "../common/TopNavbar";
import BottomNavbar from "../common/BottomNavbar";
import categoryService from "@/services/categoryService";
import productService from "@/services/productService";
import { Category } from "@/types/Category";
import useAuthStore from "@/stores/userStore";
import { SearchResult } from "@/types/Product";

function Header() {
    const [categories, setCategories] = useState<Category[]>([]);
    const { accessToken, clearTokens } = useAuthStore();

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await categoryService.getAllCategories();
            setCategories(categories);
        };

        fetchCategories();
    }, []);

    const handleLogout = () => {
        clearTokens();
        window.location.href = "/dang-nhap";
    };

    const handleSearch = async (query: string): Promise<SearchResult[]> => {
        if (!query) return [];
        try {
            const products = await productService.searchProducts(query);
            return products.map((product) => ({
                id: product.id,
                name: product.title,
                imageUrl: product.imageUrl || "/default-image.png",
                price: product.price || 0,
            }));
        } catch (error) {
            console.error("Lỗi khi tìm kiếm sản phẩm:", error);
            return [];
        }
    };

    return (
        <>
            <TopNavbar
                isAuthenticated={!!accessToken}
                onLogout={handleLogout}
                username="Nguyễn Văn A"
                onViewOrderHistory={() => console.log("Xem lịch sử mua hàng")}
                onViewProfile={() => console.log("Xem thông tin cá nhân")}
                onCartClick={() => console.log("Xem giỏ hàng")}
                onSearch={handleSearch}
            />
            <BottomNavbar categories={categories} />
        </>
    );
}

export default Header;
