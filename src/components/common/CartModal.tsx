"use client";

import React from "react";
import { Modal, List, Button } from "antd";
import useCartStore from "@/stores/cartStore";

interface CartModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isVisible, onClose }) => {
    const { cartItems, removeItem, clearCart } = useCartStore();

    const handleRemoveItem = (itemId: string) => {
        removeItem(itemId);
    };

    const handleClearCart = () => {
        clearCart(cartItems[0]?.userId || ""); // Assumes all items belong to the same user
    };

    return (
        <Modal
            title="Giỏ hàng"
            visible={isVisible}
            onCancel={onClose}
            footer={null}
        >
            <List
                dataSource={cartItems}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button
                                key="remove"
                                danger
                                onClick={() => handleRemoveItem(item.id)}
                            >
                                Xóa
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            title={item.productName}
                            description={`${
                                item.productDescription
                            } - ${item.price.toLocaleString()} VNĐ`}
                        />
                    </List.Item>
                )}
            />
            <Button block type="primary" danger onClick={handleClearCart}>
                Xóa tất cả
            </Button>
        </Modal>
    );
};

export default CartModal;
