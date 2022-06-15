from django.contrib import admin
from app_api.models import Car, RentCar, UserProfile

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Car)
admin.site.register(RentCar)