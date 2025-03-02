import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import { useProduct } from "../../contexts/ProductContext";
import Card from "../common/Card";
import Loading from "../common/Loading";
import { Pagination, message } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { usePayment } from "../../contexts/PaymentContext";

const PAGE_SIZE = 6;

const RelatedContent = ({ tag }) => {
    const { addToCart } = useCart();
    const { userId } = useAuth();
    const { navigatePayment } = usePayment();
    const { getProductsByTag, loading } = useProduct();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRelatedProducts = useCallback(async () => {
        if (isLoading) return; // Prevent multiple simultaneous requests

        try {
            setIsLoading(true);
            const response = await getProductsByTag(
                tag,
                currentPage,
                PAGE_SIZE
            );

            if (response) {
                setRelatedProducts(response.products || []);
                setTotal(response.totalProducts || 0);
                if (response.currentPage !== currentPage) {
                    setCurrentPage(response.currentPage);
                }
            } else {
                setRelatedProducts([]);
                setTotal(0);
            }
        } catch (error) {
            console.error("Failed to fetch related products:", error);
            setRelatedProducts([]);
            setTotal(0);
            message.error("Không thể tải sản phẩm liên quan");
        } finally {
            setIsLoading(false);
        }
    }, [tag, currentPage]); // Remove getProductsByTag from dependencies

    useEffect(() => {
        fetchRelatedProducts();
    }, [fetchRelatedProducts]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
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
            message.success(`Đã thêm ${product.title} vào giỏ hàng`);
        } catch (error) {
            console.error("Failed to add product to cart:", error);
            message.error("Không thể thêm vào giỏ hàng");
        }
    };

    const handleViewDetail = (product) => {
        window.location.href = `/san-pham/${product.id}`;
    };

    if (isLoading || loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    if (!isLoading && !loading && relatedProducts.length === 0) {
        return (
            <div className="text-center text-gray-500 py-8">
                Không có sản phẩm liên quan
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-16">
                {relatedProducts.map((product) => (
                    <Card
                        key={product.id}
                        title={product.title}
                        description={product.description}
                        imageUrl={product.imageUrl}
                        onBuy={() => handleBuyClick(product)}
                        onAddToCart={() => handleAddToCart(product)}
                        onViewDetails={() => handleViewDetail(product)}
                        price={product.price}
                        tag={product.tag}
                        postedDate={product.postedDate}
                    />
                ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-6">
                <Pagination
                    current={currentPage}
                    total={total}
                    pageSize={PAGE_SIZE}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

RelatedContent.propTypes = {
    tag: PropTypes.string.isRequired,
};

export default RelatedContent;
