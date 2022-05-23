from multiprocessing import context
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import get_object_or_404, render
from app_shop.models import Product
from app_shop.forms import CouponForm, ProductForm
from django.contrib import messages
from app_vendor.forms import VendorShopForm

from app_vendor.models import VendorShop

# Create your views here.

def addProduct_view(request):
    form = ProductForm()
    if request.method == 'POST':
        form = ProductForm(request.POST,request.FILES)
        if form.is_valid():
            newForm = form.save(commit=False)
            newForm.vendor = request.user
            newForm.save()
            messages.success(request,'Product added successfully.')
            return HttpResponseRedirect(reverse('app_vendor:addProduct'))
    context = {
        'form':form
    }
    return render(request,'app_vendor/product_add.html',context)


def productList_view(request):
    product_qs = Product.objects.filter(vendor=request.user)
    context = {
        'products':product_qs
    }
    return render(request,'app_vendor/product_list.html',context)


def productDelete_view(request,pk):
    product = get_object_or_404(Product,id=pk)
    product.delete()
    messages.success(request,'Product delete successfully.')
    return HttpResponseRedirect(reverse('app_vendor:productList'))


def couponCreate_view(request):
    form = CouponForm()
    if request.method == 'POST':
        form = CouponForm(request.POST)
        if form.is_valid():
            newForm = form.save(commit=False)
            newForm.vendor = request.user
            newForm.save()
            messages.success(request,'Coupon created successfully.')
            return HttpResponseRedirect(reverse('app_vendor:couponCreate'))
    context = {
        'form':form
    }
    return render(request,'app_vendor/coupon_add.html',context)

def shopInfo_view(request):
    form = VendorShopForm()
    if hasattr(request.user,'vendor_shop'):
        form = VendorShopForm(instance=request.user.vendor_shop)

    if request.method == 'POST':
        if hasattr(request.user,'vendor_shop'):
            form = VendorShopForm(request.POST,instance=request.user.vendor_shop)
            if form.is_valid():
                form.save()
                messages.success(request,'Shop info updated successfully')
                return HttpResponseRedirect(reverse('app_vendor:shopInfo'))
        else:
            form = VendorShopForm(request.POST)
            if form.is_valid():
                newForm = form.save(commit=False)
                newForm.vendor = request.user
                newForm.save()
                messages.success(request,'Shop info updated successfully')
                return HttpResponseRedirect(reverse('app_vendor:shopInfo'))
    context = {
        'form':form,
    }
    return render(request,'app_vendor/shop_info.html',context)




def shopInfoFormHtmx(request):
    role = request.GET.get('role',None)
    if role == 'Seller':
        form = VendorShopForm()
        return render(request,'app_vendor/shop_info_form.html',{'form':form,})
    else:
        return HttpResponse('')