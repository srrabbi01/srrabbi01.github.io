from django.core.exceptions import PermissionDenied
from django.shortcuts import redirect
from app_dashboard.models import *
from app_auth.models import *

def user_is_admin(function):
    def wrap(request, *args, **kwargs):
        if request.user.is_superuser:
            return redirect('/admin/')
        else:
            return function(request, *args, **kwargs)
    wrap.__doc__ = function.__doc__
    wrap.__name__ = function.__name__
    return wrap

def user_is_teacher(function):
    def wrap(request, *args, **kwargs):
        if request.user.is_teacher:
            return function(request, *args, **kwargs)
        else:
            return redirect('dashboard')
    wrap.__doc__ = function.__doc__
    wrap.__name__ = function.__name__
    return wrap

def user_is_student(function):
    def wrap(request, *args, **kwargs):
        if request.user.is_student:
            return function(request, *args, **kwargs)
        else:
            return redirect('dashboard')
        
    wrap.__doc__ = function.__doc__
    wrap.__name__ = function.__name__
    return wrap