// GENERADORES DE EFECTOS
function generateEmojiRain() {
    const emojis = ['🤢','😖','❌','😦','🚫','🤮','❗','👎','⏰'];
    const emojiRain = document.querySelector('.emoji-rain');
    emojiRain.innerHTML = '';
    for (let i = 0; i < 50; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji-item';
        emoji.style.left = `${Math.random() * 95}%`;
        emoji.style.animationDelay = `${Math.random() * 2}s`;
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emojiRain.appendChild(emoji);
    }
}

function generateConfetiRain() {
    const confetiElements = ['✅', '🎉', '✨', '🚀', '🌟'];
    const confetiRain = document.querySelector('.confeti-rain');
    confetiRain.innerHTML = '';
    for (let i = 0; i < 100; i++) {
        const confeti = document.createElement('div');
        confeti.className = 'confeti-item';
        confeti.style.left = `${Math.random() * 90}%`;
        confeti.style.animationDelay = `${Math.random() * 2}s`;
        confeti.style.setProperty('--offset', `${Math.random() * 20}%`);
        confeti.textContent = confetiElements[Math.floor(Math.random() * confetiElements.length)];
        confetiRain.appendChild(confeti);
    }
}

// DATOS DE VIRUS
const virusData = [
    {
        img: 'https://d41chssnpqdne.cloudfront.net/user_upload_by_module/chat_bot/files/1851483/myYo5XEsp1beUMJN.jpg?Expires=1743013526&Signature=MSXY1ra5MZ8W~mCssJBD7Es3ac3bLv1cL9Hh4MB--eROPEUhGXP9fAKJz-Krv0eOKSE08qMbTDnrZn4A1kZj2uiH1gGgHc8Zqme5UceFjmd5UTRzBU3TmCEFLGWAK~MdWXjII1SFZnKh-kIWErq~PjGMdZwGBAgO-dWsB1l0cggDXGx1glUrauqRMYWO9J3SKqIjC4K5jPTbtyxk6B2INQ1Q~atTKKsiOQQ0aVTlJuXbMucblcajY5iaU91widsGnLBJCLFG0WeoOPuV5AFxAoh5ZW6Bjx~M-l4yjAQLmd3EGoLI6LoXHAPGWXL8Ze3AxyB9RUQdiKTOPKorPyqrhw__&Key-Pair-Id=K3USGZIKWMDCSX',
        answer: 'coronavirus'
    },
    {
        img: 'https://d41chssnpqdne.cloudfront.net/user_upload_by_module/chat_bot/files/1851483/6bVLXsS54Nvcgusu.jpg?Expires=1743013526&Signature=Xjfp5A5~4oR9NCbCSb4fVncsigKodG-Ys~37W8vm7ki8WuX-SUpLHhtNZsbW8J~nwIr~WzHi5fooEdJaFdr~Av8NTt70ZBWuqTx3cMXWiijHqGJGVwVhuTOJUQWENBtgnlZrr1A7MHmFfkMdrT6KP2Q~~zSRUuEiq4ka5l4NXwkJWiw9xUSCx~CpFCHKevEoC3lJ~Wfk0UmDMRZo7AfSvTWJZH9coCiIyYJ6erQNP7kYB6bOIxQ2r4k2q0QUdujh1Td7SyVHFleZ2bv98pox2xJaw8WfG3seQ7KWofA4DUJ7wRuAawf8paNvsD6LrAcrEjBi1S1DuGM5dSEzdwW2Dw__&Key-Pair-Id=K3USGZIKWMDCSX',
        answer: 'dengue'
    },
    {
        img: 'https://d41chssnpqdne.cloudfront.net/user_upload_by_module/chat_bot/files/1851483/JPlelSTvvHSgUReB.jpg?Expires=1743013526&Signature=atomlvjVeZNRw9PU8zNiijxlma5dW2FkB6PsdxEik4aHf7Y9k2i09nC8nXFCZYhLHnp9iDXbmjF9yLG80e4Q2GZpvqEgGYTnVNFi2U9LmocKfI7oypE2TLpWtde5E8ypBi91ulsoPRGfMajKVa0BjRr6VgvmMs1x99nidBdd8HRTjpfkBRC0mg0Bbu2FIjxu-EbhEu~xSgC8dglstSr2zxiWI-XQbycrRmt9177QYllO5PF7rwrPLUlZV3mQEdeoIEjsU5kww~4V3t4yJxdrd1S3oaWfsBB4yyxp8mQD4MItLJAgYkM0N8fpYAafqRtbJq2~MnGHTcOTMWYpEjjlZA__&Key-Pair-Id=K3USGZIKWMDCSX',
        answer: 'viruela del mono'
    }
];

