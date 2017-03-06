//Temporizador
var tempM = 20;
var tempS = 0;
var tempD = 0;
var temporizador = null;
//End-Temporizador

// XML
var $http = null;
var xmlDoc = null;

// Tratamiento formulario
var puntero = 0;
var questions = 0;



var $radio = "radio";
var $text = "text";
var $checkbox = "checkbox";
var $select = "select";
var $datalist = "datalist";

window.onload = function () {
    
    iniciarTemporizador();
    abrirXML();
    
    document.getElementById("next").onclick = function () {
        siguiente();
    };
    
    document.getElementById("pre").onclick = function (){
        anterior();
    };
    
    document.getElementById("send").onclick = function (){
        alert("TRATAMIENTO PARA ENVIAR");
    };
    
};

//Tratamiento del XML

function abrirXML() {
    $http = new XMLHttpRequest();
    $http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            gestionarXML(this);
        }
    };
    $http.open("GET", "xml/preguntas.xml", true);
    $http.send();
}

function gestionarXML(datosXML) {
    //1. Obtiene el documento XML
    xmlDoc = datosXML.responseXML;
    //2. Crea el formulario dentro el div 'a' y le asigna la id 'exam'
    var form = addForm();
    //3. Obtiene el número de elementos "question" en el documento XML
    questions = xmlDoc.getElementsByTagName("question").length;

    //4. Generar X número de divs, 1 question = 1 div
    //   divX{display: none;}
    //   Crea un elemento <p> con id 'title'
    //   
    for (var cont = 0; cont < questions; cont++) {
        var newDiv = document.createElement("div");
        form.appendChild(newDiv);
        newDiv.id = "div" + cont;
        newDiv.style = "display: none;";
        var p = document.createElement("p");
        newDiv.appendChild(p);
        console.log(xmlDoc.getElementsByTagName("title")[cont].innerHTML);
        document.getElementsByTagName("p")[cont].innerHTML = xmlDoc.getElementsByTagName("title")[cont].innerHTML;
        ///Añadir cada elemento de la pregunta...
        tratarQuestion(newDiv, cont, xmlDoc);
    }
    //5. Inicializa el formulario con el elemento del puntero
    document.getElementById("nroQ").innerHTML = puntero + 1;
    document.getElementById("div" + puntero).style = "display: block;";
}

function addForm(){
    var div_a = document.getElementById("a");
    var form = document.createElement("form");
    div_a.appendChild(form);
    form.id = "exam";
    return form;
}

function tratarQuestion(div, cont, xmlDoc){
    var tipo = xmlDoc.getElementsByTagName("type")[cont].innerHTML;
    switch (tipo){
        case $radio:
            typeRadio(div, cont, xmlDoc);
            break;
        case $select:
            typeSelect(div, cont, xmlDoc);
            break;
        case $text:
            typeText(div, cont, xmlDoc);
            break;
        case $datalist:
            typeDatalist(div, cont, xmlDoc);
            break;
        case $checkbox:
            typeCheckbox(div, cont, xmlDoc);
            break;
    }
}

function typeRadio(div, cont, xmlDoc){
    var nroAux = xmlDoc.getElementsByTagName("question")[cont].getElementsByTagName("option").length;
    console.log("Radio: "+nroAux);
}

function typeSelect(div, cont, xmlDoc){
    var nroAux = xmlDoc.getElementsByTagName("question")[cont].getElementsByTagName("option").length;
    console.log("Select: "+nroAux);
}

function typeText(div, cont, xmlDoc){
    var nroAux = xmlDoc.getElementsByTagName("question")[cont].getElementsByTagName("option").length;
    console.log("Text: "+nroAux);
    
    var toAdd = document.createElement("input");
    toAdd.type = "text";
    
    div.appendChild(toAdd);
}

function typeDatalist(div, cont, xmlDoc){
    var nroAux = xmlDoc.getElementsByTagName("question")[cont].getElementsByTagName("option").length;
    console.log("Datalist: "+nroAux);
}

function typeCheckbox(div, cont, xmlDoc){
    var nroAux = xmlDoc.getElementsByTagName("question")[cont].getElementsByTagName("option").length;
    console.log("CheckBox: "+nroAux);
}

/***************************************************************************************************************/

function anterior() {
    document.getElementById("div" + puntero).style = "display: none;";
    puntero--;
    document.getElementById("nroQ").innerHTML = puntero + 1;
    document.getElementById("div" + puntero).style = "display: block;";
    if(puntero == 0){
        document.getElementById("pre").style = "display: none";
    }
    document.getElementById("next").style = "display: block";
}

function siguiente() {
    document.getElementById("div" + puntero).style = "display: none;";
    puntero++;
    document.getElementById("nroQ").innerHTML = puntero + 1;
    document.getElementById("div" + puntero).style = "display: block;";
    if (puntero + 1 == questions) {
        document.getElementById("next").style = "display: none";
    }
    document.getElementById("pre").style = "display: block";
}

/***************************************************************************************************************/
//Tratamiento del cronómetro

function iniciarTemporizador() {
    setInnerHTML();
    temporizador = setInterval(temporizar, 10);
}

function setInnerHTML() {
    if (tempM < 10) {
        tempM = "0" + tempM;
    }
    document.getElementById("tempM").innerHTML = tempM;
    if (tempS < 10) {
        tempS = "0" + tempS;
    }
    document.getElementById("tempS").innerHTML = ":" + tempS;
    if (tempD < 10) {
        tempD = "0" + tempD;
    }
    document.getElementById("tempD").innerHTML = ":" + tempD;
}

function temporizar() {
    if (tempD > 0) {
        tempD--;
        if (tempD < 10) {
            tempD = "0" + tempD;
        }
        document.getElementById("tempD").innerHTML = ":" + tempD;
    }
    if ((tempD == 0) && (tempS == 0) && (tempM == 0)) {
        clearInterval(temporizador);
        alert("Fin del tiempo");
        return;
    }
    if (tempD == 0) {
        tempD = 100;
    }
    if (tempD == 99) {
        tempS--;
        if (tempS == -1) {
            tempS = 59;
        }
        if (tempS < 10) {
            tempS = "0" + tempS;
        }
        document.getElementById("tempS").innerHTML = ":" + tempS;
    }
    if ((tempS == 59) && (tempD == 99)) {
        tempM--;
        if (tempM == -1) {
            tempM = 59;
        }
        if (tempM < 10) {
            tempM = "0" + tempM;
        }
        document.getElementById("tempM").innerHTML = tempM;
    }
}