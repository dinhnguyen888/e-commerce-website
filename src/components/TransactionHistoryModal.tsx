import React, { useEffect, useState } from "react";
import { Modal, Table, Spin, Alert } from "antd";
import { GetPayment } from "@/types/Payment";
import paymentServiceInstance from "@/services/paymentService";

interface TransactionHistoryModalProps {
    visible: boolean;
    onClose: () => void;
    accountId: string;
}

const TransactionHistoryModal: React.FC<TransactionHistoryModalProps> = ({
    visible,
    onClose,
    accountId,
}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [transactions, setTransactions] = useState<GetPayment[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            setError(null);
            try {
                const data =
                    await paymentServiceInstance.getPaymentsByAccountId(
                        accountId
                    );
                setTransactions(data);
            } catch (error) {
                console.error("Fetch transactions error:", error);
                setError(
                    "Không thể lấy thông tin giao dịch. Vui lòng thử lại sau."
                );
            } finally {
                setLoading(false);
            }
        };

        if (visible) {
            fetchTransactions();
        }
    }, [visible, accountId]);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "productPay",
            key: "productPay",
        },
        {
            title: "Giá",
            dataIndex: "productPrice",
            key: "productPrice",
        },
        {
            title: "Ngày thanh toán",
            dataIndex: "paymentDate",
            key: "paymentDate",
        },
        {
            title: "Trạng thái",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            render: (status: boolean) => (status ? "Thành công" : "Thất bại"),
        },
    ];

    return (
        <Modal
            title="Lịch sử giao dịch"
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            {loading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                    <Spin size="large" />
                </div>
            ) : error ? (
                <Alert message={error} type="error" />
            ) : (
                <Table
                    dataSource={transactions}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                />
            )}
        </Modal>
    );
};

export default TransactionHistoryModal;
