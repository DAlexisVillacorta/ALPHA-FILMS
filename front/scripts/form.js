const index = require("./index");
const URL = "http://localhost:3000/movies";

const input_title = document.getElementById("titulo");
const input_year = document.getElementById("año");
const input_director = document.getElementById("director");
const input_duration = document.getElementById("duracion");
const input_genero = document.getElementById("genero");
const input_rate = document.getElementById("rating");
const input_poster = document.getElementById("poster");

const form = document.getElementById("ingreso");
const button_clear = document.getElementById("clear");

const getSelectedGenres = () => {
  const checkboxes = document.querySelectorAll("input[name='genero']:checked");
  return Array.from(checkboxes).map(cb => cb.value);
};

const validateData = (data) => {
    const { title, year, director, duration, genero, rate, poster } = data;

    if (
title !== "" &&
year !== "" &&
director !== "" &&
duration !== "" &&
genero !== "" &&
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
year: input_year.value,   
director: input_director.value,   
duration: input_duration.value,   
genre: getSelectedGenres(),   
rate: input_rate.value,   
poster: input_poster.value,
    }
        console.log("quien es validateDate", data)
    if (validateData(data) === "Completo") {
    alert("Formulario Exitoso");
    } else {
        alert("Formulario Incompleto");
    }

    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (response.ok) {
        alert("Pelicula creada exitosamente");
      } else {
        alert("Error al crear la pelicula");
      }
    });

console.log("vamos a ver que tienen los inputs" ,data)
};
const clearData = () => {
input_title.value = "";
input_year.value = "";
input_director.value = "";
input_duration.value = "";
input_genero.value = "";
input_rate.value = "";
input_poster.value = "";
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendData();
});

button_clear.addEventListener("click", clearData);