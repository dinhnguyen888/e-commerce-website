import React from "react";
import { ProductImages } from "../../../components/layout/ProductImages";
import ProductInformation from "../../../components/layout/ProductInformation";
import { ProductDescription } from "../../../components/layout/ProductDescription";
import { RelatedProducts } from "../../../components/layout/RelatedProduct";

import productServiceInstance from "@/services/productService";

async function ProductPage({ params }: { params: { id: string } }) {
    // const [product, setProduct] = useState<ProductDetail | null>(null);

    const product = await productServiceInstance.getProductDetailById(
        params.id
    );

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {product && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-green-400 font-lucida">
                        <ProductImages images={product.imageUrls} />
                        <ProductInformation
                            name={product.title}
                            price={product.price}
                            specifications={{
                                "Tính năng": product.specification,
                            }}
                        />
                    </div>
                    <div className="grid grid-cols-1 mt-11  gap-8  text-green-400 font-lucida">
                        <ProductDescription
                            description={product.descriptionDetail}
                        />
                        <RelatedProducts />
                    </div>
                </>
            )}
        </div>
    );
}

export default ProductPage;
