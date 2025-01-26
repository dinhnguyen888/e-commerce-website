import React from "react";
import { Button, Card as AntCard } from "antd";
import { ShoppingCartOutlined, PhoneOutlined } from "@ant-design/icons";
import Image from "next/image";

interface ProductCardProps {
    id: string;
    image: string;
    title: string;
    tag: string;
    price: number;
    onContact?: () => void;
    onAddToCart?: () => void;
}
const handleClickProduct = (id: string) => {
    window.location.href = `/do-an/${id}`;
};
function Card({
    id,
    image,
    title,
    tag,
    price,
    onContact,
    onAddToCart,
}: ProductCardProps) {
    return (
        <AntCard
            hoverable
            className="flex flex-col justify-between h-full bg-gray-100"
            cover={
                <Image
                    alt={title}
                    src={image}
                    className="object-cover h-[200px] w-full"
                    width={400}
                    height={200}
                    onClick={() => handleClickProduct(id)}
                />
            }
            bodyStyle={{ padding: "12px" }}
        >
            {/* Nội dung */}
            <div className="mb-3" onClick={() => handleClickProduct(id)}>
                {/* Tiêu đề */}
                <h3
                    className="text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap mb-2"
                    title={title}
                >
                    {title}
                </h3>

                {/* Tag */}
                <div className="inline-block bg-cyan-600 text-white font-bold px-3 py-1 text-xs rounded-lg mb-2 font-sans">
                    {tag}
                </div>

                {/* Giá */}
                <div className="text-red-500 text-lg font-bold">
                    {price.toLocaleString("vi-VN")} đ
                </div>
            </div>

            {/* Nút hành động */}
            <div className="flex gap-2">
                <Button
                    type="primary"
                    icon={<PhoneOutlined />}
                    onClick={onContact}
                    className="flex-1"
                >
                    Liên hệ ngay
                </Button>
                <Button
                    icon={<ShoppingCartOutlined />}
                    onClick={onAddToCart}
                    className="flex-1"
                >
                    Thêm vào giỏ
                </Button>
            </div>
        </AntCard>
    );
}

export default Card;
