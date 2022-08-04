function loadHeader() {
  //  $("#myHeader").load("json_header.html");
    currentTab();
}

function deleteSession() {
    localStorage.clear();
    window.location.href = "json_home.html";
}
function myTable(){
    if(localStorage.getItem("Token") !== null){
    window.location.href = "json_table.html";
    }
    else{
      alert("No token found");
    }
}
function myHome(){
    if(localStorage.getItem("Token") !== null){
      window.location.href = "json_home.html";
    }
    else{
      alert("No token found");
    }
}
function myFilter(){
    if(localStorage.getItem("Token") !== null){
      window.location.href = "json_filter.html";
    }
}
function checkSession() {
    if (localStorage.getItem("Token")==null) {
        alert("No Token found");
        setTimeout(function(){
        window.location.href = "json_home.html";},2000);
    }
    return;
}

function loadFooter() {
   // $("#myFooter").load("json_footer.html");
    currentTab();
}


function currentTab() {
    if (myName === "home") {
        $("#myHome").prop("class", "active");
    } else if (myName === "table") {
        $("#myTable").prop("class", "active");
    } else if (myName === "filter") {
        $("#myFilter").prop("class", "active");
    } else if (myName === "form") {
        $("#myForm").prop("class", "active");
    }
    return;
}
