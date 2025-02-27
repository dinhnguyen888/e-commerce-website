import { Button } from "antd";
import PropTypes from "prop-types";
import Carousel from "../common/Carousel";
import MainTitle from "../common/MainTitle";
import CustomTable from "../common/CustomTable";
import RelativeThing from "../common/RelativeThing";
import Loading from "../common/Loading";
import useViewDetail from "../../hooks/useViewDetail";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { message } from "antd";

const ProductDetailContent = ({ productId }) => {
    const { product, loading, error } = useViewDetail(productId);
    const { addToCart } = useCart();
    const { userId } = useAuth();

    console.log(product);
    const handleAddToCart = async () => {
        try {
            await addToCart({
                id: crypto.randomUUID(),
                userId,
                productId: product.id,
                productName: product.title,
                productDescription: product.description,
                imageUrl: product.imageUrls[0], // Assuming the first image is the main image
                price: product.price,
                addToCartAt: new Date().toISOString(),
            });
            message.success(`Added ${product.title} to cart`);
        } catch (error) {
            console.error("Failed to add product to cart", error);
            message.error("Failed to add product to cart");
        }
    };

    if (loading) return <Loading />;
    if (error) return <div>Error loading product: {error.message}</div>;
    if (!product) return <div>No product data available</div>;

    const data = {
        tableData: [
            {
                "Tính năng": product.feature,
                "Công nghệ sử dụng": product.technologyUsed,
            },
        ],
        relatedItems: [
            {
                image: "https://placehold.co/240x240.png",
                title: "Related Product 1",
                price: "100,000đ",
            },
            {
                image: "https://placehold.co/240x240.png",
                title: "Related Product 2",
                price: "200,000đ",
            },
            {
                image: "https://placehold.co/240x240.png",
                title: "Related Product 3",
                price: "300,000đ",
            },
        ],
    };

    return (
        <div className="p-6 mt-1 bg-white shadow-lg rounded-lg relative">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 w-full">
                    <Carousel images={product.imageUrls} />
                </div>
                <div className="lg:w-1/2 w-full lg:pl-8 mt-5 lg:mt-0">
                    <MainTitle
                        text={product.title}
                        className={"font-bold text-2xl text-gray-900"}
                    />
                    <p className="text-lg font-medium my-2 text-blue-600">
                        Tag: {product.tag}
                    </p>
                    <MainTitle
                        className="font-bold text-xl text-red-600 my-6"
                        text={`Giá: ${product.price.toLocaleString()}đ`}
                    />
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                        <Button
                            type="primary"
                            className="lg:w-auto w-full"
                            onClick={() => {}}
                        >
                            Mua ngay
                        </Button>
                        <Button
                            type="primary"
                            className="lg:w-auto w-full"
                            onClick={handleAddToCart}
                        >
                            Thêm vào giỏ
                        </Button>
                    </div>
                </div>
            </div>
            <CustomTable
                data={data.tableData}
                className="mt-6"
                isPagination={false}
            />
            <MainTitle
                text="Mô tả sản phẩm"
                className="font-bold text-xl text-gray-900 mt-8"
            />
            <div
                className="text-base text-gray-700 my-8 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.descriptionDetail }}
            />
            <MainTitle
                text="Sản phẩm liên quan"
                className="font-bold text-xl text-gray-900"
            />
            <RelativeThing items={data.relatedItems} />
        </div>
    );
};

ProductDetailContent.propTypes = {
    productId: PropTypes.number.isRequired,
};

export default ProductDetailContent;
