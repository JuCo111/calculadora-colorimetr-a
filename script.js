// Variables globales
let currentStep = 0;
let totalSteps = 6;
let language = 'es'; // Idioma predeterminado: español

// Datos para almacenar las selecciones del usuario
let userSelections = {
    // Temperatura (cálida vs fría)
    skinTemp: null,    // Temperatura de la piel
    hairTemp: null,    // Temperatura del cabello
    eyesTemp: null,    // Temperatura de los ojos
    // Valor (claro vs oscuro)
    skinValue: null,   // Valor de la piel
    hairValue: null,   // Valor del cabello
    eyesValue: null,   // Valor de los ojos
    // Croma (brillante vs suave)
    skinChroma: null,  // Croma de la piel
    hairChroma: null,  // Croma del cabello
    eyesChroma: null   // Croma de los ojos
};

// Pesos para cada característica (según documento)
const weights = {
    skin: 3,  // La piel tiene un peso de 3 puntos
    hair: 2,  // El cabello tiene un peso de 2 puntos
    eyes: 1   // Los ojos tienen un peso de 1 punto
};

// Datos de temporadas y sus características
const seasons = [
    {
        id: "deep-autumn",
        nameEs: "Otoño Oscuro / Profundo",
        nameEn: "Deep Autumn",
        temperature: { warm: [5], cool: [1] },
        value: { light: [0], dark: [6] },
        chroma: { bright: [1, 2], soft: [6, 5] }
    },
    {
        id: "warm-autumn",
        nameEs: "Otoño Cálido",
        nameEn: "Warm Autumn",
        temperature: { warm: [6], cool: [0] },
        value: { light: [3], dark: [3] },
        chroma: { bright: [3, 2], soft: [3, 4] }
    },
    {
        id: "soft-autumn",
        nameEs: "Otoño Suave",
        nameEn: "Soft Autumn",
        temperature: { warm: [5, 3], cool: [1, 3] },
        value: { light: [3, 5], dark: [3, 1] },
        chroma: { bright: [0], soft: [6] }
    },
    {
        id: "warm-spring",
        nameEs: "Primavera Cálida",
        nameEn: "Warm Spring",
        temperature: { warm: [6], cool: [0] },
        value: { light: [3, 6], dark: [3, 0] },
        chroma: { bright: [5], soft: [1] }
    },
    {
        id: "clear-spring",
        nameEs: "Primavera Brillante",
        nameEn: "Clear Spring",
        temperature: { warm: [4], cool: [2] },
        value: { light: [3], dark: [3] },
        chroma: { bright: [6], soft: [0] }
    },
    {
        id: "light-spring",
        nameEs: "Primavera Clara",
        nameEn: "Light Spring",
        temperature: { warm: [4, 3], cool: [2, 3] },
        value: { light: [6], dark: [0] },
        chroma: { bright: [3], soft: [3] }
    },
    {
        id: "clear-winter",
        nameEs: "Invierno Brillante",
        nameEn: "Clear Winter",
        temperature: { warm: [2, 1], cool: [4, 5] },
        value: { light: [3], dark: [3] },
        chroma: { bright: [6], soft: [0] }
    },
    {
        id: "cool-winter",
        nameEs: "Invierno Frío",
        nameEn: "Cool Winter",
        temperature: { warm: [0], cool: [6] },
        value: { light: [3, 1], dark: [3, 5] },
        chroma: { bright: [5], soft: [1] }
    },
    {
        id: "deep-winter",
        nameEs: "Invierno Oscuro / Profundo",
        nameEn: "Deep Winter",
        temperature: { warm: [1, 3], cool: [5, 3] },
        value: { light: [0], dark: [6] },
        chroma: { bright: [5, 3], soft: [1, 3] }
    },
    {
        id: "cool-summer",
        nameEs: "Verano Frío",
        nameEn: "Cool Summer",
        temperature: { warm: [0], cool: [6] },
        value: { light: [3], dark: [3] },
        chroma: { bright: [2, 3], soft: [4, 3] }
    },
    {
        id: "light-summer",
        nameEs: "Verano Claro",
        nameEn: "Light Summer",
        temperature: { warm: [1], cool: [5] },
        value: { light: [6], dark: [0] },
        chroma: { bright: [3, 0], soft: [3, 6] }
    },
    {
        id: "soft-summer",
        nameEs: "Verano Suave",
        nameEn: "Soft Summer",
        temperature: { warm: [2, 1], cool: [4, 5] },
        value: { light: [3], dark: [3] },
        chroma: { bright: [0], soft: [6] }
    }
];

