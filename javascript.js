// //==================Login======================
// $("#loginBtn").click(function () {
//
//     let user = $("#username").val();
//     let pass = $("#password").val();
//
//
//
//
//     if (user === "admin" && pass === "1234") {
//
//         $("#loginPage").hide();
//         $("#dashboard").show();
//         clearlogin();
//
//
//     } else {
//
//         $("#errorMsg").text("Invalid Username or Password!");
//         clearloginerror();
//     }
//
// });
//
//
// //================ Logout===========
// $("#logoutBtn").click(function () {
//     $("#dashboard").hide();
//     $("#loginPage").show();
// });
//
//
// function showSection(id) {
//     $(".section").hide();
//     $(id).show();
// }
//

//
// //================ nav dashboard===========
// $("#homeBtn").click(() => showSection("#homeSection"));
// $("#customerBtn").click(() => showSection("#customerSection"));
// $("#itemBtn").click(() => showSection("#itemSection"));
// $("#orderBtn").click(() => showSection("#orderSection"));
//

//
// function clearlogin() {
//     $("#username").val("");
//     $("#password").val("");
//     $("#errorMsg").val("");
// }
//
// function clearloginerror() {
//
//     $("#errorMsg").val("");
// }
//

//================================================= Customer Management ===========

  // =====Customer array
let customers = [];

//==== generate cust ID
function generateCustomerId() {
    return "C" + (customers.length + 1).toString().padStart(3, '0');
}

// LOAD TABLE
function loadCustomers() {
    $("#customerTable").empty();

    customers.forEach((c, index) => {
        $("#customerTable").append(`
            <tr data-index="${index}">
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>${c.contact}</td>
                <td>${c.address}</td>
            </tr>
        `);
    });
}

// RESET FORM
function clearForm() {
    $("#custId").val(generateCustomerId());
    $("#custName").val("");
    $("#custContact").val("");
    $("#custAddress").val("");
}

// INITIAL ID
clearForm();

$("#addCustomer").click(function () {

    let id = $("#custId").val().trim();
    let name = $("#custName").val().trim();
    let contact = $("#custContact").val().trim();
    let address = $("#custAddress").val().trim();

    $("small").text("");
    $("input").removeClass("is-invalid");

    let isValid = true;

    if (name === "") {
        $("#nameError").text("Name is required!");
        $("#custName").addClass("is-invalid");
        isValid = false;
    }

    if (contact === "") {
        $("#contactError").text("Contact is required!");
        $("#custContact").addClass("is-invalid");
        isValid = false;
    } else if (!/^(?:\+94|94|0)(70|71|72|74|75|76|77|78)[0-9]{7}$/.test(contact)) {
        $("#contactError").text("Invalid Sri Lankan number!");
        $("#custContact").addClass("is-invalid");
        isValid = false;
    }


    if (address === "") {
        $("#addressError").text("Address is required!");
        $("#custAddress").addClass("is-invalid");
        isValid = false;
    }

    if (!isValid) return;


    let customer = {
        id: $("#custId").val(),
        name,
        contact,
        address
    };


    customers.push(customer);
    loadCustomers();
    clearForm();
});


// ==========select table customer

$("#customerTable").on("click","tr",function () {
    let index = $(this).data("index");
    let c = customers[index];

    $("#custId").val(c.id);
    $("#custName").val(c.name);
    $("#custContact").val(c.contact);
    $("#custAddress").val(c.address);

    $("#customerTable tr").removeClass("table-primary");

    $(this).addClass("table-primary");

    $("#customerSection").data("selectedIndex", index);

} );



