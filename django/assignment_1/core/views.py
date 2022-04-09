from django.shortcuts import render
from django.views.generic import TemplateView,ListView,DetailView
from django.views.generic.edit import FormMixin
from core.models import *
from core.forms import *
# Create your views here.
def index(request):
    return render(request,'core/index.html')

class Index(ListView):
    template_name = 'core/index.html'
    queryset = Video.objects.all()
    context_object_name = 'videos'

class VideoDetails(FormMixin,DetailView):
    template_name = 'core/video_details.html'
    context_object_name = 'video'
    model = Video
    form_class = CommentForm
    # success_url = 'index'
    def get_context_data(self, **kwargs):
        context = super(VideoDetails, self).get_context_data(**kwargs)
        context['videos'] =Video.objects.filter().exclude(pk=self.kwargs.get('pk'))
        context['comments'] =Comment.objects.filter(video__pk=self.kwargs.get('pk'))
        context['form'] =CommentForm()
        return context
    
    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form = self.get_form()
        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

    def form_valid(self, form):
        newForm = form.save(commit = False)
        newForm.video = self.object
        newForm.save()
        return super(VideoDetails, self).form_valid(form)

    def get_success_url(self):
        return reverse("videoDetails", args=[self.object.pk])


def searchResultView(request):
    title = request.POST.get('title')
    if len(title) >1:
        video_qs = Video.objects.filter(title__icontains = title)
    else:
        video_qs = []
    return render(request,'core/search_results.html',{'video_qs':video_qs})