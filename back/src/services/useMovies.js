const Movie = require("../models/Movie");

const getMovies = async () => {
    const movies = await Movie.find();
    return movies;
};

const createMoviesService = async (movieData) => {
    try {
        const newMovie = new Movie(movieData);
        const savedMovie = await newMovie.save();
        return { status: true, message: savedMovie };
    } catch (error) {
        console.error("Error en createMoviesService:", error);
        return { status: false, message: error.message };
    }
};

module.exports = { getMovies,
    createMoviesService,
}