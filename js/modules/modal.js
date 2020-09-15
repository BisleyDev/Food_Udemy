

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

export default modal;
export {openModalWindow};
export {closeModal};