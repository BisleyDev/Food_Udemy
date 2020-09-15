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

export default slider;