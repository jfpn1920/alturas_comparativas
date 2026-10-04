/*------------------------------*/
/*--|elementos_del_documento|--*/
/*------------------------------*/

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

/*------------------------------*/
/*--|variables_principales|--*/
/*------------------------------*/

let historial_alturas = [];

const datos_guardados = localStorage.getItem("datos_alturas");
const historial_guardado = localStorage.getItem("historial_alturas");

if (datos_guardados) {
    cargar_datos();
}

if (historial_guardado) {
    historial_alturas = JSON.parse(historial_guardado);
}

/*------------------------------*/
/*--|cargar_datos|--*/
/*------------------------------*/

function cargar_datos() {
    const datos = JSON.parse(datos_guardados);

    nombre_uno.value = datos.nombre_uno || "";
    altura_uno.value = datos.altura_uno || "";
    nombre_dos.value = datos.nombre_dos || "";
    altura_dos.value = datos.altura_dos || "";
}

/*------------------------------*/
/*--|guardar_datos|--*/
/*------------------------------*/

function guardar_datos() {
    const datos = {
        nombre_uno: nombre_uno.value,
        altura_uno: altura_uno.value,
        nombre_dos: nombre_dos.value,
        altura_dos: altura_dos.value
    };

    localStorage.setItem(
        "datos_alturas",
        JSON.stringify(datos)
    );
}

/*------------------------------*/
/*--|comparar_alturas|--*/
/*------------------------------*/

function comparar_alturas() {
    const nombre1 = nombre_uno.value.trim() || "Persona 1";
    const nombre2 = nombre_dos.value.trim() || "Persona 2";

    const altura1 = Number(altura_uno.value);
    const altura2 = Number(altura_dos.value);

    if (altura1 <= 0 || altura2 <= 0) {
        mensaje_resultado.textContent =
            "Ingresa dos alturas válidas.";

        return;
    }

    const diferencia = Math.abs(altura1 - altura2);

    let mayor;

    if (altura1 > altura2) {
        mayor = nombre1;
    } else if (altura2 > altura1) {
        mayor = nombre2;
    } else {
        mayor = "Misma altura";
    }

    if (altura1 === altura2) {
        mensaje_resultado.textContent =
            `${nombre1} y ${nombre2} tienen la misma altura.`;
    } else {
        mensaje_resultado.textContent =
            `${mayor} es más alto.`;
    }

    altura_mayor.textContent =
        `${Math.max(altura1, altura2)} cm`;

    diferencia_alturas.textContent =
        `${diferencia} cm`;

    guardar_datos();

    guardar_comparacion(
        nombre1,
        altura1,
        nombre2,
        altura2,
        mayor,
        diferencia
    );
}

/*------------------------------*/
/*--|guardar_comparacion|--*/
/*------------------------------*/

function guardar_comparacion(
    nombre1,
    altura1,
    nombre2,
    altura2,
    mayor,
    diferencia
) {
    const comparacion = {
        nombre1: nombre1,
        altura1: altura1,
        nombre2: nombre2,
        altura2: altura2,
        mayor: mayor,
        diferencia: diferencia
    };

    historial_alturas.unshift(comparacion);

    historial_alturas =
        historial_alturas.slice(0, 10);

    localStorage.setItem(
        "historial_alturas",
        JSON.stringify(historial_alturas)
    );

    mostrar_historial();
}

/*------------------------------*/
/*--|mostrar_historial|--*/
/*------------------------------*/

function mostrar_historial() {
    lista_historial.innerHTML = "";

    if (historial_alturas.length === 0) {
        lista_historial.innerHTML =
            "<li>No hay comparaciones guardadas.</li>";

        return;
    }

    historial_alturas.forEach(function(comparacion) {
        const elemento = document.createElement("li");

        elemento.textContent =
            `${comparacion.nombre1} (${comparacion.altura1} cm) vs ` +
            `${comparacion.nombre2} (${comparacion.altura2} cm) — ` +
            `${comparacion.diferencia} cm de diferencia`;

        lista_historial.appendChild(elemento);
    });
}

/*------------------------------*/
/*--|limpiar_campos|--*/
/*------------------------------*/

function limpiar_campos() {
    nombre_uno.value = "";
    altura_uno.value = "";
    nombre_dos.value = "";
    altura_dos.value = "";

    mensaje_resultado.textContent =
        "Ingresa las dos alturas para comenzar.";

    altura_mayor.textContent = "--";
    diferencia_alturas.textContent = "--";

    localStorage.removeItem("datos_alturas");
}

/*------------------------------*/
/*--|borrar_historial|--*/
/*------------------------------*/

function borrar_historial() {
    historial_alturas = [];

    localStorage.removeItem("historial_alturas");

    mostrar_historial();
}

/*------------------------------*/
/*--|eventos_principales|--*/
/*------------------------------*/

boton_comparar.addEventListener(
    "click",
    comparar_alturas
);

boton_limpiar.addEventListener(
    "click",
    limpiar_campos
);

boton_borrar_historial.addEventListener(
    "click",
    borrar_historial
);

/*------------------------------*/
/*--|guardar_al_escribir|--*/
/*------------------------------*/

nombre_uno.addEventListener(
    "input",
    guardar_datos
);

altura_uno.addEventListener(
    "input",
    guardar_datos
);

nombre_dos.addEventListener(
    "input",
    guardar_datos
);

altura_dos.addEventListener(
    "input",
    guardar_datos
);

/*------------------------------*/
/*--|mostrar_datos_guardados|--*/
/*------------------------------*/

mostrar_historial();