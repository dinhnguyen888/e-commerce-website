import BaseLayout from "../components/layout/BaseLayout";
import ProductDetailContent from "../components/contents/ProductDetailContent";

const mockProduct = {
    name: "Hệ thống cảnh báo mất cân bằng tải trên xe ô tô ",
    images: [
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x200.png",
        "https://placehold.co/600x300.png",
    ],
    description: "This is a sample product description.",
    price: 100000,
    tag: "#aspnet, #csharp, #dotnet, #winform",
};

function ProductDetailPage() {
    return (
        <BaseLayout>
            <ProductDetailContent product={mockProduct} />
        </BaseLayout>
    );
}

export default ProductDetailPage;
