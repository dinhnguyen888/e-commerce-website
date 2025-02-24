import { Drawer } from "antd";
// import Button from "antd";
// import { StepForward } from "lucide-react";
import { useMenu } from "../../contexts/MenuContext";
import useLogout from "../../hooks/useLogout";

export default function SlidingMenu() {
    const { isMenuOpen, toggleMenu } = useMenu();
    const logout = useLogout();

    const handleLogout = () => {
        logout();
        window.location.href = "/";
    };

    return (
        <div className="fixed top-1/4 left-0 z-50">
            {/* <Button
                onClick={toggleMenu}
                className="z-50"
                icon={<StepForward />}
            ></Button> */}

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
                <ul>
                    <button onClick={handleLogout}>Log out</button>
                    <li className="mb-2">Item 2</li>
                    <li className="mb-2">Item 3</li>
                </ul>
            </Drawer>
        </div>
    );
}
