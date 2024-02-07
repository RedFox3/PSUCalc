document.addEventListener('DOMContentLoaded', function () {
    // Инициализация элементов формы
    const cpuSelect = document.getElementById('cpu');
    const gpuSelect = document.getElementById('gpu');
    //const ramInput = document.getElementById('ram');
    const storageInput = document.getElementById('storage');
    const resultDiv = document.getElementById('result');

    // Загрузка доступных компонентов в select элементы
    function loadComponentData() {
        // Загрузка процессоров
        firebase.firestore().collection('CPU').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                let option = document.createElement('option');
                option.value = doc.data().power_consumption;
                option.textContent = doc.data().manufacturer + " " + doc.data().model;
                cpuSelect.appendChild(option);
            });
        });

        // Загрузка видеокарт
        firebase.firestore().collection('GPU').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                let option = document.createElement('option');
                option.value = doc.data().power_consumption;
                option.textContent = doc.data().manufacturer + " " + doc.data().model;
                gpuSelect.appendChild(option);
            });
        });
    }


    function updateTime() {
        const now = new Date(); // Получаем текущее время
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateTime, 1000); // Обновляем время каждую секунду
    updateTime(); // Инициализируем отображение времени при загрузке страницы

    // // Функция для расчета мощности БП
    // function calculatePower() {
    //     // Предполагаемые значения потребления мощности для компонентов (в ваттах)
    //     const BASE_POWER = 150; // Базовая мощность для системы без компонентов
    //     const CPU_POWER_PER_CORE = 15; // Потребление на ядро процессора
    //     const GPU_POWER = 200; // Потребление видеокарты
    //     const RAM_POWER_PER_STICK = 5; // Потребление на планку RAM
    //     const DISK_POWER = 10; // Потребление на диск
    //     const COOLING_FAN_POWER = 5; // Потребление на вентилятор

    //     // Получаем значения из формы
    //     let cpuCores = parseInt(document.getElementById('cpu-model').value) || 0;
    //     let gpuCount = parseInt(document.getElementById('gpu-quantity').value) || 0;
    //     let ramSticks = parseInt(document.getElementById('ram').value) || 0;
    //     let diskCount = parseInt(document.getElementById('sata').value) + parseInt(document.getElementById('pata').value) + parseInt(document.getElementById('m2-ssd').value);
    //     let coolingFans = parseInt(document.getElementById('cooling-fans').value) || 0;

    //     // Расчет общей мощности
    //     let totalPower = BASE_POWER +
    //                      (CPU_POWER_PER_CORE * cpuCores) +
    //                      (GPU_POWER * gpuCount) +
    //                      (RAM_POWER_PER_STICK * ramSticks) +
    //                      (DISK_POWER * diskCount) +
    //                      (COOLING_FAN_POWER * coolingFans);

    //     // Добавляем 20% к общей мощности для обеспечения запаса
    //     totalPower *= 1.20;

    //     // Вывод результата
    //     document.getElementById('result').textContent = 'Рекомендуемая мощность блока питания: ' + Math.ceil(totalPower) + ' Вт.';
    // }

    // // Обработчик отправки формы
    // document.getElementById('power-supply-calculator').addEventListener('submit', function (e) {
    //     e.preventDefault(); // Предотвращаем стандартную отправку формы
    //     calculatePower();   // Вызываем функцию расчета мощности
    // });

    // Функция для расчета мощности
    function calculatePower() {
        let totalPower = 0;

        const cpu = parseInt(cpuSelect.value);
        const gpu = parseInt(gpuSelect.value);

        if (cpu == -1 || gpu == -1) {
            document.getElementById('error-message').style.display = 'block';
        } else {
            document.getElementById('error-message').style.display = 'none';

            totalPower += cpu;
            totalPower += gpu;
            //totalPower += parseInt(ramInput.value) * 2; // Примерное потребление памяти за модуль
            totalPower += parseInt(storageInput.value) * 5; // Примерное потребление за устройство хранения

            // Добавляем 20% к общей мощности для обеспечения запаса
            totalPower *= 1.20;
            totalPower = Math.round(totalPower);

            // // Отображаем результат
            // resultDiv.textContent = `Рекомендуемая мощность БП: ${totalPower} Вт`;
            window.open("store.html?totalPower=" + totalPower);
        }
    }

    // Обработчик отправки формы
    document.getElementById('power-supply-calculator').addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвратить стандартную отправку формы
        calculatePower();
    });

    // Вызов функции загрузки данных при загрузке страницы
    loadComponentData();
});
