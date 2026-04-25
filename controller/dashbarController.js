
const showSection = (sectionId) => {
    $(".section").hide();
    $(sectionId).show();
};

// Default Section
showSection("#homeSection");

$("#homeBtn").click(() => showSection("#homeSection"));
$("#customerBtn").click(() => showSection("#customerSection"));
$("#itemBtn").click(() => showSection("#itemSection"));
$("#orderBtn").click(() => showSection("#orderSection"));
$("#categoryBtn").click(() => showSection("#categorySection"));
$("#orderHistoryBtn").click(() => showSection("#orderHistorySection"));