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


function fitTextToCell(cell, text) {
    // Сохраняем оригинальный текст
    cell.textContent = text;
    
    // Сбрасываем стили
    cell.style.fontSize = '';
    cell.style.lineHeight = '';
    
    // Получаем размеры ячейки
    const cellWidth = cell.clientWidth;
    const cellHeight = cell.clientHeight;
    const padding = 10;
    
    // Определяем базовый размер шрифта в зависимости от экрана
    const isMobile = window.innerWidth <= 768;
    let baseFontSize = isMobile ? 12 : 16; // Больше на компьютере
    
    // Устанавливаем начальный размер
    cell.style.fontSize = baseFontSize + 'px';
    cell.style.lineHeight = '1.2';
    
    // Проверяем, помещается ли текст
    let fontSize = baseFontSize;
    let fits = false;
    
    // Пробуем уменьшать только если не помещается
    while (fontSize > 8 && !fits) {
        const textWidth = cell.scrollWidth;
        const textHeight = cell.scrollHeight;
        
        // Проверяем с запасом
        const widthFits = textWidth <= (cellWidth - padding);
        const heightFits = textHeight <= (cellHeight - padding);
        
        if (widthFits && heightFits) {
            fits = true;
            break;
        }
        
        // Уменьшаем шрифт небольшими шагами
        fontSize -= 0.5;
        cell.style.fontSize = fontSize + 'px';
    }
    
    // Если текст слишком длинный, разрешаем горизонтальный скролл
    if (!fits && fontSize <= 8) {
        cell.style.overflowX = 'auto';
        cell.style.whiteSpace = 'nowrap';
        cell.style.fontSize = '12px';
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

// Создаем ячейки
for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.className = 'bingo-cell';
    
    // Сразу показываем текст
    cell.textContent = itemsToShow[i];
    
    bingoGrid.appendChild(cell);
}

// =============================================
// ПОДГОНКА ПРИ ИЗМЕНЕНИИ РАЗМЕРА ОКНА
// =============================================

function adjustAllCells() {
    const cells = document.querySelectorAll('.bingo-cell');
    cells.forEach((cell, index) => {
        if (index < itemsToShow.length) {
            // Даем время на перерисовку
            setTimeout(() => {
                fitTextToCell(cell, itemsToShow[index]);
            }, 50);
        }
    });
}

// Первая настройка после загрузки
window.addEventListener('load', () => {
    setTimeout(adjustAllCells, 100);
});

// Пересчитываем при изменении размера окна
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(adjustAllCells, 300);
});

// Также подгоняем когда DOM полностью готов
document.addEventListener('DOMContentLoaded', adjustAllCells); 
