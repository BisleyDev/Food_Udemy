import {openModalWindow, closeModal} from './modal';
import postData from '../services/services';

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
		openModalWindow('.modal');

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
			closeModal('.modal');
		}, 4000);
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
}

export default form;



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

