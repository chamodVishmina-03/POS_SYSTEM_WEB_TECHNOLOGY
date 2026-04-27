import {customers_db} from "../db/db.js";

class Customer{
    #id;
    #name;
    #contract;
    #address;


    constructor(id,name,contract,address){
        this.#id = id;
        this.#name = name;
        this.#contract = contract;
        this.#address = address;
    }

    get id(){
        return this.#id;
    }
    getName(){
        return this.#name;
    }
    getContract(){
        return this.#contract;
    }
    getAddress(){
        return this.#address;
    }


    setId(id){
        this.#id = id;
    }
    setName(name){
        this.#name = name;
    }
    setContract(contract){
        this.#contract=contract;
    }
    setAddress(address){
        this.#address=address;
    }






}





//  ===================== Add Customer  =====================
const addCustomer = (id, name, contract, address) => {

    let new_Customer = new Customer(id, name, contract, address);

    customers_db.push(new_Customer);


}



// =============================  update Customer  =====================
const updateCustomer = (id, name, contract, address) => {
    let obj = customers_db.find(item => item.id === id);

    if (obj) {

        obj.setName(name);
        obj.setContract(contract);
        obj.setAddress(address);
    }
};

//  ===================== Delete customer  =====================
const deleteCustomer = (id) => {

    let index = customers_db.findIndex(item => item.id == id);


    if(index!==-1) {

        customers_db.splice(index, 1);

    }
}

//  ===================== get Student  =====================
const getCustomerdata = () => {

    return customers_db;
}

//  ===================== Get student  index  =====================
const getCustomerDataByIndex = (index) => {

    return customers_db[index];
}

//  ===================== Get student by id  =====================
const getCustomerDataById = (id) => {

    return customers_db.find(item => item.id== id);
}


export {addCustomer,updateCustomer,deleteCustomer,getCustomerdata,getCustomerDataByIndex,getCustomerDataById};