from django import forms
from app_forum.models import Forum, Discussion


class ForumForm(forms.ModelForm):
    class Meta:
        model = Forum
        fields = ('topic','description')



class DiscussionForm(forms.ModelForm):
    class Meta:
        model = Discussion
        fields = ('discuss',)