let progreso = {

    modulo1: false,

    modulo2: false,

    modulo3: false,

    modulo4: false,

    evaluacion: false

};


const guardado =
    localStorage.getItem(
        "progresoCurso"
    );


if (guardado) {

    progreso =
        JSON.parse(guardado);

}


function guardarProgreso() {

    localStorage.setItem(

        "progresoCurso",

        JSON.stringify(progreso)

    );

    actualizarProgreso();

}



function mostrarSeccion(id) {

    const secciones =
        document.querySelectorAll(
            ".seccion"
        );


    secciones.forEach(
        seccion => {

            seccion.classList.remove(
                "activa"
            );

        }
    );


    document
        .getElementById(id)
        .classList.add("activa");


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



function abrirModulo(numero) {

    const contenido =
        document.getElementById(
            "contenidoModulo"
        );


    let html = "";


    if (numero === 1) {

        html = `

        <div class="contenido">

            <h2>Módulo 1 — Introducción</h2>

            <h3>Objetivo</h3>

            <p>
            Comprender los conceptos fundamentales
            relacionados con la función de inspección.
            </p>

            <h3>Contenido</h3>

            <p>
            La función de inspección constituye una
            actividad fundamental para verificar el
            cumplimiento de los requisitos aplicables.
            </p>

            <h3>Actividad</h3>

            <p>
            Identifique tres responsabilidades
            principales de un inspector.
            </p>

            <h3>Material</h3>

            <p>
            <a href="documentos/manual.pdf"
               target="_blank">
               📄 Abrir material de estudio
            </a>
            </p>

            <button
                class="btn-principal"
                onclick="completarModulo(1)">

                Marcar módulo como completado

            </button>

        </div>

        `;

    }



    if (numero === 2) {

        html = `

        <div class="contenido">

            <h2>Módulo 2 — Marco normativo</h2>

            <h3>Objetivo</h3>

            <p>
            Identificar los principales documentos
            normativos aplicables a las actividades
            de inspección.
            </p>

            <h3>Contenido</h3>

            <p>
            El inspector debe conocer los requisitos
            aplicables a la actividad que desarrolla
            y utilizar las fuentes oficiales
            correspondientes.
            </p>

            <h3>Actividad</h3>

            <p>
            Revise el procedimiento correspondiente
            y determine qué requisitos aplican al
            escenario planteado.
            </p>

            <button
                class="btn-principal"
                onclick="completarModulo(2)">

                Marcar módulo como completado

            </button>

        </div>

        `;

    }



    if (numero === 3) {

        html = `

        <div class="contenido">

            <h2>Módulo 3 — Procedimientos</h2>

            <h3>Objetivo</h3>

            <p>
            Aplicar correctamente los procedimientos
            establecidos para realizar una actividad
            de inspección.
            </p>

            <h3>Actividad práctica</h3>

            <p>
            Analice un procedimiento de inspección
            y determine la secuencia correcta de
            ejecución.
            </p>

            <ul>

                <li>Preparación</li>

                <li>Revisión documental</li>

                <li>Verificación</li>

                <li>Registro de evidencia</li>

                <li>Comunicación de resultados</li>

            </ul>

            <button
                class="btn-principal"
                onclick="completarModulo(3)">

                Marcar módulo como completado

            </button>

        </div>

        `;

    }



    if (numero === 4) {

        html = `

        <div class="contenido">

            <h2>Módulo 4 — Caso práctico</h2>

            <h3>Escenario</h3>

            <p>

            Durante una actividad de inspección se
            identifica que una organización no cuenta
            con evidencia suficiente para demostrar
            el cumplimiento de un requisito.

            </p>

            <h3>Actividad</h3>

            <p>

            Analice la situación y determine:

            </p>

            <ol>

                <li>
                Qué requisito debe verificarse.
                </li>

                <li>
                Qué evidencia debe solicitarse.
                </li>

                <li>
                Cómo documentaría el resultado.
                </li>

            </ol>

            <button
                class="btn-principal"
                onclick="completarModulo(4)">

                Marcar módulo como completado

            </button>

        </div>

        `;

    }


    contenido.innerHTML = html;


    contenido.scrollIntoView({

        behavior: "smooth"

    });

}



function completarModulo(numero) {

    progreso[
        "modulo" + numero
    ] = true;


    guardarProgreso();


    alert(
        "Módulo completado correctamente."
    );

}



function calificar() {

    const respuestas = {

        p1: "a",

        p2: "a",

        p3: "a"

    };


    let puntos = 0;


    Object.keys(respuestas)
        .forEach(
            pregunta => {

                const seleccion =
                    document.querySelector(
                        `input[name="${pregunta}"]:checked`
                    );


                if (
                    seleccion &&
                    seleccion.value ===
                    respuestas[pregunta]
                ) {

                    puntos++;

                }

            }
        );


    const porcentaje =
        Math.round(
            (puntos / 3) * 100
        );


    const resultado =
        document.getElementById(
            "resultado"
        );


    if (porcentaje >= 80) {

        resultado.innerHTML = `

            <div>

                ✅ Evaluación acreditada

                <br><br>

                Resultado:
                ${porcentaje}%

            </div>

        `;


        progreso.evaluacion = true;

        guardarProgreso();

    } else {

        resultado.innerHTML = `

            <div>

                ⚠️ Evaluación no acreditada

                <br><br>

                Resultado:
                ${porcentaje}%

                <br><br>

                Revise nuevamente los contenidos
                y vuelva a realizar la evaluación.

            </div>

        `;

    }

}



function actualizarProgreso() {

    const elementos = [

        progreso.modulo1,

        progreso.modulo2,

        progreso.modulo3,

        progreso.modulo4,

        progreso.evaluacion

    ];


    const completados =
        elementos.filter(
            Boolean
        ).length;


    const porcentaje =
        Math.round(
            (completados /
            elementos.length) *
            100
        );


    document
        .getElementById(
            "barraProgreso"
        )
        .style.width =
        porcentaje + "%";


    document
        .getElementById(
            "porcentaje"
        )
        .innerText =
        porcentaje +
        "% completado";


    const estado =
        document.getElementById(
            "estadoModulos"
        );


    estado.innerHTML = `

        <p>
        ${progreso.modulo1 ? "✅" : "⬜"}
        Módulo 1
        </p>

        <p>
        ${progreso.modulo2 ? "✅" : "⬜"}
        Módulo 2
        </p>

        <p>
        ${progreso.modulo3 ? "✅" : "⬜"}
        Módulo 3
        </p>

        <p>
        ${progreso.modulo4 ? "✅" : "⬜"}
        Módulo 4
        </p>

        <p>
        ${progreso.evaluacion ? "✅" : "⬜"}
        Evaluación
        </p>

    `;

}



function reiniciarCurso() {

    if (
        confirm(
            "¿Desea reiniciar todo el progreso?"
        )
    ) {

        localStorage.removeItem(
            "progresoCurso"
        );


        location.reload();

    }

}


actualizarProgreso();
let pasoActual = 1;
const totalPasos = 6;

function mostrarPaso(n) {

    document.querySelectorAll(".paso-tour").forEach(
        paso => paso.classList.remove("activo")
    );

    document.getElementById("paso" + n).classList.add("activo");


    document.querySelectorAll(".punto").forEach(
        punto => punto.classList.remove("activo")
    );

    document.querySelector(
        `.punto[data-paso="${n}"]`
    ).classList.add("activo");


    document.getElementById("btnAtras").style.visibility =
        n === 1 ? "hidden" : "visible";

    const btnSiguiente = document.getElementById("btnSiguiente");

    if (n === totalPasos) {
        btnSiguiente.textContent = "Comenzar capacitación";
        btnSiguiente.setAttribute("onclick", "mostrarSeccion('curso')");
    } else {
        btnSiguiente.textContent = "Siguiente →";
        btnSiguiente.setAttribute("onclick", "siguientePaso()");
    }

    pasoActual = n;
}

function siguientePaso() {
    if (pasoActual < totalPasos) {
        mostrarPaso(pasoActual + 1);
    }
}

function pasoAnterior() {
    if (pasoActual > 1) {
        mostrarPaso(pasoActual - 1);
    }
}

mostrarPaso(1);
