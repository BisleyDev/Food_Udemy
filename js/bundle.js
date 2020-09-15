/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calculate.js":
/*!*********************************!*\
  !*** ./js/modules/calculate.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function cards() {
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
			if (this.classes.length === 0) {
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
		.then(elem => {
			elem.data.forEach(({
				img,
				altimg,
				title,
				descr,
				price
			}) => {
				new MenuCardInDay(img, altimg, title, descr, price, '.menu__field .container');
			})
		});

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
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector) {
   //____________ Send form

	const forms = document.querySelectorAll(formSelector);
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
		Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModalWindow"])('.modal');

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
			Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal');
		}, 4000);
	};

	forms.forEach((form) => {
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			messageLoading(form);
			const formData = new FormData(form);
			const data = JSON.stringify(Object.fromEntries(formData.entries()));
			console.log('data: ', data);

			Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["default"])('http://localhost:3000/requests', data)
			.then((data) => {
				console.log(data);
				showThanksModal(statusMessage.success);
			})
			.catch(() => showThanksModal(statusMessage.failure))
			.finally(() => form.reset());
		});
	});
}

/* harmony default export */ __webpack_exports__["default"] = (form);



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



/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, openModalWindow, closeModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModalWindow", function() { return openModalWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });


function openModalWindow(modalSelector) {
   const modalWindow = document.querySelector(modalSelector);
   let modalTimerId =false;

   modalWindow.style.display = 'block';
   document.body.style.overflow = 'hidden';

   function closeModalWindow(event) {
      if (event.target.getAttribute('data-close') == '' ||
         event.target === modalWindow ||
         event.code == 'Escape') {
         closeModal(modalSelector);
      }
   }

   modalWindow.addEventListener('click', closeModalWindow);
   document.addEventListener('keydown', closeModalWindow);
   if (modalTimerId) {
      clearInterval(modalTimerId);
   }
}

function closeModal(modalSelector) {
   const modalWindow = document.querySelector(modalSelector);

   modalWindow.style.display = 'none';
   document.body.style.overflow = '';
   // window.removeEventListener('scroll', followScrollForModal);
}

function modal(modalSelector, triggerSlelctor) {
   // Trigger
   const btnsTrigger = document.querySelectorAll(triggerSlelctor);

   function followScrollForModal() {
      const maxHeight = document.documentElement.scrollHeight,
         downPage = document.documentElement.scrollTop + document.documentElement.clientHeight;
      if (maxHeight <= downPage) {
         openModalWindow(modalSelector);
         clearInterval(modalTimerId);
         window.removeEventListener('scroll', followScrollForModal);
      }
   }

   function appModalWindow() {
      btnsTrigger.forEach(btn => {
         btn.addEventListener('click', () => {
            openModalWindow(modalSelector);
            clearInterval(modalTimerId);
         });
      });
   }

   appModalWindow();
   let modalTimerId = setTimeout(() => openModalWindow(modalSelector), 10000);
   window.addEventListener('scroll', followScrollForModal);

}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider({contain, slide, prevSlideBtn, nextSlideBtn, currentValue, totalValue}) {
   //___________ Slider #1

	const slider = document.querySelector(contain);
	const offerSlide = document.querySelector(slide);
	const offerSliderPrev = document.querySelector(prevSlideBtn);
	const offerSliderNext = document.querySelector(nextSlideBtn);
	const current = document.querySelector(currentValue);
	const total = document.querySelector(totalValue);

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
		if(event.target.closest(nextSlideBtn) == offerSliderNext) {
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
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsParentSelector, tabsSelector, tabsContentSelector, classActive) {

	const tabsParent = document.querySelector(tabsParentSelector),
         tabs = tabsParent.querySelectorAll(tabsSelector),
         tabsContent = document.querySelectorAll(tabsContentSelector);

   function hiddenTabs() {
   tabsContent.forEach((item) => {
      item.classList.add('hide');         
   });
   tabs.forEach((item) => {
      item.classList.remove(classActive);         
   });
   }

   function showTabContent(i = 0) {
   let content = tabsContent[i];
   content.classList.add('show');         
   content.classList.add('fade');         
   content.classList.remove('hide');
   tabs[i].classList.add(classActive);
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

}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculate */ "./js/modules/calculate.js");
'use scrict';









window.addEventListener('DOMContentLoaded', () => {
	Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
	Object(_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('2020-10-10T12:00', '.timer');
	Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('.modal', '[data-modal]');
	Object(_modules_cards__WEBPACK_IMPORTED_MODULE_5__["default"])();
	Object(_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])('form');
	Object(_modules_slider__WEBPACK_IMPORTED_MODULE_3__["default"])({
		contain: '.offer__slider',
		slide: '.offer__slide',
		prevSlideBtn: '.offer__slider-prev',
		nextSlideBtn: '.offer__slider-next',
		currentValue: '#current',
		totalValue: '#total'
	});	
	Object(_modules_calculate__WEBPACK_IMPORTED_MODULE_6__["default"])();
});


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


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
   
   /* harmony default export */ __webpack_exports__["default"] = (postData);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map