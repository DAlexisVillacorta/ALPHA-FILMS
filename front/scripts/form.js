const index = require("./index");
const URL = "http://localhost:3000/movies";

const input_title = document.getElementById("titulo");
const input_year = document.getElementById("año");
const input_director = document.getElementById("director");
const input_duration = document.getElementById("duracion");
const input_rate = document.getElementById("rating");
const input_poster = document.getElementById("poster");

const form = document.getElementById("ingreso");
const button_clear = document.getElementById("clear");

const getSelectedGenres = () => {
  const checkboxes = document.querySelectorAll("input[name='genero']:checked");
  return Array.from(checkboxes).map(cb => cb.value);
};

const validateData = (data) => {
    const { title, year, director, duration, genre, rate, poster } = data;

    if (
        title !== "" &&
        year !== "" &&
        director !== "" &&
        duration !== "" &&
        genre.length > 0 &&
        rate !== "" &&
        poster !== ""
    ) {
        return "Completo";
    }
    return "incompleto";
};

const sendData = () => {
    const data = {
        title: input_title.value,
        year: Number(input_year.value),
        director: input_director.value,
        duration: input_duration.value,
        genre: getSelectedGenres(),
        rate: Number(input_rate.value),
        poster: input_poster.value,
    };

    if (validateData(data) !== "Completo") {
        alert("Formulario Incompleto");
        return;
    }

    fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    .then((response) => {
        if (response.ok) {
            alert("Pelicula creada exitosamente");
            clearData();
        } else {
            alert("Error al crear la pelicula");
        }
    })
    .catch(() => {
        alert("Error de conexion con el servidor");
    });
};

const clearData = () => {
    input_title.value = "";
    input_year.value = "";
    input_director.value = "";
    input_duration.value = "";
    input_rate.value = "";
    input_poster.value = "";
    document.querySelectorAll("input[name='genero']:checked").forEach(cb => {
        cb.checked = false;
    });
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendData();
});

button_clear.addEventListener("click", clearData);
