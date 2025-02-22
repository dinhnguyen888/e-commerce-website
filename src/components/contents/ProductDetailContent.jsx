import { Button } from "antd";
import PropTypes from "prop-types";
import Carousel from "../common/Carousel";
import MainTitle from "../common/MainTitle";
import CustomTable from "../common/CustomTable";
import BuyNowButton from "../common/BuyNowButton";
import RelativeThing from "../common/RelativeThing";

const ProductDetailContent = ({ product }) => {
    if (!product) {
        return <div>Loading...</div>;
    }

    const tableData = [
        {
            "Tính năng": "xác thực, phân quyền ",
            "Công nghệ sử dụng": "Asp .net, winform, wpf",
        },
    ];

    const relatedItems = [
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
    ];

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg relative">
            <div className="flex flex-col md:flex-row">
                <div className="lg:w-1/2">
                    <Carousel images={product.images} />
                </div>
                <div className="md:w-1/2 md:pl-6 h-96">
                    <MainTitle
                        text={product.name}
                        className={"font-semibold text-gray-900 lg:mt-0 mt-5 "}
                    />
                    <p className="text-base font-semibold my-2 text-blue-600">
                        Tag: {product.tag}
                    </p>
                    <MainTitle
                        className="font-semibold text-red-600 my-6"
                        text={`Giá: ${product.price.toLocaleString()}đ`}
                    />
                    <div className="flex space-x-4">
                        <BuyNowButton
                            className={"text-white"}
                            size={"large"}
                            bgColor={"red"}
                            color={"white"}
                            productId={1}
                        />
                        <Button type="primary">Mua ngay</Button>
                    </div>
                </div>
            </div>
            <CustomTable
                data={tableData}
                className="mt-4"
                isPagination={false}
            />
            <MainTitle
                text="Mô tả sản phẩm"
                className="font-semibold text-gray-900 mt-6"
            />
            <div
                className="text-base text-gray-600"
                dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <MainTitle
                text="Sản phẩm liên quan"
                className="font-semibold text-gray-900 mt-6"
            />
            <RelativeThing items={relatedItems} />
        </div>
    );
};

ProductDetailContent.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        tag: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProductDetailContent;
