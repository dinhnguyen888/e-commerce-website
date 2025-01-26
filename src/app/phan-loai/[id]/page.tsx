import ListProduct from "../../../components/layout/ListProduct";
import productService from "../../../services/productService";

export default async function TypePage({ params }: { params: { id: string } }) {
    const product = await productService.getProductsByTag(params.id);

    // Add error handling for empty product array
    if (!product || product.length === 0) {
        return (
            <div>
                <h1 className="text-3xl font-lucida font-bold z-20 text-black text-center my-11 p-52 h-full">
                    Không có sản phẩm
                </h1>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-lucida font-bold z-20 text-black text-center my-11">
                Trang phân loại
            </h1>
            <ListProduct initialProducts={product[0]} />
        </div>
    );
}
