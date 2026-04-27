import {addItem,
    updateItem,
    deleteItem,
    getItemdata,
    getItemDataByIndex,
    getItemDataById,

} from "../model/itemModel.js";

import {getCategorydata} from "../model/categoryModel.js";





// ========================= generate item ID =========================

const generateItemId = () => {
    const items = getItemdata();
    if (items.length === 0) return "I001";
    const lastId = items[items.length - 1].id;
    const num = parseInt(lastId.replace("I", "")) + 1;
    return "I" + String(num).padStart(3, "0");
};

// ========================= drop down=========================
const loadCategoryDropdown = () => {
    $('#categoryItemId_input').empty();
    $('#categoryItemId_input').append('<option value="">-- Select Category --</option>');
    getCategorydata().map(cat => {
        $('#categoryItemId_input').append(`<option value="${cat.id}">${cat.id} - ${cat.getName()}</option>`);
    });
};

// ========================= Load Item Table =========================
const loadItemTbl = () => {
    $('#item_tbody').empty();
    let item_db = getItemdata();
    item_db.map((item, index) => {
        let new_row = `<tr data-index="${index}">
                            <td>${item.id}</td>
                            <td>${item.getName()}</td>
                            <td>${item.getUnitPrice()}</td>
                            <td>${item.getQty()}</td>
                            <td>${item.getCategoryId()}</td>
                       </tr>`;
        $('#item_tbody').append(new_row);
    });
};

// ========================= Clean Item Form =========================
const cleanItemForm = () => {
    $('#resetItemBtn').click();
};

// ========================= Reset Form =========================
$('#resetItemBtn').on('click', function () {
    $('#itemId_input').val(generateItemId());
    $('#itemName_input').val('');
    $('#itemContact_input').val('');
    $('#itemAddress_input').val('');
    $('#categoryItemId_input').val('');
});

// ========================= Init =========================
$('#itemId_input').val(generateItemId());
loadCategoryDropdown();
loadItemTbl();

// ========================= Click on Item Row =========================
$('#item_tbody').on('click', 'tr', function () {
    let item_obj = getItemDataByIndex($(this).index());

    $('#itemId_input').val(item_obj.id);
    $('#itemName_input').val(item_obj.getName());
    $('#itemContact_input').val(item_obj.getUnitPrice());
    $('#itemAddress_input').val(item_obj.getQty());
    $('#categoryItemId_input').val(item_obj.getCategoryId());
});

// ========================= Add Item (Create) =========================
$('#addItem').on('click', function () {
    let id          = $('#itemId_input').val();
    let name        = $('#itemName_input').val();
    let unit_price  = $('#itemContact_input').val();
    let qty         = $('#itemAddress_input').val();
    let category_id = $('#categoryItemId_input').val();

    if (id === "") {
        Swal.fire({ icon: "error", title: "Invalid Id!" });
    } else if (getItemDataById(id)) {
        Swal.fire({ icon: "error", title: "Id already exists!" });
    } else if (name === "") {
        Swal.fire({ icon: "error", title: "Invalid Item Name!" });
    } else if (unit_price === "" || isNaN(unit_price)) {
        Swal.fire({ icon: "error", title: "Invalid Unit Price!" });
    } else if (qty === "" || isNaN(qty)) {
        Swal.fire({ icon: "error", title: "Invalid QTY!" });
    } else if (category_id === "") {
        Swal.fire({ icon: "error", title: "Please select a Category!" });
    } else {
        addItem(id, name, unit_price, qty, category_id);
        cleanItemForm();
        Swal.fire({ icon: "success", title: "Item saved successfully!" });
        loadItemTbl();
    }
});

// ========================= Update Item =========================
$('#updateItem').on('click', function () {
    let id          = $('#itemId_input').val();
    let name        = $('#itemName_input').val();
    let unit_price  = $('#itemContact_input').val();
    let qty         = $('#itemAddress_input').val();
    let category_id = $('#categoryItemId_input').val();

    (id === "") ? Swal.fire({ icon: "error", title: "Invalid Id!" }) :
        (!(getItemDataById(id))) ? Swal.fire({ icon: "error", title: "Item not found!" }) :
            (name === "") ? Swal.fire({ icon: "error", title: "Invalid Item Name!" }) :
                (unit_price === "" || isNaN(unit_price)) ? Swal.fire({ icon: "error", title: "Invalid Unit Price!" }) :
                    (qty === "" || isNaN(qty)) ? Swal.fire({ icon: "error", title: "Invalid QTY!" }) :
                        (category_id === "") ? Swal.fire({ icon: "error", title: "Please select a Category!" }) :
                            updateItem(id, name, unit_price, qty, category_id);

    cleanItemForm();
    Swal.fire({ icon: "success", title: "Item updated successfully!" });
    loadItemTbl();
});

// ========================= Delete Item =========================
$('#deleteItem').on('click', function () {
    let id = $('#itemId_input').val();

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
                (!(getItemDataById(id))) ? Swal.fire({ icon: "error", title: "Item not found!" }) :
                    deleteItem(id);
        }

        cleanItemForm();
        Swal.fire({ icon: "success", title: "Item deleted successfully!" });
        loadItemTbl();
    });
});


export {loadCategoryDropdown};