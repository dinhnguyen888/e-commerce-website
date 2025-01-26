"use client";
import React, { useState, useEffect } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { Category } from "@/types/Category";

interface BottomNavbarProps {
    categories: Category[];
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({ categories }) => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    // Chuẩn hóa dữ liệu categories để đảm bảo frontendEndpoint luôn là đường dẫn tuyệt đối
    const normalizedCategories = categories.map((category) => ({
        ...category,
        frontendEndpoint: category.frontendEndpoint.startsWith("/")
            ? category.frontendEndpoint
            : `/${category.frontendEndpoint}`, // Thêm "/" nếu thiếu
    }));

    // Nhóm các category theo blockName
    const categorized = normalizedCategories.reduce((acc, category) => {
        if (category.blockName) {
            if (!acc[category.blockName]) acc[category.blockName] = [];
            acc[category.blockName].push(category);
        } else {
            acc[category.id] = [category];
        }
        return acc;
    }, {} as { [key: string]: Category[] });

    const handleClick = (endpoint: string) => {
        if (!endpoint.startsWith("/")) {
            console.error(
                `Invalid endpoint: ${endpoint} - Must start with '/'`
            );
            return;
        }
        window.location.href = endpoint; // Điều hướng đến đường dẫn tuyệt đối
    };

    useEffect(() => {
        const handleScroll = () => setActiveDropdown(null);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Hàm xử lý khi click vào blockName
    const handleDropdownToggle = (blockName: string) => {
        setActiveDropdown((prev) => (prev === blockName ? null : blockName));
    };

    const renderNavButton = (category: Category) => (
        <button
            key={category.id}
            className="inline-flex flex-col items-start justify-center px-3 h-12 hover:bg-blue-50 dark:hover:bg-blue-900/30"
            onClick={() => handleClick(category.frontendEndpoint)}
        >
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                {category.categoryName || "Unnamed"}
            </span>
        </button>
    );

    return (
        <div className="top-0 left-0 right-0 sticky z-40">
            <nav className="bg-white border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="flex flex-row h-12">
                        {Object.keys(categorized).map((blockName) => {
                            const items = categorized[blockName];

                            // Nếu chỉ có một category và không có blockName, render như nút bình thường
                            if (items.length === 1 && !items[0].blockName) {
                                return renderNavButton(items[0]);
                            }

                            // Nếu có nhiều category trong blockName
                            return (
                                <div key={blockName} className="relative h-12">
                                    <button
                                        className="inline-flex flex-col items-start justify-center px-3 h-12 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                                        onClick={() =>
                                            handleDropdownToggle(blockName)
                                        }
                                    >
                                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                                            {blockName}
                                            {activeDropdown === blockName ? (
                                                <FiChevronUp className="w-4 h-4" />
                                            ) : (
                                                <FiChevronDown className="w-4 h-4" />
                                            )}
                                        </span>
                                    </button>
                                    <div
                                        className={`absolute left-0 w-48 bg-white border rounded-b-lg shadow-lg dark:bg-gray-700 dark:border-gray-600 transform transition-all duration-300 ease-in-out ${
                                            activeDropdown === blockName
                                                ? "opacity-100 scale-100 translate-y-0"
                                                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                                        }`}
                                    >
                                        {items.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() =>
                                                    handleClick(
                                                        item.frontendEndpoint
                                                    )
                                                }
                                                className="block w-full px-4 py-2 text-left text-sm text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                                            >
                                                {item.categoryName}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default BottomNavbar;
