var pointer = 0;
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;
var totalX = 0;
var totalY = 0;

/**
 * Al cargar la página...
 * 1. Abrir y gestional el XML.
 * 2. Añade los eventos de paginación.
 * 3. Añade el evento para enviar el formulario.
 * 4. Añade la paginación para móviles (touchstart/touchend).
 * 5. Añade el temporizador (20min).
 * @returns {undefined}
 */
window.onload = function () {
    openXML();
    document.getElementById("btnA").onclick = function () {
        btnA();
    };
    document.getElementById("btnZ").onclick = function () {
        btnZ();
    };
    document.getElementById("send").onclick = function () {
        confirm();
    };
    document.getElementById("conf-y").onclick = function () {
        confirmYes();
    };
    document.getElementById("conf-n").onclick = function () {
        confirmNo();
    };
    document.getElementById("a").addEventListener('touchstart', function (evt) {
        saveStart(evt);
    }, false);
    document.getElementById("a").addEventListener('touchend', function (evt) {
        saveEnd(evt);
        compute();
        evaluate();
    }, false);
    var temp = new Temporizador(20, 0);
    control = setInterval(function () {
        if (temp.tratar()) {
            var min = temp.getMinutos();
            var seg = temp.getSegundos();
            if (min < 10) {
                min = "0" + min;
            }
            if (seg < 10) {
                seg = "0" + seg;
            }
            document.getElementById("min").innerHTML = min;
            document.getElementById("seg").innerHTML = seg;
        } else {
            penalizacion = true;
            document.getElementById("min").innerHTML = "00";
            document.getElementById("seg").innerHTML = "00";
            document.getElementById("min").style = "color: red";
            document.getElementById("seg").style = "color: red";
            clearInterval(control);
        }
    }, 1000);
};

/**
 * Pagina al div anterior.
 * @returns {undefined}
 */
function btnA() {
    hidePointer();
    substractPointer();
    showPointer();
}

/**
 * Pagina al siguiente div.
 * @returns {undefined}
 */
function btnZ() {
    hidePointer();
    addPointer();
    showPointer();
}

/**
 * Oculta el div al que apunta el puntero.
 * @returns {undefined}
 */
function hidePointer() {
    document.getElementById("div" + pointer).style = "display: none";
}

/**
 * Muestra el div al que apunta el puntero.
 * @returns {undefined}
 */
function showPointer() {
    document.getElementById("div" + pointer).style = "display: block";
    document.getElementById("nroQ").innerHTML = pointer + 1;
}

/**
 * Suma 1 al puntero.
 * Si es el último div, oculta el botón 'siguiente'.
 * @returns {undefined}
 */
function addPointer() {
    pointer++;
    if (pointer == maxQ - 1) {
        document.getElementById("btnZ").style = "display: none";
    }
    document.getElementById("btnA").style = "display: block";
}

/**
 * Resta 1 al puntero.
 * Si es el primer div, oculta el botón 'anterior'.
 * @returns {undefined}
 */
function substractPointer() {
    pointer--;
    if (pointer == 0) {
        document.getElementById("btnA").style = "display: none";
    }
    document.getElementById("btnZ").style = "display: block";
}

/**
 * Solicita una confirmación para enviar el formulario.
 * @returns {undefined}
 */
function confirm() {
    document.getElementById("a").style = "display: none";
    document.getElementById("b").style = "display: none";
    document.getElementById("confirm").style = "display: block";
}

/**
 * El usuario confirma el envío del examen, para el tiempo y ejecuta la corrección.
 * @returns {undefined}
 */
function confirmYes() {
    document.getElementById("confirm").style = "display: none";
    document.getElementById("c").style = "display: block";
    clearInterval(control);
    document.getElementsByTagName("header")[0].getElementsByTagName("h1")[0].innerHTML = "Corrección examen";
    validateForm();
}

/**
 * El usuario no quiere enviar el formulario, vuelve a mostras el examen.
 * @returns {undefined}
 */
function confirmNo() {
    document.getElementById("a").style = "display: block";
    document.getElementById("b").style = "display: block";
    document.getElementById("confirm").style = "display: none";
}

/**
 * Guarda las coordenadas del touchstart.
 * @param {Event} evt
 * @returns {undefined}
 */
function saveStart(evt) {
    startX = evt.changedTouches[0].pageX;
    startY = evt.changedTouches[0].pageY;
}

/**
 * Guarda las coordenadas del touchend.
 * @param {Event} evt
 * @returns {undefined}
 */
function saveEnd(evt) {
    endX = evt.changedTouches[0].pageX;
    endY = evt.changedTouches[0].pageY;
}

/**
 * Calcula la distancia de las coordenadas totales.
 * @returns {undefined}
 */
function compute() {
    totalX = startX - endX;
    totalY = startY - endY;
}

/**
 * Evalua si puede paginar al siguiente div o al anterior.
 * @returns {undefined}
 */
function evaluate() {
    if (totalX > 150 && totalY < 15 && totalY > -15) {
        if (pointer < (maxQ - 1)) {
            btnZ();
        }
    }
    if (totalX < -150 && totalY < 15 && totalY > -15) {
        if (pointer > 0) {
            btnA();
        }
    }
}

/**
 * Tratamiento del temporizador.
 * @param {Temporizador} temp
 * @returns {undefined}
 */
function tratarTemp(temp) {

}