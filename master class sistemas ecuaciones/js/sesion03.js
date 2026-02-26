document.addEventListener('DOMContentLoaded', () => {
    
	// --- DATOS DE LOS 10 EJERCICIOS (ECUACIONES Y SOLUCIONES) ---
	const exercisesData = [
					{ id: 1, eq: ["2x + 3y = 8", "x - y = -1"], det: [-5, -5, -10], sol: [1, 2], matrix: [ [ [2,3],[1,-1] ], [ [8,3],[-1,-1] ], [ [2,8],[1,-1] ] ] },
					{ id: 2, eq: ["4x - 2y = 10", "3x + y = 5"], det: [10, 20, -10], sol: [2, -1], matrix: [ [ [4,-2],[3,1] ], [ [10,-2],[5,1] ], [ [4,10],[3,5] ] ] },
					{ id: 3, eq: ["5x + 4y = 22", "-x + 2y = 4"], det: [14, 28, 42], sol: [2, 3], matrix: [ [ [5,4],[-1,2] ], [ [22,4],[4,2] ], [ [5,22],[-1,4] ] ] },
					{ id: 4, eq: ["3x + 5y = 11", "2x - 3y = 1"], det: [-19, -38, -19], sol: [2, 1], matrix: [ [ [3,5],[2,-3] ], [ [11,5],[1,-3] ], [ [3,11],[2,1] ] ] },
					{ id: 5, eq: ["x + 4y = 10", "5x - 2y = 6"], det: [-22, -44, -44], sol: [2, 2], matrix: [ [ [1,4],[5,-2] ], [ [10,4],[6,-2] ], [ [1,10],[5,6] ] ] },
					{ id: 6, eq: ["6x - 5y = -9", "4x + 3y = 13"], det: [38, 38, 114], sol: [1, 3], matrix: [ [ [6,-5],[4,3] ], [ [-9,-5],[13,3] ], [ [6,-9],[4,13] ] ] },
					{ id: 7, eq: ["7x + 2y = 20", "3x - 4y = -6"], det: [-34, -68, -102], sol: [2, 3], matrix: [ [ [7,2],[3,-4] ], [ [20,2],[-6,-4] ], [ [7,20],[3,-6] ] ] },
					{ id: 8, eq: ["2x - y = 4", "x + 3y = 9"], det: [7, 21, 14], sol: [3, 2], matrix: [ [ [2,-1],[1,3] ], [ [4,-1],[9,3] ], [ [2,4],[1,9] ] ] },
					{ id: 9, eq: ["-4x + 3y = -10", "2x + 5y = 18"], det: [-26, -104, -52], sol: [4, 2], matrix: [ [ [-4,3],[2,5] ], [ [-10,3],[18,5] ], [ [-4,-10],[2,18] ] ] },
					{ id: 10, eq: ["8x - 3y = 23", "5x + 2y = 26"], det: [31, 124, 93], sol: [4, 3], matrix: [ [ [8,-3],[5,2] ], [ [23,-3],[26,2] ], [ [8,23],[5,26] ] ] }
	];

	// --- GENERAR EJERCICIOS EN EL DOM ---
	const container = document.getElementById('exercises-container');

	exercisesData.forEach(ex => {
					const card = document.createElement('div');
					card.className = 'exercise-card';

					// Estructura de la tarjeta
					card.innerHTML = `
									<h3>Ejercicio ${ex.id}</h3>
									<div class="equation">
													${ex.eq[0]}<br>
													${ex.eq[1]}
									</div>
									<button class="btn-solution" onclick="toggleSolution(${ex.id})">Ver Solución Paso a Paso</button>
									
									<div id="solution-${ex.id}" class="solution-container">
													<p class="step-title"><strong>Paso 1: Calcular Δ (Determinante del sistema)</strong></p>
													<div class="matrix-block">
																	Δ = | ${ex.matrix[0][0][0]} &nbsp; ${ex.matrix[0][0][1]} | = (${ex.matrix[0][0][0]} • ${ex.matrix[0][1][1]}) - (${ex.matrix[0][0][1]} • ${ex.matrix[0][1][0]}) = ${ex.det[0]} <br>
																	&nbsp; &nbsp; | ${ex.matrix[0][1][0]} &nbsp; ${ex.matrix[0][1][1]} |
													</div>

													<p class="step-title"><strong>Paso 2: Calcular Δx y Δy</strong></p>
													<div class="matrix-block">
																	Δx = | ${ex.matrix[1][0][0]} &nbsp; ${ex.matrix[1][0][1]} | = ${ex.det[1]} <br>
																	&nbsp; &nbsp; &nbsp;| ${ex.matrix[1][1][0]} &nbsp; ${ex.matrix[1][1][1]} |
													</div>
													<div class="matrix-block">
																	Δy = | ${ex.matrix[2][0][0]} &nbsp; ${ex.matrix[2][0][1]} | = ${ex.det[2]} <br>
																	&nbsp; &nbsp; &nbsp;| ${ex.matrix[2][1][0]} &nbsp; ${ex.matrix[2][1][1]} |
													</div>

													<p class="step-title"><strong>Paso 3: Aplicar Regla de Cramer (x = Δx/Δ , y = Δy/Δ)</strong></p>
													<div class="matrix-block">
																	x = ${ex.det[1]} / ${ex.det[0]} = ${ex.sol[0]} <br>
																	y = ${ex.det[2]} / ${ex.det[0]} = ${ex.sol[1]}
													</div>
													
													<p class="final-answer">Solución: x = ${ex.sol[0]}, y = ${ex.sol[1]}</p>
									</div>
					`;
					container.appendChild(card);
	});

	// --- FUNCIÓN PARA MOSTRAR/OCULTAR SOLUCIONES ---
	// Definida en el scope global para el onclick del HTML generado
	window.toggleSolution = (id) => {
					const solDiv = document.getElementById(`solution-${id}`);
					const btn = solDiv.previousElementSibling;
					
					if (solDiv.classList.contains('show')) {
									solDiv.classList.remove('show');
									btn.textContent = "Ver Solución Paso a Paso";
					} else {
									solDiv.classList.add('show');
									btn.textContent = "Ocultar Solución";
					}
	}

	// ==========================================
	// --- LÓGICA DEL QUIZZ (ESTILO KAHOOT) ---
	// ==========================================
	
	const quizQuestions = [
					{
									q: "¿Cómo se calcula el determinante del sistema (Δ) en un sistema 2x2?",
									options: ["Suma de las diagonales", "Producto diagonal principal - Producto diagonal secundaria", "Producto diagonal secundaria - Producto diagonal principal", "División de coeficientes de x"],
									correct: 1
					},
					{
									q: "Si en el cálculo del sistema, el determinante Δ = 0, ¿qué podemos concluir?",
									options: ["El sistema tiene solución única", "El sistema no tiene solución o tiene infinitas", "Cometimos un error, nunca puede ser cero", "La solución es x=0, y=0"],
									correct: 1
					},
					{
									q: "Dado el sistema: <br>2x + y = 5 <br> x - y = 1<br>¿Cuál es el valor de Δ?",
									options: ["3", "1", "-1", "-3"],
									correct: 3 // (2*-1)-(1*1) = -2 - 1 = -3
					},
					{
									q: "Según la Regla de Cramer, ¿cómo se calcula la incógnita 'y'?",
									options: ["y = Δ / Δx", "y = Δy • Δ", "y = Δy / Δ", "y = Δx / Δy"],
									correct: 2
					},
					{
									q: "¿Cuál es el primer paso para armar el determinante Δx?",
									options: ["Sustituir la columna de 'x' por los términos independientes", "Sustituir la columna de 'y' por los términos independientes", "Usar solo los coeficientes de 'x'", "Multiplicar todo el sistema por -1"],
									correct: 0
					}
	];

	let currentQuestionIndex = 0;
	let score = 0;
	const quizContent = document.getElementById('quiz-container');
	const startBtn = document.getElementById('start-quiz-btn');

	startBtn.addEventListener('click', startQuiz);

	function startQuiz() {
					currentQuestionIndex = 0;
					score = 0;
					loadQuestion();
	}

	function loadQuestion() {
					const qData = quizQuestions[currentQuestionIndex];
					
					quizContent.innerHTML = `
									<p id="quiz-question">${qData.q}</p>
									<div class="quiz-options">
													${qData.options.map((opt, index) => `
																	<button class="opt-btn opt-${index}" onclick="checkAnswer(${index})">${opt}</button>
													`).join('')}
									</div>
									<p style="margin-top:20px;">Pregunta ${currentQuestionIndex + 1} de ${quizQuestions.length}</p>
					`;
	}

	// Definida global para onclick de botones generados
	window.checkAnswer = (selectedIndex) => {
					const qData = quizQuestions[currentQuestionIndex];
					const card = quizContent;

					if (selectedIndex === qData.correct) {
									score++;
									card.className = "quiz-card correct-flash";
					} else {
									card.className = "quiz-card incorrect-flash";
					}

					// Pequeña pausa para feedback visual antes de la siguiente pregunta
					setTimeout(() => {
									card.className = "quiz-card"; // reset clase animacion
									currentQuestionIndex++;
									if (currentQuestionIndex < quizQuestions.length) {
													loadQuestion();
									} else {
													showResults();
									}
					}, 600);
	}

	function showResults() {
					quizContent.innerHTML = `
									<h3>¡Quiz Terminado!</h3>
									<p style="font-size: 1.3rem; margin: 20px 0;">Tu puntuación es:</p>
									<div style="font-size: 3rem; font-weight: bold; color: var(--primary-color);">
													${score} / ${quizQuestions.length}
									</div>
									<p style="margin-bottom: 20px;">${score >= 4 ? "¡Eres un experto en matrices!" : "Sigue practicando las ecuaciones."}</p>
									<button id="restart-quiz-btn" class="btn-primary">Intentar de nuevo</button>
					`;
					document.getElementById('restart-quiz-btn').addEventListener('click', startQuiz);
	}
});