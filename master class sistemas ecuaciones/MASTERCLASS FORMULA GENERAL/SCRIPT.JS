// --- LÓGICA DE ACTIVIDADES (REVELAR SOLUCIONES) ---
function toggleStep(elementId) {
	const element = document.getElementById(elementId);
	if (element.classList.contains('hidden')) {
					element.classList.remove('hidden');
					if (window.MathJax) {
									MathJax.typesetPromise([element]);
					}
	} else {
					element.classList.add('hidden');
	}
}

// --- LÓGICA DEL QUIZ ESTILO KAHOOT (GENIO PSICÓLOGO) ---
const quizData = [
	{
					question: "¿Qué representa la letra 'a' en la ecuación ax² + bx + c = 0?",
					options: ["El término independiente", "El coeficiente cuadrático", "El coeficiente lineal", "La raíz de la ecuación"],
					correct: 1
	},
	{
					question: "¿Cómo se le llama a la parte de la fórmula: b² - 4ac?",
					options: ["Determinante", "Discriminante", "Diferencial", "Derivada"],
					correct: 1
	},
	{
					question: "Si el discriminante (b² - 4ac) es negativo, ¿cuántas soluciones reales hay?",
					options: ["Dos soluciones", "Una solución", "Cero soluciones (Ninguna)", "Infinitas soluciones"],
					correct: 2
	},
	{
					question: "En la ecuación x² - 5x + 6 = 0, ¿cuál es el valor de 'b'?",
					options: ["1", "5", "-5", "6"],
					correct: 2
	},
	{
					question: "Si el discriminante es exactamente CERO, significa que...",
					options: ["La ecuación tiene una única solución (raíz doble).", "La ecuación está mal planteada.", "Existen dos soluciones diferentes.", "La fórmula no sirve."],
					correct: 0
	}
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question-text');
const optionsEl = document.getElementById('options-container');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score-display');

function loadQuiz() {
	feedbackEl.innerText = "";
	const currentQuizData = quizData[currentQuestion];
	questionEl.innerText = `${currentQuestion + 1}. ${currentQuizData.question}`;
	optionsEl.innerHTML = "";

	currentQuizData.options.forEach((option, index) => {
					const button = document.createElement('button');
					button.innerText = option;
					button.classList.add('option-btn');
					button.addEventListener('click', () => checkAnswer(index, button));
					optionsEl.appendChild(button);
	});
}

function checkAnswer(selectedIndex, buttonElement) {
	const allButtons = document.querySelectorAll('.option-btn');
	allButtons.forEach(btn => btn.disabled = true); // Bloquear clics múltiples

	const correctIndex = quizData[currentQuestion].correct;

	if (selectedIndex === correctIndex) {
					buttonElement.classList.add('correct');
					feedbackEl.innerText = "¡Brillante! Respuesta Correcta ⭐";
					score += 100; // Puntuación estilo juego
	} else {
					buttonElement.classList.add('incorrect');
					allButtons[correctIndex].classList.add('correct'); // Mostrar la correcta
					feedbackEl.innerText = "¡Ups! Esa no era. Observa la respuesta correcta. 🧠";
	}
	
	scoreEl.innerText = `Puntuación: ${score}`;

	setTimeout(() => {
					currentQuestion++;
					if (currentQuestion < quizData.length) {
									loadQuiz();
					} else {
									showFinalResults();
					}
	}, 2500); // 2.5 segundos para leer el feedback
}

function showFinalResults() {
	questionEl.innerText = `¡Reto Completado!`;
	optionsEl.innerHTML = "";
	
	let message = "";
	if (score === 500) message = "¡Eres un GENIO de las matemáticas! Puntuación Perfecta. 🏆";
	else if (score >= 300) message = "¡Gran trabajo! Dominas bien el tema. 👍";
	else message = "La práctica hace al maestro. ¡Vuelve a repasar la teoría! 📚";

	feedbackEl.innerText = message;
	
	const restartBtn = document.createElement('button');
	restartBtn.innerText = "Jugar de Nuevo";
	restartBtn.classList.add('option-btn');
	restartBtn.style.gridColumn = "span 2";
	restartBtn.addEventListener('click', () => {
					currentQuestion = 0;
					score = 0;
					scoreEl.innerText = `Puntuación: ${score}`;
					loadQuiz();
	});
	optionsEl.appendChild(restartBtn);
}

// Iniciar el quiz al cargar la página
document.addEventListener('DOMContentLoaded', loadQuiz);