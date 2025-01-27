import axios from "axios";
import https from "https";
import { Login, Register } from "@/types/Auth";

const BASE_URL = new URL(
    "Auth",
    process.env.NEXT_PUBLIC_BACKEND_URL
).toString();

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
