import PropTypes from "prop-types";
import { Card as AntCard, Button } from "antd";
import { ShoppingCartOutlined, DollarOutlined } from "@ant-design/icons";

function Card({
    title,
    description,
    imageUrl,
    onBuy,
    onAddToCart,
    onViewDetails,
    price,
    tag,
}) {
    const handleBuyClick = (e) => {
        e.stopPropagation();
        onBuy();
    };

    const handleAddToCartClick = (e) => {
        e.stopPropagation();
        onAddToCart();
    };

    return (
        <AntCard
            hoverable
            className="w-full overflow-hidden cursor-pointer"
            cover={
                <div className="relative">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-60 object-cover rounded-t-md"
                    />
                    <p className="absolute bottom-0 bg-black opacity-50 w-full text-red-200 text-sm text-center py-1">
                        Giá: {price}.000 đ
                    </p>
                </div>
            }
            onClick={onViewDetails}
        >
            <AntCard.Meta
                title={
                    <h2 className="text-md font-semibold text-center">
                        {title}
                    </h2>
                }
                description={
                    <div className="text-gray-700 text-xs">
                        <span className="font-semibold">{tag}</span>
                        <p
                            className="line-clamp-2 overflow-hidden text-ellipsis"
                            style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {description}
                        </p>
                    </div>
                }
            />
            <div className="flex justify-center gap-2 mt-4">
                <Button
                    type="primary"
                    icon={<DollarOutlined />}
                    onClick={handleBuyClick}
                >
                    Mua ngay
                </Button>
                <Button
                    type="default"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCartClick}
                >
                    Thêm vào giỏ
                </Button>
            </div>
        </AntCard>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    onBuy: PropTypes.func.isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired,
    tag: PropTypes.string,
};

export default Card;
