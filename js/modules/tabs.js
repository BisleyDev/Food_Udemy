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

export default tabs;