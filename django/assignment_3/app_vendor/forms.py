from django.forms import ModelForm, Textarea
from app_vendor.models import VendorShop

class VendorShopForm(ModelForm):
    class Meta:
        model = VendorShop
        fields = ['shop_name','description']
        widgets = {
            'description':Textarea(attrs={'rows':5})
        }