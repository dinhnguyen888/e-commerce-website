"use client";
import React, { useEffect, useState } from "react";
import TopNavbar from "../common/TopNavbar";
import BottomNavbar from "../common/BottomNavbar";
import categoryService from "@/services/categoryService";
import productService from "@/services/productService";
import { Category } from "@/types/Category";
import useAuthStore from "@/stores/useAuthStore";
import { SearchResult } from "@/types/Product";
import { jwtDecode } from "jwt-decode";
import AccountServiceInstance from "@/services/accountService";
import { Account } from "@/types/Account";
import TransactionHistoryModal from "@/components/layout/TransactionHistoryModal";

interface DecodedToken {
    userId: string;
}

function Header() {
    const [categories, setCategories] = useState<Category[]>([]);
    const { accessToken, clearTokens, getUserId } = useAuthStore();
    const userId = getUserId() ?? "";
    const [profile, setProfile] = useState<Account>();
    const [isModalVisible, setIsModalVisible] = useState(false);

    // First useEffect for fetching categories and profile
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await categoryService.getAllCategories();
                setCategories(categories);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục:", error);
            }
        };

        const fetchProfile = async () => {
            if (!accessToken) return;
            try {
                const profile = await AccountServiceInstance.getAccountByToken(
                    accessToken
                );
                setProfile(profile);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
            }
        };

        fetchCategories();
        if (accessToken) {
            fetchProfile();
        }
    }, [accessToken]); // Only depend on accessToken

    // Second useEffect for token decoding
    useEffect(() => {
        if (accessToken) {
            try {
                const decoded: DecodedToken = jwtDecode(accessToken);
                console.log("UserId:", decoded.userId);
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
                username={profile?.name}
                userId={userId}
                onViewOrderHistory={() => setIsModalVisible(true)}
                onViewProfile={() => console.log("Xem thông tin cá nhân")}
                onSearch={handleSearch}
            />

            <BottomNavbar categories={categories} />

            <TransactionHistoryModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                accountId={userId}
            />
        </>
    );
}

export default Header;
