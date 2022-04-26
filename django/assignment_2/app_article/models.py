from django.db import models
from app_auth.models import CustomUser
# Create your models here.

STATUS = (
    (0,"Draft"),
    (1,"Publish")
)
categoriesType = (
    ('', 'Please Select'),
    ('How To Articles', 'How To Articles'),
    ('List Articles', 'List Articles'),
    ('Round Up Articles', 'Round Up Articles'),
    ('Guide Articles', 'Guide Articles'),
    ('Comparison Articles', 'Comparison Articles'),
)
class Article(models.Model):
    title = models.CharField(max_length=200, unique=True)
    author = models.ForeignKey(CustomUser, on_delete= models.CASCADE,related_name='posts')
    categories = models.CharField(max_length=255, null=True, choices=categoriesType, default=categoriesType[0][0])
    content = models.TextField()
    updated_on = models.DateTimeField(auto_now= True)
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS, default=1)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return f'{self.title}'
