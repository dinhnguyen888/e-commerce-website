import axios from "axios";
import https from "https";
import { CreatePayment, GetPayment } from "@/types/Payment";

const BASE_URL = new URL(process.env.NEXT_PUBLIC_BACKEND_URL).toString();

class PaymentService {
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

    async createPaymentUrl(payment: CreatePayment): Promise<string> {
        try {
            const response = await this.api.get<string>(
                "/Vnpay/CreatePaymentUrl",
                {
                    params: payment,
                }
            );
            return response.data;
        } catch (error) {
            console.error("Create payment URL error:", error);
            throw error;
        }
    }

    async getPaymentsByAccountId(accountId: string): Promise<GetPayment[]> {
        try {
            const response = await this.api.get<GetPayment[]>(
                `/Payment/account/${accountId}`
            );
            return response.data;
        } catch (error) {
            console.error("Get payments by account ID error:", error);
            throw error;
        }
    }
}

const paymentServiceInstance = new PaymentService();
export default paymentServiceInstance;
