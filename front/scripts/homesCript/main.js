// main.js - Archivo principal que integra todos los módulos

// Importar módulos
const tempData = require('../tempData.js');
const renderCards = require('../tarjetas.js');
const addMovieCardListeners = require('./listeners.js');
const { setupCarouselNavigation } = require('./carousel.js');
const { addMovie, filterMoviesByGenre, resetMovies, searchMoviesByTitle } = require('./movieUtils.js');

// Variables globales
let moviesData = [...tempData]; // Copia del array original

// Función de inicialización principal
function initializeMovieCards() {
    // Renderizar las tarjetas
    renderCards(moviesData, 'trending');
    
    // Añadir event listeners a las tarjetas
    addMovieCardListeners(moviesData);
    
    // Configurar navegación del carousel
    setupCarouselNavigation('trending');
    
    console.log('Sistema de películas inicializado correctamente');
    console.log(`Se cargaron ${moviesData.length} películas`);
}

// Funciones públicas que usan los módulos
function addNewMovie(movieData) {
    addMovie(movieData, moviesData, renderCards, addMovieCardListeners, 'trending');
    console.log(`Nueva película añadida: ${movieData.title}`);
}

function filterByGenre(genre) {
    const filtered = filterMoviesByGenre(genre, moviesData, renderCards, addMovieCardListeners, 'trending');
    console.log(`Filtrado por género: ${genre}. Se encontraron ${filtered.length} películas`);
    return filtered;
}

function resetFilter() {
    resetMovies(moviesData, renderCards, addMovieCardListeners, 'trending');
    console.log('Filtros reseteados. Mostrando todas las películas');
}

function searchByTitle(searchTerm) {
    const results = searchMoviesByTitle(searchTerm, moviesData, renderCards, addMovieCardListeners, 'trending');
    console.log(`Búsqueda: "${searchTerm}". Se encontraron ${results.length} películas`);
    return results;
}

// Función para obtener datos de películas
function getMoviesData() {
    return [...moviesData]; // Devuelve una copia para evitar mutaciones
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeMovieCards);

// Exportar funciones para uso global (disponibles en window)
window.movieSystem = {
    addNewMovie,
    filterByGenre,
    resetFilter,
    searchByTitle,
    getMoviesData,
    reinitialize: initializeMovieCards
};

// Exportar para uso como módulo (si es necesario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeMovieCards,
        addNewMovie,
        filterByGenre,
        resetFilter,
        searchByTitle,
        getMoviesData
    };
}