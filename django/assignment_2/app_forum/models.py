from django.db import models
from app_auth.models import CustomUser
# Create your models here.

class Forum(models.Model):
    topic_starter = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    topic = models.CharField(max_length=300)
    description = models.TextField(max_length=10000,null=True)
    created_at=models.DateTimeField(auto_now_add=True,null=True)
    
    def __str__(self):
        return str(self.topic)
 
#child model
class Discussion(models.Model):
    forum = models.ForeignKey(Forum,on_delete=models.CASCADE,related_name='discussions')
    discusser = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    discuss = models.TextField(max_length=10000,null=True)
    created_at=models.DateTimeField(auto_now_add=True,null=True)

    def __str__(self):
        return str(self.forum)