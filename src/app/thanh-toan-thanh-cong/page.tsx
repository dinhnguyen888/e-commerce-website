"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ThanhToanThanhCong: React.FC = () => {
    const router = useRouter();

    const handleNavigateHome = () => {
        router.push("/");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Thanh toán thành công!</h1>
            <p>Cảm ơn bạn đã mua hàng.</p>
            <button
                onClick={handleNavigateHome}
                style={{ padding: "10px 20px", fontSize: "16px" }}
            >
                Về trang chủ
            </button>
        </div>
    );
};

export default ThanhToanThanhCong;
