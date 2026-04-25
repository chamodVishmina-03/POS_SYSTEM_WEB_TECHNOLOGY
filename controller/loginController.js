//==================Login======================
$("#loginBtn").click(function () {

    let user = $("#username").val();
    let pass = $("#password").val();




    if (user === "admin" && pass === "1234") {

        $("#loginPage").hide();
        $("#dashboard").show();
        clearlogin();


    } else {

        $("#errorMsg").text("Invalid Username or Password!");
        clearloginerror();
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





function clearlogin() {
    $("#username").val("");
    $("#password").val("");
    $("#errorMsg").val("");
}

function clearloginerror() {

    $("#errorMsg").val("");
}

