//Constantes
var CHECKBOX = "checkbox";
var DATALIST = "datalist";
var RADIO = "radio";
var SELECT = "select";
var TEXT = "text";
//Variables XML
var http = null;
var xmlDOC = null;
//Variables HTML
var contenedor = null;
var form = null;
var maxQ = 0;

/**
 * Abre el XML y carga los datos en el HTML.
 * @returns {undefined}
 */
function openXML() {
    http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("loaded xml");
            xmlDOC = this.responseXML;
            loadXML();
        }
    };
    http.open("GET", "xml/preguntas.xml", true);
    http.send();
}

/**
 * 1. Obtener el div que contendrá el formulario.
 * 2. Crear el formulario y lo añade al div contenedor.
 * 3. Obtiene el número de preguntas del formulario.
 * @returns {undefined}
 */
function loadXML() {
    getContainer();
    createForm();
    getQuestionLength();
    for (var i = 0; i < maxQ; i++) {
        loadQuestion(i);
    }
    setMaxQ();
    showPointer();
}

/**
 * Obtiene el div que hará de contenedor del formulario.
 * @returns {undefined}
 */
function getContainer() {
    contenedor = document.getElementById("a");
}

/**
 * Crea el formulario y lo añade dentro del contenedor.
 * @returns {undefined}
 */
function createForm() {
    form = document.createElement("form");
    contenedor.appendChild(form);
}

/**
 * Obtiene el número de preguntas del questionario.
 * @returns {undefined}
 */
function getQuestionLength() {
    maxQ = xmlDOC.getElementsByTagName("question").length;
}

/**
 * Carga un elemento 'question' del xml:
 * 1. Crea el div contenedor de la pregunta.
 * 2. Añade el título de la pregunta.
 * 3. Crea los elementos de formulario a corte al tipo de elemento que indique el xml.
 * @param {Number} num
 * @returns {undefined}
 */
function loadQuestion(num) {
    var question = xmlDOC.getElementsByTagName("question")[num];
    var div = createDiv(num);
    addTitle(div, question);
    evaluateType(div, question, num);
}

/**
 * Establece en la cabecera del examen en número máximo de preguntas del formulario.
 * @returns {undefined}
 */
function setMaxQ() {
    document.getElementById("maxQ").innerHTML = maxQ;
}

/**
 * Crea un elemento 'div$', dónde $ indica el índice de la pregunta en el XML.
 * @param {Number} num
 * @returns {createDiv.div|Element}
 */
function createDiv(num) {
    var div = document.createElement("div");
    div.id = "div" + num;
    div.className = "vertical";
    div.style = "display: none";
    form.appendChild(div);
    return div;
}

/**
 * 
 * @param {Element} div
 * @param {Element} question
 * @returns {undefined}
 */
function addTitle(div, question) {
    var p = document.createElement("p");
    p.innerHTML = question.getElementsByTagName("title")[0].innerHTML;
    div.appendChild(p);
}

/**
 * Crea los elementos de formulario necesarios a corde con el tipo que indique el xml.
 * @param {Element} div
 * @param {Element} question
 * @param {Number} num
 * @returns {undefined}
 */
function evaluateType(div, question, num) {
    var type = question.getElementsByTagName("type")[0].innerHTML;
    switch (type) {
        case CHECKBOX:
            isCheckbox(div, question, num);
            break;
        case DATALIST:
            isDatalist(div, question, num);
            break;
        case RADIO:
            isRadio(div, question, num);
            break;
        case SELECT:
            isSelect(div, question, num);
            break;
        case TEXT:
            isText(div);
            break;
    }
}

/**
 * Tratamiento para generar una pregunta de tipo 'checkbox'.
 * @param {Element} div
 * @param {Element} question
 * @param {Number} num
 * @returns {undefined}
 */
function isCheckbox(div, question, num) {
    var option = getOption(question);
    addHelp(div, CHECKBOX);
    var aux = createDivAux(div);
    for (var i = 0; i < option.length; i++) {
        createCheckbox(aux, option, i, num);
    }
    aux.appendChild(document.createElement("br"));
}

/**
 * Tratamiento para generar una pregunta de tipo 'datalist'.
 * @param {Element} div
 * @param {Element} question
 * @param {Element} num
 * @returns {undefined}
 */
function isDatalist(div, question, num) {
    var option = getOption(question);
    addHelp(div, DATALIST);
    var datalist = createInputDatalist(div, num);
    for (var i = 0; i < option.length; i++) {
        createOptionDatalist(datalist, option, i);
    }
    div.appendChild(document.createElement("br"));
}

/**
 * Tratamiento para generar una pregunta de tipo 'radio'.
 * @param {Element} div
 * @param {Element} question
 * @param {Number} num
 * @returns {undefined}
 */
function isRadio(div, question, num) {
    var option = getOption(question);
    addHelp(div, RADIO);
    var aux = createDivAux(div);
    for (var i = 0; i < option.length; i++) {
        createRadio(aux, option, i, num);
    }
    aux.appendChild(document.createElement("br"));
}

/**
 * Tratamiento para generar una pregunta de tipo 'select'.
 * @param {Element} div
 * @param {Element} question
 * @param {Number} num
 * @returns {undefined}
 */
