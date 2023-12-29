from django.shortcuts import render
from django.http import JsonResponse
from .models import ProductInBasket
from product.models import *


def basket_adding(request):
    return_dict = dict()
    session_key = request.session.session_key

    data = request.POST
    product_id = data.get("product_id")
    product_name = data.get("product_name")
    product_price = data.get("product_price")
    product_added = data.get("product_added")

    # Отримуємо загальню ціну товарів в корзині



    # Видаляємо товари із корзини
    if ProductInBasket.objects.filter(product_id=product_id):
        ProductInBasket.objects.filter(product_id=product_id).delete()
    else:
        new_product = ProductInBasket.objects.create(session_key=session_key, product_id=product_id, price=product_price)

    # Отримуємо загальну кількість товарів в корзині
    amount_of_products = ProductInBasket.objects.filter(session_key=session_key, is_active=True).count()



    return_dict["amount_of_products"] = amount_of_products

    return JsonResponse(return_dict)

def basket(request):
    return_dict = dict()
    session_key = request.session.session_key
    data = request.POST

    products_images = ProductImage.objects.filter(is_active=True, is_main=True)
    products_in_basket = ProductInBasket.objects.filter(is_active=True)

    products_list = []
    product_images_list = []

    for product_image in products_images:
        for product_basket in products_in_basket:
            if product_image.product.id == product_basket.product.id:
                products_list.append(product_image)

    total_price = 0

    for item in products_list:
        total_price += item.product.price



    amount_of_products_in_basket = 0
    for i in products_in_basket:
        amount_of_products_in_basket += 1

    return render(request, 'basket/basket.html', locals())

def delete_item_in_basket(request):
    return_dict = dict()
    session_key = request.session.session_key

    data = request.POST
    product_id = data.get("product_id")
    is_deleted = data.get("is_deleted")

    if ProductInBasket.objects.filter(product_id=product_id):
        ProductInBasket.objects.filter(product_id=product_id).delete()

    products_in_basket = ProductInBasket.objects.filter(is_active=True)

    total_price = 0

    for item in products_in_basket:
        print(item.price)
        total_price += item.price

    amount_of_products = ProductInBasket.objects.filter(session_key=session_key, is_active=True).count()
    return_dict["amount_of_products"] = amount_of_products
    return_dict["is_deleted"] = is_deleted
    return_dict["totalPrice"] = total_price

    return JsonResponse(return_dict)

# def counter_add(request):
#     return_dict = dict()
#     session_key = request.session.session_key
#
#     data = request.POST
#
#     return JsonResponse(return_dict)