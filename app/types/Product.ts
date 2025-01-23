export interface Product {
    id: number;
    name: string;
    price: number;
    images: string[];
    description: string;
    specifications?: Record<string, string>;
}

export interface RelatedProduct {
    id: number;
    name: string;
    price: number;
    image: string;
}
