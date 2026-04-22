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

