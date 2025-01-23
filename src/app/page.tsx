"use client";

import React, { useEffect, useState } from "react";
import ListProduct from "../components/layout/ListProduct";
import SlideShow from "../components/layout/SlideShow";
import productService from "../services/productService";
import { PaginationProduct } from "@/types/Product";

function HomePage() {
    const images = [
        "https://picsum.photos/800/800?image=1",
        "https://picsum.photos/800/800?image=2",
        "https://picsum.photos/800/800?image=3",
        "https://picsum.photos/800/800?image=4",
    ];

    const [initialProducts, setInitialProducts] =
        useState<PaginationProduct | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setIsLoading(true);
                const data = await productService.getAllProducts(1, 12, true);
                setInitialProducts(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Failed to fetch products.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (isLoading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!initialProducts) {
        return <div>No products available.</div>;
    }

    return (
        <div>
            <SlideShow images={images} />
            <h1 className="text-3xl font-lucida font-bold z-20 text-black text-center my-11">
                Đồ án đê, mại zô mại zôoooo
            </h1>
            <ListProduct initialProducts={initialProducts} />
        </div>
    );
}

export default HomePage;
