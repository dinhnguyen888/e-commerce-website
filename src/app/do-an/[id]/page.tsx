"use client";

import React, { useEffect, useState } from "react";
import { ProductImages } from "../../../components/layout/ProductImages";
import { ProductInfo } from "../../../components/layout/ProductInfo";
import { ProductDescription } from "../../../components/layout/ProductDescription";
import { RelatedProducts } from "../../../components/layout/RelatedProduct";
import { RelatedProduct, ProductDetail } from "../../../types/Product";
import productServiceInstance from "@/services/productService";

function ProductPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<ProductDetail | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response =
                    await productServiceInstance.getProductDetailById(
                        params.id
                    );
                console.log("Product Data:", response); // Xem dữ liệu trả về
                setProduct(response);
            } catch (error) {
                console.error("Error fetching product:", error); // Log lỗi
            }
        };

        fetchProduct();
    }, [params.id]);

    const relatedProducts: RelatedProduct[] = [
        {
            id: "1",
            name: "Related Product 1",
            price: 799,
            image: "https://picsum.photos/200/200?image=5",
        },
        {
            id: "2",
            name: "Related Product 2",
            price: 899,
            image: "https://picsum.photos/200/200?image=6",
        },
        {
            id: "3",
            name: "Related Product 3",
            price: 699,
            image: "https://picsum.photos/200/200?image=7",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {product && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-green-400 font-lucida">
                        <ProductImages images={product.imageUrls} />
                        <ProductInfo
                            name={product.title}
                            price={product.price}
                            specifications={{
                                Feature: product.specification,
                            }}
                            onBuyNow={handleBuyNow}
                            onAddToCart={handleAddToCart}
                            onContact={handleContact}
                        />
                    </div>
                    <div className="grid grid-cols-1 mt-11  gap-8  text-green-400 font-lucida">
                        <ProductDescription
                            description={product.descriptionDetail}
                        />
                        <RelatedProducts
                            products={relatedProducts}
                            onProductClick={handleRelatedProductClick}
                        />
                    </div>
                </>
            )}
        </div>
    );

    function handleBuyNow() {
        console.log("Buy Now clicked");
    }

    function handleAddToCart() {
        console.log("Add to Cart clicked");
    }

    function handleContact() {
        console.log("Contact clicked");
    }

    function handleRelatedProductClick(productId: number) {
        console.log("Related product clicked:", productId);
    }
}

export default ProductPage;
