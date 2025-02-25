import { Table, Tooltip, Image, Space } from "antd";
import { FaDollarSign, FaTrashAlt } from "react-icons/fa";

const sampleData = [
    {
        key: "1",
        name: "Product 1dcgfdgfdg gdf kjlghfd kjhfgbkfdjlgbn khglfjhglkjh kdjgf dkdiulsjgfh dkjblds sklfk ",
        price: "100000",
        imageUrl: "https://placehold.co/600x400",
    },
    {
        key: "2",
        name: "Product 2",
        price: "200",
        imageUrl: "https://placehold.co/600x400",
    },
];

const Cart = () => {
    const handleBuyNow = (record) => {
        console.log("Buy Now clicked for:", record);
    };

    const handleRemoveFromCart = (record) => {
        console.log("Remove from Cart clicked for:", record);
    };

    const columns = [
        {
            title: "",
            dataIndex: "imageUrl",
            key: "imageUrl",
            width: 100,
            render: (text) => (
                <Image
                    src={text}
                    alt="Product"
                    width={60}
                    height={60}
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                    preview={false}
                />
            ),
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            width: 200,
            render: (text) => (
                <Tooltip title={text}>
                    <span className="truncate block w-48">{text}</span>
                </Tooltip>
            ),
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            width: 100,
            render: (text) => (
                <span className="text-green-600 font-semibold">
                    {parseInt(text).toLocaleString()}₫
                </span>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Mua">
                        <FaDollarSign
                            className="cursor-pointer text-blue-500 text-lg"
                            onClick={() => handleBuyNow(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <FaTrashAlt
                            className="cursor-pointer text-red-500 text-lg"
                            onClick={() => handleRemoveFromCart(record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={sampleData}
            pagination={false}
            bordered
            scroll={{ x: 600 }}
        />
    );
};

export default Cart;
