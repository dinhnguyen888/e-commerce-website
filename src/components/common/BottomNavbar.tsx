"use client";
import React, { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { Category } from "@/types/Category";

interface BottomNavbarProps {
    categories: Category[];
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({ categories }) => {
    const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);

    // Nhóm các category theo blockName
    const categorized = categories.reduce((acc, category) => {
        if (category.blockName) {
            if (!acc[category.blockName]) acc[category.blockName] = [];
            acc[category.blockName].push(category);
        } else {
            acc[category.id] = [category]; // Nếu không có blockName thì xem như category độc lập
        }
        return acc;
    }, {} as { [key: string]: Category[] });

    const handleMouseEnter = (blockName: string) => {
        setHoveredDropdown(blockName);
    };

    const handleMouseLeave = () => {
        setHoveredDropdown(null);
    };

    const renderNavButton = (category: Category) => (
        <button
            key={category.id}
            className="inline-flex flex-col items-center justify-center px-3 h-12 hover:bg-blue-50 dark:hover:bg-blue-900/30"
        >
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                {category.categoryName || "Unnamed"}
            </span>
        </button>
    );

    return (
        <nav className="sticky top-0 left-0 right-0 bg-white border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600 z-50">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex items-center justify-around h-12">
                    {/* Render categories */}
                    {Object.keys(categorized).map((blockName) => {
                        const items = categorized[blockName];
                        if (items.length === 1 && !items[0].blockName) {
                            // Render nút đơn nếu không có blockName
                            return renderNavButton(items[0]);
                        }

                        return (
                            <div
                                key={blockName}
                                className="relative h-12"
                                onMouseEnter={() => handleMouseEnter(blockName)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="inline-flex flex-col items-center justify-center px-3 h-12 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                                        {blockName}
                                        {hoveredDropdown === blockName ? (
                                            <FiChevronUp className="w-4 h-4" />
                                        ) : (
                                            <FiChevronDown className="w-4 h-4" />
                                        )}
                                    </span>
                                </button>
                                <div
                                    className={`absolute left-0 w-48 bg-white border rounded-b-lg shadow-lg dark:bg-gray-700 dark:border-gray-600 transform transition-all duration-300 ease-in-out ${
                                        hoveredDropdown === blockName
                                            ? "opacity-100 scale-100 translate-y-0"
                                            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                                    }`}
                                >
                                    {items.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() =>
                                                console.log(
                                                    `Clicked ${item.categoryName}`
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
    );
};

export default BottomNavbar;
