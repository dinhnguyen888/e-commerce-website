// CategoryService.ts
import { Category } from "@/types/Category";
const mockCategories: Category[] = [
    {
        id: "678fc74be87e26241b3d966d",
        categoryName: "Asp.net + react",
        blockName: "Phân loại",
    },
];

class CategoryService {
    private categories: Category[] = [...mockCategories];

    getCategories(): Category[] {
        return this.categories;
    }

    addCategory(newCategory: Category): void {
        this.categories.push(newCategory);
    }

    updateCategory(id: string, updatedCategory: Partial<Category>): boolean {
        const index = this.categories.findIndex(
            (category) => category.id === id
        );
        if (index !== -1) {
            this.categories[index] = {
                ...this.categories[index],
                ...updatedCategory,
            };
            return true;
        }
        return false;
    }

    deleteCategory(id: string): boolean {
        const initialLength = this.categories.length;
        this.categories = this.categories.filter(
            (category) => category.id !== id
        );
        return this.categories.length < initialLength;
    }
}

export const categoryService = new CategoryService();
