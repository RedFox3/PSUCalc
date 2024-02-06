document.addEventListener('DOMContentLoaded', function () {

    // Функция для расчета мощности БП
    function calculatePower() {
        // Предполагаемые значения потребления мощности для компонентов (в ваттах)
        const BASE_POWER = 150; // Базовая мощность для системы без компонентов
        const CPU_POWER_PER_CORE = 15; // Потребление на ядро процессора
        const GPU_POWER = 200; // Потребление видеокарты
        const RAM_POWER_PER_STICK = 5; // Потребление на планку RAM
        const DISK_POWER = 10; // Потребление на диск
        const COOLING_FAN_POWER = 5; // Потребление на вентилятор

        // Получаем значения из формы
        let cpuCores = parseInt(document.getElementById('cpu-model').value) || 0;
        let gpuCount = parseInt(document.getElementById('gpu-quantity').value) || 0;
        let ramSticks = parseInt(document.getElementById('ram').value) || 0;
        let diskCount = parseInt(document.getElementById('sata').value) + parseInt(document.getElementById('pata').value) + parseInt(document.getElementById('m2-ssd').value);
        let coolingFans = parseInt(document.getElementById('cooling-fans').value) || 0;

        // Расчет общей мощности
        let totalPower = BASE_POWER +
                         (CPU_POWER_PER_CORE * cpuCores) +
                         (GPU_POWER * gpuCount) +
                         (RAM_POWER_PER_STICK * ramSticks) +
                         (DISK_POWER * diskCount) +
                         (COOLING_FAN_POWER * coolingFans);

        // Добавляем 20% к общей мощности для обеспечения запаса
        totalPower *= 1.20;

        // Вывод результата
        document.getElementById('result').textContent = 'Рекомендуемая мощность блока питания: ' + Math.ceil(totalPower) + ' Вт.';
    }

    // Обработчик отправки формы
    document.getElementById('power-supply-calculator').addEventListener('submit', function (e) {
        e.preventDefault(); // Предотвращаем стандартную отправку формы
        calculatePower();   // Вызываем функцию расчета мощности
    });

});
