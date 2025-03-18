let formulario = document.getElementById("formulario");
let cuerpo_tabla = document.getElementById("cuerpo_tabla");

formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    let titulo = document.getElementById("nombre").value.trim();
    let album = document.getElementById("album").value.trim();
    let genero = document.getElementById("genero").value;
    let artista = document.getElementById("artista").value.trim();
    let anio = document.getElementById("anio").value;

    if (!titulo || !album || genero === "null" || !artista || !anio) {
        alert("Por favor, llene todos los campos del formulario.");
        return;
    }

    let cancion = { titulo, album, genero, artista, anio };

    manejaTabla(cancion);
    e.target.reset();
});

function manejaTabla(cancion) {
    let fila = document.createElement("tr");

    for (let key in cancion) {
        let campo = document.createElement("td");
        campo.textContent = cancion[key];
        campo.contentEditable = false;
        fila.appendChild(campo);
    }

    let actualizarBtn = document.createElement("button");
    actualizarBtn.textContent = "Actualizar";
    actualizarBtn.classList.add("btn", "btn-warning", "me-2");
    actualizarBtn.onclick = function () {
        let editable = false;
        let celdas = fila.querySelectorAll("td");
        celdas.forEach((celda, index) => {
            if (index < 5) {
                editable = !celda.isContentEditable;
                celda.contentEditable = !celda.isContentEditable;
            }
        });

        if (editable) {
            alert("Ya puedes editar los valores. Toca el botón de nuevo para desactivar.");
        }
    };

    let actualizarTd = document.createElement("td");
    actualizarTd.appendChild(actualizarBtn);
    fila.appendChild(actualizarTd);

    let eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.classList.add("btn", "btn-danger");
    eliminarBtn.onclick = function () {
        fila.remove();
    };

    let eliminarTd = document.createElement("td");
    eliminarTd.appendChild(eliminarBtn);
    fila.appendChild(eliminarTd);

    cuerpo_tabla.appendChild(fila);
}



