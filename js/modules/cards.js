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

export default cards;