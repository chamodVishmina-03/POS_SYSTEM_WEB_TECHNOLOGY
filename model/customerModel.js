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