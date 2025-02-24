import PropTypes from "prop-types";
import { Tag } from "antd";

function Filter({ filters }) {
    return (
        <div className="p-2">
            <p className="text-lg font-sans font-semibold text-gray-600 py-4">
                Lọc theo:
            </p>

            <div className="flex flex-wrap gap-4">
                {filters.map((filter, index) => (
                    <Tag
                        key={index}
                        color="blue"
                        className="flex items-center justify-center "
                    >
                        <a
                            href={filter.link}
                            className="text-white w-full text-center"
                        >
                            {filter.label}
                        </a>
                    </Tag>
                ))}
            </div>
        </div>
    );
}

Filter.propTypes = {
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Filter;
