from django.db import models
from app_login.models import User
# Create your models here.

class VendorShop(models.Model):
    vendor = models.OneToOneField(User, on_delete=models.CASCADE, related_name='vendor_shop')
    shop_name = models.CharField(max_length=264)
    description = models.TextField(null=True,blank=True)

    def __str__(self):
        return self.shop_name + " Shop"