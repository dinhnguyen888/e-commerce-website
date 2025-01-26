"use client";
import React, { useEffect, useState } from "react";
import TopNavbar from "../common/TopNavbar";
import BottomNavbar from "../common/BottomNavbar";
import categoryService from "@/services/categoryService";
import productService from "@/services/productService";
import { Category } from "@/types/Category";
import useAuthStore from "@/stores/userStore";
import { SearchResult } from "@/types/Product";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    userId: string;
}

function Header() {
    const [categories, setCategories] = useState<Category[]>([]);
    const { accessToken, clearTokens, getUserId } = useAuthStore();
    const userId = getUserId() ?? "";
    // const [userId, setUserId] = useState<string>("");
    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await categoryService.getAllCategories();
            setCategories(categories);
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (accessToken) {
            try {
                const decoded: DecodedToken = jwtDecode(accessToken); // Không cần `header: true`
                console.log("Decoded token:", decoded); // Log toàn bộ token
                // setUserId(decoded.userId); // Lưu userId vào state
                console.log("UserId:", decoded.userId); // Log userId
            } catch (error) {
                console.error("Lỗi khi decode token:", error);
            }
        }
    }, [accessToken]);

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
                userId={userId}
                onViewOrderHistory={() => console.log("Xem lịch sử mua hàng")}
                onViewProfile={() => console.log("Xem thông tin cá nhân")}
                onSearch={handleSearch}
            />

            <BottomNavbar categories={categories} />
        </>
    );
}

export default Header;
