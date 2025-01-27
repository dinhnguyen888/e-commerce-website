"use client";
import React, { useState } from "react";
import { Input, Button, Dropdown, Menu } from "antd";
import {
    LogoutOutlined,
    HistoryOutlined,
    UserOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Cart from "../layout/Cart";

interface SearchResult {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
}

interface TopNavbarProps {
    isAuthenticated: boolean;
    avatarSrc?: string;
    username?: string;
    userId: string;
    onLogout: () => void;
    onViewOrderHistory: () => void;
    onViewProfile: () => void;
    onSearch: (query: string) => Promise<SearchResult[]>;
}

const TopNavbar: React.FC<TopNavbarProps> = ({
    isAuthenticated,
    avatarSrc,
    username,
    onLogout,
    onViewOrderHistory,
    onViewProfile,
    onSearch,
    userId,
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleSearch = async (value: string) => {
        const results = await onSearch(value);
        setSearchResults(results);
        setIsDropdownVisible(results.length > 0);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim()) {
            handleSearch(value.trim());
        } else {
            setSearchResults([]);
            setIsDropdownVisible(false);
        }
    };

    const searchMenu = (
        <div className="z-60 w-full bg-white shadow-md rounded-lg border border-gray-200">
            {searchResults.map((result) => (
                <div
                    key={result.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-3 border-b last:border-b-0"
                    onClick={() => {
                        window.location.href = `/do-an/${result.id}`;
                        setIsDropdownVisible(false);
                    }}
                >
                    <Image
                        src={result.imageUrl}
                        alt={result.name}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                    />
                    <div>
                        <p className="font-semibold text-gray-800">
                            {result.name}
                        </p>
                        <p className="text-sm text-gray-500">
                            {result.price > 0 ? `${result.price}₫` : "Liên hệ"}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );

    const dropdownMenu = (
        <Menu>
            <Menu.Item key="greeting" disabled>
                <span>
                    Xin chào, <b>{username ?? "Người dùng"}</b>
                </span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="view-profile" onClick={onViewProfile}>
                <UserOutlined /> Thông tin cá nhân
            </Menu.Item>
            <Menu.Item key="order-history" onClick={onViewOrderHistory}>
                <HistoryOutlined /> Lịch sử mua hàng
            </Menu.Item>
            <Menu.Item key="logout" onClick={onLogout}>
                <LogoutOutlined /> Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <nav className="z-50 w-full bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div
                        className="flex-shrink-0 cursor-pointer"
                        onClick={() => (window.location.href = "/")}
                    >
                        <Image
                            src="/favicon.ico"
                            alt="Favicon"
                            width={32}
                            height={32}
                        />
                    </div>

                    <div className="flex-grow mx-4 max-w-2xl relative">
                        <Dropdown
                            overlay={searchMenu}
                            visible={isDropdownVisible}
                            overlayStyle={{ zIndex: 1050 }}
                            onVisibleChange={(visible) => {
                                if (!visible) setIsDropdownVisible(false);
                            }}
                        >
                            <Input
                                placeholder="Tìm kiếm"
                                className="w-full"
                                value={searchTerm}
                                onChange={handleInputChange}
                                onBlur={() =>
                                    setTimeout(
                                        () => setIsDropdownVisible(false),
                                        200
                                    )
                                }
                                onFocus={() => {
                                    if (searchResults.length > 0) {
                                        setIsDropdownVisible(true);
                                    }
                                }}
                            />
                        </Dropdown>
                    </div>

                    <div className="flex space-x-8 items-center">
                        {isAuthenticated ? (
                            <>
                                <Cart userId={userId} />
                                <Dropdown
                                    overlay={dropdownMenu}
                                    trigger={["click"]}
                                >
                                    <div className="cursor-pointer">
                                        <Image
                                            src={
                                                avatarSrc ||
                                                "/default-avatar.png"
                                            }
                                            alt="Avatar"
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                    </div>
                                </Dropdown>
                            </>
                        ) : (
                            <>
                                <Button
                                    type="primary"
                                    onClick={() =>
                                        (window.location.href = "/dang-nhap")
                                    }
                                >
                                    Đăng Nhập
                                </Button>
                                <Button
                                    type="default"
                                    onClick={() =>
                                        (window.location.href = "/dang-ky")
                                    }
                                >
                                    Đăng Ký
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;
