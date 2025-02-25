import { Drawer } from "antd";
import { useState } from "react";
import { useMenu } from "../../contexts/MenuContext";
import useLogout from "../../hooks/useLogout";
import Cart from "../common/Cart";
import Orders from "../common/Orders";
import Profile from "../common/Profile";
import MenuNavbar from "../common/MenuNavbar";

export default function SlidingMenu() {
    const { isMenuOpen, toggleMenu } = useMenu();
    const logout = useLogout();
    const [activeComponent, setActiveComponent] = useState("Cart");

    const handleLogout = () => {
        logout();
        window.location.href = "/";
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case "Cart":
                return <Cart />;
            case "Orders":
                return <Orders />;
            case "Profile":
                return <Profile />;
            default:
                return <Cart />;
        }
    };

    const handleMenuClick = (e) => {
        if (e.key === "logout") {
            handleLogout();
        } else {
            setActiveComponent(e.key);
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50 lg:w-full">
            <Drawer
                title={
                    <span className="text-xl font-semibold font-sans text-white">
                        Hành trang
                    </span>
                }
                placement="right"
                closable={true}
                onClose={toggleMenu}
                open={isMenuOpen}
                bodyStyle={{
                    backgroundColor: "white",
                    color: "black",
                    padding: "0",
                }}
                headerStyle={{
                    backgroundColor: "#111827",
                    borderBottom: "1px solid #374151",
                }}
                width="45vw" // Set the width to 50% of the viewport width
            >
                <MenuNavbar
                    activeComponent={activeComponent}
                    onMenuClick={handleMenuClick}
                />
                <div className="">{renderComponent()}</div>
            </Drawer>
        </div>
    );
}
