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


//  =====================  Add item  =====================
const addItem = (item_id, item_name, unit_price, qty, category_id) => {

    let new_item = new Item(item_id, item_name, unit_price, qty, category_id);
    item_db.push(new_item);


};


//  ===================== update  item  =====================

const updateItem = (item_id, item_name, unit_price, qty, category_id) => {

    let obj = item_db.find(item => item.id === item_id);

    if (obj) {

        obj.setName(item_name);
        obj.setUnitPrice(unit_price);
        obj.setQty(qty);
        obj.setCategoryId(category_id);

    }

};



const deleteItem = (item_id) => {

    let index = item_db.findIndex(item => item.id == item_id);

    if (index !== -1) {

        item_db.splice(index, 1);
    }


};
