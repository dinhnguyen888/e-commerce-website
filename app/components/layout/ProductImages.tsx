import React, { useState } from "react";
import Image from "next/image";

interface ProductImagesProps {
    images: string[];
}

export const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleImageChange = (index: number) => {
        if (currentImage === index) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImage(index);
            setIsTransitioning(false);
        }, 100);
    };

    return (
        <div className="relative bg-white p-4 rounded-xl shadow-sm">
            {/* Hình ảnh chính */}
            <div
                className={`aspect-square relative overflow-hidden rounded-lg transition-opacity duration-300 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                }`}
            >
                <Image
                    src={images[currentImage]}
                    alt={`Product image ${currentImage + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={currentImage === 0}
                />
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
