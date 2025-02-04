"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";

const CallbackPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const setTokens = useAuthStore((state) => state.setTokens);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const accessToken = urlParams.get("accessToken");
            const refreshToken = urlParams.get("refreshToken");

            if (accessToken && refreshToken) {
                setTokens(accessToken, refreshToken);

                router.push("/");
            } else {
                setLoading(false);
            }
        }
    }, [router, setTokens]);

    if (loading) {
        return <p>Đang xử lý...</p>;
    }

    return <p>Lỗi: Không tìm thấy token!</p>;
};

export default CallbackPage;
