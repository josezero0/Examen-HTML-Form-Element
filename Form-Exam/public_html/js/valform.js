var penalizacion = false;
var note = 0;

/**
 * Realiza la validación del formulario para todas las preguntras.
 * @returns {undefined}
 */
function validateForm() {
    var div = document.getElementById("c");
    var question = xmlDOC.getElementsByTagName("question")
    for (var i = 0; i < maxQ; i++) {
        var type = question[i].getElementsByTagName("type")[0];
        switch (type.innerHTML) {
            case CHECKBOX:
                valCheckbox(div, question, i);
                break;
            case DATALIST:
                valDatalist(div, question, i);
                break;
            case RADIO:
                valRadio(div, question, i);
                break;
            case SELECT:
                valSelect(div, question, i);
                break;
            case TEXT:
                valText(div, question, i);
                break;
        }
    }
    showNote(div);
}

/**
 * Valida una pregunta de tipo 'checkbox'.
 * @param {Element} div
 * @param {Element} question
 * @param {Number} num
 * @returns {undefined}
 */
function valCheckbox(div, question, num) {
    var aux1 = false, aux2 = false;
    var subnota = 0;
    var divForm = document.getElementById("div" + num);
    createH2(div, num);
    var checkbox = divForm.getElementsByTagName("input");
    var label = divForm.getElementsByTagName("label");
    var xmlAnswer = question[num].getElementsByTagName("answer");
    for (var i = 0; i < xmlAnswer.length; i++) {
        createAnswer(div, xmlAnswer, i);
    }
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            aux1 = false, aux2 = true;
            var p = createAnswerLabel(div, label, i);
            for (var j = 0; j < xmlAnswer.length; j++) {
                if (xmlAnswer[j].innerHTML == label[i].innerHTML) {
                    aux1 = true;
                    subnota++;
                    p.style = "color: green";
                }
            }
            if (!aux1) {
                subnota--;
            }
        }
    }
    if (!aux2) {
        createSinCumplimentar(div);
    }
    if (subnota <= 0) {
        createComentario(div, "0 puntos");
    } else {
        createComentario(div, "+ " + (subnota / xmlAnswer.length) + " puntos");
        note += subnota / xmlAnswer.length;
    }
}

/**
 * Valida una pregunta de tipo 'datalist'.
 * @param {Element} div
 * @param {Element} question
 * @param {Number} num
 * @returns {undefined}
 */
function valDatalist(div, question, num) {
    var divForm = document.getElementById("div" + num);
    createH2(div, num);
    var input = divForm.getElementsByTagName("input");
    var xmlAnswer = question[num].getElementsByTagName("answer");
    for (var i = 0; i < xmlAnswer.length; i++) {
        createAnswer(div, xmlAnswer, i);
    }
    var p = createAnswerInput(div, input);
    if (input[0].value == "") {
        createSinCumplimentar(div);
    }
    if (input[0].value == xmlAnswer[0].innerHTML) {
        createComentario(div, "+ 1 puntos");
        p.style = "color: green";
        note++;
    } else {
        createComentario(div, "0 puntos");
    }
}

/**
 * Valida una pregunta de tipo 'radio'.
 * @param {Element} div
 * @param {Element} question
 * @param {Number} num
 * @returns {undefined}
 */
function valRadio(div, question, num) {
    var aux1 = false, aux2 = false;
    var divForm = document.getElementById("div" + num);
    createH2(div, num);
    var radio = divForm.getElementsByTagName("input");
    var label = divForm.getElementsByTagName("label");
    var xmlAnswer = question[num].getElementsByTagName("answer");
    for (var i = 0; i < xmlAnswer.length; i++) {
        createAnswer(div, xmlAnswer, i);
    }
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            aux1 = true;
            var p = createAnswerLabel(div, label, i);
            for (var j = 0; j < xmlAnswer.length; j++) {
                if (xmlAnswer[j].innerHTML == label[i].innerHTML) {
                    aux2 = true;
                    p.style = "color: green";
                    createComentario(div, "+ 1 puntos");
                    note++;
                }
            }
            if (!aux2) {
                createComentario(div, "0 puntos");
            }
        }
    }
    if (!aux1) {
        createSinCumplimentar(div);
        createComentario(div, "0 puntos");
    }
}

/**
 * Valida una pregunta de tipo 'select'.
 * @param {Element} div
 * @param {Element} question
 * @param {Number} num
 * @returns {undefined}
 */
function valSelect(div, question, num) {
    var divForm = document.getElementById("div" + num);
    createH2(div, num);
    var select = divForm.getElementsByTagName("select");
    var xmlAnswer = question[num].getElementsByTagName("answer");
    for (var i = 0; i < xmlAnswer.length; i++) {
        createAnswer(div, xmlAnswer, i);
    }
    if (select[0].value == -1) {
        createSinCumplimentar(div);
    } else {
        var p = createAnswerInput(div, select);
    }
    if (select[0].value == xmlAnswer[0].innerHTML) {
        p.style = "color: green";
        createComentario(div, "+ 1 puntos");
        note++;
    } else {
        createComentario(div, "0 puntos");
    }
}

