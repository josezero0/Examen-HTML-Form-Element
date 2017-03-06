function Temporizador(minutos, segundos, centesimas) {
    this.minutos = minutos;
    this.segundos = segundos;
    this.centesimas = centesimas;
}

Temporizador.prototype.tratar = function () {
    if (this.getCentesimas() > 0) {
        this.disminuirCentesimas();
    }
    if ((this.getCentesimas() == 0) && (this.getSegundos() == 0) && (this.getMinutos() == 0)) {
        return false;
    }
    if (this.getCentesimas() == 0) {
        this.setCentesimas(100);
    }
    if (this.getCentesimas() == 99) {
        this.disminuirSegundos();
        if (this.getSegundos() == -1) {
            this.setSegundos(59);
        }
    }
    if ((this.getSegundos() == 59) && (this.getCentesimas() == 99)) {
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