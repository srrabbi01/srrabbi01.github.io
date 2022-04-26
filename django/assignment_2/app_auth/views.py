from django.http import HttpResponseRedirect
from django.shortcuts import redirect, render,resolve_url
from django.urls import reverse_lazy,reverse
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from app_auth.forms import CustomUserCreationForm
# Create your views here.

def signup_view(request):
    if request.method == 'POST':
        ucform = CustomUserCreationForm(request.POST or None)
        if ucform.is_valid():
            ucform.save()
            messages.success(request, f'Account created succesfully. Please login to continue')
            return redirect('signin')
    else:
        ucform = CustomUserCreationForm()

    context = {
        'signupForm':ucform
    }
    return render(request,'app_auth/signup.html',context)



def signin_view(request):
    if request.user.is_authenticated:        
        return redirect('dashboard')
    else:
        if request.method == 'POST':
            username =  request.POST.get('username')
            password =  request.POST.get('password')
            user = authenticate(username = username, password = password)
            if user is not None:
                login(request, user)
                messages.success(request, f'Welcome Back {user}')
                next_url = request.GET.get('next',None)
                if next_url:
                    return redirect(next_url)
                else:
                    return redirect('dashboard')
            else:
                messages.error(request,"Username or Password didn't match. Please try again!")
                return redirect('signin')
    return render(request,'app_auth/signin.html')



@login_required(login_url='signin')
def signout_view(request):
    logout(request)
    return redirect('signin')