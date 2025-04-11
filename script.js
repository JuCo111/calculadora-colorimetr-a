// Variables globales
let currentStep = 0;
let answers = {
    temperatura: { piel: 0, cabello: 0, ojos: 0 },
    valor: { piel: 0, cabello: 0, ojos: 0 },
    croma: { piel: 0, cabello: 0, ojos: 0 }
};

const steps = ["piel", "cabello", "ojos"];
const calculatorSection = document.querySelector('.calculator');
const resultsSection = document.querySelector('.results-container');
const loader = document.getElementById('loader');
const questionContainer = document.getElementById('question-container');

// Función para cambiar idioma
function setLanguage(lang) {
    document.querySelectorAll('.language-button').forEach(btn => btn.classList.remove('active'));
    if (lang === 'es') {
        document.querySelector('.language-button:nth-child(1)').classList.add('active');
    } else {
        document.querySelector('.language-button:nth-child(2)').classList.add('active');
    }
}

// Iniciar calculadora
function startCalculator() {
    document.querySelector('.home-banner').classList.add('hidden');
    calculatorSection.classList.remove('hidden');
    showStep();
}

// Mostrar paso actual
function showStep() {
    questionContainer.innerHTML = `
        <h3>Selecciona tus características de ${steps[currentStep]}</h3>
        <p>Elige un valor del 1 al 3 según lo indicado.</p>
        <div class="radio-group">
            <div class="radio-option">
                <input type="radio" id="opt1" name="answer" value="1">
                <label for="opt1">1</label>
            </div>
            <div class="radio-option">
                <input type="radio" id="opt2" name="answer" value="2">
                <label for="opt2">2</label>
            </div>
            <div class="radio-option">
                <input type="radio" id="opt3" name="answer" value="3">
                <label for="opt3">3</label>
            </div>
        </div>
    `;

    document.querySelectorAll('.step-circle').forEach((circle, index) => {
        circle.classList.remove('active');
        if (index === currentStep) {
            circle.classList.add('active');
        }
    });
}

// Paso siguiente
function nextStep() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        alert('Por favor selecciona una opción.');
        return;
    }

    const value = parseInt(selected.value);

    if (currentStep === 0) answers.temperatura.piel = value;
    if (currentStep === 1) answers.temperatura.cabello = value;
    if (currentStep === 2) answers.temperatura.ojos = value;

    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep();
    } else {
        showResults();
    }
}

// Volver atrás
function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep();
    }
}

// Mostrar resultados
function showResults() {
    calculatorSection.classList.add('hidden');
    loader.style.display = 'flex';

    setTimeout(() => {
        loader.style.display = 'none';
        resultsSection.classList.remove('hidden');

        const resultTitle = document.getElementById('result-title');
        const resultImage = document.getElementById('result-image');
        const resultDescription = document.getElementById('result-description');

        // Ejemplo de resultado (esto se reemplazará con la lógica de cálculo real)
        const resultadoEstacion = "Verano Claro";
        resultTitle.textContent = resultadoEstacion;
        resultImage.src = 'images/verano-claro.jpg';
        resultDescription.textContent = "Esta es tu paleta de colores ideal según tu análisis de colorimetría.";

    }, 1000);
}

// Reiniciar calculadora
function restartCalculator() {
    currentStep = 0;
    answers = {
        temperatura: { piel: 0, cabello: 0, ojos: 0 },
        valor: { piel: 0, cabello: 0, ojos: 0 }
    };
    resultsSection.classList.add('hidden');
    calculatorSection.classList.remove('hidden');
    showStep();
}
