// Global variables
let currentLanguage = 'es'; // Default language (Spanish)
let currentStep = 0;
let userResponses = {
  skin: {
    temperature: 0,
    value: 0,
    chroma: 0
  },
  hair: {
    temperature: 0,
    value: 0,
    chroma: 0
  },
  eyes: {
    temperature: 0,
    value: 0,
    chroma: 0
  }
};

// Dictionary for translations
const translations = {
  es: {
    startButton: "Iniciar tu Análisis de Color",
    title: "Calculadora de Colorimetría Personal",
    nextButton: "Siguiente",
    previousButton: "Anterior",
    calculateButton: "Calcular mi Estación",
    startAgainButton: "Comenzar de nuevo",
    skinTitle: "Análisis de tu Piel",
    hairTitle: "Análisis de tu Cabello",
    eyesTitle: "Análisis de tus Ojos",
    resultTitle: "Tu Resultado de Colorimetría",
    temperatureQuestion: "¿Cómo describirías la temperatura de tu {feature}?",
    valueQuestion: "¿Cómo describirías el valor (claridad) de tu {feature}?",
    chromaQuestion: "¿Cómo describirías el croma (intensidad) de tu {feature}?",
    warm: "Cálido",
    cool: "Frío",
    light: "Claro",
    dark: "Oscuro",
    bright: "Brillante/Intenso",
    soft: "Suave/Muted",
    skin: "piel",
    hair: "cabello",
    eyes: "ojos",
    recommendations: "Recomendaciones para tu estación:",
    // Help texts for each section
    skinHelp: "Para determinar el subtono de tu piel, observa las venas en tu muñeca bajo luz natural. Si aparecen azules o moradas, probablemente tienes subtono frío. Si se ven verdes, probablemente cálido. También puedes considerar si te favorecen más los accesorios plateados (frío) o dorados (cálido).",
    hairHelp: "Examina tu cabello natural bajo luz natural. El cabello cálido suele tener reflejos dorados, cobrizos o rojizos. El cabello frío tiene matices ceniza, plateados o fríos.",
    eyesHelp: "Observa tus ojos bajo luz natural. Los ojos cálidos suelen tener toques de oro, avellana o ámbar. Los ojos fríos tienden a mostrar matices azulados, grises o fríos.",
    valueHelp: "El valor se refiere a qué tan claro u oscuro es un rasgo. Una piel clara se quema fácilmente, mientras que una oscura tiene más melanina. El cabello claro va del rubio al castaño claro, y el oscuro del castaño oscuro al negro. Los ojos claros son azules, verdes claros o avellana, mientras los oscuros son marrón, verde oscuro o negro.",
    chromaHelp: "El croma o intensidad se refiere a qué tan puro o apagado es un color. Un rasgo brillante/intenso es vívido y llamativo, mientras que uno suave/muted es más apagado o grisáceo."
  },
  en: {
    startButton: "Start Your Color Analysis",
    title: "Personal Colorimetry Calculator",
    nextButton: "Next",
    previousButton: "Previous",
    calculateButton: "Calculate My Season",
    startAgainButton: "Start Again",
    skinTitle: "Skin Analysis",
    hairTitle: "Hair Analysis",
    eyesTitle: "Eye Analysis",
    resultTitle: "Your Colorimetry Result",
    temperatureQuestion: "How would you describe your {feature} temperature?",
    valueQuestion: "How would you describe your {feature} value (lightness)?",
    chromaQuestion: "How would you describe your {feature} chroma (intensity)?",
    warm: "Warm",
    cool: "Cool",
    light: "Light",
    dark: "Dark",
    bright: "Bright/Intense",
    soft: "Soft/Muted",
    skin: "skin",
    hair: "hair",
    eyes: "eyes",
    recommendations: "Recommendations for your season:",
    // Help texts for each section
    skinHelp: "To determine your skin undertone, look at the veins on your wrist in natural light. If they appear blue or purple, you likely have a cool undertone. If they look green, likely warm. You can also consider whether silver (cool) or gold (warm) accessories flatter you more.",
    hairHelp: "Examine your natural hair in natural light. Warm hair tends to have golden, copper, or reddish highlights. Cool hair has ashy, silvery, or cool tones.",
    eyesHelp: "Look at your eyes in natural light. Warm eyes often have flecks of gold, hazel, or amber. Cool eyes tend to show bluish, grayish, or cool tones.",
    valueHelp: "Value refers to how light or dark a feature is. Light skin burns easily, while dark skin has more melanin. Light hair ranges from blonde to light brown, and dark hair from dark brown to black. Light eyes are blue, light green, or hazel, while dark eyes are brown, dark green, or black.",
    chromaHelp: "Chroma or intensity refers to how pure or muted a color is. A bright/intense feature is vivid and striking, while a soft/muted one is more grayed out or toned down."
  }
};

