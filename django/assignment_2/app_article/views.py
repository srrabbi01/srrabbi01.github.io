from django.shortcuts import get_object_or_404, redirect, render
from app_article.models import Article
from app_article.forms import ArticleForm
from django.contrib.auth.decorators import login_required
from elearn.decorators import *
# Create your views here.


def article_view(request):
    article_qs = Article.objects.filter().order_by('-created_on')
    context = {
        'articles':article_qs,
    }
    return render(request,'app_article/articles.html',context)

    

def articleDetails_view(request,pk):
    article = get_object_or_404(Article,pk=pk)
    context = {
        'article':article,
    }
    return render(request,'app_article/details_article.html',context)



@login_required(login_url='signin')
@user_is_teacher   
def createArticle_view(request):
    form = ArticleForm()
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            new_form =form.save(commit=False)
            new_form.author = request.user
            new_form.save()
        return redirect('articles')

    return render(request,'app_article/create_article.html',{'form':form})



@login_required(login_url='signin')
@user_is_teacher 
def updateArticle_view(request,pk):
    article = get_object_or_404(Article,pk=pk)
    form = ArticleForm(instance=article)
    if request.method == 'POST':
        form = ArticleForm(request.POST,instance=article)
        if form.is_valid():
            form.save()
        return redirect('articles')
    return render(request,'app_article/update_article.html',{'form':form})



@login_required(login_url='signin')
@user_is_teacher
def deleteArticle_view(request,pk):
    article = get_object_or_404(Article,pk=pk)
    article.delete()
    return redirect('articles')


