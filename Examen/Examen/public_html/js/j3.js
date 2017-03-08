//Declaración de constantes
var CHECKBOX = "checkbox";
var DATALIST = "datalist";
var RADIO = "radio";
var SELECT = "select";
var TEXT = "text";

//Declaración de variables
var http = null;
var xmlDOC = null;
var form = null;
var puntero = 0;
var nroQuestions = 0;

var penalizacion = false;
var notaFinal = 0;

//window.onload
window.onload = function () {
    var b;
    var temp = new Temporizador(20, 0);
    control = setInterval(function () {
        b = temp.tratar();
        var mm = temp.getMinutos();
        if (mm < 10) {
            mm = "0" + mm;
        }
        var ss = temp.getSegundos();
        if (ss < 10) {
            ss = "0" + ss;
        }
        document.getElementById("tempM").innerHTML = mm;
        document.getElementById("tempS").innerHTML = ss;
        if (b === false) {
            clearInterval(control);
            penalizacion = true;
            document.getElementById("tempM").style = "color: red";
            document.getElementById("tempS").style = "color: red";
        }
    }, 1000);

    abrirXML();

    document.getElementById("next").onclick = function () {
        next();
    };

    document.getElementById("pre").onclick = function () {
        back();
    };

    document.getElementById("send").onclick = function () {
        send();
    };

    document.getElementById("conf-y").onclick = function () {
        confY();
    };

    document.getElementById("conf-n").onclick = function () {
        confN();
    };
};

function abrirXML() {
    http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            xmlDOC = this.responseXML;
            cargarDatos();
        }
    };
    http.open("GET", "xml/preguntas.xml", true);
    http.send();
}

/**
 * Genera un formulario mediante el contenido del documento XML.
 * @returns {undefined}
 */
function cargarDatos() {
    addForm();
    nroQuestions = xmlDOC.getElementsByTagName("question").length;
    for (var i = 0; i < nroQuestions; i++) {
        tratarQuestion(i);
    }
    initialize();
}

/**
 * Añade un formulario dentro de 'div_a'.
 * @returns {undefined}
 */
function addForm() {
    var div_a = document.getElementById("a");
    form = document.createElement("form");
    div_a.appendChild(form);
    form.id = "exam";
}

/**
 * Tratamiento para cada tag 'question' del formulario.
 * @param {type} i
 * @returns {undefined}
 */
function tratarQuestion(i) {
    var newDiv = addDiv(i);
    addTitle(newDiv, i);
    evaluateType(newDiv, i);
}

/**
 * Crea el div dentro del formulario que contendrá una pregunta.
 * @param {type} i
 * @returns {addDiv.newDiv|Element}
 */
function addDiv(i) {
    var newDiv = document.createElement("div");
    form.appendChild(newDiv);
    newDiv.id = "div" + i;
    newDiv.style = "display: none;";
    return newDiv;
}

/**
 * Añade el tag 'title' dentro del div del tag 'question' correspondiente.
 * @param {Element} div
 * @param {type} i
 * @returns {undefined}
 */
function addTitle(div, i) {
    var p = document.createElement("p");
    div.appendChild(p);
    document.getElementsByTagName("p")[i].innerHTML = xmlDOC.getElementsByTagName("title")[i].innerHTML;
}

/**
 * Evalua el tipo de elemento de cuestionario y realiza un tratamiento específico para cada tipo de elemento.
 * @param {Element} div
 * @param {type} i
 * @returns {undefined}
 */
function evaluateType(div, i) {
    var type = xmlDOC.getElementsByTagName("type")[i].innerHTML;
    switch (type) {
        case CHECKBOX:
            typeCheckbox(div, i);
            break;
        case DATALIST:
            typeDatalist(div, i);
            break;
        case RADIO:
            typeRadio(div, i);
            break;
        case SELECT:
            typeSelect(div, i);
            break;
        case TEXT:
            typeText(div, i);
            break;
    }
}

/**
 * Tratamiento para elementos: CHECKBOX.
 * @param {Element} div
 * @param {type} i
 * @returns {undefined}
 */
