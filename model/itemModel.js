import {item_db} from "../db/db.js";


class Item {
    #item_id;
    #item_name;
    #unit_price;
    #qty;
    #category_id;

    constructor(item_id,item_name,unit_price,qty,category_id) {
        this.#item_id = item_id;
        this.#item_name = item_name;
        this.#unit_price = unit_price;
        this.#category_id = category_id;
        this.#qty = qty;
        this.#category_id = category_id;
    }
    get id(){
        return this.#item_id;
    }
    get name(){
        return this.#item_name;
    }
    get price(){
        return this.#unit_price;
    }
    get category_id(){
        return this.#category_id;
    }
    get qty(){
        return this.#qty;
    }


    setId(id) {
        this.#item_id = id;
    }
    setName(name) {
        this.#item_name = name;
    }
    setUnitPrice(unit_price) {
        this.#unit_price = unit_price;
    }
    setQty(qty) {
        this.#qty = qty;
    }
    setCategoryId(category_id) {
        this.#category_id = category_id;
    }

}