// Season calculation logic
const seasons = {
  "Primavera Clara": {
    temp: "warm",
    value: "light",
    chroma: "bright",
    recommendations: {
      es: "Colores vivos y cálidos, tonos pastel cálidos, evita colores muy oscuros o apagados.",
      en: "Vibrant and warm colors, warm pastels, avoid very dark or muted colors."
    },
    imagePath: "imagenes/primavera-clara.jpg"
  },
  "Light Spring": {
    temp: "warm",
    value: "light",
    chroma: "bright",
    recommendations: {
      es: "Colores vivos y cálidos, tonos pastel cálidos, evita colores muy oscuros o apagados.",
      en: "Vibrant and warm colors, warm pastels, avoid very dark or muted colors."
    },
    imagePath: "images/light-spring.jpg"
  },
  "Primavera Brillante": {
    temp: "warm",
    value: "light",
    chroma: "bright",
    recommendations: {
      es: "Colores vivos y brillantes, amarillos, naranjas vibrantes, evita colores muy oscuros o apagados.",
      en: "Vivid and bright colors, yellows, vibrant oranges, avoid very dark or muted colors."
    },
    imagePath: "imagenes/primavera-brillante.jpg"
  },
  "Bright Spring": {
    temp: "warm",
    value: "light",
    chroma: "bright",
    recommendations: {
      es: "Colores vivos y brillantes, amarillos, naranjas vibrantes, evita colores muy oscuros o apagados.",
      en: "Vivid and bright colors, yellows, vibrant oranges, avoid very dark or muted colors."
    },
    imagePath: "images/bright-spring.jpg"
  },
  "Primavera Cálida": {
    temp: "warm",
    value: "light",
    chroma: "bright",
    recommendations: {
      es: "Colores terrosos cálidos, dorados, coral, evita colores muy fríos o apagados.",
      en: "Warm earthy colors, gold, coral, avoid very cool or muted colors."
    },
    imagePath: "imagenes/primavera-calida.jpg"
  },
  "Warm Spring": {
    temp: "warm",
    value: "light",
    chroma: "bright",
    recommendations: {
      es: "Colores terrosos cálidos, dorados, coral, evita colores muy fríos o apagados.",
      en: "Warm earthy colors, gold, coral, avoid very cool or muted colors."
    },
    imagePath: "images/warm-spring.jpg"
  },
  "Verano Claro": {
    temp: "cool",
    value: "light",
    chroma: "soft",
    recommendations: {
      es: "Colores suaves y fríos, pastel con toque grisáceo, evita colores muy intensos o demasiado cálidos.",
      en: "Soft and cool colors, pastels with a grayish touch, avoid very intense or too warm colors."
    },
    imagePath: "imagenes/verano-claro.jpg"
  },
  "Light Summer": {
    temp: "cool",
    value: "light",
    chroma: "soft",
    recommendations: {
      es: "Colores suaves y fríos, pastel con toque grisáceo, evita colores muy intensos o demasiado cálidos.",
      en: "Soft and cool colors, pastels with a grayish touch, avoid very intense or too warm colors."
    },
    imagePath: "images/light-summer.jpg"
  },
  "Verano Frío": {
    temp: "cool",
    value: "light",
    chroma: "soft",
    recommendations: {
      es: "Colores fríos y suaves, azules, malvas, evita colores muy cálidos o muy intensos.",
      en: "Cool and soft colors, blues, mauves, avoid very warm or very intense colors."
    },
    imagePath: "imagenes/verano-frio.jpg"
  },
  "Cool Summer": {
    temp: "cool",
    value: "light",
    chroma: "soft",
    recommendations: {
      es: "Colores fríos y suaves, azules, malvas, evita colores muy cálidos o muy intensos.",
      en: "Cool and soft colors, blues, mauves, avoid very warm or very intense colors."
    },
    imagePath: "images/cool-summer.jpg"
  },
  "Verano Suave": {
    temp: "cool",
    value: "light",
    chroma: "soft",
    recommendations: {
      es: "Colores suaves y apagados, tonos pastel polvorientos, evita colores muy brillantes o muy oscuros.",
      en: "Soft and muted colors, dusty pastels, avoid very bright or very dark colors."
    },
    imagePath: "imagenes/verano-suave.jpg"
  },
  "Soft Summer": {
    temp: "cool",
    value: "light",
    chroma: "soft",
    recommendations: {
      es: "Colores suaves y apagados, tonos pastel polvorientos, evita colores muy brillantes o muy oscuros.",
      en: "Soft and muted colors, dusty pastels, avoid very bright or very dark colors."
    },
    imagePath: "images/soft-summer.jpg"
  },
  "Otoño Suave": {
    temp: "warm",
    value: "dark",
    chroma: "soft",
    recommendations: {
      es: "Colores terrosos apagados, oliva, mostaza suave, evita colores muy brillantes o muy fríos.",
      en: "Muted earthy colors, olive, soft mustard, avoid very bright or very cool colors."
    },
    imagePath: "imagenes/otono-suave.jpg"
  },
  "Soft Autumn": {
    temp: "warm",
    value: "dark",
    chroma: "soft",
    recommendations: {
      es: "Colores terrosos apagados, oliva, mostaza suave, evita colores muy brillantes o muy fríos.",
      en: "Muted earthy colors, olive, soft mustard, avoid very bright or very cool colors."
    },
    imagePath: "images/soft-autumn.jpg"
  },
  "Otoño Cálido": {
    temp: "warm",
    value: "dark",
    chroma: "soft",
    recommendations: {
      es: "Colores cálidos terrosos, calabaza, marrón cobrizo, evita colores muy fríos o muy brillantes.",
      en: "Warm earthy colors, pumpkin, copper brown, avoid very cool or very bright colors."
    },
    imagePath: "imagenes/otono-calido.jpg"
  },
  "Warm Autumn": {
    temp: "warm",
    value: "dark",
    chroma: "soft",
    recommendations: {
      es: "Colores cálidos terrosos, calabaza, marrón cobrizo, evita colores muy fríos o muy brillantes.",
      en: "Warm earthy colors, pumpkin, copper brown, avoid very cool or very bright colors."
    },
    imagePath: "images/warm-autumn.jpg"
  },
  "Otoño Profundo": {
    temp: "warm",
    value: "dark",
    chroma: "soft",
    recommendations: {
      es: "Colores profundos y terrosos, burdeos, verde bosque, evita colores muy claros o muy fríos.",
      en: "Deep and earthy colors, burgundy, forest green, avoid very light or very cool colors."
    },
    imagePath: "imagenes/otono-profundo.jpg"
  },
  "Deep Autumn": {
    temp: "warm",
    value: "dark",
    chroma: "soft",
    recommendations: {
      es: "Colores profundos y terrosos, burdeos, verde bosque, evita colores muy claros o muy fríos.",
      en: "Deep and earthy colors, burgundy, forest green, avoid very light or very cool colors."
    },
    imagePath: "images/deep-autumn.jpg"
  },
  "Invierno Profundo": {
    temp: "cool",
    value: "dark",
    chroma: "bright",
    recommendations: {
      es: "Colores oscuros e intensos, negro, azul marino, evita colores muy claros o apagados.",
      en: "Dark and intense colors, black, navy blue, avoid very light or muted colors."
    },
    imagePath: "imagenes/invierno-profundo.jpg"
  },
  "Deep Winter": {
    temp: "cool",
    value: "dark",
    chroma: "bright",
    recommendations: {
      es: "Colores oscuros e intensos, negro, azul marino, evita colores muy claros o apagados.",
      en: "Dark and intense colors, black, navy blue, avoid very light or muted colors."
    },
    imagePath: "images/deep-winter.jpg"
  },
  "Invierno Frío": {
    temp: "cool",
    value: "dark",
    chroma: "bright",
    recommendations: {
      es: "Colores fríos e intensos, azul hielo, fucsia, evita colores terrosos o muy apagados.",
      en: "Cool and intense colors, ice blue, fuchsia, avoid earthy or very muted colors."
    },
    imagePath: "imagenes/invierno-frio.jpg"
  },
  "Cool Winter": {
    temp: "cool",
    value: "dark",
    chroma: "bright",
    recommendations: {
      es: "Colores fríos e intensos, azul hielo, fucsia, evita colores terrosos o muy apagados.",
      en: "Cool and intense colors, ice blue, fuchsia, avoid earthy or very muted colors."
    },
    imagePath: "images/cool-winter.jpg"
  },
  "Invierno Brillante": {
    temp: "cool",
    value: "dark",
    chroma: "bright",
    recommendations: {
      es: "Colores brillantes y contrastantes, blanco puro, rojo intenso, evita colores apagados o muy cálidos.",
      en: "Bright and contrasting colors, pure white, intense red, avoid muted or very warm colors."
    },
    imagePath: "imagenes/invierno-brillante.jpg"
  },
  "Bright Winter": {
    temp: "cool",
    value: "dark",
    chroma: "bright",
    recommendations: {
      es: "Colores brillantes y contrastantes, blanco puro, rojo intenso, evita colores apagados o muy cálidos.",
      en: "Bright and contrasting colors, pure white, intense red, avoid muted or very warm colors."
    },
    imagePath: "images/bright-winter.jpg"
  }
};

