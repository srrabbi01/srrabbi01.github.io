from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)

# Create your models here.
class UserProfileManager(BaseUserManager):
    def create_user(self, email,role, password=None):
        if not email:
            raise ValueError("User must have email!")

        email = self.normalize_email(email)
        user = self.model(email=email,role=role)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class UserProfile(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    role = models.CharField(max_length=55,null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = "email"

    def __str__(self):
        return self.email



class Car(models.Model):
    owner = models.ForeignKey(UserProfile,on_delete=models.CASCADE,null=True)
    name = models.CharField(max_length=255,null=True)
    brand = models.CharField(max_length=255,null=True)
    color = models.CharField(max_length=255,null=True)
    daily_price = models.FloatField(default=0,null=True)
    description = models.TextField(null=True)


class RentCar(models.Model):
    car = models.ForeignKey(Car,on_delete=models.CASCADE,null=True)
    customer = models.ForeignKey(UserProfile,on_delete=models.CASCADE,null=True)