"use client";
import React from "react";
import { ProductImages } from "../components/layout/ProductImages";
import { ProductInfo } from "../components/layout/ProductInfo";
import { ProductDescription } from "../components/layout/ProductDescription";
import { RelatedProducts } from "../components/layout/RelatedProduct";
import { RelatedProduct } from "../types/Product";
import { Product } from "../types/Product";

const demoProduct: Product = {
    id: 1,
    name: "Sample Product",
    price: 999,
    images: [
        "https://picsum.photos/800/800?image=1",
        "https://picsum.photos/800/800?image=2",
        "https://picsum.photos/800/800?image=3",
        "https://picsum.photos/800/800?image=4",
    ],
    description: "This is a detailed description of the product...",
    specifications: {
        Brand: "Sample Brand",
        Material: "Premium Quality",
        Warranty: "12 months",
        Origin: "Made in Vietnam",
    },
};

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
                <ProductImages images={demoProduct.images} />
                <ProductInfo
                    name={demoProduct.name}
                    price={demoProduct.price}
                    specifications={demoProduct.specifications}
                    onBuyNow={handleBuyNow}
                    onAddToCart={handleAddToCart}
                    onContact={handleContact}
                />
                <ProductDescription description={demoProduct.description} />
                <RelatedProducts
                    products={relatedProducts}
                    onProductClick={handleRelatedProductClick}
                />
            </div>
        </div>
    );
}

export default ProductPage;
