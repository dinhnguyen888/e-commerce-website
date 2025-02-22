import PropTypes from "prop-types";

const CheckoutContent = ({ user, product }) => {
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Thông tin thanh toán
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Tên người dùng
                        </label>
                        <input
                            type="text"
                            value={user.name}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Địa chỉ
                        </label>
                        <input
                            type="text"
                            value={user.address}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>
                </div>
            </div>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Thông tin sản phẩm
                </h2>
                <div className="space-y-2">
                    <p className="text-gray-700">
                        Tên sản phẩm:{" "}
                        <span className="font-medium">{product.name}</span>
                    </p>
                    <p className="text-gray-700">
                        Giá:{" "}
                        <span className="font-medium">
                            {product.price.toLocaleString()}đ
                        </span>
                    </p>
                    <p className="text-gray-700">
                        Số lượng:{" "}
                        <span className="font-medium">{product.quantity}</span>
                    </p>
                    <p className="text-gray-700">
                        Tổng cộng:{" "}
                        <span className="font-medium">
                            {(
                                product.price * product.quantity
                            ).toLocaleString()}
                            đ
                        </span>
                    </p>
                </div>
            </div>
            <button className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                Thanh toán
            </button>
        </div>
    );
};

CheckoutContent.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
    }).isRequired,
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
    }).isRequired,
};

export default CheckoutContent;
