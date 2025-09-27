// listeners.js - Event listeners para las tarjetas de películas

// Función para añadir event listeners a las tarjetas
function addMovieCardListeners(data) {
    data.forEach((movie, index) => {
        const card = document.getElementById(`movie-card-${index + 1}`);
        if (card) {
            // Click en la tarjeta
            card.addEventListener('click', () => {
                console.log(`Película seleccionada: ${movie.title}`);
                console.log(`Director: ${movie.director}`);
                console.log(`Duración: ${movie.duration}`);
                console.log(`Géneros: ${movie.genre.join(', ')}`);
                console.log(`Rating: ${movie.rate}`);
                // Aquí puedes añadir la lógica para abrir detalles, reproducir, etc.
            });

            // Click en el botón play
            const playButton = card.querySelector('.play-button');
            if (playButton) {
                playButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    console.log(`Reproducir: ${movie.title}`);
                    // Aquí puedes añadir la lógica para reproducir la película
                });
            }
        }
    });
}

module.exports = addMovieCardListeners;