"use client";

import React from "react";
import { Modal, Button, List, Typography, Divider } from "antd";

const { Text, Title } = Typography;

interface PurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose }) => {
    // Danh sách tài khoản ngân hàng
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
        <Modal
            title="Chọn phương thức chuyển khoản"
            open={isOpen}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
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
    );
};

export default PurchaseModal;
