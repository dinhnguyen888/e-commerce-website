import { Button } from "antd";
import PropTypes from "prop-types";
import Carousel from "../common/Carousel";
import MainTitle from "../common/MainTitle";
import CustomTable from "../common/CustomTable";
import BuyNowButton from "../common/BuyNowButton";
import RelativeThing from "../common/RelativeThing";
import Loading from "../common/Loading";
import useViewDetail from "../../hooks/useViewDetail";

const ProductDetailContent = ({ productId }) => {
    const { product, loading, error } = useViewDetail(productId);
    console.log(product);

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
                        <BuyNowButton
                            className={"text-white"}
                            size={"large"}
                            bgColor={"red"}
                            color={"white"}
                            productId={product.id}
                        />
                        <Button type="primary" className="lg:w-auto w-full">
                            Thêm vào giỏ{" "}
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
