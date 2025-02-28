import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import IntroductionPage from "./pages/IntroductionPage";
import { useGoogleOneTapLogin } from "./hooks/useGoogleOneTapLogin";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { MenuProvider } from "./contexts/MenuContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import SearchPage from "./pages/SearchPage";

function App() {
    useGoogleOneTapLogin();

    return (
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <MenuProvider>
                        <PaymentProvider>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route
                                    path="/dang-nhap"
                                    element={<LoginPage />}
                                />
                                <Route
                                    path="/register"
                                    element={<RegisterPage />}
                                />
                                <Route
                                    path="/san-pham"
                                    element={<ProductPage />}
                                />
                                <Route
                                    path="/gioi-thieu"
                                    element={<IntroductionPage />}
                                />
                                <Route
                                    path="/san-pham/:productId"
                                    element={<ProductDetailPage />}
                                />
                                <Route
                                    path="/checkout/:productId"
                                    element={<CheckoutPage />}
                                />
                                <Route
                                    path="/search"
                                    element={<SearchPage />}
                                />
                            </Routes>
                        </PaymentProvider>
                    </MenuProvider>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
