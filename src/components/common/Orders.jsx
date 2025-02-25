import { Table, Image, Tooltip, Space, Button } from "antd";
import { FaEye, FaEnvelope } from "react-icons/fa";

const sampleData = [
    {
        key: "1",
        orderId: "12345",
        date: "2023-10-01",
        total: "300",
        imageUrl: "https://placehold.co/600x400",
    },
    {
        key: "2",
        orderId: "12346",
        date: "2023-10-02",
        total: "150",
        imageUrl: "https://placehold.co/600x400",
    },
];

const Orders = () => {
    const handleViewDetails = (record) => {
        console.log("View Details clicked for:", record);
    };

    const handleResendEmail = (record) => {
        console.log("Resend Email clicked for:", record);
    };

    const columns = [
        {
            title: "",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (text) => (
                <Image
                    src={text}
                    alt="Order"
                    width={60}
                    height={60}
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                    preview={false}
                />
            ),
            width: 80,
        },
        {
            title: "Order ID",
            dataIndex: "orderId",
            key: "orderId",
            width: 150,
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            width: 120,
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            width: 100,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Xem chi tiết">
                        <Button
                            type="text"
                            icon={
                                <FaEye
                                    className="text-blue-500 text-lg cursor-pointer"
                                    onClick={() => handleViewDetails(record)}
                                />
                            }
                        />
                    </Tooltip>
                    <Tooltip title="Gửi lại Mail">
                        <Button
                            type="text"
                            icon={
                                <FaEnvelope
                                    className="text-green-500 text-lg cursor-pointer"
                                    onClick={() => handleResendEmail(record)}
                                />
                            }
                        />
                    </Tooltip>
                </Space>
            ),
            width: 150,
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

export default Orders;
