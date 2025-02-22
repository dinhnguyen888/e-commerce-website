import PropTypes from "prop-types";
import classNames from "classnames";

function MainTitle({ text, className }) {
    return (
        <p
            className={classNames(
                "text-black lg:text-3xl text-2xl ",
                className
            )}
        >
            {text}
        </p>
    );
}

MainTitle.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default MainTitle;
