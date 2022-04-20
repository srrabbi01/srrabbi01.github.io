from django.urls import path
from app_auth import views
urlpatterns = [
    path('signup/',views.signup_view,name='signup'),
    path('signin/',views.signin_view,name='signin'),
    path('signout/',views.signout_view,name='signout')
]
