import { useState } from "react";
import PropTypes from "prop-types";

const Carousel = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [fadeClass, setFadeClass] = useState("opacity-100");

    const handleImageChange = (image) => {
        setFadeClass("opacity-0");
        setTimeout(() => {
            setSelectedImage(image);
            setFadeClass("opacity-100");
        }, 300);
    };

    return (
        <div className="flex flex-col items-start justify-center space-y-4">
            <div className="mb-4 relative w-full h-64">
                <img
                    className={`h-full w-full object-fill rounded-sm transition-opacity duration-500 ease-in-out ${fadeClass}`}
                    src={selectedImage}
                    alt="Selected"
                />
            </div>
            <div className="flex space-x-2">
                {images.map((image, index) => (
                    <img
                        key={index}
                        className={`w-16 h-16 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform ${
                            selectedImage === image
                                ? "border-2 border-blue-500 scale-110"
                                : ""
                        }`}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        onClick={() => handleImageChange(image)}
                    />
                ))}
            </div>
        </div>
    );
};

Carousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carousel;
