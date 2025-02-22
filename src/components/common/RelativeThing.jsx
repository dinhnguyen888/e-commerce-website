import PropTypes from "prop-types";
import { Card, Button } from "antd";

const RelativeThing = ({ items }) => {
    return (
        <div className="overflow-x-auto py-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <div className="flex flex-nowrap justify-start gap-6 px-4">
                {items.map((item, index) => (
                    <Card
                        key={index}
                        hoverable
                        className="w-52 rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow flex-shrink-0"
                        cover={
                            <img
                                alt={item.title}
                                src={item.image}
                                className="h-40 object-cover w-full rounded-t-2xl"
                            />
                        }
                    >
                        <Card.Meta
                            title={
                                <h3 className="text-lg font-semibold text-gray-800 text-center">
                                    {item.title}
                                </h3>
                            }
                        />
                        {item.price && (
                            <p className="mt-2 text-lg font-semibold text-center text-blue-600">
                                {item.price}
                            </p>
                        )}
                        <div className="flex justify-center mt-3">
                            <Button
                                type="link"
                                className="text-blue-500 font-medium hover:text-blue-700"
                            >
                                Xem chi tiết
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

RelativeThing.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.string,
        })
    ).isRequired,
};

export default RelativeThing;
