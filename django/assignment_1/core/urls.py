from django.urls import path
from core import views
urlpatterns = [
    path('', views.Index.as_view(),name='index'),
    path('watch/video/<int:pk>', views.VideoDetails.as_view(),name='videoDetails'),
    path('search_results/', views.searchResultView,name='searchResults'),
]
