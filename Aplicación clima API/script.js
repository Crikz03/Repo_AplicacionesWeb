const API_KEY = "API_KEY";

const ciudadesIniciales = ["Hermosillo", "Arizona", "Ciudad Obregon"]; //AQUI AGREGA LOS PAISES QUE QUIERAS MOSTRAR BRO :))
const campoCiudad = document.getElementById("campo_ciudad");
const btnConsultar = document.getElementById("btn_consultar");

function obtenerClima(ciudad) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`)
        .then(response => response.json())
        .then(data => {
            cargar_datos(data)
        })
        .catch(error => {
            console.log("algo pasó", error);
        });
}

function cargar_datos(datos) {
    const infoCiudades = document.getElementById("infoCiudades");
    let ciudadElemento = infoCiudades.cloneNode(true);
    ciudadElemento.style.display = "block";

    ciudadElemento.querySelector(".nombre").textContent = datos.name;
    ciudadElemento.querySelector(".temperatura").textContent = datos.main.temp;
    ciudadElemento.querySelector(".descripcion").textContent = datos.weather[0].description;
    ciudadElemento.querySelector(".humedad").textContent = datos.main.humidity;
    ciudadElemento.querySelector(".pais").textContent = datos.sys.country;

    document.getElementById("lista_ciudades").appendChild(ciudadElemento);

    let actualizarBtn = document.createElement("button");
    actualizarBtn.textContent = "Actualizar";
    actualizarBtn.classList.add("btn", "btn-info", "me-2");
    actualizarBtn.onclick = function () {
        const nuevaCiudad = prompt("Ingrese el nombre de la nueva ciudad:", datos.name);
        if (nuevaCiudad) {
            obtenerClima(nuevaCiudad);
            ciudadElemento.remove();
        }
    };

    let eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.classList.add("btn", "btn-danger");
    eliminarBtn.onclick = function () {
        ciudadElemento.remove();
    };

    ciudadElemento.appendChild(actualizarBtn);
    ciudadElemento.appendChild(eliminarBtn);
}


btnConsultar.addEventListener("click", () => {
    const ciudad = campoCiudad.value.trim();
    if (ciudad) {
        obtenerClima(ciudad);
        campoCiudad.value = "";
    } else{
        alert("El nombre de la ciudad que ingreso es incorrecto o no existe."); //no funca XDDD
    }
});

ciudadesIniciales.forEach(ciudad => obtenerClima(ciudad)); 
