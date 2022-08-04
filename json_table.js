var connToken = localStorage.getItem("Token");
var baseUrl = "http://api.login2explore.com:5577";
var idlPartUrl = "/api/idl";
var x;
var h; //colomn names

function data_of_Db(){
var l=      "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"cmd\": \""
            + "GET_ALL_DB"
            +"\","
            + "\n"
            + "}";
           jQuery.ajaxSetup({async: false});
            var datab = executeCommand(l, "/api/irl");
            jQuery.ajaxSetup({async: true});
          var d = datab.data;
           console.log(d);
          for(var i=0;i<d.length;i++){
          var k=d[i];
          $('#Db1').append('<option value ="'+  k  +' ">' + k + '</option>');
          console.log(d[i]);
          }
}



function get_rel1(){
$('#Rel1').remove();
$('#reldiv').append( '<select onchange ="get_rec1()"  class="form-control" id="Rel1"></select>');
$('#Rel1').append('<option>select Rel</option>');
var b =  $('#Db1 option:selected').text();
     if(b!= "select Db"){
     var l="{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"cmd\": \""
            + "GET_ALL_RELATIONS"
            +"\","
            + "\"dbName\": \""
            +b
            + "\","
            + "\n"
            + "}";
           jQuery.ajaxSetup({async: false});
            var datar1 = executeCommand(l, "/api/irl");
            jQuery.ajaxSetup({async: true});
          var d = datar1.data;
          for(var i=0;i<d.length;i++){
          var k=d[i].relName;
          if(k)
          $('#Rel1').append('<option value ="'+ k +' ">' + k + '</option>');
          }
         }
}


  function get_rec1(){
      $('#searchcol1').remove();
      $('#secol1').append( '<select   class="form-control" id="searchcol1"></select>');
      $('#searchcol1').append('<option>select col</option>'); 

    $('#RecT').remove();
    $('#crt_tbl').append('<table id="RecT"></table>');
    var b =  $('#Db1 option:selected').text();
    var c = $('#Rel1 option:selected').text();
     if(c!= "select Rel" && b!= "select Db"){
     var l="{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"cmd\": \""
            + "GET_ALL"
            +"\","
            + "\"dbName\": \""
            +b
            + "\","
            + "\"rel\": \""
            +c
            + "\","
            + "\n"
            + "}";     
    var req = "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"dbName\": \""
            + b
            + "\",\n" + "\"cmd\" : \"GETALLCOL\",\n"
            + "\"rel\" : \""
            + c
            + "\"\n"
            + "}";
            jQuery.ajaxSetup({async: false});
            var colr1 = executeCommand(req, "/api/irl");
            jQuery.ajaxSetup({async: true});
               h=colr1.data;
             $('#RecT').append('<tr id="cT"> </tr>');
           for(let i=0;i<colr1.data.length;i++){
            var u = ((colr1.data[i]).colName);
            if(u!="" && u!=undefined){
           $('#cT').append('<th>' + u + '</th>');
            $('#searchcol1').append('<option>'+ u +'</option>'); 
            }
           }
           jQuery.ajaxSetup({async: false});
            var datar1 = executeCommand(l, "/api/irl");
            jQuery.ajaxSetup({async: true});
           var d = JSON.parse(datar1.data);
              console.log(d);
              x=d;
          var k = d.json_records;
          for(var i=0;i<d.total_records;i++){
           //console.log(k.recno);
           if(k[i].record!=null){
          $('#RecT').append('<tr><td>' + JSON.stringify(k[i].record.name) + '</td><td><input type="button" onclick = "rel(this)" value="edit" id=' +JSON.stringify(k[i].rec_no)  + '><td><input type="button" onclick = "del(this)" value="del" id=' +JSON.stringify(k[i].rec_no)  + '></td></tr>');
          }
          console.log(k);
          }
         }
    
    }
   
   function rel(s){
    console.log(s.parentNode.parentNode.childNodes[1].id);
     var k = s.parentNode.parentNode.childNodes;
       console.log(k);
     var o = "recno"+" "+s.id;
      for (var i = 0; i < k.length-2; i++) {
      var r = k[i].innerHTML;
        var u = (h[i].colName);
         o+=" "+u+" "+r;
     }
       var t = prompt("make required changes except recno",o);
       alert(t);
       if(t==null){ 
       return;
       }
       var up=t.split(" ");

  console.log("lol"+up.length);
    var jsons = "{\n";
   jsons+=" \""+up[1]+"\":{\n";
    for (let i=2;i<up.length;i+=2){
     if(i==2){
      jsons += "\""+ up[i]+ "\": "
      + up[i+1];
     }
     else{
     jsons += ",\n\""+ up[i]+ "\": "
      + up[i+1];
        }
    }
    jsons+="  }\n}";
    
    console.log(JSON.parse(jsons));
    var b= $('#Db1 option:selected').text(); 
     var c = $('#Rel1 option:selected').text(); 
      var UReq= "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"cmd\": \""
            + "UPDATE"
            +"\","
            + "\"dbName\": \""
            + b
            + "\","
            + "\"rel\": \""
            +  c
            + "\","
            + "\"jsonStr\": \n"
            + jsons
            + "\n"
            + "}";
            console.log(UReq);
             jQuery.ajaxSetup({async: false});
           var resp= executeCommand(UReq, "/api/iml");
             jQuery.ajaxSetup({async: true});
         //get_rel1 .......
     $('#RecT').remove();
    $('#crt_tbl').append('<table id="RecT"></table>');
    var b =  $('#Db1 option:selected').text();
    var c = $('#Rel1 option:selected').text();
     if(c!= "select Rel" && b!= "select Db"){
     var l="{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"cmd\": \""
            + "GET_ALL"
            +"\","
            + "\"dbName\": \""
            +b
            + "\","
            + "\"rel\": \""
            +c
            + "\","
            + "\n"
            + "}";     
           $('#RecT').append('<tr id="cT"> </tr>');
           for(let i=0;i<h.length;i++){
            var u = ((h[i]).colName);
            if(u!="" && u!=undefined){
           $('#cT').append('<th>' + u + '</th>');
           }
           }
            jQuery.ajaxSetup({async: false});
            var datar1 = executeCommand(l, "/api/irl");
            jQuery.ajaxSetup({async: true});
           var d = JSON.parse(datar1.data);
              console.log(d);
              x=d;
          var k = d.json_records;
          for(var i=0;i<d.total_records;i++){
           //console.log(k.recno);
           if(k[i].record!=null){
          $('#RecT').append('<tr><td>' + JSON.stringify(k[i].record.name) + '</td><td><input type="button" onclick = "rel(this)" value="edit" id=' +JSON.stringify(k[i].rec_no)  + '><td><input type="button" onclick = "del(this)" value="del" id=' +JSON.stringify(k[i].rec_no)  + '></td></tr>');
          }
         }
         
         }
         



   }
    
   function del(s){
    var  rn= s.id;
    console.log(s);
        var removeReqStr =  createREMOVERecordRequest(connToken, $('#Db1 option:selected').text(),$('#Rel1 option:selected').text(), rn);
          jQuery.ajaxSetup({async: false});
           var respRemoveRecord = executeCommand(removeReqStr, "/api/iml");
             jQuery.ajaxSetup({async: true});
            get_rec1();
   }
   
   function ser_rec(){
    $('#RecT').remove();
    $('#crt_tbl').append('<table id="RecT"></table>');
        console.log(d);
        var p =$('#searchcol1 option:selected').text();
        var d =x;
           var k = d.json_records;
          for(var i=0;i<d.total_records;i++){
          if(k[i].record!=null &&k[i].record[p]==$('#search').val() ){
          $('#RecT').append('<tr><td>' + JSON.stringify(k[i].record.name) + '</td><td><input type="button" onclick = "rel(this)" value="edit" id=' +JSON.stringify(k[i].rec_no)  + '><td><input type="button" onclick = "del(this)" value="del" id=' +JSON.stringify(k[i].rec_no)  + '></td></tr>');
          }
        }
   }
   
   
   
    // to get csv from table
          function tableToCSV() {
            var csv_data = [];
            var rows = document.getElementsByTagName('tr');
            for (var i = 0; i < rows.length; i++) {
                var cols = rows[i].querySelectorAll('td,th');
                var csvrow = [];
                for (var j = 0; j < cols.length-1; j++) {
                    csvrow.push(cols[j].innerHTML);
                }
                csv_data.push(csvrow.join(","));
            }
            csv_data = csv_data.join('\n');
            downloadCSVFile(csv_data);
 
        }
 
        function downloadCSVFile(csv_data) {
            CSVFile = new Blob([csv_data], {
                type: "text/csv"
            });
            var temp_link = document.createElement('a');
            temp_link.download =  $('#Db1 option:selected').text()+"_"+ $('#Rel1 option:selected').text()+"_"+$('#search').val()+".csv";
            var url = window.URL.createObjectURL(CSVFile);
            temp_link.href = url;
            temp_link.style.display = "none";
            document.body.appendChild(temp_link);
            temp_link.click();
            document.body.removeChild(temp_link);
        }  
    
