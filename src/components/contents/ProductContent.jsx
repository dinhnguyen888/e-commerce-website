import { useState } from "react";
import Banner from "../common/Banner";
import Card from "../common/Card";
import { message, Pagination } from "antd";
import useFetchProducts from "../../hooks/useFetchProducts";
import Loading from "../common/Loading";
import useCart from "../../hooks/useCart";

const banners = [
    {
        src: "https://placehold.co/600x200",
        alt: "Sample Banner 1",
    },
    {
        src: "https://placehold.co/600x200",
        alt: "Sample Banner 2",
    },
];

const overlayTexts = ["Banner Title 1", "Banner Title 2"];

function ProductContent() {
    const [currentPage, setCurrentPage] = useState(1);
    const { products, loading, error } = useFetchProducts();
    const { addToCart, loading: cartLoading, error: cartError } = useCart();

    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log(`Page changed to: ${page}`);
    };

    const handleBuy = (product) => {
        console.log(`Buying product: ${product.title}`);
        message.success(`hehe, bought ${product.title}`);
    };

    const handleAddToCart = async (product) => {
        try {
            await addToCart({
                id: product.id,
                userId: "user-id-placeholder",
                productName: product.title,
                productId: product.id,
                productDescription: product.description,
                price: product.price,
                addToCartAt: new Date().toISOString(),
            });
            console.log(`Added product to cart: ${product.title}`);
        } catch (error) {
            console.error("Failed to add product to cart", error);
        }
    };

    const handleViewDetail = (product) => {
        window.location.href = `/san-pham/${product.id}`;
    };

    if (loading || cartLoading) return <Loading />;
    if (error || cartError)
        return (
            <div>
                Error loading products: {error?.message || cartError?.message}
            </div>
        );

    const { pageSize, totalProducts, products: productList } = products;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentProducts = productList.slice(startIndex, endIndex);

    return (
        <>
            <div className="container mx-auto p-4 mt-11 lg:px-20">
                <div className="lg:">
                    <Banner images={banners} overlayTexts={overlayTexts} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 px-5 lg:px-0 py-11 justify-items-center">
                    {currentProducts.map((card, index) => (
                        <Card
                            key={index}
                            imageUrl={card.imageUrl}
                            title={card.title}
                            description={card.description}
                            onBuy={() => handleBuy(card)}
                            onAddToCart={() => handleAddToCart(card)}
                            onViewDetails={() => handleViewDetail(card)}
                            price={card.price}
                            tag={card.tag}
                            rating={card.rating}
                            postedDate={card.postedDate}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-4">
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={totalProducts}
                        onChange={handlePageChange}
                        showQuickJumper
                    />
                </div>
            </div>
        </>
    );
}

export default ProductContent;
