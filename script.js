const formTarea = document.getElementById("form-tarea");
const inputTarea = document.getElementById("input-tarea");
const listaTareas = document.getElementById("lista-tareas");
const listaVacia = document.getElementById("lista-vacia");
const contadorPendientes = document.getElementById("contador-pendientes");
const btnEliminarCompletadas = document.getElementById("btn-eliminar-completadas");


formTarea.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const textoTarea = inputTarea.value.trim();

    if (textoTarea === "") {
        return; 
    }

    crearTarea(textoTarea);
    inputTarea.value = "";
    inputTarea.focus();
});

function crearTarea(texto) {
    const li = document.createElement("li");
    li.className = "tarea";

    const spanTexto = document.createElement("span");
    spanTexto.className = "tarea-texto";
    spanTexto.textContent = texto;

    const divBotones = document.createElement("div");
    divBotones.className = "tarea-botones";

    const btnCompletar = document.createElement("button");
    btnCompletar.className = "btn-completar";
    btnCompletar.textContent = "Completar";

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn-eliminar-tarea";
    btnEliminar.textContent = "Eliminar";

    divBotones.appendChild(btnCompletar);
    divBotones.appendChild(btnEliminar);

    li.appendChild(spanTexto);
    li.appendChild(divBotones);

    spanTexto.addEventListener("click", function () {
        alternarCompletada(li);
    });

    btnCompletar.addEventListener("click", function () {
        alternarCompletada(li);
    });

   
    btnEliminar.addEventListener("click", function () {
        li.remove();
        actualizarInterfaz();
    });

    listaTareas.appendChild(li);
    actualizarInterfaz();
}

function alternarCompletada(li) {
    li.classList.toggle("completada");
    actualizarInterfaz();
}

btnEliminarCompletadas.addEventListener("click", function () {
    const tareasCompletadas = listaTareas.querySelectorAll(".tarea.completada");

    tareasCompletadas.forEach(function (tarea) {
        tarea.remove();
    });

    actualizarInterfaz();
});


function actualizarInterfaz() {
    const todasLasTareas = listaTareas.querySelectorAll(".tarea");
    const tareasPendientes = listaTareas.querySelectorAll(".tarea:not(.completada)");


    contadorPendientes.textContent = tareasPendientes.length + " tareas pendientes";

   
    if (todasLasTareas.length === 0) {
        listaVacia.style.display = "block";
    } else {
        listaVacia.style.display = "none";
    }
}

actualizarInterfaz();