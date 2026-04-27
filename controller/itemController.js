import {addItem,
    updateItem,
    deleteItem,
    getItemData,
    getItemDataByIndex,
    getItemDataById,

} from "../model/itemModel.js";

import {getCategorydata} from "../model/categoryModel.js";
import {getCustomerdata} from "../model/customerModel";





// ========================= generate item ID =========================


const genarateItemId = () => {
    const itemIds = getItemDataById("itemId");
    if (items.length === 0) return "I001";
    const lastId = items[items.length - 1].id;
    const num = parseInt(lastId.replace("I", "")) + 1;
    return "I" + String(num).padStart(3, "0");

};



// =========================Category dropdown =========================

const loadCategoryDropdown = () => {

            $('#categoryItemId_input').empty();

            $('#categoryItemId_input').append('<option value="">-- Select Category --</option>');

            getCategorydata().map(cat => {

                $('#categoryItemId_input').append(`<option value="${cat.id}">
                                                                  ${cat.id} - ${cat.getName()
                                                                   }</option>`);
            });
};






// =========================Load Item table =========================

const loadItemTbl = () => {


    $('#item_tbody').empty();

    let item_db = getCustomerdata();

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



// ========================= reset Form =========================
$('#resetItemBtn').on('click', function () {

    $('#itemId_input').val(generateCustomerId());
    $('#itemName_input').val('');
    $('#itemPrice_input').val('');
    $('#itemQTY_input').val('');
    $('#categoryItemId_input').val('');
});





