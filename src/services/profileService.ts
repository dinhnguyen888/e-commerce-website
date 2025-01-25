import axios from "axios";
import https from "https";
import { UserProfile } from "@/types/UserProfile";

const BASE_URL = "https://localhost:7202/api/UserProfile";

class UserProfileService {
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

    // Lấy tất cả danh mục
    async getUserProfile(): Promise<UserProfile[]> {
        const response = await this.api.get("/");
        return response.data;
    }

    // Tạo mới danh mục
    async createUserProfile(UserProfile: UserProfile): Promise<UserProfile> {
        const response = await this.api.post("/", UserProfile);
        return response.data;
    }

    // Cập nhật danh mục
    async updateUserProfile(
        id: string,
        UserProfile: Partial<UserProfile>
    ): Promise<UserProfile> {
        const response = await this.api.put(`/${id}`, UserProfile);
        return response.data;
    }

    // Xóa danh mục
    async deleteUserProfile(id: string): Promise<void> {
        await this.api.delete(`/${id}`);
    }
}

const UserProfileServiceInstance = new UserProfileService();
export default UserProfileServiceInstance;