// Traducciones para la aplicación
const translations = {
    es: {
        title: "Calculadora de Colorimetría",
        subtitle: "Descubre tu estación de color personalizada",
        start: "Comenzar",
        next: "Siguiente",
        back: "Atrás",
        restart: "Volver a comenzar",
        download: "Descargar resultado (PDF)",
        skin: {
            title: "¿Cómo es tu piel?",
            description: "Observa el tono base de tu piel sin maquillaje y bajo luz natural.",
            temp: {
                question: "¿Tu piel tiene un subtono cálido o frío?",
                warm: "Cálido (tonos dorados, amarillentos o melocotón)",
                neutral: "Neutral (mezcla de tonos cálidos y fríos)",
                cool: "Frío (tonos rosados, azulados o rojizos)"
            },
            value: {
                question: "¿Cómo es el valor de tu piel?",
                light: "Clara (pálida o de tono claro)",
                medium: "Media (ni muy clara ni muy oscura)",
                dark: "Oscura (bronceada o tono oscuro natural)"
            },
            chroma: {
                question: "¿Cuál es la intensidad/pureza del color de tu piel?",
                bright: "Brillante (color vibrante, contraste marcado)",
                medium: "Media (nivel medio de contraste)",
                soft: "Suave (color apagado, poco contraste)"
            }
        },
        hair: {
            title: "Sobre tu cabello",
            description: "Piensa en tu color de cabello natural o el que mejor te favorezca.",
            note: "Por favor piensa antes de calificar: 1. ¿De qué color era tu pelo natural? 2. ¿Te vas a dejar el color que tienes ahora? Y, 3. ¿Te favorece el color que llevas ahora en el pelo?",
            temp: {
                question: "¿Tu cabello tiene tonos cálidos o fríos?",
                warm: "Cálido (rubio dorado, cobrizo, castaño rojizo)",
                neutral: "Neutral (mezcla de tonos)",
                cool: "Frío (rubio ceniza, castaño frío, negro azulado)"
            },
            value: {
                question: "¿Cuál es el nivel de claridad de tu cabello?",
                light: "Claro (rubio, castaño claro)",
                medium: "Medio (castaño)",
                dark: "Oscuro (castaño oscuro, negro)"
            },
            chroma: {
                question: "¿Cuál es la intensidad del color de tu cabello?",
                bright: "Brillante (color intenso, refleja la luz)",
                medium: "Media (nivel medio de intensidad)",
                soft: "Suave (color apagado, mate)"
            }
        },
        eyes: {
            title: "Sobre tus ojos",
            description: "Observa el color predominante de tus ojos bajo luz natural.",
            temp: {
                question: "¿Tus ojos tienen tonos cálidos o fríos?",
                warm: "Cálidos (ámbar, marrón cálido, verde oliva)",
                neutral: "Neutrales (mezcla de tonos)",
                cool: "Fríos (azul, verde agua, gris, marrón frío)"
            },
            value: {
                question: "¿Cuál es la intensidad de color de tus ojos?",
                light: "Claros (azul claro, verde claro, ámbar claro)",
                medium: "Medios (intensidad media)",
                dark: "Oscuros (marrón oscuro, verde oscuro, azul oscuro)"
            },
            chroma: {
                question: "¿Tus ojos tienen un color vibrante o suave?",
                bright: "Brillantes (color intenso, definido)",
                medium: "Medios (nivel medio de intensidad)",
                soft: "Suaves (color sutil, menos definido)"
            }
        },
        result: {
            title: "Tu resultado: ",
            description: "Basado en tus características, tu estación de color es:",
            explanation: "Esta paleta de colores realzará tu belleza natural y hará que luzcas radiante.",
            tips: "Consejos estilísticos:",
            deepAutumn: {
                description: "Como Otoño Oscuro/Profundo, te favorecen los colores ricos y terrosos con profundidad y calidez. Tu paleta es cálida pero con una notable intensidad y profundidad.",
                tips: [
                    "Busca tonos que combinen calidez y profundidad como terracota, mostaza oscura y verde oliva.",
                    "Los metálicos como el bronce y el cobre realzarán tu coloración natural.",
                    "Evita colores pastel y tonos muy fríos o brillantes, que pueden apagar tu complexión."
                ]
            },
            warmAutumn: {
                description: "Como Otoño Cálido, tu paleta se caracteriza por colores terrosos y cálidos con un brillo dorado. Estos tonos complementan perfectamente tu coloración natural.",
                tips: [
                    "Opta por colores como naranja quemado, marrón cobrizo, verde oliva y amarillo mostaza.",
                    "Los dorados te favorecen más que los plateados para joyería y accesorios.",
                    "Evita los colores fríos y brillantes que pueden contrastar demasiado con tu armonía natural."
                ]
            },
            softAutumn: {
                description: "Como Otoño Suave, tienes una paleta cálida pero suavizada, con tonos terrosos apagados que reflejan la serenidad del otoño tardío.",
                tips: [
                    "Elige tonos como salvia, terracota suave, azul grisáceo y marrón topo.",
                    "Los colores difuminados y con un toque de gris te favorecen especialmente.",
                    "Evita colores muy intensos o brillantes que pueden parecer demasiado duros contra tu apariencia natural."
                ]
            },
            warmSpring: {
                description: "Como Primavera Cálida, te beneficias de colores claros, cálidos y brillantes que reflejan la frescura y vivacidad de la primavera temprana.",
                tips: [
                    "Luce colores como coral, amarillo dorado, verde manzana y turquesa cálido.",
                    "Los dorados te favorecen mucho más que los plateados en joyería.",
                    "Evita colores oscuros o apagados que pueden apagar tu brillo natural."
                ]
            },
            clearSpring: {
                description: "Como Primavera Brillante, tu paleta consiste en colores claros, brillantes y con un toque de calidez, como las flores primaverales bajo el sol.",
                tips: [
                    "Escoge colores vibrantes como turquesa brillante, coral vivo, amarillo claro y verde hierba.",
                    "Los contrastes claros te favorecen, especialmente cuando incluyen un toque de calidez.",
                    "Evita colores muy oscuros o demasiado apagados que pueden contrastar negativamente con tu claridad natural."
                ]
            },
            lightSpring: {
                description: "Como Primavera Clara, te favorecen los colores suaves, ligeros y cálidos que evocan la delicadeza de las flores primaverales.",
                tips: [
                    "Usa tonos como melocotón, verde menta, amarillo mantequilla y rosa coral.",
                    "Los colores pastel con un toque de calidez realzarán tu apariencia natural.",
                    "Evita colores muy oscuros o demasiado intensos que pueden resultar abrumadores."
                ]
            },
            clearWinter: {
                description: "Como Invierno Brillante, te favorecen los colores intensos y vibrantes con un subtono frío, que reflejan la claridad del hielo invernal.",
                tips: [
                    "Busca colores como rojo vivo, azul eléctrico, magenta y verde esmeralda.",
                    "Los contrastes marcados entre colores claros y oscuros te benefician especialmente.",
                    "Evita tonos terrosos o apagados que pueden disminuir tu brillo natural."
                ]
            },
            coolWinter: {
                description: "Como Invierno Frío, tu paleta consiste en colores fríos, claros y con alta intensidad, similar a los paisajes de invierno bajo la luz del sol.",
                tips: [
                    "Luce colores como azul hielo, violeta, rosa frío y verde menta.",
                    "Los plateados te favorecen más que los dorados en joyería y accesorios.",
                    "Evita colores cálidos y terrosos que pueden contrastar negativamente con tu tono frío."
                ]
            },
            deepWinter: {
                description: "Como Invierno Oscuro/Profundo, te beneficias de colores intensos y oscuros con un subtono frío, que reflejan las noches de invierno.",
                tips: [
                    "Escoge colores como burdeos, azul marino, verde bosque y ciruela.",
                    "Los contrastes intensos realzan tu coloración natural.",
                    "Evita tonos pastel o demasiado suaves que pueden apagar tu intensidad natural."
                ]
            },
            coolSummer: {
                description: "Como Verano Frío, tu paleta se compone de colores suaves y fríos con un toque de gris, como un día nublado de verano.",
                tips: [
                    "Elige tonos como lavanda, azul francés, rosa frío y verde salvia.",
                    "Los colores suavizados con un toque grisáceo te favorecen especialmente.",
                    "Evita colores muy brillantes o cálidos que pueden contrastar demasiado con tu suavidad natural."
                ]
            },
            lightSummer: {
                description: "Como Verano Claro, te beneficias de colores suaves, claros y ligeramente fríos, como un amanecer de verano.",
                tips: [
                    "Usa colores como rosa pálido, azul cielo, lila y verde agua.",
                    "Los tonos pastel con un ligero toque frío realzarán tu apariencia natural.",
                    "Evita colores muy oscuros o demasiado intensos que pueden resultar abrumadores."
                ]
            },
            softSummer: {
                description: "Como Verano Suave, te favorecen los colores suaves, apagados y ligeramente fríos que evocan la serenidad del atardecer veraniego.",
                tips: [
                    "Luce tonos como malva, verde grisáceo, azul polvoriento y rosa antiguo.",
                    "Los colores con un toque de gris complementan perfectamente tu suavidad natural.",
                    "Evita colores muy brillantes o contrastantes que pueden parecer duros en tu apariencia."
                ]
            }
        },
        loading: "Calculando tu resultado..."
    },
    en: {
        title: "Color Analysis Calculator",
        subtitle: "Discover your personalized color season",
        start: "Start",
        next: "Next",
        back: "Back",
        restart: "Start over",
        download: "Download result (PDF)",
        skin: {
            title: "About your skin",
            description: "Look at your skin's base tone without makeup and under natural light.",
            temp: {
                question: "Does your skin have a warm or cool undertone?",
                warm: "Warm (golden, yellowish or peach tones)",
                neutral: "Neutral (mix of warm and cool tones)",
                cool: "Cool (pink, bluish or reddish tones)"
            },
            value: {
                question: "What is your skin's value?",
                light: "Light (pale or light tone)",
                medium: "Medium (neither very light nor very dark)",
                dark: "Dark (tanned or naturally dark tone)"
            },
            chroma: {
                question: "What is the intensity/purity of your skin color?",
                bright: "Bright (vibrant color, marked contrast)",
                medium: "Medium (average level of contrast)",
                soft: "Soft (muted color, little contrast)"
            }
        },
        hair: {
            title: "About your hair",
            description: "Think about your natural hair color or the one that suits you best.",
            note: "Please think before rating: 1. What was your natural hair color? 2. Are you keeping your current color? And, 3. Does your current hair color flatter you?",
            temp: {
                question: "Does your hair have warm or cool tones?",
                warm: "Warm (golden blonde, copper, auburn)",
                neutral: "Neutral (mix of tones)",
                cool: "Cool (ash blonde, cool brown, bluish black)"
            },
            value: {
                question: "What is your hair's level of lightness?",
                light: "Light (blonde, light brown)",
                medium: "Medium (medium brown)",
                dark: "Dark (dark brown, black)"
            },
            chroma: {
                question: "What is your hair color's intensity?",
                bright: "Bright (intense color, reflects light)",
                medium: "Medium (average level of intensity)",
                soft: "Soft (muted color, matte)"
            }
        },
        eyes: {
            title: "About your eyes",
            description: "Look at the predominant color of your eyes under natural light.",
            temp: {
                question: "Do your eyes have warm or cool tones?",
                warm: "Warm (amber, warm brown, olive green)",
                neutral: "Neutral (mix of tones)",
                cool: "Cool (blue, aqua green, gray, cool brown)"
            },
            value: {
                question: "What is the color intensity of your eyes?",
                light: "Light (light blue, light green, light amber)",
                medium: "Medium (medium intensity)",
                dark: "Dark (dark brown, dark green, dark blue)"
            },
            chroma: {
                question: "Do your eyes have a vibrant or soft color?",
                bright: "Bright (intense, defined color)",
                medium: "Medium (average level of intensity)",
                soft: "Soft (subtle color, less defined)"
            }
        },
        result: {
            title: "Your result: ",
            description: "Based on your characteristics, your color season is:",
            explanation: "This color palette will enhance your natural beauty and make you look radiant.",
            tips: "Style tips:",
            deepAutumn: {
                description: "As a Deep Autumn, you are flattered by rich, earthy colors with depth and warmth. Your palette is warm but with notable intensity and depth.",
                tips: [
                    "Look for shades that combine warmth and depth like terracotta, dark mustard, and olive green.",
                    "Metallics like bronze and copper will enhance your natural coloring.",
                    "Avoid pastel colors and very cool or bright tones, which can dull your complexion."
                ]
            },
            warmAutumn: {
                description: "As a Warm Autumn, your palette is characterized by earthy, warm colors with a golden glow. These tones perfectly complement your natural coloring.",
                tips: [
                    "Choose colors like burnt orange, copper brown, olive green, and mustard yellow.",
                    "Gold flatters you more than silver for jewelry and accessories.",
                    "Avoid cool and bright colors that may contrast too much with your natural harmony."
                ]
            },
            softAutumn: {
                description: "As a Soft Autumn, you have a warm but softened palette, with muted earthy tones that reflect the serenity of late autumn.",
                tips: [
                    "Choose tones like sage, soft terracotta, grayish blue, and taupe.",
                    "Diffused colors with a touch of gray are especially flattering.",
                    "Avoid very intense or bright colors that may appear too harsh against your natural appearance."
                ]
            },
            warmSpring: {
                description: "As a Warm Spring, you benefit from light, warm, and bright colors that reflect the freshness and liveliness of early spring.",
                tips: [
                    "Wear colors like coral, golden yellow, apple green, and warm turquoise.",
                    "Gold flatters you much more than silver in jewelry.",
                    "Avoid dark or muted colors that can dull your natural brightness."
                ]
            },
            clearSpring: {
                description: "As a Clear Spring, your palette consists of clear, bright colors with a touch of warmth, like spring flowers under the sun.",
                tips: [
                    "Choose vibrant colors like bright turquoise, vivid coral, light yellow, and grass green.",
                    "Clear contrasts flatter you, especially when they include a touch of warmth.",
                    "Avoid very dark or too muted colors that can negatively contrast with your natural clarity."
                ]
            },
            lightSpring: {
                description: "As a Light Spring, you are flattered by soft, light, and warm colors that evoke the delicacy of spring flowers.",
                tips: [
                    "Use tones like peach, mint green, butter yellow, and coral pink.",
                    "Pastel colors with a touch of warmth will enhance your natural appearance.",
                    "Avoid very dark or too intense colors that can be overwhelming."
                ]
            },
            clearWinter: {
                description: "As a Clear Winter, you are flattered by intense and vibrant colors with a cool undertone, reflecting the clarity of winter ice.",
                tips: [
                    "Look for colors like vivid red, electric blue, magenta, and emerald green.",
                    "Strong contrasts between light and dark colors especially benefit you.",
                    "Avoid earthy or muted tones that can diminish your natural brightness."
                ]
            },
            coolWinter: {
                description: "As a Cool Winter, your palette consists of cool, clear colors with high intensity, similar to winter landscapes under sunlight.",
                tips: [
                    "Wear colors like ice blue, violet, cool pink, and mint green.",
                    "Silver flatters you more than gold in jewelry and accessories.",
                    "Avoid warm and earthy colors that may negatively contrast with your cool tone."
                ]
            },
            deepWinter: {
                description: "As a Deep Winter, you benefit from intense and dark colors with a cool undertone, reflecting winter nights.",
                tips: [
                    "Choose colors like burgundy, navy blue, forest green, and plum.",
                    "Intense contrasts enhance your natural coloring.",
                    "Avoid pastel or too soft tones that can dull your natural intensity."
                ]
            },
            coolSummer: {
                description: "As a Cool Summer, your palette consists of soft and cool colors with a touch of gray, like a cloudy summer day.",
                tips: [
                    "Choose tones like lavender, French blue, cool pink, and sage green.",
                    "Softened colors with a grayish touch are especially flattering.",
                    "Avoid very bright or warm colors that may contrast too much with your natural softness."
                ]
            },
            lightSummer: {
                description: "As a Light Summer, you benefit from soft, light, and slightly cool colors, like a summer dawn.",
                tips: [
                    "Use colors like pale pink, sky blue, lilac, and aqua green.",
                    "Pastel tones with a slight cool touch will enhance your natural appearance.",
                    "Avoid very dark or too intense colors that can be overwhelming."
                ]
            },
            softSummer: {
                description: "As a Soft Summer, you are flattered by soft, muted, and slightly cool colors that evoke the serenity of a summer sunset.",
                tips: [
                    "Wear tones like mauve, grayish green, dusty blue, and antique rose.",
                    "Colors with a touch of gray perfectly complement your natural softness.",
                    "Avoid very bright or contrasting colors that may appear harsh on your appearance."
                ]
            }
        },
        loading: "Calculating your result..."
    }
};

