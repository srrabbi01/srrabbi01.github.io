from django.shortcuts import get_object_or_404, redirect, render
from app_forum.models import *
from app_forum.forms import ForumForm,DiscussionForm
from django.contrib.auth.decorators import login_required
from elearn.decorators import *
# Create your views here.
def forums_view(request):
    forums_qs = Forum.objects.all()
    return render(request,'app_forum/forums.html',{'forums':forums_qs})



def detailsForum_view(request,pk):
    forum = get_object_or_404(Forum,pk=pk)
    form = DiscussionForm()
    if request.method == 'POST' and request.user.is_authenticated:
        form = DiscussionForm(request.POST)
        if form.is_valid():
            new_form = form.save(commit=False)
            new_form.forum = forum
            new_form.discusser = request.user
            new_form.save()
            return redirect('details_forum',pk)
        else:
            form = DiscussionForm()
    else:
        form = DiscussionForm()
    context = {
        'forum':forum,
        'form':form,
    }
    return render(request,'app_forum/details_forum.html',context)



@login_required(login_url='signin')
@user_is_student
def createForum_view(request):
    form = ForumForm()
    if request.method == 'POST':
        form = ForumForm(request.POST)
        if form.is_valid():
            new_form = form.save(commit=False)
            new_form.topic_starter = request.user
            new_form.save()
            return redirect('forums')
        else:
            form = ForumForm()
    context = {
        'form':form
    }
    return render(request,'app_forum/create_forum.html',context)



@login_required(login_url='signin')
@user_is_student 
def deleteForum_view(request,pk):
    forum = get_object_or_404(Forum,pk=pk)
    forum.delete()
    return redirect('forums')