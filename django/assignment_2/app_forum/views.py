from django.shortcuts import render

# Create your views here.
def forums_view(request):

    return render(request,'app_forum/forums.html')


def detailsForum_view(request):
    return render(request,'app_forum/details_forum.html')