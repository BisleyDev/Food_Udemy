'use scrict';

window.addEventListener('DOMContentLoaded', () => {
	// Tabs

	const tabsParent = document.querySelector('.tabheader__items'),
			tabs = tabsParent.querySelectorAll('.tabheader__item'),
			tabsContent = document.querySelectorAll('.tabcontent');

	function hiddenTabs() {
		tabsContent.forEach((item) => {
			item.classList.add('hide');         
		});
		tabs.forEach((item) => {
			item.classList.remove('tabheader__item_active');         
		});
	}

	function showTabContent(i = 0) {
		let content = tabsContent[i];
		content.classList.add('show');         
		content.classList.add('fade');         
		content.classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	function searchTab(event) {
		let target = event.target;
		tabs.forEach((item, i) => {
			if (target == item) {
				hiddenTabs();
				showTabContent(i);
			}
		});
	}

	hiddenTabs();
	showTabContent();
	tabsParent.addEventListener('click', searchTab);

	// Timer
	const deadline = '2020-10-10T12:00';

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
	setClock('.timer');
	
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

	// Trigger
	const btnsTrigger = document.querySelectorAll('[data-modal]'),
			modalWindow = document.querySelector('.modal');

	function openModalWindow() {
		modalWindow.style.display = 'block';
		document.body.style.overflow = 'hidden';

		modalWindow.addEventListener( 'click', closeModalWindow);
		document.addEventListener( 'keydown', closeModalWindow);
		clearInterval(modalTimerId);
	}

	function closeModal() {
		modalWindow.style.display = 'none';
		document.body.style.overflow = '';
		window.removeEventListener('scroll', followScrollForModal);
	}

	function closeModalWindow(event) {
		if (event.target.getAttribute('data-close') == '' || event.target === modalWindow || event.code == 'Escape') {
			closeModal();
		}
	}

	function followScrollForModal() {
		const maxHeight = document.documentElement.scrollHeight,
				downPage = document.documentElement.scrollTop + document.documentElement.clientHeight;
		if (maxHeight <= downPage) {
			openModalWindow();
			clearInterval(modalTimerId);
			window.removeEventListener('scroll', followScrollForModal);
		}
	}

	function appModalWindow() {
		btnsTrigger.forEach(btn => {
			btn.addEventListener( 'click', () => {
				openModalWindow();
				clearInterval(modalTimerId);
			});
		});
	}

	appModalWindow();
	const modalTimerId = setTimeout(openModalWindow, 50000);
	window.addEventListener('scroll', followScrollForModal);

	// Использование классов для карточек

	class MenuCardInDay {
		constructor(src, alt, title, description, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.description = description;
			this.price = price;
			this.parentSelector = document.querySelector(parentSelector);
			this.classes = classes;
			this.transfer = 27;
			this.renderCard();
		}

		renderCard() {
			this.price = this.price * this.transfer;

			const card = document.createElement('div');
			if ( this.classes.length === 0 ) {
				card.classList.add("menu__item");
			} else {
				this.classes.forEach(className => card.classList.add(className));
			}
			card.innerHTML = `
					<img src=${this.src} alt=${this.alt}>
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.description}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						 <div class="menu__item-cost">Цена:</div>
						 <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
					</div>`;
			this.parentSelector.insertAdjacentElement('afterbegin', card);
		}
	}

	// ______________Get information with card

	axios.get('http://localhost:3000/menu')
		.then(elem => {elem.data.forEach(({img, altimg, title, descr, price}) => {
			new MenuCardInDay( img, altimg, title, descr, price,'.menu__field .container' );
		})});

	// const getResource = async (url) => {
	// 	const res = await fetch(url);

	// 	if(!res.ok) {
	// 		throw new Error(`Could not fetch ${url}, status: ${res.status}`)
	// 	}
	// 	return await res.json();
	// };

	// getResource('http://localhost:3000/menu')
	// .then( data => data.forEach(({img, altimg, title, descr, price,}) => {
	// 	new MenuCardInDay( img, altimg, title, descr, price,'.menu__field .container');
	// }));


	//____________ Send form

	const forms = document.querySelectorAll('form');
	const statusMessage = {
		loading: './Images/spinner.svg',
		success: 'Успешно, скоро мы с вами свяжемся.',
		failure: 'Что-то пошло не так, повторите действие.'
	};

	const messageLoading = (form) => {
		const messageLoad = document.createElement('img');
		messageLoad.src = statusMessage.loading;
		messageLoad.style.cssText = `
			display: block;
			margin: 0 auto;
		`;
		form.insertAdjacentElement('afterend', messageLoad);
		setTimeout(() => {
			messageLoad.remove();
		}, 4000);
	};

	const showThanksModal = massege => {
		document.querySelector('.modal__dialog').classList.add('hide');
		openModalWindow();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>&times;</div>
				<div class="modal__title">${massege}</div>
			</div>
		`;
		document.querySelector('.modal').append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();

			document.querySelector('.modal__dialog').classList.add('show');
			document.querySelector('.modal__dialog').classList.remove('hide');
			closeModal();
		}, 4000);
	};

	const postData = async (url, data) => {
		const response = await fetch(url, {
			method: 'POST',
			body: data,
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return await response.json();
	};

	forms.forEach((form) => {
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			messageLoading(form);
			const formData = new FormData(form);
			const data = JSON.stringify(Object.fromEntries(formData.entries()));
			console.log('data: ', data);

			postData('http://localhost:3000/requests', data)
			.then((data) => {
				console.log(data);
				showThanksModal(statusMessage.success);
			})
			.catch(() => showThanksModal(statusMessage.failure))
			.finally(() => form.reset());
		});
	});

	//___________ Slider #1

	const slider = document.querySelector('.offer__slider');
	const offerSlide = document.querySelector('.offer__slide');
	const offerSliderPrev = document.querySelector('.offer__slider-prev');
	const offerSliderNext = document.querySelector('.offer__slider-next');
	const current = document.querySelector('#current');
	const total = document.querySelector('#total');

	const dataImg = ['img/slider/food-12.jpg', 
							'img/slider/olive-oil.jpg', 
							'img/slider/paprika.jpg', 
							'img/slider/pepper.jpg'];
	
	let numberImg = 0;

	function defaultStart() {
		current.textContent = checkZeroInNumber(numberImg + 1);
		total.textContent = checkZeroInNumber(dataImg.length);
		renderImg(numberImg);
		createSliderIndicator();
	}		

	function checkZeroInNumber(number) {
		return  number < 10 ? '0' + number : number;
	}

	function renderImg(index) {
		offerSlide.textContent = '';
		const newImg = document.createElement('img');
		newImg.src = dataImg[index];
		newImg.alt = (dataImg[index].replace('img/slider/', '')).replace('.jpg', '');
		// offerSlide.insertAdjacentElement('afterbegin', newImg);
		offerSlide.append(newImg);
	}

	// const clickNextImg = () => {
	// 	current.textContent = '';
	// 	(dataImg.length === numberImg + 1) ? numberImg = 0 : numberImg += 1 ;
	// 	renderImg(numberImg);
	// 	current.textContent = checkZeroInNumber(numberImg + 1);
	// };
	// const clickPrevImg = () => {
	// 	current.textContent = '';
	// 	(numberImg === 0) ? numberImg = dataImg.length - 1 : numberImg -= 1 ;
	// 	renderImg(numberImg);
	// 	current.textContent = checkZeroInNumber(numberImg + 1);
	// };

	function clickChangeSlider(event) {
		current.textContent = '';
		if(event.target.closest('.offer__slider-next') == offerSliderNext) {
			(dataImg.length === numberImg + 1) ? numberImg = 0 : numberImg += 1 ;
		} else {
			(numberImg === 0) ? numberImg = dataImg.length - 1 : numberImg -= 1 ;
		}
		renderImg(numberImg);
		current.textContent = checkZeroInNumber(numberImg + 1);		
		createSliderIndicator();
	}


	defaultStart();
	offerSliderNext.addEventListener('click', clickChangeSlider);
	offerSliderPrev.addEventListener('click', clickChangeSlider);


	//____ carusel indicator


	function createSliderIndicator() {
		if(document.querySelector('.carousel-indicators')) {
			document.querySelector('.carousel-indicators').remove();
		}
		slider.style.position = 'relative';
		const carouselIndicators = document.createElement('ol');
		carouselIndicators.classList.add('carousel-indicators');		
		slider.append(carouselIndicators);

		for( let i = 0 ; i < dataImg.length; i++ ) {
			let dotIndicator = document.createElement('li');
			dotIndicator.classList.add('dot');
			dotIndicator.setAttribute('data-slider', i);
			carouselIndicators.append(dotIndicator);

			dotIndicator.addEventListener('click', () => {
				document.querySelectorAll('.dot').forEach(elem => elem.style.opacity = '0.5');
				renderImg(i);
				current.textContent = checkZeroInNumber(i + 1);
				dotIndicator.style.opacity = '1';

			});
			
			if(dotIndicator.dataset.slider == numberImg) {
				dotIndicator.style.opacity = '1';
			}
		}
	}

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
			if(elem.dataset.ratio == ratio) {
				elem.classList.add('calculating__choose-item_active');
			}
		});
	}
	initLocalSettings();

	function totalResult(sex, ratio) {
		if(!sex || !weight || !height || !age || !ratio) {
			result.textContent = '____';
			return;
		}
		if(sex === 'male') {
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

				if(event.target.getAttribute('data-ratio')) {
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
		inputs.forEach( input => {
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




	

	// function createMessageLoad(form) {
	// 	const messageLoad = document.createElement('img');
	// 	messageLoad.src = statusMessage.loading;
	// 	messageLoad.style.cssText = `
	// 		display: block;
	// 		margin: 0 auto;
	// 	`;
	// 	form.insertAdjacentElement('afterend', messageLoad);
	// 	setTimeout(() => {
	// 		messageLoad.remove();
	// 	}, 4000);
	// }

	// forms.forEach((form) => {
	// 	form.addEventListener('submit', (event) => {

	// 		event.preventDefault();
	// 		createMessageLoad(form);
		

	// 		const request = new XMLHttpRequest();
	// 		request.open('POST', 'server.php');
	// 		request.setRequestHeader('Content-type', 'application/json');
	// 		const formData = new FormData(form);
	// 		const objectFormData = {};

	// 		formData.forEach((value, key) => {					
	// 			objectFormData[key] = value;					
	// 		});

	// 		request.send(JSON.stringify(objectFormData));

	// 		request.addEventListener('load', () => {
	// 			if (request.status === 200) {
	// 				console.log(request.response);
	// 				showThanksModal(statusMessage.success);
	// 				form.reset();

	// 			} else {
	// 				showThanksModal(statusMessage.failure);
	// 			}
	// 		});
	// 	});
	// });

	// function showThanksModal(massege) {
	// 	document.querySelector('.modal__dialog').classList.add('hide');
	// 	openModalWindow();

	// 	const thanksModal = document.createElement('div');
	// 	thanksModal.classList.add('modal__dialog');
	// 	thanksModal.innerHTML = `
	// 		<div class="modal__content">
	// 			<div class="modal__close" data-close>&times;</div>
	// 			<div class="modal__title">${massege}</div>
	// 		</div>
	// 	`;
	// 	document.querySelector('.modal').append(thanksModal);

	// 	setTimeout(() => {
	// 		thanksModal.remove();

	// 		document.querySelector('.modal__dialog').classList.add('show');
	// 		document.querySelector('.modal__dialog').classList.remove('hide');
	// 		closeModal();
	// 	}, 4000);
	// }

});



