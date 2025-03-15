// Juego del rompecabezas
let timeLeft = 90;
let timerId;
const puzzleSize = 5;
let piezaSeleccionada = null;
const timerDisplay = document.getElementById('timer');

function startMission(e) {
    e.preventDefault();
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('puzzle-section').style.display = 'block';
    crearTablero();
    mezclarPiezas();
    startTimer();
    document.getElementById('logo-referencia').style.opacity = '1';
}

function crearTablero() {
    const tablero = document.getElementById('puzzle-grid');
    tablero.innerHTML = '';

    for (let i = 0; i < puzzleSize * puzzleSize; i++) {
        const pieza = document.createElement('div');
        pieza.classList.add('puzzle-piece');
        const fila = Math.floor(i / puzzleSize);
        const columna = i % puzzleSize;
        pieza.style.backgroundPosition = `-${columna * 120}px -${fila * 120}px`;
        pieza.dataset.posicionOriginal = i;
        pieza.addEventListener('click', () => seleccionarPieza(pieza));
        tablero.appendChild(pieza);
    }
}

function seleccionarPieza(pieza) {
    if (!piezaSeleccionada) {
        pieza.classList.add('seleccionada');
        piezaSeleccionada = pieza;
    } else {
        const tempBackground = piezaSeleccionada.style.backgroundPosition;
        const tempPos = piezaSeleccionada.dataset.posicionOriginal;

        piezaSeleccionada.style.backgroundPosition = pieza.style.backgroundPosition;
        piezaSeleccionada.dataset.posicionOriginal = pieza.dataset.posicionOriginal;

        pieza.style.backgroundPosition = tempBackground;
        pieza.dataset.posicionOriginal = tempPos;

        piezaSeleccionada.classList.remove('seleccionada');
        piezaSeleccionada = null;
        verificarSolucion();
    }
}

function mezclarPiezas() {
    const piezas = document.querySelectorAll('.puzzle-piece');
    let arrayPiezas = Array.from(piezas);

    for (let i = arrayPiezas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayPiezas[i].style.backgroundPosition, arrayPiezas[j].style.backgroundPosition] = 
        [arrayPiezas[j].style.backgroundPosition, arrayPiezas[i].style.backgroundPosition];
        
        [arrayPiezas[i].dataset.posicionOriginal, arrayPiezas[j].dataset.posicionOriginal] = 
        [arrayPiezas[j].dataset.posicionOriginal, arrayPiezas[i].dataset.posicionOriginal];
    }
}

function verificarSolucion() {
    const piezas = document.querySelectorAll('.puzzle-piece');
    let completado = true;

    piezas.forEach((pieza, index) => {
        if (parseInt(pieza.dataset.posicionOriginal) !== index) {
            completado = false;
        }
    });

    if (completado && timeLeft > 0) {
        clearInterval(timerId);
        document.getElementById('success-modal').style.display = 'flex';
        document.getElementById('logo-referencia').style.display = 'none';
    }
}

function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const seconds = (timeLeft % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
        
        timerDisplay.style.animation = 'none';
        void timerDisplay.offsetWidth;
        timerDisplay.style.animation = 'latido 1s';

        if(timeLeft <= 0) {
            clearInterval(timerId);
            showEndModal();
        }
    }, 1000);
}

function showEndModal() {
    document.getElementById('end-modal').style.display = 'flex';
}

function restartGame() {
    document.getElementById('end-modal').style.display = 'none';
    document.getElementById('puzzle-section').style.display = 'block';
    timeLeft = 90;
    timerDisplay.textContent = '01:30';
    document.getElementById('logo-referencia').style.display = 'block';
    crearTablero();
    mezclarPiezas();
    startTimer();
}

function skipMission() {
    document.getElementById('puzzle-section').style.display = 'none';
    document.getElementById('virus-section').style.display = 'block';
    document.getElementById('success-modal').style.display = 'none';
    document.getElementById('end-modal').style.display = 'none';
}

// Juego de identificación de virus
const virusData = [
    {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Coronavirus_structure.svg/1200px-Coronavirus_structure.svg.png', answer: 'coronavirus'},
    {img: 'https://www.who.int/images/default-source/health-topics/dengue/dengue-virus-structure.jpg', answer: 'dengue'},
    {img: 'https://www.who.int/images/default-source/health-topics/monkeypox/monkeypox-virus-structure.jpg', answer: 'viruela del mono'},
    {img: 'https://www.who.int/images/default-source/health-topics/cancer/cancer-cell-illustration.jpg', answer: 'cancer'},
    {img: 'https://www.who.int/images/default-source/health-topics/pneumonia/pneumonia-illustration.jpg', answer: 'neumonia'},
    {img: 'https://www.who.int/images/default-source/health-topics/measles/measles-virus-structure.jpg', answer: 'sarampion'}
];

let currentLevel = 0;
const input = document.getElementById('answerInput');
const feedback = document.getElementById('feedback');
const virusImage = document.getElementById('virus-image');

input.addEventListener('input', () => {
    const answer = input.value.trim().toLowerCase();
    if (answer === virusData[currentLevel].answer) {
        feedback.textContent = '¡Correcto! Siguiente virus:';
        feedback.style.color = 'var(--verde-salud)';
        currentLevel++;
        input.value = '';
        
        if (currentLevel < virusData.length) {
            virusImage.src = virusData[currentLevel].img;
        } else {
            window.location.href = 'nivel2.html';
        }
    } else {
        feedback.textContent = 'Incorrecto. Inténtalo de nuevo';
        feedback.style.color = 'var(--naranja-energia)';
    }
});
