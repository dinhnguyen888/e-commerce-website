import axios from "axios";
import https from "https";
import { CreatePayment, GetPayment } from "@/types/Payment";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
    ? new URL(process.env.NEXT_PUBLIC_BACKEND_URL).toString()
    : "";

class PaymentService {
    private api = axios.create({
        baseURL: BASE_URL,

        headers: {
            "Content-Type": "application/json",
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    });

    async createPaymentUrl(payment: CreatePayment): Promise<string> {
        try {
            let endpoint = "";
            switch (payment.paymentGateway) {
                case "VNPAY":
                    endpoint = "/Vnpay/CreatePaymentUrl";
                    break;
                case "MOMO":
                    endpoint = "/Momo/create-payment";
                    break;
                default:
                    throw new Error("Unsupported payment gateway");
            }

            const response = await this.api.get<string>(endpoint, {
                params: payment,
            });
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