/**
 * Valida una pregunta de tipo 'text'.
 * @param {Element} div
 * @param {Element} question
 * @param {Number} num
 * @returns {undefined}
 */
function valText(div, question, num) {
    var divForm = document.getElementById("div" + num);
    createH2(div, num);
    var xmlAnswer = question[num].getElementsByTagName("answer");
    for (var i = 0; i < xmlAnswer.length; i++) {
        createAnswer(div, xmlAnswer, i);
    }
    var input = divForm.getElementsByTagName("input");

    if (input[0].value == "") {
        createSinCumplimentar(div);
    } else {
        var p = createAnswerInput(div, input);
    }
    if (input[0].value.toLowerCase() == xmlAnswer[0].innerHTML.toLowerCase()) {
        p.style = "color: green";
        createComentario(div, "+ 1 puntos");
        note++;
    } else {
        createComentario(div, "0 puntos");
    }
}

/**
 * Muestra la nota final y el botón para volver al inicio.
 * @param {type} div
 * @returns {undefined}
 */
function showNote(div) {
    div.appendChild(document.createElement("br"));
    if (penalizacion) {
        createPenalizacion(div);
        note--;
    }
    if (note < 0) {
        note = 0;
    }
    createNote(div);
    div.appendChild(document.createElement("br"));
    createIndexButton(div);
    div.appendChild(document.createElement("br"));
}

/**
 * Crea un elemento 'h2' con el número de la pregunta que se está corrigiendo.
 * @param {Element} div
 * @param {Number} num
 * @returns {undefined}
 */
function createH2(div, num) {
    h2 = document.createElement("h2");
    h2.innerHTML = "P." + (num + 1);
    div.appendChild(h2);
}

/**
 * Muestra la respuesta de una pregunta.
 * @param {Element} div
 * @param {Element} answer
 * @param {Number} num
 * @returns {undefined}
 */
function createAnswer(div, answer, num) {
    var p = document.createElement("p");
    p.innerHTML = answer[num].innerHTML;
    p.style = "color: blue";
    div.appendChild(p);
}

/**
 * Crea un elemento 'p' con la respuesta dada por el usuario (label).
 * @param {Element} div
 * @param {Element} label
 * @param {Number} i
 * @returns {createAnswerLabel.p|Element}
 */
function createAnswerLabel(div, label, i) {
    var p = document.createElement("p");
    p.innerHTML = label[i].innerHTML;
    p.style = "color: red";
    div.appendChild(p);
    return p;
}

/**
 * Crea un elemento 'p' con la respuesta dada por el usuario (input).
 * @param {Element} div
 * @param {Element} input
 * @returns {Element|createAnswerInput.p}
 */
function createAnswerInput(div, input) {
    var p = document.createElement("p");
    p.innerHTML = input[0].value;
    p.style = "color: red";
    div.appendChild(p);
    return p;
}

/**
 * Crea un elemento 'p' cuando no se ha cumplimentado una pregunnta.
 * @param {Element} div
 * @returns {undefined}
 */
function createSinCumplimentar(div) {
    var p = document.createElement("p");
    p.innerHTML = "Pregunta sin contestar";
    p.style = "color: red";
    div.appendChild(p);
}
/**
 * Crea un comentario sobre los puntos obtenidos en una pregunta.
 * @param {type} div
 * @param {type} msg
 * @returns {undefined}
 */
function createComentario(div, msg) {
    var p = document.createElement("p");
    p.innerHTML = msg;
    div.appendChild(p);
}

/**
 * Crea mensaje de penalización por tiempo.
 * @param {Element} div
 * @returns {undefined}
 */
function createPenalizacion(div) {
    var p = document.createElement("p");
    p.innerHTML = "- 1 puntos por penalización de tiempo";
    p.style = "color: red";
    div.appendChild(p);
}

/**
 * Crea mensaje de nota final.
 * @param {Element} div
 * @returns {undefined}
 */
function createNote(div) {
    var h1 = document.createElement("h1");
    h1.innerHTML = "Nota: " + note.toFixed(2);
    div.appendChild(h1);
}

/**
 * Crea el botón para volver al inicio.
 * @param {Element} div
 * @returns {undefined}
 */
function createIndexButton(div) {
    var button = document.createElement("button");
    button.className = "button";
    button.innerHTML = "INICIO";
    button.id = "btnIndex";
    var divCenter = document.createElement("div");
    divCenter.style = "text-align: center";
    div.appendChild(divCenter);
    divCenter.appendChild(button);
    document.getElementById("btnIndex").onclick = function () {
        window.location.href = "index.html";
    };
}