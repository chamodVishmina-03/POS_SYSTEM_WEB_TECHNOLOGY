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













