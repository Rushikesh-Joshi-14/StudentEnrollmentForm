var JpdbBaseUrl = "http://api.login2explore.com:5577";
var JpdbIML = "/api/iml";
var JpdbIRL = "/api/irl";
var studentDBName = "SCHOOL-DB";
var studentRelationName = "STUDENT-TABLE";
var connToken = "90932118|-31949222289303537|90962118" ;



function saveRecNO2LS(jsonOBj){
  var LSData = JSON.parse(jsonOBj.data);
  localStorage.setItem("recNo", LSData.rec_no);
}

function getstdIDjsonObj(){
  var rollNumber = $("#rollNO").val();
  var jsonStr = {
  rollno : rollNumber
  };
  return JSON.stringify(jsonStr)
}

function fillData(jsonOBj){
  saveRecNO2LS(jsonOBj);

  var record = JSON.parse(jsonOBj.data).record;
  $("#rollNO").val(record.rollno);
  $("#stdName").val(record.name);
  $("#stdClass").val(record.class);
  $("#stdDOB").val(record.birthDate);
  $("#stdAdd").val(record.address);
  $("#stdEnrol").val(record.enrolmentDate);
}



function getStudent(){
  var stdIDjsonObj = getstdIDjsonObj();
  var getRqst = createGET_BY_KEYRequest(connToken,studentDBName,studentRelationName,stdIDjsonObj);
  jQuery.ajaxSetup({async :false});
  var resJsonObj = executeCommandAtGivenBaseUrl(getRqst , JpdbBaseUrl, JpdbIRL);
  jQuery.ajaxSetup({async :true});

  if(resJsonObj.status === 400){
    $("#save").prop("disabled", false);
    $("#reset").prop("disabled", false);
    $("#stdName").focus();
  }
  else if(resJsonObj.status === 200){
    $("#rollNO").prop("disabled", false);
    fillData(resJsonObj);

    $("#change").prop("disabled", false);
    $("#reset").prop("disabled", false);
    $("#stdName").focus();
  }
}


function resetData(){
  $("#rollNO").val("");
  $("#stdName").val("");
  $("#stdClass").val("");
  $("#stdDOB").val("");
  $("#stdAdd").val("");
  $("#stdEnrol").val("");

  $("#rollNO").prop('disabled' , false);
  $("#save").prop('disabled' , true);
  $("#change").prop('disabled' , true);
  $("#reset").prop('disabled' , true);

  $("#rollNO").focus();
}

function saveData(){
  var jsonStrObj = validateData();
  if(jsonStrObj===""){
    return "" ;
  }

  var putRqst = createPUTRequest(connToken, jsonStrObj,studentDBName,studentRelationName);
  jQuery.ajaxSetup({async :false});
  var resJsonObj = executeCommandAtGivenBaseUrl(putRqst , JpdbBaseUrl, JpdbIML);
  jQuery.ajaxSetup({async :true});
  resetData();
  $("#rollNO").focus();
 
}


function changeData(){
  $("#change").prop("disabled" , true);
  jsonChanged = validateData();
  var updateRqst = createUPDATERecordRequest(connToken, jsonChanged, studentDBName,studentRelationName, localStorage.getItem("recNo"));
  jQuery.ajaxSetup({async :false});
  var resJsonObj = executeCommandAtGivenBaseUrl(updateRqst, JpdbBaseUrl, JpdbIML);
  jQuery.ajaxSetup({async :true});
  console.log(resJsonObj);
  resetData();
  $("#rollNO").focus();
}

function validateData(){
  var rollNO, stdName, stdClass, stdDOB, stdAdd, stdEnrol ;
  rollNO = $("#rollNO").val();
  stdName = $("#stdName").val();
  stdClass = $("#stdClass").val();
  stdDOB= $("#stdDOB").val();
  stdAdd= $("#stdAdd").val();
  stdEnrol= $("#stdEnrol").val();
 

  if(rollNO===""){
    alert("student's Roll NO Missing !")
    $("#rollNO").focus();
    return " ";
  }
  if(stdName===""){
    alert("Student's Name Missing !")
    $("#stdName").focus();
    return " ";
  }
  if(stdClass===""){
    alert("Student's Class Missing !")
    $("#stdClass").focus();
    return " ";
  }
  if(stdDOB===""){
    alert("Student's DOB Missing !")
    $("#stdDOB").focus();
    return " ";
  }
  if(stdAdd===""){
    alert("Student's Address Missing !")
    $("#stdAdd").focus();
    return " ";
  }
  if(stdEnrol===""){
    alert("Student's Enrollment Date Missing !")
    $("#stdEnrol").focus();
    return " ";
  }

  jsonStrObj ={
    rollno: rollNO ,
    name: stdName,
    class: stdClass,
    birthDate: stdDOB,
    address : stdAdd,
    enrolmentDate: stdEnrol
  } ;
  return JSON.stringify(jsonStrObj);
}



