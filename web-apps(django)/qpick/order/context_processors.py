from .models import ProductInBasket

def getting_basket_info(request):
    session_key = request.session.session_key
    if not session_key:
        request.session_key()

    amount_of_products = ProductInBasket.objects.filter(session_key=session_key, is_active=True).count()

    return locals()
