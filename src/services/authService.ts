import axios from "axios";
import https from "https";
import { Login, Register } from "@/types/Auth";
import useAuthStore from "@/stores/useAuthStore"; // Import the auth store
import { signIn } from "next-auth/react";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth`;
// const BASE_URL = "https://localhost:7202/api/Auth";

class AuthService {
    private api = axios.create({
        baseURL: BASE_URL,
        timeout: 7000,
        headers: {
            "Content-Type": "application/json",
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    });

    async login(fromQuery: {
        email: string;
        password: string;
    }): Promise<Login> {
        try {
            const response = await this.api.post("/login", null, {
                params: fromQuery,
            });
            return response.data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }
    async loginWithGithub() {
        try {
            signIn("github");
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }
    async loginWithFacebook() {
        try {
            signIn("facebook");
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }
    async callback() {
        try {
            const response = await this.api.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}OAuth/callback`
            );

            if (response.data) {
                const { accessToken, refreshToken } = response.data;
                const setTokens = useAuthStore.getState().setTokens;
                setTokens(accessToken, refreshToken); // Set tokens in the store

                window.location.href = "/";
            }
            return response.data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }

    async register(
        email: string,
        password: string,
        name: string
    ): Promise<Register> {
        try {
            const response = await this.api.post("/register", {
                email,
                name,
                password,
                roleId: 2,
            });
            return response.data;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    }

    async refreshToken(refreshToken: string): Promise<string> {
        try {
            const response = await this.api.post("/refresh-token", null, {
                params: { refreshToken },
            });
            return response.data.accessToken;
        } catch (error) {
            console.error("Refresh token error:", error);
            throw error;
        }
    }

    async logout(refreshToken: string): Promise<void> {
        try {
            await this.api.post("/logout", null, {
                params: { refreshToken },
            });
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    }
}

const AuthServiceInstance = new AuthService();
export default AuthServiceInstance;
