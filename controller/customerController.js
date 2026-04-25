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



//================================== load table =================================
const loadCustomerTable = () => {
    const tbody = $("#customer_tbody");
    tbody.empty();

    const customers = getCustomerdata();
    customers.forEach((c, index) => {
        const row = `
            <tr data-index="${index}">
                <td>${c.id}</td>
                <td>${c.getName()}</td>
                <td>${c.getContract()}</td>
                <td>${c.getAddress()}</td>
            </tr>`;
        tbody.append(row);
    });
};



//================================== Reset  =================================
  const resetBtn =() => {
      $("#custId_input").val(generateCustomerId());
      $("custName_input").val("");
      $("custContact_input").val("");
      $("custAddress_input").val("");
  };




// ========================= Add Customer =========================
$("#addCustomer").on("click", () => {
    const id      = $("#custId_input").val().trim();
    const name    = $("#custName_input").val().trim();
    const contact = $("#custContact_input").val().trim();
    const address = $("#custAddress_input").val().trim();

    if (id === "") {
        Swal.fire({ icon: "error", title: "Invalid Id!" });
    } else if (getCustomerDataById(id)) {
        Swal.fire({ icon: "error", title: "Id already exists!" });
    } else if (name === "") {
        Swal.fire({ icon: "error", title: "Invalid Name!" });
    } else if (!checkphone_regex(contact)) {
        Swal.fire({icon: "error", title: "Invalid Contract Number!"});
    }else if(address === "") {
        Swal.fire({icon: "error", title: "Invalid Address !"});
    }    else{

        addCustomer(id, name, contact, address);
        loadCustomerTable();
        resetForm();

        Swal.fire({icon: "success", title: "Customer Added", showConfirmButton: false, timer: 1500,});
    }
});