function typeCheckbox(div, i) {
    var nroAux = xmlDOC.getElementsByTagName("question")[i].getElementsByTagName("option").length;
    addCheckboxHelp(div);
    var divAux = addDivAux(div);
    for (var j = 0; j < nroAux; j++) {
        addCheckbox(divAux, i, j);
    }
}

/**
 * Añade un texto informativo para completar el formulario.
 * @param {type} div
 * @returns {undefined}
 */
function addCheckboxHelp(div) {
    var label = document.createElement("label");
    label.innerHTML = "(Marca las opciones que creas correctas...)";
    div.appendChild(label);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
}

/**
 * Añade un checkbox por cada opción en el XML.
 * @param {Element} div
 * @param {type} i
 * @param {type} j
 * @returns {undefined}
 */
function addCheckbox(div, i, j) {
    var input = document.createElement("input");
    input.type = "checkbox";
    input.name = "checkbox-" + i;
    input.id = "checkbox_" + i + "_" + j;
    input.className = "check";
    var label = document.createElement("label");
    label.innerHTML = xmlDOC.getElementsByTagName("question")[i].getElementsByTagName("option")[j].innerHTML;
    label.setAttribute("for", "checkbox_" + i + "_" + j);
    label.className = "validate";
    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(document.createElement("br"));
}

/**
 * Tratamiento para elementos: DATALIST.
 * @param {Element} div
 * @param {type} i
 * @returns {undefined}
 */
function typeDatalist(div, i) {
    var nroAux = xmlDOC.getElementsByTagName("question")[i].getElementsByTagName("option").length;
    addDatalistHelp(div);
    var inputDatalist = addDatalistInput(div, i);
    for (var j = 0; j < nroAux; j++) {
        addDatalist(inputDatalist, i, j);
    }
}

/**
 * Añade un texto informativo para completar el formulario.
 * @param {Element} div
 * @returns {undefined}
 */
function addDatalistHelp(div) {
    var label = document.createElement("label");
    label.innerHTML = "(despliega la lista para ver las opciones...)";
    div.appendChild(label);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
}

/**
 * Añade el input list del datalist.
 * @param {Element} div
 * @param {type} i
 * @returns {Element|addDatalistInput.inputDatalist}
 */
function addDatalistInput(div, i) {
    var input = document.createElement("input");
    input.setAttribute("list", "datalist-" + i);
    input.className = "datalist";
    div.appendChild(input);
    var inputDatalist = document.createElement("datalist");
    inputDatalist.id = "datalist-" + i;
    div.appendChild(inputDatalist);
    return inputDatalist;
}

/**
 * Añade un datalist option por cada opción del XML
 * @param {Element} inputDatalist
 * @param {type} i
 * @param {type} j
 * @returns {undefined}
 */
function addDatalist(inputDatalist, i, j) {
    var aux = document.createElement("option");
    aux.value = xmlDOC.getElementsByTagName("question")[i].getElementsByTagName("option")[j].innerHTML;
    aux.className = "datalist-option";
    inputDatalist.appendChild(aux);
}

/**
 * Tratamiento para elementos: RADIO.
 * @param {Element} div
 * @param {type} i
 * @returns {undefined}
 */
function typeRadio(div, i) {
    var nroAux = xmlDOC.getElementsByTagName("question")[i].getElementsByTagName("option").length;
    addRadioHelp(div);
    var divAux = addDivAux(div);
    for (var j = 0; j < nroAux; j++) {
        addRadio(divAux, i, j);
    }
}

function addRadioHelp(div) {
    var label = document.createElement("label");
    label.innerHTML = "(selecciona una única opción...)";
    div.appendChild(label);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
}

function addRadio(div, i, j) {
    var input = document.createElement("input");
    input.type = "radio";
    input.name = "radio-" + i;
    input.id = "radio-" + i + "-" + j;
    input.className = "radio";
    var label = document.createElement("label");
    label.innerHTML = xmlDOC.getElementsByTagName("question")[i].getElementsByTagName("option")[j].innerHTML;
    label.setAttribute("for", "radio-" + i + "-" + j);
    label.className = "validate";
    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(document.createElement("br"));
}