function isSelect(div, question, num) {
    var option = getOption(question);
    addHelp(div, SELECT);
    var select = createInputSelect(div, num);
    for (var i = 0; i < option.length; i++) {
        createOptionSelect(select, option, i);
    }
    div.appendChild(document.createElement("br"));
}

/**
 * Tratamiento para generar una pregunta de tipo 'text'.
 * @param {Element} div
 * @returns {undefined}
 */
function isText(div) {
    addHelp(div, TEXT);
    createText(div);
    div.appendChild(document.createElement("br"));
}

/**
 * Obtiene el conjunto de opciones de una pregunta.
 * @param {Element} question
 * @returns {Elements}
 */
function getOption(question) {
    return question.getElementsByTagName("option");
}

/**
 * Crea un elemento 'p' con instrucciones según el tipo de elemento.
 * @param {Element} div
 * @param {String} type
 * @returns {undefined}
 */
function addHelp(div, type) {
    var p = document.createElement("p");
    switch (type) {
        case CHECKBOX:
            p.innerHTML = "(Marca las opciones que creas correctas...)";
            break;
        case DATALIST:
            p.innerHTML = "(Despliega las opcionnes/escribe la solución(de la lista)...)";
            break;
        case RADIO:
            p.innerHTML = "(Selecciona una única opción...)";
            break;
        case SELECT:
            p.innerHTML = "(Despliega la lista para ver las opciones...)";
            break;
        case TEXT:
            p.innerHTML = "(Escribe la solución sin acentos...)";
            break;
    }
    div.appendChild(p);
}

/**
 * Crea un div auxiliar para alinear a la izquierda los elementos interiores.
 * @param {Element} div
 * @returns {Element|createDivAux.aux}
 */
function createDivAux(div) {
    var aux = document.createElement("div");
    aux.style = "text-align: left";
    div.appendChild(aux);
    return aux;
}

/**
 * Crea un elemento checkbox dentro del div auxiliar.
 * @param {Element} aux
 * @param {Element} option
 * @param {Number} i
 * @param {Number} num
 * @returns {undefined}
 */
function createCheckbox(aux, option, i, num) {
    var input = document.createElement("input");
    input.type = "checkbox";
    input.name = "checkbox-" + num;
    input.id = "checkbox_" + num + "_" + i;
    input.className = "checkbox";
    var label = document.createElement("label");
    label.innerHTML = option[i].innerHTML;
    label.setAttribute("for", "checkbox_" + num + "_" + i);
    label.className = "validate";
    aux.appendChild(input);
    aux.appendChild(label);
    aux.appendChild(document.createElement("br"));
}

/**
 * Crea el input list 'datalist'.
 * @param {Element} div
 * @param {Number} num
 * @returns {undefined}
 */
function createInputDatalist(div, num) {
    var input = document.createElement("input");
    input.setAttribute("list", "datalist-" + num);
    input.className = "datalist";
    div.appendChild(input);
    var datalist = document.createElement("datalist");
    datalist.id = "datalist-" + num;
    div.appendChild(datalist);
    return datalist;
}

/**
 * Crea una opción del datalist.
 * @param {Element} div
 * @param {Element} option
 * @param {Number} i
 * @returns {undefined}
 */
function createOptionDatalist(div, option, i) {
    var aux = document.createElement("option");
    aux.value = option[i].innerHTML;
    aux.className = "datalist-option";
    div.appendChild(aux);
}

/**
 * Crea un elemento radio dentro del div auxiliar.
 * @param {Element} aux
 * @param {Element} option
 * @param {Number} i
 * @param {Number} num
 * @returns {undefined}
 */
function createRadio(aux, option, i, num) {
    var input = document.createElement("input");
    input.type = "radio";
    input.name = "radio-" + num;
    input.id = "radio_" + num + "_" + i;
    input.className = "radio";
    var label = document.createElement("label");
    label.innerHTML = option[i].innerHTML;
    label.setAttribute("for", "radio_" + num + "_" + i);
    label.className = "validate";
    aux.appendChild(input);
    aux.appendChild(label);
    aux.appendChild(document.createElement("br"));
}

/**
 * Crea el elemento select y añade la opción por defecto.
 * @param {Element} div
 * @param {Element} num
 * @returns {createInputSelect.input|Element}
 */
function createInputSelect(div, num) {
    var input = document.createElement("select");
    input.id = "select-" + num;
    input.className = "select";
    div.appendChild(input);
    var defaultOption = document.createElement("option");
    defaultOption.value = "-1";
    defaultOption.className = "select-option";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    defaultOption.innerHTML = "Selecciona una opción";
    input.appendChild(defaultOption);
    return input;
}

/**
 * Crea una opción del select.
 * @param {Element} select
 * @param {Element} option
 * @param {Number} i
 * @returns {undefined}
 */
function createOptionSelect(select, option, i) {
    var aux = document.createElement("option");
    aux.value = option[i].innerHTML;
    aux.innerHTML = option[i].innerHTML;
    aux.className = "select-option";
    select.appendChild(aux);
}

/**
 * Crea un text field.
 * @param {Element} div
 * @returns {undefined}
 */
function createText(div) {
    var input = document.createElement("input");
    input.type = "text";
    input.className = "input-text";
    div.appendChild(input);
}