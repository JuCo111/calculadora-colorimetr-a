// Script para la Calculadora de Colorimetría

document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("start-btn");
    const steps = document.querySelectorAll(".step");
    const progressBar = document.getElementById("progress-bar");
    const currentStepText = document.getElementById("current-step");
    const totalStepsText = document.getElementById("total-steps");
    const esBtn = document.getElementById("es-btn");
    const enBtn = document.getElementById("en-btn");
    const reiniciarBtn = document.getElementById("reiniciar-btn");

    let currentStep = 0;
    const totalSteps = steps.length;

    // Mostrar total de pasos
    totalStepsText.textContent = totalSteps;

    // Iniciar la calculadora
    if (startBtn) {
        startBtn.addEventListener("click", function () {
            steps[0].classList.remove("active");
            steps[1].classList.add("active");
            document.getElementById("progress-container").classList.remove("hidden");
            currentStep = 1;
            updateProgress();
        });
    }

    // Selector de idioma
    function setLanguage(lang) {
        document.querySelectorAll("[data-es]").forEach(el => {
            el.textContent = lang === "es" ? el.getAttribute("data-es") : el.getAttribute("data-en");
        });
        localStorage.setItem("lang", lang);
        esBtn.classList.toggle("active", lang === "es");
        enBtn.classList.toggle("active", lang === "en");
    }

    esBtn?.addEventListener("click", () => setLanguage("es"));
    enBtn?.addEventListener("click", () => setLanguage("en"));

    const savedLang = localStorage.getItem("lang") || "es";
    setLanguage(savedLang);

    // Reiniciar proceso
    reiniciarBtn?.addEventListener("click", () => {
        steps.forEach(step => step.classList.remove("active"));
        steps[0].classList.add("active");
        document.getElementById("progress-container").classList.add("hidden");
        currentStep = 0;
        updateProgress();
    });

    function updateProgress() {
        const percent = (currentStep / (totalSteps - 1)) * 100;
        progressBar.style.width = percent + "%";
        currentStepText.textContent = currentStep;
    }
});
