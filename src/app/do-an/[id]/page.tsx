"use client";
import React, { useEffect, useState } from "react";
import { ProductImages } from "../../../components/layout/ProductImages";
import { ProductInfo } from "../../../components/layout/ProductInfo";
import { ProductDescription } from "../../../components/layout/ProductDescription";
import { RelatedProducts } from "../../../components/layout/RelatedProduct";
import { RelatedProduct } from "../../../types/Product";
import { Product } from "../../../types/Product";

const relatedProducts: RelatedProduct[] = [
    {
        id: 2,
        name: "Related Product 1",
        price: 799,
        image: "https://picsum.photos/200/200?image=5",
    },
    {
        id: 3,
        name: "Related Product 2",
        price: 899,
        image: "https://picsum.photos/200/200?image=6",
    },
    {
        id: 4,
        name: "Related Product 3",
        price: 699,
        image: "https://picsum.photos/200/200?image=7",
    },
];

function ProductPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [related, setRelated] = useState<RelatedProduct[]>(relatedProducts);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(
                "https://localhost:7202/api/Products/64eaddc2f3b1c5a01a0f3333"
            );
            const data = await response.json();
            setProduct(data);
        };
        fetchProduct();
    }, []);

    const handleBuyNow = () => {
        console.log("Buy Now clicked");
    };

    const handleAddToCart = () => {
        console.log("Add to Cart clicked");
    };

    const handleContact = () => {
        console.log("Contact clicked");
    };

    const handleRelatedProductClick = (productId: number) => {
        console.log("Related product clicked:", productId);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {product && (
                    <>
                        <ProductImages images={[product.imageUrl]} />
                        <ProductInfo
                            name={product.title}
                            price={product.price}
                            specifications={{}}
                            onBuyNow={handleBuyNow}
                            onAddToCart={handleAddToCart}
                            onContact={handleContact}
                        />
                        <ProductDescription description={product.description} />
                        <RelatedProducts
                            products={related}
                            onProductClick={handleRelatedProductClick}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default ProductPage;
