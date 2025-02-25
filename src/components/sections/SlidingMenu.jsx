import { Drawer, Menu } from "antd";
import { useState } from "react";
import { useMenu } from "../../contexts/MenuContext";
import useLogout from "../../hooks/useLogout";
import Cart from "../common/Cart";
import Orders from "../common/Orders";
import Profile from "../common/Profile";

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
        <div className="fixed top-1/4 left-0 z-50">
            <Drawer
                title="Menu Section"
                placement="right"
                closable={true}
                onClose={toggleMenu}
                visible={isMenuOpen}
                bodyStyle={{
                    backgroundColor: "rgba(31, 41, 55, 1)",
                    color: "white",
                }}
                className="z-40"
            >
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["Cart"]}
                    onClick={handleMenuClick}
                >
                    <Menu.Item key="Cart">Cart</Menu.Item>
                    <Menu.Item key="Orders">Orders</Menu.Item>
                    <Menu.Item key="Profile">Profile</Menu.Item>
                    <Menu.Item key="logout">Log out</Menu.Item>
                </Menu>
                <div>{renderComponent()}</div>
            </Drawer>
        </div>
    );
}
