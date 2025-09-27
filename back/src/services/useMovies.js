const Movie = require("../models/Movie");

const getMovies = async () => {
    try {
    const movies = await Movie.find();
    return movies;
    } catch (error) {
        return [];
    }
};

const createMoviesService = async (movieData) => {
    try {
        const newMovie = new Movie(movieData);
        const savedMovie = await newMovie.save();
    return savedMovie;
        } catch (error) {
    console.error("Error en createMoviesService:", error);
        throw error;
    }
};

module.exports = { getMovies,
    createMoviesService,
}