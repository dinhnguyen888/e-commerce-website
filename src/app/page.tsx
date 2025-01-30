import BannerServiceInstance from "@/services/bannerService";
import ListProduct from "../components/layout/ListProduct";
import productService from "../services/productService";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import components that are not needed immediately
const DynamicSlideShow = dynamic(
    () => import("../components/layout/SlideShow"),
    {
        loading: () => <div>Loading...</div>,
        ssr: true,
    }
);

// Add metadata to help with SEO
export const metadata = {
    title: "Home Page",
    description: "Welcome to our e-commerce store",
};

export default async function HomePage() {
    // Fetch data in parallel using Promise.all
    const [images, initialProducts] = await Promise.all([
        BannerServiceInstance.getAllBanner(),
        productService.getAllProducts(1, 12, true),
    ]);

    return (
        <div>
            <Suspense fallback={<div>Loading slideshow...</div>}>
                <div className="w-full">
                    <DynamicSlideShow images={images} />
                </div>
            </Suspense>
            <div className="container mx-auto px-4">
                <h1 className="text-3xl uppercase  font-bold z-20 text-black text-left font-sans mb-11  ">
                    Tất cả project
                </h1>
            </div>

            <Suspense fallback={<div>Loading products...</div>}>
                <ListProduct initialProducts={initialProducts} />
            </Suspense>
        </div>
    );
}
