import { Table } from "antd";
import { usePayment } from "../../contexts/PaymentContext";

const PaymentBill = () => {
    const { paymentHistory } = usePayment();

    const columns = [
        {
            title: "Product",
            dataIndex: "productPay",
            key: "productPay",
        },
        {
            title: "Gateway",
            dataIndex: "paymentGateway",
            key: "paymentGateway",
        },
        {
            title: "Price",
            dataIndex: "productPrice",
            key: "productPrice",
            render: (price) => `${price.toLocaleString()}₫`,
        },
        {
            title: "Date",
            dataIndex: "paymentDate",
            key: "paymentDate",
            render: (date) => new Date(date).toLocaleDateString(),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={paymentHistory}
            rowKey={(record) => record.paymentDate}
            pagination={false}
            bordered
            scroll={{ x: 600 }}
        />
    );
};

export default PaymentBill;
