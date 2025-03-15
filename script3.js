const respuestasValidas = [
    '7 de abril de 1948', '7-4-1948', '7/4/1948',
    '07/04/1948', '07-04-1948', '7 abril 1948'
];
let timeLeft = 30;
let timerId;
let timerDisplay, progressBar, inputRespuesta;

function initGame() {
    timerDisplay = document.getElementById('timer');
    progressBar = document.getElementById('progress-bar');
    inputRespuesta = document.getElementById('respuesta');
    startTimer();
    inputRespuesta.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') verificarRespuesta();
    });
}

function startTimer() {
    clearInterval(timerId); // Limpiar timer anterior
    timeLeft = 30;
    timerDisplay.textContent = '00:30';
    progressBar.style.width = '100%';
    timerId = setInterval(() => {
        timeLeft--;
        const segundos = timeLeft.toString().padStart(2, '0');
        timerDisplay.textContent = `00:${segundos}`;
        progressBar.style.width = `${(timeLeft / 30) * 100}%`;

        // Cambiar colores del cronómetro
        if (timeLeft > 20) {
            timerDisplay.classList.remove('timer-yellow', 'timer-red');
            timerDisplay.classList.add('timer-green');
            progressBar.style.backgroundColor = '#2ecc71'; // Verde
        } else if (timeLeft > 10) {
            timerDisplay.classList.remove('timer-green', 'timer-red');
            timerDisplay.classList.add('timer-yellow');
            progressBar.style.backgroundColor = '#f39c12'; // Amarillo
        } else {
            timerDisplay.classList.remove('timer-green', 'timer-yellow');
            timerDisplay.classList.add('timer-red');
            progressBar.style.backgroundColor = '#e74c3c'; // Rojo
        }

        if (timeLeft <= 0) {
            clearInterval(timerId);
            mostrarModal('timeout-modal');
        }
    }, 1000); // 1 segundo real
}

function verificarRespuesta() {
    const respuesta = inputRespuesta.value.trim().toLowerCase();
    const esValida = respuestasValidas.some(r => respuesta === r.toLowerCase());
    if (esValida) {
        clearInterval(timerId);
        mostrarModal('success-modal');
        crearConfeti(100); // Más confeti
    } else {
        mostrarModal('error-modal');
        setTimeout(() => {
            document.getElementById('error-modal').style.display = 'none';
            inputRespuesta.value = ''; // Borrar el contenido del input
            startTimer(); // Reiniciar el cronómetro
        }, 800);
    }
}

function mostrarModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function reiniciarIntento() {
    document.getElementById('timeout-modal').style.display = 'none';
    inputRespuesta.value = '';
    startTimer();
}

function saltarNivel() {
    window.location.href = 'nivel4.html';
}

function crearConfeti(cantidad) {
    const colores = ['#2ECC71', '#1ABC9C', '#FFD700', '#FF6F61']; // Colores vibrantes
    const contenedor = document.querySelector('.confetti');
    for (let i = 0; i < cantidad; i++) {
        const confeti = document.createElement('div');
        confeti.className = 'confetti-piece';
        confeti.style.left = Math.random() * 100 + '%'; // Posición horizontal aleatoria
        confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)]; // Color aleatorio
        confeti.style.animationDuration = Math.random() * 1 + 2 + 's'; // Duración de la animación aleatoria
        confeti.style.width = Math.random() * 10 + 15 + 'px'; // Tamaño variado
        confeti.style.height = confeti.style.width;
        contenedor.appendChild(confeti);
        setTimeout(() => confeti.remove(), 300000000000000000000); // Eliminar después de 3 segundos
    }
}

document.addEventListener('DOMContentLoaded', initGame);
