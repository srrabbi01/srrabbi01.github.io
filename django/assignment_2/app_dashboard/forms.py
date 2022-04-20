
from dataclasses import fields
from random import choices
from django import forms
from django.contrib.auth.forms import UserCreationForm
from app_auth.models import CustomUser
from app_dashboard.models import Quiz


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('username','email','phone','role',)



class QuizForm(forms.ModelForm):
    class Meta:
        model = Quiz
        fields = ('title','active')

# class SetExamQuizForm(forms.ModelForm):
#     class Meta:
#         model = SetExamQuiz
#         fields = ('quiz',)

#     def __init__(self, *args, **kwargs):
#         super(SetExamQuizForm, self).__init__(*args, **kwargs)
#         choices = [('','Select Quiz')]
#         choices.extend([(q.id,q.title) for q in Quiz.objects.all()])
#         print(choices)
#         if self.instance:
#             self.fields['quiz'].choices = choices