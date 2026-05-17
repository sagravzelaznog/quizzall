// === JMGV - PTEL === MOTOR DE EVALUACIÓN S35-S38 ===

// --- AUTENTICACIÓN MAESTRO ---
let isTeacherMode = false;

function unlockTeacherMode() {
    if (isTeacherMode) return; // Ya está desbloqueado

    const pwd = prompt("Consola Docente. Ingrese el PIN de validación:");
    const btn = document.getElementById('lock-btn');
    
    if (pwd === "1983") {
        isTeacherMode = true;
        document.getElementById('teacher-dashboard').classList.remove('hidden');
        document.getElementById('dynamic-teacher-tip').classList.remove('hidden');
        
        btn.textContent = "Maestro Activo 🔓";
        btn.style.backgroundColor = "var(--teacher-border)";
        btn.style.color = "white";
        btn.style.borderColor = "var(--teacher-border)";
        
        generateKeyList();
        alert("Autenticación correcta. Herramientas pedagógicas desbloqueadas.");
    } else if (pwd !== null) {
        alert("Acceso denegado.");
    }
}

// --- BASE DE DATOS DEL RETO INTEGRADOR ---
const quizData = 
   [
    {
        session: "S35: Introducción a PL",
        q: "¿Para qué se utiliza la Programación Lineal?",
        o: ["Círculos", "Encontrar el mejor resultado (optimizar)", "Cuadráticas", "Distancias"],
        c: 1,
        tip: "S35 - Recuerda que optimizar significa buscar el mejor rendimiento posible bajo ciertas condiciones."
    },
    {
        session: "S35: Introducción a PL",
        q: "La ecuación que representa la meta a maximizar o minimizar se llama:",
        o: ["Recta", "Restricción", "Función Objetivo", "Eje"],
        c: 2,
        tip: "S35 - Si es la meta final, representa el 'Objetivo' de todo el problema lineal."
    },
    {
        session: "S35: Introducción a PL",
        q: "Si la meta es ganar dinero, ¿qué querrá hacer con Z?",
        o: ["Minimizarla", "Cero", "Maximizarla", "Dividirla"],
        c: 2,
        tip: "S35 - En finanzas o producción productiva, las ganancias siempre se buscan llevar al máximo."
    },
    {
        session: "S35: Introducción a PL",
        q: "Los límites de dinero, tiempo o materiales se conocen como:",
        o: ["Vértices", "Restricciones", "Ganancias", "Variables"],
        c: 1,
        tip: "S35 - Los límites físicos, de espacio o financieros 'restringen' nuestras opciones reales."
    },
    {
        session: "S35: Introducción a PL",
        q: "Las restricciones se representan utilizando:",
        o: ["Signos = ", "Signos ≤, ≥", "Negativos", "Raíces"],
        c: 1,
        tip: "S35 - Al ser límites de capacidad o presupuesto, usamos desigualdades como menor o igual (≤) o mayor o igual (≥)."
    },
    {
        session: "S35: Introducción a PL",
        q: "Según el Teorema Fundamental, la solución óptima se encuentra en:",
        o: ["El centro", "El origen", "Los vértices de la región factible", "Fuera"],
        c: 2,
        tip: "S35 - Revisa las esquinas de la región pintada (factible); el Teorema Fundamental dicta que ahí están las respuestas clave."
    },
    {
        session: "S35: Introducción a PL",
        q: "Si Z = 10x + 5y, ¿ganancia en (3, 4)?",
        o: ["50", "30", "15", "45"],
        c: 0,
        tip: "S35 - Sustituye x=3 e y=4 en la ecuación: 10(3) + 5(4) para encontrar el valor de Z."
    },
    {
        session: "S35: Introducción a PL",
        q: "Vértices: A(0,0)->Z=0, B(0,5)->Z=25, C(4,2)->Z=30. Para MAXIMIZAR eliges:",
        o: ["A", "B", "C", "Ninguno"],
        c: 2,
        tip: "S35 - Compara los tres valores calculados de Z y elige la cantidad numéricamente más grande."
    },
    {
        session: "S35: Introducción a PL",
        q: "Si busca 'menor costo de producción', estamos intentando:",
        o: ["Maximizar", "Eliminar", "Minimizar", "Cambiar negocio"],
        c: 2,
        tip: "S35 - Menor costo implica achicar o reducir los gastos al mínimo, es decir, minimizar."
    },
    {
        session: "S35: Introducción a PL",
        q: "La letra 'Z' en Programación Lineal representa:",
        o: ["Eje horizontal", "Ganancia/costo total de Función Objetivo", "Variables", "Restricción"],
        c: 1,
        tip: "S35 - Z representa el valor monetario o métrica total que queremos optimizar (ganancia o costo total)."
    },
    {
        session: "S36: Método Gráfico y Evaluación de Vértices",
        q: "Para el método gráfico se recomienda el uso de:",
        o: ["Calculadora", "Hojas milimétricas", "Compás", "Transportador"],
        c: 1,
        tip: "S36 - Las cuadrículas o papel milimétrico ayudan a ubicar visualmente con precisión las coordenadas de los vértices."
    },
    {
        session: "S36: Método Gráfico y Evaluación de Vértices",
        q: "Una vez dibujada la región factible, el siguiente paso es la...",
        o: ["Evaluación de vértices", "Creación de variables", "Eliminar Z", "Decisiones"],
        c: 0,
        tip: "S36 - Una vez delimitada el área de soluciones, se debe probar el valor de Z en cada una de las esquinas encontradas."
    },
    {
        session: "S36: Método Gráfico y Evaluación de Vértices",
        q: "¿Por qué el óptimo está en una esquina?",
        o: ["Fácil cálculo", "La función Z alcanza su límite en los extremos", "Regla", "No siempre"],
        c: 1,
        tip: "S36 - Las fronteras de las restricciones se intersectan en los extremos, alcanzando allí los límites máximos o mínimos de Z."
    },
    {
        session: "S36: Método Gráfico y Evaluación de Vértices",
        q: "Al evaluar Z = 10x+20y, para MAXIMIZAR elegiremos el punto que...",
        o: ["Valor más bajo", "x=0", "Dé el valor numérico más alto", "Origen"],
        c: 2,
        tip: "S36 - Maximizar siempre requiere buscar el resultado numérico final más alto obtenido de la evaluación."
    },
    {
        session: "S36: Método Gráfico y Evaluación de Vértices",
        q: "Si Z representa COSTOS, ¿cuál será el óptimo?",
        o: ["Valor más alto", "Valor más bajo", "Punto medio", "Suma de vértices"],
        c: 1,
        tip: "S36 - En la gestión empresarial, siempre queremos que los costos de operación sean lo más bajos posible."
    },
    {
        session: "S36: Método Gráfico y Evaluación de Vértices",
        q: "Evalúa (5, 5) en Z = 100x + 100y:",
        o: ["1000", "500", "200", "2500"],
        c: 0,
        tip: "S36 - Multiplica 100 por 5, luego súmale 100 por 5 para obtener la respuesta correcta."
    },
    {
        session: "S36: Método Gráfico y Evaluación de Vértices",
        q: "(0,10)->Z=100 y (10,0)->Z=150. Para maximizar, la DECISIÓN es:",
        o: ["0 de x, 10 de y", "10 de x, 0 de y", "Nada", "5 y 5"],
        c: 1,
        tip: "S36 - El punto (10,0) proporciona el valor más alto, lo que significa estratégicamente asignar 10 a 'x' y 0 a 'y'."
    },
    {
        session: "S36: Método Gráfico y Evaluación de Vértices",
        q: "Si dos vértices adyacentes dan la misma ganancia máxima:",
        o: ["Sin solución", "Mal cálculo", "Cualquier punto en el segmento que los une es óptimo", "El de x mayor"],
        c: 2,
        tip: "S36 - Cuando hay un empate en los extremos óptimos, cualquier punto en el segmento que une ambos vértices también es una solución óptima."
    },
    {
        session: "S36: Método Gráfico y Evaluación de Vértices",
        q: "El paso final de traducir los números a una acción real se llama:",
        o: ["Factorización", "Toma de decisiones", "Restricción", "Interpolación"],
        c: 1,
        tip: "S36 - Las matemáticas proveen los datos exactos, pero la interpretación humana es la que guía la toma de decisiones finales."
    },
    {
        session: "S36: Método Gráfico y Evaluación de Vértices",
        q: "Si el óptimo es (0, 20) (x=mesas, y=sillas), estratégicamente significa:",
        o: ["Hacer ambas", "Fabricar solo 20 sillas", "Perder dinero", "20 mesas, 0 sillas"],
        c: 1,
        tip: "S36 - Si x=0, el modelo matemático te está indicando que bajo estas restricciones no es eficiente fabricar mesas."
    }
,
    {
        session: "S37: Modelación y Proyectos de Optimización",
        q: "En un proyecto de optimización, el objetivo es minimizar costos o...",
        o: ["Graficar", "Maximizar utilidad", "Gastar recursos", "Eliminar variables"],
        c: 1,
        tip: "S37 - Es el balance fundamental de cualquier negocio: reducir costos operativos o maximizar la utilidad neta."
    },
    {
        session: "S37: Modelación y Proyectos de Optimización",
        q: "Las limitantes de un negocio (dinero, tiempo) se representan como:",
        o: ["Z", "Vértices", "Restricciones (Desigualdades)", "Coordenadas"],
        c: 2,
        tip: "S37 - Recuerda que los límites reales de insumos, capital o tiempo se modelan formalmente como desigualdades matemáticas."
    },
    {
        session: "S37: Modelación y Proyectos de Optimización",
        q: "La ecuación del dinero total a ganar se llama:",
        o: ["Ecuación lineal", "Restricción", "Función Objetivo (Z)", "Teorema"],
        c: 2,
        tip: "S37 - Es la fórmula matemática principal hacia donde apuntamos todos los esfuerzos de optimización."
    },
    {
        session: "S37: Modelación y Proyectos de Optimización",
        q: "En el Informe de Estrategia final, lo más importante es:",
        o: ["Color", "La interpretación real y toma de decisiones", "Fracciones", "Dibujar"],
        c: 1,
        tip: "S37 - Los números aislados no aportan valor si no se traducen a una interpretación real para la toma de decisiones estratégicas."
    },
    {
        session: "S37: Modelación y Proyectos de Optimización",
        q: "Si vendes camisetas (x) y sudaderas (y), ¿qué son x e y?",
        o: ["Renta", "Variables de decisión", "Tiempo", "Ganancias"],
        c: 1,
        tip: "S37 - Representan las incógnitas operativas básicas, aquellas variables sobre las cuales tenemos control de decisión."
    },
    {
        session: "S37: Modelación y Proyectos de Optimización",
        q: "La ganancia máxima en la gráfica está en:",
        o: ["Origen", "Centro", "Vértices de región factible", "Fuera"],
        c: 2,
        tip: "S37 - Revisa siempre los puntos de cruce de las rectas en la frontera de la región factible (los vértices)."
    },
    {
        session: "S37: Modelación y Proyectos de Optimización",
        q: "Presupuesto $500. Brownie $10, galleta $5. Restricción:",
        o: ["10x+5y=500", "10x+5y≤500", "10x+5y≥500", "x+y≤500"],
        c: 1,
        tip: "S37 - El dinero gastado no puede exceder el presupuesto disponible, por lo tanto el gasto total debe ser menor o igual (≤) a 500."
    },
    {
        session: "S37: Modelación y Proyectos de Optimización",
        q: "¿Por qué un negocio se modela con x≥0 e y≥0?",
        o: ["No hay cantidades negativas de productos", "Bonito", "Regla", "Difícil"],
        c: 0,
        tip: "S37 - En el entorno real, es físicamente imposible fabricar o vender una cantidad negativa de productos."
    },
    {
        session: "S37: Modelación y Proyectos de Optimización",
        q: "Z = 20x + 30y, vértice óptimo (10, 5), ganancia máxima:",
        o: ["200", "150", "350", "500"],
        c: 2,
        tip: "S37 - Calcula la sustitución lineal directa: 20*(10) + 30*(5) para hallar la ganancia óptima."
    },
    {
        session: "S37: Modelación y Proyectos de Optimización",
        q: "El éxito de un proyecto PL radica en:",
        o: ["Fórmulas", "Cálculo mental", "Plantear el modelo desde lenguaje natural", "Calculadora"],
        c: 2,
        tip: "S37 - Si el planteamiento inicial está mal estructurado desde el lenguaje natural, todo el cálculo matemático posterior será incorrecto."
    }
,
    {
        session: "S38: Feria de Matemáticas e Integración de Aprendizajes",
        q: "Objetivo principal de la Feria de Matemáticas:",
        o: ["Examen", "Integrar y exponer aprendizajes a través de proyectos", "Tema nuevo", "Fórmulas"],
        c: 1,
        tip: "S38 - La feria tiene como propósito central que demuestres de manera práctica la aplicación real de tus competencias matemáticas."
    },
    {
        session: "S38: Feria de Matemáticas e Integración de Aprendizajes",
        q: "En la exposición, ¿qué es la función objetivo?",
        o: ["La meta a maximizar o minimizar", "Límite", "Origen", "Tiempo"],
        c: 0,
        tip: "S38 - Sigue siendo la meta central del proyecto, la fórmula matemática que mide el éxito de la optimización propuesta."
    },
    {
        session: "S38: Feria de Matemáticas e Integración de Aprendizajes",
        q: "La 'Retroalimentación entre pares' debe ser:",
        o: ["Destructiva", "Desleal", "Constructiva y respetuosa", "Silencio"],
        c: 2,
        tip: "S38 - El objetivo de evaluar a tus compañeros es aportar observaciones constructivas que impulsen el crecimiento académico mutuo."
    },
    {
        session: "S38: Feria de Matemáticas e Integración de Aprendizajes",
        q: "Proyecto de ahorro a largo plazo usa:",
        o: ["Distancia", "Interés Compuesto", "Pitágoras", "Gauss"],
        c: 1,
        tip: "S38 - Cuando los intereses generados se suman al capital para producir nuevos intereses en cada periodo, usamos interés compuesto."
    },
    {
        session: "S38: Feria de Matemáticas e Integración de Aprendizajes",
        q: "En la exposición PL, las restricciones representan:",
        o: ["Los límites de recursos", "Ganancias", "Clientes", "Logo"],
        c: 0,
        tip: "S38 - Muestran con total claridad los techos y límites reales con los que cuenta el proyecto (tiempo, insumos, presupuesto)."
    },
    {
        session: "S38: Feria de Matemáticas e Integración de Aprendizajes",
        q: "Herramienta gráfica para comprobar 'región factible':",
        o: ["Word", "Desmos / GeoGebra", "PowerPoint", "Calculadora"],
        c: 1,
        tip: "S38 - Software geométrico dinámico excelente para graficar y comprobar visualmente desigualdades simultáneas."
    },
    {
        session: "S38: Feria de Matemáticas e Integración de Aprendizajes",
        q: "En Z = 50x + 30y, Z es:",
        o: ["Productos", "Eje vertical", "La ganancia a optimizar", "Horas"],
        c: 2,
        tip: "S38 - Representa la función objetivo completa, es decir, el beneficio total ponderado por cada variable de decisión."
    },
    {
        session: "S38: Feria de Matemáticas e Integración de Aprendizajes",
        q: "Mayor beneficio de la Integración de Aprendizajes:",
        o: ["Ver utilidad real y práctica de las matemáticas", "Rápido", "Dibujar", "Evitar tareas"],
        c: 0,
        tip: "S38 - Permite romper la percepción abstracta de la materia y observar la utilidad práctica e integral de las matemáticas."
    },
    {
        session: "S38: Feria de Matemáticas e Integración de Aprendizajes",
        q: "El Teorema Fundamental dicta que la ganancia máxima está en:",
        o: ["Centro", "Vértice de región factible", "Origen", "Cualquier lado"],
        c: 1,
        tip: "S38 - Las soluciones ideales óptimas se concentran geométricamente en las esquinas extremas de la zona factible."
    },
    {
        session: "S38: Feria de Matemáticas e Integración de Aprendizajes",
        q: "Además de matemáticas, en un pitch es fundamental:",
        o: ["Hablar rápido", "Argumentación lógica y claridad", "Leer texto", "Ocultar errores"],
        c: 1,
        tip: "S38 - Para convencer de manera efectiva a una audiencia o jurado, necesitas articular tus argumentos con lógica y total claridad."
    }

];

