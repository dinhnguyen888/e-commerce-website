import axios from "axios";
import https from "https";
import { Account } from "@/types/Account";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/Account`;
// const BASE_URL = "https://localhost:7202/api/Account";
class AccountService {
    private api = axios.create({
        baseURL: BASE_URL,
        timeout: 7000,
        headers: {
            "Content-Type": "application/json",
        },
        // Bỏ qua kiểm tra SSL trong môi trường phát triển
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    });

    // Lấy tất cả tài khoản
    async getAllAccounts(): Promise<Account[]> {
        const response = await this.api.get("/");
        return response.data;
    }

    // Lấy thông tin tài khoản theo token
    async getAccountByToken(token: string): Promise<Account> {
        const response = await this.api.get(`/profiles?token=${token}`);
        return response.data;
    }

    // Tạo tài khoản mới
    async createAccount(account: Account): Promise<Account> {
        const response = await this.api.post("/", account);
        return response.data;
    }

    // Cập nhật tài khoản
    async updateAccount(
        id: string,
        account: Partial<Account>
    ): Promise<Account> {
        const response = await this.api.put(`/${id}`, account);
        return response.data;
    }

    // Xóa tài khoản
    async deleteAccount(id: string): Promise<void> {
        await this.api.delete(`/${id}`);
    }
}

const AccountServiceInstance = new AccountService();
export default AccountServiceInstance;