/**
 * Tratamiento para elementos: SELECT.
 * @param {Element} div
 * @param {type} i
 * @returns {undefined}
 */
function typeSelect(div, i) {
    var nroAux = xmlDOC.getElementsByTagName("question")[i].getElementsByTagName("option").length;
    addDatalistHelp(div);
    var inputSelect = addSelectInput(div, i);
    for (var j = 0; j < nroAux; j++) {
        addSelect(inputSelect, i, j);
    }
}

function addSelectInput(div, i) {
    var inputSelect = document.createElement("select");
    inputSelect.id = "select-" + i;
    inputSelect.className = "select";
    div.appendChild(inputSelect);
    var defaultOption = document.createElement("option");
    defaultOption.value = "-1";
    defaultOption.className = "select-option";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    defaultOption.innerHTML = "Selecciona una opción";
    inputSelect.appendChild(defaultOption);
    return inputSelect;
}

function addSelect(inputSelect, i, j) {
    var input = document.createElement("option");
    input.value = xmlDOC.getElementsByTagName("question")[i].getElementsByTagName("option")[j].innerHTML;
    input.innerHTML = xmlDOC.getElementsByTagName("question")[i].getElementsByTagName("option")[j].innerHTML;
    input.className = "select-option";
    inputSelect.appendChild(input);
}

/**
 * Tratamiento para elementos: TEXT.
 * @param {Element} div
 * @param {type} i
 * @returns {undefined}
 */
function typeText(div, i) {
    addTextHelp(div);
    var typeText = document.createElement("input");
    typeText.type = "text";
    typeText.className = "input-text";
    div.appendChild(typeText);
}

function addTextHelp(div) {
    var label = document.createElement("label");
    label.innerHTML = "(escribe la solución sin acentos...)";
    div.appendChild(label);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
}

/**
 * Crea un div auxiliar para alinear los elementos a la izquierda.
 * @param {Element} div
 * @returns {addDivAux.divAux|Element}
 */
function addDivAux(div) {
    var divAux = document.createElement("div");
    divAux.style = "text-align: left;";
    div.appendChild(divAux);
    return divAux;
}

/**
 * Inicializa el número de pregunta del formulario y el su div correspondiente.
 * @returns {undefined}
 */
function initialize() {
    document.getElementById("nroQ").innerHTML = puntero + 1;
    document.getElementById("div" + puntero).style = "display: block;";
}

/**
 * Oculta la pregunta actual y muestra la siguiente en pantalla.
 * En caso de llegar a la última pregunta oculta el botón de siguiente.
 * @returns {undefined}
 */
function next() {
    document.getElementById("div" + puntero).style = "display: none;";
    puntero++;
    initialize();
    if (puntero + 1 == nroQuestions) {
        document.getElementById("next").style = "display: none;";
    }
    document.getElementById("pre").style = "display: block;";
}

/**
 * Oculta la pregunta actual y muestra la anterior en pantalla.
 * En caso de llegar a la primera pregunta oculta el botón de anterior.
 * @returns {undefined}
 */
function back() {
    document.getElementById("div" + puntero).style = "display: none;";
    puntero--;
    initialize();
    if (puntero == 0) {
        document.getElementById("pre").style = "display: none;";
    }
    document.getElementById("next").style = "display: block;";
}

/**
 * Muestra pantalla de confirmación del usuario para enviar el formulario.
 * @returns {undefined}
 */
function send() {
    document.getElementById("a").style = "display: none";
    document.getElementById("b").style = "display: none";
    document.getElementById("confirm").style = "display: block";
}

/**
 * El usuario no ha aceptado enviar el formulario, devuelve la visibilidad del formulario.
 * @returns {undefined}
 */
function confN() {
    document.getElementById("a").style = "display:block";
    document.getElementById("b").style = "display:block";
    document.getElementById("confirm").style = "display: none";
}

/**
 * El usuario ha aceptado enviar el formulario, se realiza el tratamiento de validación.
 * 1. Muestra el div con los resultados.
 * @returns {undefined}
 */
