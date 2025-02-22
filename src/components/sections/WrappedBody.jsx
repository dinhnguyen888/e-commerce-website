import PropTypes from "prop-types";

import ArticlePage from "../../pages/ArticlePage";
import NewsPage from "../../pages/NewsPage";
import ProductContent from "../contents/ProductContent";

function WrappedBody({ caseKey, caseProp }) {
    let content;
    const caseItem = caseProp.find((item) => item.key === caseKey);

    if (caseItem) {
        switch (caseItem.key) {
            case "ProductPage":
                content = <ProductContent />;
                break;
            case "ArticlePage":
                content = <ArticlePage />;
                break;
            case "NewsPage":
                content = <NewsPage />;
                break;
            default:
                content = <div>không tìm thấy case</div>;
                break;
        }
    }

    return <div>{content}</div>;
}

WrappedBody.propTypes = {
    caseKey: PropTypes.string.isRequired,
    caseProp: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default WrappedBody;
