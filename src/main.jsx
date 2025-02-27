import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <App />
            <Toaster
                toastOptions={{
                    className: "text-sm",
                    style: {
                        borderRadius: "16px",
                    },
                }}
            />
        </AuthProvider>
    </StrictMode>
);
