from django.shortcuts import redirect, render
from django.urls import reverse_lazy
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages

from app_auth.forms import CustomUserCreationForm
# Create your views here.

def signup_view(request):
    if request.method == 'POST':
        ucform = CustomUserCreationForm(request.POST or None)
        if ucform.is_valid():
            ucform.save()
            print('Valid')
            return redirect('dashboard')
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
                return redirect('dashboard')
            else:
                messages.error(request,"Username or Password didn't match. Please try again!")
    return render(request,'app_auth/signin.html')



def signout_view(request):
    logout(request)
    return redirect('signin')