function Temporizador(minutos, segundos) {
    this.minutos = minutos;
    this.segundos = segundos;
}

Temporizador.prototype.tratar = function () {
    if (this.getSegundos() >= 0) {
        this.disminuirSegundos();
    }
    if (this.getSegundos() == -1) {
        this.setSegundos(59);
    }
    if ((this.getSegundos() == 0) && (this.getMinutos() == 0)) {
        return false;
    }
    if (this.getSegundos() == 59) {
        this.disminuirMinutos();
    }
    return true;
};

Temporizador.prototype.getMinutos = function () {
    return this.minutos;
};

Temporizador.prototype.setMinutos = function (minutos) {
    this.minutos = minutos;
};

Temporizador.prototype.getSegundos = function () {
    return this.segundos;
};

Temporizador.prototype.setSegundos = function (segundos) {
    this.segundos = segundos;
};

Temporizador.prototype.getCentesimas = function () {
    return this.centesimas;
};

Temporizador.prototype.setCentesimas = function (centesimas) {
    this.centesimas = centesimas;
};

Temporizador.prototype.disminuirMinutos = function () {
    this.minutos--;
};

Temporizador.prototype.disminuirSegundos = function () {
    this.segundos--;
};

Temporizador.prototype.disminuirCentesimas = function () {
    this.centesimas--;
};