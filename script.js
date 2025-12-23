// ===================================================
// Чего смотрим?
// ===================================================

const bingoItems = [
    "Не нашли автокорреляцию ааааа ааааа а аааааа",
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
// ИСПРАВЛЕННАЯ ФУНКЦИЯ ПОДГОНКИ С ПЕРЕНОСАМИ
// =============================================

function fitTextToCell(cell, text) {
    // Устанавливаем текст
    cell.textContent = text;
    
    // ВОССТАНАВЛИВАЕМ СВОЙСТВА ПЕРЕНОСА
    cell.style.whiteSpace = 'normal';
    cell.style.wordWrap = 'break-word';
    cell.style.overflowWrap = 'break-word';
    cell.style.wordBreak = 'break-word';
    
    // Определяем устройство
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Для телефона начинаем с меньшего размера
        adjustFontSize(cell, 12, 8);
    } else {
        // Для компьютера начинаем с нормального размера
        adjustFontSize(cell, 16, 10);
    }
}

// Вспомогательная функция для подгонки
function adjustFontSize(cell, startSize, minSize) {
    let fontSize = startSize;
    let fits = false;
    
    // Пробуем разные размеры
    while (fontSize >= minSize && !fits) {
        cell.style.fontSize = fontSize + 'px';
        
        // Ждем перерисовки
        void cell.offsetHeight;
        
        // Проверяем, помещается ли текст
        const contentHeight = cell.scrollHeight;
        const containerHeight = cell.clientHeight;
        const contentWidth = cell.scrollWidth;
        const containerWidth = cell.clientWidth;
        
        // Учитываем padding
        const padding = parseInt(window.getComputedStyle(cell).padding) * 2;
        
        if (contentHeight <= (containerHeight - padding) && 
            contentWidth <= (containerWidth - padding)) {
            fits = true;
            break;
        }
        
        fontSize -= 1;
    }
    
    // Если не поместилось даже с минимальным размером
    if (!fits) {
        cell.style.fontSize = minSize + 'px';
        cell.style.overflowY = 'auto'; // Добавляем скролл если нужно
    }
}

// =============================================
// СОЗДАНИЕ СЕТКИ
// =============================================

const bingoGrid = document.getElementById('bingoGrid');
const itemsToShow = [...bingoItems];
while (itemsToShow.length < 25) {
    itemsToShow.push(`Ячейка ${itemsToShow.length + 1}`);
}

// Создаем ячейки
for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.className = 'bingo-cell';
    cell.textContent = itemsToShow[i];
    bingoGrid.appendChild(cell);
}

// =============================================
// ОБРАБОТЧИКИ ИЗМЕНЕНИЯ РАЗМЕРА
// =============================================

function adjustAllCells() {
    const cells = document.querySelectorAll('.bingo-cell');
    cells.forEach((cell, index) => {
        if (index < itemsToShow.length) {
            fitTextToCell(cell, itemsToShow[index]);
        }
    });
}

// Ждем полной загрузки
window.addEventListener('load', () => {
    setTimeout(adjustAllCells, 100);
});

// При изменении размера окна
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(adjustAllCells, 250);
});
