const renderCards = require("./tarjetas.js");
const axios = require("axios");
const URL = "http://localhost:3000/movies"; 

const fetchMovies = async () => {
try {
    const res = await axios.get(URL);
    return res.data;
} catch (err) {
    console.error(err);
    return [];
}
};

// Llamar y renderizar
fetchMovies().then(data => {
    renderCards(data, "contenedor-tarjetas");
});
