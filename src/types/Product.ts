// Product Interface
export interface Product {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    tag: string | null;
    category: string;
    createdAt: string;
    description?: string;
}

// RelatedProduct Interface
export interface RelatedProduct {
    id: number;
    name: string;
    price: number;
    image: string;
}

// PaginationProduct Interface
export interface PaginationProduct {
    currentPage: number; // Trang hiện tại
    pageSize: number; // Số sản phẩm trên mỗi trang
    totalProducts: number; // Tổng số sản phẩm
    totalPages: number; // Tổng số trang
    products: Product[]; // Danh sách sản phẩm cho trang hiện tại
}
