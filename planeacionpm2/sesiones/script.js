/* =========================================
   SISTEMA DEL DOCENTE (CONTRASEÑA)
   ========================================= */
			function unlockTeacherNotes() {
    const passInput = document.getElementById('teacher-pass').value;
    const notesDiv = document.getElementById('teacher-notes');
    
    // Clave maestra definida
    if (passInput === '1983') {
        notesDiv.classList.remove('hidden');
        document.getElementById('teacher-pass').value = '';
    } else {
        alert('Código incorrecto. Acceso denegado.');
    }
}

function lockTeacherNotes() {
    document.getElementById('teacher-notes').classList.add('hidden');
}

/* =========================================
   LÓGICA DEL QUIZ ESTILO KAHOOT
   ========================================= */
const quizData = [
    {
        question: "¿Cuál es la principal diferencia entre lenguaje natural y matemático?",
        options: [
            { text: "El matemático usa colores", correct: false, color: "k-red" },
            { text: "El natural es universal", correct: false, color: "k-blue" },
            { text: "El matemático busca ser exacto y sin ambigüedades", correct: true, color: "k-yellow" },
            { text: "No hay diferencia", correct: false, color: "k-green" }
        ]
    },
    {
        question: "¿Cómo se escribe 'el doble de un número'?",
        options: [
            { text: "$x + 2$", correct: false, color: "k-red" },
            { text: "$x^2$", correct: false, color: "k-blue" },
            { text: "$2x$", correct: true, color: "k-yellow" },
            { text: "$x / 2$", correct: false, color: "k-green" }
        ]
    },
    {
        question: "En álgebra, ¿qué representa generalmente la letra 'x'?",
        options: [
            { text: "Un error de ortografía", correct: false, color: "k-red" },
            { text: "El signo de multiplicación", correct: false, color: "k-blue" },
            { text: "Una variable o valor desconocido", correct: true, color: "k-yellow" },
            { text: "El número 10 en romano siempre", correct: false, color: "k-green" }
        ]
    },
    {
        question: "¿Qué significa matemáticamente la palabra 'diferencia'?",
        options: [
            { text: "Suma (+)", correct: false, color: "k-red" },
            { text: "Resta (-)", correct: true, color: "k-blue" },
            { text: "División (/)", correct: false, color: "k-yellow" },
            { text: "Igualdad (=)", correct: false, color: "k-green" }
        ]
    },
    {
        question: "Traduce: 'Un número más su mitad'",
        options: [
            { text: "$x + \\frac{x}{2}$", correct: true, color: "k-red" },
            { text: "$x + 0.5$", correct: false, color: "k-blue" },
            { text: "$2x + x$", correct: false, color: "k-yellow" },
            { text: "$\\frac{x+1}{2}$", correct: false, color: "k-green" }
        ]
    }
];

let currentQuestion = 0;


function loadQuestion() {
    const q = quizData[currentQuestion];
    questionText.innerHTML = q.question;
    optionsContainer.innerHTML = '';

    q.options.forEach((opt) => {
        const button = document.createElement('button');
        button.className = `k-btn ${opt.color}`;
        button.innerHTML = opt.text;
        button.onclick = () => checkAnswer(opt.correct);
        optionsContainer.appendChild(button);
    });

    // Renderizar ecuaciones matemáticas inyectadas dinámicamente
    if (window.MathJax) {
        MathJax.typesetPromise([questionScreen]).catch((err) => console.log(err.message));
    }
}

function checkAnswer(isCorrect) {
    if (isCorrect) {
        score++;
    }
    
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalScoreText.innerText = `¡Lograste ${score} de ${quizData.length} aciertos! 🎯`;
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    resultScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    loadQuestion();
}

// Inicializar el quiz al cargar la página
window.onload = loadQuestion;
/* =========================================
   1. MÓDULO DEL DOCENTE (SEGURIDAD BÁSICA)
   ========================================= */
			function unlockTeacherNotes() {
    const passInput = document.getElementById('teacher-pass').value;
    const notesDiv = document.getElementById('teacher-notes');
    
    // Clave configurada según requerimiento
    if (passInput === '1983') {
        notesDiv.classList.remove('hidden');
        document.getElementById('teacher-pass').value = '';
    } else {
        alert('Acceso Denegado. La contraseña es incorrecta.');
    }
}

