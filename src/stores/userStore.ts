import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;

    setTokens: (accessToken: string, refreshToken: string) => void;
    clearTokens: () => void;
    getToken: () => string | null;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            refreshToken: null,

            setTokens: (accessToken, refreshToken) => {
                set({
                    accessToken,
                    refreshToken,
                });
            },

            clearTokens: () =>
                set({
                    accessToken: null,
                    refreshToken: null,
                }),

            getToken: () => {
                const { accessToken } = get();
                return accessToken;
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
            }),
        }
    )
);

export default useAuthStore;
