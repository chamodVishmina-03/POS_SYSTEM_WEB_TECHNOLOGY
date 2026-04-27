
import {
    addCategory,
    updateCategory,
    deleteCategory,
    getCategorydata,
    getCategoryDataByIndex,
    getCategoryDataById
} from "../model/categoryModel.js";

// =========================generate id =========================
const generateCategoryId = () => {


    const categories = getCategorydata();

    if (categories.length === 0) return "CAT001";

    const lastId = categories[categories.length - 1].id;
    const num = parseInt(lastId.replace("CAT", "")) + 1;
    return "CAT" + String(num).padStart(3, "0");
};


// =========================Table load =========================
const loadCategoryTable = () => {

    const tbody = $("#category_tbody");
    tbody.empty();


    const categories = getCategorydata();
    categories.forEach((c, index) => {

        const row = `

            <tr data-index="${index}">
                <td>${c.id}</td>
                <td>${c.getName()}</td>
            </tr>`;

        tbody.append(row);


    });
};





// ================== reset forms =========================
const resetForm = () => {


    $("#categoryId_input").val(generateCategoryId());
    $("#categoryName_input").val("");

};