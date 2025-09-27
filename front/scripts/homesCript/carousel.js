// carousel.js - Funcionalidad del carousel de películas

// Función para la funcionalidad del carousel
function scrollMovies(containerId, direction) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scrollAmount = 240; // Ancho de tarjeta + gap
    const currentScroll = container.scrollLeft;
    
    if (direction === -1) {
        // Scroll hacia la izquierda
        container.scrollTo({
            left: currentScroll - scrollAmount,
            behavior: 'smooth'
        });
    } else {
        // Scroll hacia la derecha
        container.scrollTo({
            left: currentScroll + scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Función para configurar la navegación del carousel
function setupCarouselNavigation(containerId) {
    const prevButton = document.querySelector('.carousel-nav.prev');
    const nextButton = document.querySelector('.carousel-nav.next');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => scrollMovies(containerId, -1));
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => scrollMovies(containerId, 1));
    }
}

module.exports = {
    scrollMovies,
    setupCarouselNavigation
};