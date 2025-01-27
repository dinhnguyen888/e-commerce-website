// src/app/do-an/[id]/page.tsx
import React from "react";
import { ProductImages } from "../../../components/layout/ProductImages";
import ProductInformation from "../../../components/layout/ProductInformation";
import { ProductDescription } from "../../../components/layout/ProductDescription";
import { RelatedProducts } from "../../../components/layout/RelatedProduct";
import productServiceInstance from "@/services/productService";
import FacebookComment from "@/components/common/FacebookComment";

export default async function ProductPage({
    params,
}: {
    params: { id: string };
}) {
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
                            productId={product.id}
                            productName={product.title}
                            productDescription={product.description}
                        />
                    </div>
                    <div className="grid grid-cols-1 mt-11 gap-8 text-green-400 font-lucida">
                        <ProductDescription
                            description={product.descriptionDetail}
                        />
                        <RelatedProducts />
                    </div>
                    <FacebookComment id={product.id} />
                </>
            )}
        </div>
    );
}
