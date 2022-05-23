from dataclasses import field
from app_shop.models import Coupon, Product
from django.forms import ModelForm,DateInput, TextInput

class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = '__all__'
        exclude = ['vendor',]


class CouponForm(ModelForm):
    class Meta:
        model = Coupon
        fields = '__all__'
        exclude = ['vendor',]
        widgets = {
            'valid_from':TextInput(attrs={'type':'datetime-local'}),
            'valid_to':TextInput(attrs={'type':'datetime-local'}),
        }