import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import AuthService from "@/services/authService";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    userId: string | null;

    setTokens: (accessToken: string, refreshToken: string) => void;
    clearTokens: () => void;
    getAccessToken: () => string | null;
    getUserId: () => string | null;
    refreshAccessToken: () => Promise<void>;
    logout: () => Promise<void>;
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

            // this feature is not implemented in the frontend ui yet
            // but it's fine to have it
            refreshAccessToken: async () => {
                const { refreshToken, setTokens } = get();
                if (refreshToken) {
                    try {
                        const newAccessToken = await AuthService.refreshToken(
                            refreshToken
                        );
                        setTokens(newAccessToken, refreshToken);
                    } catch (error) {
                        console.error("Error refreshing access token:", error);
                    }
                }
            },

            // this feature is not implemented in the frontend ui yet
            // but it's fine to have it
            logout: async () => {
                const { refreshToken, clearTokens } = get();
                if (refreshToken) {
                    try {
                        await AuthService.logout(refreshToken);
                        clearTokens();
                    } catch (error) {
                        console.error("Error logging out:", error);
                    }
                }
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
