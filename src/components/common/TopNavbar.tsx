"use client"; // Add this since we're using client-side components (antd)

import React from "react";
import { Input, Button } from "antd";
import Image from "next/image";

const TopNavbar = () => {
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

                    {/* Search bar - ẩn trên mobile */}
                    <div className="hidden sm:block flex-grow mx-4 max-w-2xl">
                        <Input.Search
                            placeholder="Tìm kiếm"
                            className="w-full"
                        />
                    </div>

                    {/* Auth buttons */}
                    <div className="flex space-x-2">
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
                            onClick={() => (window.location.href = "/dang-ky")}
                        >
                            Đăng Ký
                        </Button>
                    </div>
                </div>

                {/* Search bar cho mobile */}
                <div className="sm:hidden py-2">
                    <Input.Search placeholder="Tìm kiếm" className="w-full" />
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;
