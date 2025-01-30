"use client";
import React, { useState } from "react";
import { Pagination } from "antd";
import Card from "../common/Card";
import { PaginationProduct, Product } from "@/types/Product";
import productService from "../../services/productService";
import useCartStore from "@/stores/cartStore";
import useAuthStore from "@/stores/useAuthStore";
function ListProduct({
    initialProducts,
}: {
    initialProducts: PaginationProduct;
}) {
    const [products, setProducts] =
        useState<PaginationProduct>(initialProducts);
    const [currentPage, setCurrentPage] = useState(products.currentPage);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { addItem } = useCartStore(); // Lấy hàm addItem từ useCartStore
    const { getUserId } = useAuthStore();
    const pageSize = products.pageSize;

    const handlePageChange = async (page: number) => {
        setCurrentPage(page);
        setIsLoading(true);

        try {
            const updatedProducts = await productService.getAllProducts(
                page,
                pageSize
            );
            setProducts(updatedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };
    const userId = getUserId() ?? "";
    const onContact = () => {
        window.open("https://www.facebook.com/nguyen.inh.869154/");
    };

    const onAddToCart = async (product: Product) => {
        try {
            await addItem({
                id: product.id,
                userId: userId, // Thay bằng logic lấy userId thực tế
                productId: product.id,
                productName: product.title,
                productDescription: product.description,
                price: product.price,
                addToCartAt: new Date().toISOString(),
            });
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    const currentProducts = products.products;

    return (
        <div className="container mx-auto px-4 py-8">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {currentProducts.map((product) => (
                            <div key={product.id} className="w-full">
                                <Card
                                    id={product.id}
                                    image={product.imageUrl}
                                    title={product.title}
                                    price={product.price}
                                    tag={product.tag}
                                    onContact={onContact}
                                    onAddToCart={() => onAddToCart(product)}
                                />
                            </div>
                        ))}
                    </div>
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