// Helper functions
function getText(key, replaceObject = {}) {
  let text = translations[currentLanguage][key] || key;
  
  // Replace dynamic content if any
  for (const [placeholder, value] of Object.entries(replaceObject)) {
    text = text.replace(`{${placeholder}}`, value);
  }
  
  return text;
}

// Function to initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Setup language selector
  const languageSelector = document.getElementById('language-selector');
  if (languageSelector) {
    languageSelector.addEventListener('change', function() {
      currentLanguage = this.value;
      updateUI();
    });
  }
  
  // Setup start button
  const startButton = document.getElementById('start-button');
  if (startButton) {
    startButton.addEventListener('click', function() {
      currentStep = 1;
      updateUI();
    });
    startButton.textContent = getText('startButton');
  }
  
  // Update UI based on initial state
  updateUI();
});

// Function to update the UI based on the current step
function updateUI() {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;
  
  // Clear main content
  mainContent.innerHTML = '';
  
  // Update based on current step
  switch(currentStep) {
    case 0:
      renderHomePage(mainContent);
      break;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      renderQuestionStep(mainContent);
      break;
    case 10:
      renderResults(mainContent);
      break;
    default:
      renderHomePage(mainContent);
  }
}

// Function to render home page
function renderHomePage(container) {
  const header = document.createElement('h1');
  header.textContent = getText('title');
  header.className = 'main-title';
  
  const startButton = document.createElement('button');
  startButton.textContent = getText('startButton');
  startButton.className = 'btn-primary';
  startButton.addEventListener('click', function() {
    currentStep = 1;
    updateUI();
  });
  
  container.appendChild(header);
  container.appendChild(startButton);
}

