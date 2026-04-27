
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




// ========================= On Page Load =========================
$(document).ready(() => {


    resetForm();
    loadCategoryTable();




    // ========================= Add Category =========================
    $("#addCategory").on("click", () => {
        const id   = $("#categoryId_input").val().trim();
        const name = $("#categoryName_input").val().trim();

        if (!name) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please enter a category name.",
            });
            return;
        }

        addCategory(id, name);
        loadCategoryTable();
        resetForm();

        Swal.fire({
            icon: "success",
            title: "Category Added",
            showConfirmButton: false,
            timer: 1500,
        });
    });



    // ========================= Update Category =========================
    $("#updateCategory").on("click", () => {

        const id   = $("#categoryId_input").val().trim();
        const name = $("#categoryName_input").val().trim();


        if (!id || !name) {

            Swal.fire({icon: "warning", title: "Missing Fields", text: "Please select a category and fill all fields.",});
            return;
        }

        const existing = getCategoryDataById(id);
        if (!existing) {
            Swal.fire({ icon: "error", title: "Category not found!" });
            return;
        }

        updateCategory(id, name);
        loadCategoryTable();
        resetForm();

        Swal.fire({icon: "success", title: "Category Updated", showConfirmButton: false, timer: 1500,});
    });




// ========================= Delete Category =========================
    $("#deleteCategory").on("click", () => {
        const id = $("#categoryId_input").val().trim();

        if (!id) {
            Swal.fire({ icon: "warning", title: "Select a category to delete." });
            return;
        }

        const existing = getCategoryDataById(id);
        if (!existing) {
            Swal.fire({ icon: "error", title: "Category not found!" });
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: `Delete category ${id}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCategory(id);
                loadCategoryTable();
                resetForm();

                Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    });


    // ========================= Reset Button =========================
    $("#resetBtnCategory").on("click", () => {
        resetForm();
    });




});