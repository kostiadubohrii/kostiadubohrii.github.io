$(document).ready( function () {
    function itemsCounter() {

        function chackIsAdded(obj) {
            if (obj.productAdded) {
                obj.productAdded = false
                return obj
            }
            else{
                obj.productAdded = true
                return obj
            }
        }

        const form = $('#basket-form');

        $('#basket-form').click(function(e) {
            const productName = form.data('name'),
                  productPrice = form.data('price'),
                  productId = form.data('product_id');

            const formData = {
                productName: productName,
                productPrice: productPrice,
                productId: productId,
                productAdded: false,
            }
            chackIsAdded(formData)
            ajaxQuery(form, formData, $('.basket-items-counter'), '#basket-form')

        });

        $('.column_wrapper').on("click", function(event) {

            if ( event.target && event.target.id == "delete_image" ) {

                const productItems = $('.column_goods');

                productItems.each( function (i, item) {
                    if (event.target.closest('.column_goods') == item){
                        const deleteForm = event.target.closest('form'),
                              productId = +deleteForm.dataset.product_id;
                        
                        const deleteFormData = {
                            productId: productId,
                            isDeleted: true,
                        }

                        ajaxQuery(deleteForm, deleteFormData, $('.basket-items-counter'),'#delete-item', item)
                    }

                });
            }
        });

        $('.counter_plus').on("click", function(event) {
            ajaxQuery()
        });

        function ajaxQuery( form, formData, place, formName, itemToRemove, itemToChange) {
            const data = {};

            const formElem = $(form)

            var csrf_token = $(`${formName} [name="csrfmiddlewaretoken"]`).val();

            data["csrfmiddlewaretoken"] = csrf_token;
            data["product_name"] = formData.productName;
            data["product_price"] = formData.productPrice;
            data["product_id"] = formData.productId;
            data["product_added"] = formData.productAdded;
            data["is_deleted"] = formData.isDeleted

            var url = formElem.attr("action");

            console.log(data)
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                cache: true,
                success: function (data) {
                    console.log("OK");

                    $('#total-price').text(`${data.totalPrice} £`);
                    console.log(data.totalPrice)

                    function onDeleteItem () {
                        if (data.amount_of_products) {
                            place.css('display', 'flex')
                            place.text(data.amount_of_products);
                        } else {
                            place.css('display', 'none')
                            itemToRemove.remove();
                        }

                        if (data.is_deleted === 'true') {
                            itemToRemove.remove();
                        }
                        if (!data.amount_of_products){

                        }


                    }
                    onDeleteItem();
                },
                error: function (data) {
                    console.log("ERROR")
                }
            });
        }
    }
    itemsCounter()
});