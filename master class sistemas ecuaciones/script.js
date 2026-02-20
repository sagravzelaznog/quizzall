// Base de datos de preguntas extraídas del desarrollo matemático
const quizData = [
	{
					question: "¿Cuál es el valor final de la variable x en el sistema resuelto?",
					options: ["240/67", "248/67", "123/67", "1240/335"],
					correctAnswer: 1 // Índice del arreglo (248/67)
	},
	{
					question: "Al sustituir x para encontrar y, ¿cuál fue el resultado final de y?",
					options: ["123/67", "369/201", "248/67", "13/5"],
					correctAnswer: 0 // (123/67)
	},
	{
					question: "En la comprobación, ¿cuál es el mínimo común múltiplo (mcm) de los denominadores 268 y 201?",
					options: ["402", "3216", "804", "201"],
					correctAnswer: 2 // (804)
	}
];

const questionEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score-display');

let currentQuestionIndex = 0;
let score = 0;

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
	currentQuestionIndex++;
	if (currentQuestionIndex < quizData.length) {
					loadQuestion();
	} else {
					showResults();
	}
});

function startQuiz() {
	startBtn.classList.add('hidden');
	currentQuestionIndex = 0;
	score = 0;
	scoreDisplay.classList.add('hidden');
	loadQuestion();
}

function loadQuestion() {
	nextBtn.classList.add('hidden');
	optionsContainer.innerHTML = '';
	
	const currentQuizData = quizData[currentQuestionIndex];
	questionEl.innerText = currentQuizData.question;

	currentQuizData.options.forEach((option, index) => {
					const button = document.createElement('button');
					button.innerText = option;
					button.classList.add('option-btn');
					button.addEventListener('click', () => selectAnswer(index, button));
					optionsContainer.appendChild(button);
	});
}

function selectAnswer(selectedIndex, selectedButton) {
	const currentQuizData = quizData[currentQuestionIndex];
	const isCorrect = selectedIndex === currentQuizData.correctAnswer;
	const allButtons = document.querySelectorAll('.option-btn');

	// Deshabilitar todos los botones tras responder
	allButtons.forEach(btn => btn.disabled = true);

	if (isCorrect) {
					selectedButton.classList.add('correct');
					score++;
					// Retroalimentación auditiva simulada
					playTone('success');
	} else {
					selectedButton.classList.add('incorrect');
					// Resaltar la respuesta correcta
					allButtons[currentQuizData.correctAnswer].classList.add('correct');
					playTone('error');
	}

	nextBtn.classList.remove('hidden');
}

function showResults() {
	questionEl.innerText = "¡Módulo Completado!";
	optionsContainer.innerHTML = '';
	nextBtn.classList.add('hidden');
	
	scoreDisplay.innerText = `Tu puntuación: ${score} de ${quizData.length}`;
	scoreDisplay.classList.remove('hidden');
	scoreDisplay.style.fontSize = '1.5rem';
	scoreDisplay.style.fontWeight = 'bold';
	scoreDisplay.style.color = 'var(--primary-purple)';
	
	startBtn.innerText = "Reintentar Quiz";
	startBtn.classList.remove('hidden');
}

// Generador de tonos Web Audio API para feedback inmediato (Genio Psicólogo)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playTone(type) {
	if(audioCtx.state === 'suspended') audioCtx.resume();
	const oscillator = audioCtx.createOscillator();
	const gainNode = audioCtx.createGain();
	
	oscillator.connect(gainNode);
	gainNode.connect(audioCtx.destination);
	
	if (type === 'success') {
					oscillator.type = 'sine';
					oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
					oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.1); // C6
					gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
					gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
					oscillator.start();
					oscillator.stop(audioCtx.currentTime + 0.3);
	} else {
					oscillator.type = 'sawtooth';
					oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
					gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
					gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
					oscillator.start();
					oscillator.stop(audioCtx.currentTime + 0.3);
	}
}