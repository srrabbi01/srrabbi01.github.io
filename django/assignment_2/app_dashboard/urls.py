from django.urls import path
from app_dashboard import views

urlpatterns = [
    path('',views.dashboard_view,name='dashboard'),
    path('add_quiz',views.addQuiz_view,name='add_quiz'),
    path('quizlist',views.quizList_view,name='quizlist'),
    path('quizexam/<int:pk>',views.quizExam_view,name='quizexam'),
    path('update_quiz/<int:pk>',views.updateQuiz_view,name='update_quiz'),
    path('delete_quiz/<int:pk>',views.deleteQuiz_view,name='delete_quiz'),
    path('delete_ques/<int:pk>',views.deleteQuizQues_view,name='delete_ques'),
    path('delete_qans/<int:pk>',views.deleteQuizAns_view,name='delete_qans'),
]
