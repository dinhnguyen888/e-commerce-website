import PropTypes from "prop-types";

function Filter({ filters }) {
    return (
        <div>
            <p className="text-lg font-sans font-semibold  text-gray-600">
                Lọc theo:
            </p>
            {filters.map((filter, index) => (
                <div
                    key={index}
                    className="mb-1  hover:underline font-mono
                "
                >
                    <a href={filter.link} className=" ">
                        {filter.label}
                    </a>
                </div>
            ))}
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