// Inicializar la aplicación cuando se carga el documento
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    // Verificar si hay un idioma guardado en localStorage
    const savedLanguage = localStorage.getItem('colorimetryLang');
    if (savedLanguage) {
        language = savedLanguage;
    }

    // Inicializar botones de idioma
    initLanguageButtons();

    // Inicializar los elementos de la calculadora
    updateTexts();
    
    // Mostrar el paso inicial (portada)
    showStep(0);
    
    // Inicializar los botones de navegación
    document.getElementById('start-btn').addEventListener('click', () => {
        showStep(1);
    });
    
    document.getElementById('next-btn').addEventListener('click', goToNextStep);
    document.getElementById('back-btn').addEventListener('click', goToPreviousStep);
    document.getElementById('restart-btn').addEventListener('click', resetCalculator);
}

// Función para cambiar de idioma
function changeLanguage(lang) {
    language = lang;
    localStorage.setItem('colorimetryLang', lang);
    
    // Actualizar estados de botones de idioma
    const espBtn = document.getElementById('lang-es');
    const engBtn = document.getElementById('lang-en');
    
    espBtn.classList.toggle('active', lang === 'es');
    engBtn.classList.toggle('active', lang === 'en');
    
    // Actualizar todos los textos
    updateTexts();
}

// Inicializar botones de idioma
function initLanguageButtons() {
    const espBtn = document.getElementById('lang-es');
    const engBtn = document.getElementById('lang-en');
    
    espBtn.classList.toggle('active', language === 'es');
    engBtn.classList.toggle('active', language === 'en');
    
    espBtn.addEventListener('click', () => changeLanguage('es'));
    engBtn.addEventListener('click', () => changeLanguage('en'));
}

