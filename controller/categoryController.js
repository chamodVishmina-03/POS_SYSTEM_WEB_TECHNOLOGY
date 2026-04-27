import {addCategory, updateCategory, deleteCategory, getCategorydata, getCategoryDataByIndex, getCategoryDataById} from '../model/categoryModel.js';

// ========================= Generate Category ID =========================
const generateCategoryId = () => {
    const categories = getCategorydata();
    if (categories.length === 0) return "CAT001";
    const lastId = categories[categories.length - 1].id;
    const num = parseInt(lastId.replace("CAT", "")) + 1;
    return "CAT" + String(num).padStart(3, "0");
};

// ========================= Load Category Table =========================
const loadCategoryTbl = () => {
    $('#category_tbody').empty();
    let category_db = getCategorydata();
    category_db.map((item, index) => {
        let new_row = `<tr data-index="${index}">
                            <td>${item.id}</td>
                            <td>${item.getName()}</td>
                       </tr>`;
        $('#category_tbody').append(new_row);
    });
}

// ========================= Clean Category Form =========================
const cleanCategoryForm = () => {
    $('#resetBtnCategory').click();
}

// ========================= Reset Form =========================
$('#resetBtnCategory').on('click', function () {
    $('#categoryId_input').val(generateCategoryId());
    $('#categoryName_input').val('');
});

// ========================= Init =========================
$('#categoryId_input').val(generateCategoryId());
loadCategoryTbl();

// ========================= Click on Category Row =========================
$('#category_tbody').on('click', 'tr', function () {
    let category_obj = getCategoryDataByIndex($(this).index());

    $('#categoryId_input').val(category_obj.id);
    $('#categoryName_input').val(category_obj.getName());

});

// ========================= Add Category (Create) =========================
$('#addCategory').on('click', function () {
    let id   = $('#categoryId_input').val();
    let name = $('#categoryName_input').val();

    if (id === "") {
        Swal.fire({ icon: "error", title: "Invalid Id!" });
    } else if (getCategoryDataById(id)) {
        Swal.fire({ icon: "error", title: "Id already exists!" });
    } else if (name === "") {
        Swal.fire({ icon: "error", title: "Invalid Name!" });
    } else {
        addCategory(id, name);
        cleanCategoryForm();
        Swal.fire({ icon: "success", title: "Category saved successfully!" });
        loadCategoryTbl();
    }
});

// ========================= Update Category =========================
$('#updateCategory').on('click', function () {
    let id   = $('#categoryId_input').val();
    let name = $('#categoryName_input').val();

    (id === "") ? Swal.fire({ icon: "error", title: "Invalid Id!" }) :
        (!(getCategoryDataById(id))) ? Swal.fire({ icon: "error", title: "Category not found!" }) :
            (name === "") ? Swal.fire({ icon: "error", title: "Invalid Name!" }) :
                updateCategory(id, name);

    cleanCategoryForm();
    Swal.fire({ icon: "success", title: "Category updated successfully!" });
    loadCategoryTbl();
});

// ========================= Delete Category =========================
$('#deleteCategory').on('click', function () {
    let id = $('#categoryId_input').val();

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            (id === "") ? Swal.fire({ icon: "error", title: "Invalid Id!" }) :
                (!(getCategoryDataById(id))) ? Swal.fire({ icon: "error", title: "Category not found!" }) :
                    deleteCategory(id);
        }

        cleanCategoryForm();
        Swal.fire({ icon: "success", title: "Category deleted successfully!" });
        loadCategoryTbl();
    });
});