// Function to render a question step
function renderQuestionStep(container) {
  const feature = getFeatureFromStep();
  const attribute = getAttributeFromStep();
  
  // Create header for current section
  const header = document.createElement('h2');
  if (feature === 'skin') {
    header.textContent = getText('skinTitle');
  } else if (feature === 'hair') {
    header.textContent = getText('hairTitle');
  } else if (feature === 'eyes') {
    header.textContent = getText('eyesTitle');
  }
  header.className = 'section-title';
  
  // Create question text
  const question = document.createElement('p');
  if (attribute === 'temperature') {
    question.textContent = getText('temperatureQuestion', { feature: getText(feature) });
  } else if (attribute === 'value') {
    question.textContent = getText('valueQuestion', { feature: getText(feature) });
  } else if (attribute === 'chroma') {
    question.textContent = getText('chromaQuestion', { feature: getText(feature) });
  }
  question.className = 'question-text';
  
  // Create help text
  const helpTextDiv = document.createElement('div');
  helpTextDiv.className = 'help-text';
  const helpText = document.createElement('p');
  
  if (attribute === 'temperature') {
    if (feature === 'skin') {
      helpText.textContent = getText('skinHelp');
    } else if (feature === 'hair') {
      helpText.textContent = getText('hairHelp');
    } else if (feature === 'eyes') {
      helpText.textContent = getText('eyesHelp');
    }
  } else if (attribute === 'value') {
    helpText.textContent = getText('valueHelp');
  } else if (attribute === 'chroma') {
    helpText.textContent = getText('chromaHelp');
  }
  
  helpTextDiv.appendChild(helpText);
  
  // Create options (buttons)
  const optionsDiv = document.createElement('div');
  optionsDiv.className = 'options-container';
  
  // Create option buttons based on the attribute
  let option1, option2;
  if (attribute === 'temperature') {
    option1 = { value: 'warm', label: getText('warm') };
    option2 = { value: 'cool', label: getText('cool') };
  } else if (attribute === 'value') {
    option1 = { value: 'light', label: getText('light') };
    option2 = { value: 'dark', label: getText('dark') };
  } else if (attribute === 'chroma') {
    option1 = { value: 'bright', label: getText('bright') };
    option2 = { value: 'soft', label: getText('soft') };
  }
  
  // Create buttons for options
  for (let score = 1; score <= 3; score++) {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option-item';
    
    // Create image placeholder
    const img = document.createElement('img');
    img.src = `placeholder-images/${feature}-${attribute}-${score}.jpg`;
    img.alt = `${feature} ${attribute} example ${score}`;
    img.className = 'option-image';
    
    // Create button with the appropriate label
    const btn = document.createElement('button');
    const label = score <= 1.5 ? option1.label : option2.label;
    btn.textContent = `${label} ${score}`;
    btn.className = 'option-button';
    btn.dataset.score = score;
    btn.addEventListener('click', function() {
      // Save user's choice
      userResponses[feature][attribute] = parseInt(this.dataset.score);
      
      // Move to next step
      currentStep++;
      updateUI();
    });
    
    optionDiv.appendChild(img);
    optionDiv.appendChild(btn);
    optionsDiv.appendChild(optionDiv);
  }
  
  // Create navigation buttons
  const navButtons = document.createElement('div');
  navButtons.className = 'nav-buttons';
  
  // Previous button (not shown on first step)
  if (currentStep > 1) {
    const prevButton = document.createElement('button');
    prevButton.textContent = getText('previousButton');
    prevButton.className = 'btn-secondary';
    prevButton.addEventListener('click', function() {
      currentStep--;
      updateUI();
    });
    navButtons.appendChild(prevButton);
  }
  
  // Append all elements to container
  container.appendChild(header);
  container.appendChild(question);
  container.appendChild(helpTextDiv);
  container.appendChild(optionsDiv);
  container.appendChild(navButtons);
}