function confY() {
    clearInterval(control);
    var div = document.getElementById("c");
    div.style = "display:block";
    document.getElementById("confirm").style = "display: none";
    //
    for (var i = 0; i < nroQuestions; i++) {
        var auxType = xmlDOC.getElementsByTagName("question")[i].getElementsByTagName("type")[0].innerHTML;
        switch (auxType) {
            case CHECKBOX:
                validateCheckbox(div, i);
                break;
            case DATALIST:
                validateDatalist(div, i);
                break;
            case RADIO:
                validateRadio(div, i);
                break;
            case SELECT:
                validateSelect(div, i);
                break;
            case TEXT:
                validateText(div, i);
                break;
        }
    }
    //
    div.appendChild(document.createElement("br"));
    if (penalizacion) {
        var pen = document.createElement("p");
        pen.innerHTML = "- 1 punto por penalización de tiempo";
        div.appendChild(pen);
        notaFinal--;
    }
    if (notaFinal < 0) {
        notaFinal = 0;
    }
    var h1 = document.createElement("h1");
    h1.innerHTML = "Nota final: " + notaFinal;
    div.appendChild(h1);
    var button = document.createElement("button");
    button.className = "button";
    button.innerHTML = "Inicio";
    button.id = "return";
    div.appendChild(button);
    document.getElementById("return").onclick = function () {
        window.location.href = "index.html";
    };
}

function validateCheckbox(div, i) {
    var id = document.getElementById("div" + i);
    var q = document.createElement("h2");
    var aux = false;
    var aux2 = false;
    var subnota = 0;
    q.innerHTML = "P." + (i + 1);
    div.appendChild(q);
    //
    var checkbox = id.getElementsByTagName("input");
    var label = id.getElementsByTagName("label");
    var answer = xmlDOC.getElementsByTagName("question")[i].getElementsByTagName("answer");
    //
    for (var j = 0; j < answer.length; j++) {
        var showA = document.createElement("p");
        showA.innerHTML = answer[j].innerHTML;
        showA.style = "color: blue";
        div.appendChild(showA);
    }
    //
    for (var j = 0; j < checkbox.length; j++) {
        if (checkbox[j].checked) {
            aux2 = true;
            var p = document.createElement("p");
            p.innerHTML = label[j + 1].innerHTML;
            p.style = "color: red";
            div.appendChild(p);
            aux = false;
            for (var k = 0; k < answer.length; k++) {
                if (answer[k].innerHTML == p.innerHTML) {
                    aux = true;
                    subnota++;
                    p.style = "color: green";
                }
            }
            if (!aux) {
                subnota--;
            }
        }
    }
    if (!aux2) {
        var sinCumpl = document.createElement("p");
        sinCumpl.innerHTML = "Pregunta sin contestar";
        sinCumpl.style = "color: red";
        div.appendChild(sinCumpl);
    }
    var comentario = document.createElement("p");
    if (subnota <= 0) {
        comentario.innerHTML = "0 puntos";
    } else {
        comentario.innerHTML = "+ " + subnota / answer.length + " puntos";
        notaFinal += subnota / answer.length;
    }
    div.appendChild(comentario);
}

function validateDatalist(div, i) {
    var id = document.getElementById("div" + i);
    var q = document.createElement("h2");
    q.innerHTML = "P." + (i + 1);
    div.appendChild(q);
    //
    var showA = document.createElement("p");
    showA.innerHTML = xmlDOC.getElementsByTagName("question")[i].getElementsByTagName("answer")[0].innerHTML;
    showA.style = "color: blue";
    div.appendChild(showA);
    //
    var aux = id.getElementsByTagName("input")[0];
    var answer = xmlDOC.getElementsByTagName("question")[i].getElementsByTagName("answer")[0];
    var p = document.createElement("p");
    p.innerHTML = aux.value;
    div.appendChild(p);
    //
    if (aux.value == "") {
        var sinCumpl = document.createElement("p");
        sinCumpl.innerHTML = "Pregunta sin contestar";
        sinCumpl.style = "color: red";
        div.appendChild(sinCumpl);
    }
    //
    var comentario = document.createElement("p");
    if (aux.value == answer.innerHTML) {
        p.style = "color: green";
        comentario.innerHTML = "+ 1 puntos";
        notaFinal++;
    } else {
        p.style = "color: red";
        comentario.innerHTML = "0 puntos";
    }
    div.appendChild(comentario);
}

