// Аудио
const audio = document.getElementById('backgroundAudio');
const muteBtn = document.getElementById('muteBtn');
let isMuted = false;

muteBtn.addEventListener('click', () => {
    if (isMuted) {
        audio.play();
        muteBtn.textContent = '🔇 Выключить звук';
    } else {
        audio.pause();
        muteBtn.textContent = '🔊 Включить звук';
    }
    isMuted = !isMuted;
});

// Автозапуск музыки (может требовать взаимодействия пользователя)
document.addEventListener('click', () => {
    if (audio.paused && !isMuted) {
        audio.play().catch(e => console.log("Автовоспроизведение заблокировано"));
    }
}, { once: true });

// Бинго
const bingoItems = [
    "Пример 1", "Пример 2", "Пример 3", "Пример 4", "Пример 5",
    "Пример 6", "Пример 7", "Пример 8", "Пример 9", "Пример 10",
    // ... всего 25 элементов для сетки 5x5
];

let revealedCells = [];
const totalCells = 25;

// Создание сетки
const bingoGrid = document.getElementById('bingoGrid');
for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'bingo-cell';
    cell.dataset.index = i;
    cell.textContent = `?`;
    bingoGrid.appendChild(cell);
}

// Админ-функция для открытия ячеек
const adminShowBtn = document.getElementById('adminShowBtn');
let currentRevealIndex = 0;

adminShowBtn.addEventListener('click', () => {
    if (currentRevealIndex < totalCells) {
        const cells = document.querySelectorAll('.bingo-cell');
        cells[currentRevealIndex].classList.add('revealed');
        cells[currentRevealIndex].textContent = bingoItems[currentRevealIndex] || `Ячейка ${currentRevealIndex + 1}`;
        currentRevealIndex++;
    }
});

// Пароль для админ-панели (простой вариант)
const adminPassword = "admin123";
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('admin') === adminPassword) {
    adminShowBtn.style.display = 'block';
}