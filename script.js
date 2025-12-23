// ===================================================
// Чего смотрим?
// ===================================================

const bingoItems = [
    "Не нашли автокорреляцию",
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

// =============================================
// ФУНКЦИЯ АВТОПОДГОНКИ ТЕКСТА
// =============================================

function fitTextToCell(cell, text) {
    // Устанавливаем текст
    cell.textContent = text;
    
    // Получаем размеры ячейки
    const cellWidth = cell.clientWidth;
    const cellHeight = cell.clientHeight;
    const padding = 10; // padding с двух сторон
    
    // Доступная площадь для текста
    const availableWidth = cellWidth - padding;
    const availableHeight = cellHeight - padding;
    
    // Начинаем с максимального размера
    let fontSize = 20;
    cell.style.fontSize = fontSize + 'px';
    
    // Уменьшаем шрифт пока текст не поместится
    while (fontSize > 8) {
        const textWidth = cell.scrollWidth;
        const textHeight = cell.scrollHeight;
        
        if (textWidth <= availableWidth && textHeight <= availableHeight) {
            break; // Текст поместился
        }
        
        // Уменьшаем шрифт
        fontSize -= 1;
        cell.style.fontSize = fontSize + 'px';
    }
}

// =============================================
// СОЗДАНИЕ БИНГО-СЕТКИ
// =============================================

const bingoGrid = document.getElementById('bingoGrid');

// Заполняем недостающие элементы
const itemsToShow = [...bingoItems];
while (itemsToShow.length < 25) {
    itemsToShow.push(`Ячейка ${itemsToShow.length + 1}`);
}

// Создаем ячейки и сразу показываем текст
for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.className = 'bingo-cell';
    
    // Сразу показываем текст из массива
    cell.textContent = itemsToShow[i];
    
    // Подгоняем размер текста
    fitTextToCell(cell, itemsToShow[i]);
    
    bingoGrid.appendChild(cell);
}

// =============================================
// ПОДГОНКА ПРИ ИЗМЕНЕНИИ РАЗМЕРА ОКНА
// =============================================

function adjustAllCells() {
    const cells = document.querySelectorAll('.bingo-cell');
    cells.forEach((cell, index) => {
        if (index < itemsToShow.length) {
            fitTextToCell(cell, itemsToShow[index]);
        }
    });
}

// Пересчитываем при изменении размера окна
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(adjustAllCells, 250);
});

// Инициализация при полной загрузке страницы
window.addEventListener('load', adjustAllCells);
