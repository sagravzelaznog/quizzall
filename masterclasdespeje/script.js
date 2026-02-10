// Sistema de puntuación acumulativa JMGV-PTEL
let score = 0;
const completedActs = { 1: false, 2: false, 3: false };

function checkAnswer(actNum, correctAnswer) {
    const userInput = document.getElementById(`input-${actNum}`).value;
    const currentInput = document.getElementById(`input-${actNum}`);
    
    if (parseFloat(userInput) === correctAnswer) {
        if (!completedActs[actNum]) {
            score++;
            completedActs[actNum] = true;
            updateScore();
            
            // Estética de éxito
            currentInput.style.borderColor = "#48bb78";
            currentInput.disabled = true;
            document.querySelector(`#act-${actNum} button`).disabled = true;
            document.querySelector(`#act-${actNum} button`).innerText = "Correcto ✓";
        }
    } else {
        currentInput.style.borderColor = "#ef4444";
        alert("¡Casi lo tienes! Revisa la operación inversa.");
    }
}

function updateScore() {
    document.getElementById('current-score').innerText = score;
    
    // Desbloqueo de mensaje especial al completar las 3 actividades
    if (score === 3) {
        const reward = document.getElementById('special-reward');
        reward.classList.add('reward-visible');
        reward.scrollIntoView({ behavior: 'smooth' });
    }
}