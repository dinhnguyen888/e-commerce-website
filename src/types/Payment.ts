export interface CreatePayment {
    productPay: string;
    productId: string;
    userId: string;
    paymentGateway: string;
    productPrice: number;
}

export interface GetPayment {
    id: number;
    productPay: string;
    productId: string;
    userId: string;
    paymentGateway: string;
    productPrice: number;
    paymentDate: string;
    paymentStatus: boolean;
}
