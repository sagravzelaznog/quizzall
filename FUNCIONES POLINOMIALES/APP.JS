// --- SISTEMA MODO MAESTRO ---
function activateTeacherMode() {
	const pwd = prompt("Ingrese la clave de acceso para Maestros:");
	if(pwd === "1983") {
					document.querySelectorAll('.teacher-note').forEach(note => {
									note.classList.remove('hidden');
					});
					alert("¡Bienvenido JMGV! Modo Maestro activado. Notas pedagógicas y claves reveladas.");
	} else {
					alert("Acceso denegado. Clave incorrecta.");
	}
}

// --- LÓGICA DEL QUIZ (Estilo Kahoot) ---
const questions = [
	{
					question: "¿Cuál es el grado del polinomio $$f(x) = 3x^5 - 2x^2 + 7$$?",
					answers: [
									{ text: "3", correct: false, color: "k-red" },
									{ text: "5", correct: true, color: "k-blue" },
									{ text: "2", correct: false, color: "k-yellow" },
									{ text: "7", correct: false, color: "k-green" }
					],
					teacherNote: "👨‍🏫 El distractor '3' es el coeficiente principal, '7' es el término independiente. Evalúa si el alumno confunde grado con coeficiente."
	},
	{
					question: "¿Cuál de las siguientes NO es una función polinomial?",
					answers: [
									{ text: "$$x^2+1$$", correct: false, color: "k-red" },
									{ text: "$$3x-4$$", correct: false, color: "k-blue" },
									{ text: "$$x^{-2}+x$$", correct: true, color: "k-yellow" },
									{ text: "5", correct: false, color: "k-green" }
					],
					teacherNote: "👨‍🏫 Recuerda a los estudiantes que los exponentes negativos (como -2) representan divisiones entre la variable, rompiendo la estructura polinomial."
	},
	{
					question: "¿Cuál es el término independiente (intersección en y) de $$f(x) = 4x^3 - 2x + 9$$?",
					answers: [
									{ text: "4", correct: false, color: "k-red" },
									{ text: "-2", correct: false, color: "k-blue" },
									{ text: "9", correct: true, color: "k-yellow" },
									{ text: "0", correct: false, color: "k-green" }
					],
					teacherNote: "👨‍🏫 El término independiente siempre es la constante que no está multiplicada por 'x'."
	},
	{
					question: "Evalúa $$P(x) = x^2 - 1$$ cuando $$x = 3$$",
					answers: [
									{ text: "8", correct: true, color: "k-red" },
									{ text: "9", correct: false, color: "k-blue" },
									{ text: "2", correct: false, color: "k-yellow" },
									{ text: "10", correct: false, color: "k-green" }
					],
					teacherNote: "👨‍🏫 Un error común aquí es sumar en lugar de restar (distractor 10), o no elevar al cuadrado correctamente."
	},
	{
					question: "¿Cuál es el coeficiente principal de $$g(x) = -7x^4 + 2x^6 - 3$$?",
					answers: [
									{ text: "-7", correct: false, color: "k-red" },
									{ text: "2", correct: true, color: "k-blue" },
									{ text: "-3", correct: false, color: "k-yellow" },
									{ text: "6", correct: false, color: "k-green" }
					],
					teacherNote: "👨‍🏫 ¡Pregunta trampa! El polinomio está desordenado. El coeficiente principal acompaña al exponente mayor (6), no al primer término."
	}
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const quizRationale = document.getElementById('quiz-rationale');

function startQuiz() {
	currentQuestionIndex = 0;
	score = 0;
	showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
	resetState();
	questionElement.innerHTML = question.question;
	quizRationale.innerHTML = question.teacherNote;
	
	// Necesitamos re-renderizar las matemáticas inyectadas dinámicamente
	if (window.MathJax) {
					MathJax.typesetPromise([questionElement]);
	}

	question.answers.forEach(answer => {
					const button = document.createElement('button');
					button.innerHTML = answer.text;
					button.classList.add('k-btn', answer.color);
					if (answer.correct) {
									button.dataset.correct = answer.correct;
					}
					button.addEventListener('click', selectAnswer);
					answerButtonsElement.appendChild(button);
	});
	
	if (window.MathJax) {
					MathJax.typesetPromise([answerButtonsElement]);
	}
}

function resetState() {
	nextButton.classList.add('hidden-btn');
	while (answerButtonsElement.firstChild) {
					answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}
}

function selectAnswer(e) {
	const selectedButton = e.target;
	// Evitar clicks en el span de mathjax interno, asegurar que se evalúe el botón
	const btnNode = selectedButton.closest('.k-btn'); 
	if(!btnNode) return;

	const isCorrect = btnNode.dataset.correct === "true";
	if (isCorrect) score++;

	Array.from(answerButtonsElement.children).forEach(button => {
					button.classList.add('disabled');
					if (button.dataset.correct === "true") {
									button.classList.add('correct-ans');
					} else {
									button.classList.add('wrong-ans');
					}
	});
	nextButton.classList.remove('hidden-btn');
}

function nextQuestion() {
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
					showQuestion(questions[currentQuestionIndex]);
	} else {
					showResults();
	}
}

function showResults() {
	document.getElementById('quiz-container').classList.add('hidden');
	const resultContainer = document.getElementById('result-container');
	resultContainer.classList.remove('hidden-btn');
	
	let msg = score === 5 ? "¡Nivel Genio Desbloqueado!" : "Sigue practicando.";
	document.getElementById('final-score').innerText = `Puntuación: ${score} / ${questions.length}\n${msg}`;
}

// Iniciar
startQuiz();