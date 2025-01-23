"use client";
import React, { useState } from "react";
import { Pagination } from "antd";
import Card from "../common/Card";

// Mock data với giá trị cố định
const mockProducts = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    image: "https://picsum.photos/400/200",
    title: `Sản phẩm ${index + 1}`,
    price: 100000 + index * 50000, // Giá tăng dần theo index thay vì random
}));

function ListProduct() {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12; // Số sản phẩm trên mỗi trang

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleContact = () => {
        console.log("Contact clicked");
    };

    const handleAddToCart = () => {
        console.log("Add to cart clicked");
    };

    // Tính toán sản phẩm cho trang hiện tại
    const currentProducts = mockProducts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Grid Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentProducts.map((product) => (
                    <div key={product.id} className="w-full">
                        <Card
                            image={product.image}
                            title={product.title}
                            price={product.price}
                            onContact={handleContact}
                            onAddToCart={handleAddToCart}
                        />
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
                <Pagination
                    current={currentPage}
                    total={mockProducts.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
}

export default ListProduct;
