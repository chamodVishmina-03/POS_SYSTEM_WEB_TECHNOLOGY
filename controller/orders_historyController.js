import {getAllOrders} from '../model/ordersModel.js';

// ========================= Load Order Dropdown =========================
export const loadOrderDropdown = () => {
    $('#historyOrderId_input').empty();
    $('#historyOrderId_input').append('<option value="">-- Select Order --</option>');
    getAllOrders().map(order => {
        $('#historyOrderId_input').append(`<option value="${order.order_id}">${order.order_id}</option>`);
    });
};

// ========================= Load Order Details =========================
const loadOrderDetails = (order_id) => {
    const orders = getAllOrders();
    const order  = orders.find(o => o.order_id === order_id);

    if (!order) {
        $('#orderDetailsCard').hide();
        return;
    }

    // Fill order info
    $('#hist_order_id').text(order.order_id);
    $('#hist_customer_id').text(order.customer_id);
    $('#hist_total_price').text('Rs. ' + order.total_price.toFixed(2));

    // Fill items table
    $('#history_item_tbody').empty();
    order.order_items.map((item, index) => {
        let new_row = `<tr>
                            <td>${item.itemId}</td>
                            <td>${item.itemName}</td>
                            <td>${item.unitPrice}</td>
                            <td>${item.qty}</td>
                            <td>${item.subTotal.toFixed(2)}</td>
                       </tr>`;
        $('#history_item_tbody').append(new_row);
    });

    $('#orderDetailsCard').show();
};

// ========================= Init =========================
loadOrderDropdown();

// ========================= Order Dropdown Change =========================
$('#historyOrderId_input').on('change', function () {
    let order_id = $(this).val();
    if (order_id === "") {
        $('#orderDetailsCard').hide();
        return;
    }
    loadOrderDetails(order_id);
});