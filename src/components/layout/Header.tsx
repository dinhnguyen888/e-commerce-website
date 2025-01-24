"use client";
import React from "react";
import TopNavbar from "../common/TopNavbar";
import BottomNavbar from "../common/BottomNavbar";
import { categoryService } from "@/services/categoryService";

function Header() {
    const categories = categoryService.getCategories();

    return (
        <>
            <TopNavbar />
            <BottomNavbar categories={categories} />
        </>
    );
}

export default Header;
