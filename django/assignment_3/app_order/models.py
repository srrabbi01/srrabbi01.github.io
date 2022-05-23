from django.db import models
from django.conf import settings

# Model
from app_shop.models import Coupon, Product
# Create your models here.

class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="cart")
    item = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    purchased = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.quantity} X {self.item}'

    def get_discount(self,discount=None):
        if discount:
            total = (self.item.price * self.quantity * discount) / 100
            return total
        else:
            return None

    def get_total(self):
        total = self.item.price * self.quantity
        float_total = format(total, '0.2f')
        return float_total


class Order(models.Model):
    orderitems = models.ManyToManyField(Cart)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    paymentId = models.CharField(max_length=264, blank=True, null=True)
    orderId = models.CharField(max_length=200, blank=True, null=True)
    applied_coupon = models.BooleanField(default=False)
    coupon = models.ForeignKey(Coupon,on_delete=models.SET_NULL,null=True)
    
    def remove_coupon(self):
        self.applied_coupon = False
        self.coupon = None
        self.save()

    def apply_coupon(self,coupon):
        self.applied_coupon = True
        self.coupon = coupon
        self.save()

    def get_discounts(self):
        total_discount = 0
        if self.applied_coupon and self.coupon:
            for order_item in self.orderitems.filter(item__vendor=self.coupon.vendor):
                total_discount += order_item.get_discount(self.coupon.discount)
        return total_discount
        
    def get_totals(self):
        total = 0
        for order_item in self.orderitems.all():
            total += float(order_item.get_total())
        if self.applied_coupon and self.get_discounts():
            total = total - self.get_discounts()
        return total
