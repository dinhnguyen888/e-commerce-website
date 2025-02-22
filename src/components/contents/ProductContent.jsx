import { useState } from "react";
import Banner from "../common/Banner";
import Card from "../common/Card";
import { Pagination } from "antd";
import useFetchProducts from "../../hooks/useFetchProducts";

const listProducts = {
    currentPage: 1,
    itemsPerPage: 4,
    products: [
        {
            imageUrl: "https://placehold.co/150",
            title: "Sample Product 1",
            description: "This is a sample product description.",
            price: 100,
            rating: 4.5,
        },
        {
            imageUrl: "https://placehold.co/150",
            title: "Sample Product 2",
            description: "This is another sample product description.",
            price: 200,
            rating: 4.0,
        },
        {
            imageUrl: "https://placehold.co/150",
            title: "Sample Product 3",
            description: "This is yet another sample product description.",
            price: 150,
            rating: 4.2,
        },
        {
            imageUrl: "https://placehold.co/150",
            title: "Sample Product 4",
            description: "This is a different sample product description.",
            price: 250,
            rating: 4.8,
        },
        {
            imageUrl: "https://placehold.co/150",
            title: "Phần mềm giám sát hoạt động bất thường của hệ thống bằng ASP .NET",
            description: "This is a unique sample product description.",
            price: 300,
            rating: 4.7,
        },
        {
            imageUrl: "https://placehold.co/150",
            title: "Sample Product 6",
            description: "This is a special sample product description.",
            price: 350,
            rating: 4.9,
        },
        {
            imageUrl: "https://placehold.co/150",
            title: "Sample Product 7",
            description: "This is an additional sample product description.",
            price: 400,
            rating: 4.6,
        },
        {
            imageUrl: "https://placehold.co/150",
            title: "Sample Product 8",
            description: "This is a further sample product description.",
            price: 450,
            rating: 4.3,
        },
    ],
};

const banners = [
    {
        src: "https://placehold.co/600x200",
        alt: "Sample Banner 1",
    },
    {
        src: "https://placehold.co/600x200",
        alt: "Sample Banner 2",
    },
];

const overlayTexts = ["Banner Title 1", "Banner Title 2"];

function ProductContent() {
    const { itemsPerPage } = listProducts;
    const [currentPage, setCurrentPage] = useState(1);
    const { products, loading, error } = useFetchProducts();

    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log(`Page changed to: ${page}`);
    };

    const handleBuy = (product) => {
        console.log(`Buying product: ${product.title}`);
    };

    const handleAddToCart = (product) => {
        console.log(`Adding product to cart: ${product.title}`);
    };

    const handleViewDetail = (product) => {
        console.log(`Viewing details for product: ${product.title}`);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = listProducts.products.slice(startIndex, endIndex);
    console.log("Current products:", products);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading products: {error.message}</div>;

    return (
        <>
            <div className="container mx-auto p-4 mt-11 lg:px-20">
                <div className="lg:">
                    <Banner images={banners} overlayTexts={overlayTexts} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 px-5 lg:px-0 py-11 my-5 justify-items-center">
                    {currentProducts.map((card, index) => (
                        <Card
                            key={index}
                            imageUrl={card.imageUrl}
                            title={card.title}
                            description={card.description}
                            onBuy={() => handleBuy(card)}
                            onAddToCart={() => handleAddToCart(card)}
                            onViewDetails={() => handleViewDetail(card)}
                            price={card.price}
                            tag={card.tag}
                            rating={card.rating}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-4">
                    <Pagination
                        current={currentPage}
                        pageSize={itemsPerPage}
                        total={products.length}
                        onChange={handlePageChange}
                        showQuickJumper
                    />
                </div>
            </div>
        </>
    );
}

export default ProductContent;
