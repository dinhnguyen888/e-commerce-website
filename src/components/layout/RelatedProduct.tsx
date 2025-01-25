import { Card } from "antd";
import { useState, useEffect } from "react";
import { Product } from "../../types/Product";
import Image from "next/image";
import productServiceInstance from "@/services/productService";

export const RelatedProducts = () => {
    const [products, setProducts] = useState<Product[]>([]); // State để lưu sản phẩm
    const [loading, setLoading] = useState<boolean>(true); // State để quản lý trạng thái tải

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const fetchedProducts =
                    await productServiceInstance.getRelatedProduct();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Failed to fetch related products:", error);
            } finally {
                setLoading(false); // Dừng trạng thái tải khi hoàn thành
            }
        };

        fetchRelatedProducts();
    }, []); // Chỉ chạy 1 lần khi component mount

    const onProductClick = (id: string) => {
        window.location.href = `/do-an/${id}`;
    };

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    Đang tải sản phẩm...
                </h2>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Sản phẩm khác
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        hoverable
                        onClick={() => onProductClick(product.id)}
                        cover={
                            <div className="relative h-40">
                                <Image
                                    alt={product.title}
                                    src={product.imageUrl}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 33vw, 20vw"
                                />
                            </div>
                        }
                        className="transition-all duration-300 hover:shadow-lg"
                    >
                        <Card.Meta
                            title={
                                <span className="text-base">
                                    {product.title}
                                </span>
                            }
                            description={
                                <div className="flex justify-between items-center">
                                    <span className="text-red-500 font-medium">
                                        {product.price.toLocaleString()} đ
                                    </span>
                                    {/* Hàng "Xem chi tiết" */}
                                    <a
                                        href={`/do-an/${product.id}`}
                                        className="text-blue-500 text-sm underline"
                                        onClick={(e) => e.stopPropagation()} // Ngăn mở thẻ chính khi click
                                    >
                                        Xem chi tiết
                                    </a>
                                </div>
                            }
                        />
                    </Card>
                ))}
            </div>
        </div>
    );
};
