import { useState, useEffect } from "react";
import Banner from "../common/Banner";
import Card from "../common/Card";
import { message, Pagination } from "antd";
import useFetchProducts from "../../hooks/useFetchProducts";
import Loading from "../common/Loading";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { usePayment } from "../../contexts/PaymentContext";
import { getBanner } from "../../services/banner.get";
import MainTitle from "../common/MainTitle";

function ProductContent() {
    const [currentPage, setCurrentPage] = useState(1);
    const { products, loading, error } = useFetchProducts();
    const { addToCart } = useCart();
    const { userId } = useAuth();
    const { navigatePayment } = usePayment();
    const [banners, setBanners] = useState([]);
    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const banners = await getBanner();
                console.log(banners);
                setBanners(banners);
            } catch (error) {
                console.error("Failed to fetch banner", error);
            }
        };
        fetchBanner();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log(`Page changed to: ${page}`);
    };

    const handleBuyClick = (product) => {
        navigatePayment(product.id, {
            productPay: product.title,
            productPrice: product.price,
        });
    };

    const handleAddToCart = async (product) => {
        try {
            await addToCart({
                id: crypto.randomUUID(),
                userId,
                productId: product.id,
                productName: product.title,
                productDescription: product.description,
                imageUrl: product.imageUrl,
                price: product.price,
                addToCartAt: new Date().toISOString(),
            });
            message.success(`Added ${product.title} to cart`);
        } catch (error) {
            console.error("Failed to add product to cart", error);
            message.error("Failed to add product to cart");
        }
    };

    const handleViewDetail = (product) => {
        window.location.href = `/san-pham/${product.id}`;
    };

    if (loading) return <Loading />;
    if (error) return <div>Error loading products: {error?.message}</div>;

    const { pageSize, totalProducts, products: productList } = products;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentProducts = productList.slice(startIndex, endIndex);

    return (
        <>
            <div className="container mx-auto p-4 mt-5 lg:px-20">
                <div className="lg:">
                    <Banner images={banners} />
                </div>
                <MainTitle
                    text="Web App"
                    className={"text-balance uppercase my-7 font-semibold"}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 px-5 lg:px-0 justify-items-center">
                    {currentProducts.map((card, index) => (
                        <Card
                            key={index}
                            imageUrl={card.imageUrl}
                            title={card.title}
                            description={card.description}
                            onBuy={() => handleBuyClick(card)}
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
