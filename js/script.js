'use scrict';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import slider from './modules/slider';
import form from './modules/form';
import cards from './modules/cards';
import calculate from './modules/calculate';

window.addEventListener('DOMContentLoaded', () => {
	tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
	timer('2020-10-10T12:00', '.timer');
	modal('.modal', '[data-modal]');
	cards();
	form('form');
	slider({
		contain: '.offer__slider',
		slide: '.offer__slide',
		prevSlideBtn: '.offer__slider-prev',
		nextSlideBtn: '.offer__slider-next',
		currentValue: '#current',
		totalValue: '#total'
	});	
	calculate();
});
