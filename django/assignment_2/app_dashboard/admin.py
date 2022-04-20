from django.contrib import admin
from app_dashboard.models import *
# Register your models here.

admin.site.register(Quiz)
admin.site.register(QuizQuestion)
admin.site.register(QuizQuestionAnswer)
admin.site.register(QuizStudentAnswer)
admin.site.register(QuizStudentResult)
