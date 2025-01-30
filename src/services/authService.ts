import axios from "axios";
import https from "https";
import { Login, Register } from "@/types/Auth";
import useAuthStore from "@/stores/useAuthStore"; // Import the auth store

const BASE_URL = new URL(
    "Auth",
    process.env.NEXT_PUBLIC_BACKEND_URL
).toString();
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
            window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}OAuth/login`;
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
                roleId: 1,
            });
            return response.data;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    }
}

const AuthServiceInstance = new AuthService();
export default AuthServiceInstance;
