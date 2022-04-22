from django.db import models
from app_auth.models import CustomUser
# Create your models here.

STATUS = (
    (0,"Draft"),
    (1,"Publish")
)

class Article(models.Model):
    title = models.CharField(max_length=200, unique=True)
    author = models.ForeignKey(CustomUser, on_delete= models.CASCADE,related_name='posts')
    content = models.TextField()
    updated_on = models.DateTimeField(auto_now= True)
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS, default=0)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return f'{self.title}'