function lockTeacherNotes() {
    document.getElementById('teacher-notes').classList.add('hidden');
}

/* =========================================
   2. MÓDULO DEL QUIZ (ESTILO KAHOOT)
   ========================================= */
const quizData = [
    {
        question: "Traduce: 'La mitad de la suma de dos números'",
        options: [
            { text: "$\\frac{x}{2} + y$", correct: false, color: "k-red" },
            { text: "$\\frac{x+y}{2}$", correct: true, color: "k-blue" },
            { text: "$x + \\frac{y}{2}$", correct: false, color: "k-yellow" },
            { text: "$2(x+y)$", correct: false, color: "k-green" }
        ]
    },
    {
        question: "En la Rigurosidad Matemática, ¿qué signo de puntuación cambia el orden de las operaciones usando paréntesis?",
        options: [
            { text: "El punto final", correct: false, color: "k-red" },
            { text: "Los signos de exclamación", correct: false, color: "k-blue" },
            { text: "La coma (,)", correct: true, color: "k-yellow" },
            { text: "Las comillas", correct: false, color: "k-green" }
        ]
    },
    {
        question: "¿Qué expresión representa 'El cuadrado de un número, menos diez'?",
        options: [
            { text: "$(x-10)^2$", correct: false, color: "k-red" },
            { text: "$2x - 10$", correct: false, color: "k-blue" },
            { text: "$x^2 - 10$", correct: true, color: "k-yellow" },
            { text: "$x^{-10}$", correct: false, color: "k-green" }
        ]
    },
    {
        question: "¿Por qué es importante la Rigurosidad en las Matemáticas?",
        options: [
            { text: "Para evitar ambigüedades y múltiples interpretaciones.", correct: true, color: "k-red" },
            { text: "Para que los problemas sean más largos.", correct: false, color: "k-blue" },
            { text: "Para usar letras en lugar de números.", correct: false, color: "k-yellow" },
            { text: "No es importante, el lenguaje natural es mejor.", correct: false, color: "k-green" }
        ]
    },
    {
        question: "Traduce al lenguaje natural: $x^2 + y^2$",
        options: [
            { text: "El cuadrado de la suma de dos números", correct: false, color: "k-red" },
            { text: "La suma de los cuadrados de dos números", correct: true, color: "k-blue" },
            { text: "El doble de dos números", correct: false, color: "k-yellow" },
            { text: "La suma doble", correct: false, color: "k-green" }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Referencias al DOM
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const progressFill = document.getElementById('progress-fill');
const finalScore = document.getElementById('final-score');
const finalMessage = document.getElementById('final-message');

function renderQuestion() {
    const q = quizData[currentQuestionIndex];
    questionText.innerHTML = q.question;
    optionsContainer.innerHTML = '';
    
    // Barra de progreso
    const progressPercent = ((currentQuestionIndex) / quizData.length) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Generar botones
    q.options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = `k-btn ${opt.color}`;
        btn.innerHTML = opt.text;
        btn.onclick = () => handleAnswer(opt.correct);
        optionsContainer.appendChild(btn);
    });

    // ¡Importante! Forzar a MathJax a re-renderizar las ecuaciones recién inyectadas
    if (window.MathJax) {
        MathJax.typesetPromise([questionScreen]).catch((err) => console.error(err.message));
    }
}

function handleAnswer(isCorrect) {
    if (isCorrect) score++;
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        renderQuestion();
    } else {
        showFinalResults();
    }
}

function showFinalResults() {
    questionScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    finalScore.innerText = `${score} / ${quizData.length}`;
    
    if (score === quizData.length) {
        finalMessage.innerText = "¡Nivel Leyenda! Eres tan preciso como una calculadora. 🏆";
    } else if (score >= 3) {
        finalMessage.innerText = "¡Buen trabajo! Estás dominando el lenguaje algebraico. 👍";
    } else {
        finalMessage.innerText = "Sigue practicando. Las matemáticas requieren paciencia. 💪";
    }
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    renderQuestion();
}

// Inicializar la primera pregunta al cargar
window.onload = renderQuestion;