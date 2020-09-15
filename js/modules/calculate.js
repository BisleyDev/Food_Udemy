function calc() {
	// _______ calc

	const result = document.querySelector('.calculating__result span');
	let sex, weight, height, age, ratio;

	function initLocalSettings() {
		document.querySelectorAll('.calculating__choose-item').forEach(elem => {
			elem.classList.remove('calculating__choose-item_active');
		});
		sex = (localStorage.getItem('sex')) ? localStorage.getItem('sex') : 'female';
		ratio = (localStorage.getItem('ratio')) ? localStorage.getItem('ratio') : '1.375';
		document.querySelector(`#${sex}`).classList.add('calculating__choose-item_active');
		document.querySelectorAll('.calculating__choose_big div').forEach(elem => {
			if (elem.dataset.ratio == ratio) {
				elem.classList.add('calculating__choose-item_active');
			}
		});
	}
	initLocalSettings();

	function totalResult(sex, ratio) {
		if (!sex || !weight || !height || !age || !ratio) {
			result.textContent = '____';
			return;
		}
		if (sex === 'male') {
			result.textContent = Math.floor((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		} else {
			result.textContent = Math.floor((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		}
	}
	totalResult(sex, ratio);

	function staticInfoUser(parrentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parrentSelector} div`);
		elements.forEach(elem => {
			elem.addEventListener('click', event => {
				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});

				if (event.target.getAttribute('data-ratio')) {
					ratio = +event.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', ratio);
				} else {
					sex = event.target.getAttribute('id');
					localStorage.setItem('sex', sex);

				}
				event.target.classList.add(activeClass);
				totalResult(sex, ratio);
			});
		});
	}
	staticInfoUser('.calculating__choose_big', 'calculating__choose-item_active');
	staticInfoUser('#gender', 'calculating__choose-item_active');

	function dinamicInfoUser() {
		const inputs = document.querySelectorAll('.calculating__choose_medium input');
		inputs.forEach(input => {
			input.addEventListener('input', () => {
				if (input.value.match(/\D/ig)) {
					input.style.border = "2px solid red";
				} else {
					input.style.border = "none";
				}
				switch (input.id) {
					case 'weight':
						weight = +input.value;
						break;
					case 'height':
						height = +input.value;
						break;
					case 'age':
						age = +input.value;
						break;
				}
				totalResult(sex, ratio);
			});
		});
	}
	dinamicInfoUser();

}

export default calc;