function del_rel() {
   var t = prompt("enter input in Db space rel format ,to remove a Db dont enter rel");
   alert(t);
   var del = t.split(" ");
   console.log(del[1]);
   if(del[1]==undefined || del[1]==""){
      var Req= "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"cmd\": \""
            + "REMOVE_DB"
            +"\","
            + "\"dbName\": \""
            + del[0] + "\","
            + "\n"
            + "}";
            jQuery.ajaxSetup({async: false});
            var Resp = executeCommand(Req, "/api/idl");
            jQuery.ajaxSetup({async: true});
    console.log(Req);
    }
    else{
         var DReq= "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"cmd\": \""
            + "REMOVE_RELATION"
            +"\","
            + "\"dbName\": \""
            + del[0] + "\","
            + "\"rel\": \""
            + del[1] + "\","
            + "\n"
            + "}";
            console.log(del[1]);
            jQuery.ajaxSetup({async: false});
            var Resp = executeCommand(DReq,"/api/idl");
            jQuery.ajaxSetup({async: true});
    console.log(Resp);
    
    }
    }


   function add_d(){
   var t = prompt("enter input in Db space rel space name of index space data space next index so on");
   alert(t);
       if(t==null){ 
       return;
       }
       var e=t.split(" ");
    var jss = "{\n";
     console.log(1);
    for (var j=2;j<e.length;j+=2){
    if(e[j+1]==undefined){e[j+1]=""}
     jss += "\""+ e[j]+ "\": "
      + e[j+1] +",\n";
        console.log(j+e[j]+e[j+1]);
    }
     console.log(1);
    jss+="\n}";
     console.log((jss));
       var DReq= "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"cmd\": \""
            + "PUT"
            +"\","
            + "\"dbName\": \""
            + e[0] + "\","
            + "\"rel\": \""
            + e[1] 
             + "\","
            + "\"jsonStr\": \n"
            + jss
            + "\n"
            + "}";
             console.log(DReq);
            jQuery.ajaxSetup({async: false});
            var Resp = executeCommand(DReq, "/api/iml");
            jQuery.ajaxSetup({async: true});
             console.log(Resp);
             window.location.reload();
    }
