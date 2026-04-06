/**
 * Masterclass Sesión 32 - Script
 * Genio Desarrollador Web - Funcionalidad Interactiva
 */

document.addEventListener('DOMContentLoaded', () => {
    // Variables del quiz
    const questions = [
        {
            question: "¿Cuál es la concentración final al mezclar 2L de solución al 40% con 3L de solución al 20%?",
            options: ["20%", "28%", "30%", "35%"],
            answer: 1
        },
        {
            question: "En los problemas de mezclas, la cantidad de soluto siempre se conserva.",
            options: ["Verdadero", "Falso"],
            answer: 0
        },
        {
            question: "Si mezclas volúmenes iguales de soluciones al 30% y 50%, ¿cuál es la concentración final?",
            options: ["35%", "40%", "45%", "50%"],
            answer: 1
        },
        {
            question: "¿Cuántas variables hay en un problema de mezcla con 3 concentraciones diferentes?",
            options: ["1", "2", "3", "4"],
            answer: 2
        },
        {
            question: "El sistema de ecuaciones para problemas de mezclas siempre tiene solución única.",
            options: ["Verdadero", "Falso"],
            answer: 1
        }
    ];

    let currentScore = 0;
    let selectedAnswers = new Array(questions.length).fill(null);

    // Función para mostrar/ocultar soluciones
    window.toggleSolution = function(id) {
        const solution = document.getElementById('solution' + id);
        solution.classList.toggle('hidden');
    };

    // Funciones del quiz
    window.startQuiz = function() {
        document.getElementById('quiz-intro').classList.add('hidden');
        document.getElementById('quiz-questions').classList.remove('hidden');
        showQuestions();
    };

    function showQuestions() {
        const questionsContainer = document.getElementById('quiz-questions');
        questionsContainer.innerHTML = '';

        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';
            questionDiv.innerHTML = `
                <h4>${index + 1}. ${q.question}</h4>
                <div class="quiz-options">
                    ${q.options.map((option, optIndex) => `
                        <div class="quiz-option" onclick="selectAnswer(${index}, ${optIndex})">
                            ${option}
                        </div>
                    `).join('')}
                </div>
            `;
            questionsContainer.appendChild(questionDiv);
        });

        const submitBtn = document.createElement('button');
        submitBtn.className = 'quiz-btn';
        submitBtn.textContent = 'Enviar Respuestas';
        submitBtn.onclick = submitQuiz;
        questionsContainer.appendChild(submitBtn);
    }

    window.selectAnswer = function(questionIndex, optionIndex) {
        selectedAnswers[questionIndex] = optionIndex;
        const options = document.querySelectorAll(`.quiz-question:nth-child(${questionIndex + 1}) .quiz-option`);
        options.forEach((opt, idx) => {
            opt.classList.remove('selected');
            if (idx === optionIndex) {
                opt.classList.add('selected');
            }
        });
    };

    function submitQuiz() {
        currentScore = 0;
        questions.forEach((q, index) => {
            if (selectedAnswers[index] === q.answer) {
                currentScore++;
            }
        });
        showResults();
    }

    function showResults() {
        document.getElementById('quiz-questions').classList.add('hidden');
        document.getElementById('quiz-results').classList.remove('hidden');
        const scoreDisplay = document.getElementById('score-display');
        scoreDisplay.innerHTML = `
            <p>Tu puntuación: ${currentScore} de ${questions.length}</p>
            <p>${currentScore >= 4 ? '¡Excelente! Eres un maestro de las mezclas.' : currentScore >= 3 ? '¡Bien hecho! Sigue practicando.' : 'Necesitas repasar los conceptos. ¡Ánimo!'}</p>
        `;
    }

    window.restartQuiz = function() {
        selectedAnswers.fill(null);
        currentScore = 0;
        document.getElementById('quiz-results').classList.add('hidden');
        document.getElementById('quiz-intro').classList.remove('hidden');
    };

    // Funciones de actividades (placeholders)
    window.startActivity = function(activityNumber) {
        alert(`Actividad ${activityNumber} iniciada. ¡Diviértete aprendiendo!`);
    };
});

	// Agregar event listeners para los botones del quiz
	document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
	document.getElementById('restart-quiz-btn').addEventListener('click', restartQuiz);