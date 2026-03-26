// --- SISTEMA MODO MAESTRO ---
function unlockTeacherMode() {
	const pwd = prompt("Acceso Restringido. Ingrese el código de maestro:");
	const btn = document.getElementById('teacherModeBtn');
	
	if (pwd === "1983") {
					document.querySelectorAll('.teacher-note').forEach(note => {
									note.classList.remove('hidden');
					});
					btn.textContent = "Maestro Activo 🔓";
					btn.style.backgroundColor = "var(--teacher-border)";
					btn.style.color = "white";
					btn.style.borderColor = "var(--teacher-border)";
					alert("Verificación exitosa. Notas pedagógicas desbloqueadas.");
	} else if (pwd !== null) {
					alert("Código incorrecto.");
	}
}

// --- DATOS DEL QUIZ (10 Preguntas de la Sesión 26) ---
const quizData = [
	{
					question: "¿Qué usa la geometría analítica para calcular áreas que la sintética no usa?",
					options: ["Reglas y compás", "Coordenadas (x, y)", "Ángulos exactos", "Fórmulas de volumen"],
					correct: 1
	},
	{
					question: "Al método de determinantes para áreas de Gauss también se le conoce como:",
					options: ["Fórmula de la Agujeta", "Teorema de Pitágoras", "Regla de Cramer", "Ley de Senos"],
					correct: 0
	},
	{
					question: "En la matriz de Gauss, ¿qué debes hacer SIEMPRE al final de la lista de vértices?",
					options: ["Sumar cero", "Dividir entre 4", "Repetir el primer vértice", "Cambiar todos los signos"],
					correct: 2
	},
	{
					question: "¿Qué ventaja principal tiene el método analítico sobre el sintético?",
					options: ["Es más rápido para círculos", "Funciona para cualquier polígono irregular fácilmente", "No usa números", "Solo requiere un punto"],
					correct: 1
	},
	{
					question: "Un triángulo tiene vértices en (0,0), (4,0) y (0,3). Usando geometría sintética, su área es:",
					options: ["12 u²", "7 u²", "6 u²", "10 u²"],
					correct: 2 // Base 4, altura 3 -> 4*3/2 = 6
	},
	{
					question: "Al resolver el determinante, ¿qué operación realizamos con las diagonales que van hacia ABAJO (\\)?",
					options: ["Se restan", "Se ignoran", "Se multiplican y se suman", "Se dividen"],
					correct: 2
	},
	{
					question: "Al resolver el determinante, ¿qué operación realizamos con las diagonales que van hacia ARRIBA (/)?",
					options: ["Se multiplican y se restan", "Se suman al doble", "Se elevan al cuadrado", "No se utilizan"],
					correct: 0
	},
	{
					question: "Si al usar Gauss los vértices se ordenan en sentido HORARIO en lugar de antihorario, el resultado final será:",
					options: ["Cero", "Negativo (si no usas valor absoluto)", "El doble del área", "Infinito"],
					correct: 1
	},
	{
					question: "¿Qué pasaría con el área si los 3 vértices que introducimos en la matriz están en la misma línea recta (colineales)?",
					options: ["El área es 1", "El área es 0", "La matriz da error", "El área es negativa"],
					correct: 1
	},
	{
					question: "En la fórmula general de Gauss, ¿por qué número se multiplica el determinante final?",
					options: ["Por 2", "Por Pi (π)", "Por 1/2", "Por 0.75"],
					correct: 2
	}
];

// --- MOTOR DEL QUIZ ---
let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const optionsGrid = document.getElementById('options-grid');
const questionCounter = document.getElementById('question-counter');
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');

function loadQuestion() {
	const currentQuestion = quizData[currentQuestionIndex];
	questionText.textContent = currentQuestion.question;
	questionCounter.textContent = `Pregunta ${currentQuestionIndex + 1} de 10`;
	
	optionsGrid.innerHTML = '';
	
	currentQuestion.options.forEach((option, index) => {
					const button = document.createElement('button');
					button.textContent = option;
					// Asignar colores estilo Kahoot (0=Rojo, 1=Azul, 2=Amarillo, 3=Verde)
					button.className = `k-btn c-${index}`;
					button.onclick = () => checkAnswer(index);
					optionsGrid.appendChild(button);
	});
}

function checkAnswer(selectedIndex) {
	const correctIndex = quizData[currentQuestionIndex].correct;
	
	// Feedback visual rápido
	const buttons = optionsGrid.children;
	for(let i=0; i<buttons.length; i++) {
					buttons[i].disabled = true; // Prevenir múltiples clicks
					if(i === correctIndex) {
									buttons[i].style.border = "5px solid white"; // Resalta la correcta
					} else if(i === selectedIndex && selectedIndex !== correctIndex) {
									buttons[i].style.filter = "grayscale(80%)"; // Opaca si te equivocaste
					}
	}

	if (selectedIndex === correctIndex) {
					score++;
	}

	setTimeout(() => {
					currentQuestionIndex++;
					if (currentQuestionIndex < quizData.length) {
									loadQuestion();
					} else {
									showResults();
					}
	}, 1200); // 1.2 segundos para ver cuál era correcta antes de avanzar
}

function showResults() {
	quizContainer.classList.add('hidden');
	resultsContainer.classList.remove('hidden');
	
	const percentage = Math.round((score / quizData.length) * 100);
	const scoreCircle = document.getElementById('score-circle');
	const feedback = document.getElementById('feedback-message');
	
	scoreCircle.textContent = `${percentage}%`;
	
	if (percentage >= 80) {
					scoreCircle.style.background = "var(--synthetic)";
					feedback.textContent = "¡Nivel Analítico Desbloqueado! Eres un genio de la geometría cartesiana.";
	} else if (percentage >= 60) {
					scoreCircle.style.background = "var(--k-yellow)";
					feedback.textContent = "Buen trabajo, pero te sugiero revisar cómo armar el determinante.";
	} else {
					scoreCircle.style.background = "var(--k-red)";
					feedback.textContent = "No te rindas. Vuelve a revisar el ejercicio práctico y los signos.";
	}
}

// Iniciar Quiz al cargar
loadQuestion();