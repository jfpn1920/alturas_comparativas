//----------------------------------------//
//--|funcionalidad_alturas_comparativas|--//
//----------------------------------------//
const nombre_uno = document.getElementById("nombre_uno");
const altura_uno = document.getElementById("altura_uno");
const nombre_dos = document.getElementById("nombre_dos");
const altura_dos = document.getElementById("altura_dos");
const boton_comparar = document.getElementById("boton_comparar");
const boton_limpiar = document.getElementById("boton_limpiar");
const boton_borrar_historial = document.getElementById("boton_borrar_historial");
const mensaje_resultado = document.getElementById("mensaje_resultado");
const altura_mayor = document.getElementById("altura_mayor");
const diferencia_alturas = document.getElementById("diferencia_alturas");
const lista_historial = document.getElementById("lista_historial");
let historial_alturas = [];
//----------------------------//
//--|cargar_datos_guardados|--//
//----------------------------//
function cargar_datos() {
    const datos_guardados = localStorage.getItem("datos_alturas");
    if (!datos_guardados) {
        return;
    }
    try {
        const datos = JSON.parse(datos_guardados);
        nombre_uno.value = datos.nombre_uno || "";
        altura_uno.value = datos.altura_uno || "";
        nombre_dos.value = datos.nombre_dos || "";
        altura_dos.value = datos.altura_dos || "";
    } catch (error) {
        localStorage.removeItem("datos_alturas");
    }
}
function guardar_datos() {
    const datos = {
        nombre_uno: nombre_uno.value,
        altura_uno: altura_uno.value,
        nombre_dos: nombre_dos.value,
        altura_dos: altura_dos.value
    };
    localStorage.setItem("datos_alturas", JSON.stringify(datos));
}
//----------------------//
//--|comparar_alturas|--//
//----------------------//
function comparar_alturas() {
    const nombre1 = nombre_uno.value.trim() || "Persona 1";
    const nombre2 = nombre_dos.value.trim() || "Persona 2";
    const altura1 = Number(altura_uno.value);
    const altura2 = Number(altura_dos.value);
    if (altura_uno.value.trim() === "" || altura_dos.value.trim() === "") {
        mensaje_resultado.textContent = "Ingresa la altura de ambas personas.";
        altura_mayor.textContent = "-";
        diferencia_alturas.textContent = "-";
        return;
    }
    if (!Number.isFinite(altura1) || !Number.isFinite(altura2) || altura1 <= 0 || altura2 <= 0) {
        mensaje_resultado.textContent = "Ingresa alturas válidas mayores que cero.";
        altura_mayor.textContent = "-";
        diferencia_alturas.textContent = "-";
        return;
    }
    const diferencia = Math.abs(altura1 - altura2);
    let mayor;
    if (altura1 > altura2) {
        mayor = nombre1;
        mensaje_resultado.textContent = nombre1 + " es más alto.";
    } else if (altura2 > altura1) {
        mayor = nombre2;
        mensaje_resultado.textContent = nombre2 + " es más alto.";
    } else {
        mayor = "Misma altura";
        mensaje_resultado.textContent = "Ambas personas tienen la misma altura.";
    }
    altura_mayor.textContent = mayor;
    diferencia_alturas.textContent = diferencia + " cm";
    guardar_datos();
    guardar_comparacion(nombre1, altura1, nombre2, altura2, mayor, diferencia);
}
//-------------------------//
//--|guardar_comparacion|--//
//-------------------------//
function guardar_comparacion(nombre1, altura1, nombre2, altura2, mayor, diferencia) {
    const comparacion = {
        nombre1: nombre1,
        altura1: altura1,
        nombre2: nombre2,
        altura2: altura2,
        mayor: mayor,
        diferencia: diferencia
    };
    historial_alturas.unshift(comparacion);
    historial_alturas = historial_alturas.slice(0, 10);
    localStorage.setItem("historial_alturas", JSON.stringify(historial_alturas));
    mostrar_historial();
}
//-----------------------//
//--|mostrar_historial|--//
//-----------------------//
function mostrar_historial() {
    lista_historial.innerHTML = "";
    if (historial_alturas.length === 0) {
        const elemento = document.createElement("li");
        elemento.textContent = "No hay comparaciones guardadas.";
        lista_historial.appendChild(elemento);
        return;
    }
    historial_alturas.forEach(function(comparacion) {
        const elemento = document.createElement("li");
        elemento.textContent = comparacion.nombre1 + " (" + comparacion.altura1 + " cm) vs " + comparacion.nombre2 + " (" + comparacion.altura2 + " cm) — " + comparacion.diferencia + " cm de diferencia";
        lista_historial.appendChild(elemento);
    });
}
//--------------------//
//--|limpiar_campos|--//
//--------------------//
function limpiar_campos() {
    nombre_uno.value = "";
    altura_uno.value = "";
    nombre_dos.value = "";
    altura_dos.value = "";
    mensaje_resultado.textContent = "Ingresa las alturas para realizar la comparación.";
    altura_mayor.textContent = "-";
    diferencia_alturas.textContent = "-";
    localStorage.removeItem("datos_alturas");
}
function borrar_historial() {
    historial_alturas = [];
    localStorage.removeItem("historial_alturas");
    mostrar_historial();
}
//----------------------------//
//--|eventos_de_los_botones|--//
//----------------------------//
boton_comparar.addEventListener("click", comparar_alturas);
boton_limpiar.addEventListener("click", limpiar_campos);
boton_borrar_historial.addEventListener("click", borrar_historial);
nombre_uno.addEventListener("input", guardar_datos);
altura_uno.addEventListener("input", guardar_datos);
nombre_dos.addEventListener("input", guardar_datos);
altura_dos.addEventListener("input", guardar_datos);
//------------------------//
//--|iniciar_aplicacion|--//
//------------------------//
function cargar_historial() {
    const historial_guardado = localStorage.getItem("historial_alturas");
    if (!historial_guardado) {
        mostrar_historial();
        return;
    }
    try {
        const datos = JSON.parse(historial_guardado);
        if (Array.isArray(datos)) {
            historial_alturas = datos.slice(0, 10);
        } else {
            localStorage.removeItem("historial_alturas");
        }
    } catch (error) {
        localStorage.removeItem("historial_alturas");
    }
    mostrar_historial();
}
cargar_datos();
cargar_historial();