import axios from "axios";
import https from "https";
import { PaginationProduct, Product, ProductDetail } from "@/types/Product";

const BASE_URL = new URL(
    "Products",
    process.env.NEXT_PUBLIC_BACKEND_URL
).toString();
// const BASE_URL = "https://localhost:7202/api/Products";
class ProductService {
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

    async getProductById(id: string): Promise<Product> {
        const response = await this.api.get(`/${id}`);
        return response.data;
    }

    async getRelatedProduct(): Promise<Product[]> {
        const response = await this.api.get(`/related`);
        return response.data;
    }

    async getProductDetailById(id: string): Promise<ProductDetail> {
        const response = await this.api.get(`/detail/${id}`);
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

    async searchProducts(keyword: string): Promise<Product[]> {
        const response = await this.api.get(
            `/search?keyword=${encodeURIComponent(keyword)}`
        );
        return response.data;
    }

    async getProductsByTag(tag: string): Promise<PaginationProduct[]> {
        const response = await this.api.get(
            `/tag?tag=${encodeURIComponent(tag)}`
        );
        return response.data;
    }
}

const productServiceInstance = new ProductService();
export default productServiceInstance;
