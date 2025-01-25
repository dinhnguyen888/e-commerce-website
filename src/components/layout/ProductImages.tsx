"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ProductImagesProps {
    images: string[];
}

export const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const handleImageChange = (index: number) => {
        if (currentImage !== index) {
            setCurrentImage(index);
        }
    };

    return (
        <div className="relative bg-white p-4 rounded-xl shadow-sm">
            {/* Hình ảnh chính */}
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={`Product image ${index + 1}`}
                        fill
                        className={`absolute transition-opacity duration-500 object-cover ${
                            currentImage === index ? "opacity-100" : "opacity-0"
                        }`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                    />
                ))}
            </div>

            {/* Hình ảnh thu nhỏ */}
            <div className="flex mt-4 gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => handleImageChange(index)}
                        className={`flex-shrink-0 relative w-20 h-20 rounded-md overflow-hidden transition-all duration-200 ${
                            currentImage === index
                                ? "ring-2 ring-blue-500 scale-105"
                                : "hover:ring-2 hover:ring-blue-300"
                        }`}
                    >
                        <Image
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};
