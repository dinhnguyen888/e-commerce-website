import axios from "axios";
import { PaginationProduct, Product } from "@/types/Product";

const BASE_URL = "https://localhost:7202/api/Products";

class ProductService {
    private api = axios.create({
        baseURL: BASE_URL,
        timeout: 5000,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Lấy tất cả sản phẩm với phân trang
    async getAllProducts(
        page: number = 1,
        pageSize: number = 12,
        ssr: boolean = false
    ): Promise<PaginationProduct> {
        const response = await this.api.get(
            `?page=${page}&pageSize=${pageSize}`,
            {
                headers: ssr
                    ? {
                          // Tắt cache nếu dùng SSR
                          "Cache-Control": "no-store",
                      }
                    : {},
            }
        );
        return response.data;
    }

    // Các phương thức khác giữ nguyên
    async getProductById(id: string): Promise<Product> {
        const response = await this.api.get(`/${id}`);
        return response.data;
    }

    async createProduct(product: Product): Promise<Product> {
        const response = await this.api.post("/", product);
        return response.data;
    }

    async updateProduct(id: string, product: Product): Promise<Product> {
        const response = await this.api.put(`/${id}`, product);
        return response.data;
    }

    async deleteProduct(id: string): Promise<void> {
        await this.api.delete(`/${id}`);
    }
}

const productServiceInstance = new ProductService();
export default productServiceInstance;
