import {addOrder, getAllOrders, getOrderById} from '../model/ordersModel.js';
import {getCustomerdata} from '../model/customerModel.js';
import {getItemdata, getItemDataById} from '../model/itemModel.js';
import {currentOrderItems} from "../db/db.js";


// ========================= generate    Order id =========================
const generateOrderId = () => {
    const orders = getAllOrders();
    if (orders.length === 0) return "ORD001";
    const lastId = orders[orders.length - 1].order_id;
    const num = parseInt(lastId.replace("ORD", "")) + 1;
    return "ORD" + String(num).padStart(3, "0");
};




// =========================      load customer dropdown item     =========================
export const loadCustomerDropdown = () => {

    $('#orderCustomerId_input').empty();
    $('#orderCustomerId_input').append('<option value="">-- Select Customer --</option>');

    getCustomerdata().map(cust => {

        $('#orderCustomerId_input').append(`<option value="${cust.id}">${cust.id} - ${cust.getName()}</option>`);
    });

};




// =========================   load item dropdown   =========================
export const loadItemDropdown = () => {

    $('#orderItemId_input').empty();
    $('#orderItemId_input').append('<option value="">-- Select Item --</option>');

    getItemdata().map(item => {

        $('#orderItemId_input').append(`<option value="${item.id}">${item.id} - ${item.getName()}</option>`);
    });
};



// =========================  Total =========================

const calculateTotal = () => {

    let total = currentOrderItems.reduce((sum, item) => sum + item.subTotal, 0);
    $('#orderTotal_input').val(total.toFixed(2));


};



// ========================= loading item table =========================


const loadOrderItemsTbl = () => {

    $('#order_item_tbody').empty();

    currentOrderItems.map((item, index) => {

        let new_row = `<tr data-index="${index}">
                            <td>${item.itemId}</td>
                            <td>${item.itemName}</td>
                            <td>${item.unitPrice}</td>
                            <td>${item.qty}</td>
                            <td>${item.subTotal.toFixed(2)}</td>
                            <td><button class="btn btn-danger btn-sm removeItemBtn" data-index="${index}">Remove</button></td>
                       </tr>`;

        $('#order_item_tbody').append(new_row);

    });

    calculateTotal();


};



// ========================= reset =========================

const resetOrderForm = () => {

        $('#orderId_input').val(generateOrderId());
        $('#orderCustomerId_input').val('');
        $('#orderItemId_input').val('');
        $('#orderUnitPrice_input').val('');
        $('#orderQty_input').val('');
        $('#orderTotal_input').val('');
        currentOrderItems = [];
        $('#order_item_tbody').empty();

};





// =========================    init       =========================


$('#orderId_input').val(generateOrderId());

loadCustomerDropdown();

loadItemDropdown();







