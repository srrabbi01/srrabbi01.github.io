from django.urls import path
from app_forum import views

urlpatterns = [
    path('',views.forums_view,name='dashboard'),
    path('details_forum',views.detailsForum_view,name='details_forum'),

]
