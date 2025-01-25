"use client";
import React from "react";
import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Banner } from "@/types/Banner";

function SlideShow({ images }: { images: Banner[] }) {
    const carouselRef = React.useRef<CarouselRef>(null);

    const next = () => {
        carouselRef.current?.next();
    };

    const previous = () => {
        carouselRef.current?.prev();
    };

    return (
        <div className="slideShowContainer relative w-full h-[500px]">
            <Carousel
                autoplay={true}
                ref={carouselRef}
                dots={true}
                effect="fade"
                autoplaySpeed={5000}
                pauseOnHover={false}
                className="h-full"
            >
                {images.map((image, index) => (
                    <div key={index} className="h-full w-full">
                        <Image
                            src={image.bannerUrl}
                            alt={image.bannerName}
                            width={1920}
                            height={1080}
                            priority
                            className="w-full h-[500px] object-cover"
                            sizes="100vw"
                        />
                    </div>
                ))}
            </Carousel>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-10">
                <button className="navButton prevButton" onClick={previous}>
                    <LeftOutlined />
                </button>

                <button className="navButton nextButton" onClick={next}>
                    <RightOutlined />
                </button>
            </div>
        </div>
    );
}

export default SlideShow;
