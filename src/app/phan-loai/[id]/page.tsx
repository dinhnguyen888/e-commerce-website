import ListProduct from "../../../components/layout/ListProduct";
import productService from "../../../services/productService";

export default async function TypePage({ params }: { params: { id: string } }) {
    const products = await productService.getProductsByTag(params.id);

    // Add error handling for empty product array
    if (!products || products.length === 0) {
        return (
            <div>
                <h1 className="text-3xl font-lucida font-bold z-20 text-black text-center my-11 p-52 h-full">
                    Không có sản phẩm
                </h1>
            </div>
        );
    }

    return (
        <>
            <h1 className="text-3xl font-lucida font-bold z-20 text-black text-center my-11">
                Trang phân loại
            </h1>
            <ListProduct
                initialProducts={{
                    currentPage: 1,
                    pageSize: products.length,
                    totalProducts: products.length,
                    totalPages: 1,
                    products: products,
                }}
            />
            {/* </div> */}
        </>
    );
}
