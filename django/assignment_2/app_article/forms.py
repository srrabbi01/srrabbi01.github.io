
from django import forms
from app_auth.models import CustomUser
from app_article.models import Article

class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ('title','categories','content','status')