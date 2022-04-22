from django.urls import path
from app_article import views

urlpatterns = [
    path('list',views.article_view,name='article'),
    path('details/<int:pk>',views.articleDetails_view,name='details_article'),
    path('create_article',views.createArticle_view,name='create_article'),
    path('update_article/<int:pk>',views.updateArticle_view,name='update_article'),
    path('delete_article/<int:pk>',views.deleteArticle_view,name='delete_article'),
]
