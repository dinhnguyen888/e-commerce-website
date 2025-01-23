import React from "react";
import { Button, Card as AntCard } from "antd";
import { ShoppingCartOutlined, PhoneOutlined } from "@ant-design/icons";
import Image from "next/image";

interface ProductCardProps {
    image: string;
    title: string;
    price: number;
    onContact?: () => void;
    onAddToCart?: () => void;
}

function Card({
    image,
    title,
    price,
    onContact,
    onAddToCart,
}: ProductCardProps) {
    return (
        <AntCard
            hoverable
            cover={
                <Image
                    alt={title}
                    src={image}
                    style={{ objectFit: "cover" }}
                    width={400}
                    height={200}
                />
            }
            styles={{ body: { padding: "12px" } }}
        >
            <div style={{ marginBottom: "12px" }}>
                <h3 style={{ margin: "0 0 8px 0" }}>{title}</h3>
                <div
                    style={{
                        color: "#f50",
                        fontSize: "18px",
                        fontWeight: "bold",
                    }}
                >
                    {price.toLocaleString("vi-VN")} đ
                </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
                <Button
                    type="primary"
                    icon={<PhoneOutlined />}
                    onClick={onContact}
                    block
                >
                    Liên hệ ngay
                </Button>
                <Button
                    icon={<ShoppingCartOutlined />}
                    onClick={onAddToCart}
                    block
                >
                    Thêm vào giỏ
                </Button>
            </div>
        </AntCard>
    );
}

export default Card;
