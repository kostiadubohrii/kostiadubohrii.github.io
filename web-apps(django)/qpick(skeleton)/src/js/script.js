'use strict';

function addInBasket() {
    const basketItemCouner = document.querySelector('.basket-items-counter'),
          favItemCounter = document.querySelector('.fav-items-counter'),
          basketBtn = document.querySelector('#add-item-basket'),
          favBtn = document.querySelector('#add-item-fav');

    const favObj = {
        amount: 2,
        adited: false,
        src: 'icons/hearts/',
    }; 
    const basketObj = {
        amount: 0,
        adited: false,
    };

    function processData(btn, obj, counter ) {
        if ( obj.amount > 0 ) {
            counter.innerHTML = obj.amount;
            counter.style.display = 'flex';
        }else{
            counter.style.display = 'none';
        }
    
        if ( obj.adited === true ){
            btn.src = `${obj.src}solid_heart.svg`;
        } else{
            btn.src = `${obj.src}empty_heart.svg`;
        } 
    }

    function clickBtn(btn, obj) {
        if ( obj.adited === false ) {
            obj.amount += 1;
            obj.adited = true;

            btn.src = `${obj.src}solid_heart.svg`;
        }else {
            obj.amount -= 1;
            obj.adited = false;

            btn.src = `${obj.src}empty_heart.svg`;
        }
    }

    processData(favBtn, favObj, favItemCounter)
    processData(basketBtn, basketObj, basketItemCouner)

    favBtn.addEventListener('click', () => {
        clickBtn(favBtn, favObj)
        processData(favBtn, favObj, favItemCounter)
    });
    
    basketBtn.addEventListener('click', () => {
        clickBtn(basketBtn, basketObj)
        processData(basketBtn, basketObj, basketItemCouner)
    });
}

addInBasket();