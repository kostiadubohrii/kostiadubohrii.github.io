from django.shortcuts import render
from product.models import *

def product(request, product_id):
    product = Product.objects.get(id=product_id)
    descr = product.description.split(';')

    session_key = request.session.session_key

    if not session_key:
        request.session_key()

    return render(request, 'products/product.html', locals())

def basket(request, product_id):
    session_key = request.session.session_key

    if not session_key:
        request.session_key()

    return render(request, 'basket/basket.html', locals())