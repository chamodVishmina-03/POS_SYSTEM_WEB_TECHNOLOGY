
import {
    addCategory,
    updateCategory,
    deleteCategory,
    getCategorydata,
    getCategoryDataByIndex,
    getCategoryDataById
} from "../model/categoryModel.js";

// ========================= Generate Category ID =========================
const generateCategoryId = () => {
    const categories = getCategorydata();
    if (categories.length === 0) return "CAT001";
    const lastId = categories[categories.length - 1].id;
    const num = parseInt(lastId.replace("CAT", "")) + 1;
    return "CAT" + String(num).padStart(3, "0");
};


















