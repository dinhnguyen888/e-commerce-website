"use client";
import React, { useEffect, useState } from "react";
import TopNavbar from "../common/TopNavbar";
import BottomNavbar from "../common/BottomNavbar";
import categoryService from "@/services/categoryService";
import { Category } from "@/types/Category";

function Header() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await categoryService.getAllCategories();
            setCategories(categories);
        };

        fetchCategories();
    }, []);

    return (
        <>
            <TopNavbar />
            <BottomNavbar categories={categories} />
        </>
    );
}

export default Header;
