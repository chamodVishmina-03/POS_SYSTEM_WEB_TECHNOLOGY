import {order_db} from "../db/db.js";




class Order {
    #order_id;
    #customer_id;
    #order_items;
    #total_price;



    constructor(order_id, customer_id, order_items, total_price) {
        this.#order_id = order_id;
        this.#customer_id = customer_id;
        this.#order_items = order_items;
        this.#total_price = total_price;
    }

}