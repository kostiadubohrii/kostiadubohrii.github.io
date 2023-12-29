from django.db import models
from product.models import Product

class Status(models.Model):
    name = models.CharField(max_length=24, blank=True, null=True, default=None)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return "Status %s" % self.name

    class Meta:
        verbose_name = 'Order status'
        verbose_name_plural = 'Orders status'

class Order(models.Model):
    customer_emeil = models.EmailField(blank=True, null=True, default=None)
    customer_name = models.CharField(max_length=64,  blank=True, null=True, default=None)
    customer_phone = models.CharField(max_length=48, blank=True, null=True, default=None)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)

    def __str__(self):
        return "Order %s %s" % (self.id, self.status.name)

    class Meta:
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

class ProductInOrder(models.Model):
    order = models.ForeignKey(Order, blank=True, null=True, default=None, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, blank=True, null=True, default=None, on_delete=models.CASCADE)

    def __str__(self):
        return "Product %s" % self.product.name

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

class ProductInBasket(models.Model):
    session_key = models.CharField(max_length=128, default=None)
    product = models.ForeignKey(Product, blank=True, null=True, default=None, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    price = models.IntegerField(blank=True, null=True, default=None)

    def __str__(self):
        return "%s" % self.product

    class Meta:
        verbose_name = 'Product in basket'
        verbose_name_plural = 'Products in basket'