// Actualizar todos los textos de la interfaz según el idioma seleccionado
function updateTexts() {
    const texts = translations[language];
    
    // Títulos principales
    document.getElementById('main-title').textContent = texts.title;
    document.getElementById('subtitle').textContent = texts.subtitle;
    
    // Botones
    document.getElementById('start-btn').textContent = texts.start;
    document.getElementById('next-btn').textContent = texts.next;
    document.getElementById('back-btn').textContent = texts.back;
    document.getElementById('restart-btn').textContent = texts.restart;
    document.getElementById('download-btn').textContent = texts.download;
    
    // Paso 1: Piel - Temperatura
    document.getElementById('skin-temp-title').textContent = texts.skin.title;
    document.getElementById('skin-temp-description').textContent = texts.skin.description;
    document.getElementById('skin-temp-question').textContent = texts.skin.temp.question;
    document.getElementById('skin-temp-warm-label').textContent = texts.skin.temp.warm;
    document.getElementById('skin-temp-neutral-label').textContent = texts.skin.temp.neutral;
    document.getElementById('skin-temp-cool-label').textContent = texts.skin.temp.cool;
    
    // Paso 2: Piel - Valor
    document.getElementById('skin-value-title').textContent = texts.skin.title;
    document.getElementById('skin-value-description').textContent = texts.skin.description;
    document.getElementById('skin-value-question').textContent = texts.skin.value.question;
    document.getElementById('skin-value-light-label').textContent = texts.skin.value.light;
    document.getElementById('skin-value-medium-label').textContent = texts.skin.value.medium;
    document.getElementById('skin-value-dark-label').textContent = texts.skin.value.dark;
    
    // Paso 3: Piel - Croma
    document.getElementById('skin-chroma-title').textContent = texts.skin.title;
    document.getElementById('skin-chroma-description').textContent = texts.skin.description;
    document.getElementById('skin-chroma-question').textContent = texts.skin.chroma.question;
    document.getElementById('skin-chroma-bright-label').textContent = texts.skin.chroma.bright;
    document.getElementById('skin-chroma-medium-label').textContent = texts.skin.chroma.medium;
    document.getElementById('skin-chroma-soft-label').textContent = texts.skin.chroma.soft;
    
    // Paso 4: Cabello
    document.getElementById('hair-temp-title').textContent = texts.hair.title;
    document.getElementById('hair-temp-description').textContent = texts.hair.description;
    document.getElementById('hair-temp-note').textContent = texts.hair.note;
    document.getElementById('hair-temp-question').textContent = texts.hair.temp.question;
    document.getElementById('hair-temp-warm-label').textContent = texts.hair.temp.warm;
    document.getElementById('hair-temp-neutral-label').textContent = texts.hair.temp.neutral;
    document.getElementById('hair-temp-cool-label').textContent = texts.hair.temp.cool;
    
    // Paso 5: Ojos
    document.getElementById('eyes-temp-title').textContent = texts.eyes.title;
    document.getElementById('eyes-temp-description').textContent = texts.eyes.description;
    document.getElementById('eyes-temp-question').textContent = texts.eyes.temp.question;
    document.getElementById('eyes-temp-warm-label').textContent = texts.eyes.temp.warm;
    document.getElementById('eyes-temp-neutral-label').textContent = texts.eyes.temp.neutral;
    document.getElementById('eyes-temp-cool-label').textContent = texts.eyes.temp.cool;
    
    // Resultado
    document.getElementById('result-title-text').textContent = texts.result.title;
    document.getElementById('result-description').textContent = texts.result.description;
    document.getElementById('result-explanation').textContent = texts.result.explanation;
    document.getElementById('result-tips-title').textContent = texts.result.tips;
}

