// ===================================================
// Чего смотрим?
// ===================================================

const bingoItems = [
    "Хорхе-Бера",
    "Не справились с 1.23e-456", 
    "DW в ARIMA",
    "Меньше 10 наблюдений на регрессор",
    "Гетероскедастность",
    
    "HEGY сказал, что нет сезонности",
    "Это питон так посчитал", 
    "Обучили модель",
    "Скриншот кода",
    "Статистический прогноз",
    
    "Время выполнения в ночь перед сдачей",
    "Льюнга-Бокса", 
    "Не знаю, слайд не я делал",
    "ADF нашёл сезонность",
    "Сравнили по R2",
    
    "Все дамми и константа",
    "Кодировки вместо имён", 
    "Наджипитишили",
    "Грейнджер нашёл причину",
    "Потеряли структурный сдвиг",
    
    "Критерий Аика",
    "Графики без подписей", 
    "Нигде не было данных",
    "Не поправили на инфляцию",
    "Нечитаемый график"
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
// ПРОСТОЕ СОЗДАНИЕ ЯЧЕЕК (БЕЗ ПОДГОНКИ!)
// =============================================

const bingoGrid = document.getElementById('bingoGrid');

// Заполняем недостающие элементы
const itemsToShow = [...bingoItems];
while (itemsToShow.length < 25) {
    itemsToShow.push(`Ячейка ${itemsToShow.length + 1}`);
}

// Просто создаем ячейки с текстом
for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.className = 'bingo-cell';
    cell.textContent = itemsToShow[i];
    bingoGrid.appendChild(cell);
}
