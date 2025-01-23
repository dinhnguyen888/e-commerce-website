import { Card } from "antd";
import { RelatedProduct } from "../../types/Product";
import Image from "next/image";
interface RelatedProductsProps {
    products: RelatedProduct[];
    onProductClick?: (productId: number) => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
    products,
    onProductClick,
}) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        hoverable
                        onClick={() => onProductClick?.(product.id)}
                        cover={
                            <div className="relative h-40">
                                <Image
                                    alt={product.name}
                                    src={product.image}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 33vw, 20vw"
                                />
                            </div>
                        }
                        className="transition-all duration-300 hover:shadow-lg"
                    >
                        <Card.Meta
                            title={
                                <span className="text-base">
                                    {product.name}
                                </span>
                            }
                            description={
                                <span className="text-red-500 font-medium">
                                    ${product.price.toLocaleString()}
                                </span>
                            }
                        />
                    </Card>
                ))}
            </div>
        </div>
    );
};