// Mostrar un paso específico
function showStep(stepNumber) {
    // Ocultar todos los pasos
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.classList.remove('active');
    });
    
    // Mostrar el paso actual
    document.getElementById(`step-${stepNumber}`).classList.add('active');
    currentStep = stepNumber;
    
    // Actualizar barra de progreso
    updateProgressBar();
    
    // Actualizar visibilidad de los botones de navegación
    updateNavigationButtons();
    
    // Desplazarse al inicio de la calculadora
    document.querySelector('.calculator-container').scrollIntoView({ behavior: 'smooth' });
}

// Actualizar la barra de progreso
function updateProgressBar() {
    // Solo actualizar la barra de progreso a partir del paso 1 (después de la portada)
    if (currentStep > 0) {
        const progressPercentage = ((currentStep) / (totalSteps)) * 100;
        document.querySelector('.progress-bar').style.width = `${progressPercentage}%`;
    } else {
        document.querySelector('.progress-bar').style.width = '0';
    }
}

// Actualizar la visibilidad de los botones de navegación
function updateNavigationButtons() {
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');
    const restartBtn = document.getElementById('restart-btn');
    const downloadBtn = document.getElementById('download-btn');
    
    // En la portada (paso 0)
    if (currentStep === 0) {
        nextBtn.style.display = 'none';
        backBtn.style.display = 'none';
        restartBtn.style.display = 'none';
        downloadBtn.style.display = 'none';
    }
    // En el resultado final (paso 6)
    else if (currentStep === 6) {
        nextBtn.style.display = 'none';
        backBtn.style.display = 'inline-block';
        restartBtn.style.display = 'inline-block';
        downloadBtn.style.display = 'inline-block';
    }
    // En los pasos intermedios (1-5)
    else {
        nextBtn.style.display = 'inline-block';
        backBtn.style.display = 'inline-block';
        restartBtn.style.display = 'none';
        downloadBtn.style.display = 'none';
        
        // Verificar si se ha seleccionado una opción en el paso actual para habilitar/deshabilitar el botón siguiente
        const isOptionSelected = isSelectionMade();
        nextBtn.disabled = !isOptionSelected;
    }
}

