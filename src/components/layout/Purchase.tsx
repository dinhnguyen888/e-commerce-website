"use client";
import React, { useState } from "react";
import { Modal, Button, List, Typography, Divider } from "antd";

const { Text, Title } = Typography;

function PurchaseModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Sample bank transfer options
    const bankOptions = [
        {
            bankName: "Ngân hàng Vietcombank",
            accountNumber: "1234 5678 9012",
            accountHolder: "Nguyen Van A",
        },
        {
            bankName: "Ngân hàng Techcombank",
            accountNumber: "2345 6789 0123",
            accountHolder: "Tran Thi B",
        },
        {
            bankName: "Ngân hàng BIDV",
            accountNumber: "3456 7890 1234",
            accountHolder: "Le Van C",
        },
    ];

    return (
        <div>
            {/* Button to trigger modal */}
            <Button type="primary" onClick={showModal}>
                Mua hàng
            </Button>

            {/* Modal */}
            <Modal
                title="Chọn phương thức chuyển khoản"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Đóng
                    </Button>,
                ]}
            >
                <Divider />
                <List
                    itemLayout="vertical"
                    dataSource={bankOptions}
                    renderItem={(item) => (
                        <List.Item>
                            <Title level={5}>{item.bankName}</Title>
                            <Text>Mã tài khoản: {item.accountNumber}</Text>
                            <br />
                            <Text>Chủ tài khoản: {item.accountHolder}</Text>
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    );
}

export default PurchaseModal;
