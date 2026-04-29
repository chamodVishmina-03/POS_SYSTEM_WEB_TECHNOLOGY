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

    get order_id() {
        return this.#order_id;
    }
    get customer_id() {
        return this.#customer_id;
    }
    get order_items() {
        return this.#order_items;
    }
    get total_price() {
        return this.#total_price;
    }



    set order_id(order_id) {
        this.#order_id = order_id;
    }
    set customer_id(customer_id) {
        this.#customer_id = customer_id;
    }
    set order_items(order_items) {
        this.#order_items = order_items;
    }
    set total_price(total_price) {
        this.#total_price = total_price;
    }


}

// ================================= add order ==========================================

 const addOrder = (order_id, customer_id, order_items, total_price) => {
    let new_order= new Order(order_id, customer_id, order_items, total_price);
    order_db.push(new_order);
 }

