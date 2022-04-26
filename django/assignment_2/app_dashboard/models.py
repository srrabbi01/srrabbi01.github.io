from django.db import models
from app_auth.models import CustomUser


# Create your models here.
class Quiz(models.Model):
    teacher = models.ForeignKey(CustomUser,on_delete=models.SET_NULL,null=True,related_name='quiz')
    title = models.CharField(max_length=255,null=True)
    active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.title}"


class QuizQuestion(models.Model):
    quiz = models.ForeignKey(Quiz,on_delete=models.SET_NULL,null=True,related_name='quizqs')
    text = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.quiz,self.text}"


class QuizQuestionAnswer(models.Model):
    question = models.ForeignKey(QuizQuestion,on_delete=models.SET_NULL,null=True,related_name='qsans')
    text = models.TextField(null=True)
    is_correct = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.question,self.text,self.is_correct}"



class QuizStudentResult(models.Model):
    student = models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,related_name='ustdres')
    quiz = models.ForeignKey(Quiz,on_delete=models.SET_NULL,null=True,related_name='qstdres')
    score = models.FloatField(default=0)
    tca = models.IntegerField(default=0,blank=True)
    complete = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.student}"


class QuizStudentAnswer(models.Model):
    student = models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,related_name='stdans')
    quiz = models.ForeignKey(Quiz,on_delete=models.SET_NULL,null=True,related_name='stdans')
    question = models.ForeignKey(QuizQuestion,on_delete=models.SET_NULL,null=True,related_name='stdans')
    answer = models.ForeignKey(QuizQuestionAnswer,on_delete=models.SET_NULL,null=True,related_name='stdans')
    is_correct = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    def save(self,*args,**kwargs):
        if not self.quiz:
            self.quiz = self.answer.question.quiz
            self.question = self.answer.question
        super(QuizStudentAnswer, self).save(*args, **kwargs)
