import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import IntroductionPage from "./pages/IntroductionPage";
import { useGoogleOneTapLogin } from "./hooks/useGoogleOneTapLogin";

function App() {
    useGoogleOneTapLogin();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dang-nhap" element={<LoginPage />} />
                <Route path="/dang-ky" element={<RegisterPage />} />
                <Route path="/san-pham" element={<ProductPage />} />
                <Route path="/gioi-thieu" element={<IntroductionPage />} />
                <Route
                    path="/san-pham/:productId"
                    element={<ProductDetailPage />}
                />
                <Route path="/checkout/:id" element={<CheckoutPage />} />
            </Routes>
        </Router>
    );
}

export default App;
