document.addEventListener('DOMContentLoaded', function () {

	const urlParams = new URLSearchParams(window.location.search);
	const totalPower = urlParams.get('totalPower');
	document.getElementById('result').textContent = `Рекомендуемая мощность БП: ${totalPower} Вт`;

	const straight = 750
	const pure = 500
	const sfx = 300

	function choosePSU() {
		if (totalPower < sfx) {
			document.getElementById('best-sfx').style.display = 'block';
		} else if (totalPower < pure) {
			document.getElementById('best-pure').style.display = 'block';
		} else {
			document.getElementById('best-straight').style.display = 'block';
		}
	}

	choosePSU();

	// Получаем элементы
	var modal = document.getElementById("orderModal");
	var btn = document.getElementById("openModalBtn");
	var span = document.getElementsByClassName("closeBtn")[0];

	// Открываем модальное окно при клике на кнопку
	btn.onclick = function() {
    	modal.style.display = "block";
	}

	// Закрываем модальное окно при клике на символ "X"
	span.onclick = function() {
    	modal.style.display = "none";
	}

	// Закрываем модальное окно при клике вне его области
	window.onclick = function(event) {
    	if (event.target == modal) {
        	modal.style.display = "none";
    	}
	}


});
