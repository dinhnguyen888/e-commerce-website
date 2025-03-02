import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useProduct } from "../../contexts/ProductContext";
import Card from "../common/Card";
import Loading from "../common/Loading";

const RelatedContent = ({ tag }) => {
    const { getProductsByTag } = useProduct();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const products = await getProductsByTag(tag);
                setRelatedProducts(products);
            } catch (error) {
                console.error("Failed to fetch related products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRelatedProducts();
    }, [tag, getProductsByTag]);

    if (loading) return <Loading />;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {relatedProducts.map((product) => (
                <Card
                    key={product.id}
                    title={product.title}
                    description={product.description}
                    imageUrl={product.imageUrl}
                    onBuy={() =>
                        console.log(`Buying product: ${product.title}`)
                    }
                    onAddToCart={() =>
                        console.log(`Adding to cart: ${product.title}`)
                    }
                    onViewDetails={() =>
                        (window.location.href = `/san-pham/${product.id}`)
                    }
                    price={product.price}
                    tag={product.tag}
                    postedDate={product.postedDate}
                />
            ))}
        </div>
    );
};

RelatedContent.propTypes = {
    tag: PropTypes.string.isRequired,
};

export default RelatedContent;
