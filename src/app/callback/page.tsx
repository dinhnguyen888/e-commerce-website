"use client";

import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Callback() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const accessToken = urlParams.get("accessToken");
            const refreshToken = urlParams.get("refreshToken");

            if (accessToken && refreshToken) {
                const setTokens = useAuthStore.getState().setTokens;
                setTokens(accessToken, refreshToken);
                router.push("/");
            }
        }
    }, [router]);

    return <div>Callback...</div>;
}

export default Callback;
