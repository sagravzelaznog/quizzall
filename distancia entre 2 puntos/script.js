// === JMGV - PTEL === DISTANCIA ENTRE 2 PUNTOS === JS ENGINE ===

// --- MODO MAESTRO ---
function unlockTeacherMode() {
	const code = prompt("MODO MAESTRO. Ingrese el código de acceso 'Genio 1983':");
	
	if (code === "1983") {
					alert("Código aceptado. tips y notas para el maestro ahora son visibles.");
					const notes = document.querySelectorAll('.teacher-note');
					notes.forEach(note => {
									note.classList.remove('hidden');
					});
					document.getElementById('teacherModeBtn').textContent = "Modo Maestro 🔓";
					document.getElementById('teacherModeBtn').style.backgroundColor = "#b7950b";
					document.getElementById('teacherModeBtn').style.color = "white";
	} else if (code === null) {
					// Usuario canceló el prompt
	} else {
					alert("Código incorrecto. Acceso denegado.");
	}
}

// --- QUIZ DATA ---
const quizData = [
	{
					q: "Si P1 es (1,1) y P2 es (4,5), ¿cuáles son los 'catetos' del triángulo rectángulo imaginario?",
					a: ["3 y 4", "1 y 5", "5 y 9", "2 y 3"],
					correct: 0, // Índice de la opción correcta
					time: 30
	},
	{
					q: "¿Cuál es la distancia del origen (0,0) al punto (3, -4)?",
					a: ["25", "7", "5", "1"],
					correct: 2,
					time: 30
	},
	{
					q: "Si P1(-1, 2) y P2(-1, 10). ¿Cómo es la recta que los une?",
					a: ["Horizontal", "Oblicua", "Vertical", "Inclinada a 45°"],
					correct: 2,
					time: 20
	},
	{
					q: "Si elevamos (x2 - x1) al cuadrado y el resultado es negativo. ¿Es esto posible en el plano real?",
					a: ["Sí, si x1 > x2", "No, nunca", "A veces", "Solo en física"],
					correct: 1,
					time: 20
	},
	{
					q: "FÍSICA: ¿La distancia entre dos puntos puede ser menor que la magnitud de su desplazamiento?",
					a: ["Sí", "No, son iguales", "Sí, si hay curvas", "Depende del tiempo"],
					correct: 1,
					time: 30
	},
	{
					q: "Si P1 es (2,2) y P2 es (2,2). ¿Cuál es la distancia?",
					a: ["1", "4", "2", "0"],
					correct: 3,
					time: 10
	},
	{
					q: "Trigonometría: El término (y2 - y1) corresponde a...",
					a: ["Coseno", "Cateto Adyacente", "Seno", "Cateto Opuesto"],
					correct: 3, // Asumiendo ángulo θ con respecto a x
					time: 30
	},
	{
					q: "Distancia entre (1, 1) y (4, 1).",
					a: ["3", "4", "5", "sqrt(10)"],
					correct: 0,
					time: 20
	},
	{
					q: "¿Qué teorema es la base de la fórmula de la distancia?",
					a: ["Thales", "Pitágoras", "Euclides", "Newton"],
					correct: 1,
					time: 15
	},
	{
					q: "Distancia entre (-1, -1) y (1, 1).",
					a: ["2", "4", "sqrt(8)", "0"],
					correct: 2,
					time: 30
	}
];

// --- QUIZ ENGINE ---
const quizContainer = document.getElementById('quiz-container');
const submitBtn = document.getElementById('submit-quiz');
const resultsContainer = document.getElementById('quiz-results');

function buildQuiz() {
	quizData.forEach((currentQuestion, questionNumber) => {
					const questionBlock = document.createElement('div');
					questionBlock.className = 'quiz-question-block';

					const questionTitle = document.createElement('div');
					questionTitle.className = 'quiz-question';
					questionTitle.innerHTML = `${questionNumber + 1}. ${currentQuestion.q} <span class="time-tip">⏰ ${currentQuestion.time}s</span>`;
					questionBlock.appendChild(questionTitle);

					const optionsContainer = document.createElement('div');
					optionsContainer.className = 'quiz-options';

					currentQuestion.a.forEach((option, optionNumber) => {
									const label = document.createElement('label');
									label.className = 'quiz-option';
									label.id = `q${questionNumber}o${optionNumber}`;

									const input = document.createElement('input');
									input.type = 'radio';
									input.name = `question${questionNumber}`;
									input.value = optionNumber;
									input.classList.add('hidden'); // Ocultar radio button real

									input.addEventListener('change', function() {
													// Highlighting style style Kahoot
													const siblings = optionsContainer.querySelectorAll('.quiz-option');
													siblings.forEach(sib => sib.classList.remove('selected'));
													label.classList.add('selected');
													
													// Mostrar botón de enviar cuando al menos una esté seleccionada
													checkAllSelected();
									});

									const text = document.createTextNode(` ${option}`);
									
									label.appendChild(input);
									label.appendChild(text);
									optionsContainer.appendChild(label);
					});

					questionBlock.appendChild(optionsContainer);
					quizContainer.appendChild(questionBlock);
	});
}

function checkAllSelected() {
	const answeredCount = quizContainer.querySelectorAll('input[type="radio"]:checked').length;
	if (answeredCount === quizData.length) {
					submitBtn.classList.remove('hidden');
	}
}

function showResults() {
	const answerContainers = quizContainer.querySelectorAll('.quiz-options');
	let numCorrect = 0;

	quizData.forEach((currentQuestion, questionNumber) => {
					const answerContainer = answerContainers[questionNumber];
					const selector = `input[name=question${questionNumber}]:checked`;
					const userAnswer = (answerContainer.querySelector(selector) || {}).value;

					// Feedback style Kahoot
					const optionsInQuestion = answerContainer.querySelectorAll('.quiz-option');
					optionsInQuestion.forEach((opt, idx) => {
									if (idx === currentQuestion.correct) {
													// Resaltar la correcta en verde
													opt.classList.add('correct');
									}
									if (userAnswer == idx && idx !== currentQuestion.correct) {
													// Si el usuario eligió esta y está mal, resaltar en rojo
													opt.classList.add('wrong');
									}
					});

					if (parseInt(userAnswer) === currentQuestion.correct) {
									numCorrect++;
					}
	});

	resultsContainer.classList.remove('hidden');
	resultsContainer.textContent = `Tu puntuación: ${numCorrect} de ${quizData.length}.`;
	
	if (numCorrect >= 8) {
					resultsContainer.style.backgroundColor = "#d4edda";
					resultsContainer.style.color = "#155724";
					resultsContainer.textContent += " ¡Genio de la Distancia! 🏆";
	} else if (numCorrect >= 5) {
					resultsContainer.style.backgroundColor = "#fff3cd";
					resultsContainer.style.color = "#856404";
					resultsContainer.textContent += " Buen trabajo, repasa los ejemplos.";
	} else {
					resultsContainer.style.backgroundColor = "#f8d7da";
					resultsContainer.style.color = "#721c24";
					resultsContainer.textContent += " Necesitas repasar la teoría y los signos.";
	}
	
	submitBtn.classList.add('hidden'); // Ocultar botón después de enviar
	// Deshabilitar todas las opciones para que no cambien
	quizContainer.querySelectorAll('input').forEach(input => input.disabled = true);
	quizContainer.querySelectorAll('.quiz-option').forEach(opt => opt.style.cursor = 'default');
}

// Inicialización
buildQuiz();
submitBtn.addEventListener('click', showResults);