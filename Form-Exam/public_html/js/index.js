/**
 * Al cargar la página...
 * 1. Al hacer click en el botón 'empezar' se irá a la página del exeman.
 * @returns {undefined}
 */
window.onload = function () {
    document.getElementsByClassName("button")[0].onclick = function () {
        window.location.href = "exam.html";
    };
};