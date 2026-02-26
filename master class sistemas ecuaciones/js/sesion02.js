// Función para mostrar/ocultar los pasos de los ejemplos iniciales
function toggleStep(elementId) {
	const element = document.getElementById(elementId);
	if (element.classList.contains('hidden')) {
					element.classList.remove('hidden');
					// Obliga a MathJax a re-renderizar si es necesario al hacer visible el div
					if (window.MathJax) {
									MathJax.typesetPromise([element]);
					}
	} else {
					element.classList.add('hidden');
	}
}

// Lógica del Quiz Estilo Kahoot (Genio Psicólogo: Retroalimentación inmediata)
const quizData = [
	{
					question: "En el método de igualación, ¿cuál es el paso 1?",
					options: [
									"Sumar las dos ecuaciones",
									"Despejar la misma incógnita en ambas ecuaciones",
									"Sustituir una ecuación en otra",
									"Graficar el sistema"
					],
					correct: 1
	},
	{
					question: "Si despejamos 'x' y obtenemos: x = 5 - y y x = 1 + y, ¿qué expresión resolvemos?",
					options: [
									"5 - y = 1 + y",
									"5 + y = 1 - y",
									"x = 6",
									"y = 5 - 1"
					],
					correct: 0
	},
	{
					question: "Del Ejemplo 10: Si x = 4 y x + y = 8. ¿Cuál es el valor de 'y'?",
					options: [
									"y = 2",
									"y = 8",
									"y = 4",
									"y = -4"
					],
					correct: 2
	}
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById('question-text');
const optionsEl = document.getElementById('options-container');
const feedbackEl = document.getElementById('feedback');

function loadQuestion() {
	feedbackEl.innerHTML = "";
	feedbackEl.className = "feedback";
	
	const currentQuizData = quizData[currentQuestionIndex];
	questionEl.innerText = currentQuizData.question;
	optionsEl.innerHTML = "";

	currentQuizData.options.forEach((option, index) => {
					const button = document.createElement('button');
					button.innerText = option;
					button.classList.add('option-btn');
					button.addEventListener('click', () => selectAnswer(index, button));
					optionsEl.appendChild(button);
	});
}

function selectAnswer(selectedIndex, buttonElement) {
	// Deshabilitar todos los botones para evitar múltiples clics
	const allButtons = document.querySelectorAll('.option-btn');
	allButtons.forEach(btn => btn.disabled = true);

	const correctIndex = quizData[currentQuestionIndex].correct;

	if (selectedIndex === correctIndex) {
					buttonElement.classList.add('correct');
					feedbackEl.innerText = "¡Correcto! Genio en acción. 🚀";
					feedbackEl.style.color = "#06D6A0";
					score++;
	} else {
					buttonElement.classList.add('incorrect');
					allButtons[correctIndex].classList.add('correct'); // Mostrar la correcta
					feedbackEl.innerText = "Incorrecto. ¡Revisa el proceso y vuelve a intentarlo! 💡";
					feedbackEl.style.color = "#EF476F";
	}

	// Esperar 2 segundos antes de pasar a la siguiente pregunta
	setTimeout(() => {
					currentQuestionIndex++;
					if (currentQuestionIndex < quizData.length) {
									loadQuestion();
					} else {
									showResults();
					}
	}, 2500);
}

function showResults() {
	questionEl.innerText = `¡Sesión Completada! Puntuación: ${score} de ${quizData.length}`;
	optionsEl.innerHTML = "";
	feedbackEl.innerText = score === quizData.length 
					? "¡Excelente! Has dominado la igualación." 
					: "Sigue practicando. La repetición es la madre de la retención.";
	feedbackEl.style.color = "white";
	
	// Botón para reiniciar
	const restartBtn = document.createElement('button');
	restartBtn.innerText = "Reintentar Quiz";
	restartBtn.classList.add('option-btn');
	restartBtn.style.marginTop = "1rem";
	restartBtn.addEventListener('click', () => {
					currentQuestionIndex = 0;
					score = 0;
					loadQuestion();
	});
	optionsEl.appendChild(restartBtn);
}

// Iniciar el quiz cuando cargue la página
document.addEventListener('DOMContentLoaded', loadQuestion);