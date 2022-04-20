from django.db import models
from django.contrib.auth.models import User,AbstractUser

# Create your models here.

class CustomUser(AbstractUser):
    roleType = (
        ('', 'Please Select'),
        ('Student', 'Student'),
        ('Teacher', 'Teacher'),
    )
    role = models.CharField(max_length=255, choices=roleType, null=True, default=roleType[0][0], blank=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    verify = models.BooleanField(default=False, null=True)
    is_student = models.BooleanField(default=False, null=True)
    is_teacher = models.BooleanField(default=False, null=True)

    def save(self, *args, **kwargs):
        if self.role == 'Student':
            self.is_student = True
        elif self.role == 'Teacher':
            self.is_teacher = True

        super(CustomUser, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.username}"