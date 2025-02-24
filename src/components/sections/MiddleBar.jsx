import Navbar from "../common/Navbar";
import { useAuth } from "../../contexts/AuthContext";
import { useMenu } from "../../contexts/MenuContext";

function MiddleBar() {
    const { isLoggedIn } = useAuth();
    const { toggleMenu } = useMenu();

    const handleOpenMenu = () => {
        toggleMenu();
    };

    return (
        <div className="sticky top-0 left-0 w-full z-50">
            <Navbar
                links={[
                    { href: "/", text: "Trang chủ" },
                    { href: "/shop", text: "Phần mềm" },
                    { href: "/shop", text: "Web App" },
                    { href: "/about", text: "Tool & Data" },
                    { href: "/gioi-thieu", text: "Giới thiệu" },
                    {
                        href: isLoggedIn ? null : "/dang-nhap",
                        text: isLoggedIn ? "Profile🧑‍💻" : "Đăng nhập🔑",
                        onClick: isLoggedIn ? handleOpenMenu : null,
                    },
                ]}
            />
        </div>
    );
}

export default MiddleBar;
