"use client";

import React, { useEffect, useState } from "react";
import TopNavbar from "../common/TopNavbar";
import BottomNavbar from "../common/BottomNavbar";
import categoryService from "@/services/categoryService";
import { Category } from "@/types/Category";
import useAuthStore from "@/stores/userStore";

function Header() {
    const [categories, setCategories] = useState<Category[]>([]);

    // Lấy thông tin từ userStore
    const { accessToken, clearTokens } = useAuthStore();

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await categoryService.getAllCategories();
            setCategories(categories);
        };

        fetchCategories();
    }, []);

    const handleLogout = () => {
        clearTokens(); // Xóa tokens khỏi userStore
        window.location.href = "/dang-nhap"; // Chuyển về trang đăng nhập
    };

    return (
        <>
            <TopNavbar
                isAuthenticated={!!accessToken} // Nếu accessToken tồn tại, nghĩa là đã đăng nhập
                onLogout={handleLogout}
                username="Nguyễn Văn A" // Có thể thay bằng thông tin từ userStore nếu có
                onViewOrderHistory={() => console.log("Xem lịch sử mua hàng")}
                onViewProfile={() => console.log("Xem thông tin cá nhân")}
                onCartClick={() => console.log("Xem giỏ hàng")}
            />
            <BottomNavbar categories={categories} />
        </>
    );
}

export default Header;
