function renderCards(data, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`No se encontró el contenedor con ID: ${containerId}`);
        return;
    }

    const tarjetasHTML = data
        .map((movie, index) => {
            const cardId = `movie-card-${index + 1}`;
            const genresHTML = movie.genre
                .map(g => `<span class="genre-tag">${g}</span>`)
                .join('');
            
            // Generar porcentaje de match basado en el rating
            const matchPercentage = Math.round((movie.rate / 10) * 100);

            return `
                <div class="movie-card" id="${cardId}">
                    <div class="movie-poster">
                        <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                        <div class="play-button">
                            <div class="play-icon"></div>
                        </div>
                        <div class="movie-overlay">
                            <h3 class="movie-title">${movie.title}</h3>
                            <div class="movie-meta">
                                <span class="movie-year">${movie.year}</span>
                                <div class="movie-rating">
                                    <span class="rating-star">★</span>
                                    <span>${movie.rate}</span>
                                </div>
                                <span class="movie-match">${matchPercentage}% Match</span>
                            </div>
                            <div class="movie-info">
                                <span class="movie-duration">${movie.duration}</span>
                                <span class="movie-director">${movie.director}</span>
                            </div>
                            <div class="movie-genres">
                                ${genresHTML}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        })
        .join('');

    container.innerHTML = tarjetasHTML;
};

module.exports = renderCards;