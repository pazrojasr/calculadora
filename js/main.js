let primerOperando = "";
let segundoOperando = "";
let operacionActual = null;
let reiniciarPantalla = false;

const botonesNumeros = document.querySelectorAll("[data-number]");
const botonesOperadores = document.querySelectorAll("[data-operator]");
const botonIgual = document.getElementById("equalsBtn");
const botonLimpiar = document.getElementById("clearBtn");
const botonBorrar = document.getElementById("deleteBtn");
const botonPunto = document.getElementById("pointBtn");
const pantallaUltimaOperacion = document.getElementById("lastOperationScreen");
const pantallaOperacionActual = document.getElementById(
  "currentOperationScreen"
);

window.addEventListener("keydown", manejarEntradaTeclado);
botonIgual.addEventListener("click", evaluar);
botonLimpiar.addEventListener("click", limpiar);
botonBorrar.addEventListener("click", borrarNumero);
botonPunto.addEventListener("click", agregarPunto);

botonesNumeros.forEach((boton) =>
  boton.addEventListener("click", () => agregarNumero(boton.textContent))
);

botonesOperadores.forEach((boton) =>
  boton.addEventListener("click", () => establecerOperacion(boton.textContent))
);

function agregarNumero(numero) {
  if (pantallaOperacionActual.textContent === "0" || reiniciarPantalla)
    reiniciarPantallaPantalla();
  pantallaOperacionActual.textContent += numero;
}

function reiniciarPantallaPantalla() {
  pantallaOperacionActual.textContent = "";
  reiniciarPantalla = false;
}

function limpiar() {
  pantallaOperacionActual.textContent = "0";
  pantallaUltimaOperacion.textContent = "";
  primerOperando = "";
  segundoOperando = "";
  operacionActual = null;
}

function agregarPunto() {
  if (reiniciarPantalla) reiniciarPantallaPantalla();
  if (pantallaOperacionActual.textContent === "")
    pantallaOperacionActual.textContent = "0";
  if (pantallaOperacionActual.textContent.includes(".")) return;
  pantallaOperacionActual.textContent += ".";
}

function borrarNumero() {
  pantallaOperacionActual.textContent = pantallaOperacionActual.textContent
    .toString()
    .slice(0, -1);
}

function establecerOperacion(operador) {
  if (operacionActual !== null) evaluar();
  primerOperando = pantallaOperacionActual.textContent;
  operacionActual = operador;
  pantallaUltimaOperacion.textContent = `${primerOperando} ${operacionActual}`;
  reiniciarPantalla = true;
}

function evaluar() {
  if (operacionActual === null || reiniciarPantalla) return;
  if (operacionActual === "÷" && pantallaOperacionActual.textContent === "0") {
    alert("¡No puedes dividir entre 0!");
    return;
  }
  segundoOperando = pantallaOperacionActual.textContent;
  pantallaOperacionActual.textContent = redondearResultado(
    realizarOperacion(operacionActual, primerOperando, segundoOperando)
  );
  pantallaUltimaOperacion.textContent = `${primerOperando} ${operacionActual} ${segundoOperando} =`;
  operacionActual = null;
}

function redondearResultado(numero) {
  return Math.round(numero * 1000) / 1000;
}

function manejarEntradaTeclado(e) {
  if (e.key >= 0 && e.key <= 9) agregarNumero(e.key);
  if (e.key === ".") agregarPunto();
  if (e.key === "=" || e.key === "Enter") evaluar();
  if (e.key === "Backspace") borrarNumero();
  if (e.key === "Escape") limpiar();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    establecerOperacion(convertirOperador(e.key));
}

function convertirOperador(operadorTeclado) {
  if (operadorTeclado === "/") return "÷";
  if (operadorTeclado === "*") return "×";
  if (operadorTeclado === "-") return "−";
  if (operadorTeclado === "+") return "+";
}

function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
  return a - b;
}

function multiplicar(a, b) {
  return a * b;
}

function dividir(a, b) {
  return a / b;
}

function realizarOperacion(operador, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operador) {
    case "+":
      return sumar(a, b);
    case "−":
      return restar(a, b);
    case "×":
      return multiplicar(a, b);
    case "÷":
      if (b === 0) return null;
      else return dividir(a, b);
    default:
      return null;
  }
}
