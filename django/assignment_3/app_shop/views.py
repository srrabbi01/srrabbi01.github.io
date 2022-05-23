from django.utils import timezone
from django.shortcuts import get_object_or_404, render

# Import views
from django.views.generic import ListView, DetailView
from app_shop.forms import CouponForm

# Models
from app_shop.models import Product

# Mixin
from django.contrib.auth.mixins import LoginRequiredMixin
# Create your views here.



class Home(ListView):
    model = Product
    template_name = 'app_shop/home.html'

def productDetail_view(request,pk):
    product_qs = get_object_or_404(Product,pk=pk)
    context = {
        'product':product_qs,
    }
    return render(request,'app_shop/product_detail.html',context)
