// Sistema de Puntuación Acumulativa JMGV-PTEL
let score = 0;
const actsCompleted = { 1: false, 2: false, 3: false };

function checkAnswer(actId, correctAnswer) {
    const inputElement = document.getElementById(`input-${actId}`);
    const buttonElement = document.querySelector(`#act-${actId} button`);
    const userAnswer = parseFloat(inputElement.value);

    if (userAnswer === correctAnswer) {
        if (!actsCompleted[actId]) {
            // Actualizar estado y puntuación
            actsCompleted[actId] = true;
            score++;
            document.getElementById('current-score').innerText = score;

            // Feedback visual positivo
            inputElement.style.borderColor = "#059669";
            inputElement.style.backgroundColor = "#ecfdf5";
            inputElement.disabled = true;
            
            buttonElement.innerText = "¡Correcto! ✓";
            buttonElement.disabled = true;

            // Verificar si se completaron todas las actividades
            checkWinCondition();
        }
    } else {
        // Feedback visual de error
        inputElement.style.borderColor = "#e11d48";
        inputElement.style.backgroundColor = "#fff1f2";
        
        // Animación de vibración sutil
        inputElement.style.transform = "translateX(5px)";
        setTimeout(() => inputElement.style.transform = "translateX(-5px)", 100);
        setTimeout(() => inputElement.style.transform = "translateX(0)", 200);
    }
}

function checkWinCondition() {
    if (score === 3) {
        setTimeout(() => {
            const rewardSection = document.getElementById('special-reward');
            rewardSection.classList.add('reward-visible');
            
            // Hacer scroll suave hacia el mensaje de victoria
            rewardSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500); // Pequeño retraso para crear expectativa
    }
}