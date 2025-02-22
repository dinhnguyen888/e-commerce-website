import PropTypes from "prop-types";
import { Button } from "antd";

const BuyNowButton = ({ productId, className, size, bgColor, color }) => {
    const handleBuyNow = () => {
        // Logic to handle the buy now action
        console.log(`Buying product with ID: ${productId}`);
        // Add your buy now logic here
    };

    return (
        <Button
            type="none"
            className={className}
            onClick={handleBuyNow}
            style={{ fontSize: size, backgroundColor: bgColor, color: color }}
        >
            Mua ngay
        </Button>
    );
};

BuyNowButton.propTypes = {
    productId: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    bgColor: PropTypes.string,
};

export default BuyNowButton;