// Helper function to determine feature (skin, hair, eyes) from current step
function getFeatureFromStep() {
  if (currentStep >= 1 && currentStep <= 3) {
    return 'skin';
  } else if (currentStep >= 4 && currentStep <= 6) {
    return 'hair';
  } else if (currentStep >= 7 && currentStep <= 9) {
    return 'eyes';
  }
  return '';
}

// Helper function to determine attribute (temperature, value, chroma) from current step
function getAttributeFromStep() {
  if (currentStep % 3 === 1) {
    return 'temperature';
  } else if (currentStep % 3 === 2) {
    return 'value';
  } else if (currentStep % 3 === 0) {
    return 'chroma';
  }
  return '';
}

// Function to calculate final season based on user responses
function calculateSeason() {
  // Initialize variables for weighted calculation
  let tempTotal = 0;
  let valueTotal = 0;
  let chromaTotal = 0;
  let weightTotal = 0;
  
  // Weights for each feature
  const weights = {
    skin: 3,
    hair: 2,
    eyes: 1
  };
  
  // Calculate weighted total for each attribute
  for (const [feature, weight] of Object.entries(weights)) {
    if (userResponses[feature].temperature) {
      tempTotal += userResponses[feature].temperature * weight;
      valueTotal += userResponses[feature].value * weight;
      chromaTotal += userResponses[feature].chroma * weight;
      weightTotal += weight;
    }
  }
  
  // Calculate average scores
  const tempAvg = tempTotal / weightTotal;
  const valueAvg = valueTotal / weightTotal;
  const chromaAvg = chromaTotal / weightTotal;
  
  // Determine characteristics based on averages
  const temp = tempAvg <= 1.5 ? "warm" : "cool";
  const value = valueAvg <= 1.5 ? "light" : "dark";
  const chroma = chromaAvg <= 1.5 ? "bright" : "soft";
  
  // Find matching season
  for (const [season, characteristics] of Object.entries(seasons)) {
    if (characteristics.temp === temp && 
        characteristics.value === value && 
        characteristics.chroma === chroma) {
      
      // Return the appropriate season name based on language
      if (currentLanguage === 'es') {
        if (season.startsWith("Light") || 
            season.startsWith("Bright") || 
            season.startsWith("Warm") || 
            season.startsWith("Cool") || 
            season.startsWith("Soft") ||
            season.startsWith("Deep")) {
          continue; // Skip English names
        }
        return season;
      } else {
        if (season.startsWith("Primavera") || 
            season.startsWith("Verano") || 
            season.startsWith("Otoño") || 
            season.startsWith("Invierno")) {
          continue; // Skip Spanish names
        }
        return season;
      }
    }
  }
  
  return currentLanguage === 'es' ? "Verano Claro" : "Light Summer"; // Default fallback
}

