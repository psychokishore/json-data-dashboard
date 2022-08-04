function check(){
if(localStorage.getItem("Token") !== null){
   $("#Token").val(localStorage.getItem("Token"));
}
}

function authorise(){
    var Token = $("#Token").val();
    if(Token === ""){
        alert("Fill Token field");
        $("#Token").focus();
        return "";
    }
    return Token;
}
function Table(){
    window.location.href = "json_table.html";
}
function loginInto(){
    var data = authorise();
    if(data === ""){
        return;
    }
    localStorage.setItem("Token",data);
    Table();
}
