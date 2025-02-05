import axios from "axios";
import https from "https";
import { Category } from "@/types/Category";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/Category`;
// const BASE_URL = "https://localhost:7202/api/Category";
class CategoryService {
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
    async getAllCategories(): Promise<Category[]> {
        const response = await this.api.get("/");
        return response.data;
    }

    // Lấy danh mục theo ID
    async getCategoryById(id: string): Promise<Category> {
        const response = await this.api.get(`/${id}`);
        return response.data;
    }

    // Tạo mới danh mục
    async createCategory(category: Category): Promise<Category> {
        const response = await this.api.post("/", category);
        return response.data;
    }

    // Cập nhật danh mục
    async updateCategory(
        id: string,
        category: Partial<Category>
    ): Promise<Category> {
        const response = await this.api.put(`/${id}`, category);
        return response.data;
    }

    // Xóa danh mục
    async deleteCategory(id: string): Promise<void> {
        await this.api.delete(`/${id}`);
    }
}

const categoryServiceInstance = new CategoryService();
export default categoryServiceInstance;
