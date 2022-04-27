from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/',include('app_auth.urls')),
    path('dashboard/',include('app_dashboard.urls')),
    path('articles/',include('app_article.urls')),
    path('forums/',include('app_forum.urls')),
    path('', TemplateView.as_view(template_name="index.html"))
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
