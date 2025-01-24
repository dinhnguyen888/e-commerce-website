"use client";
import React, { useState } from "react";
import { Pagination } from "antd";
import Card from "../common/Card";
import { PaginationProduct } from "@/types/Product";
import productService from "../../services/productService";

function ListProduct({
    initialProducts,
    onContact,
    onAddToCart,
}: {
    initialProducts: PaginationProduct;
    onContact: () => void;
    onAddToCart: () => void;
}) {
    const [products, setProducts] =
        useState<PaginationProduct>(initialProducts);
    const [currentPage, setCurrentPage] = useState(products.currentPage);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const pageSize = products.pageSize;
    const handleClickProduct = (id: string) => {
        window.location.href = `/do-an/${id}`;
    };
    const handlePageChange = async (page: number) => {
        setCurrentPage(page); // Cập nhật trang hiện tại
        setIsLoading(true); // Hiển thị trạng thái loading

        try {
            const updatedProducts = await productService.getAllProducts(
                page,
                pageSize
            );
            setProducts(updatedProducts); // Cập nhật danh sách sản phẩm
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false); // Ẩn trạng thái loading
        }
    };

    const currentProducts = products.products;

    return (
        <div className="container mx-auto px-4 py-8">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {/* Grid Container */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {currentProducts.map((product) => (
                            <div
                                key={product.id}
                                className="w-full"
                                onClick={() => handleClickProduct(product.id)}
                            >
                                <Card
                                    image={product.imageUrl}
                                    title={product.title}
                                    price={product.price}
                                    onContact={onContact}
                                    onAddToCart={onAddToCart}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8 flex justify-center">
                        <Pagination
                            current={currentPage}
                            total={products.totalProducts}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default ListProduct;
