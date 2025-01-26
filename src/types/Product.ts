// Product Interface
export interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    tag: string;
    imageUrl: string;
    createdAt: string;
    description: string;
}

// RelatedProduct Interface
export interface RelatedProduct {
    id: string;
    name: string;
    price: number;
    image: string;
}

// PaginationProduct Interface
export interface PaginationProduct {
    currentPage: number;
    pageSize: number;
    totalProducts: number;
    totalPages: number;
    products: Product[];
}

// ProductDetail Interface
export interface ProductDetail {
    id: string;
    title: string;
    price: number;
    category: string;
    specification: string;
    tag: string;
    imageUrls: string[];
    createdAt: string;
    descriptionDetail: string; // Thêm chi tiết mô tả mới từ backend
}
export interface SearchResult {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
}
