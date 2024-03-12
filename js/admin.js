var tabmenu = document.getElementsByClassName('tab-menu');
var tabcontent = document.getElementsByClassName('admin-main');

function openmenu(tab) {
    console.log(tab);
    let selectedTab = document.getElementById(tab);
    if (selectedTab) {
        console.log("Element with ID " + tab + " found.");
    } else {
        console.log("Element with ID " + tab + " not found.");
    }
    for (tab of tabmenu) {
        tab.classList.remove("active-tab");
    }
    for (content of tabcontent) {
        content.classList.remove("default-content");
    }
    event.currentTarget.classList.add('active-tab');
    selectedTab.classList.add('default-content');
    if (selectedTab.classList.contains('default-content')) {
        console.log("success");
    } else {
        console.log("failed");
    }
}