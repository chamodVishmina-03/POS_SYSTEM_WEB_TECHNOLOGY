import {addOrder, getAllOrders, getOrderById} from '../model/ordersModel.js';
import {getCustomerdata} from '../model/customerModel.js';
import {getItemdata, getItemDataById} from '../model/itemModel.js';

// ========================= add item table array  =========================

let currentOrderItems = [];



// ========================= genarating order id=========================

const generateOrderId = () => {

    const orders = getAllOrders();
    orders.forEach(order => {})
    if (orders.length === 0) return "ORD001";
    const lastId = orders[orders.length - 1].order_id;
    const num = parseInt(lastId.replace("ORD", "")) + 1;

    return "ORD" + String(num).padStart(3, "0");


};

// ========================= customer dropdown =========================

export const loadCustomerDropdown = () => {


    $('#orderCustomerId_input').empty();
    $('#orderCustomerId_input').append('<option value="">-- Select Customer --</option>');

    getCustomerdata().map(cust => {

        $('#orderCustomerId_input').append(`<option value="${cust.id}">${cust.id} - ${cust.getName()}</option>`);


    });
};




// =========================   item dropdown  =========================

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



// ========================= Load Order Items Table =========================
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



// =========================           reset orders Form               =========================

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



// ========================= init =========================

$('#orderId_input').val(generateOrderId());
loadCustomerDropdown();
loadItemDropdown();




// =========================    Unitprice  =========================
$('#orderItemId_input').on('change', function () {

    let item_id = $(this).val();

    if (item_id === "") {

        $('#orderUnitPrice_input').val('');
        return;

    }

    let item = getItemDataById(item_id);

    if (item) {

        $('#orderUnitPrice_input').val(item.getUnitPrice());

    }
});




// ========================= Add Item to Order Table =========================


$('#addOrderItemBtn').on('click', function () {

    let item_id    = $('#orderItemId_input').val();
    let unit_price = parseFloat($('#orderUnitPrice_input').val());
    let qty        = parseInt($('#orderQty_input').val());


    if (item_id === "") {

        Swal.fire({ icon: "error", title: "Please select an Item!" });
        return;

    }
    if (!qty || qty <= 0) {

        Swal.fire({ icon: "error", title: "Invalid QTY!" });
        return;

    }

    let item = getItemDataById(item_id);


    if (qty > parseInt(item.getQty())) {
        Swal.fire({ icon: "error", title: "Insufficient Stock!", text: `Available QTY: ${item.getQty()}` });
        return;
    }


    let existing = currentOrderItems.find(i => i.itemId === item_id);

    if (existing) {

        Swal.fire({ icon: "warning", title: "Item already added!", text: "Remove it first to change QTY." });
        return;


    }



    let subTotal = unit_price * qty;

            currentOrderItems.push({

                itemId:    item.id,
                itemName:  item.getName(),
                unitPrice: unit_price,
                qty:       qty,
                subTotal:  subTotal

            });



    loadOrderItemsTbl();


            $('#orderItemId_input').val('');
            $('#orderUnitPrice_input').val('');
            $('#orderQty_input').val('');


});



// ========================= Table item remove  =========================

$('#order_item_tbody').on('click', '.removeItemBtn', function () {

    let index = $(this).data('index');
    currentOrderItems.splice(index, 1);
    loadOrderItemsTbl();

});





// ========================= Placed   ====  Order =========================
$('#placeOrderBtn').on('click', function () {



    let order_id    = $('#orderId_input').val();
    let customer_id = $('#orderCustomerId_input').val();
    let total_price = $('#orderTotal_input').val();



    if (customer_id === "") {

        Swal.fire({ icon: "error", title: "Please select a Customer!" });
        return;

    }


    if (currentOrderItems.length === 0) {

        Swal.fire({ icon: "error", title: "Please add at least one Item!" });
        return;

    }


    currentOrderItems.forEach(orderItem => {

        let item = getItemDataById(orderItem.itemId);
        if (item) {

            item.setQty(parseInt(item.getQty()) - parseInt(orderItem.qty));

        }
    });



    addOrder(order_id, customer_id, [...currentOrderItems], parseFloat(total_price));
    resetOrderForm();



    Swal.fire({ icon: "success", title: "Order placed successfully!" });


});




// =========================   reset  =========================
$('#resetOrderBtn').on('click', function () {

    resetOrderForm();


});