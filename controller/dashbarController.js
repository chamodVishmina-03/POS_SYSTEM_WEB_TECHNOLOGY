
import {loadCategoryDropdown, loadItemTbl} from './itemController.js';
import {loadCustomerDropdown, loadItemDropdown} from './ordersController.js';
import {loadOrderDropdown} from './orders_historyController.js';

const showSection = (sectionId) => {
    $(".section").hide();
    $(sectionId).show();
};

// Default Section
showSection("#homeSection");

$("#homeBtn").click(() => showSection("#homeSection"));
$("#customerBtn").click(() => showSection("#customerSection"));
$("#categoryBtn").click(() => showSection("#categorySection"));
$("#itemBtn").click(() => {showSection("#itemSection");loadCategoryDropdown();loadItemTbl()});
$("#orderBtn").click(() => {showSection("#orderSection");loadCustomerDropdown();loadItemDropdown();});
$("#orderHistoryBtn").click(() => {showSection("#orderHistorySection");loadOrderDropdown();});