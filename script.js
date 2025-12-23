// ===================================================
// Чего смотрим?
// ===================================================

const bingoItems = [
    "Боролись с мультиколлинеарностью",
    "?", 
    "?",
    "?",
    "?",
    
    "?",
    "Всем", 
    "?",
    "?",
    "?",
    
    "?",
    "?", 
    "Привет",
    "?",
    "?",
    
    "?",
    "?", 
    "?",
    "?",
    "?",
    
    "?",
    "?", 
    "?",
    "?",
    "?"
];

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

// Автозапуск музыки
document.addEventListener('click', () => {
    if (audio.paused && !isMuted) {
        audio.play().catch(e => console.log("Автовоспроизведение заблокировано"));
    }
}, { once: true });

const totalCells = 25;

// Бинго - просто отображаем элементы
const bingoGrid = document.getElementById('bingoGrid');

// Заполняем недостающие элементы
const itemsToShow = [...bingoItems];
while (itemsToShow.length < 25) {
    itemsToShow.push(`Ячейка ${itemsToShow.length + 1}`);
}

// Создаем ячейки с текстом
for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.className = 'bingo-cell';
    cell.textContent = itemsToShow[i];
    bingoGrid.appendChild(cell);
}
