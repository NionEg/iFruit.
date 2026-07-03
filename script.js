document.addEventListener("DOMContentLoaded", () => {
    // 1. Обновление системного времени (в реальном времени)
    function updateClock() {
        const clockEl = document.getElementById("clock");
        if (!clockEl) return;
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        clockEl.textContent = `${hours}:${minutes}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 2. Симуляция разряда батареи ровно за 20 минут
    const TOTAL_MINUTES = 20;
    const DISCHARGE_PER_SEC = 100 / (TOTAL_MINUTES * 60);
    
    let battery = localStorage.getItem("ifruit_battery") 
        ? parseFloat(localStorage.getItem("ifruit_battery")) 
        : 100;

    function updateBattery() {
        battery -= DISCHARGE_PER_SEC;
        if (battery <= 0) battery = 100; // Автоматическая перезарядка
        localStorage.setItem("ifruit_battery", battery);
        
        const levelEl = document.getElementById("batteryLevel");
        if (levelEl) {
            levelEl.style.width = `${Math.floor(battery)}%`;
        }
    }
    setInterval(updateBattery, 1000);
    updateBattery();
});



