from pyexpat import model
from django.forms import ModelForm,Textarea,TextInput,EmailInput
from core.models import *
class CommentForm(ModelForm):
    class Meta:
        model = Comment
        fields = ('username','email','comment')

        widgets = {
            'username': TextInput(attrs={'class':'form-input form-control','placeholder':"Your name"}),
            'email': EmailInput(attrs={'class':'form-input form-control','placeholder':'Your email'}),
            'comment': Textarea(attrs={'class':'form-input form-control','placeholder':'comment'}),
        }