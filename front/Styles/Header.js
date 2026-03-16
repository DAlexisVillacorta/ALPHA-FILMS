/* =============================================
   ALPHA FILMS — Header & Page Interactivity
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* ---- Header scroll effect ---- */
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    /* ---- Hamburger menu ---- */
    const hamburger  = document.getElementById('hamburger');
    const mobileNav  = document.getElementById('mobile-nav');

    function openMobileMenu() {
        hamburger.classList.add('open');
        mobileNav.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileNav.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            hamburger.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
        });

        // Close when clicking a link
        mobileNav.querySelectorAll('.mobile-nav-link').forEach(function (link) {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeMobileMenu();
        });
    }

    /* ---- Profile dropdown ---- */
    const profileBtn    = document.getElementById('profile-btn');
    const profileMenu   = document.getElementById('profile-menu');
    const profileChevron = document.getElementById('profile-chevron');

    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = profileMenu.classList.contains('open');
            closeAll();
            if (!isOpen) {
                profileMenu.classList.add('open');
                profileBtn.classList.add('open');
                profileBtn.setAttribute('aria-expanded', 'true');
            }
        });
    }

    /* ---- Search expand ---- */
    const searchToggle   = document.getElementById('search-toggle');
    const searchBar      = document.getElementById('search-bar');
    const searchCloseBtn = document.getElementById('search-close-btn');
    const searchInput    = document.getElementById('search-input');

    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = searchBar.classList.contains('open');
            closeAll();
            if (!isOpen) {
                searchBar.classList.add('open');
                setTimeout(() => searchInput && searchInput.focus(), 50);
            }
        });

        searchCloseBtn && searchCloseBtn.addEventListener('click', function () {
            searchBar.classList.remove('open');
            if (searchInput) searchInput.value = '';
            showAllCards();
        });
    }

    /* Live search filter */
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const term = this.value.trim().toLowerCase();
            if (!term) { showAllCards(); return; }
            filterCards(function (card) {
                const title = (card.querySelector('.movie-title') || card).textContent.toLowerCase();
                return title.includes(term);
            });
        });
    }

    /* ---- Close all on outside click ---- */
    document.addEventListener('click', function () {
        closeAll();
    });

    function closeAll() {
        if (profileMenu)   profileMenu.classList.remove('open');
        if (profileBtn)    { profileBtn.classList.remove('open'); profileBtn.setAttribute('aria-expanded', 'false'); }
        if (searchBar)     searchBar.classList.remove('open');
    }

    /* ---- Genre filter ---- */
    const genreFilter = document.getElementById('genre-filter');
    if (genreFilter) {
        genreFilter.addEventListener('click', function (e) {
            const btn = e.target.closest('.genre-btn');
            if (!btn) return;

            document.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const genre = btn.dataset.genre;
            if (genre === 'all') {
                showAllCards();
            } else {
                filterCards(function (card) {
                    const tags = Array.from(card.querySelectorAll('.genre-tag'))
                        .map(t => t.textContent.trim());
                    return tags.includes(genre);
                });
            }
        });
    }

    /* ---- Hero stats counter animation ---- */
    animateStats();

    /* Wait for movies to load, then update count */
    let attempts = 0;
    const statsInterval = setInterval(function () {
        const cards = document.querySelectorAll('#contenedor-tarjetas .movie-card:not(.skeleton)');
        const statEl = document.getElementById('stat-movies');
        if (cards.length > 0 && statEl) {
            countUp(statEl, cards.length);
            clearInterval(statsInterval);
        }
        if (++attempts > 20) clearInterval(statsInterval);
    }, 500);

    /* ---- Helpers ---- */
    function filterCards(predicate) {
        const container = document.getElementById('contenedor-tarjetas');
        const noResults = document.getElementById('no-results');
        if (!container) return;

        const cards = container.querySelectorAll('.movie-card:not(.skeleton)');
        let visible = 0;
        cards.forEach(function (card) {
            const show = predicate(card);
            card.style.display = show ? '' : 'none';
            if (show) visible++;
        });

        if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
    }

    function showAllCards() {
        const container = document.getElementById('contenedor-tarjetas');
        const noResults = document.getElementById('no-results');
        if (!container) return;
        container.querySelectorAll('.movie-card').forEach(c => c.style.display = '');
        if (noResults) noResults.style.display = 'none';
    }

    function countUp(el, target) {
        let current = 0;
        const step = Math.ceil(target / 30);
        const timer = setInterval(function () {
            current = Math.min(current + step, target);
            el.textContent = current;
            if (current >= target) clearInterval(timer);
        }, 40);
    }

    function animateStats() {
        const statEl = document.getElementById('stat-movies');
        if (statEl && statEl.textContent === '—') {
            // Placeholder pulse while loading
            statEl.style.opacity = '0.4';
            let pulse = true;
            const pulseTimer = setInterval(function () {
                statEl.style.opacity = pulse ? '0.8' : '0.4';
                pulse = !pulse;
            }, 700);
            // Clear when count-up starts
            const originalCountUp = window._countUp;
            setTimeout(() => clearInterval(pulseTimer), 15000);
        }
    }

    console.log('Alpha Films — UI inicializado');
});
