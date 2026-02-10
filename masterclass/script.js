// Validación de la Actividad 1
function checkAct1() {
    const ans = document.getElementById('ans1').value;
    const feedback = document.getElementById('feedback1');
    if(ans == 80) {
        feedback.innerHTML = "¡Excelente! 15x = 1200 -> x = 80.";
        feedback.className = "success";
    } else {
        feedback.innerHTML = "Intenta de nuevo. Divide 1200 entre 15.";
        feedback.className = "error";
    }
}

// Validación de la Actividad 2
function checkAct2() {
    const ans = document.getElementById('ans2').value;
    const feedback = document.getElementById('feedback2');
    // tan(30) ≈ 0.577. d = 50 / 0.577 ≈ 86.6
    if(Math.round(ans) == 87) {
        feedback.innerHTML = "¡Precisión de Genio! La distancia es aprox 86.6m.";
        feedback.className = "success";
    } else {
        feedback.innerHTML = "Casi. Recuerda: d = 50 / tan(30°).";
        feedback.className = "error";
    }
}

// Validación de la Actividad 3
function checkAct3() {
    const ans = document.getElementById('ans3').value;
    const feedback = document.getElementById('feedback3');
    // x * 1.16 = 450 -> x = 387.93
    if(Math.round(ans) == 388) {
        feedback.innerHTML = "¡Correcto! El precio base es $387.93.";
        feedback.className = "success";
    } else {
        feedback.innerHTML = "Revisa el planteamiento: x + 0.16x = 450.";
        feedback.className = "error";
    }
}