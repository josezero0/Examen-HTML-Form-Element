/**
 * Constructor para crear un objeto de tipo 'Temporizador'.
 * @param {Number} minutos
 * @param {Number} segundos
 * @returns {Temporizador}
 */
function Temporizador(minutos, segundos) {
    this.minutos = minutos;
    this.segundos = segundos;
}

/**
 * Cada segundo se ha de ejecutar el tratar para restar un segundo.
 * Si no ha llegado a 0 el temporizador devuelve true.
 * Si ha llegado a 0 el temporizador devuelve false.
 * @returns {Boolean}
 */
Temporizador.prototype.tratar = function () {
    //Si no es segundo 0, restamos 1 segundo
    if (this.getSegundos() >= 0) {
        this.disminuirSegundos();
    }
    //Si el segundo es -1, reseteamos los segundos (59)
    if (this.getSegundos() === -1) {
        this.setSegundos(59);
    }
    //Si el temporizador llega a 0
    if ((this.getSegundos() === 0) && (this.getMinutos() === 0)) {
        return false;
    }
    //Si el segundo es 59, restamos 1 minuto
    if (this.getSegundos() === 59) {
        this.disminuirMinutos();
    }
    return true; //No ha llegado a 0
};

/**
 * Obitiene los minutos restantes del temporizador.
 * @returns {Number}
 */
Temporizador.prototype.getMinutos = function () {
    return this.minutos;
};

/**
 * Esteblece los minutos restantes al temporizador.
 * @param {Number} minutos
 * @returns {undefined}
 */
Temporizador.prototype.setMinutos = function (minutos) {
    this.minutos = minutos;
};

/**
 * Obtiene los segundos restantes del temporizador.
 * @returns {Number}
 */
Temporizador.prototype.getSegundos = function () {
    return this.segundos;
};

/**
 * Establece los segundos restantes al temporizador.
 * @param {Number} segundos
 * @returns {undefined}
 */
Temporizador.prototype.setSegundos = function (segundos) {
    this.segundos = segundos;
};

/**
 * Resta 1 a los minutos.
 * @returns {undefined}
 */
Temporizador.prototype.disminuirMinutos = function () {
    this.minutos--;
};

/**
 * Resta 1 a los segundos.
 * @returns {undefined}
 */
Temporizador.prototype.disminuirSegundos = function () {
    this.segundos--;
};