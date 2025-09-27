// movieUtils.js - Utilidades para manipular películas

// Función para añadir nuevas películas dinámicamente
function addMovie(movieData, moviesData, renderFunction, listenersFunction, containerId) {
    moviesData.push(movieData);
    renderFunction(moviesData, containerId);
    listenersFunction(moviesData);
}

// Función para filtrar películas por género
function filterMoviesByGenre(genre, moviesData, renderFunction, listenersFunction, containerId) {
    const filteredMovies = moviesData.filter(movie => 
        movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    );
    renderFunction(filteredMovies, containerId);
    listenersFunction(filteredMovies);
    return filteredMovies;
}

// Función para resetear las películas (mostrar todas)
function resetMovies(moviesData, renderFunction, listenersFunction, containerId) {
    renderFunction(moviesData, containerId);
    listenersFunction(moviesData);
}

// Función para buscar películas por título
function searchMoviesByTitle(searchTerm, moviesData, renderFunction, listenersFunction, containerId) {
    const filteredMovies = moviesData.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    renderFunction(filteredMovies, containerId);
    listenersFunction(filteredMovies);
    return filteredMovies;
}

module.exports = {
    addMovie,
    filterMoviesByGenre,
    resetMovies,
    searchMoviesByTitle
};