// --- MOTOR DEL QUIZ ---
let currentQIndex = 0;
let score = 0;

const qTracker = document.getElementById('question-tracker');
const sessionTag = document.getElementById('session-tag');
const qText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const dynamicTip = document.getElementById('dynamic-teacher-tip');

function loadQuestion() {
    const q = quizData[currentQIndex];
    
    qTracker.textContent = `Pregunta ${currentQIndex + 1} de ${quizData.length}`;
    sessionTag.textContent = q.session;
    qText.textContent = q.q;
    dynamicTip.innerHTML = `<strong>💡 Tip Docente actual:</strong> ${q.tip}`;
    
    optionsContainer.innerHTML = '';
    
    const colors = ['k-red', 'k-blue', 'k-yellow', 'k-green'];
    
    q.o.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.className = `answer-btn ${colors[index]}`;
        btn.onclick = () => processAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });

    // Re-render math formulas if needed
    if(window.MathJax) {
        MathJax.typesetPromise([qText, optionsContainer]);
    }
}

function processAnswer(selectedIndex, btnElement) {
    const correctIndex = quizData[currentQIndex].c;
    const buttons = optionsContainer.children;
    
    // Bloquear botones
    for(let i=0; i<buttons.length; i++) {
        buttons[i].disabled = true;
        if(i === correctIndex) {
            buttons[i].style.border = "5px solid white";
            buttons[i].style.transform = "scale(1.02)";
        } else if (i === selectedIndex && selectedIndex !== correctIndex) {
            buttons[i].style.filter = "grayscale(100%) opacity(0.5)";
        }
    }

    if (selectedIndex === correctIndex) score++;

    // Retraso para avanzar a la siguiente (1.5 segundos)
    setTimeout(() => {
        currentQIndex++;
        if (currentQIndex < quizData.length) {
            loadQuestion();
        } else {
            showFinalResults();
        }
    }, 1500);
}

function showFinalResults() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    
    const percentage = Math.round((score / quizData.length) * 100);
    const scoreCircle = document.getElementById('score-circle');
    const feedback = document.getElementById('feedback-message');
    
    scoreCircle.textContent = `${percentage}%`;
    
    if (percentage >= 80) {
        scoreCircle.style.background = "var(--accent)";
        feedback.textContent = "¡Sobresaliente! Tienes una mente maestra para la Optimización de Operaciones.";
    } else if (percentage >= 60) {
        scoreCircle.style.background = "var(--k-yellow)";
        feedback.textContent = "Buen desempeño. Lograste entender las bases de la Programación Lineal.";
    } else {
        scoreCircle.style.background = "var(--k-red)";
        feedback.textContent = "Área de oportunidad detectada. Necesitamos repasar cómo plantear las restricciones.";
    }
}

// Llena la lista del panel maestro
function generateKeyList() {
    const list = document.getElementById('key-list');
    list.innerHTML = '';
    quizData.forEach((q, i) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>P${i+1} (${q.session}):</strong> ${q.o[q.c]}`;
        list.appendChild(li);
    });
}

// Boot inicial
loadQuestion();