import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { usePayment } from "../contexts/PaymentContext";
import { useAuth } from "../contexts/AuthContext";

const CheckoutPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cart, total } = useCart();
    const { user } = useAuth();
    const { processPayment } = usePayment();

    const [shippingInfo, setShippingInfo] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        note: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const paymentData = {
                orderId: id,
                amount: total,
                shippingInfo,
                items: cart,
                userId: user?.id,
            };

            await processPayment(paymentData);
            // Sau khi thanh toán thành công, chuyển hướng về trang chủ
            navigate("/");
        } catch (error) {
            console.error("Lỗi thanh toán:", error);
            alert("Có lỗi xảy ra khi thanh toán");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form thông tin giao hàng */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        Thông tin giao hàng
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-2">Họ và tên</label>
                            <input
                                type="text"
                                name="fullName"
                                value={shippingInfo.fullName}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Số điện thoại</label>
                            <input
                                type="tel"
                                name="phone"
                                value={shippingInfo.phone}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                value={shippingInfo.address}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Thành phố</label>
                            <input
                                type="text"
                                name="city"
                                value={shippingInfo.city}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Ghi chú</label>
                            <textarea
                                name="note"
                                value={shippingInfo.note}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                rows="3"
                            />
                        </div>
                    </form>
                </div>

                {/* Thông tin đơn hàng */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        Thông tin đơn hàng
                    </h2>
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between">
                                <span>
                                    {item.name} x {item.quantity}
                                </span>
                                <span>{item.price * item.quantity}đ</span>
                            </div>
                        ))}

                        <div className="border-t pt-4">
                            <div className="flex justify-between font-bold">
                                <span>Tổng cộng</span>
                                <span>{total}đ</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Xác nhận thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
