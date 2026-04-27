import {addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerdata,
    getCustomerDataByIndex,
    getCustomerDataById
} from '../model/customerModel.js';



// =========================generate cust ID =========================
const generateCustomerId = () => {


                const customers = getCustomerdata();
                if (customers.length === 0) return "C001";
                const lastId = customers[customers.length - 1].id;
                const num = parseInt(lastId.replace("C", "")) + 1;
                return "C" + String(num).padStart(3, "0");


};

// ========================= load cust Table =========================
const loadCustomerTbl = () => {


    $('#customer_tbody').empty();

    let customer_db = getCustomerdata();

    customer_db.map((item, index) => {


        let new_row = `<tr data-index="${index}">
                            <td>${item.id}</td>
                            <td>${item.getName()}</td>
                            <td>${item.getContract()}</td>
                            <td>${item.getAddress()}</td>
                       </tr>`;

        $('#customer_tbody').append(new_row);


    });
}





// ========================= Clear form =========================
const cleanCustomerForm = () => {
    $('#resetBtn').click();


}





// ========================= reset Form =========================
$('#resetBtn').on('click', function () {

        $('#custId_input').val(generateCustomerId());
        $('#custName_input').val('');
        $('#custContact_input').val('');
        $('#custAddress_input').val('');
});





// ========================= Initialize  =========================
$('#custId_input').val(generateCustomerId());// generate it start

loadCustomerTbl();               // load krnna table





// ========================= select Row customer=========================
$('#customer_tbody').on('click', 'tr', function () {

    let customer_obj = getCustomerDataByIndex($(this).index());



            $('#custId_input').val(customer_obj.id);
            $('#custName_input').val(customer_obj.getName());
            $('#custContact_input').val(customer_obj.getContract());
            $('#custAddress_input').val(customer_obj.getAddress());


});

// ========================= add customer =========================
$('#addCustomer').on('click', function () {



    let id      = $('#custId_input').val();
    let name    = $('#custName_input').val();
    let contact = $('#custContact_input').val();
    let address = $('#custAddress_input').val();



    if (id === "") {

        Swal.fire({ icon: "error", title: "Invalid Id!" });

    } else if (getCustomerDataById(id)) {

        Swal.fire({ icon: "error", title: "Id already exists!" });

    } else if (name === "") {

        Swal.fire({ icon: "error", title: "Invalid Name!" });

    } else if (contact === "") {

        Swal.fire({ icon: "error", title: "Invalid Contact!" });

    } else if (address === "") {

        Swal.fire({ icon: "error", title: "Invalid Address!" });

    } else {

        addCustomer(id, name, contact, address);
        cleanCustomerForm();
        Swal.fire({ icon: "success", title: "Customer saved successfully!" });
        loadCustomerTbl();

    }
});




// ========================= Update Customer =========================
$('#updateCustomer').on('click', function () {



    let id      = $('#custId_input').val();
    let name    = $('#custName_input').val();
    let contact = $('#custContact_input').val();
    let address = $('#custAddress_input').val();


    (id === "") ? Swal.fire({ icon: "error", title: "Invalid Id!" }) :
        (!(getCustomerDataById(id))) ? Swal.fire({ icon: "error", title: "Customer not found!" }) :
            (name === "") ? Swal.fire({ icon: "error", title: "Invalid Name!" }) :
                (contact === "") ? Swal.fire({ icon: "error", title: "Invalid Contact!" }) :
                    (address === "") ? Swal.fire({ icon: "error", title: "Invalid Address!" }) :
                        updateCustomer(id, name, contact, address);



    cleanCustomerForm();
    Swal.fire({ icon: "success", title: "Customer updated successfully!" });
    loadCustomerTbl();


});

// ========================= ==========   delete Customer =========================
$('#deleteCustomer').on('click', function () {


    let id = $('#custId_input').val();


    Swal.fire({title: "Are you sure?", text: "You won't be able to revert this!", icon: "warning", showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"

    }).then((result) => {


        if (result.isConfirmed) {
            (id === "") ? Swal.fire({ icon: "error", title: "Invalid Id!" }) :
                (!(getCustomerDataById(id))) ? Swal.fire({ icon: "error", title: "Customer not found!" }) :
                    deleteCustomer(id);

        }



        cleanCustomerForm();
        Swal.fire({ icon: "success", title: "Customer deleted successfully!" });
        loadCustomerTbl();


    });

});