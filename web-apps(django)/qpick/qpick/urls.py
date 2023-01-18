"""qpick URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import re_path as url
from qpick import views
from product.views import product
from order.views import basket_adding, basket, delete_item_in_basket

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.home, name='home'),
    url(r'index/', views.landing, name="landing"),
    url(r'terms/', views.terms, name="terms"),
    url(r'^product/(?P<product_id>\w+)/$', product, name="product"),
    url(r'^basket_adding/$', basket_adding, name="basket_adding"),
    url(r'^basket/$', basket, name="basket"),
    url(r'^delete_item_in_basket/$', delete_item_in_basket, name="delete_item_in_basket"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)