import PropTypes from "prop-types";
import HorizontalCard from "../common/HorizontalCard";

const NewsContent = ({ news, onViewDetails }) => {
    return (
        <div className="container mx-auto px-16 py-8">
            <p className="text-3xl font-bold mb-8">Tin tức công nghệ</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {news.map((item) => (
                    <HorizontalCard
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        imageUrl={item.imageUrl}
                        tag={item.type.replace("/", "")}
                        postedDate={new Date().toISOString()}
                        onViewDetails={() => onViewDetails(item.linkDetail)}
                    />
                ))}
            </div>
        </div>
    );
};

NewsContent.propTypes = {
    news: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            linkDetail: PropTypes.string.isRequired,
        })
    ).isRequired,
    onViewDetails: PropTypes.func.isRequired,
};

export default NewsContent;
