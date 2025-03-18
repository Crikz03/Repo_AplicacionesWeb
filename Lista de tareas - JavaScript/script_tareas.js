const boton = document.getElementById("agregar");

let tareas = [];

boton.onclick = function () {
    agregarTarea();
}

function agregarTarea() {
    let campo = document.getElementById("tarea");
    let tarea = campo.value;

    if (tarea === "") {
        console.log("Está vacío");
    } else {
        let lista = document.getElementById("lista_tareas");
        tareas.push(tarea);

        let li = document.createElement("li");
        li.innerHTML = tarea;

        let boton_eliminar = document.createElement("button");
        boton_eliminar.innerHTML = "Eliminar";
        boton_eliminar.classList.add("btn", "btn-danger");

        boton_eliminar.onclick = function () {
            lista.removeChild(li);
        }

        li.appendChild(boton_eliminar);

        lista.appendChild(li);

        campo.value = "";
    }
}
