const  { getMovies, createMoviesService } = require("../services/useMovies");

const getMoviesController = async (req, res) => {
    try {
        const movies = await getMovies();
        return res.status(200).send(movies);
    } catch (error) {
        return res.status(500).send("Error al traer las peliculas");
    }
};

const createMoviesController = async (req, res) => {
    try {
        const movie = req.body;
        const createMovies = await createMoviesService(movie);

        if (createMovies.status) {
            return res.status(201).send(createMovies.message);
        } else {
            return res.status(400).send(createMovies.message);
        }
    } catch (error) {
        return res.status(500).send("Error del servidor");
    }
};


module.exports = {
    getMoviesController,
    createMoviesController,
};