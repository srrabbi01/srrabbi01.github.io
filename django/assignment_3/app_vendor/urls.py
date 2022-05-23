from django.urls import path, include
from . import views

app_name = 'app_vendor'

urlpatterns = [
    path('addProduct', views.addProduct_view,name='addProduct'),
    path('product_list', views.productList_view,name='productList'),
    path('product_delete/<int:pk>', views.productDelete_view,name='productDelete'),
    path('coupon_create', views.couponCreate_view,name='couponCreate'),
    path('shop_info', views.shopInfo_view,name='shopInfo'),
    path('shop_info_html', views.shopInfoFormHtmx,name='shopInfoFormHtmx'),
]