// Function to render results page
function renderResults(container) {
  const season = calculateSeason();
  const seasonData = seasons[season];
  
  // Create result header
  const header = document.createElement('h2');
  header.textContent = getText('resultTitle');
  header.className = 'result-title';
  
  // Create season name display
  const seasonName = document.createElement('h3');
  seasonName.textContent = season;
  seasonName.className = 'season-name';
  
  // Create palette image
  const paletteContainer = document.createElement('div');
  paletteContainer.className = 'palette-container';
  
  const paletteImage = document.createElement('img');
  paletteImage.src = seasonData.imagePath;
  paletteImage.alt = `${season} color palette`;
  paletteImage.className = 'palette-image';
  
  paletteContainer.appendChild(paletteImage);
  
  // Create recommendations
  const recommendationsHeader = document.createElement('h4');
  recommendationsHeader.textContent = getText('recommendations');
  recommendationsHeader.className = 'recommendations-header';
  
  const recommendationsText = document.createElement('p');
  recommendationsText.textContent = seasonData.recommendations[currentLanguage];
  recommendationsText.className = 'recommendations-text';
  
  // Create button to start again
  const startAgainBtn = document.createElement('button');
  startAgainBtn.textContent = getText('startAgainButton');
  startAgainBtn.className = 'btn-primary';
  startAgainBtn.addEventListener('click', function() {
    // Reset all responses
    userResponses = {
      skin: { temperature: 0, value: 0, chroma: 0 },
      hair: { temperature: 0, value: 0, chroma: 0 },
      eyes: { temperature: 0, value: 0, chroma: 0 }
    };
    
    // Go back to start
    currentStep = 0;
    updateUI();
  });
  
  // Append all elements to container
  container.appendChild(header);
  container.appendChild(seasonName);
  container.appendChild(paletteContainer);
  container.appendChild(recommendationsHeader);
  container.appendChild(recommendationsText);
  container.appendChild(startAgainBtn);
}