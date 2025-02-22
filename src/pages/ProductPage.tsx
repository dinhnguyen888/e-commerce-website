import React from "react";
import BaseLayout from "../components/layout/BaseLayout";
import ProductContent from "../components/contents/ProductContent";
import Header from "../components/sections/Header";
import MiddleBar from "../components/sections/MiddleBar";

function ProductPage() {
    return (
        <BaseLayout>
            <MiddleBar />
            <ProductContent />
        </BaseLayout>
    );
}

export default ProductPage;
