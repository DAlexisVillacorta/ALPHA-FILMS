        // Funcionalidad adicional del header
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Ejemplo de cómo usar las funciones después de la carga
        document.addEventListener('DOMContentLoaded', function() {
            // Ejemplo de filtrado por género
            setTimeout(() => {
                console.log('Página cargada completamente');
                
                // Puedes llamar a estas funciones para interactuar con las películas:
                // filterMoviesByGenre('Acción'); // Filtrar por género
                // addMovie({...nuevaPelicula}); // Añadir nueva película
            }, 1000);
        });