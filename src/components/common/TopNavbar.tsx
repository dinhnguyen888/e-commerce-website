"use client"; // Add this since we're using client-side components (antd)

import React from "react";
import { Input, Button, Dropdown, Menu } from "antd";
import {
    ShoppingCartOutlined,
    LogoutOutlined,
    HistoryOutlined,
    UserOutlined,
} from "@ant-design/icons";
import Image from "next/image";

interface TopNavbarProps {
    isAuthenticated: boolean;
    avatarSrc?: string;
    username?: string; // Tên người dùng
    onLogout: () => void;
    onViewOrderHistory: () => void;
    onCartClick: () => void;
    onViewProfile: () => void; // Hàm chuyển đến thông tin cá nhân
}

const TopNavbar: React.FC<TopNavbarProps> = ({
    isAuthenticated,
    avatarSrc,
    username,
    onLogout,
    onViewOrderHistory,
    onCartClick,
    onViewProfile,
}) => {
    const dropdownMenu = (
        <Menu>
            {/* Greeting */}
            <Menu.Item key="greeting" disabled>
                <span>
                    Xin chào, <b>{username || "Người dùng"}</b>
                </span>
            </Menu.Item>
            <Menu.Divider />

            {/* View Profile */}
            <Menu.Item key="view-profile" onClick={onViewProfile}>
                <UserOutlined /> Thông tin cá nhân
            </Menu.Item>

            {/* Order History */}
            <Menu.Item key="order-history" onClick={onViewOrderHistory}>
                <HistoryOutlined /> Lịch sử mua hàng
            </Menu.Item>

            {/* Logout */}
            <Menu.Item key="logout" onClick={onLogout}>
                <LogoutOutlined /> Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <nav className="z-50 w-full bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
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

                    {/* Search bar - Hidden on mobile */}
                    <div className="hidden sm:block flex-grow mx-4 max-w-2xl">
                        <Input.Search
                            placeholder="Tìm kiếm"
                            className="w-full"
                        />
                    </div>

                    {/* Auth buttons or User menu */}
                    <div className="flex space-x-8 items-center">
                        {isAuthenticated ? (
                            <>
                                {/* Cart button */}
                                <div className="relative text-center">
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<ShoppingCartOutlined />}
                                        className="bg-white text-blue-800 text-xl"
                                        onClick={onCartClick}
                                    />
                                </div>

                                {/* Avatar with dropdown */}
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
                                    onClick={() => {
                                        window.location.href = "/dang-nhap";
                                    }}
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

                {/* Search bar for mobile */}
                <div className="sm:hidden py-2">
                    <Input.Search placeholder="Tìm kiếm" className="w-full" />
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;