function validateRadio(div, i) {
    var id = document.getElementById("div" + i);
    var q = document.createElement("h2");
    q.innerHTML = "P." + (i + 1);
    div.appendChild(q);
    var aux = false;
    var select = id.getElementsByTagName("input");
    var label = id.getElementsByTagName("label");
    var answer = xmlDOC.getElementsByTagName("question")[i].getElementsByTagName("answer");
    for (var j = 0; j < answer.length; j++) {
        var showA = document.createElement("p");
        showA.innerHTML = answer[j].innerHTML;
        showA.style = "color: blue";
        div.appendChild(showA);
    }
    var comentario = document.createElement("p");
    for (var j = 0; j < select.length; j++) {
        if (select[j].checked) {
            aux = true;
            var p = document.createElement("p");
            p.innerHTML = label[j + 1].innerHTML;
            if (p.innerHTML == answer[0].innerHTML) {
                p.style = "color: green";
                comentario.innerHTML = "+ 1 puntos";
                notaFinal++;
            } else {
                p.style = "color: red";
                comentario.innerHTML = "0 puntos";
            }
            div.appendChild(p);
        }
    }
    if (!aux) {
        var sinCumpl = document.createElement("p");
        sinCumpl.innerHTML = "Pregunta sin contestar";
        sinCumpl.style = "color: red";
        div.appendChild(sinCumpl);
        comentario.innerHTML = "0 puntos";
    }
    div.appendChild(comentario);
}

function validateSelect(div, i) {
    var id = document.getElementById("div" + i);
    var q = document.createElement("h2");
    q.innerHTML = "P." + (i + 1);
    div.appendChild(q);
    var aux = id.getElementsByTagName("select")[0];
    var answer = xmlDOC.getElementsByTagName("question")[i].getElementsByTagName("answer")[0];
    var showA = document.createElement("p");
    showA.innerHTML = answer.innerHTML;
    showA.style = "color: blue";
    div.appendChild(showA);
    var p = document.createElement("p");
    var comentario = document.createElement("p");
    if (aux.value == -1) {
        var p = document.createElement("p");
        p.innerHTML = "Pregunta sin contestar";
        p.style = "color: red";
        comentario.innerHTML = "0 puntos";

    } else {
        p.innerHTML = aux.value;
    }
    div.appendChild(p);
    if (aux.value == answer.innerHTML) {
        p.style = "color: green";
        comentario.innerHTML = "+ 1 puntos";
        notaFinal++;
    } else {
        p.style = "color: red";
        comentario.innerHTML = "0 puntos";
    }


    div.appendChild(comentario);
}

function validateText(div, i) {
    var id = document.getElementById("div" + i);
    var q = document.createElement("h2");
    q.innerHTML = "P." + (i + 1);
    div.appendChild(q);
    var answer = xmlDOC.getElementsByTagName("question")[i].getElementsByTagName("answer");
    var showA = document.createElement("p");
    showA.innerHTML = answer[0].innerHTML;
    showA.style = "color: blue";
    div.appendChild(showA);
    var aux = id.getElementsByTagName("input");
    var p = document.createElement("p");
    var comentario = document.createElement("p");
    if (aux[0].value == "") {
        p.innerHTML = "Pregunta sin contestar";
        p.style = "color:red";
        comentario.innerHTML = "0 puntos";
    } else {
        p.innerHTML = aux[0].value;
    }
    if (aux[0].value.toLowerCase() == answer[0].innerHTML.toLowerCase()) {
        p.style = "color:green";
        comentario.innerHTML = "+ 1 puntos";
        notaFinal++;
    } else {
        p.style = "color:red";
        comentario.innerHTML = "0 puntos";
    }
    div.appendChild(p);
    div.appendChild(comentario);
}