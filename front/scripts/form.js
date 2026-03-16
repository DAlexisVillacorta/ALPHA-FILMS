const URL = "http://localhost:3000/movies";

const input_title    = document.getElementById("titulo");
const input_year     = document.getElementById("año");
const input_director = document.getElementById("director");
const input_duration = document.getElementById("duracion");
const input_rate     = document.getElementById("rating");
const input_poster   = document.getElementById("poster");

const form      = document.getElementById("ingreso");
const submitBtn = document.getElementById("submitBtn");
const clearBtn  = document.getElementById("clear");

/* ---- Toast ---- */
const TOAST_ICONS = {
    success: "fa-circle-check",
    error:   "fa-circle-xmark",
    warning: "fa-triangle-exclamation",
};

const showToast = (message, type = "success") => {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast-item ${type}`;
    toast.innerHTML = `
        <i class="fas ${TOAST_ICONS[type]} toast-icon"></i>
        <span class="toast-text">${message}</span>
        <button class="toast-close" aria-label="Cerrar">
            <i class="fas fa-xmark"></i>
        </button>
    `;
    toast.querySelector(".toast-close").addEventListener("click", () => dismissToast(toast));
    container.appendChild(toast);
    setTimeout(() => dismissToast(toast), 4200);
};

const dismissToast = (toast) => {
    if (!toast || toast.classList.contains("dismiss")) return;
    toast.classList.add("dismiss");
    setTimeout(() => toast.remove(), 320);
};

/* ---- Live Poster Preview ---- */
const updatePreview = () => {
    const img         = document.getElementById("poster-preview-img");
    const placeholder = document.getElementById("poster-placeholder");
    const url         = input_poster.value.trim();

    if (url) {
        img.src = url;
        img.onload = () => {
            img.classList.add("visible");
            placeholder.style.opacity = "0";
        };
        img.onerror = () => {
            img.classList.remove("visible");
            placeholder.style.opacity = "1";
        };
    } else {
        img.classList.remove("visible");
        placeholder.style.opacity = "1";
    }

    document.getElementById("preview-title-text").textContent =
        input_title.value.trim() || "—";
    document.getElementById("prev-year").textContent =
        input_year.value || "—";
    document.getElementById("prev-rating").textContent =
        input_rate.value ? `★ ${input_rate.value}` : "—";
    document.getElementById("prev-director").textContent =
        input_director.value.trim() ? `Dir. ${input_director.value.trim()}` : "";
    document.getElementById("prev-duration").textContent =
        input_duration.value.trim() || "";
};

/* ---- Genres ---- */
const getSelectedGenres = () => {
    return Array.from(
        document.querySelectorAll("input[name='genero']:checked")
    ).map((cb) => cb.value);
};

/* ---- Validation ---- */
const validateData = (data) => {
    return (
        data.title.trim()    !== "" &&
        data.year            !== "" &&
        data.director.trim() !== "" &&
        data.duration.trim() !== "" &&
        data.genre.length     > 0  &&
        data.rate            !== "" &&
        data.poster.trim()   !== ""
    );
};

/* ---- Submit ---- */
const sendData = () => {
    const data = {
        title:    input_title.value,
        year:     Number(input_year.value),
        director: input_director.value,
        duration: input_duration.value,
        genre:    getSelectedGenres(),
        rate:     Number(input_rate.value),
        poster:   input_poster.value,
    };

    if (!validateData(data)) {
        showToast("Completa todos los campos y selecciona al menos un género.", "warning");
        return;
    }

    submitBtn.classList.add("loading");

    fetch(URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
    })
        .then((response) => {
            submitBtn.classList.remove("loading");
            if (response.ok) {
                showToast("¡Película agregada exitosamente!", "success");
                clearData();
            } else {
                showToast("Error al agregar la película. Intenta de nuevo.", "error");
            }
        })
        .catch(() => {
            submitBtn.classList.remove("loading");
            showToast("No se pudo conectar con el servidor.", "error");
        });
};

/* ---- Clear ---- */
const clearData = () => {
    input_title.value    = "";
    input_year.value     = "";
    input_director.value = "";
    input_duration.value = "";
    input_rate.value     = "";
    input_poster.value   = "";
    document.querySelectorAll("input[name='genero']:checked").forEach((cb) => {
        cb.checked = false;
    });
    updatePreview();
};

/* ---- Ripple ---- */
const addRipple = (btn, event) => {
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = (event ? event.clientX - rect.left : rect.width / 2) - size / 2;
    const y = (event ? event.clientY - rect.top  : rect.height / 2) - size / 2;

    const wave = document.createElement("span");
    wave.className = "ripple-wave";
    wave.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
    btn.appendChild(wave);
    setTimeout(() => wave.remove(), 600);
};

/* ---- Events ---- */
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addRipple(submitBtn, e);
    sendData();
});

clearBtn.addEventListener("click", (e) => {
    addRipple(clearBtn, e);
    clearData();
});

// Live preview on every keystroke
[input_title, input_year, input_director, input_duration, input_rate].forEach(
    (input) => input.addEventListener("input", updatePreview)
);
input_poster.addEventListener("change", updatePreview);
input_poster.addEventListener("blur",   updatePreview);

// Header scroll effect
window.addEventListener(
    "scroll",
    () => {
        const header = document.getElementById("main-header");
        if (header) header.classList.toggle("scrolled", window.scrollY > 20);
    },
    { passive: true }
);
