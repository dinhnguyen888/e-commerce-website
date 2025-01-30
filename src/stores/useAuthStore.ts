import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    userId: string | null;

    setTokens: (accessToken: string, refreshToken: string) => void;
    clearTokens: () => void;
    getAccessToken: () => string | null;
    getUserId: () => string | null;
}

interface DecodedToken {
    userId: string;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            refreshToken: null,
            userId: null,

            setTokens: (accessToken, refreshToken) => {
                try {
                    const decoded: DecodedToken = jwtDecode(accessToken);
                    const userId = decoded.userId;

                    set({
                        accessToken,
                        refreshToken,
                        userId,
                    });
                } catch (error) {
                    console.error("Lỗi khi decode token:", error);
                }
            },

            clearTokens: () =>
                set({
                    accessToken: null,
                    refreshToken: null,
                    userId: null,
                }),

            getAccessToken: () => {
                const { accessToken } = get();
                return accessToken;
            },

            getUserId: () => {
                const { userId } = get();
                return userId;
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                userId: state.userId,
            }),
        }
    )
);

export default useAuthStore;
