import BaseLayout from "../components/layout/BaseLayout";
import CheckoutContent from "../components/contents/CheckoutContent";

const mockUser = {
    name: "Nguyen Van A",
    email: "nguyenvana@example.com",
    address: "123 Le Loi, District 1, Ho Chi Minh City",
};

const mockProduct = {
    name: "Hệ thống cảnh báo mất cân bằng tải trên xe ô tô",
    price: 100000,
    quantity: 1,
};

const CheckoutPage = () => {
    return (
        <BaseLayout>
            <CheckoutContent user={mockUser} product={mockProduct} />
        </BaseLayout>
    );
};

export default CheckoutPage;
