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