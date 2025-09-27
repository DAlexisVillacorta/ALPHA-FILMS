const  { getMovies, createMoviesService } = require("../services/useMovies");

const getMoviesController = async (req, res) => {
    const movies = await getMovies();
    if (typeof movies === "string") {
        return res.status(302).send("Error al traer las peliculas");
    }
    return res.status(200).send(movies);

};

const createMoviesController = async (req, res) => {
    try {
        console.log("Body recibido:", req.body); 
            const movie = req.body;

    const createMovies = await createMoviesService(movie);

    if (createMovies.status) {
        return res.status(201).send(createMovies.message);
    }else {
        res.status(304).send(createMovies.message);
    }
    } catch (error) {
        return res.status(500).send("Error del servidor");
    }
    const movie = req.body;

    const createMovies = await createMoviesService(movie);

    if (createMovies.status) {
        return res.status(201).send(createMovies.message);
    }else {
        res.status(304).send(createMovies.message);
    }
};


module.exports = {
    getMoviesController,
    createMoviesController,
};