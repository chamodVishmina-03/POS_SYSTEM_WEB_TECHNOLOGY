import {category_db, customers_db} from "../db/db.js";

class Category{
    #category_id;
    #category_name;
    constructor(id, name){
        this.#category_id = id;
        this.#category_name = name;
    }

    get id() {
        return this.#category_id;
    }

    getName() {
        return this.#category_name;
    }


    setId(id) {
        this.#category_id = id;
    }

    setName(name) {
        this.#category_name = name;
    }


}


// --------------------------- Add Customer ---------------------------
const addCategory = (category_id, category_name) => {
    let new_category = new Category(category_id, category_name);
    category_db.push(new_category);
}



// =====================  update Customer  =====================
const updateCategory = (category_id, category_name) => {
    let obj = category_db.find(item => item.id === category_id);

    if (obj) {

        obj.setName(category_name);

    }
};

// --------------------------- Delete Customer ---------------------------
const deleteCategory = (category_id) => {
    let index = category_db.findIndex(item => item.id == category_id);

    if(index!==-1) {
        category_db.splice(index, 1);
    }
}

// --------------------------- Get Student ---------------------------
const getCategorydata = () => {
    return category_db;
}

// --------------------------- Get Student by Index ---------------------------
const getCategoryDataByIndex = (index) => {
    return category_db[index];
}

// --------------------------- Get Student by Id ---------------------------
const getCategoryDataById = (category_id) => {
    return category_db.find(item => item.id== category_id);
}

export {addCategory, updateCategory, deleteCategory, getCategorydata, getCategoryDataByIndex};



