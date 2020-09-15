function timer(deadline, timerSelector) {
   // Timer

	function getTimeRemaining(endtime) {
		const total = Date.parse(endtime) - Date.now(),
				days = Math.floor(total / (1000 * 60 * 60 * 24)),
				hours = Math.floor((total / (1000 * 60 * 60)) % 24),
				minutes = Math.floor((total / (1000 * 60)) % 60),
				seconds = Math.floor((total / 1000) % 60);

		return {
			total,
			days,
			hours,
			minutes,
			seconds
		};
	}

	function setClock(selector) {
		const timer = document.querySelector(selector),
				days = timer.querySelector('#days'),
				hours = timer.querySelector('#hours'),
				minutes = timer.querySelector('#minutes'),
				seconds = timer.querySelector('#seconds'),
				startTimer = setInterval(updateClock, 1000); 

		function updateClock() {	
			const time = getTimeRemaining(deadline);
		
			if (time.total >= 0 ) {
				days.innerHTML = setZero(time.days);
				hours.innerHTML = setZero(time.hours);
				minutes.innerHTML = setZero(time.minutes);
				seconds.innerHTML = setZero(time.seconds);
			} else {
				clearInterval(startTimer);
			}
		}
		updateClock(); // первый вызов
	}
	setClock(timerSelector);
	
	function setZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function createDateSale() {
		const months = {
			0: 'января',
			1: 'февраля',
			2: 'марта',
			3: 'апреля',
			4: 'мая',
			5: 'июня',
			6: 'июля',
			7: 'августа',
			8: 'сентября',
			9: 'октября',
			10: 'ноября',
			11: 'декабря'
		};
	
		const date = new Date(deadline),
				month = setZero(months[date.getMonth()]),
				day = setZero(date.getDate()),
				hours = setZero(date.getHours()),
				minutes = setZero(date.getMinutes());
		
		const text = `<span>Акция закончится ${day} ${month} в ${hours}:${minutes}</span>`;
		
		document.querySelector('.promotion__descr').insertAdjacentHTML('beforeend', text);
	}
	createDateSale();
}

export default timer;