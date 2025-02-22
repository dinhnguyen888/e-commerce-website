import Navbar from "../common/Navbar";

function MiddleBar() {
    return (
        <div>
            <Navbar
                links={[
                    { href: "/", text: "Trang chủ" },
                    { href: "/shop", text: "Phần mềm" },
                    { href: "/shop", text: "Web App" },
                    { href: "/about", text: "Tool & Data" },
                    { href: "/gioi-thieu", text: "Giới thiệu" },
                    { href: "/dang-nhap", text: "Đăng nhập🔑" },
                ]}
            />
        </div>
    );
}

export default MiddleBar;