// VARIABLES GLOBALES
let currentVirus = 0;
let timeLeft = 15;
let timerInterval;
const progressBar = document.getElementById('progress-bar');
const feedback = document.getElementById('feedback');
const temporizadorTitulo = document.getElementById('temporizador-titulo');
const temporizador = document.getElementById('temporizador');

// INICIALIZADOR DEL TEMPORIZADOR
function startVirusTimer() {
    clearInterval(timerInterval);
    timeLeft = 15;
    progressBar.style.width = '100%';
    progressBar.style.backgroundColor = '#4CAF50';
    timerInterval = setInterval(() => {
        timeLeft--;
        const color = timeLeft > 10 ? '#FFD700' : timeLeft > 5 ? '#FFA500' : '#FF4444';
        temporizadorTitulo.style.color = temporizador.style.color = color;
        progressBar.style.width = `${(timeLeft / 15) * 100}%`;
        progressBar.style.backgroundColor = 
            timeLeft <= 5 ? '#f44336' : 
            timeLeft <= 10 ? '#ffeb3b' : '#4CAF50';
        temporizador.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showModal();
        }
    }, 1000);
}

// VERIFICACIÓN DE RESPUESTA
function checkAnswer() {
    const answer = document.getElementById('answerInput').value.toLowerCase();
    const correctAnswer = virusData[currentVirus].answer;
    if (answer === correctAnswer) {
        const successModal = document.getElementById('success-modal');
        successModal.style.display = 'flex';
        setTimeout(() => {
            successModal.style.display = 'none';
            nextVirus();
        }, 1500);
        clearInterval(timerInterval);
        document.getElementById('answerInput').value = '';
    } else {
        const errorModal = document.getElementById('error-modal');
        errorModal.style.display = 'flex';
        errorModal.style.animation = 'errorBrusco 0.3s';
        setTimeout(() => {
            errorModal.style.animation = 'errorExit 0.5s forwards';
            setTimeout(() => {
                errorModal.style.display = 'none';
                document.getElementById('answerInput').value = '';
            }, 500);
        }, 2000);
        feedback.textContent = '❌ Incorrecto';
        feedback.style.color = '#f44336';
        startVirusTimer();
    }
}

// AVANCE ENTRE NIVELES
function nextVirus() {
    currentVirus++;
    if (currentVirus < virusData.length) {
        document.getElementById('virus-image').src = virusData[currentVirus].img;
        document.getElementById('answerInput').value = '';
        feedback.textContent = '';
        startVirusTimer();
    } else {
        document.getElementById('final-modal').style.display = 'flex';
        generateConfetiRain();
    }
}

// MOSTRAR MODAL DE TIEMPO AGOTADO
function showModal() {
    const modal = document.getElementById('timeout-modal');
    modal.style.display = 'flex';
    modal.style.animation = 'modalAbruptEntrance 0.3s forwards';
    modal.querySelector('.modal-content').style.animation = 'vibrar 0.3s 3';
    generateEmojiRain();
}

// FUNCIONES DE CONTROL
function reintentar() {
    document.getElementById('timeout-modal').style.display = 'none';
    document.getElementById('answerInput').value = '';
    feedback.textContent = '';
    startVirusTimer();
}

function saltarMision() {
    window.location.href = 'nivel3.html';
}

function irANivel3() {
    window.location.href = 'nivel3.html';
    document.getElementById('final-modal').style.display = 'none';
}

// EVENTOS
document.getElementById('answerInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAnswer();
});

document.getElementById('skipButton').addEventListener('click', () => {
    clearInterval(timerInterval);
    saltarMision();
});

// INICIO DEL JUEGO
startVirusTimer();