// Verificar si se hizo una selección en el paso actual
function isSelectionMade() {
    switch (currentStep) {
        case 1: // Piel - Temperatura
            return userSelections.skinTemp !== null;
        case 2: // Piel - Valor
            return userSelections.skinValue !== null;
        case 3: // Piel - Croma
            return userSelections.skinChroma !== null;
        case 4: // Cabello
            return userSelections.hairTemp !== null && userSelections.hairValue !== null && userSelections.hairChroma !== null;
        case 5: // Ojos
            return userSelections.eyesTemp !== null && userSelections.eyesValue !== null && userSelections.eyesChroma !== null;
        default:
            return true;
    }
}

// Ir al siguiente paso
function goToNextStep() {
    if (currentStep < totalSteps) {
        showStep(currentStep + 1);
    }
    
    // Si es el último paso (ojos), calcular el resultado
    if (currentStep === totalSteps) {
        calculateResult();
    }
}

// Volver al paso anterior
function goToPreviousStep() {
    if (currentStep > 0) {
        showStep(currentStep - 1);
    }
}

// Reiniciar la calculadora
function resetCalculator() {
    // Reiniciar todas las selecciones
    userSelections = {
        skinTemp: null,
        skinValue: null,
        skinChroma: null,
        hairTemp: null,
        hairValue: null,
        hairChroma: null,
        eyesTemp: null,
        eyesValue: null,
        eyesChroma: null
    };
    
    // Eliminar todas las clases "selected" de las opciones
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    document.querySelectorAll('.numeric-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Volver al paso 1
    showStep(1);
}

// Manejar la selección de una opción
function selectOption(category, value, element) {
    // Eliminar la clase "selected" de todas las opciones del mismo grupo
    const optionGroup = element.closest('.options-container').querySelectorAll('.option');
    optionGroup.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Agregar la clase "selected" a la opción seleccionada
    element.classList.add('selected');
    
    // Guardar la selección
    userSelections[category] = value;
    
    // Habilitar el botón "Siguiente" si corresponde
    updateNavigationButtons();
}

// Manejar la selección de una opción numérica
function selectNumericOption(category, value, element) {
    // Eliminar la clase "selected" de todas las opciones del mismo grupo
    const optionGroup = element.closest('.numeric-options').querySelectorAll('.numeric-option');
    optionGroup.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Agregar la clase "selected" a la opción seleccionada
    element.classList.add('selected');
    
    // Guardar la selección
    userSelections[category] = value;
    
    // Habilitar el botón "Siguiente" si corresponde
    updateNavigationButtons();
}

// Calcular el resultado final
function calculateResult() {
    // Mostrar el loader
    document.querySelector('.loader-container').style.display = 'flex';
    
    // Simular un tiempo de cálculo (para una mejor experiencia de usuario)
    setTimeout(() => {
        // Calcular las puntuaciones para cada categoría
        const scores = {
            temperature: {
                warm: 0,
                cool: 0
            },
            value: {
                light: 0,
                dark: 0
            },
            chroma: {
                bright: 0,
                soft: 0
            }
        };
        
        // Piel (peso 3)
        if (userSelections.skinTemp === 'warm') scores.temperature.warm += 3;
        else if (userSelections.skinTemp === 'cool') scores.temperature.cool += 3;
        else {
            // Neutral - dividir puntos
            scores.temperature.warm += 1.5;
            scores.temperature.cool += 1.5;
        }
        
        if (userSelections.skinValue === 'light') scores.value.light += 3;
        else if (userSelections.skinValue === 'dark') scores.value.dark += 3;
        else {
            // Medio - dividir puntos
            scores.value.light += 1.5;
            scores.value.dark += 1.5;
        }
        
        if (userSelections.skinChroma === 'bright') scores.chroma.bright += 3;
        else if (userSelections.skinChroma === 'soft') scores.chroma.soft += 3;
        else {
            // Medio - dividir puntos
            scores.chroma.bright += 1.5;
            scores.chroma.soft += 1.5;
        }
        
        // Cabello (peso 2)
        if (userSelections.hairTemp === 'warm') scores.temperature.warm += 2;
        else if (userSelections.hairTemp === 'cool') scores.temperature.cool += 2;
        else {
            // Neutral - dividir puntos
            scores.temperature.warm += 1;
            scores.temperature.cool += 1;
        }
        
        if (userSelections.hairValue === 'light') scores.value.light += 2;
        else if (userSelections.hairValue === 'dark') scores.value.dark += 2;
        else {
            // Medio - dividir puntos
            scores.value.light += 1;
            scores.value.dark += 1;
        }
        
        if (userSelections.hairChroma === 'bright') scores.chroma.bright += 2;
        else if (userSelections.hairChroma === 'soft') scores.chroma.soft += 2;
        else {
            // Medio - dividir puntos
            scores.chroma.bright += 1;
            scores.chroma.soft += 1;
        }
        
        // Ojos (peso 1)
        if (userSelections.eyesTemp === 'warm') scores.temperature.warm += 1;
        else if (userSelections.eyesTemp === 'cool') scores.temperature.cool += 1;
        else {
            // Neutral - dividir puntos
            scores.temperature.warm += 0.5;
            scores.temperature.cool += 0.5;
        }
        
        if (userSelections.eyesValue === 'light') scores.value.light += 1;
        else if (userSelections.eyesValue === 'dark') scores.value.dark += 1;
        else {
            // Medio - dividir puntos
            scores.value.light += 0.5;
            scores.value.dark += 0.5;
        }
        
        if (userSelections.eyesChroma === 'bright') scores.chroma.bright += 1;
        else if (userSelections.eyesChroma === 'soft') scores.chroma.soft += 1;
        else {
            // Medio - dividir puntos
            scores.chroma.bright += 0.5;
            scores.chroma.soft += 0.5;
        }
        
        // Determinar la temporada basada en las puntuaciones
        const dominantTemperature = scores.temperature.warm > scores.temperature.cool ? 'warm' : 'cool';
        const dominantValue = scores.value.light > scores.value.dark ? 'light' : 'dark';
        const dominantChroma = scores.chroma.bright > scores.chroma.soft ? 'bright' : 'soft';
        
        // Encontrar la temporada que mejor coincide con las características
        let bestMatchSeason = findBestMatchingSeason(dominantTemperature, dominantValue, dominantChroma, scores);
        
        // Mostrar el resultado
        displayResult(bestMatchSeason);
        
        // Ocultar el loader
        document.querySelector('.loader-container').style.display = 'none';
    }, 1500); // 1.5 segundos de tiempo de carga
}

// Encontrar la temporada que mejor coincide con las características
function findBestMatchingSeason(dominantTemp, dominantValue, dominantChroma, scores) {
    let bestMatch = null;
    let bestMatchScore = -1;
    
    for (const season of seasons) {
        let seasonScore = 0;
        
        // Verificar temperatura
        if (dominantTemp === 'warm' && season.temperature.warm.includes(Math.round(scores.temperature.warm))) {
            seasonScore += 3;
        } else if (dominantTemp === 'cool' && season.temperature.cool.includes(Math.round(scores.temperature.cool))) {
            seasonScore += 3;
        }
        
        // Verificar valor
        if (dominantValue === 'light' && season.value.light.includes(Math.round(scores.value.light))) {
            seasonScore += 2;
        } else if (dominantValue === 'dark' && season.value.dark.includes(Math.round(scores.value.dark))) {
            seasonScore += 2;
        }
        
        // Verificar croma
        if (dominantChroma === 'bright' && season.chroma.bright.includes(Math.round(scores.chroma.bright))) {
            seasonScore += 1;
        } else if (dominantChroma === 'soft' && season.chroma.soft.includes(Math.round(scores.chroma.soft))) {
            seasonScore += 1;
        }
        
        // Actualizar mejor coincidencia si corresponde
        if (seasonScore > bestMatchScore) {
            bestMatchScore = seasonScore;
            bestMatch = season;
        }
    }
    
    return bestMatch;
}

// Mostrar el resultado
function displayResult(season) {
    if (!season) {
        // Si no hay una coincidencia clara, mostrar un valor predeterminado
        season = seasons[0]; // Deep Autumn como predeterminado
    }
    
    const seasonName = language === 'es' ? season.nameEs : season.nameEn;
    const seasonId = season.id;
    
    // Actualizar título del resultado
    document.getElementById('result-season-name').textContent = seasonName;
    
    // Actualizar imagen de la paleta
    const paletteImage = document.getElementById('result-palette');
    paletteImage.src = `./images/${seasonId}.jpg`;
    paletteImage.alt = `${seasonName} color palette`;
    
    // Actualizar descripción y consejos
    const descriptionKey = seasonId.replace('-', '') + 'Description';
    document.getElementById('result-description-text').textContent = translations[language].result[seasonId.replace('-', '')].description;
    
    // Limpiar y actualizar lista de consejos
    const tipsList = document.getElementById('result-tips-list');
    tipsList.innerHTML = '';
    
    const tips = translations[language].result[seasonId.replace('-', '')].tips;
    tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
    });
    
    // Mostrar el paso de resultados
    showStep(6);
}

