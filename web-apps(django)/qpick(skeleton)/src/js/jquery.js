$(document).ready( function () {
    function itemsCounter() {

        const favObj = {
            amount: 2,
            adited: false,
        }; 
        const basketObj = {
            amount: 1,
            adited: true,
        };

        const solidHertObj = {
            "background-image": "url('../icons/hearts/solid_heart.svg')",
            "background-repeat": 'no-repeat',
            "background-position": 'center',
        }
        const emptyHertObj = {
            "background-image": "url('../icons/hearts/empty_heart.svg')",
            "background-repeat": 'no-repeat',
            "background-position": 'center',
        }

        function processData(btn, obj, counter ) {
            if ( obj.amount > 0 ) {
                counter.text(obj.amount);
                counter.css('display', 'flex');
            }else {
                counter.css('display', 'none')
            }
        
            if ( obj.adited === true ){
                btn.css(solidHertObj);
            } else{
                btn.css(emptyHertObj);
            } 
        }

        function clickBtn(btn, obj) {
            if ( obj.adited === false ) {
                obj.amount += 1;
                obj.adited = true;
                
                btn.css(solidHertObj);        
            }else {
                obj.amount -= 1;
                obj.adited = false;

                btn.css(emptyHertObj);            
            }
        }

        processData($('#heart'), favObj, $('.fav-items-counter'));
        processData($('#add-item-basket'), basketObj, $('.basket-items-counter'));

        $('#heart').click(function(e) {
            e.preventDefault();

            clickBtn($('#heart'), favObj)
            processData($('#heart'), favObj, $('.fav-items-counter'))
        });

        $('#add-item-basket').click(() => {
            clickBtn($('#add-item-basket'), basketObj)
            processData($('#add-item-basket'), basketObj, $('.basket-items-counter'))
        });

    }
    itemsCounter()
});