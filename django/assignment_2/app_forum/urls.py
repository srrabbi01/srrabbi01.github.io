from django.urls import path
from app_forum import views

urlpatterns = [
    path('',views.forums_view,name='forums'),
    path('details_forum/<int:pk>',views.detailsForum_view,name='details_forum'),
    path('create_forum',views.createForum_view,name='create_forum'),
    path('delete_forum/<int:pk>',views.deleteForum_view,name='delete_forum'),

]