// Función para generar PDF con los resultados
function generatePDF() {
    const seasonNameElement = document.getElementById('result-season-name');
    const seasonName = seasonNameElement.textContent;
    const seasonId = seasons.find(s => (language === 'es' ? s.nameEs : s.nameEn) === seasonName).id;
    
    // Aquí iría el código para generar un PDF con los resultados
    // Para una implementación completa, se requeriría una biblioteca como jsPDF o pdfmake
    // O enviar los datos a un servidor para generar el PDF
    
    alert(translations[language === 'es' ? 'es' : 'en'].download + ': ' + seasonName);
    
    // Para fines de este ejemplo, simplemente descargamos la imagen de la paleta
    const link = document.createElement('a');
    link.href = `./images/${seasonId}.jpg`;
    link.download = `${seasonId}-palette.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Inicializar todos los eventos para opciones seleccionables
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar eventos para opciones de temperatura de piel
    document.querySelectorAll('#skin-temp-options .option').forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            selectOption('skinTemp', value, this);
        });
    });
    
    // Inicializar eventos para opciones de valor de piel
    document.querySelectorAll('#skin-value-options .option').forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            selectOption('skinValue', value, this);
        });
    });
    
    // Inicializar eventos para opciones de croma de piel
    document.querySelectorAll('#skin-chroma-options .option').forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            selectOption('skinChroma', value, this);
        });
    });
    
    // Inicializar eventos para opciones de cabello
    // Temperatura
    document.querySelectorAll('#hair-temp-options .numeric-option').forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            selectNumericOption('hairTemp', value, this);
        });
    });
    
    // Valor
    document.querySelectorAll('#hair-value-options .numeric-option').forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            selectNumericOption('hairValue', value, this);
        });
    });
    
    // Croma
    document.querySelectorAll('#hair-chroma-options .numeric-option').forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            selectNumericOption('hairChroma', value, this);
        });
    });
    
    // Inicializar eventos para opciones de ojos
    // Temperatura
    document.querySelectorAll('#eyes-temp-options .numeric-option').forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            selectNumericOption('eyesTemp', value, this);
        });
    });
    
    // Valor
    document.querySelectorAll('#eyes-value-options .numeric-option').forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            selectNumericOption('eyesValue', value, this);
        });
    });
    
    // Croma
    document.querySelectorAll('#eyes-chroma-options .numeric-option').forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            selectNumericOption('eyesChroma', value, this);
        });
    });
    
    // Inicializar el botón de descarga PDF
    document.getElementById('download-btn').addEventListener('click', generatePDF);
});