// app/page.tsx

import BannerServiceInstance from "@/services/bannerService";
import ListProduct from "../components/layout/ListProduct";
import SlideShow from "../components/layout/SlideShow";
import productService from "../services/productService";

export default async function HomePage() {
    const images = await BannerServiceInstance.getAllBanner();
    const initialProducts = await productService.getAllProducts(1, 12, true);

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
