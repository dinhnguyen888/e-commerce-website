"use client";
import React, { useState } from "react";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

interface NavItem {
    key: string;
    label: string;
    onClick?: () => void;
}

const BottomNavbar: React.FC = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const menuItems: MenuProps["items"] = [
        {
            key: "1",
            label: "New Repository",
            onClick: () => console.log("New Repository clicked"),
        },
        {
            key: "2",
            label: "Import Repository",
            onClick: () => console.log("Import Repository clicked"),
        },
        {
            key: "3",
            label: "New Gist",
            onClick: () => console.log("New Gist clicked"),
        },
    ];

    const navItems: NavItem[] = [
        { key: "home", label: "Home" },
        { key: "discover", label: "Discover" },
        { key: "pullRequests", label: "Pull Requests" },
        { key: "issues", label: "Issues" },
    ];

    const renderNavButton = ({ key, label, onClick }: NavItem) => (
        <button
            key={key}
            onClick={onClick}
            className="inline-flex flex-col items-center justify-center px-3 hover:bg-blue-50 dark:hover:bg-blue-900/30"
        >
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                {label}
            </span>
        </button>
    );

    return (
        <nav className="sticky top-0 left-0 right-0 bg-white border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600 z-50">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex items-center justify-around h-12">
                    {/* Regular nav buttons */}
                    {navItems.slice(0, 2).map(renderNavButton)}

                    {/* Create Dropdown */}
                    <Dropdown
                        menu={{ items: menuItems }}
                        trigger={["click"]}
                        placement="bottom"
                        open={isCreateOpen}
                        onOpenChange={setIsCreateOpen}
                    >
                        <button className="inline-flex flex-col items-center justify-center px-3 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                            <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                                Create
                                {isCreateOpen ? (
                                    <FiChevronUp className="w-4 h-4" />
                                ) : (
                                    <FiChevronDown className="w-4 h-4" />
                                )}
                            </span>
                        </button>
                    </Dropdown>

                    {/* Remaining nav buttons */}
                    {navItems.slice(2).map(renderNavButton)}
                </div>
            </div>
        </nav>
    );
};

export default BottomNavbar;
