import{addCustomer,updateCustomer,deleteCustomer,getCustomerdata,getCustomerDataById,getCustomerDataByIndex} from "../model/customerModel.js";

import {checkphone_regex} from "../util/regex_Units.js";






//================================== Generate cust Id=================================

const generateCustomerId = () => {
    const customers = getCustomerdata();
    if(customers.length === 0) return "C001";
    const lastId = customers[customers.length - 1].id;
    const num = parseInt(lastId.replace("C", "")) + 1;
    return "C" + String(num).padStart(3, "0");

};





