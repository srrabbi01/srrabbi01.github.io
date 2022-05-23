from django.forms import ModelForm,Select
from app_login.models import User, Profile

from django.contrib.auth.forms import UserCreationForm


# forms

class ProfileForm(ModelForm):
    class Meta:
        model = Profile
        exclude = ('user',)

class SignUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('email', 'password1', 'password2','role')
        widgets = {
            'role':Select(attrs={'hx-get':'/vendor/shop_info_html','hx-trigger':'load,change','hx-target':'#extra-fields'})
        }
