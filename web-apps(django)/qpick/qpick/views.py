from django.http import HttpResponse
from django.shortcuts import render

import product.models
from terms.models import Terms
from product.models import *
from product.views import *
from administration.models import *


def landing(request):
    return render(request, 'landing/landing.html', locals())

def home(request):
    name = 'QPICK - Головна'

    products_images = ProductImage.objects.filter(is_active=True, is_main=True)
    top_category = Category.objects.filter(is_visible=True)

    products_list = []
    product_images_list = []

    for product_image in products_images:
        if product_image.product.is_active == True:
            if product_image.product.category.is_visible == True and product_image.product.category :
                products_list.append(product_image.product)
                product_images_list.append(product_image)

    return render(request, 'landing/home.html', locals())

def terms(request):
    name = 'QPICK - Умови сервісу'
    terms = Terms.objects.all()
    return render(request, 'terms/terms.html', locals())
