// НАСТОЯЩЕЕ ВРЕМЯ И НЕПРЕРЫВНЫЙ РАЗРЯД БАТАРЕИ
function updateSystemBar() {
    // 1. Получение реального времени устройства
    const now = new Date();
    let hh = now.getHours();
    let mm = now.getMinutes();
    hh = hh < 10 ? '0' + hh : hh;
    mm = mm < 10 ? '0' + mm : mm;

    document.querySelectorAll('.status-time').forEach(el => {
        el.textContent = `${hh}:${mm}`;
    });

    // 2. Получение и плавный разряд батареи через хранилище localStorage
    let storedBattery = localStorage.getItem('globalBattery');
    let currentBattery = storedBattery ? parseFloat(storedBattery) : 100.0;

    currentBattery -= 0.005; // Скорость разряда
    if (currentBattery < 0) currentBattery = 0;
    
    localStorage.setItem('globalBattery', currentBattery);

    document.querySelectorAll('.battery-level').forEach(level => {
        level.style.width = `${Math.floor(currentBattery)}%`;
        if (currentBattery <= 20) {
            level.style.setProperty('background-color', '#ff3b30', 'important');
        } else if (currentBattery <= 50) {
            level.style.setProperty('background-color', '#ffcc00', 'important');
        } else {
            level.style.removeProperty('background-color');
        }
    });
}

// Запуск таймера
setInterval(updateSystemBar, 1000);
updateSystemBar();

// Функция инициализации звонка
function startCall(name, img) {
    localStorage.setItem('callName', name);
    localStorage.setItem('callImg', img);
    location.href = 'calling.html';
}

// Управление балансом FruitPay
let balance = parseInt(localStorage.getItem('fruitpay_balance')) || 250;
const balanceEl = document.getElementById('fruitpay-balance-value');
if (balanceEl) balanceEl.textContent = balance;

function handleDeposit() {
    balance += 50;
    localStorage.setItem('fruitpay_balance', balance);
    if (balanceEl) balanceEl.textContent = balance;
}