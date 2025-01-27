import axios from "axios";
import https from "https";
import { Banner } from "@/types/Banner";

const BASE_URL = new URL(
    "Banner",
    process.env.NEXT_PUBLIC_BACKEND_URL
).toString();

class BannerService {
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

    // Lấy tất cả danh mục
    async getAllBanner(): Promise<Banner[]> {
        const response = await this.api.get("/");
        return response.data;
    }

    // Lấy danh mục theo ID
    async getBannerById(id: string): Promise<Banner> {
        const response = await this.api.get(`/${id}`);
        return response.data;
    }

    // Tạo mới danh mục
    async createBanner(banner: Banner): Promise<Banner> {
        const response = await this.api.post("/", banner);
        return response.data;
    }

    // Cập nhật danh mục
    async updateBanner(id: string, banner: Partial<Banner>): Promise<Banner> {
        const response = await this.api.put(`/${id}`, banner);
        return response.data;
    }

    // Xóa danh mục
    async deleteBanner(id: string): Promise<void> {
        await this.api.delete(`/${id}`);
    }
}

const BannerServiceInstance = new BannerService();
export default BannerServiceInstance;
