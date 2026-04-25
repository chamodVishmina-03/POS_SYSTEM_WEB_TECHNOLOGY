import {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerdata,
    getCustomerDataById
} from "../model/customerModel.js";

// ========================= Generate Customer ID =========================
const generateCustomerId = () => {
    const customers = getCustomerdata();
    if (customers.length === 0) return "C001";
    const lastId = customers[customers.length - 1].id;
    const num = parseInt(lastId.replace("C", "")) + 1;
    return "C" + String(num).padStart(3, "0");
};





// ========================= Load Table =========================
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






// ========================= Reset Form =========================
const resetForm = () => {
    $("#custId_input").val(generateCustomerId());
    $("#custName_input").val("");
    $("#custContact_input").val("");
    $("#custAddress_input").val("");
};







// ========================= On Page Load =========================
$(document).ready(() => {
    resetForm();
    loadCustomerTable();





    // ========================= save Customer =========================
    $("#addCustomer").on("click", () => {
        const id      = $("#custId_input").val().trim();
        const name    = $("#custName_input").val().trim();
        const contact = $("#custContact_input").val().trim();
        const address = $("#custAddress_input").val().trim();

        if (!name || !contact || !address) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please fill in all fields before adding.",
            });
            return;
        }

        addCustomer(id, name, contact, address);
        loadCustomerTable();
        resetForm();

        Swal.fire({
            icon: "success",
            title: "Customer Added",
            showConfirmButton: false,
            timer: 1500,
        });
    });



    // ========================= update Customer =========================
    $("#updateCustomer").on("click", () => {
        const id      = $("#custId_input").val().trim();
        const name    = $("#custName_input").val().trim();
        const contact = $("#custContact_input").val().trim();
        const address = $("#custAddress_input").val().trim();

        if (!id || !name || !contact || !address) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please select a customer and fill all fields.",
            });
            return;
        }

        const existing = getCustomerDataById(id);
        if (!existing) {
            Swal.fire({ icon: "error", title: "Customer not found!" });
            return;
        }

        updateCustomer(id, name, contact, address);
        loadCustomerTable();
        resetForm();

        Swal.fire({
            icon: "success",
            title: "Customer Updated",
            showConfirmButton: false,
            timer: 1500,
        });
    });

    // ========================= Delete Customer =========================
    $("#deleteCustomer").on("click", () => {
        const id = $("#custId_input").val().trim();

        if (!id) {
            Swal.fire({ icon: "warning", title: "Select a customer to delete." });
            return;
        }

        const existing = getCustomerDataById(id);
        if (!existing) {
            Swal.fire({ icon: "error", title: "Customer not found!" });
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: `Delete customer ${id}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCustomer(id);
                loadCustomerTable();
                resetForm();

                Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    });

    // ========================= Reset Button =========================
    $("#resetBtn").on("click", () => {
        resetForm();
    });

    // ========================= Row Click → Fill Form =========================
    $("#customer_tbody").on("click", "tr", function () {
        const id = $(this).find("td:eq(0)").text();
        const customer = getCustomerDataById(id);

        if (customer) {
            $("#custId_input").val(customer.id);
            $("#custName_input").val(customer.getName());
            $("#custContact_input").val(customer.getContract());
            $("#custAddress_input").val(customer.getAddress());
        }
    });
});