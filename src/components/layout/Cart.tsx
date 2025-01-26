"use client";

import React, { useState, useEffect } from "react";
import { Badge, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import useCartStore from "@/stores/cartStore";
import CartModal from "../common/CartModal";

const Cart: React.FC<{ userId: string }> = ({ userId }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { cartItems, fetchCart } = useCartStore();

    useEffect(() => {
        fetchCart(userId);
    }, [userId]);

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Badge count={cartItems.length}>
                <Button
                    icon={<ShoppingCartOutlined />}
                    onClick={handleOpenModal}
                >
                    Giỏ hàng
                </Button>
            </Badge>
            <CartModal isVisible={isModalVisible} onClose={handleCloseModal} />
            {/* <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<ShoppingCartOutlined />}
                                    onClick={handleOpenModal}
                                /> */}
        </>
    );
};

export default Cart;
