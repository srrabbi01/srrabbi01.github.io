from django.contrib import admin
from django.urls import path, include

# To show media files
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app_shop.urls')),
    path('account/', include('app_login.urls')),
    path('shop/', include('app_order.urls')),
    path('vendor/', include('app_vendor.urls')),
    path('payment/', include('app_payment.urls'))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)