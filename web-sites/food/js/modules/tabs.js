function tabs(tabsselector, tabsContentSelector, tabsParentSelector, activeClass){
    
    const tabs = document.querySelectorAll(tabsselector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsPerent = document.querySelector(tabsParentSelector);

    
    function hideTabContent(){
        tabsContent.forEach(item =>{
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

	tabsPerent.addEventListener('click', function(event) {
		const target = event.target;
        
		if(target && target.classList.contains(tabsselector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
	});

}


export default tabs;