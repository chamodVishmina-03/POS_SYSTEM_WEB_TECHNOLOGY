//==================Login======================
$("#loginBtn").click(function () {

    let user = $("#username").val();
    let pass = $("#password").val();




    if (user === "admin" && pass === "1234") {

        $("#loginPage").hide();
        $("#dashboard").show();


    } else {

        $("#errorMsg").text("Invalid Username or Password!");
    }

});


//================ Logout===========
$("#logoutBtn").click(function () {
    $("#dashboard").hide();
    $("#loginPage").show();
});


function showSection(id) {
    $(".section").hide();
    $(id).show();
}



//================ nav dashboard===========
$("#homeBtn").click(() => showSection("#homeSection"));
$("#customerBtn").click(() => showSection("#customerSection"));
$("#itemBtn").click(() => showSection("#itemSection"));
$("#orderBtn").click(() => showSection("#orderSection"));






//================================================= Customer Management ===========

  // =====Customer array
let customers = [];

//==== generate cust ID
function generateCustomerId() {
    return "C" + (customers.length + 1).toString().padStart(3, '0');
}


//==== Load Customer table
function loadCustomers() {
    $("#customerTable").empty();


    customers.forEach((c ,index) => {
        $("#customerTable").append(`
            <tr data-index="${index}">
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>${c.contact}</td>
                <td>${c.address}</td>
            </tr>
        `);

    })
}


//==== reset
function clearForm() {
    $("custId").val(generateCustomerId());
    $("custName").val(" ");
    $("custContact").val(" ");
    $("custAddress").val(" ");
}





