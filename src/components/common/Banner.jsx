import PropTypes from "prop-types";
import { Carousel } from "antd";

const Banner = ({ images, overlayTexts }) => {
    return (
        <Carousel autoplay>
            {images.map((image, index) => (
                <div
                    key={index}
                    className="relative rounded-md overflow-hidden"
                >
                    <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto object-cover"
                    />

                    {/* understand html data */}
                    {overlayTexts && overlayTexts[index] && (
                        <div className="absolute inset-y-0 left-0 w-1/3 my-11 mx-4 ">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: overlayTexts[index],
                                }}
                            />
                        </div>
                    )}
                </div>
            ))}
        </Carousel>
    );
};

Banner.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
        })
    ).isRequired,
    overlayTexts: PropTypes.arrayOf(PropTypes.string),
};

export default Banner;
