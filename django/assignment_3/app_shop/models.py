from django.db import models
from app_login.models import User
from django.core.validators import MinValueValidator,MaxValueValidator
# Create your models here.


class Category(models.Model):
    title = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Categories"


class Product(models.Model):
    vendor = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    name = models.CharField(max_length=264,null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='category')
    detail_text = models.TextField(max_length=1000, verbose_name='Description')
    mainimage = models.ImageField(upload_to='Products')
    price = models.FloatField()
    old_price = models.FloatField(default=0.00)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created',]


class Coupon(models.Model):
    vendor = models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name='vendor_coupon')
    code = models.CharField(max_length=50,unique=True)
    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()
    discount = models.FloatField(validators=[MinValueValidator(0),MaxValueValidator(100)])
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.code