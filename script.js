// Variables globales
let currentStep = 0;
let answers = {
  temperatura: { piel: 0, cabello: 0, ojos: 0 },
  valor: { piel: 0, cabello: 0, ojos: 0 },
  croma: { piel: 0, cabello: 0, ojos: 0 }
};
let language = 'es'; // Idioma por defecto español

// Traducciones básicas
const translations = {
  es: {
    start: "Iniciar tu Análisis de Color",
    resultTitle: "Tu Estación Colorimétrica es:",
    recommendations: "Recomendaciones de Estilo:"
  },
  en: {
    start: "Start Your Color Analysis",
    resultTitle: "Your Color Season is:",
    recommendations: "Style Recommendations:"
  }
};

// Cambio de idioma
function changeLanguage(lang) {
  language = lang;
  document.querySelector('.start-button').innerText = translations[language].start;
}

// Mostrar paso de la calculadora
function showStep(step) {
  document.querySelectorAll('.step-content').forEach((stepEl, idx) => {
    stepEl.style.display = idx === step ? 'block' : 'none';
  });
  currentStep = step;
}

// Captura respuesta
function selectAnswer(category, area, value) {
  answers[category][area] = parseInt(value);
}

// Calcular resultados
function calculateResult() {
  const sumTemperatura = answers.temperatura.piel * 3 + answers.temperatura.cabello * 2 + answers.temperatura.ojos * 1;
  const sumValor = answers.valor.piel * 3 + answers.valor.cabello * 2 + answers.valor.ojos * 1;
  const sumCroma = answers.croma.piel * 3 + answers.croma.cabello * 2 + answers.croma.ojos * 1;

  // Lógica muy básica (ejemplo)
  let result = "";
  if (sumTemperatura >= sumValor && sumTemperatura >= sumCroma) {
    result = "Primavera Cálida";
  } else if (sumValor >= sumTemperatura && sumValor >= sumCroma) {
    result = "Verano Claro";
  } else {
    result = "Invierno Frío";
  }

  showResult(result);
}

// Mostrar resultados
function showResult(result) {
  document.querySelector('.calculator').style.display = 'none';
  document.querySelector('.results-container').style.display = 'block';

  document.querySelector('.result-title').innerText = `${translations[language].resultTitle} ${result}`;

  document.querySelector('.result-image').innerHTML = `
    <img src="images/${result.toLowerCase().replace(/ /g, '-')}.jpg" alt="Paleta ${result}">
  `;

  document.querySelector('.recommendation-section').innerHTML = `
    <h3>${translations[language].recommendations}</h3>
    <ul class="recommendation-list">
      <li>Usa tus colores ideales en las prendas principales.</li>
      <li>Evita colores que apaguen tu tono natural.</li>
      <li>Combina tonos de tu paleta para armonía total.</li>
    </ul>
  `;
}

// Listeners generales
document.addEventListener('DOMContentLoaded', () => {
  // Iniciar calculadora
  document.querySelector('.start-button').addEventListener('click', () => {
    document.querySelector('.home-banner').style.display = 'none';
    document.querySelector('.calculator').style.display = 'block';
    showStep(0);
  });

  // Selector de idioma
  document.querySelectorAll('.language-button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.language-button').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      changeLanguage(button.dataset.lang);
    });
  });

  // Botón siguiente
  document.querySelectorAll('.next-button').forEach(button => {
    button.addEventListener('click', () => {
      showStep(currentStep + 1);
    });
  });

  // Botón atrás
  document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', () => {
      showStep(currentStep - 1);
    });
  });

  // Botón finalizar
  document.querySelector('.submit-button').addEventListener('click', () => {
    calculateResult();
  });

  // Botón volver a empezar
  document.querySelector('.restart-button').addEventListener('click', () => {
    location.reload();
  });
});
